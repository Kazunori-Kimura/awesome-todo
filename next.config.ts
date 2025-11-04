import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: '/awesome-todo',
  assetPrefix: '/awesome-todo/',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
