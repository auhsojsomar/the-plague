"use client";

import ProductPageImage from "./ProductPageImage";
import ProductPageDetails from "./ProductPageDetails";
import ProductPageVariant from "./ProductPageVariant";
import ProductPageQuantityButton from "./ProductPageQuantityButton";
import ProductPageActionButton from "./ProductPageActionButton";
import { useState } from "react";
import { Variant } from "@/src/shared/interfaces/Variant";

const ProductPage = () => {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const isBuyDisabled = !selectedVariant; // Disable if no variant is selected

  return (
    <div className="container flex flex-col lg:flex-row p-2 sm:pt-5 sm:pb-10 md:py-8 lg:py-10 xl:py-20">
      {/* Product Image and thumbnails */}
      <ProductPageImage />

      {/* Product details */}
      <div className="flex flex-col gap-y-3 lg:ml-5 lg:gap-y-5">
        <ProductPageDetails variant={selectedVariant} />
        <ProductPageVariant
          onVariantChange={setSelectedVariant}
          variant={selectedVariant}
        />
        <ProductPageQuantityButton
          quantity={quantity}
          onQuantityChange={setQuantity}
        />
        <ProductPageActionButton
          disabled={isBuyDisabled}
          variant={selectedVariant}
          quantity={quantity}
        />
      </div>
    </div>
  );
};

export default ProductPage;
