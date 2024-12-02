export interface Items {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  contactNumber: string;
  email: string;
}

export interface OrderData {
  items: Items[];
  shippingAddress: ShippingAddress;
  paymentTransactionFile: string;
}
