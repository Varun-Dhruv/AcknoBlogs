/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "app-core",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
