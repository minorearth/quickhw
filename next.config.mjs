/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  env: {
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_API_KEY: process.env.NEXT_API_KEY,
    NEXT_AUTH_DOMAIN: process.env.NEXT_AUTH_DOMAIN,
    NEXT_PROJECT_ID: process.env.NEXT_PROJECT_ID,
    NEXT_STORAGE_BUCKET: process.env.NEXT_STORAGE_BUCKET,
    NEXT_MESSAGING_SENDER_ID: process.env.NEXT_MESSAGING_SENDER_ID,
    NEXT_APP_ID: process.env.NEXT_APP_ID,
    NEXT_MEASUREMENT_ID: process.env.NEXT_MEASUREMENT_ID,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "png.pngtree.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
