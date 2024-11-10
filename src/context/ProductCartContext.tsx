"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "@/shared/types/Product";
import { CartData } from "@/interfaces/CartData";

interface ProductCartContextType {
  product: Product;
  cart: CartData[];
  addToCart: (newItem: CartData) => void;
  setProduct: (product: Product) => void; // To update the product in context
}

const ProductCartContext = createContext<ProductCartContextType | undefined>(
  undefined
);

export const ProductCartContextProvider: React.FC<{
  children: ReactNode;
  initialProduct: Product;
}> = ({ children, initialProduct }) => {
  const [, setProduct] = useState<Product>(initialProduct);
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
        console.log(
          "Updated quantity:",
          updatedCart[existingItemIndex].quantity
        );
        return updatedCart;
      } else {
        console.log("Adding new item to cart:", newItem);
        return [...prevCart, newItem];
      }
    });
  };

  return (
    <ProductCartContext.Provider
      value={{ product: initialProduct, cart, addToCart, setProduct }}
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
