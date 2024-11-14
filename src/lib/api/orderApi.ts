import { Orders } from "@/shared/interfaces/Order";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getOrders = async (): Promise<Orders> => {
  try {
    const response = await fetch(`${BASE_URL}/Order`);

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }

    const data: Orders = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};
