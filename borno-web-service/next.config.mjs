/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow server actions to access environment variables
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  // Ensure API routes work in production
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default nextConfig;