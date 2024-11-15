import { CheckoutPageContent } from "../types/checkout/checkout";

export const CHECKOUT: CheckoutPageContent = {
  title: "The Plague",
  titleImageUrl: "logo.webp",
  titleImageAlt: "the-plague-logo",
  subTitle: "Checkout",
  cartTitle: "Your Cart",
  orderSummary: {
    title: "Order Summary",
    subTotalLabel: "Subtotal",
    shippingFeeLabel: "Shipping fee",
    totalLabel: "Total",
  },
  paymentDetails: {
    title: "Payment Details",
    paymentImageUrl: "gcash-icon.webp",
    paymentImageAlt: "gcash-payment",
    paymentLabel: "Gcash",
    paymentText: "+63 9123456789",
    inputFileLabel:
      "Please upload a screenshot of your Gcash payment transaction.",
  },
  contactDetails: {
    title: "Contact Details",
    fullNamePlaceholder: "Full Name",
    addressPlaceholder: "Full Address",
    phoneLabel: "Contact Number",
    phoneCountryCode: "+63",
    phoneImageUrl: "philipiines-flag.svg",
    phoneImageAlt: "philipiines-flag",
    phonePlaceholder: "9123456789",
  },
  submitButtonText: "Place Order",
};
