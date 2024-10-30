// ProductPage.tsx

"use client";

import ProductPageImage from "./ProductPageImage";
import ProductPageDetails from "./ProductPageDetails";
import ProductPageVariant from "./ProductPageVariant";
import ProductPageQuantityButton from "./ProductPageQuantityButton";
import ProductPageActionButton from "./ProductPageActionButton";
import { useProductPageContext } from "@/app/context/ProductPageContext"; // Ensure you're using context
import { useState } from "react";
import { Variant } from "@/app/shared/interfaces/Variant";

const ProductPage: React.FC = () => {
  const { product } = useProductPageContext(); // Get product from context
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const isBuyDisabled = !selectedVariant; // Disable if no variant is selected

  return (
    <div className="container flex mt-20">
      <ProductPageImage />
      <div className="flex flex-col ml-5 gap-y-5">
        <ProductPageDetails variant={selectedVariant} />
        <ProductPageVariant
          product={product}
          onVariantChange={setSelectedVariant}
        />{" "}
        {/* Pass product and variant handler */}
        <ProductPageQuantityButton />
        <ProductPageActionButton
          disabled={isBuyDisabled}
          variant={selectedVariant}
        />
      </div>
    </div>
  );
};

export default ProductPage;
