"use client";

import SizePills from "@/src/components/Shared/SizePills";
import { Color, Size, Variant } from "@/src/shared/interfaces/Variant";
import { useProductPageContext } from "@/src/context/ProductPageContext";

interface ProductPageSizePillsProps {
  selectedSize: Size | null;
  onSizeSelect: (size: Size) => void;
  selectedColor: Color | null;
}

const ProductPageSizePills: React.FC<ProductPageSizePillsProps> = ({
  selectedSize,
  onSizeSelect,
  selectedColor,
}) => {
  const { product } = useProductPageContext();
  const allSizes = product.variants.map((variant: Variant) => variant.size);

  function getAvailableSizesForColor(color: Color): Size[] {
    return product.variants
      .filter((variant: Variant) => variant.color.id === color.id)
      .map((variant: Variant) => variant.size);
  }

  // Get available sizes based on the currently selected color
  const availableSizes = selectedColor
    ? getAvailableSizesForColor(selectedColor)
    : allSizes;

  // Create an array of disabled size names
  const disabledSizeNames = allSizes
    .filter(
      (size: Size) =>
        !availableSizes.some(
          (availableSize: Size) => availableSize.id === size.id
        )
    )
    .map((size: Size) => size.name);

  return (
    <SizePills
      sizes={allSizes}
      onSizeSelect={onSizeSelect}
      disabledSizeNames={disabledSizeNames}
      selectedSizeName={selectedSize?.name}
    />
  );
};

export default ProductPageSizePills;
