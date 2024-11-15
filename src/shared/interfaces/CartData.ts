import { Product } from "@/types/Product";
import { Variant } from "./Variant";

export interface CartData {
  product: Product;
  variant: Variant;
  quantity: number;
}
