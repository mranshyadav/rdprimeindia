import { categories, products } from "@/data/products";

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL in production so canonical URLs,
 * sitemap entries and Open Graph tags point at the real domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rdprimeindia.com"
).replace(/\/$/, "");

export const absoluteUrl = (path: string) =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

export type NavItem = {
  href: string;
  label: string;
  children?: ReadonlyArray<{ href: string; label: string; description: string }>;
};

export const navigation: readonly NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/products",
    label: "Products",
    children: [
      ...categories.map((c) => ({
        href: `/products?category=${c.id}`,
        label: c.name,
        description: c.blurb,
      })),
      {
        href: "/products",
        label: "Full Catalogue",
        description: `All ${products.length} listings, searchable and filterable.`,
      },
    ],
  },
  { href: "/manufacturing", label: "Manufacturing & Quality" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];
