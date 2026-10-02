/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disabled to prevent GSAP double-invoke issues
  compress: true,
  images: {
    unoptimized: true, // Using raw img tags throughout the project
  },
  // Transpile packages that use ES module syntax
  transpilePackages: ['gsap', 'three'],
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'madebychanan.com' }],
        destination: 'https://www.madebychanan.com/:path*',
        permanent: true,
      },
      // Nebbi AI was renamed Noorakar; keep the old case study URL working.
      {
        source: '/work/nebbi-ai',
        destination: '/work/noorakar',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
