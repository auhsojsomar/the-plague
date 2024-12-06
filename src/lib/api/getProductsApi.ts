import { Product } from "@/types/Product";
import { BASE_URL } from "../BASE_URL";
import { Color, Size } from "@/src/shared/interfaces/Variant";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/Products`, {
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

export const getBestProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/Products`, {
      next: { revalidate: 30 }, // Re-fetch after 30 seconds
    });

    if (!response.ok) {
      console.error("Failed to fetch products:", response.statusText);
      return [];
    }

    const data: Product[] = await response.json();
    return data.slice(0, 5);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getFeatureProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/Products`, {
      next: { revalidate: 30 }, // Re-fetch after 30 seconds
    });

    if (!response.ok) {
      console.error("Failed to fetch products:", response.statusText);
      return [];
    }

    const products: Product[] = await response.json();

    // Shuffle the products array using sort and Math.random()
    products.sort(() => Math.random() - 0.5);

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getColors = async (): Promise<Color[]> => {
  try {
    const response = await fetch(`${BASE_URL}/Products/colors`, {
      next: { revalidate: 30 }, // Re-fetch after 30 seconds
    });

    if (!response.ok) {
      console.error("Failed to fetch colors:", response.statusText);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching colors:", error);
    return [];
  }
};

export const getSizes = async (): Promise<Size[]> => {
  try {
    const response = await fetch(`${BASE_URL}/Products/sizes`, {
      next: { revalidate: 30 }, // Re-fetch after 30 seconds
    });

    if (!response.ok) {
      console.error("Failed to fetch sizes:", response.statusText);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching sizes:", error);
    return [];
  }
};
