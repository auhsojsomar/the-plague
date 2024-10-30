// ProductPageSizePills.tsx

"use client";

import SizePills from "@/app/components/Shared/SizePills";
import { Color, Size } from "@/app/shared/interfaces/Variant";
import { useProductPageContext } from "@/app/context/ProductPageContext";

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
  const allSizes = product.variants.map((variant) => variant.size);

  const availableSizes = selectedColor
    ? getAvailableSizesForColor(selectedColor)
    : allSizes;

  function getAvailableSizesForColor(color: Color): Size[] {
    return product.variants
      .filter((variant) => variant.color.id === color.id)
      .map((variant) => variant.size);
  }

  return (
    <SizePills
      sizes={allSizes}
      onSizeSelect={onSizeSelect}
      disabledSizeNames={[]} // Pass in your logic for disabled sizes
      selectedSizeName={selectedSize?.name}
    />
  );
};

export default ProductPageSizePills;
