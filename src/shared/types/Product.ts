import { Image } from "@/src/types/product/image";
import { Variant } from "../interfaces/Variant";

// Product all required fields
type ProductBase = {
  id: string;
  name: string;
  description: string;
  image: Image;
  variants: Variant[];
  price: number; // Regular price
  salePrice?: number; // Sale price if applicable
  isSale: boolean; // Indicates if the product is on sale
};

export type Product = ProductBase;
