const isVercel = process.env.VERCEL === "1";
// Enable static export only when explicitly requested; disable on Vercel to allow server actions / API routes
const shouldStaticExport = process.env.NEXT_STATIC_EXPORT === "true" && !isVercel;
const basePath = shouldStaticExport ? "/front-end" : undefined;
const assetPrefix = basePath ? `${basePath}/` : undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(shouldStaticExport ? { output: "export" } : {}),
  ...(basePath ? { basePath } : {}),
  ...(assetPrefix ? { assetPrefix } : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
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
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
