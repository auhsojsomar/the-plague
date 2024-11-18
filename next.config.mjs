/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**", // Allows all paths from placehold.co
      },
      {
        protocol: "https",
        hostname: "the-plague-bucket.s3.ap-southeast-2.amazonaws.com", // Your S3 bucket hostname
        pathname: "/**", // Allows all paths from your S3 bucket
      },
      {
        protocol: "https",
        hostname: "the-plague.up.railway.app", // Allowing images from your Railway host
        pathname: "/_next/image/**", // Allowing paths like /_next/image
      },
    ],
    dangerouslyAllowSVG: true, // Enable SVG support
  },
};

export default nextConfig;
