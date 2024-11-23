import { Discount } from "./Variant";
import { Image } from "@/src/types/product/image";

export interface InsertProductDto {
  name: string;
  description: string;
  image: Image;
  variants: VariantDto[];
}

interface SizeDto {
  name: string;
}

interface ColorDto {
  name: string;
  hexCode: string;
}

export interface VariantDto {
  size: SizeDto;
  color: ColorDto;
  price: number;
  quantity: number;
  discount?: Discount;
}
