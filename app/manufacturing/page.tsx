import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ButtonLink } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { accentByIndex } from "@/lib/accents";
import { Container } from "@/components/Container";
import { CtaSection } from "@/components/CtaSection";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SpecTable } from "@/components/SpecTable";
import { company, materialsWorked, packagingFormats } from "@/data/company";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Manufacturing & Quality — Materials, Process and What We Verify",
  description:
    "How RD Prime India works: materials moulded, minimum order quantities, packaging formats, the sequence from enquiry to dispatch, and a plain statement of what we do not claim.",
  alternates: { canonical: "/manufacturing" },
};

const stages = [
  {
    step: "01",
    title: "Requirement discussion",
    body: "We start from the duty, not the part number. What does the component sit between, what does it have to survive — temperature, oil or water contact, movement, clamp load — and how many do you need. If you are working from a part that already exists, a photograph and a caliper reading is usually enough to begin.",
    output: "A clear statement of the application",
  },
  {
    step: "02",
    title: "Product specification",
    body: "We fix material, hardness, inner and outer diameter, section thickness and colour against that duty. Where a catalogue listing is close but not exact, we tell you which dimensions can change and which cannot. For the build-to-requirement lines, this step works from your drawing, dimension sheet or sample part.",
    output: "An agreed specification",
  },
  {
    step: "03",
    title: "Quotation",
    body: "You receive a price against your specification and quantity, with the minimum order and the packaging format stated plainly. Pricing is quotation-based throughout — we do not publish unit prices on this site, because a price that ignores your volume and specification is not useful to either of us.",
    output: "A written price and MOQ",
  },
  {
    step: "04",
    title: "Production",
    body: "Parts are moulded in the agreed material at the agreed quantity. Across the catalogue we mould in silicone, natural, EPDM and nitrile rubber, and in PVC, nylon and engineering plastics, and we fit metal bush inserts into plastic parts where the housing needs a hard bore.",
    output: "Parts to specification",
  },
  {
    step: "05",
    title: "Checking before dispatch",
    body: "Parts are checked against the agreed specification before they are packed. We check dimensions and finish against what was quoted. We want to be exact about the limits of this: it is in-house visual and dimensional checking by the people who made the part, not instrumented inspection against a documented sampling plan.",
    output: "Parts checked against the quote",
  },
  {
    step: "06",
    title: "Packing, dispatch & support",
    body: `Parts are packed in the format agreed for the order — ${packagingFormats.join(", ").toLowerCase()} — and dispatched from Mathura. The order is coordinated through our team directly, so if something needs chasing you are speaking to the people who can resolve it.`,
    output: "Delivered and accounted for",
  },
];

/** Verified capability, stated as a specification table rather than prose. */
const capabilitySpecs = [
  { label: "Business type", value: "Manufacturer" },
  { label: "Moulding materials — rubber", value: "Silicone, Natural, EPDM, Nitrile (NBR)" },
  { label: "Moulding materials — plastic", value: "PVC, Nylon, engineering plastics" },
  { label: "Inserts", value: "Metal bush inserts for plastic parts" },
  { label: "Build to requirement", value: "Size, thickness, weight, colour customised" },
  { label: "Minimum order quantity", value: "1,000 – 50,000 pieces, by listing" },
  { label: "Packaging formats", value: "Packet, Polybag, Box, Carton" },
  { label: "Country of origin", value: "Made in India" },
  { label: "Dispatch from", value: "Mathura, Uttar Pradesh" },
];

const notClaimed = [
  {
    title: "No certifications",
    body: "We hold no ISO, IATF, RoHS or REACH certification and claim none. If your approval process requires certified supply, tell us at the enquiry stage.",
  },
  {
    title: "No laboratory testing",
    body: "We do not operate a materials laboratory, and we do not issue test certificates, material certificates or batch traceability documentation.",
  },
  {
    title: "No automated inspection",
    body: "Checking before dispatch is in-house, visual and dimensional. There is no automated or instrumented inspection line, and no documented sampling plan.",
  },
  {
    title: "No export operation",
    body: "We supply within India. Some third-party directory listings auto-generate the word “exporter” against our profile; that is their template, not our claim.",
  },
  {
    title: "No stated capacity figures",
    body: "We do not publish production capacity, machine counts, factory area or headcount. Ask about a specific volume and we will answer against that volume honestly.",
  },
  {
    title: "No named customers",
    body: "We do not display client logos or name the companies we supply. Any supplier that shows you logos it has no permission to use is telling you something about itself.",
  },
];

