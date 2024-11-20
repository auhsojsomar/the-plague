import { Color, Size } from "@/src/shared/interfaces/Variant";

export type Sidebar = {
  title: string; // Title of the sidebar
  button: Button; // Button properties
  category: Category; // Category properties
  variant: VariantOptions; // Variant properties
};

type Button = {
  placeholder: string; // Placeholder text for the button
};

type Category = {
  title: string; // Title for the category section
  categories: CategoryLabel[];
};

export type CategoryLabel = {
  id: number;
  name: string;
};

type VariantOptions = {
  size: VariantDetail<Size>; // Size variant options
  color: VariantDetail<Color>; // Color variant options
};

type VariantDetail<T> = {
  title: string; // Title for the variant section
  options: T[]; // Array of variant options (sizes or colors)
};
