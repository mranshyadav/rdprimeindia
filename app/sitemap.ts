import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { url: "/", changeFrequency: "monthly", priority: 1 },
    { url: "/products", changeFrequency: "weekly", priority: 0.9 },
    { url: "/request-a-quote", changeFrequency: "yearly", priority: 0.9 },
    { url: "/manufacturing", changeFrequency: "yearly", priority: 0.8 },
    { url: "/industries", changeFrequency: "yearly", priority: 0.8 },
    { url: "/about", changeFrequency: "yearly", priority: 0.7 },
    { url: "/contact", changeFrequency: "yearly", priority: 0.7 },
    { url: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
    { url: "/terms", changeFrequency: "yearly", priority: 0.2 },
  ] as const;

  const staticPages: MetadataRoute.Sitemap = routes.map((page) => ({
    ...page,
    url: `${siteUrl}${page.url}`,
    lastModified: now,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...productPages];
}
