import { PaymentDetails } from "@/shared/types/PaymentDetails";
import { OrderSummary } from "@/shared/types/OrderSummary";

export type CheckoutPageContent = {
  title: string;
  titleImageUrl: string;
  titleImageAlt: string;
  subTitle: string;
  cartTitle: string;
  orderSummary: OrderSummary;
  paymentDetails: PaymentDetails;
  contactDetails: ContactDetails;
  submitButtonText: string;
};

export type ContactDetails = {
  title: string;
  fullNamePlaceholder: string;
  emailPlaceholder: string;
  addressPlaceholder: string;
  phoneLabel: string;
  phoneCountryCode: string;
  phoneImageUrl: string;
  phoneImageAlt: string;
  phonePlaceholder: string;
};
