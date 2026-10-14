import type { NextConfig } from "next";

// Cache Components is off on purpose. Every page here is known at build
// time, so classic static generation is simpler and lets unknown case-study
// slugs return a real 404 via `dynamicParams = false`.
const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
