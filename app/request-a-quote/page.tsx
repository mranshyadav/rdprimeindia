import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { QuoteFormSection } from "@/components/QuoteFormSection";
import { Reveal } from "@/components/Reveal";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Request a Quote — Rubber & Plastic Components",
  description:
    "Request a quote from RD Prime India. Send your component, material, dimensions and quantity and our team will respond with specification, availability and pricing.",
  alternates: { canonical: "/request-a-quote" },
  robots: { index: true, follow: true },
};

const expectations = [
  {
    title: "What to send",
    body: "Material or duty, inner and outer diameter, section thickness, hardness if you know it, colour, and quantity. If you have a drawing or a sample part, say so — we will reply with where to send it.",
  },
  {
    title: "What you get back",
    body: "A price against your specification and volume, the minimum order for that part, and the packaging format. If we cannot make what you need, we will say so plainly rather than quote around it.",
  },
  {
    title: "If you are not sure",
    body: "Leave the product field blank and describe the application instead — what the part sits between, what it has to survive. Narrowing it down is part of the job.",
  },
];

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        title="Send us your requirement."
        description="Pricing is quotation-based, so you get a price for the part you actually need rather than a list rate. Fill in what you know — we will ask about the rest."
      />

      <Breadcrumbs trail={[{ label: "Request a Quote" }]} />

      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <h2 className="label-technical border-b border-hairline pb-4 text-navy">
                  Before you start
                </h2>
                <dl className="mt-6 space-y-7">
                  {expectations.map((item, i) => (
                    <div key={item.title}>
                      <dt className="flex items-baseline gap-2.5">
                        <span
                          aria-hidden="true"
                          className="label-technical tabular text-copper-600"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-[family-name:var(--font-display)] text-[1rem] font-bold text-navy">
                          {item.title}
                        </span>
                      </dt>
                      <dd className="mt-2.5 text-[0.875rem] leading-[1.7] text-slate">
                        {item.body}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-9 rounded-md border border-hairline bg-surface p-5">
                  <p className="label-technical text-slate">
                    Prefer to speak to someone
                  </p>
                  <a
                    href={company.phoneHref}
                    className="tabular mt-2.5 block text-[1.125rem] font-bold text-navy hover:text-copper-600"
                  >
                    {company.phone}
                  </a>
                  <p className="mt-2 text-[0.75rem] leading-relaxed text-slate">
                    {company.owner} · {company.ownerTitle}. Technical questions
                    answered directly.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <Reveal delay={60}>
                <div className="rounded-lg border border-hairline bg-surface p-6 sm:p-9">
                  <Suspense
                    fallback={
                      <p className="py-16 text-center text-[0.875rem] text-slate">
                        Loading form…
                      </p>
                    }
                  >
                    <QuoteFormSection />
                  </Suspense>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
