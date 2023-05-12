/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  assetPrefix: "/utils",
  basePath: "/utils",
  output: "export",
};

module.exports = nextConfig;
