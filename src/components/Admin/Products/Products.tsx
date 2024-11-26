import React from "react";
import Table from "./Table";
import AddProductButton from "./AddProductButton";
import { ToastContextProvider } from "@/src/context/ToastContext";
import ToastMessage from "../../Shared/ToastMessage";

const Products = () => {
  return (
    <ToastContextProvider>
      <AddProductButton />
      <Table />
      <ToastMessage />
    </ToastContextProvider>
  );
};

export default Products;
