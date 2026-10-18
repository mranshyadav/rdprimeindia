# RD Prime India — corporate website

Production website for **R D Prime India**, a manufacturer of moulded rubber and plastic
components in Mathura, Uttar Pradesh.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · no UI or animation
dependencies.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # then fill in the values — see "Configuration"
npm run dev                    # http://localhost:3000
```

```bash
npm run build && npm start     # production
npm run typecheck              # tsc --noEmit
npm run lint                   # next lint
```

---

## Configuration

All configuration is environment variables; see `.env.example` for the annotated list.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | for production | Canonical URLs, `sitemap.xml`, Open Graph |
| `RESEND_API_KEY` + `ENQUIRY_FROM_EMAIL` + `ENQUIRY_TO_EMAIL` | one delivery route required | Email delivery of enquiries |
| `ENQUIRY_WEBHOOK_URL` (+ `ENQUIRY_WEBHOOK_TOKEN`) | alternative to the above | Post enquiries to a CRM instead |
| `NEXT_PUBLIC_COMPANY_EMAIL` | optional | Shows a mailto link; **omitted entirely when unset** |
| `NEXT_PUBLIC_COMPANY_WHATSAPP` | optional | Shows a WhatsApp link; omitted when unset |

**Enquiry forms do not work until a delivery route is configured.** This is deliberate: with
neither configured, `/api/enquiry` returns `503`, logs the payload it could not send, and the
form shows the company phone number instead of a false success message.

---

## Content accuracy — read this before editing copy

Every factual claim on this site traces to the company's own IndiaMART listing. The audit trail
lives in two files:

- **`docs/VERIFIED-COMPANY-FACTS.md`** — the single source of truth. Verified facts, an explicit
  list of what is *not* verified and must not be claimed, the full 34-listing catalogue with
  specifications as published, and notes on every editorial decision.
- **`docs/IMAGE-MANIFEST.json`** — the source URL, dimensions and byte size of all 34 product
  photographs, all of which are the company's own.

Rules the codebase enforces:

1. **If it is not in the fact base, it does not go on the site.** No certifications, no export
   claims, no headcount, capacity, turnover, client names or testimonials — none of which the
   company publishes.
2. **Counts are derived, never typed.** `products.length`, `categories.length` and
   `products.filter(p => p.customisable).length` are interpolated into copy so a catalogue
   change cannot leave stale prose behind.
3. **Inconsistent source data is surfaced, not corrected.** Five listings carry a `sourceNote`
   that renders beneath the specification table asking the buyer to confirm, rather than the
   figure being silently "fixed": three publish an inner diameter larger than the outer
   (`industrial-rubber-bush-silicone`, `industrial-black-rubber-bushes`,
   `silicon-rubber-washer-thin`), and two contradict themselves on material
   (`epdm-rubber-gasket` is titled EPDM but specifies silicon; `silicone-rubber-o-ring` sits
   under Silicon O Rings but specifies NBR nitrile).
4. **Industries are evidence-backed.** `data/industries.ts` lists each sector with the product
   slugs whose `Usage/Application` field names it; the page renders that evidence as links.
5. **No prices.** IndiaMART publishes per-piece prices; this site is quotation-based, so none
   are shown and no `offers`/`price`/`availability` appears in structured data.
6. **No fabricated trust signals.** No `aggregateRating`, no `review`, no client logos.

The `/manufacturing` page carries an explicit "What we do not claim" section. That is a
deliberate trust device for a 2024-registered supplier with no certifications — please keep it.

---

## Project structure

```
app/
  layout.tsx            Root layout, fonts, metadata, Organization JSON-LD
  page.tsx              Homepage (11 sections)
  products/             Catalogue (filterable) + [slug] detail pages
  about/ manufacturing/ industries/ contact/ request-a-quote/
  privacy-policy/ terms/ not-found.tsx
  sitemap.ts robots.ts
  api/enquiry/route.ts  Enquiry handler: validation, spam screening, delivery
