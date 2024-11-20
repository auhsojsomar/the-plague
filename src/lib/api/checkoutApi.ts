import { OrderData } from "@/src/shared/interfaces/OderData";
import { PaymentOption } from "@/interfaces/PaymentMethod";
import { BASE_URL } from "./BASE_URL";

interface ShippingFeeData {
  cost: number;
}

export const getShippingFee = async (): Promise<ShippingFeeData> => {
  try {
    const response = await fetch(`${BASE_URL}/ShippingFee/key/1`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Shipping fee not found.");
      } else if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }

    const data: ShippingFeeData = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const getPaymentMethod = async (): Promise<PaymentOption[]> => {
  try {
    const response = await fetch(`${BASE_URL}/PaymentMethod`);

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }

    const data: PaymentOption[] = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const submitOrder = async (order: OrderData): Promise<OrderData> => {
  try {
    const response = await fetch(`${BASE_URL}/Order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      if (response.status == 400)
        throw new Error("Bad Request. Please try again later");
      else if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }

    const data: OrderData = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};
