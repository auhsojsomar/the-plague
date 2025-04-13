import { Discount } from "./Variant";

export interface SalesReport {
  productName: string;
  variantName: string;
  quantitySold: number;
  unitPrice: number;
  discount: Discount;
  total: number;
  dateCreated: Date;
}
