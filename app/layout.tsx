import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { company } from "@/data/company";
import { absoluteUrl, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "RD Prime India — Rubber & Plastic Component Manufacturer, Mathura",
    template: "%s | RD Prime India",
  },
  description:
    "R D Prime India manufactures moulded rubber and plastic components in Mathura, Uttar Pradesh — O-rings, gaskets, bushes, grommets, washers, end caps and parts built to buyer requirement.",
  applicationName: company.legalName,
  authors: [{ name: company.legalName }],
  keywords: [
    "rubber component manufacturer",
    "silicone O ring manufacturer",
    "rubber gasket manufacturer Mathura",
    "rubber bush manufacturer India",
    "EPDM grommet supplier",
    "custom moulded plastic parts",
    "industrial rubber products Uttar Pradesh",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: company.legalName,
    locale: "en_IN",
    url: siteUrl,
    title: "RD Prime India — Rubber & Plastic Component Manufacturer",
    description:
      "Moulded rubber and plastic components — O-rings, gaskets, bushes, grommets, washers and custom parts. Manufacturer in Mathura, Uttar Pradesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RD Prime India — Rubber & Plastic Component Manufacturer",
    description:
      "Moulded rubber and plastic components, manufactured in Mathura, Uttar Pradesh.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#14283d",
  width: "device-width",
  initialScale: 1,
};

/**
 * Organization structured data. Every property traces to the verified fact
 * base — no aggregateRating, no review, no award, no certification, and no
 * `areaServed` beyond India, because none of those are verified.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: company.legalName,
  alternateName: company.shortName,
  url: siteUrl,
  description:
    "Manufacturer of moulded rubber and plastic components — O-rings, gaskets, bushes, grommets, washers, end caps and custom moulded parts.",
  foundingDate: String(company.establishedYear),
  telephone: company.phone,
  taxID: company.gstin,
  vatID: company.gstin,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${company.address.line1}, ${company.address.line2}`,
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    postalCode: company.address.postalCode,
    addressCountry: company.address.countryCode,
  },
  founder: { "@type": "Person", name: company.owner },
  sameAs: [company.indiamartUrl],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: company.phone,
    contactType: "sales",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning covers only this element's own attributes:
    // browser extensions routinely stamp attributes onto <html> before React
    // boots, which would otherwise surface as a hydration mismatch. Children
    // are still checked normally.
    <html
      lang="en-IN"
      className={`${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70] focus:rounded-sm focus:bg-navy focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // Static, locally-authored object — no user or remote input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
