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

export type OrderSummary = {
  title: string;
  subTotalLabel: string;
  shippingFeeLabel: string;
  totalLabel: string;
};

export type PaymentDetails = {
  title: string;
  paymentImageUrl: string;
  paymentImageAlt: string;
  paymentLabel: string;
  paymentText: string;
  inputFileLabel: string;
};

export type ContactDetails = {
  title: string;
  fullNamePlaceholder: string;
  addressPlaceholder: string;
  phoneLabel: string;
  phoneCountryCode: string;
  phoneImageUrl: string;
  phoneImageAlt: string;
  phonePlaceholder: string;
};
