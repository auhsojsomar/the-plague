import React from "react";
import Table from "./Table";
import AddProductButton from "./AddProductButton";
import { ToastContextProvider } from "@/src/context/ToastContext";
import ToastMessage from "../../Shared/ToastMessage";
import { ProductContextProvider } from "@/src/context/ProductContext";
import { getProducts } from "@/src/lib/api/getProducts";
import { ProductDto } from "@/src/shared/interfaces/ProductDto";

const Products = async () => {
  let products: ProductDto[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return (
    <ProductContextProvider>
      <ToastContextProvider>
        <AddProductButton />
        <Table initialProducts={products} />
        <ToastMessage />
      </ToastContextProvider>
    </ProductContextProvider>
  );
};

export default Products;
