import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "C:\\Users\\INFOTECH_USER\\Desktop\\nsc-frontend",
  },
  images: {
    remotePatterns: [
      {
        protocol:"https",
        hostname:"images.pexels.com",
      }
    ]
  }
};

export default nextConfig;
