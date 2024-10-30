// ProductPageVariant.tsx

"use client";

import { useState, useEffect } from "react";
import { Variant, Color, Size } from "@/app/shared/interfaces/Variant";
import ProductPageColorPills from "./ProductPageColorPills";
import ProductPageSizePills from "./ProductPageSizePills";
import { Product } from "@/app/shared/types/Product";

interface ProductPageVariantProps {
  product: Product;
  onVariantChange: (variant: Variant | null) => void; // Ensure the correct type for the handler
}

const ProductPageVariant: React.FC<ProductPageVariantProps> = ({
  product,
  onVariantChange,
}) => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  useEffect(() => {
    // Find the matching variant based on selected size and color
    const variant = product.variants.find(
      (v) => v.color.id === selectedColor?.id && v.size.id === selectedSize?.id
    );
    onVariantChange(variant || null); // Pass variant to parent
  }, [selectedColor, selectedSize, product.variants, onVariantChange]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-2">
        <ProductPageColorPills
          selectedColor={selectedColor}
          onColorSelect={(color) => {
            setSelectedColor(color);
            setSelectedSize(null); // Reset size when color changes
          }}
        />
      </div>
      <div className="flex gap-2">
        <ProductPageSizePills
          selectedSize={selectedSize}
          selectedColor={selectedColor} // Pass selectedColor here
          onSizeSelect={(size) => {
            setSelectedSize(size);
            // Optionally reset color here if needed
          }}
        />
      </div>
    </div>
  );
};

export default ProductPageVariant;
