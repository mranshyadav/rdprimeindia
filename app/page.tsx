import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { CtaSection } from "@/components/CtaSection";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  addressOneLine,
  company,
  credibilityFacts,
  materialsWorked,
  packagingFormats,
} from "@/data/company";
import { industries } from "@/data/industries";
import { accentByIndex, accentFor } from "@/lib/accents";
import { categories, featuredProducts, products } from "@/data/products";

export const metadata: Metadata = {
  title:
    "Rubber & Plastic Component Manufacturer in Mathura — RD Prime India",
  description:
    "RD Prime India manufactures moulded rubber and plastic components — silicone and nitrile O-rings, rubber gaskets, bushes, EPDM grommets, washers and custom moulded parts. Based in Mathura, Uttar Pradesh.",
  alternates: { canonical: "/" },
};

/* ──────────────────────────────── strengths ──────────────────────────────── */
const strengths = [
  {
    label: "01",
    title: "A focused component range",
    body: `${products.length} listings across ${categories.length} families — O-rings and gaskets, bushes and bushings, grommets, plugs and end caps, washers and pads, and custom moulded parts. Narrow enough to know well, broad enough to cover most static sealing and anti-vibration needs on an assembly.`,
  },
  {
    label: "02",
    title: "Specifications stated up front",
    body: "Material, hardness, inner and outer diameter, section thickness and packaging are published against each listing — the figures a procurement engineer needs before raising an enquiry, not after a phone call.",
  },
  {
    label: "03",
    title: "Built to your requirement",
    body: `${products.filter((p) => p.customisable).length} listings are explicitly made to buyer specification, with size, thickness, weight and colour customised. Send a drawing, a dimension sheet or the part itself and the works will confirm what can be produced.`,
  },
  {
    label: "04",
    title: "Materials matched to the duty",
    body: "Silicone for temperature range, nitrile for oil and fuel contact, EPDM for weathering and water, natural rubber for general anti-vibration, PVC and nylon for rigid parts — with metal inserts where a plastic housing needs a hard bore.",
  },
  {
    label: "05",
    title: "Volume supply, sensible minimums",
    body: "Minimum orders run from 1,000 pieces on general industrial O-rings up to 50,000 on high-volume gaskets. Smaller minimums on the general-duty lines make trial and replacement orders practical.",
  },
  {
    label: "06",
    title: "A direct line to the proprietor",
    body: `Enquiries reach ${company.owner} and the works directly. For a buyer qualifying a new supplier, that means technical questions get answered by someone who can actually commit to them.`,
  },
];

/* ──────────────────────────── how we work ───────────────────────────────── */
const workflow = [
  {
    step: "01",
    title: "Requirement discussion",
    body: "Tell us the component, the assembly it goes into and the duty it has to survive — temperature, media contact, movement, load. If you are not sure which part you need, describe the problem and we will narrow it down.",
  },
  {
    step: "02",
    title: "Specification",
    body: "We fix the material, hardness, dimensions and colour against your application, working from your drawing, a dimension sheet or a sample part. Where our published listing is close but not exact, we tell you what can be changed.",
  },
  {
    step: "03",
    title: "Quotation",
    body: "You receive a price against your quantity, with the packaging format and the minimum order stated plainly. Pricing is quotation-based, so it reflects your actual specification and volume.",
  },
  {
    step: "04",
    title: "Moulding",
    body: "Parts are moulded in the specified material at the agreed quantity. The catalogue is produced in silicone, natural, EPDM and nitrile rubber, and in PVC, nylon and engineering plastics.",
  },
  {
    step: "05",
    title: "Packing & dispatch",
    body: `Parts are packed in the format agreed for the order — ${packagingFormats.join(", ").toLowerCase()} — and dispatched from Mathura, with the order coordinated directly through our team.`,
  },
];

