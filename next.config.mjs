/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  async rewrites() {
    return [
      {
        source: '/public/:path*',
        destination: '/:path*',
      }
    ];
  },
};
export default nextConfig;
