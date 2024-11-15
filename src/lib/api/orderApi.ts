import { Order } from "@/shared/interfaces/Order";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const token = Cookies.get("authToken");

export const getOrders = async (): Promise<Order[]> => {
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

    const data: Order[] = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const updateOrder = async (
  id: string,
  order: unknown
): Promise<Order> => {
  try {
    const response = await fetch(`${BASE_URL}/Order/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }
    // Handle 204 No Content separately
    if (response.status === 204) {
      return {} as Order; // Or return undefined if that's more appropriate
    }

    // If there's content in the response (not a 204)
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};
