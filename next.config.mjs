/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disabled to prevent GSAP double-invoke issues
  images: {
    unoptimized: true, // Using raw img tags throughout the project
  },
  // Transpile packages that use ES module syntax
  transpilePackages: ['gsap', 'lenis', 'three'],
};

export default nextConfig;
