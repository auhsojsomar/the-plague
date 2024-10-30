// ProductPageColorPills.tsx

"use client";

import ColorPills from "@/app/components/Shared/ColorPills";
import { Color } from "@/app/shared/interfaces/Variant";
import { useProductPageContext } from "@/app/context/ProductPageContext";

interface ProductPageColorPillsProps {
  selectedColor: Color | null;
  onColorSelect: (color: Color) => void;
}

const ProductPageColorPills: React.FC<ProductPageColorPillsProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  const { product } = useProductPageContext();
  const allColors = product.variants.map((variant) => variant.color);

  const availableColors = selectedColor // Simplified: it should depend on selected size
    ? getAvailableColorsForSize(selectedColor) // Change this if necessary
    : allColors;

  function getAvailableColorsForSize(size: Color): Color[] {
    return product.variants
      .filter((variant) => variant.size.id === size.id)
      .map((variant) => variant.color);
  }

  return (
    <ColorPills
      colors={allColors}
      onColorSelect={onColorSelect}
      disabledColorNames={[]} // Pass in your logic for disabled colors
      selectedColorName={selectedColor?.name}
    />
  );
};

export default ProductPageColorPills;
