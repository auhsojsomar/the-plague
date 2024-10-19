export interface Size {
  id: number;
  name: string; // e.g., "Small", "Medium", "Large"
};

export interface Color {
  id: number;
  name: string; // e.g., "Red", "Blue", "Green"
  hex: string; // Optional: hex value for the color (e.g., "#FF0000")
};

export interface Variant {
  id: number; // Unique ID for the variant
  size: Size; // Size of the variant
  color: Color; // Color of the variant
  quantity: number; // Available quantity for this variant
};
