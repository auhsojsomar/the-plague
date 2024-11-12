import { OrderSummary } from "@/shared/types/OrderSummary";

export type Cart = {
  title: string;
  titleImageUrl: string;
  titleImageAlt: string;
  subTitle: string;
  orderSummary: OrderSummary;
  submitButtonText: string;
};
