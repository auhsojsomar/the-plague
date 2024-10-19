import { Variant } from "../interfaces/Variant";

// Product all required fields
type ProductBase = {
  productName: string;
  image: string;
  price: number;
  variants: Variant;
};

// Product required fields if sale
type ProductWithSale = ProductBase & {
  isSale: true;
  salePrice: number;
};

// Product required fields if not on sale
type ProductWithoutSale = ProductBase & {
  isSale?: false;
  salePrice?: undefined;
};

export type Product = ProductWithSale | ProductWithoutSale;
