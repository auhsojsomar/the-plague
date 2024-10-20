import React from "react";
import ProductList from "./ProductList";
import ProductSidebar from "./ProductSidebar";
import ProductBanner from "./ProductBanner";

const Product = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      {/* Sidebar */}
      <ProductSidebar />

      {/* Main content */}
      <div className="p-4 ml-64">
        <ProductBanner />
        <ProductList />
      </div>
    </div>
  );
};

export default Product;
