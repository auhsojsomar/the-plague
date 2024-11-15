import { Sidebar } from "@/src/types/sidebar/sidebar";
import { sizes } from "./sizes";
import { colors } from "./color";
import { Route } from "@/types/common/route";

import {
  HiChartPie,
  HiShoppingBag,
  HiUser,
  HiShoppingCart,
} from "react-icons/hi";
import { ComponentType } from "react";

type RouteWithIcon = Route & {
  icon?: ComponentType<React.ComponentProps<"svg">>;
};

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

export const adminSidebar: RouteWithIcon[] = [
  { link: "/admin/dashboard", label: "Dashboard", icon: HiChartPie },
  { link: "/admin/orders", label: "Orders", icon: HiShoppingCart },
  { link: "/admin/users", label: "Users", icon: HiUser },
  { link: "/admin/products", label: "Products", icon: HiShoppingBag },
];
