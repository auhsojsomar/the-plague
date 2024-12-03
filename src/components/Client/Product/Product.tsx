"use client";

import { useState } from "react";
import ProductList from "./ProductList";
import { Product as ProductType } from "@/src/shared/types/Product";
import ProductSidebar from "./ProductSidebar";
import ProductBanner from "./ProductBanner";

interface ProductProps {
  products: ProductType[];
}

const Product = ({ products }: ProductProps) => {
  const [selectedColorName, setSelectedColorName] = useState<
    string | undefined
  >(undefined);
  const [selectedSizeName, setSelectedSizeName] = useState<string | undefined>(
    undefined
  );

  // Filter products based on selected color and size for variants
  const filteredProducts = products
    .map((product) => {
      // Filter variants by selected size and color
      const filteredVariants = product.variants.filter((variant) => {
        const colorMatch =
          !selectedColorName || variant.color.name === selectedColorName;
        const sizeMatch =
          !selectedSizeName || variant.size.name === selectedSizeName;

        return colorMatch && sizeMatch;
      });

      return { ...product, variants: filteredVariants }; // Return product with filtered variants
    })
    .filter((product) => product.variants.length > 0); // Only keep products that have at least one matching variant

  return (
    <div>
      <div className="max-w-screen-2xl min-h-[calc(100vh-80px)] mx-auto relative">
        {/* Sidebar with filter options */}
        <ProductSidebar
          selectedColorName={selectedColorName}
          selectedSizeName={selectedSizeName}
          setSelectedColorName={setSelectedColorName}
          setSelectedSizeName={setSelectedSizeName}
        />

        {/* Main content */}
        <div className="p-4 sm:ml-64">
          <ProductBanner />
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Product;
