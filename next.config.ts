import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      hostname: "flipaquatics.com",
      protocol: "https",
      port: "",
    },{
      hostname: "127.0.0.1",
      protocol: "http",
      port: "3210",
    }],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '18mb',
    },
  },
};

export default nextConfig;
