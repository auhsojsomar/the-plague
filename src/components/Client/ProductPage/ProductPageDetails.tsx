"use client";

import { useProductCartContext } from "@/src/context/ProductCartContext";
import { Variant } from "@/src/shared/interfaces/Variant";
import { formatPrice } from "@/src/utils/priceUtils";

interface ProductPageDetailsProps {
  variant: Variant | null;
}

const ProductPageDetails: React.FC<ProductPageDetailsProps> = ({ variant }) => {
  const { product } = useProductCartContext(); // Access product data
  const price = variant?.salePrice || variant?.price || 0;

  return (
    <div className="flex flex-col pt-4 gap-y-2 sm:pt-5 sm:gap-y-2 lg:pt-0 xl:gap-y-4">
      {/* Product name */}
      <h1 className="text-xl sm:text-3xl font-bold">{product.name}</h1>
      {/* Product description */}
      <p className="text-sm sm:text-base">{product.description}</p>
      <div className="flex items-center">
        {/* Regular price */}
        <span className="text-primary-color text-xl sm:text-2xl font-bold z-20">
          {formatPrice(price)}
        </span>
        {variant?.salePrice && (
          // Sale price
          <span className="relative ml-2 text-sm text-gray-500 z-20 before:content-[''] before:w-full before:h-[1.1px] before:bg-gray-500 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-rotate-12">
            {formatPrice(variant.price)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductPageDetails;
