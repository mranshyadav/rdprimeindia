import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // This project sits below an unrelated lockfile in the home directory;
  // pin the trace root so Next does not infer the wrong workspace.
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Product photography only. This must stay anchored to image
        // extensions: `/products/:path*` would also match the product DETAIL
        // ROUTES (/products/red-silicone-o-ring) and tell browsers to cache
        // those pages immutably for a year.
        source: "/products/:file(.*\\.(?:jpg|jpeg|png|webp|avif|svg))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
