// ProductPageColorPills.tsx

"use client";

import ColorPills from "@/app/components/Shared/ColorPills";
import { Color, Size } from "@/app/shared/interfaces/Variant";
import { useProductPageContext } from "@/app/context/ProductPageContext";

interface ProductPageColorPillsProps {
  selectedColor: Color | null;
  onColorSelect: (color: Color) => void;
  selectedSize: Size | null;
}

const ProductPageColorPills: React.FC<ProductPageColorPillsProps> = ({
  selectedColor,
  onColorSelect,
  selectedSize,
}) => {
  const { product } = useProductPageContext();
  const allColors = product.variants.map((variant) => variant.color);

  function getAvailableColorsForSize(size: Size): Color[] {
    return product.variants
      .filter((variant) => variant.size.id === size.id)
      .map((variant) => variant.color);
  }

  const availableColors = selectedSize // Simplified: it should depend on selected size
    ? getAvailableColorsForSize(selectedSize) // Change this if necessary
    : allColors;

  const disabledColorNames = allColors
    .filter(
      (color) =>
        !availableColors.some(
          (availableColor) => availableColor.id === color.id
        )
    )
    .map((color) => color.name);

  return (
    <ColorPills
      colors={allColors}
      onColorSelect={onColorSelect}
      disabledColorNames={disabledColorNames} // Pass in your logic for disabled colors
      selectedColorName={selectedColor?.name}
    />
  );
};

export default ProductPageColorPills;
