"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo, useState } from "react";
import {
  allApplications,
  allMaterials,
  categories,
  products,
  type CategoryId,
} from "@/data/products";
import { accentFor } from "@/lib/accents";
import { ButtonLink } from "./Button";
import { ProductCard } from "./ProductCard";

type SortKey = "default" | "name" | "moq";

const moqValue = (moq?: string) =>
  moq ? Number(moq.replace(/[^\d]/g, "")) || Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;

const CHIP =
  "rounded-xs border px-3 py-2 text-[0.8125rem] font-medium transition-colors";

export function ProductCatalogue() {
  const router = useRouter();
  const params = useSearchParams();

  const [query, setQuery] = useState("");
  const [material, setMaterial] = useState("all");
  const [application, setApplication] = useState("all");
  const [customOnly, setCustomOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("default");
  /** Mobile only — the sidebar is always expanded from lg up. */
  const [filtersOpen, setFiltersOpen] = useState(false);

  const deferredQuery = useDeferredValue(query);

  /**
   * Category is derived, not stored: the header mega menu and footer deep-link
   * with ?category=…, and an explicit click overrides that. Deriving avoids a
   * state/URL sync effect and keeps the back button working.
   */
  const urlCategory = params.get("category");
  const [categoryOverride, setCategoryOverride] = useState<
    CategoryId | "all" | null
  >(null);
  const category: CategoryId | "all" =
    categoryOverride ??
    (urlCategory && categories.some((c) => c.id === urlCategory)
      ? (urlCategory as CategoryId)
      : "all");
  const setCategory = setCategoryOverride;

  const materials = useMemo(() => allMaterials(), []);
  const applications = useMemo(() => allApplications(), []);

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    let list = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (material !== "all" && !(p.materials ?? []).includes(material)) return false;
      if (application !== "all" && !(p.applications ?? []).includes(application))
        return false;
      if (customOnly && !p.customisable) return false;
      if (!q) return true;
      return [
        p.name,
        p.summary,
        p.sourceCategory,
        ...(p.materials ?? []),
        ...(p.applications ?? []),
        ...p.specs.map((s) => `${s.label} ${s.value}`),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });

    if (sort === "name")
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "moq")
      list = [...list].sort((a, b) => moqValue(a.moq) - moqValue(b.moq));

    return list;
  }, [deferredQuery, category, material, application, customOnly, sort]);

  const activeFilters =
    (category !== "all" ? 1 : 0) +
    (material !== "all" ? 1 : 0) +
    (application !== "all" ? 1 : 0) +
    (customOnly ? 1 : 0);

  const reset = () => {
    setQuery("");
    setCategoryOverride("all");
    setMaterial("all");
    setApplication("all");
    setCustomOnly(false);
    setSort("default");
    setFiltersOpen(false);
    router.replace("/products", { scroll: false });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      {/* ── Filters ───────────────────────────────────────────────────── */}
      <aside className="lg:col-span-3">
        <div className="lg:sticky lg:top-28">
          <div className="flex items-center justify-between gap-3 border-b border-hairline pb-4">
            <h2 className="label-technical text-navy">
              Filter
              {activeFilters > 0 ? (
                <span className="tabular ml-2 rounded-xs bg-navy px-1.5 py-0.5 text-white">
                  {activeFilters}
                </span>
              ) : null}
            </h2>
            <div className="flex items-center gap-4">
              {activeFilters > 0 || query ? (
                <button
                  type="button"
                  onClick={reset}
                  className="text-[0.75rem] font-semibold text-copper-600 hover:underline"
                >
                  Clear all
                </button>
              ) : null}
              {/* Below lg the panel is ~900px tall, which would push every
                  product below the fold on a phone. Collapse it there; the
                  sidebar stays permanently open from lg up. */}
              <button
                type="button"
                onClick={() => setFiltersOpen((v) => !v)}
                aria-expanded={filtersOpen}
                aria-controls="filter-panel"
                className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-navy lg:hidden"
              >
                {filtersOpen ? "Hide" : "Show"} filters
                <svg
                  viewBox="0 0 12 12"
                  aria-hidden="true"
                  className={`size-3 transition-transform duration-200 ${filtersOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M2.5 4.5 6 8l3.5-3.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search sits outside the collapsible panel — it is the primary
              discovery control and must stay reachable on a phone. */}
          <div className="pt-6">
            <label
              htmlFor="product-search"
              className="label-technical mb-3 block text-slate"
            >
              Search by name or spec
            </label>
            <div className="relative">
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5 14 14" strokeLinecap="square" />
              </svg>
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="O-ring, EPDM, 15 mm…"
                className="h-11 w-full rounded-sm border border-hairline-strong bg-surface pr-3 pl-9 text-[0.875rem] text-navy placeholder:text-slate/70 focus:border-navy focus:ring-2 focus:ring-navy/12 focus:outline-none"
              />
            </div>
          </div>

          <div
            id="filter-panel"
            className={`space-y-7 pt-7 ${filtersOpen ? "" : "hidden"} lg:block`}
          >
            {/* Category */}
            <fieldset>
              <legend className="label-technical mb-3 text-slate">
                Category
              </legend>
              <div className="space-y-1">
                {[{ id: "all" as const, name: "All categories" }, ...categories].map(
                  (c) => {
                    const active = category === c.id;
                    // "All" stays navy; a real category carries its own hue,
                    // so the filter state matches the tile the visitor clicked.
                    const accent =
                      c.id === "all" ? null : accentFor(
                        categories.find((x) => x.id === c.id)!.accent,
                      );
                    return (
                      <button
                        key={c.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setCategory(c.id as CategoryId | "all")}
                        className={`flex w-full items-center justify-between gap-2 rounded-sm px-3 py-2.5 text-left text-[0.8125rem] transition-colors ${
                          active
                            ? `font-semibold text-white ${accent ? accent.solid : "bg-navy"}`
                            : "text-graphite hover:bg-canvas"
                        }`}
                      >
                        {c.name}
                        <span
                          className={`tabular text-[0.6875rem] ${
                            active ? "text-white/60" : "text-slate"
                          }`}
                        >
                          {c.id === "all"
                            ? products.length
                            : products.filter((p) => p.category === c.id).length}
                        </span>
                      </button>
                    );
                  },
                )}
              </div>
            </fieldset>

            {/* Material */}
            <fieldset>
              <legend className="label-technical mb-3 text-slate">
                Material
              </legend>
              <div className="flex flex-wrap gap-2">
                {["all", ...materials].map((m) => {
                  const active = material === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setMaterial(m)}
                      className={`${CHIP} ${
                        active
                          ? "border-navy bg-navy text-white"
                          : "border-hairline-strong bg-surface text-graphite hover:border-navy"
                      }`}
                    >
                      {m === "all" ? "Any" : m}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Application */}
            <fieldset>
              <legend className="label-technical mb-3 text-slate">
                Application
              </legend>
              <div className="flex flex-wrap gap-2">
                {["all", ...applications].map((a) => {
                  const active = application === a;
                  return (
                    <button
                      key={a}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setApplication(a)}
                      className={`${CHIP} ${
                        active
                          ? "border-navy bg-navy text-white"
                          : "border-hairline-strong bg-surface text-graphite hover:border-navy"
                      }`}
                    >
                      {a === "all" ? "Any" : a}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <label className="flex cursor-pointer items-start gap-2.5 border-t border-hairline pt-6">
              <input
                type="checkbox"
                checked={customOnly}
                onChange={(e) => setCustomOnly(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-[#14283d]"
              />
              <span className="text-[0.8125rem] leading-snug text-graphite">
                Built to requirement only
                <span className="mt-1 block text-[0.75rem] text-slate">
                  Listings the company states are customised to buyer
                  specification.
                </span>
              </span>
            </label>
          </div>
        </div>
      </aside>

      {/* ── Results ───────────────────────────────────────────────────── */}
      <div className="lg:col-span-9">
        <div className="flex flex-col gap-4 border-b border-hairline pb-4 sm:flex-row sm:items-center sm:justify-between">
          <p
            aria-live="polite"
            className="tabular text-[0.8125rem] text-slate"
          >
            <span className="font-semibold text-navy">{results.length}</span>{" "}
            {results.length === 1 ? "listing" : "listings"}
            {category !== "all"
              ? ` in ${categories.find((c) => c.id === category)?.name}`
              : ""}
          </p>

          <label className="flex items-center gap-2.5 text-[0.8125rem] text-slate">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-9 rounded-sm border border-hairline-strong bg-surface px-2.5 text-[0.8125rem] font-medium text-navy focus:border-navy focus:ring-2 focus:ring-navy/12 focus:outline-none"
            >
              <option value="default">Catalogue order</option>
              <option value="name">Name, A–Z</option>
              <option value="moq">Lowest minimum order</option>
            </select>
          </label>
        </div>

        {results.length === 0 ? (
          <div className="mt-10 rounded-md border border-dashed border-hairline-strong bg-surface px-6 py-16 text-center">
            <h3 className="text-[1.0625rem] font-semibold text-navy">
              No listing matches those filters
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[0.875rem] leading-relaxed text-slate">
              Our catalogue is focused rather than exhaustive. If the component
              you need is not listed, tell us the specification — several of our
              lines are made to buyer requirement.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/request-a-quote" variant="accent" size="md">
                Describe your requirement
              </ButtonLink>
              <button
                type="button"
                onClick={reset}
                className="text-[0.875rem] font-semibold text-navy hover:text-copper-600"
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((product, i) => (
              <ProductCard
                key={product.slug}
                product={product}
                priority={i < 3}
                sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
              />
            ))}
          </div>
        )}

        {/* Catalogue footnote — pricing policy stated honestly */}
        <div className="mt-12 rounded-md border border-hairline bg-surface p-6">
          <h3 className="label-technical text-navy">About this catalogue</h3>
          <p className="mt-3.5 max-w-3xl text-[0.8125rem] leading-[1.7] text-slate">
            Specifications shown against each listing are the figures the
            company publishes for that part. Pricing is quotation-based and
            depends on your specification and volume, so no unit prices are
            shown here — request a quote and you will get a price against your
            actual requirement. Where a listing has no published specification
            table, we say so on its page rather than filling the gap.{" "}
            <Link
              href="/contact"
              className="font-medium text-navy underline decoration-hairline-strong underline-offset-2 hover:decoration-copper"
            >
              Talk to our team
            </Link>{" "}
            if you need help identifying the right component.
          </p>
        </div>
      </div>
    </div>
  );
}
