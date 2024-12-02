interface User {
  id: string;
  email: string | null;
  fullName: string | null;
  shippingAddress: Address[] | null;
}

interface OrderStatus {
  key: number;
  name: string;
  isActive: number;
}

interface PaymentMethod {
  key: number;
  name: string;
  isActive: number;
}

interface PaymentStatus {
  key: number;
  name: string;
  isActive: number;
}

interface ShippingFee {
  key: number;
  name: string;
  isActive: number;
  cost: number;
}

interface Address {
  id: string;
  default: number;
  fullName: string;
  address: string;
  contactNumber: string;
  email: string;
}

interface OrderItem {
  product: string;
  variant: string;
  quantity: number;
}

export interface Order {
  id: string;
  user: User;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingFee: ShippingFee;
  paymentTransactionFile: string;
  shippingAddress: Address;
  totalPrice: number;
  items: OrderItem[];
  dateCreated: string;
  dateModified: string;
}
