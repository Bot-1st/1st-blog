import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // Allow dev mode access from external origins
  allowedDevOrigins: true,
};

export default nextConfig;
