import React from "react";
import Table from "./Table";
import AddProductButton from "./AddProductButton";
import { ToastContextProvider } from "@/src/context/ToastContext";
import ToastMessage from "../../Shared/ToastMessage";
import { ProductContextProvider } from "@/src/context/ProductContext";

const Products = async () => {
  return (
    <ProductContextProvider>
      <ToastContextProvider>
        <AddProductButton />
        <Table />
        <ToastMessage />
      </ToastContextProvider>
    </ProductContextProvider>
  );
};

export default Products;
