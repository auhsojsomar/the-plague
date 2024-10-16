import CustomImage from "@/app/components/Shared/CustomImage";

type ImageType = {
  src: string;
  alt: string;
};

const ProductBannerImage = ({ src, alt }: ImageType) => {
  return (
    <CustomImage
      className="object-cover hover:scale-110 transition-all duration-500 w-full h-full"
      src={src}
      alt={alt}
    />
  );
};

export default ProductBannerImage;
