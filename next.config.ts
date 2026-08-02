import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
      },
    ],
  },
  allowedDevOrigins: ['192.168.0.102'],
};

export default nextConfig;
