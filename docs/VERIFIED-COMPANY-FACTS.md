# RD Prime India — Verified Fact Base

Single source of truth for every company claim on the website.
Primary source: IndiaMART seller profile <https://www.indiamart.com/rdprimeindia/profile.html>
(profile page, about-us page, and all 14 category pages scraped 2026-10-11).

**Rule for this project: if a fact is not in this file, it does not go on the website.**

---

## 1. Company identity — VERIFIED

| Field | Value | Source |
|---|---|---|
| Legal / trading name | **R D Prime India** | IndiaMART profile |
| Business type | **Manufacturer** | IndiaMART profile |
| Additional business | Wholesale Business, Retail Business | IndiaMART about-us |
| Year of establishment | **2024** | IndiaMART about-us |
| Legal status of firm | **Proprietorship** | IndiaMART about-us |
| Owner / Company CEO | **Shailendra Yadav** (listed as "S Yadav" / "Shailendra Yadav (Owner)") | IndiaMART about-us |
| GST No. | **09AUGPY5817K1ZU** | IndiaMART about-us |
| GST registration year | 2024 | IndiaMART about-us |
| Bankers | Indian Bank | IndiaMART about-us |
| Location | **Mathura, Uttar Pradesh, India** | IndiaMART profile |
| Address | **Gate No. 01, Triveni Complex, Goverdhan Road, Mathura – 281004, Uttar Pradesh, India** | GST/public listing |
| Listed phone | **+91-7949306506** (IndiaMART-listed enquiry line) | IndiaMART product page |
| IndiaMART membership | Member for 2 years | IndiaMART profile |
| IndiaMART rating | 5.0 / 5 from 3 reviews | IndiaMART profile |
| Country of origin on products | Made in India | multiple product spec tables |

Company self-description, verbatim:
> "Established in the year of 2024, We 'R D Prime India' are Manufacturer of Silicon O Rings,
> Rubber Bush, Rubber Gasket, Light Stand, Rubber Washer etc."

---

## 2. NOT verified — must NOT appear on the site

- Email address — masked by IndiaMART. **Do not invent one.** Set `NEXT_PUBLIC_COMPANY_EMAIL` once confirmed.
- WhatsApp number — not published. **Do not invent one.**
- Any certification (ISO, IATF, RoHS, REACH…) — none listed anywhere.
- Employee count, annual turnover, factory size, production capacity, machine list.
- Export / international presence. IndiaMART's auto-generated category blurbs say
  "Prominent & Leading Exporter from Mathura" — this is IndiaMART boilerplate, not a company
  statement, and is **not** treated as verified. No export claims on the site.
- Named clients, client logos, OEM relationships, awards.
- Laboratory testing, automated inspection, material certification, documented QC procedures.
- Years of experience beyond "established 2024".
- Testimonial text — the 5.0/3-review rating exists but no review text/author was retrievable.
  No testimonials section is built. No review/rating structured data is emitted.
- Social media accounts.

## 3. Industries — VERIFIED, only from product `Usage/Application` fields

Every industry on the site traces to a product spec field:

| Industry | Products that state it |
|---|---|
| Automobile / Automotive | Red Silicone O Ring, Colored Rubber Gasket, Rubber Flange Gaskets, Silicone Rubber Products, Silicone Rubber O Ring, Black Rubber Grommet, Silicone Rubber Grommet, Silicon Rubber Washer, Plastic Round Washer, Plastic Rubber Washers, White Plastic Washer, Plastic Custom Molded Components ("used in auto parts") |
| Electrical | Stabilizer Bar Rubber Bushing, Split Rubber Bushing, Black Plastic End Cap |
| General industrial | Metal Bush for Plastic, EPDM Rubber Gasket, Rubber O Ring |
| Hardware fitting | Industrial Rubber Bush (silicone variant) |
| Printing | Square Rubber Pad |
| Edible oil packaging | Black Plastic End Caps (Type: can caps) |

## 4. Capabilities — VERIFIED

- Manufacturer of moulded rubber and plastic components (stated business type).
- **Customisation to buyer requirement** — explicitly stated:
  - Engineering Plastic Parts — Size: "as per requirement customized"
  - Plastic Molded Parts — Size/Thickness/Weight: "customized"; "we can customize plastic parts as per requirement"
  - Multicolor Plastic Parts — "we will manufacture plastic parts according to buyer requirements and we can customize products according to buyer need"
