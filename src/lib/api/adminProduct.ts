import { BASE_URL } from "./BASE_URL";
import { InsertProductDto } from "@/src/shared/interfaces/InsertProductDto";

export const insertProduct = async (
  product: InsertProductDto
): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/Products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure the server knows we're sending JSON
      },
      body: JSON.stringify(product), // Send the product object as a JSON string
    });

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else if (response.status === 409) {
        // Handle 409 Conflict error specifically
        const errorData = await response.json();
        throw new Error(errorData.message || "Product already exists.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }

    // Assuming the server returns a string (maybe the product ID or a success message)
    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};
