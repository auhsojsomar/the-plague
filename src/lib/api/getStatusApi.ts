import { BASE_URL } from "./BASE_URL";

export interface StatusProps {
  key: number;
  name: string;
}

export const getOrderStatus = async (): Promise<StatusProps[]> => {
  try {
    const response = await fetch(`${BASE_URL}/OrderStatus`);

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }

    const data: StatusProps[] = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const getPaymentStatus = async (): Promise<StatusProps[]> => {
  try {
    const response = await fetch(`${BASE_URL}/PaymentStatus`);

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }

    const data: StatusProps[] = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const getPaymentMethod = async (): Promise<StatusProps[]> => {
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

    const data: StatusProps[] = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};