- **Volume/MOQ-based supply** — MOQs stated per product, 1,000 to 50,000 pieces.
- **Materials actually worked**: Silicone rubber, Natural rubber, EPDM rubber, NBR/Nitrile, Rubber
  (unspecified), Plastic (unspecified), PVC, Nylon, plus metal bush inserts for plastic.
- **Packaging offered** (from spec fields): Packet, Polybag, Box, Carton.
- Price basis: per-piece prices published on IndiaMART. The website uses quotation-based
  enquiry instead — publishing live unit prices is out of scope and prices change.

---

## 5. Product catalogue — VERIFIED (14 IndiaMART categories, 30 listings)

Specs below are copied verbatim from IndiaMART spec tables. Where a field is absent there, it is
absent on the website. Note: a few source values are internally inconsistent (e.g. an inner
diameter larger than the stated outer diameter). These are reproduced as-published and flagged in
`data/products.ts` with `sourceNote`; they are not silently "fixed".

### Industrial Bushes (6)
1. **Industrial Rubber Bush** — ₹20/pc. Size 3.00 inch; Shape Cylindrical; Material Rubber; Color Black; Brand R D Prime India.
2. **Industrial Rubber Bush (Silicone)** — ₹5/pc. MOQ 10000 pc. Size 3.00 inch; Shape Cylindrical; Length 70 mm; Material Silicone Rubber; Usage Hardware Fitting; ID 140 mm; OD 80 mm; Color Black.
3. **Stabilizer Bar Rubber Bushing** — ₹6/pc. MOQ 5000 pc. Size 2.00 inch; Shape Cylindrical; Length 70 mm; Usage Electrical; Material Natural Rubber; ID 25 mm; OD 35 mm; Color Black; Packaging BOX.
4. **Metal Bush for Plastic** — ₹12/pc. MOQ 50000 pc. Usage Industrial; Shape Cylindrical; Weight 20 gm.
5. **Split Rubber Bushing** — ₹8/pc. Material Natural rubber; Color Black; Size 2 inch; Application Electrical; Made in India.
6. **Industrial Black Rubber Bushes** — ₹6/pc. MOQ 10000 pc. Size 1.0 inch; Material Silicone Rubber; ID 140 mm; Shape Square; Length 15 mm; OD 50 mm; Color White.

### Rubber Gasket (4)
7. **Red Silicone O Ring** — ₹4/pc. MOQ 10000 pc. Shape Round; Usage Automobile; Type O Ring; Size 10 Inch; Thickness 10 mm; Hardness 60; Color Red; Material Silicon.
8. **Colored Rubber Gasket** — ₹8/pc. MOQ 10000 pc. Hardness 60; Usage Automobile Industry; Packaging Packet; Shape Ring Gasket; Color Blue; Material Rubber; ID 100 mm; Thickness 10 mm.
9. **Rubber Flange Gaskets** — ₹15/pc. MOQ 5000 pc. Hardness 60; Thickness 3 mm; ID 80 mm; Usage Automobile Industry; Packaging Polybag; Shape Flat Gasket; Color Black; Material Rubber.
10. **Silicone Rubber Gasket** — ₹10/pc. MOQ 50000 pc. Thickness 2 mm; Size 2MM; Hardness 60 TO 80; Made in India.

### Rubber Products (4)
11. **EPDM Rubber Gasket** — ₹8/pc. MOQ 5000 pc. Usage Industrial; Material silicon; Thickness 100 mm; ID 60 mm; Made in India.
12. **Silicone Rubber Plugs** — ₹6/pc. MOQ 10000 pc. Diameter 100 mm; Material Silicone; Hardness 80; Color Black; Made in India.
13. **Silicone Rubber Products** — ₹8/pc. MOQ 10000 pc. Color Black; Size 20 mm; Usage Automobile Industry; Shape Round; Packaging Box; Hardness 60; Material Silicone Rubber.
14. **Rubber End Cap** — ₹1.50/pc. No further specs published.

### Plastic Component (2)
15. **Plastic Custom Molded Components** — ₹20/pc. MOQ 5000 pc. Usage "used in auto parts."; Pack Type plastic packet; Material plastic and nylon; Made in India.
16. **Engineering Plastic Parts** — ₹3/pc. MOQ 10000 pc. Material PVC; Color Blue; Size "as per requirement customized"; Made in India; Packaging plastic packet.

