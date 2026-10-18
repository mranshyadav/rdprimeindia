"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import { EnquiryForm } from "./EnquiryForm";

/**
 * Reads ?product= / ?category= so a "Request Pricing" click from a product
 * card or category page lands on a form that is already filled in.
 */
export function QuoteFormSection() {
  const params = useSearchParams();
  const productParam = params.get("product") ?? "";
  const product = products.find((p) => p.slug === productParam);

  return (
    <>
      <h2 className="text-[1.5rem] leading-tight font-semibold tracking-[-0.02em] text-navy">
        {product ? `Quote request — ${product.name}` : "Quote request"}
      </h2>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">
        {product
          ? "We have pre-filled the product for you. Add your quantity and any dimensions that differ from the listing."
          : "Fields marked with an asterisk are required. Everything else helps us quote more accurately."}
      </p>
      <div className="mt-8">
        <EnquiryForm
          kind="quote"
          defaultProductSlug={product?.slug}
          defaultCategoryId={product?.category ?? params.get("category") ?? undefined}
          submitLabel="Submit Quote Request"
        />
      </div>
    </>
  );
}
