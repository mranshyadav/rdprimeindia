"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import { company, emailHref, whatsappHref } from "@/data/company";
import { categories, products } from "@/data/products";
import {
  validateEnquiry,
  type EnquiryKind,
  type EnquiryPayload,
  type FieldErrors,
} from "@/lib/enquiry";
import { ArrowRight, Button } from "./Button";
import { SelectField, TextAreaField, TextField } from "./Field";

type Status = "idle" | "submitting" | "success" | "error";

const emptyForm = {
  name: "",
  companyName: "",
  email: "",
  phone: "",
  productCategory: "",
  productName: "",
  quantity: "",
  specifications: "",
  message: "",
  website: "",
};

export function EnquiryForm({
  kind = "quote",
  /** Pre-selects and locks the product — used on product detail pages. */
  lockedProductSlug,
  defaultProductSlug,
  defaultCategoryId,
  submitLabel,
  compact = false,
}: {
  kind?: EnquiryKind;
  lockedProductSlug?: string;
  defaultProductSlug?: string;
  defaultCategoryId?: string;
  submitLabel?: string;
  compact?: boolean;
}) {
  const initialProduct = lockedProductSlug ?? defaultProductSlug ?? "";
  const initialCategory =
    defaultCategoryId ??
    (initialProduct
      ? (products.find((p) => p.slug === initialProduct)?.category ?? "")
      : "");

  const [form, setForm] = useState({
    ...emptyForm,
    productName: initialProduct,
    productCategory: initialCategory,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [showFallback, setShowFallback] = useState(false);
  /**
   * Timestamp of first paint, used for the "submitted impossibly fast" spam
   * signal. Set from a ref callback rather than during render, so render stays
   * pure and no effect is needed.
   */
  const mountedAt = useRef<number | null>(null);
  const stampMount = useCallback(() => {
    mountedAt.current ??= Date.now();
  }, []);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  // Selecting a category narrows the product list; a locked product overrides both.
  const productOptions = useMemo(() => {
    if (!form.productCategory) return products;
    return products.filter((p) => p.category === form.productCategory);
  }, [form.productCategory]);

  const set = (key: keyof typeof emptyForm) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  /**
   * Changing the category narrows the product list, so a product that no
   * longer belongs is cleared here rather than in an effect that reacts to the
   * change after the fact.
   */
  const setProductCategory = (value: string) => {
    setForm((f) => ({
      ...f,
      productCategory: value,
      productName:
        value && f.productName
          ? (products.find((p) => p.slug === f.productName)?.category === value
              ? f.productName
              : "")
          : f.productName,
    }));
    setErrors((e) =>
      e.productCategory ? { ...e, productCategory: undefined } : e,
    );
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return; // guards double submit

    const payload: EnquiryPayload = {
      kind,
      ...form,
      elapsedMs: Date.now() - (mountedAt.current ?? Date.now()),
    };

    const clientErrors = validateEnquiry(payload);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus("error");
      setServerMessage("");
      requestAnimationFrame(() => {
        const first = Object.keys(clientErrors)[0];
        document.getElementById(first)?.focus();
      });
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    setShowFallback(false);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        errors?: FieldErrors;
        notConfigured?: boolean;
      };

      if (res.ok && data.ok) {
        setStatus("success");
        setServerMessage(data.message ?? "Enquiry received.");
        return;
      }

      setStatus("error");
      setErrors(data.errors ?? {});
      setShowFallback(res.status === 503 || res.status === 502 || res.status === 429);
      setServerMessage(
        data.message ??
          `We could not send your enquiry. Please call ${company.phone}.`,
      );
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setStatus("error");
      setShowFallback(true);
      setServerMessage(
        `We could not reach the server. Please check your connection, or call ${company.phone}.`,
      );
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  /* ───────────────────────────── success state ────────────────────────── */
  if (status === "success") {
    return (
      <div className="rounded-md border border-hairline bg-surface p-8 text-center sm:p-12">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-navy">
          <svg viewBox="0 0 20 20" aria-hidden="true" className="size-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square">
            <path d="M4.5 10.5l3.5 3.5 7.5-8" />
          </svg>
        </div>
        <h2
          className="mt-6 text-[1.375rem] font-semibold text-navy"
          tabIndex={-1}
          ref={(el) => el?.focus()}
        >
          Enquiry received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-slate">
          {serverMessage} We have your requirement for{" "}
          <strong className="font-semibold text-navy">
            {form.productName
              ? (products.find((p) => p.slug === form.productName)?.name ??
                "your component")
              : "your component"}
          </strong>
          {form.quantity ? (
            <>
              {" "}
              at <strong className="font-semibold text-navy">{form.quantity}</strong>
            </>
          ) : null}
          . Our team will review it and respond with availability,
          specification and pricing.
        </p>
        <dl className="mx-auto mt-7 grid max-w-sm gap-3 border-t border-hairline pt-7 text-left text-[0.8125rem]">
          <div className="flex justify-between gap-4">
            <dt className="text-slate">Reference contact</dt>
            <dd className="font-semibold text-navy">{form.email}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate">Need it sooner?</dt>
            <dd>
              <a
                href={company.phoneHref}
                className="tabular font-semibold text-copper-600 hover:underline"
              >
                {company.phone}
              </a>
            </dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/products"
            className="text-[0.875rem] font-semibold text-navy hover:text-copper-600"
          >
            Browse the catalogue
          </Link>
          <span aria-hidden="true" className="text-hairline-strong">
            ·
          </span>
          <button
            type="button"
            onClick={() => {
              setForm({
                ...emptyForm,
                productName: initialProduct,
                productCategory: initialCategory,
              });
              setStatus("idle");
              setServerMessage("");
              mountedAt.current = Date.now();
              
            }}
            className="text-[0.875rem] font-semibold text-navy hover:text-copper-600"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────── the form ──────────────────────────── */
  const lockedProduct = lockedProductSlug
    ? products.find((p) => p.slug === lockedProductSlug)
    : undefined;

  return (
    <form ref={stampMount} onSubmit={onSubmit} noValidate className="space-y-5">
      {status === "error" && serverMessage ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-sm border-l-2 border-copper bg-copper-50 px-4 py-3.5"
        >
          <p className="text-[0.875rem] font-medium text-graphite">
            {serverMessage}
          </p>
          {showFallback ? (
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8125rem]">
              <a
                href={company.phoneHref}
                className="tabular font-semibold text-copper-600 hover:underline"
              >
                Call {company.phone}
              </a>
              {emailHref ? (
                <a href={emailHref} className="font-semibold text-copper-600 hover:underline">
                  Email us
                </a>
              ) : null}
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-copper-600 hover:underline"
                >
                  WhatsApp
                </a>
              ) : null}
              <a
                href={company.indiamartUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-copper-600 hover:underline"
              >
                Enquire via IndiaMART
              </a>
            </p>
          ) : null}
        </div>
      ) : null}

      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <TextField
          id="name"
          label="Full Name"
          required
          autoComplete="name"
          placeholder="Your name"
          value={form.name}
          error={errors.name}
          onChange={(e) => set("name")(e.target.value)}
        />
        <TextField
          id="companyName"
          label="Company Name"
          required
          autoComplete="organization"
          placeholder="Your company"
          value={form.companyName}
          error={errors.companyName}
          onChange={(e) => set("companyName")(e.target.value)}
        />
        <TextField
          id="email"
          label="Business Email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={form.email}
          error={errors.email}
          onChange={(e) => set("email")(e.target.value)}
        />
        <TextField
          id="phone"
          label="Phone Number"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="+91 00000 00000"
          value={form.phone}
          error={errors.phone}
          onChange={(e) => set("phone")(e.target.value)}
        />
      </div>

      {kind !== "contact" ? (
        <>
          {lockedProduct ? (
            <div className="flex items-center gap-3 rounded-sm border border-hairline bg-canvas px-4 py-3">
              <span className="label-technical text-slate">Enquiring about</span>
              <span className="text-[0.875rem] font-semibold text-navy">
                {lockedProduct.name}
              </span>
              <input type="hidden" name="productName" value={lockedProduct.slug} />
            </div>
          ) : (
            <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
              <SelectField
                id="productCategory"
                label="Product Category"
                value={form.productCategory}
                error={errors.productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </SelectField>
              <SelectField
                id="productName"
                label="Product"
                hint="Leave blank if you are not sure which part you need."
                value={form.productName}
                error={errors.productName}
                onChange={(e) => set("productName")(e.target.value)}
              >
                <option value="">Not sure / help me choose</option>
                {productOptions.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </SelectField>
            </div>
          )}

          <TextField
            id="quantity"
            label="Quantity Required"
            required
            placeholder="e.g. 25,000 pieces per month"
            hint="A range or an annual estimate is fine."
            value={form.quantity}
            error={errors.quantity}
            onChange={(e) => set("quantity")(e.target.value)}
          />

          <TextAreaField
            id="specifications"
            label="Specifications"
            rows={4}
            placeholder="Material, hardness, inner and outer diameter, thickness, colour, tolerance — whatever you have."
            hint="Have a drawing or sample? Mention it here and our team will reply with an address to send it to."
            value={form.specifications}
            error={errors.specifications}
            onChange={(e) => set("specifications")(e.target.value)}
          />
        </>
      ) : null}

      <TextAreaField
        id="message"
        label={kind === "contact" ? "How can we help?" : "Additional Requirements"}
        required={kind === "contact"}
        rows={kind === "contact" ? 5 : 3}
        placeholder={
          kind === "contact"
            ? "Tell us what you are looking for and we will point you to the right component."
            : "Packaging, delivery schedule, target price, application details."
        }
        value={form.message}
        error={errors.message}
        onChange={(e) => set("message")(e.target.value)}
      />

      {/* Honeypot — visually and semantically hidden from real users. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => set("website")(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.75rem] leading-relaxed text-slate">
          We use your details only to respond to this enquiry. See our{" "}
          <Link href="/privacy-policy" className="underline hover:text-navy">
            Privacy Policy
          </Link>
          .
        </p>
        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="size-4 animate-spin"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="8" cy="8" r="6" strokeOpacity="0.3" />
                <path d="M14 8a6 6 0 0 0-6-6" strokeLinecap="round" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              {submitLabel ??
                (kind === "contact" ? "Send Enquiry" : "Submit Product Enquiry")}
              <ArrowRight />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
