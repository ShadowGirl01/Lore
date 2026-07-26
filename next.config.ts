import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [
    { protocol: 'https' , hostname: 'covers.openlibrary.org' },
    { protocol: 'https' , hostname: 'jejxbwwszidior7y.public.blob.vercel-storage.com'},
  ]}
};

export default nextConfig;
