import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CtaSection } from "@/components/CtaSection";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { accentByIndex } from "@/lib/accents";
import { evidenceProducts, industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries Served — Automotive, Electrical & General Industrial",
  description:
    "Where RD Prime India's rubber and plastic components are used: automotive and auto components, electrical equipment, general industrial machinery, hardware fittings, printing and container closures.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries Served"
        title="Six sectors — each one traceable to a product specification."
        description="An industry appears on this page only when at least one of our listings names it in its own usage field. Each entry shows which parts back the claim, so you can check it rather than take our word for it."
      />

      <Breadcrumbs trail={[{ label: "Industries" }]} />

      {/* ── Overview grid ──────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="At a Glance"
              title="Where these components go"
              description="Jump to a sector, or read down the page. The automotive section covers the largest part of our catalogue."
            />
          </Reveal>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal key={industry.slug} delay={(i % 3) * 60} as="li">
                <a
                  href={`#${industry.slug}`}
                  className="group relative flex h-full items-center justify-between gap-4 overflow-hidden rounded-md border border-hairline bg-surface px-5 py-4 transition-colors hover:border-navy"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-1 ${accentByIndex(i).rule}`}
                  />
                  <span
                    className={`text-[0.9375rem] font-semibold text-navy transition-colors ${accentByIndex(i).groupHoverText}`}
                  >
                    {industry.name}
                  </span>
                  <span className={`tabular label-technical shrink-0 ${accentByIndex(i).text}`}>
                    {industry.evidence.length}
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Industry detail ────────────────────────────────────────────── */}
      {industries.map((industry, index) => {
        const parts = evidenceProducts(industry);
        const alt = index % 2 === 1;
        return (
          <section
            key={industry.slug}
            id={industry.slug}
            className={`scroll-mt-24 border-t border-hairline py-14 lg:py-20 ${
              alt ? "bg-surface" : ""
            }`}
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                {/* Visual */}
                <Reveal
                  className={`lg:col-span-5 ${alt ? "lg:order-2" : ""}`}
                >
                  <figure className="relative aspect-[4/3] overflow-hidden rounded-md border border-hairline bg-canvas">
                    <Image
                      src={industry.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 460px, 94vw"
                      className="object-cover object-center"
                    />
                  </figure>
                </Reveal>

                {/* Copy */}
                <Reveal
                  delay={80}
                  className={`lg:col-span-7 ${alt ? "lg:order-1" : ""}`}
                >
                  <p
                    className={`label-technical tabular flex items-center gap-3 ${accentByIndex(index).text}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-px w-7 ${accentByIndex(index).rule}`}
                    />
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-4 text-[1.625rem] leading-[1.15] font-semibold tracking-[-0.021em] text-navy sm:text-[2rem]">
                    {industry.name}
                  </h2>
                  <p className="mt-4 text-[1rem] leading-[1.72] text-graphite">
                    {industry.summary}
                  </p>
                  <p className="mt-4 text-[0.9375rem] leading-[1.72] text-slate">
                    {industry.application}
                  </p>

                  <p className="mt-6 rounded-sm border-l-2 border-hairline-strong bg-canvas px-4 py-3 text-[0.75rem] leading-relaxed text-slate">
                    <span className="label-technical mr-2 text-navy/60">
                      Source
                    </span>
                    {industry.sourceField}
                  </p>

                  {/* Evidence */}
                  <div className="mt-8">
                    <h3 className="label-technical border-b border-hairline pb-3 text-navy">
                      Listings that back this ({parts.length})
                    </h3>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {parts.map((part) => (
                        <li key={part.slug}>
                          <Link
                            href={`/products/${part.slug}`}
                            className="group flex items-center gap-3 rounded-sm px-2 py-2 transition-colors hover:bg-canvas"
                          >
                            <span className="relative size-10 shrink-0 overflow-hidden rounded-xs border border-hairline bg-canvas">
                              <Image
                                src={part.image}
                                alt=""
                                fill
                                sizes="40px"
                                className="object-cover object-center"
                              />
                            </span>
                            <span className="min-w-0 flex-1 truncate text-[0.8125rem] font-medium text-navy group-hover:text-copper-600">
                              {part.name}
                            </span>
                            <ArrowRight className="size-3.5 shrink-0 text-slate opacity-0 transition-opacity group-hover:opacity-100" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>
        );
      })}

      {/* ── Not listed? ────────────────────────────────────────────────── */}
      <section className="border-t border-hairline py-14 lg:py-20">
        <Container>
          <Reveal>
            <div className="rounded-lg border border-hairline bg-surface p-8 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
                <div className="lg:col-span-8">
                  <h2 className="text-[1.5rem] leading-[1.18] font-semibold tracking-[-0.02em] text-navy sm:text-[1.875rem]">
                    Your sector isn&rsquo;t on this list?
                  </h2>
                  <p className="mt-4 max-w-2xl text-[1rem] leading-[1.72] text-slate">
                    That means no listing names it yet — not that the components
                    are unsuitable. A silicone O-ring does not care what
                    industry it is sealing for; what matters is temperature,
                    media contact and the dimensions of the groove. Describe
                    the duty and we will tell you honestly whether we have
                    something that fits, or whether you would be better served
                    elsewhere.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <Link
                    href="/request-a-quote"
                    className="group inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-navy hover:text-copper-600"
                  >
                    Describe your application
                    <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
