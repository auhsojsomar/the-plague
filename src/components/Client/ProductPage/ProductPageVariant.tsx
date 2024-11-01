"use client";

import { useState, useEffect } from "react";
import { Variant, Color, Size } from "@/src/shared/interfaces/Variant";
import ProductPageColorPills from "./ProductPageColorPills";
import ProductPageSizePills from "./ProductPageSizePills";
import { useProductPageContext } from "@/src/context/ProductPageContext";

interface ProductPageVariantProps {
  onVariantChange: (variant: Variant | null) => void; // Ensure the correct type for the handler
  variant: Variant | null;
}

const ProductPageVariant: React.FC<ProductPageVariantProps> = ({
  onVariantChange,
  variant,
}) => {
  const { product } = useProductPageContext();
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  useEffect(() => {
    // Find the matching variant based on selected size and color
    const variant = product.variants.find(
      (v: Variant) =>
        v.color.id === selectedColor?.id && v.size.id === selectedSize?.id
    );
    onVariantChange(variant || null); // Pass variant to parent
  }, [selectedColor, selectedSize, product.variants, onVariantChange]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-2">
        <ProductPageColorPills
          selectedColor={selectedColor}
          selectedSize={selectedSize} // Pass selectedSize
          onColorSelect={(color) => {
            setSelectedColor(color);
          }}
        />
      </div>
      <div className="flex gap-2">
        <ProductPageSizePills
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          onSizeSelect={(size) => {
            setSelectedSize(size);
          }}
        />
      </div>
      <div className="min-h-6">
        {!variant && (
          <p className="text-red-500 font-medium">Please select a variant.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPageVariant;
