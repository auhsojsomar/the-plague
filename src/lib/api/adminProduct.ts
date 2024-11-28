import { BASE_URL } from "./BASE_URL";
import { InsertProductDto } from "@/src/shared/interfaces/InsertProductDto";

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
  product: InsertProductDto,
  id?: string
): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/Products/${id}`, {
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

    return "Product updated successfully!";
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};
