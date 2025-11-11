/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allows production builds even with type errors
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Disable Next.js image optimization
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**", // Allow all paths under this domain
      },
    ],
  },
};

export default nextConfig;