export default function ManufacturingPage() {
  const moqRange = products
    .map((p) => Number((p.moq ?? "").replace(/[^\d]/g, "")))
    .filter((n) => n > 0);
  const lowest = Math.min(...moqRange);

  return (
    <>
      <PageHero
        eyebrow="Manufacturing &amp; Quality"
        title="How we work — and what we will not claim."
        description="This page sets out the materials we mould, the sequence an order moves through, and an explicit list of the capabilities we do not have. A buyer qualifying a new supplier needs both halves of that picture."
      >
        <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6 border-t border-white/12 pt-7 sm:grid-cols-4">
          {[
            { k: "Rubber grades", v: "4" },
            { k: "Plastic grades", v: "3+" },
            { k: "Lowest MOQ", v: lowest.toLocaleString("en-IN") },
            { k: "Packaging", v: String(packagingFormats.length) },
          ].map((item) => (
            <div key={item.k}>
              <dd className="tabular font-[family-name:var(--font-display)] text-[1.5rem] leading-none font-extrabold">
                {item.v}
              </dd>
              <dt className="label-technical mt-2.5 text-navy-200/75">
                {item.k}
              </dt>
            </div>
          ))}
        </dl>
      </PageHero>

      <Breadcrumbs trail={[{ label: "Manufacturing & Quality" }]} />

      {/* ── Capability table ───────────────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  eyebrow="Capability"
                  title="What we actually mould"
                  description="Every row below is drawn from the specification fields on our own product listings. It is a record of what has gone through the works, not a statement of ambition."
                />
                <figure className="mt-10 overflow-hidden rounded-md border border-hairline">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/products/multicolor-plastic-parts.jpg"
                      alt="A range of moulded rubber and plastic components produced by R D Prime India"
                      fill
                      sizes="(min-width: 1024px) 460px, 94vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <figcaption className="border-t border-hairline bg-surface px-5 py-4 text-[0.75rem] leading-relaxed text-slate">
                    Product photography from {company.legalName}. We do not
                    publish factory or machinery photographs, so none are shown
                    here — a stock photograph of someone else&rsquo;s plant would tell
                    you nothing true about ours.
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            <Reveal delay={100} className="lg:col-span-7">
              <SpecTable
                specs={capabilitySpecs}
                caption="Manufacturing capability · as verified"
              />
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="rounded-md border border-hairline bg-surface p-5">
                  <h3 className="label-technical text-navy">Materials</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {materialsWorked.map((m) => (
                      <li
                        key={m}
                        className="rounded-xs border border-hairline bg-canvas px-2.5 py-1.5 text-[0.75rem] font-medium text-navy"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-md border border-hairline bg-surface p-5">
                  <h3 className="label-technical text-navy">Packaging</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {packagingFormats.map((f) => (
                      <li
                        key={f}
                        className="rounded-xs border border-hairline bg-canvas px-2.5 py-1.5 text-[0.75rem] font-medium text-navy"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.75rem] leading-relaxed text-slate">
                    Packed to the format agreed for your order. Tell us how it
                    arrives at your line.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Process sequence ───────────────────────────────────────────── */}
      <section className="border-y border-hairline bg-surface py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Process"
              title="From enquiry to dispatch"
              description="Six stages, described as they actually happen. Where a stage has a limit worth knowing about, we say so inside the stage rather than in small print."
            />
          </Reveal>

          <ol className="mt-14 space-y-px overflow-hidden rounded-md border border-hairline bg-hairline">
            {stages.map((stage, i) => (
              <Reveal key={stage.step} delay={i * 50} as="li">
                <div className="grid gap-5 bg-surface p-7 lg:grid-cols-12 lg:gap-8 lg:p-9">
                  <div className="lg:col-span-3">
                    <div className="flex items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className={`tabular font-[family-name:var(--font-display)] text-[1.75rem] leading-none font-extrabold ${accentByIndex(i).text}`}
                      >
                        {stage.step}
                      </span>
                      <span aria-hidden="true" className="h-px flex-1 bg-hairline lg:hidden" />
                    </div>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-[1.125rem] leading-snug font-bold text-navy">
                      {stage.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-[0.9375rem] leading-[1.72] text-slate">
                      {stage.body}
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="label-technical mb-2 text-slate">Output</p>
                    <p className="text-[0.8125rem] leading-snug font-semibold text-navy">
                      {stage.output}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── What we don't claim ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy py-16 text-white lg:py-24">
        <div aria-hidden="true" className="bg-blueprint absolute inset-0" />
        <Container>
          <Reveal className="relative">
            <SectionHeading
              tone="dark"
              eyebrow="Stated Plainly"
              title="What we do not claim"
              description="Most supplier websites are a list of capabilities. This is the other list. We publish it because a buyer who finds out later has every right to distrust everything else we said."
            />
          </Reveal>

          <div className="relative mt-14 grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {notClaimed.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 60}>
                <div className="flex h-full flex-col bg-navy p-7">
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="size-5 text-copper-light"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="8" cy="8" r="6.25" />
                    <path d="M5.2 10.8l5.6-5.6" strokeLinecap="square" />
                  </svg>
                  <h3 className="mt-5 font-[family-name:var(--font-display)] text-[1.0625rem] leading-snug font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-[1.68] text-navy-200">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="relative mt-12">
            <div className="flex flex-col gap-5 rounded-md border border-white/15 bg-white/[0.04] p-7 sm:flex-row sm:items-center sm:justify-between lg:p-9">
              <p className="max-w-2xl text-[0.9375rem] leading-[1.7] text-navy-100/90">
                If any of the above rules us out for your application, we would
                rather know at the enquiry stage than after a sample. Tell us
                what your approval process requires and we will give you a
                straight answer.
              </p>
              <ButtonLink
                href="/contact"
                variant="accent"
                size="lg"
                className="shrink-0"
              >
                Ask us directly
                <ArrowRight />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaSection
        eyebrow="Next Step"
        title="Send us the duty, and we\u2019ll specify the part."
        description="Temperature, media contact, movement, load and quantity — that is usually all we need to come back with a specification and a price."
      />
    </>
  );
}
