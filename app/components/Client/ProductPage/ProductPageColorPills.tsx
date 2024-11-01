"use client";

import ColorPills from "@/app/components/Shared/ColorPills";
import { Color, Size, Variant } from "@/app/shared/interfaces/Variant";
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
