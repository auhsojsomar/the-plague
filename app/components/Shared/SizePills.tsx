"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Size } from "@/app/shared/interfaces/Variant";

interface SizePillsProps {
  sizes: Size[];
  onSizeSelect: (size: Size) => void; // Callback to pass selected size to parent component
  disabledSizeNames?: string[]; // List of disabled size names
  selectedSizeName?: string; // Currently selected size name
}

// Utility function to filter unique sizes by ID
const getUniqueSizes = (sizes: Size[]) => {
  const seen = new Set<string>();
  return sizes.filter(({ id }) => id && !seen.has(id) && seen.add(id));
};

const SizePills: React.FC<SizePillsProps> = ({
  sizes,
  onSizeSelect,
  disabledSizeNames = [],
  selectedSizeName,
}) => {
  const [activeSize, setActiveSize] = useState<Size | null>(null);
  const uniqueSizes = useMemo(() => getUniqueSizes(sizes), [sizes]);

  // Set active size if a selected size is provided from props
  useEffect(() => {
    if (selectedSizeName) {
      const selectedSize = uniqueSizes.find(
        (size) => size.name === selectedSizeName
      );
      setActiveSize(selectedSize || null);
    }
  }, [selectedSizeName, uniqueSizes]);

  const handleSizeClick = (size: Size) => {
    if (selectedSizeName === size.name) return; // Prevent re-selecting the same size
    onSizeSelect(size); // Notify parent of the selected size
  };

  const getButtonClass = (size: Size): string => {
    const isActive = activeSize?.id === size.id;
    const isDisabled = disabledSizeNames.includes(size.name);

    return [
      "px-4 py-2 rounded-full font-medium border-2 shadow-sm text-xs text-secondary-color transition-all cursor-pointer",
      isActive
        ? "border-gray-500 border-2 shadow-md"
        : isDisabled
        ? "opacity-50 hover:shadow-none"
        : "hover:shadow-md",
    ].join(" ");
  };

  return (
    <>
      {uniqueSizes.map((size) => (
        <button
          // disabled={disabledSizeNames.includes(size.name)} // Disable button if size is in the disabled list
          key={size.id}
          className={getButtonClass(size)}
          onClick={() => handleSizeClick(size)}
        >
          {size.name}
        </button>
      ))}
    </>
  );
};

export default SizePills;
