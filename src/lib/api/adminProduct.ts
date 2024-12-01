import { ProductDto } from "@/src/shared/interfaces/ProductDto";
import { BASE_URL } from "./BASE_URL";
import { InsertProductDto } from "@/src/shared/interfaces/InsertProductDto";

export const getProducts = async (): Promise<ProductDto[]> => {
  try {
    const response = await fetch(`${BASE_URL}/Products`, { cache: "no-store" });
    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const insertProduct = async (
  product: InsertProductDto
): Promise<InsertProductDto> => {
  try {
    const response = await fetch(`${BASE_URL}/Products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else if (response.status === 409) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Product already exists.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }

    return response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const updateProduct = async (
  product: InsertProductDto | null,
  id?: string
): Promise<InsertProductDto | null> => {
  try {
    const response = await fetch(`${BASE_URL}/Products/${id ?? product?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }

    return product;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const deleteProduct = async (id: string): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/Products/${id}`, {
      method: "DELETE",
    });

    if (response.status === 204) {
      return "Product deleted sucessfully";
    } else if (response.status >= 500) {
      throw new Error("Server error. Please try again later.");
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred.");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};