### Plastic End Cap (4)
17. **Black Plastic End Cap** — ₹3/pc. MOQ 5000 pc. Usage Electrical; Shape Circular; Color Black; Material Plastic; Packaging Packet.
18. **Black Plastic End Caps** — ₹8/pc. Type can caps; Usage Edible Oil; Color Black; Shape Round.
19. **Plastic End Caps** — ₹3/pc. Diameter 1 Inch; Made in India.
20. **Round Plastic End Caps** — ₹8/pc. Made in India.

### Silicon O Rings (3)
21. **Silicon O Rings** — ₹5/pc. MOQ 10000 pc. Thickness More than 10 mm; Material Silicon; Made in India.
22. **Silicone Rubber O Ring** — ₹5/pc. MOQ 10000 pc. Shape Round; Material (NBR) Nitrile; Usage Automobile; Type O Ring; Thickness More than 10 mm; Hardness 60; Color White And Orange.
23. **Silicon O Rings (small)** — ₹2/pc. No further specs published.

### Rubber Grommet (3)
24. **Black Rubber Grommet** — ₹10/pc. MOQ 10000 pc. ID 15 mm; Color Black; Usage Automobile; Material EPDM Rubber; Shape Round; OD 30 mm.
25. **Multicolor Plastic Parts** — MOQ 10000. Packaging polybag/carton; Color Multicolor; Made in India. Built to buyer requirement.
26. **Square Rubber Pad** — ₹30/pc. MOQ 10000 pc. Material Silicone; Usage Printing Industry; Color Black; Shape Rectangular; Type Rubber Pad; Thickness 5 mm.

### Silicone Rubber Grommet (1)
27. **Silicone Rubber Grommet** — ₹2/pc. ID 15 mm; Color Black; Usage Automobile; Material Rubber; Shape Round; Made in India.

### Rubber Bush / Rubber Washer (washers, 4 listings)
28. **Silicon Rubber Washer** — ₹5/pc. MOQ 10000 pc. OD 72 mm; ID 60 mm; Thickness 6 mm; Material Silicon Rubber; Usage Automobile Industry; Color Red; Shape Round.
29. **Plastic Round Washer** — ₹3/pc. MOQ 10000 pc. ID 30 mm; OD 50 mm; Thickness 6 mm; Material Plastic; Usage Automobile Industry; Shape Round; Color Black.
30. **Silicon Rubber Washer (2.5 mm)** — ₹3/pc. MOQ 10000 pc. Material silicon; OD 72 mm; ID 120 mm; Thickness 2.5 mm; Made in India.
31. **Plastic Rubber Washers** — ₹1/pc. ID 30 mm; Material Plastic; Usage Automobile Industry; Brand R D Prime India.
32. **White Plastic Washer** — ₹7/pc. Material Plastic; Colour White; ID 36 mm; OD 72 mm; Thickness 2 mm; Shape Round; Usage Automobile Industry.

### Rubber O Ring (2)
33. **Rubber O Ring** — ₹5/pc. MOQ 1000 pc. Usage Industrial; Material Silicon; Color Black; Made in India.
34. **Nitrile Rubber O Rings** — ₹0.50/pc. No further specs published.

### Plastic Moulded Products (1)
35. **Plastic Molded Parts** — ₹7/pc. MOQ 5000 pc. Packaging Packet; Color all; Size/Thickness/Weight customized; Material plastic.

### Listed on the profile but NOT published on the website
- **Light Stand** — named in the company self-description, but the only photograph on the
  listing carries a visible third-party "S PRO" watermark and no specification is published.
  Publishing a watermarked image that may not be the company's own would breach §13 of the
  brief, so the listing is omitted. Reinstate it once RD Prime supplies its own photograph.

---

## 6. Imagery

All product photography in `public/products/` was downloaded from the company's own IndiaMART
listings (`5.imimg.com`, seller id 232891342) — these are RD Prime India's own product photos.
No stock photography is used for products. `docs/IMAGE-MANIFEST.json` records the source URL for
every file.

Four downloaded files were deleted rather than published:

| File | Reason |
|---|---|
| `light-stand.jpg` | Carries a third-party "S PRO" watermark — provenance not established. |
| `drone-parts.jpeg` | Showed packaged components, not the Round Plastic End Caps listing it sat on. |
| `hydraulic-oil-seal.jpg` | Showed oil seals, not the Industrial Black Rubber Bushes listing it sat on. |
| `workshop-detail.jpeg` | Showed a metal frame; said nothing about moulding capability. |

