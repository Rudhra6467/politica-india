import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Candidate photos are served through Next.js image optimisation so the
    // CDN caches them. Direct hotlinking to Wikimedia is rate-limited (HTTP 429).
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "commons.wikimedia.org" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