components/             Reusable UI (see below)
data/
  company.ts            Verified company facts; unset contact fields are null
  products.ts           34 listings, 5 categories, specs as published
  industries.ts         6 sectors, each with product evidence
lib/
  site.ts               Canonical URL + navigation
  enquiry.ts            Validation + spam rules, shared by client and server
docs/                   Fact base and image manifest
public/products/        34 product photographs from the company's own listings
```

### Components

`Container` · `SiteHeader` (sticky, mega menu, mobile drawer) · `SiteFooter` · `Logo` ·
`Button`/`ButtonLink` · `SectionHeading` · `PageHero` · `Breadcrumbs` · `ProductCard` ·
`ProductCatalogue` · `SpecTable` · `EnquiryForm` · `Field` primitives · `CtaSection` ·
`LegalPage` · `Reveal`.

Design tokens (colour, type, spacing, radii, shadows, motion) are defined once in
`app/globals.css` under `@theme`.

---

## Things worth knowing

**`next.config.ts` cache header.** The immutable one-year `Cache-Control` is anchored to image
extensions (`/products/:file(.*\.(?:jpg|jpeg|png|webp|avif|svg))`). It must stay that way — a
bare `/products/:path*` also matches the product *detail routes* and would tell browsers to
cache those pages immutably for a year.

**Display utilities on buttons.** `ButtonLink`'s base class sets `inline-flex`. Adding a
`hidden` class to the same element is unreliable, because two display utilities resolve by CSS
source order rather than by the order written in the attribute. Put the responsive show/hide on
a wrapper element instead — `SiteHeader` does this.

**Header breakpoint.** The desktop nav appears at `xl` (1280px), not `lg`: six nav items plus
the wordmark and CTA do not fit in the 1024px content measure. 1024px gets the drawer.

**Reveal animation.** `components/Reveal.tsx` toggles a `data-shown` attribute directly on the
DOM rather than through React state, so there is no render cascade on mount. It fires slightly
*before* an element enters the viewport (`rootMargin: 0 0 15% 0`) so fast scrolling never lands
on blank space, and it is a no-op under `prefers-reduced-motion`.

**All product photography is RD Prime India's own.** Crops from client-supplied catalogue pages
were trialled and withdrawn — partly on instruction, partly because a tile inside a ~1000px A4
page is only ~290px and every slot on this site needs more.
`docs/VERIFIED-COMPANY-FACTS.md` §8 records the whole assessment.

**Sizing rule for new imagery.** Work out the slot's CSS width, double it for 2x displays, and
use a source at least that wide. The current worst case is the homepage hero at 1.51x; every
other prominent slot is at or below 1.0x. A quick sharpness check (variance of Laplacian on a
700px thumbnail) is also worth running: anything below ~200 looks soft at figure size, and three
listing photographs are below that today — see "Before launch".

**The accent system.** Beyond the brief's single copper accent there is a secondary family of
five muted hues, one per product category, defined in `app/globals.css` and mapped to class
names in `lib/accents.ts`:

| Category | Hue | On light | On navy |
|---|---|---|---|
| O-Rings & Gaskets | copper | `#ab5930` | `#cb784e` |
| Bushes & Bushings | steel | `#4276a1` | `#5d92bd` |
| Grommets, Plugs & End Caps | teal | `#2a7c85` | `#3db5c2` |
| Washers & Pads | moss | `#4f7e3e` | `#6bab54` |
| Custom Moulded Components | ochre | `#8e6d26` | `#c99b36` |

Three rules keep it from turning into decoration:

1. **It does wayfinding, not ornament.** A category keeps one hue from the homepage tile, through
   the catalogue filter, onto the product card and detail page. The same five in the same order
   (`accentSequence`) number the process steps and the industry tiles.
2. **Copper still owns every CTA.** No accent is ever used for a button, so nothing competes with
   the primary action.
