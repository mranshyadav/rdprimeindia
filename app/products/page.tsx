import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CtaSection } from "@/components/CtaSection";
import { PageHero } from "@/components/PageHero";
import { ProductCatalogue } from "@/components/ProductCatalogue";
import { categories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "Explore Our Products — Rubber & Plastic Component Catalogue",
  description:
    "Browse RD Prime India's catalogue of moulded rubber and plastic components: silicone and nitrile O-rings, rubber gaskets, bushes and bushings, EPDM grommets, washers, end caps and custom moulded parts.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Product Catalogue — RD Prime India",
    description:
      "Moulded rubber and plastic components across five families, with published specifications.",
    url: "/products",
  },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title="Explore our products"
        description="Browse our product range and find the right component for your requirement. Search by name or specification, or filter by category, material and application."
      >
        <dl className="mt-10 grid max-w-xl grid-cols-2 gap-6 border-t border-white/12 pt-7 sm:grid-cols-3">
          <div>
            <dd className="tabular font-[family-name:var(--font-display)] text-[1.5rem] leading-none font-extrabold">
              {products.length}
            </dd>
            <dt className="label-technical mt-2.5 text-navy-200/75">
              Listings
            </dt>
          </div>
          <div>
            <dd className="tabular font-[family-name:var(--font-display)] text-[1.5rem] leading-none font-extrabold">
              {categories.length}
            </dd>
            <dt className="label-technical mt-2.5 text-navy-200/75">
              Families
            </dt>
          </div>
          <div>
            <dd className="tabular font-[family-name:var(--font-display)] text-[1.5rem] leading-none font-extrabold">
              1,000
            </dd>
            <dt className="label-technical mt-2.5 text-navy-200/75">
              Lowest MOQ
            </dt>
          </div>
        </dl>
      </PageHero>

      <Breadcrumbs trail={[{ label: "Products" }]} />

      <section className="py-12 lg:py-16">
        <Container>
          <Suspense
            fallback={
              <p className="py-20 text-center text-[0.875rem] text-slate">
                Loading catalogue…
              </p>
            }
          >
            <ProductCatalogue />
          </Suspense>
        </Container>
      </section>

      <CtaSection
        eyebrow="Found what you need?"
        title="Request a quote against your specification."
        description="Send your material, dimensions and quantity and our team will respond with availability and pricing."
      />
    </>
  );
}
