import { Product } from "@/types/Product";
import { BASE_URL } from "../BASE_URL";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      next: { revalidate: 30 }, // Re-fetch after 30 seconds
    });

    if (!response.ok) {
      console.error("Failed to fetch products:", response.statusText);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
