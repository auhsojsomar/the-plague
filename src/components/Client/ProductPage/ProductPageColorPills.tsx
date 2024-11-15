"use client";

import ColorPills from "@/src/components/Shared/ColorPills";
import { useProductCartContext } from "@/src/context/ProductCartContext";
import { Color, Size, Variant } from "@/src/shared/interfaces/Variant";

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
  const { product } = useProductCartContext();
  const allColors = product.variants.map((variant: Variant) => variant.color);

  function getAvailableColorsForSize(size: Size): Color[] {
    return product.variants
      .filter((variant: Variant) => variant.size.id === size.id)
      .map((variant: Variant) => variant.color);
  }

  const availableColors = selectedSize
    ? getAvailableColorsForSize(selectedSize)
    : allColors;

  const disabledColorNames = allColors
    .filter(
      (color: Color) =>
        !availableColors.some(
          (availableColor: Color) => availableColor.id === color.id
        )
    )
    .map((color: Color) => color.name);

  return (
    <ColorPills
      colors={allColors}
      onColorSelect={onColorSelect}
      disabledColorNames={disabledColorNames}
      selectedColorName={selectedColor?.name}
    />
  );
};

export default ProductPageColorPills;