3. **Low saturation, small areas.** Hairline rules, labels and the active filter pill only —
   never a large colour field. Every value clears 4.5:1 on white, on the canvas *and* on navy,
   and each is paired with white text at 4.79:1 or better when used as a fill.

Class strings in `lib/accents.ts` are written out in full. Do not build them by interpolation —
Tailwind scans source text and will not generate a class it cannot see.

**Palette deviations from the brief, and why.** The specified palette has three pairings that
fall below WCAG AA, so the tokens in `app/globals.css` adjust them while keeping the hues:

| Brief | Used | Reason |
|---|---|---|
| Slate `#697586` | `#677384` | 4.40:1 on the warm off-white background; now 4.53:1 |
| Accent `#C66B3D` as button fill | `#ab5930` (`copper-600`) | white on `#C66B3D` is 3.77:1 — every primary CTA would fail |
| Accent `#C66B3D` as text on navy | `#cb784e` (`copper-light`) | 3.98:1 on `#14283d`; now 4.52:1 |

`#C66B3D` is retained unchanged as the brand accent for rules, borders and non-text marks, where
contrast minimums do not apply. Large step numerals use `--color-numeral` (`#7d92a6`) rather than
`hairline-strong`, which reads at only 1.4:1.

**Spam protection** is a hidden honeypot field, a minimum time-on-form, a link-count check, a
5-per-10-minute per-IP rate limit and a 5-minute duplicate guard. The rate limit and duplicate
guard are in-process, so they are per-instance — put a platform or WAF rule in front for
anything serious.

---

## Verified before handover

- Production build clean; 48 static pages; ~111 kB first-load JS.
- `tsc --noEmit` and `next lint` clean.
- No horizontal overflow at 320 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920 px.
- One `<h1>` per page, no skipped heading levels, every image has alt text.
- Every text/background token pair meets WCAG AA (4.5:1 body, 3:1 large), re-verified in the
  browser across five pages after the accent family was added; no interactive target below
  24x24 px outside the inline-link exception.
- Enquiry pipeline tested end to end against a live receiver: validation (422), honeypot and
  time-trap (silently dropped), duplicate guard, rate limit (429), unconfigured fallback (503),
  and a successful submission from the product-page form.
- Product JSON-LD confirmed free of `offers`, `price`, `availability` and `aggregateRating`.

## Before launch

1. **Confirm the contact details.** The published phone number is the IndiaMART-listed enquiry
   line. Add the direct works number, a business email and a WhatsApp number via the env vars —
   the site hides each until it is set rather than showing a guess.
2. **Configure enquiry delivery** (see Configuration). Forms return 503 until this is done.
3. **Reshoot the weakest product photography.** Measured sharpness (variance of Laplacian,
   700px thumbnail) puts three listing photographs well below the rest of the library:
   `silicon-rubber-washer-2` (60), `white-plastic-washer` (92) and `square-rubber-pad` (175),
   against a library median around 400. These are a listing's own photograph, so they cannot be
   swapped for a different part — only reshot. They have been kept out of every large slot,
   but they are visible on their own product pages. A plain-background reshoot is the single
   highest-value improvement available to this site.
4. **Resolve the five flagged specification inconsistencies** with the works and update
   `data/products.ts`, removing each `sourceNote` once confirmed.
5. **Set `NEXT_PUBLIC_SITE_URL`** to the live domain so canonicals and the sitemap are correct.
6. Reinstate the **Light Stand** listing if the company supplies its own photograph — the one on
   IndiaMART carries a third-party watermark, so it was omitted.
7. **If the client still wants their catalogue imagery used, ask for the original photographs**,
   not the finished catalogue pages — the pages are too low-resolution to crop from. Two
   conditions would still apply: written confirmation of the licence (the pages carry another
   company's lockup and one is watermarked), and the product-range filter in
   `docs/VERIFIED-COMPANY-FACTS.md` §8.2.
