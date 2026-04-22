/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@jurista/shared", "@jurista/database"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  // Treat Prisma as external to avoid bundling issues
  serverExternalPackages: ["@prisma/client", "prisma"],
};

module.exports = nextConfig;
