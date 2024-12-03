"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Sidebar } from "flowbite-react";
import { sidebarData } from "@/src/constants/sidebar";
import ColorPills from "@/shared/ColorPills";
import SizePills from "@/shared/SizePills";
import { getColors, getSizes } from "@/src/lib/api/getProductsApi";
import { Size, Color } from "@/src/shared/interfaces/Variant";
import PillsSkeleton from "../../Skeleton/PillsSkeleton";
import React from "react";

interface ProductSidebarProps {
  selectedColorName: string | undefined;
  selectedSizeName: string | undefined;
  setSelectedSizeName: Dispatch<SetStateAction<string | undefined>>;
  setSelectedColorName: Dispatch<SetStateAction<string | undefined>>;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({
  selectedColorName,
  selectedSizeName,
  setSelectedSizeName,
  setSelectedColorName,
}) => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sizesResponse = await getSizes();
        const colorsResponse = await getColors();
        setSizes(sizesResponse);
        setColors(colorsResponse);
      } catch (err) {
        setError("Error fetching filter data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleColorSelect = (color: Color) => {
    setSelectedColorName(color.name);
  };

  const handleSizeSelect = (size: Size) => {
    setSelectedSizeName(size.name);
  };

  const resetFilter = () => {
    setSelectedSizeName(undefined);
    setSelectedColorName(undefined);
  };

  if (error) {
    return <div>{error}</div>;
  }

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
            <button
              className="text-xs text-blue-600 underline"
              onClick={resetFilter}
            >
              {sidebarData.button.placeholder}
            </button>
          </div>
        </Sidebar.ItemGroup>

        {/* Size */}
        <Sidebar.ItemGroup>
          <h3 className="mb-1">{sidebarData.variant.size.title}</h3>
          <div className="flex flex-wrap gap-2">
            {loading ? (
              <PillsSkeleton />
            ) : (
              <SizePills
                sizes={sizes}
                onSizeSelect={handleSizeSelect}
                selectedSizeName={selectedSizeName}
              />
            )}
          </div>
        </Sidebar.ItemGroup>

        {/* Color */}
        <Sidebar.ItemGroup>
          <h3 className="mb-1">{sidebarData.variant.color.title}</h3>
          <div className="flex flex-wrap gap-2">
            {loading ? (
              <PillsSkeleton />
            ) : (
              <ColorPills
                colors={colors}
                onColorSelect={handleColorSelect}
                selectedColorName={selectedColorName}
              />
            )}
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default ProductSidebar;
