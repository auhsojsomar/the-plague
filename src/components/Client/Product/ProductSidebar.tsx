"use client";

import { Sidebar } from "flowbite-react";
import { sidebarData } from "@/src/constants/sidebar";
import ColorPills from "../../Shared/ColorPills";
import SizePills from "../../Shared/SizePills";
// import ProductCategoryList from "./ProductCategoryList";
import { Color, Size } from "@/src/shared/interfaces/Variant";

const ProductSidebar = () => {
  const handleColorSelect = (selectedColor: Color) => {
    console.log("Selected Color:", selectedColor);
  };

  const handleSizeSelect = (selectedSize: Size) => {
    console.log("Selected Size:", selectedSize);
  };

  return (
    <Sidebar
      className="z-40 h-auto absolute w-64 hidden sm:block overflow-y-auto shadow-lg"
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

        {/* Size */}
        <Sidebar.ItemGroup>
          <h3 className="mb-1">{sidebarData.variant.size.title}</h3>
          <div className="flex flex-wrap gap-2">
            <SizePills
              sizes={sidebarData.variant.size.options}
              onSizeSelect={handleSizeSelect}
            />
          </div>
        </Sidebar.ItemGroup>

        {/* Color */}
        <Sidebar.ItemGroup>
          <h3 className="mb-1">{sidebarData.variant.color.title}</h3>
          <div className="flex flex-wrap gap-2">
            <ColorPills
              colors={sidebarData.variant.color.options}
              onColorSelect={handleColorSelect}
            />
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default ProductSidebar;
