import Image from "next/image";

type ImageType = {
  src: string;
  alt: string;
};

const ProductBannerImage = ({ src, alt }: ImageType) => {
  return (
    <Image
      className="object-cover hover:scale-110 transition-all duration-500"
      src={src}
      alt={alt}
      fill
    />
  );
};

export default ProductBannerImage;
