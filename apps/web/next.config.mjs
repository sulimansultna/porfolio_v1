/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        // Add other Node.js built-in modules that might cause issues
        ...config.resolve.fallback,
      };
      config.externals.push({ "firebase-admin": "commonjs firebase-admin" });
    }
    return config;
  },
};

export default nextConfig
