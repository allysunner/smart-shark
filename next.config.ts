import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: 'https://allysunner.github.io/smart-shark/',
};

export default nextConfig;
