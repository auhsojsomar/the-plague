/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**", // Allows all paths
      },
    ],
    dangerouslyAllowSVG: true, // Enable SVG support
  },
};

export default nextConfig;