export default function HomePage() {
  const featured = featuredProducts();

  return (
    <>
      {/* ═══════════════════ 2. Hero ═══════════════════ */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden="true" className="bg-blueprint absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_82%_12%,rgba(198,107,61,0.18),transparent_58%)]"
        />
        {/* Cool counter-light on the opposite corner. Two low-opacity sources
            give the navy depth and direction; a single flat fill reads dead. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(100%_80%_at_8%_95%,rgba(66,118,161,0.22),transparent_62%)]"
        />
        <Container width="wide">
          <div className="relative grid items-center gap-12 py-14 lg:grid-cols-12 lg:gap-10 lg:py-24 xl:py-28">
            {/* Copy */}
            <div className="lg:col-span-6 xl:col-span-5">
              <p className="label-technical flex items-center gap-3 text-copper-light">
                <span aria-hidden="true" className="h-px w-8 bg-copper/60" />
                Industrial Rubber &amp; Plastic Components
              </p>

              <h1 className="mt-6 text-[2.125rem] leading-[1.08] font-extrabold tracking-[-0.028em] text-balance sm:text-[2.625rem] lg:text-[2.75rem] xl:text-[3.125rem]">
                Sealing, bushing and moulded parts.
                <span className="mt-2 block text-navy-200">
                  Specified precisely. Supplied in volume.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-[1.0625rem] leading-[1.68] text-navy-100/85">
                RD Prime India manufactures moulded rubber and plastic
                components for automotive, electrical and general industrial
                assemblies — silicone and nitrile O-rings, flange gaskets,
                bushings, EPDM grommets, washers and parts built to your
                drawing.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/products" variant="accent" size="lg">
                  Explore Our Products
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/request-a-quote" variant="onDark" size="lg">
                  Request a Quote
                </ButtonLink>
              </div>

              <dl className="mt-11 grid max-w-md grid-cols-3 gap-6 border-t border-white/12 pt-7">
                {[
                  { k: "Materials", v: "6+" },
                  { k: "Listings", v: String(products.length) },
                  { k: "MOQ from", v: "1,000" },
                ].map((item) => (
                  <div key={item.k}>
                    <dd className="tabular font-[family-name:var(--font-display)] text-[1.625rem] leading-none font-extrabold text-white">
                      {item.v}
                    </dd>
                    <dt className="label-technical mt-2.5 text-navy-200/75">
                      {item.k}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            {/* Visual — the company's own product photography, in an
                editorial split that reads as a brand campaign rather than a
                catalogue thumbnail. */}
            <div className="lg:col-span-6 lg:col-start-7 xl:col-span-7">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <figure className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-md ring-1 ring-white/10">
                  <Image
                    src="/products/silicon-o-rings.jpg"
                    alt="Silicone and rubber O-rings in a range of sizes and colours, manufactured by RD Prime India"
                    fill
                    priority
                    sizes="(min-width: 1280px) 760px, (min-width: 1024px) 50vw, 94vw"
                    className="object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-transparent to-transparent"
                  />
                  <figcaption className="label-technical absolute bottom-4 left-4 text-white/90">
                    O-Rings &amp; Gaskets · Silicone, EPDM, Nitrile
                  </figcaption>
                </figure>

                <figure className="relative aspect-[4/3] overflow-hidden rounded-md ring-1 ring-white/10">
                  <Image
                    src="/products/stabilizer-bar-rubber-bushing.jpg"
                    alt="Black natural rubber stabilizer bar bushings manufactured by RD Prime India"
                    fill
                    priority
                    sizes="(min-width: 1024px) 24vw, 46vw"
                    className="object-cover object-center"
                  />
                </figure>

                <figure className="relative aspect-[4/3] overflow-hidden rounded-md ring-1 ring-white/10">
                  <Image
                    src="/products/rubber-flange-gaskets.jpeg"
                    alt="Black flat rubber flange gaskets with bolt holes, manufactured by RD Prime India"
                    fill
                    sizes="(min-width: 1024px) 24vw, 46vw"
                    className="object-cover object-center"
                  />
                </figure>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════ 3. Credibility strip ═══════════════════ */}
      <section
        aria-label="Company information"
        className="border-b border-hairline bg-canvas"
      >
        <Container>
          <dl className="grid grid-cols-2 gap-px bg-hairline sm:grid-cols-3 lg:grid-cols-5">
            {credibilityFacts.map((fact) => (
              <div key={fact.label} className="bg-surface px-5 py-7">
                <dt className="label-technical text-slate">{fact.label}</dt>
                <dd className="tabular mt-3 font-[family-name:var(--font-display)] text-[1.0625rem] leading-tight font-bold text-navy">
                  {fact.value}
                </dd>
                <dd className="mt-1.5 text-[0.75rem] leading-snug text-slate">
                  {fact.detail}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ═══════════════════ 4. Product categories ═══════════════════ */}
      <section className="py-18 lg:py-24">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Catalogue"
                title="Industrial rubber &amp; plastic products"
                description="Five component families covering static sealing, anti-vibration mounting, cable protection and moulded parts built to your specification."
              />
              <Link
                href="/products"
                className="group inline-flex shrink-0 items-center gap-2 text-[0.875rem] font-semibold text-navy hover:text-copper-600"
              >
                View full catalogue
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          {/* Category rail */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
            {categories.map((category, i) => {
              const accent = accentFor(category.accent);
              return (
              <Reveal key={category.id} delay={i * 60}>
                <Link
                  href={`/products?category=${category.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-card"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 z-10 h-1 ${accent.rule}`}
                  />
                  <div className="relative aspect-[5/4] overflow-hidden bg-canvas lg:aspect-square">
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 220px, (min-width: 640px) 45vw, 92vw"
                      className="object-cover object-center transition-transform duration-[650ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3
                      className={`text-[0.9375rem] leading-snug font-semibold text-navy transition-colors ${accent.groupHoverText}`}
                    >
                      {category.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[0.75rem] leading-[1.6] text-slate">
                      {category.blurb}
                    </p>
                  </div>
                </Link>
              </Reveal>
              );
            })}
          </div>

          {/* Featured listings */}
          <Reveal className="mt-16">
            <h3 className="label-technical border-b border-hairline pb-4 text-navy">
              Selected listings
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 6).map((product, i) => (
              <Reveal key={product.slug} delay={(i % 3) * 70}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════ 5. Why RD Prime India ═══════════════════ */}
      <section className="border-y border-hairline bg-surface py-18 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  eyebrow="Why RD Prime India"
                  title="Reasons to start a conversation"
                  description="We are a young firm — established in 2024 — so we would rather you judged us on what is verifiable: the range we actually make, the specifications we publish, and how directly you can reach the people who produce the parts."
                />
              </Reveal>

              <Reveal delay={120} className="mt-10">
                <figure className="relative aspect-[4/3] overflow-hidden rounded-md border border-hairline">
                  <Image
                    src="/products/rubber-end-cap.jpg"
                    alt="A range of moulded silicone sealing components produced by RD Prime India"
                    fill
                    sizes="(min-width: 1024px) 460px, 92vw"
                    className="object-cover object-center"
                  />
                </figure>
                <figcaption className="mt-3 text-[0.75rem] leading-relaxed text-slate">
                  Sealing components across several materials and sizes &mdash;
                  from the company&rsquo;s own product photography.
                </figcaption>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:pl-4">
              <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
                {strengths.map((item, i) => (
                  <Reveal key={item.label} delay={(i % 2) * 80}>
                    <div className="border-t border-hairline pt-5">
                      <span
                        aria-hidden="true"
                        className="label-technical tabular text-copper-600"
                      >
                        {item.label}
                      </span>
                      <dt className="mt-3 font-[family-name:var(--font-display)] text-[1.0625rem] leading-snug font-bold text-navy">
                        {item.title}
                      </dt>
                      <dd className="mt-2.5 text-[0.875rem] leading-[1.68] text-slate">
                        {item.body}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════ 6. Manufacturing & quality ═══════════════════ */}
      <section className="py-18 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Manufacturing &amp; Quality"
              title="How an order moves through the works"
              description="The sequence below describes how an enquiry becomes a delivered part. It reflects what the company actually does — we have deliberately not claimed laboratory testing, automated inspection or certified quality procedures, because none of those are documented."
            />
          </Reveal>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-5">
            {workflow.map((item, i) => (
              <Reveal key={item.step} delay={i * 70} as="li">
                <div className="flex h-full flex-col bg-surface p-6 lg:p-7">
                  <div className="flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className={`tabular font-[family-name:var(--font-display)] text-[1.75rem] leading-none font-extrabold ${accentByIndex(i).text}`}
                    >
                      {item.step}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-hairline"
                    />
                  </div>
                  <h3 className="mt-5 text-[0.9375rem] leading-snug font-bold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.8125rem] leading-[1.68] text-slate">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          {/* Materials & packaging — verified capability, stated plainly */}
          <Reveal className="mt-14">
            <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline lg:grid-cols-3">
              <div className="bg-navy p-7 lg:p-8">
                <h3 className="label-technical text-copper-light">Materials worked</h3>
                <p className="mt-4 text-[0.875rem] leading-relaxed text-navy-200">
                  Taken from the material field on our own product listings —
                  not a wish list.
                </p>
              </div>
              <div className="bg-surface p-7 lg:col-span-2 lg:p-8">
                <ul className="flex flex-wrap gap-2">
                  {materialsWorked.map((material) => (
                    <li
                      key={material}
                      className="rounded-xs border border-hairline bg-canvas px-3 py-2 text-[0.8125rem] font-medium text-navy"
                    >
                      {material}
                    </li>
                  ))}
                </ul>
                <h4 className="label-technical mt-8 text-slate">
                  Packaging formats
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {packagingFormats.map((format) => (
                    <li
                      key={format}
                      className="rounded-xs border border-hairline px-3 py-2 text-[0.8125rem] text-graphite"
                    >
                      {format}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/manufacturing"
                  className="group mt-8 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-navy hover:text-copper-600"
                >
                  Read about manufacturing &amp; quality
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ═══════════════════ 7. Industries served ═══════════════════ */}
      <section className="border-y border-hairline bg-surface py-18 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Industries Served"
              title="Where these components are used"
              description="Each industry below appears because at least one product listing names it in its own usage specification. We have not added sectors on the strength of plausibility."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal key={industry.slug} delay={(i % 3) * 70}>
                <Link
                  href={`/industries#${industry.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-card"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 z-10 h-1 ${accentByIndex(i).rule}`}
                  />
                  <div className="relative aspect-[16/9] overflow-hidden bg-canvas">
                    <Image
                      src={industry.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
                      className="object-cover object-center transition-transform duration-[650ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.035]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3
                      className={`text-[1.0625rem] leading-snug font-semibold text-navy transition-colors ${accentByIndex(i).groupHoverText}`}
                    >
                      {industry.name}
                    </h3>
                    <p className="mt-2.5 mb-5 text-[0.875rem] leading-[1.65] text-slate">
                      {industry.summary}
                    </p>
                    <p className="tabular mt-auto border-t border-hairline pt-4 text-[0.75rem] text-slate">
                      <span className={`label-technical mr-1.5 ${accentByIndex(i).text}`}>
                        Listings
                      </span>
                      {industry.evidence.length}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════ 8. Custom requirements ═══════════════════ */}
      <section className="py-18 lg:py-24">
        <Container>
          <Reveal>
            <div className="overflow-hidden rounded-lg border border-hairline bg-surface">
              <div className="grid lg:grid-cols-12">
                <div className="p-8 lg:col-span-7 lg:p-14">
                  <p className="label-technical flex items-center gap-3 text-copper-600">
                    <span aria-hidden="true" className="h-px w-7 bg-copper/50" />
                    Custom Requirements
                  </p>
                  <h2 className="mt-5 max-w-lg text-[1.625rem] leading-[1.15] font-semibold tracking-[-0.021em] text-navy sm:text-[2.125rem]">
                    Looking for the right rubber product for your application?
                  </h2>
                  <p className="mt-5 max-w-lg text-[1rem] leading-[1.7] text-slate">
                    Share your requirements with our team to discuss product
                    availability, specifications and pricing.{" "}
                    {products.filter((p) => p.customisable).length} of our
                    listings are made to buyer specification — size, thickness,
                    weight and colour customised — so if nothing in the
                    catalogue matches exactly, send a drawing, a dimension
                    sheet or a sample part and we will confirm what can be
                    produced.
                  </p>

                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      "Material and hardness selection",
                      "Non-standard dimensions",
                      "Colour matching",
                      "Packaging to your line",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[0.875rem] text-graphite"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-copper-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="square"
                        >
                          <path d="M3 8.5l3.5 3.5L13 4.5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href="/request-a-quote" variant="primary" size="lg">
                      Discuss Your Requirements
                      <ArrowRight />
                    </ButtonLink>
                    <ButtonLink href={company.phoneHref} variant="secondary" size="lg">
                      Call {company.phone}
                    </ButtonLink>
                  </div>
                </div>

                <div className="relative min-h-64 lg:col-span-5">
                  <Image
                    src="/products/plastic-end-caps.jpg"
                    alt="An assortment of moulded plastic components produced by RD Prime India"
                    fill
                    sizes="(min-width: 1024px) 500px, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ═══════════════════ 9. Trust & business information ═══════════════════ */}
      <section className="border-t border-hairline bg-surface py-18 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  eyebrow="Business Information"
                  title="Who you would be dealing with"
                  description="Registration and contact details as they appear on our public records, so a buyer can verify us before raising an enquiry."
                />
              </Reveal>
            </div>

            <Reveal delay={100} className="lg:col-span-7">
              <dl className="overflow-hidden rounded-md border border-hairline">
                {[
                  { k: "Registered name", v: company.legalName },
                  { k: "Business type", v: `${company.businessType} · ${company.legalStatus}` },
                  { k: "Year established", v: String(company.establishedYear) },
                  { k: "GSTIN", v: company.gstin },
                  { k: "Proprietor", v: `${company.owner} · ${company.ownerTitle}` },
                  { k: "Works & office", v: addressOneLine },
                  { k: "Bankers", v: company.bankers },
                  { k: "Country of origin", v: company.countryOfOrigin },
                ].map((row, i) => (
                  <div
                    key={row.k}
                    className={`grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-4 ${
                      i % 2 === 1 ? "bg-canvas/60" : "bg-surface"
                    } ${i > 0 ? "border-t border-hairline" : ""}`}
                  >
                    <dt className="text-[0.8125rem] font-medium text-slate">
                      {row.k}
                    </dt>
                    <dd className="tabular text-[0.875rem] leading-relaxed font-semibold text-navy">
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-5 text-[0.75rem] leading-relaxed text-slate">
                We hold no certifications and make no claims to any. Our
                existing public trading record is on our{" "}
                <a
                  href={company.indiamartUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-navy underline decoration-hairline-strong underline-offset-2 hover:decoration-copper"
                >
                  IndiaMART listing
                </a>
                , where our catalogue and ratings can be reviewed independently.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ═══════════════════ 10. Final CTA ═══════════════════ */}
      <CtaSection />
    </>
  );
}
