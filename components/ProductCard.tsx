import Image from "next/image";
import Link from "next/link";
import { accentFor } from "@/lib/accents";
import { categoryById, type Product } from "@/data/products";

/**
 * The single product card used on the homepage, the catalogue and the
 * related-products rail. Fixed 4:3 image frame keeps grids aligned even
 * though the source photography has mixed aspect ratios.
 */
export function ProductCard({
  product,
  priority = false,
  sizes = "(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw",
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
}) {
  const category = categoryById(product.category);
  const accent = accentFor(category.accent);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-surface transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-[0_2px_4px_rgb(20_40_61/0.05),0_16px_32px_-12px_rgb(20_40_61/0.16)]">
      {/* Category hue, carried from the homepage tile through to this card. */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 z-10 h-[3px] ${accent.rule}`}
      />
      <div className="relative aspect-[4/3] overflow-hidden bg-canvas">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-center transition-transform duration-[650ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.035]"
        />
        {product.customisable ? (
          <span className="label-technical absolute top-3 left-3 rounded-xs bg-navy/90 px-2 py-1.5 text-white backdrop-blur-sm">
            Built to requirement
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className={`label-technical ${accent.text}`}>{category.shortName}</p>
        <h3 className="mt-2.5 text-[1.0625rem] leading-snug font-semibold text-navy">
          <Link href={`/products/${product.slug}`} className="hover:text-copper-600">
            <span className="absolute inset-0" aria-hidden="true" />
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-[0.875rem] leading-[1.6] text-slate">
          {product.summary}
        </p>

        {product.moq ? (
          <p className="tabular mt-4 mb-5 text-[0.75rem] text-slate">
            <span className="label-technical mr-1.5 text-navy/55">MOQ</span>
            {product.moq}
          </p>
        ) : null}

        {/* mt-auto pins the action row to the card floor, so a two-line and a
            three-line summary still line up across a row of the grid. */}
        <div className="mt-auto flex items-center gap-4 border-t border-hairline pt-4 text-[0.8125rem] font-semibold">
          <span className="relative z-10 text-navy group-hover:text-copper-600">
            View Product
          </span>
          <Link
            href={`/request-a-quote?product=${encodeURIComponent(product.slug)}`}
            // -my-1.5 keeps the row height unchanged while taking the tap target to 32px
            className="relative z-10 -my-1.5 ml-auto inline-flex items-center py-1.5 text-copper-600 hover:text-copper-700 hover:underline"
          >
            Request Pricing
          </Link>
        </div>
      </div>
    </article>
  );
}
