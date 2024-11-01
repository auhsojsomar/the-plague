import Image from "next/image";
import { ImgHTMLAttributes } from "react";

interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number; // Only accept number for Next.js Image
  height?: number; // Only accept number for Next.js Image
  useNextImage?: boolean; // Flag to use Next.js Image
  fill?: boolean; // New prop for Next.js Image to fill the parent
  className?: string; // Optional custom class names
  loading?: "lazy" | "eager"; // Loading attribute
  decoding?: "async" | "auto" | "sync"; // Decoding attribute
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  useNextImage = false,
  fill = false,
  className = "", // Optional custom class names
  loading = "lazy", // Default lazy loading
  decoding = "async", // Default decoding
  ...props // Spread any additional props
}) => {
  if (useNextImage) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill} // Use fill to make the image cover the parent
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        className={className} // Additional styles
        {...props} // Spread other props if necessary
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width} // Use width for <img>
      height={height} // Use height for <img>
      className={className} // Use any custom classes
      loading={loading} // Lazy loading
      decoding={decoding} // Decoding strategy
      {...props} // Spread other props if necessary
    />
  );
};

export default CustomImage;
