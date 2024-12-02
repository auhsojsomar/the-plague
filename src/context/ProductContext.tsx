"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";
import { ProductDto } from "../shared/interfaces/ProductDto";

interface ProductContextProps {
  products: ProductDto[] | [];
  setProducts: (product: ProductDto[]) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

export const ProductContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [products, setProducts] = useState<ProductDto[] | []>([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error(
      "useProductContext must be used within a ProductContextProvider"
    );
  }
  return context;
};
