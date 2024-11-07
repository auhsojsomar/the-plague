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
    ],
    dangerouslyAllowSVG: true, // Enable SVG support
  },
};

export default nextConfig;
