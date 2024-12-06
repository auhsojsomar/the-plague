import { Variant } from "@/src/shared/interfaces/Variant";
import { Product as ProductType } from "@/src/shared/types/Product";

const getBestVariant = (variants: Variant[]) => {
  return variants.reduce((best, current) => {
    const bestPrice = best.salePrice ?? best.price;
    const currentPrice = current.salePrice ?? current.price;
    return currentPrice < bestPrice ? current : best;
  });
};

export const processProducts = (products: ProductType[]) => {
  return products.map((product) => {
    const selectedVariant = getBestVariant(product.variants);
    return {
      ...product,
      price: selectedVariant.price,
      salePrice: selectedVariant.salePrice,
      isSale: Boolean(selectedVariant.salePrice),
    };
  });
};
