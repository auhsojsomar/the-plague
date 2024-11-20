"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Color } from "@/src/shared/interfaces/Variant";

interface ColorPillsProps {
  colors: Color[];
  onColorSelect: (color: Color) => void; // Callback to pass selected color to parent component
  disabledColorNames?: string[];
  selectedColorName?: string;
}

// Helper function to get unique colors by ID
const getUniqueColors = (colors: Color[]) => {
  const seen = new Set<string>();
  return colors.filter(({ id }) => id && !seen.has(id) && seen.add(id));
};

const ColorPills: React.FC<ColorPillsProps> = ({
  colors,
  onColorSelect,
  disabledColorNames = [],
  selectedColorName,
}) => {
  const [activeColor, setActiveColor] = useState<Color | null>(null);
  const uniqueColors = useMemo(() => getUniqueColors(colors), [colors]);

  // Set active color if a selected color is provided from props
  useEffect(() => {
    if (selectedColorName) {
      const selectedColor = uniqueColors.find(
        (color) => color.name === selectedColorName
      );
      setActiveColor(selectedColor || null);
    }
  }, [selectedColorName, uniqueColors]);

  const handleColorClick = (color: Color) => {
    if (selectedColorName === color.name) return; // Prevent re-selecting the same color
    onColorSelect(color); // Notify parent of the selected color
  };

  const getButtonClass = (color: Color) => {
    const isDisabled = disabledColorNames.includes(color.name);
    const isActive = activeColor?.id === color.id;

    return [
      "flex items-center px-4 py-2 rounded-full border-2 border-gray-200 text-sm font-medium transition-all cursor-pointer",
      isActive
        ? "border-gray-500 border-2 shadow-md"
        : isDisabled
        ? "opacity-50 hover:shadow-none"
        : "hover:shadow-md",
    ].join(" ");
  };

  return (
    <>
      {uniqueColors.map((color: Color) => (
        <button
          // disabled={disabledColorNames.includes(color.name)} // Disable if not available
          key={color.id ?? color.name} // Fallback to name if ID is undefined
          className={getButtonClass(color)}
          onClick={() => handleColorClick(color)}
        >
          <span
            className="w-5 h-5 rounded-full border mr-1 "
            style={{ backgroundColor: color.hexCode }}
          ></span>
          {color.name}
        </button>
      ))}
    </>
  );
};

export default ColorPills;
