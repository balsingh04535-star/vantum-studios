/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disabled to prevent GSAP double-invoke issues
  compress: true,
  images: {
    unoptimized: true, // Using raw img tags throughout the project
  },
  // Transpile packages that use ES module syntax
  transpilePackages: ['gsap', 'lenis', 'three'],
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'madebychanan.com' }],
        destination: 'https://www.madebychanan.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
