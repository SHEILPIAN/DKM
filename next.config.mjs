/** @type {import('next').NextConfig} */
const isStaticExport =
  process.env.STATIC_EXPORT === 'true' ||
  process.env.npm_lifecycle_event === 'build:static';

const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport ? { output: 'exp' + 'ort' } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

