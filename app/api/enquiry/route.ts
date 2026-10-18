import { NextResponse, type NextRequest } from "next/server";
import { company } from "@/data/company";
import { productBySlug } from "@/data/products";
import {
  spamReason,
  validateEnquiry,
  type EnquiryPayload,
} from "@/lib/enquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ──────────────────────────── rate limiting ─────────────────────────────
 * In-process sliding window. Enough to blunt a loop or a casual script on a
 * single instance; put a platform/WAF rule in front for anything serious.
 * ──────────────────────────────────────────────────────────────────────── */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits)
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return false;
}

const clientKey = (req: NextRequest) =>
  (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
  req.headers.get("x-real-ip") ||
  "unknown";

/* ──────────────────────────── duplicate guard ───────────────────────────
 * Same sender + same product inside five minutes is a double-click or a
 * retry, not a second enquiry.
 * ──────────────────────────────────────────────────────────────────────── */
const DEDUPE_MS = 5 * 60 * 1000;
const seen = new Map<string, number>();

function isDuplicate(fingerprint: string): boolean {
  const now = Date.now();
  const last = seen.get(fingerprint);
  for (const [k, t] of seen) if (now - t > DEDUPE_MS) seen.delete(k);
  if (last && now - last < DEDUPE_MS) return true;
  seen.set(fingerprint, now);
  return false;
}

/* ─────────────────────────────── delivery ───────────────────────────────
 * Resend by default (one fetch, no SDK); generic SMTP-over-HTTP webhook as
 * an alternative for a CRM endpoint. If neither is configured the handler
 * returns 503 and the form shows the phone number instead of pretending the
 * enquiry was sent.
 * ──────────────────────────────────────────────────────────────────────── */
type DeliveryResult = { ok: true; via: string } | { ok: false; error: string };

async function deliver(subject: string, text: string, html: string, replyTo: string): Promise<DeliveryResult> {
  const to = process.env.ENQUIRY_TO_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;

  if (resendKey && to && from) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: replyTo,
        subject,
        text,
        html,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { ok: false, error: `resend ${res.status} ${detail.slice(0, 300)}` };
    }
    return { ok: true, via: "resend" };
  }

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ENQUIRY_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({ subject, text, html, replyTo }),
    });
    if (!res.ok) return { ok: false, error: `webhook ${res.status}` };
    return { ok: true, via: "webhook" };
  }

  return { ok: false, error: "not-configured" };
}

const esc = (v: string) =>
  v.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export async function POST(req: NextRequest) {
  let body: EnquiryPayload;
  try {
    body = (await req.json()) as EnquiryPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  if (rateLimited(clientKey(req))) {
    return NextResponse.json(
      {
        ok: false,
        message: `Too many enquiries from this connection. Please call ${company.phone} and we will take the details directly.`,
      },
      { status: 429 },
    );
  }

  // Silently accept and drop obvious bot traffic — no feedback to tune against.
  const spam = spamReason(body);
  if (spam) {
    console.warn(`[enquiry] discarded (${spam})`);
    return NextResponse.json({ ok: true, message: "Enquiry received." });
  }

  const errors = validateEnquiry(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: "Please correct the highlighted fields.", errors },
      { status: 422 },
    );
  }

  const t = (v?: string) => (v ?? "").trim();
  const product = body.productName ? productBySlug(body.productName) : undefined;
  const productLabel = product?.name ?? t(body.productName);

  if (
    isDuplicate(
      `${t(body.email).toLowerCase()}|${productLabel}|${t(body.quantity)}|${body.kind}`,
    )
  ) {
    return NextResponse.json({
      ok: true,
      duplicate: true,
      message: "We already have this enquiry — our team will be in touch.",
    });
  }

  const subject =
    body.kind === "contact"
      ? `Website enquiry — ${t(body.companyName)}`
      : `Quote request${productLabel ? `: ${productLabel}` : ""} — ${t(body.companyName)}`;

  const rows: Array<[string, string]> = [
    ["Form", body.kind],
    ["Name", t(body.name)],
    ["Company", t(body.companyName)],
    ["Email", t(body.email)],
    ["Phone", t(body.phone)],
    ["Product category", t(body.productCategory) || "—"],
    ["Product", productLabel || "—"],
    ["Quantity required", t(body.quantity) || "—"],
    ["Specifications", t(body.specifications) || "—"],
    ["Additional requirements", t(body.message) || "—"],
    ["Received", new Date().toISOString()],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table style="border-collapse:collapse;font:14px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:#14283d">
${rows
  .map(
    ([k, v]) =>
      `<tr><th align="left" style="padding:8px 16px 8px 0;border-bottom:1px solid #e1e6eb;color:#697586;font-weight:500;vertical-align:top;white-space:nowrap">${esc(k)}</th><td style="padding:8px 0;border-bottom:1px solid #e1e6eb;white-space:pre-wrap">${esc(v)}</td></tr>`,
  )
  .join("\n")}
</table>`;

  const result = await deliver(subject, text, html, t(body.email));

  if (!result.ok) {
    if (result.error === "not-configured") {
      console.error(
        "[enquiry] NOT DELIVERED — no delivery channel configured. " +
          "Set RESEND_API_KEY + ENQUIRY_FROM_EMAIL + ENQUIRY_TO_EMAIL, or ENQUIRY_WEBHOOK_URL. " +
          "See .env.example.",
      );
      console.error(`[enquiry] payload that could not be sent:\n${text}`);
      return NextResponse.json(
        {
          ok: false,
          notConfigured: true,
          message:
            `We could not send your enquiry automatically. Please call ${company.phone} ` +
            `and we will take your requirement directly.`,
        },
        { status: 503 },
      );
    }
    console.error(`[enquiry] delivery failed: ${result.error}`);
    console.error(`[enquiry] payload that could not be sent:\n${text}`);
    return NextResponse.json(
      {
        ok: false,
        message: `Something went wrong sending your enquiry. Please call ${company.phone} or try again shortly.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Enquiry received. Our team will be in touch.",
  });
}
