import { Image } from "@/src/types/product/image";
import { Variant } from "@/interfaces/Variant";

export type ProductDto = {
  id: string;
  name: string;
  description: string;
  image: Image;
  variants: Variant[];
};
