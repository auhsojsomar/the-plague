"use client";

import NextImage from "next/image";
import { ImgHTMLAttributes, useEffect, useState } from "react";
import ImageSkeleton from "@/src/components/Skeleton/ImageSkeleton";

interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string; // The S3 key for fetching the image
  alt: string;
  width?: number;
  height?: number;
  useNextImage?: boolean;
  fill?: boolean;
  className?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "auto" | "sync";
  priority?: boolean;
  quality?: number;
  useBucket?: boolean; // Use S3 bucket
  imageClass?: string; // Image Object fit class
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  useNextImage = true,
  fill = false,
  className = "",
  loading = "lazy",
  decoding = "async",
  priority,
  quality,
  useBucket = true,
  imageClass,
  ...props
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (useBucket && src) {
        try {
          const response = await fetch(`/api/s3-bucket?key=${src}`);
          if (response.ok) {
            const data = await response.json();
            setImageUrl(data.url);
          } else {
            console.error(
              "Failed to fetch image from S3:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error fetching S3 image:", error);
        }
      } else if (!useBucket) {
        setImageUrl(src); // Use local path if not using S3 bucket
      }
    };

    fetchImageUrl();
  }, [src, useBucket]);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
        setIsLoading(false);
      };
      img.src = imageUrl;
    }
  }, [imageUrl]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!imageUrl || !imageDimensions) {
    return <ImageSkeleton />;
  }

  const loadingProp = priority ? undefined : loading;

  // Define sizes based on how you want the image to behave responsively
  const sizes = fill
    ? "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 60vw" // Example sizes
    : undefined;

  if (useNextImage) {
    return (
      <div className={`relative ${className}`}>
        {isLoading && <ImageSkeleton />}
        <NextImage
          className={`${imageClass} ${isLoading ? "opacity-0" : "opacity-100"}`}
          src={imageUrl}
          alt={alt}
          fill={fill}
          width={fill ? undefined : imageDimensions.width}
          height={fill ? undefined : imageDimensions.height}
          loading={loadingProp}
          decoding={decoding}
          onLoad={handleImageLoad}
          priority={priority}
          quality={quality}
          sizes={sizes} // Add sizes prop here
          {...props}
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && <ImageSkeleton />}
      <img
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        src={imageUrl}
        alt={alt}
        width={imageDimensions.width}
        height={imageDimensions.height}
        loading={loadingProp}
        decoding={decoding}
        onLoad={handleImageLoad}
        {...props}
      />
    </div>
  );
};

export default CustomImage;
