"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "@/types/Product";

interface ProductCartContextType {
  product: Product;
  setProduct: (product: Product) => void;
}

const ProductCartContext = createContext<ProductCartContextType | undefined>(
  undefined
);

const defaultProduct = {
  id: "",
  name: "",
  description: "",
  image: {
    main: "",
    thumbnails: [],
  },
  variants: [],
  price: 0,
  salePrice: undefined,
  isSale: false,
};

export const ProductCartContextProvider: React.FC<{
  children: ReactNode;
  initialProduct?: Product;
}> = ({ children, initialProduct = defaultProduct }) => {
  const [product, setProduct] = useState<Product>(initialProduct);

  return (
    <ProductCartContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductCartContext.Provider>
  );
};

export const useProductCartContext = () => {
  const context = useContext(ProductCartContext);
  if (context === undefined) {
    throw new Error(
      "useProductCartContext must be used within a ProductCartContextProvider"
    );
  }
  return context;
};
