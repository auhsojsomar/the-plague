"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface CartCountContextType {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

const CartCountContext = createContext<CartCountContextType | undefined>(
  undefined
);

export const CartCountContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartCount, setCartCount] = useState<number>(0);

  return (
    <CartCountContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartCountContext.Provider>
  );
};

export const useCartCountContext = () => {
  const context = useContext(CartCountContext);
  if (context === undefined) {
    throw new Error(
      "useCartCountContext must be used within a CartCountContextProvider"
    );
  }
  return context;
};
