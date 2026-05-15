import type { NextConfig } from "next";

function resolveApiBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!raw) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Missing NEXT_PUBLIC_API_BASE_URL in production. Set it to your backend Vercel URL.");
    }
    return "http://localhost:4000";
  }
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    const apiBase = resolveApiBaseUrl();
    return [
      {
        source: "/bapi/:path*",
        destination: `${apiBase}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
