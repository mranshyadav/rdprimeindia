/**
 * Verified company facts for R D Prime India.
 *
 * EVERY value here is traceable to the company's own IndiaMART listing.
 * See docs/VERIFIED-COMPANY-FACTS.md for the source of each field.
 *
 * Do not add a field to this file without a source. Unverified details
 * (email, WhatsApp, certifications, turnover, headcount, export markets)
 * are deliberately absent — the UI hides anything that is null.
 */

import { categories, products } from "./products";

export const company = {
  /** Legal/trading name exactly as registered and listed. */
  legalName: "R D Prime India",
  /** Shorter form used in running copy and navigation. */
  shortName: "RD Prime India",
  tagline: "Moulded Rubber & Plastic Components",

  businessType: "Manufacturer",
  additionalBusiness: ["Wholesale Business", "Retail Business"],
  legalStatus: "Proprietorship",
  establishedYear: 2024,
  owner: "Shailendra Yadav",
  ownerTitle: "Proprietor",
  gstin: "09AUGPY5817K1ZU",
  bankers: "Indian Bank",

  address: {
    line1: "Gate No. 01, Triveni Complex",
    line2: "Goverdhan Road",
    city: "Mathura",
    state: "Uttar Pradesh",
    postalCode: "281004",
    country: "India",
    countryCode: "IN",
  },

  /**
   * The enquiry line published on the company's IndiaMART listings.
   * Replace with the direct works number once confirmed.
   */
  phone: "+91 79493 06506",
  phoneHref: "tel:+917949306506",

  /**
   * Not published by the company. Set NEXT_PUBLIC_COMPANY_EMAIL to surface a
   * mailto link in the header, footer and contact page; until then the UI
   * simply omits it rather than showing a guessed address.
   */
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || null,

  /** Not published. Set NEXT_PUBLIC_COMPANY_WHATSAPP (digits only, with country code). */
  whatsapp: process.env.NEXT_PUBLIC_COMPANY_WHATSAPP || null,

  /** Verified public listing — used as a working third-party enquiry channel. */
  indiamartUrl: "https://www.indiamart.com/rdprimeindia/",

  countryOfOrigin: "Made in India",
} as const;

export const addressOneLine = [
  company.address.line1,
  company.address.line2,
  `${company.address.city} – ${company.address.postalCode}`,
  company.address.state,
  company.address.country,
].join(", ");

export const whatsappHref = company.whatsapp
  ? `https://wa.me/${company.whatsapp.replace(/\D/g, "")}`
  : null;

export const emailHref = company.email ? `mailto:${company.email}` : null;

/**
 * The company's own description of itself, quoted verbatim.
 * Used on the About page so the reader sees the primary source.
 */
export const selfDescription =
  "Established in the year of 2024, We ‘R D Prime India’ are Manufacturer of Silicon O Rings, Rubber Bush, Rubber Gasket, Light Stand, Rubber Washer etc.";

/**
 * Credibility strip beneath the hero.
 * Qualitative where no reliable number exists — no invented metrics. Counts
 * are derived from the catalogue so they cannot drift out of date.
 */
export const credibilityFacts: ReadonlyArray<{
  label: string;
  value: string;
  detail: string;
}> = [
  {
    label: "Business Type",
    value: "Manufacturer",
    detail: "Moulded rubber and plastic components",
  },
  {
    label: "Established",
    value: "2024",
    detail: "Proprietorship, GST registered",
  },
  {
    label: "Product Catalogue",
    value: `${products.length} listings`,
    detail: `Across ${categories.length} component families`,
  },
  {
    label: "Production Basis",
    value: "Volume & custom",
    detail: "MOQs from 1,000 pieces",
  },
  {
    label: "Location",
    value: "Mathura, U.P.",
    detail: "Goverdhan Road, 281004",
  },
];

/** Verified materials, taken from product specification fields only. */
export const materialsWorked = [
  "Silicone rubber",
  "Natural rubber",
  "EPDM rubber",
  "Nitrile (NBR)",
  "PVC",
  "Nylon",
  "Engineering plastics",
  "Metal inserts for plastic",
] as const;

/** Verified packaging formats, taken from product specification fields only. */
export const packagingFormats = ["Packet", "Polybag", "Box", "Carton"] as const;
