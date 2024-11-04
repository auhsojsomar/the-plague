import CustomImage from "@/src/components/Shared/CustomImage";

type ImageType = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const ProductBannerImage = ({ src, alt, width, height }: ImageType) => {
  return (
    <CustomImage
      className="object-cover hover:scale-110 transition-all duration-500 w-full h-full"
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default ProductBannerImage;
