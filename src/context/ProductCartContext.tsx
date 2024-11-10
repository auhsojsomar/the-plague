"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { CartData } from "@/interfaces/CartData";
import { Product } from "@/types/Product";

interface ProductCartContextType {
  product: Product;
  cart: CartData[];
  addToCart: (newItem: CartData) => void;
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
  const [cart, setCart] = useState<CartData[]>([]);

  const addToCart = (newItem: CartData) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === newItem.product.id &&
          item.variant.id === newItem.variant.id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      } else {
        return [...prevCart, newItem];
      }
    });
  };

  return (
    <ProductCartContext.Provider
      value={{ product, cart, addToCart, setProduct }}
    >
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
