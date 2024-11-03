import { Sidebar } from "@/src/types/sidebar/sidebar";
import { sizes } from "./sizes";
import { colors } from "./color";

export const sidebarData: Sidebar = {
  title: "Product Filter",
  button: {
    placeholder: "Reset Filters",
  },
  category: {
    title: "Category",
    categories: [
      { id: 1, name: "T-Shirts" },
      { id: 2, name: "Hoodies" },
      { id: 3, name: "Jeans" },
      { id: 4, name: "Jackets" },
      { id: 5, name: "Accessories" },
    ],
  },
  variant: {
    size: {
      title: "Size",
      options: sizes,
    },
    color: {
      title: "Color",
      options: colors,
    },
  },
};
