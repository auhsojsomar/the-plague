import CustomImage from "@/src/components/Shared/CustomImage";

type ImageType = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const ProductBannerImage = ({ src, alt }: ImageType) => {
  return (
    <div className="relative w-full h-full">
      <CustomImage
        className="w-full h-full"
        imageClass="object-cover hover:scale-110 transition-scale duration-500"
        src={src}
        alt={alt}
        fill
      />
    </div>
  );
};

export default ProductBannerImage;
