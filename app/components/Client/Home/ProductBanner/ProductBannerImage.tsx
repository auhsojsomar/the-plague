import Image from "next/image";

type ImageType = {
  src: string;
  alt: string;
};

const ProductBannerImage = ({ src, alt }: ImageType) => {
  return <Image className="lg:px-4 object-cover" src={src} alt={alt} fill />;
};

export default ProductBannerImage;
