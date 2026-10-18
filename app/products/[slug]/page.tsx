import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ButtonLink } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SpecTable } from "@/components/SpecTable";
import { company } from "@/data/company";
import { accentFor } from "@/lib/accents";
import {
  categoryById,
  productBySlug,
  products,
  relatedProducts,
} from "@/data/products";
import { absoluteUrl } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: "Product not found" };

  const category = categoryById(product.category);
  return {
    title: `${product.name} — ${category.name}`,
    description: `${product.summary} Manufactured by RD Prime India, Mathura. Request a quote against your specification and quantity.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | RD Prime India`,
      description: product.summary,
      url: `/products/${product.slug}`,
      images: [{ url: product.image, width: product.imageWidth, height: product.imageHeight, alt: product.imageAlt }],
    },
  };
}

export default async function ProductDetailPage({ params }: Params) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const category = categoryById(product.category);
  const accent = accentFor(category.accent);
  const related = relatedProducts(product, 3);
  const gallery = [product.image, ...(product.gallery ?? [])];

  /**
   * Product structured data. No `offers`, no `price`, no `availability` and no
   * `aggregateRating` — pricing is quotation-based and no review data is
   * verified, so emitting any of those would be fabrication.
   */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.overview,
    image: gallery.map((g) => absoluteUrl(g)),
    category: category.name,
    url: absoluteUrl(`/products/${product.slug}`),
    ...(product.materials?.length
      ? { material: product.materials.join(", ") }
      : {}),
    brand: { "@type": "Brand", name: company.legalName },
    manufacturer: {
      "@type": "Organization",
      name: company.legalName,
      "@id": absoluteUrl("/#organization"),
    },
    ...(product.specs.length
      ? {
          additionalProperty: product.specs.map((s) => ({
            "@type": "PropertyValue",
            name: s.label,
            value: s.value,
          })),
        }
      : {}),
  };

  return (
    <>
      <Breadcrumbs
        trail={[
          { href: "/products", label: "Products" },
          { href: `/products?category=${category.id}`, label: category.name },
          { label: product.name },
        ]}
      />

      {/* ── Product header ─────────────────────────────────────────────── */}
      <section className="border-b border-hairline bg-surface py-10 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Imagery */}
            <div className="lg:col-span-6">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-md border border-hairline bg-canvas">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 580px, 94vw"
                  className="object-cover object-center"
                />
              </figure>

              {gallery.length > 1 ? (
                <ul className="mt-3 grid grid-cols-4 gap-3">
                  {gallery.map((src, i) => (
                    <li key={src}>
                      <figure className="relative aspect-square overflow-hidden rounded-sm border border-hairline bg-canvas">
                        <Image
                          src={src}
                          alt={
                            i === 0
                              ? product.imageAlt
                              : `${product.name} — additional view ${i}`
                          }
                          fill
                          sizes="140px"
                          className="object-cover object-center"
                        />
                      </figure>
                    </li>
                  ))}
                </ul>
              ) : null}

              <p className="mt-4 text-[0.6875rem] leading-relaxed text-slate">
                Product photography supplied by {company.legalName}.
              </p>
            </div>

            {/* Summary & actions */}
            <div className="lg:col-span-6">
              <Link
                href={`/products?category=${category.id}`}
                className={`label-technical inline-flex items-center gap-2 hover:underline ${accent.text}`}
              >
                {category.name}
              </Link>

              <h1 className="mt-4 text-[1.875rem] leading-[1.12] font-semibold tracking-[-0.022em] text-navy sm:text-[2.25rem]">
                {product.name}
              </h1>

              <p className="mt-5 text-[1.0625rem] leading-[1.7] text-slate">
                {product.overview}
              </p>

              {/* Key facts at a glance */}
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-hairline bg-hairline">
                {[
                  product.moq ? { k: "Minimum order", v: product.moq } : null,
                  product.materials?.length
                    ? { k: "Material", v: product.materials.join(", ") }
                    : null,
                  product.applications?.length
                    ? { k: "Application", v: product.applications.join(", ") }
                    : null,
                  { k: "Pricing", v: "On quotation" },
                ]
                  .filter((row): row is { k: string; v: string } => Boolean(row))
                  .map((row) => (
                    <div key={row.k} className="bg-surface px-4 py-4">
                      <dt className="label-technical text-slate">{row.k}</dt>
                      <dd className="tabular mt-2 text-[0.875rem] leading-snug font-semibold text-navy">
                        {row.v}
                      </dd>
                    </div>
                  ))}
              </dl>

              {product.customisable ? (
                <p className="mt-5 flex gap-2.5 rounded-sm border-l-2 border-copper bg-copper-50 px-4 py-3 text-[0.8125rem] leading-relaxed text-graphite">
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-px size-4 shrink-0 text-copper-600" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square">
                    <path d="M3 8.5l3.5 3.5L13 4.5" />
                  </svg>
                  <span>
                    <strong className="font-semibold">
                      Built to requirement.
                    </strong>{" "}
                    This listing is customised to buyer specification. Send a
                    drawing, dimension sheet or sample with your enquiry.
                  </span>
                </p>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#enquiry" variant="accent" size="lg">
                  Enquire About This Product
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href={company.phoneHref} variant="secondary" size="lg">
                  Call {company.phone}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Specifications ─────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="text-[1.375rem] font-semibold tracking-[-0.018em] text-navy sm:text-[1.625rem]">
                  Technical specifications
                </h2>
                <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-slate">
                  Shown exactly as published for this listing. Anything not
                  listed here has not been specified by the company — ask and we
                  will confirm rather than estimate.
                </p>
                <div className="mt-7">
                  <SpecTable
                    specs={product.specs}
                    note={product.sourceNote}
                    caption={`${product.name} · as listed`}
                  />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={100}>
                <h2 className="text-[1.375rem] font-semibold tracking-[-0.018em] text-navy sm:text-[1.625rem]">
                  Intended applications
                </h2>
                <div className="mt-7 space-y-3">
                  {product.applications?.length ? (
                    product.applications.map((app) => (
                      <div
                        key={app}
                        className="flex items-start gap-3 rounded-md border border-hairline bg-surface p-4"
                      >
                        <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-copper-600" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square">
                          <path d="M3 8.5l3.5 3.5L13 4.5" />
                        </svg>
                        <p className="text-[0.875rem] font-medium text-navy">
                          {app}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-md border border-dashed border-hairline-strong bg-canvas p-5">
                      <p className="text-[0.875rem] leading-relaxed text-slate">
                        The company has not specified an application for this
                        listing. Describe your duty — temperature, media
                        contact, movement, load — and our team will tell you
                        whether this part suits it.
                      </p>
                    </div>
                  )}
                </div>

                <dl className="mt-7 overflow-hidden rounded-md border border-hairline">
                  <div className="flex items-baseline justify-between gap-4 bg-surface px-4 py-3.5">
                    <dt className="text-[0.8125rem] text-slate">
                      Source category
                    </dt>
                    <dd className="text-[0.8125rem] font-semibold text-navy">
                      {product.sourceCategory}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-t border-hairline bg-canvas/60 px-4 py-3.5">
                    <dt className="text-[0.8125rem] text-slate">
                      Manufactured in
                    </dt>
                    <dd className="text-[0.8125rem] font-semibold text-navy">
                      {company.address.city}, {company.address.state}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Enquiry form ───────────────────────────────────────────────── */}
      <section
        id="enquiry"
        className="scroll-mt-24 border-y border-hairline bg-surface py-14 lg:py-20"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="label-technical flex items-center gap-3 text-copper-600">
                <span aria-hidden="true" className="h-px w-7 bg-copper/50" />
                Product Enquiry
              </p>
              <h2 className="mt-5 text-[1.625rem] leading-[1.15] font-semibold tracking-[-0.021em] text-navy sm:text-[2rem]">
                Enquire about {product.name}
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-[1.7] text-slate">
                Tell us your quantity and specification and our team will come
                back with availability and pricing. If your dimensions differ
                from the listing, say so — several of our lines are moulded to
                buyer requirement.
              </p>

              <dl className="mt-8 space-y-4 border-t border-hairline pt-7 text-[0.8125rem]">
                <div>
                  <dt className="label-technical mb-1.5 text-slate">
                    Prefer to call
                  </dt>
                  <dd>
                    <a
                      href={company.phoneHref}
                      className="tabular font-semibold text-navy hover:text-copper-600"
                    >
                      {company.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="label-technical mb-1.5 text-slate">
                    Contact person
                  </dt>
                  <dd className="text-graphite">
                    {company.owner} · {company.ownerTitle}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-8">
              <div className="rounded-lg border border-hairline bg-canvas p-6 sm:p-8">
                <EnquiryForm
                  kind="product"
                  lockedProductSlug={product.slug}
                  submitLabel="Submit Product Enquiry"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Related products ───────────────────────────────────────────── */}
      {related.length > 0 ? (
        <section className="py-14 lg:py-20">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[1.375rem] font-semibold tracking-[-0.018em] text-navy sm:text-[1.625rem]">
                  Related products
                </h2>
                <p className="mt-2.5 text-[0.9375rem] text-slate">
                  Other listings in {category.name}.
                </p>
              </div>
              <Link
                href={`/products?category=${category.id}`}
                className="group inline-flex shrink-0 items-center gap-2 text-[0.875rem] font-semibold text-navy hover:text-copper-600"
              >
                View all
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        // Built from the local catalogue only — no remote or user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
