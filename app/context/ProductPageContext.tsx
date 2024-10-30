// ProductPageContext.tsx
"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  ReactNode,
} from "react";
import { Product } from "../shared/types/Product";
import { Variant } from "@/app/shared/interfaces/Variant";

interface ProductPageContextType {
  product: Product;
  setProduct: Dispatch<SetStateAction<Product>>;
  selectedVariant: Variant | null; // Add selectedVariant to context
  setSelectedVariant: Dispatch<SetStateAction<Variant | null>>; // Add setter
}

export const ProductPageContext = createContext<
  ProductPageContextType | undefined
>(undefined);

export const ProductPageContextProvider: React.FC<{
  children: ReactNode;
  initialProduct: Product;
}> = ({ children, initialProduct }) => {
  const [product, setProduct] = useState<Product>(initialProduct);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null); // Initialize selectedVariant

  return (
    <ProductPageContext.Provider
      value={{ product, setProduct, selectedVariant, setSelectedVariant }}
    >
      {children}
    </ProductPageContext.Provider>
  );
};

export const useProductPageContext = () => {
  const context = useContext(ProductPageContext);
  if (context === undefined) {
    throw new Error(
      "useProductPageContext must be used within a ProductPageContextProvider"
    );
  }
  return context;
};
