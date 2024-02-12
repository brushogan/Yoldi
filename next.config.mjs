/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/profiles",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
