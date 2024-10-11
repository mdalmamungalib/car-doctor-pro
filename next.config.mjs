/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Allow only HTTPS images for security reasons
        hostname: "**", // Allow images from any domain
        port: "", // Leave port blank to allow default ports (80 for HTTP, 443 for HTTPS)
        pathname: "**", // Allow any path for the image URL
      },
    ],
  },
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
   // Enable React's strict mode for better error detection
  swcMinify: true, // Enable the new SWC compiler for faster builds and minification
};

export default nextConfig;
