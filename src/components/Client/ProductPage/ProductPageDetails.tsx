"use client";

import { useProductPageContext } from "@/src/context/ProductPageContext";
import { Variant } from "@/src/shared/interfaces/Variant";
import { formatPrice } from "@/src/utils/priceUtils";

interface ProductPageDetailsProps {
  variant: Variant | null;
}

const ProductPageDetails: React.FC<ProductPageDetailsProps> = ({ variant }) => {
  const { product } = useProductPageContext(); // Access product data
  const price = variant?.salePrice || variant?.price || 0;

  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <div className="flex items-center">
        <span className="text-primary-color text-2xl font-bold z-20">
          {formatPrice(price)}
        </span>
        {variant?.salePrice && (
          <span className="relative ml-2 text-sm text-gray-500 z-20 before:content-[''] before:w-full before:h-[1.1px] before:bg-gray-500 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-rotate-12">
            {formatPrice(variant.price)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductPageDetails;