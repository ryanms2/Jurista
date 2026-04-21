/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@jurista/shared", "@jurista/database"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

module.exports = nextConfig;
