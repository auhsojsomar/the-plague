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
  quantity: number; // Available quantity for this variant
}

export interface Discount {
  id: string;
  type: number; // Assuming type corresponds to discount type
  value: number; // Assuming value corresponds to the discount value
}
