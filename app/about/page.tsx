import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ButtonLink } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CtaSection } from "@/components/CtaSection";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  addressOneLine,
  company,
  materialsWorked,
  selfDescription,
} from "@/data/company";
import { categories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "About Us — Rubber & Plastic Component Manufacturer in Mathura",
  description:
    "R D Prime India is a GST-registered proprietorship established in 2024 in Mathura, Uttar Pradesh, manufacturing moulded rubber and plastic components. Company background, product specialisation and contact details.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const customisable = products.filter((p) => p.customisable).length;

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A component manufacturer in Mathura, working to buyer specification."
        description="RD Prime India was established in 2024 as a proprietorship under Shailendra Yadav. We mould rubber and plastic components — sealing, bushing, cable protection and parts built to drawing — for automotive, electrical and general industrial buyers."
      />

      <Breadcrumbs trail={[{ label: "About Us" }]} />

      {/* ── Introduction ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionHeading
                  eyebrow="Company Introduction"
                  title="What we make, and what we don't claim"
                />
                <div className="mt-8 space-y-5 text-[1rem] leading-[1.75] text-graphite">
                  <p>
                    RD Prime India manufactures moulded rubber and plastic
                    components from Mathura, Uttar Pradesh. Our catalogue runs
                    to {products.length} listings across{" "}
                    {categories.length} families: O-rings and gaskets, bushes
                    and bushings, grommets, plugs and end caps, washers and
                    pads, and custom moulded components.
                  </p>
                  <p>
                    We are a new business — registered in 2024 — and we would
                    rather be straightforward about that than dress it up.
                    There is no long company history to tell, no export
                    division, and no certification to display. What we can put
                    in front of a buyer is the range we actually produce, the
                    specifications we publish against each part, the materials
                    we genuinely work in, and a direct line to the person
                    responsible for the order.
                  </p>
                  <p>
                    For a procurement manager, that combination is usually
                    enough to start a trial. Our lowest minimum order is 1,000
                    pieces on general industrial O-rings, which makes a first
                    order practical rather than a commitment.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={120} className="mt-10">
                <figure className="rounded-md border border-hairline bg-surface p-7">
                  <blockquote className="text-[1.0625rem] leading-[1.7] font-medium text-navy italic">
                    “{selfDescription}”
                  </blockquote>
                  <figcaption className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.75rem] text-slate">
                    <span className="label-technical text-copper-600">
                      Primary source
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      The company&rsquo;s own description, quoted verbatim from its{" "}
                      <a
                        href={company.indiamartUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-navy underline decoration-hairline-strong underline-offset-2 hover:decoration-copper"
                      >
                        IndiaMART profile
                      </a>
                      .
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            {/* Business background panel */}
            <Reveal delay={80} className="lg:col-span-5">
              <div className="overflow-hidden rounded-lg border border-hairline bg-surface">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/products/silicone-rubber-products-2.jpeg"
                    alt="Moulded silicone rubber components produced by R D Prime India"
                    fill
                    sizes="(min-width: 1024px) 460px, 94vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-7">
                  <h2 className="label-technical text-navy">
                    Business background
                  </h2>
                  <dl className="mt-5 space-y-px">
                    {[
                      { k: "Registered name", v: company.legalName },
                      { k: "Business type", v: company.businessType },
                      { k: "Legal status", v: company.legalStatus },
                      { k: "Established", v: String(company.establishedYear) },
                      { k: "Proprietor", v: company.owner },
                      { k: "GSTIN", v: company.gstin },
                      { k: "Bankers", v: company.bankers },
                      {
                        k: "Also trades as",
                        v: company.additionalBusiness.join(", "),
                      },
                    ].map((row) => (
                      <div
                        key={row.k}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-hairline py-3 last:border-0"
                      >
                        <dt className="text-[0.8125rem] text-slate">{row.k}</dt>
                        <dd className="tabular text-[0.8125rem] font-semibold text-navy">
                          {row.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Product specialisation ─────────────────────────────────────── */}
      <section className="border-y border-hairline bg-surface py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Product Specialisation"
              title="Five families, and what each one is for"
              description="We would rather be known for a focused range we understand than a catalogue that lists everything. Each family below exists because we mould and supply it."
            />
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => {
              const count = products.filter(
                (p) => p.category === category.id,
              ).length;
              return (
                <Reveal key={category.id} delay={(i % 3) * 70}>
                  <div className="flex h-full flex-col bg-surface p-7">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-[family-name:var(--font-display)] text-[1.0625rem] leading-snug font-bold text-navy">
                        {category.name}
                      </h3>
                      <span className="tabular label-technical shrink-0 text-slate">
                        {count} {count === 1 ? "listing" : "listings"}
                      </span>
                    </div>
                    <p className="mt-3.5 flex-1 text-[0.875rem] leading-[1.68] text-slate">
                      {category.blurb}
                    </p>
                    <Link
                      href={`/products?category=${category.id}`}
                      className="group mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-navy hover:text-copper-600"
                    >
                      View listings
                      <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Capabilities, quality, customer approach ───────────────────── */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            <Reveal>
              <article className="flex h-full flex-col">
                <span className="label-technical tabular text-copper-600">
                  01
                </span>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-[1.25rem] leading-snug font-bold text-navy">
                  Manufacturing capabilities
                </h2>
                <div className="mt-4 space-y-4 text-[0.9375rem] leading-[1.72] text-slate">
                  <p>
                    We mould components in rubber and plastic. The materials
                    below are taken from the material field on our own
                    listings — they are what we have actually produced, not a
                    list of what we could theoretically source.
                  </p>
                  <p>
                    {customisable} listings are made to buyer specification,
                    with size, thickness, weight and colour customised to the
                    requirement. We also fit metal bush inserts into plastic
                    parts where a housing needs a hard, wear-resistant bore.
                  </p>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {materialsWorked.map((m) => (
                    <li
                      key={m}
                      className="rounded-xs border border-hairline bg-surface px-2.5 py-1.5 text-[0.75rem] font-medium text-navy"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="flex h-full flex-col">
                <span className="label-technical tabular text-copper-600">
                  02
                </span>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-[1.25rem] leading-snug font-bold text-navy">
                  Quality philosophy
                </h2>
                <div className="mt-4 space-y-4 text-[0.9375rem] leading-[1.72] text-slate">
                  <p>
                    Our approach to quality is to be specific. Every listing in
                    the catalogue carries the material, hardness, dimensions
                    and packaging we work to, so a buyer can judge the part
                    before raising an enquiry rather than after a sample
                    arrives.
                  </p>
                  <p>
                    Where our published figures are inconsistent — and on a few
                    older listings they are — we flag it on the product page
                    and ask you to confirm with the works instead of quietly
                    editing the number. We think that is more useful to an
                    engineer than a tidy table.
                  </p>
                  <p className="rounded-sm border-l-2 border-hairline-strong bg-canvas px-4 py-3 text-[0.8125rem] text-graphite">
                    We do not operate a documented quality-management system,
                    hold any certification, or run laboratory testing, and we
                    make no claim to. If your approval process requires those,
                    tell us early so neither side wastes time.
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className="flex h-full flex-col">
                <span className="label-technical tabular text-copper-600">
                  03
                </span>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-[1.25rem] leading-snug font-bold text-navy">
                  How we work with customers
                </h2>
                <div className="mt-4 space-y-4 text-[0.9375rem] leading-[1.72] text-slate">
                  <p>
                    Enquiries come to {company.owner} and the works directly.
                    There is no account layer in between, which means a
                    technical question gets answered by someone who can commit
                    to the answer.
                  </p>
                  <p>
                    Pricing is quotation-based against your specification and
                    volume, so you get a price for the part you actually need
                    rather than a list rate you then have to negotiate. We
                    state the minimum order and the packaging format up front.
                  </p>
                  <p>
                    We work in English and Hindi, and we are happy to run an
                    enquiry over the phone if that is faster for you than a
                    form.
                  </p>
                </div>
                <ButtonLink
                  href="/manufacturing"
                  variant="secondary"
                  size="md"
                  className="mt-7 self-start"
                >
                  Manufacturing &amp; Quality
                  <ArrowRight />
                </ButtonLink>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Location & contact ─────────────────────────────────────────── */}
      <section className="border-t border-hairline bg-surface py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  eyebrow="Find Us"
                  title="Company location and contact"
                  description="We are on Goverdhan Road in Mathura, Uttar Pradesh. Visits are by appointment — call ahead and we will make sure someone who can answer your questions is there."
                />
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/contact" variant="primary" size="lg">
                    Contact Our Team
                    <ArrowRight />
                  </ButtonLink>
                  <ButtonLink
                    href={company.phoneHref}
                    variant="secondary"
                    size="lg"
                  >
                    Call {company.phone}
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={100} className="lg:col-span-7">
              <dl className="overflow-hidden rounded-md border border-hairline">
                <div className="bg-canvas px-5 py-4">
                  <dt className="label-technical text-slate">
                    Works &amp; office
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed font-semibold text-navy">
                    {addressOneLine}
                  </dd>
                </div>
                <div className="grid border-t border-hairline sm:grid-cols-2">
                  <div className="border-hairline px-5 py-4 sm:border-r">
                    <dt className="label-technical text-slate">Telephone</dt>
                    <dd className="mt-2">
                      <a
                        href={company.phoneHref}
                        className="tabular text-[0.9375rem] font-semibold text-navy hover:text-copper-600"
                      >
                        {company.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="border-t border-hairline px-5 py-4 sm:border-t-0">
                    <dt className="label-technical text-slate">
                      Contact person
                    </dt>
                    <dd className="mt-2 text-[0.9375rem] font-semibold text-navy">
                      {company.owner}
                      <span className="font-normal text-slate">
                        {" "}
                        · {company.ownerTitle}
                      </span>
                    </dd>
                  </div>
                </div>
                <div className="border-t border-hairline px-5 py-4">
                  <dt className="label-technical text-slate">
                    Public trading record
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={company.indiamartUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.9375rem] font-semibold text-navy underline decoration-hairline-strong underline-offset-2 hover:decoration-copper"
                    >
                      IndiaMART listing
                    </a>
                    <span className="mt-1.5 block text-[0.75rem] text-slate">
                      Our catalogue and buyer ratings, independently hosted.
                    </span>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
