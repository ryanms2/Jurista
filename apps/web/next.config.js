/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@jurista/shared", "@jurista/database"],
  serverExternalPackages: ["@prisma/client", "prisma", "@prisma/studio"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  // Ensure Prisma is not bundled
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), "@prisma/client", "prisma"];
    }
    return config;
  },
};

module.exports = nextConfig;
