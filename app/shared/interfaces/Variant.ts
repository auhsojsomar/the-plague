export interface Size {
  id: string;
  name: string; // e.g., "Small", "Medium", "Large"
}

export interface Color {
  id: string;
  name: string; // e.g., "Red", "Blue", "Green"
  hexCode: string; // Optional: hex value for the color (e.g., "#FF0000")
}

export interface Variant {
  id: string; // Unique ID for the variant
  size: Size; // Size of the variant
  color: Color; // Color of the variant
  price: number;
  discount?: Discount; // Assuming discount is always present, if not, make it optional
  quantity: number; // Available quantity for this variant
  salePrice?: number; // Optional: add this field to accommodate sale price when applicable
}

export interface Discount {
  id?: string; // Optional: if you're not providing this from the API
  type: "Percentage" | "FixedAmount"; // Use string literals to match API types
  value: number; // Assuming value corresponds to the discount value
}
