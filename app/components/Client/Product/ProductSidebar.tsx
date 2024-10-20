"use client";

import { Sidebar } from "flowbite-react";
import { sidebarData } from "@/app/constants/sidebar";
import ColorPills from "../../Shared/ColorPills";
import SizePills from "../../Shared/SizePills";
import ProductCategoryList from "./ProductCategoryList";

const ProductSidebar = () => {
  return (
    <Sidebar
      className="fixed top-20 w-64 z-40 overflow-y-auto shadow-lg"
      aria-label="Sidebar"
    >
      <Sidebar.Items>
        {/* Sidebar title */}
        <Sidebar.ItemGroup>
          <div className="flex justify-between items-center">
            <h2>{sidebarData.title}</h2>
            <button className="text-xs text-blue-600 underline">
              {sidebarData.button.placeholder}
            </button>
          </div>
        </Sidebar.ItemGroup>

        {/* Category */}
        <Sidebar.ItemGroup>
          <h3 className="mb-1">{sidebarData.category.title}</h3>
          <ProductCategoryList categories={sidebarData.category.categories} />
        </Sidebar.ItemGroup>

        {/* Size */}
        <Sidebar.ItemGroup>
          <h3 className="mb-1">{sidebarData.variant.size.title}</h3>
          <div className="flex flex-wrap gap-2">
            <SizePills size={sidebarData.variant.size.options} />
          </div>
        </Sidebar.ItemGroup>

        {/* Color */}
        <Sidebar.ItemGroup>
          <h3 className="mb-1">{sidebarData.variant.color.title}</h3>
          <div className="inline-flex flex-wrap">
            <ColorPills colors={sidebarData.variant.color.options} />
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default ProductSidebar;
