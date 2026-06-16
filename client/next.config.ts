import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      // Tells Turbopack to emit the video file and return its public URL
      "*.mov": {
        type: "asset",
      },
      "*.mp4": {
        type: "asset",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "warehouse-inventory-management.s3.us-east-1.amazonaws.com", // Replace with your S3 bucket name and region endpoint
        pathname: "/**",
      },
      // You may need to add additional patterns if you use a CloudFront CDN
    ],
  },
};

export default nextConfig;
