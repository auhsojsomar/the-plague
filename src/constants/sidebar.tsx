import { Sidebar } from "@/src/types/sidebar/sidebar";
import { sizes } from "./sizes";
import { colors } from "./color";
import { Route } from "@/types/common/route";

import { HiChartPie, HiShoppingCart, HiShoppingBag } from "react-icons/hi";
import { ComponentType } from "react";
import { MdDiscount } from "react-icons/md";

type RouteWithIcon = Route & {
  icon?: ComponentType<React.ComponentProps<"svg">>;
};

export const sidebarData: Sidebar = {
  title: "Product Filter",
  button: {
    placeholder: "Reset Filters",
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
  { link: "/admin/products", label: "Products", icon: HiShoppingBag },
  { link: "/admin/banner", label: "Banner", icon: MdDiscount },
];
