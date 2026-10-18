import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import {
  addressOneLine,
  company,
  emailHref,
  whatsappHref,
} from "@/data/company";

export const metadata: Metadata = {
  title: "Contact Us — RD Prime India, Mathura",
  description:
    "Contact RD Prime India in Mathura, Uttar Pradesh. Call +91 79493 06506 or send an enquiry about rubber and plastic components, specifications, availability and pricing.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    {
      label: "Telephone",
      value: company.phone,
      href: company.phoneHref,
      detail: "Fastest route to a technical answer.",
      primary: true,
    },
    emailHref
      ? {
          label: "Email",
          value: company.email as string,
          href: emailHref,
          detail: "For drawings, specification sheets and formal enquiries.",
          primary: false,
        }
      : null,
    whatsappHref
      ? {
          label: "WhatsApp",
          value: "Message us",
          href: whatsappHref,
          detail: "Send a photograph of the part you need matched.",
          primary: false,
        }
      : null,
    {
      label: "IndiaMART",
      value: "View our listing",
      href: company.indiamartUrl,
      detail: "Our catalogue and buyer ratings, independently hosted.",
      primary: false,
    },
  ].filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Talk to our team."
        description="Call us, or send an enquiry and we will respond with the specification, availability and price for what you need. Enquiries reach the proprietor and the works directly."
      />

      <Breadcrumbs trail={[{ label: "Contact" }]} />

      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            {/* ── Channels & address ─────────────────────────────────── */}
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="label-technical border-b border-hairline pb-4 text-navy">
                  How to reach us
                </h2>
                <ul className="mt-6 space-y-3">
                  {channels.map((channel) => (
                    <li key={channel.label}>
                      <a
                        href={channel.href}
                        {...(channel.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className={`group flex items-start gap-4 rounded-md border p-5 transition-colors ${
                          channel.primary
                            ? "border-navy bg-navy text-white hover:bg-navy-700"
                            : "border-hairline bg-surface hover:border-navy"
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p
                            className={`label-technical ${
                              channel.primary ? "text-copper-light" : "text-slate"
                            }`}
                          >
                            {channel.label}
                          </p>
                          <p
                            className={`tabular mt-2 text-[1.0625rem] font-semibold ${
                              channel.primary ? "text-white" : "text-navy"
                            }`}
                          >
                            {channel.value}
                          </p>
                          <p
                            className={`mt-1.5 text-[0.75rem] leading-snug ${
                              channel.primary ? "text-navy-200" : "text-slate"
                            }`}
                          >
                            {channel.detail}
                          </p>
                        </div>
                        <svg
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                          className={`mt-1 size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ${
                            channel.primary ? "text-copper-light" : "text-slate"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="square"
                        >
                          <path d="M2.5 8h11M9.5 4l4 4-4 4" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={100} className="mt-10">
                <h2 className="label-technical border-b border-hairline pb-4 text-navy">
                  Works &amp; office
                </h2>
                <address className="mt-6 space-y-6 not-italic">
                  <div>
                    <p className="label-technical mb-2.5 text-slate">Address</p>
                    <p className="text-[0.9375rem] leading-[1.7] font-medium text-navy">
                      {addressOneLine}
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${company.legalName}, ${addressOneLine}`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-copper-600 hover:underline"
                    >
                      Open in Google Maps
                      <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
                        <path d="M6 3h7v7M13 3 4 12" />
                      </svg>
                    </a>
                  </div>

                  <div>
                    <p className="label-technical mb-2.5 text-slate">
                      Contact person
                    </p>
                    <p className="text-[0.9375rem] font-medium text-navy">
                      {company.owner}
                    </p>
                    <p className="mt-0.5 text-[0.8125rem] text-slate">
                      {company.ownerTitle}
                    </p>
                  </div>

                  <div>
                    <p className="label-technical mb-2.5 text-slate">
                      Registration
                    </p>
                    <p className="tabular text-[0.9375rem] font-medium text-navy">
                      GSTIN {company.gstin}
                    </p>
                    <p className="mt-0.5 text-[0.8125rem] text-slate">
                      {company.legalStatus}, established{" "}
                      {company.establishedYear}
                    </p>
                  </div>

                  <div className="rounded-sm border-l-2 border-hairline-strong bg-canvas px-4 py-3">
                    <p className="text-[0.8125rem] leading-relaxed text-slate">
                      Visits are by appointment. Call ahead and we will make
                      sure someone who can answer your technical questions is
                      available.
                    </p>
                  </div>

                  {!emailHref ? (
                    <div className="rounded-sm border-l-2 border-copper bg-copper-50 px-4 py-3">
                      <p className="text-[0.8125rem] leading-relaxed text-graphite">
                        <strong className="font-semibold">
                          No public email address yet.
                        </strong>{" "}
                        Rather than publish an address we cannot verify, we have
                        left it out — use the form or the phone number above and
                        we will reply from our business address.
                      </p>
                    </div>
                  ) : null}
                </address>
              </Reveal>
            </div>

            {/* ── Form ──────────────────────────────────────────────── */}
            <div className="lg:col-span-7">
              <Reveal delay={60}>
                <div className="rounded-lg border border-hairline bg-surface p-6 sm:p-9">
                  <h2 className="text-[1.5rem] leading-tight font-semibold tracking-[-0.02em] text-navy">
                    Send us an enquiry
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">
                    Tell us what you are looking for. If you are not sure which
                    component you need, describe the application and we will
                    narrow it down.
                  </p>
                  <div className="mt-8">
                    <EnquiryForm kind="contact" submitLabel="Send Enquiry" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
