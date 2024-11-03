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
  const [hasSelectedVariant, setHasSelectedVariant] = useState(false); // New state to track user interaction

  useEffect(() => {
    // Find the matching variant based on selected size and color
    const selectedVariant = product.variants.find(
      (v: Variant) =>
        v.color.id === selectedColor?.id && v.size.id === selectedSize?.id
    );
    onVariantChange(selectedVariant || null); // Pass variant to parent
  }, [selectedColor, selectedSize, product.variants, onVariantChange]);

  const handleColorSelect = (color: Color | null) => {
    setSelectedColor(color);
    setHasSelectedVariant(true); // Mark as selected on color change
  };

  const handleSizeSelect = (size: Size | null) => {
    setSelectedSize(size);
    setHasSelectedVariant(true); // Mark as selected on size change
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-2 flex-wrap">
        <ProductPageColorPills
          selectedColor={selectedColor}
          selectedSize={selectedSize} // Pass selectedSize
          onColorSelect={handleColorSelect} // Update to use the new handler
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        <ProductPageSizePills
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          onSizeSelect={handleSizeSelect} // Update to use the new handler
        />
      </div>
      <div className="min-h-6">
        {hasSelectedVariant &&
          !variant && ( // Show the message only if a variant was attempted to be selected
            <p className="text-red-500 font-medium text-sm sm:text-base">
              Please choose a valid variant.
            </p>
          )}
      </div>
    </div>
  );
};

export default ProductPageVariant;
