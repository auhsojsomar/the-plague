import Link from "next/link";
import { Product } from "@/src/shared/types/Product";
import CustomImage from "@/src/components/Shared/CustomImage";
import { toKebabCase } from "@/src/utils/stringUtils";
import { formatPrice } from "@/src/utils/priceUtils";

const BestProductCard = ({
  name,
  image,
  price,
  isSale,
  salePrice,
}: Product) => {
  const kebabCaseName = toKebabCase(name);
  const productLink = `/products/${kebabCaseName}`;

  return (
    <div className="relative group w-full h-auto aspect-square rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Clickable Link */}
      <Link
        href={productLink}
        className="absolute inset-0 z-10"
        aria-label={name} // Accessible label
      />

      {/* Sale Badge */}
      {isSale && (
        <span className="absolute -top-4 -left-4 z-20 flex items-center justify-center w-14 h-14 text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-md">
          <p>Sale!</p>
        </span>
      )}

      {/* Product Image */}
      <div className="relative w-full h-full">
        <CustomImage
          imageClass="object-cover w-full h-full"
          className="w-full h-full"
          src={image.main}
          alt={kebabCaseName}
          fill
        />
      </div>

      {/* Overlay with Product Details */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black bg-opacity-60 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {/* Product Name */}
        <p className="text-lg font-bold uppercase">{name}</p>

        {/* Price Section */}
        <div className="mt-2 flex items-center">
          {isSale && salePrice && (
            <div className="space-x-2">
              <span className="text-primary-color text-sm font-semibold">
                {formatPrice(salePrice)}
              </span>
              <span className="relative text-gray-300 text-sm line-through">
                {formatPrice(price)}
              </span>
            </div>
          )}
          {!isSale && (
            <span className="text-white text-sm font-semibold">
              {formatPrice(price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestProductCard;