Where a listing lost its image, it now shares a sibling listing's genuine photograph of the same
part family rather than borrowing an unrelated picture:

- Round Plastic End Caps → the can-cap photograph.
- Industrial Black Rubber Bushes → the industrial rubber bush photograph.

**Pre-launch priority:** two published photographs (`plastic-molded-parts.jpg`,
`square-rubber-pad.jpg`) are out of focus, and three show parts held in hand or in packaging
(`red-silicone-o-ring.jpg`, `silicone-rubber-products.jpeg`, `silicon-rubber-washer.jpg`). They are
authentic and so are published, but a reshoot against a plain background is the single highest-value
improvement available to this site.

No factory, machinery, or inspection photographs are published by the company, so the
Manufacturing page uses product macro photography only and makes no process claims beyond
section 4.


---

## 7. Design deviations from the brief

The brief's recommended palette is followed except where a pairing fails WCAG AA contrast.
Three values were adjusted (hue retained, lightness changed); `README.md` has the table and the
measured ratios. `#C66B3D` is unchanged as the accent for rules, borders and non-text marks.

---

## 8. Client-supplied catalogue imagery (received 2026-10-11)

The client supplied 15 finished catalogue pages and asked for them to be used. They were
assessed on two separate questions.

### 8.1 Ownership — UNCONFIRMED, must be settled before launch

Three things suggest these are licensed or template assets rather than photographs of
RD Prime India's own parts:

- One page carries a **"RUBBER SOLUTIONS — SEALS | GASKETS | COMPONENTS"** lockup, i.e. a
  different company's branding.
- One page (Precision Components) carries a faint **third-party watermark**.
- The photography does not match RD Prime India's own IndiaMART images, which are plainly shot
  in-house. These are studio-lit shots of a much broader range.

None of that makes them unusable — the client may well hold a licence — but it is not something
that can be verified from the files. **Get written confirmation of the licence before launch.**

### 8.2 Product range — most of the imagery is outside what the company makes

This is the binding constraint, and it is independent of licensing. The supplied catalogues
depict a far wider range than RD Prime India's verified 34 listings.

**Rejected** — depicts products the company has never listed, so using it would claim a
capability that does not exist (brief §13):

- Precision ceramic and technical components
- Engineering plastic **machined** parts (the company moulds; it does not machine)
- Rollers and wheels with pressed bearings
- Rubber-to-metal bonded parts
- Hoses, bellows and boots
- Braided tubes, sleeves and silicone tubing
- Rubber sheets, strips and extruded profiles
- Diaphragms
- Automotive head gaskets, CV-joint boots and intake hoses
- Plastic clips and fasteners
- Plumbing and utility plastic parts

The "RD PRIME INDIA — Automotive Rubber & Plastic Components" page is in this group. Although it
carries the company's name, it shows an automotive OEM range (CV boots, head gaskets, oil seals,
intake hoses, clips) that the IndiaMART listing does not support, and its red/navy branding
conflicts with the site's identity. **Not used.**

### 8.2a Outcome — none of it is in use

Eight crops passed the range test and were placed, then all eight were withdrawn:

- **Three on the client's instruction** (`client-o-rings-hero`, `client-black-seals`,
  `client-flat-gaskets`) — the homepage hero returned to the company's own photography.
- **Five on resolution grounds.** Catalogue pages are ~1000px for a full A4 sheet, so an
  individual tile inside one is only ~290-320px. That is not enough for any slot on this site:
  a 212px category tile needs ~424px on a 2x display (1.44x upscale) and the 441px figure
  needed ~882px (2.8x). Measured against the library, the crops were also no sharper in
  practice than the 1000px originals they displaced.

**The site is once again 100% RD Prime India's own photography.** If the client can supply the
*original* files behind those catalogue pages at full resolution, the range filter above still
applies — but the resolution objection would disappear.

### 8.3 Placement rule applied

Client imagery appears only in **category tiles and section figures**, which illustrate a family
of parts. Every **individual product listing** keeps RD Prime India's own photograph, because
that is where a buyer reads specific dimensions — showing a different part there would be
actively misleading. Bushes & Bushings and Washers & Pads kept their authentic tiles too: no
supplied crop matched them better.
