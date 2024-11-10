"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { CartData } from "@/shared/interfaces/CartData";

// Create the context for handling the "Buy Now" state
interface CheckoutContextType {
  buy: CartData | null;
  setBuy: (product: CartData | null) => void;
}

// Define the props for the CheckoutContextProvider to accept children
interface CheckoutContextProviderProps {
  children: ReactNode;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

// Custom hook to use the CheckoutContext
export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error(
      "useCheckoutContext must be used within a CheckoutContextProvider"
    );
  }
  return context;
};

// Context provider component
export const CheckoutContextProvider: React.FC<
  CheckoutContextProviderProps
> = ({ children }) => {
  const [buy, setBuy] = useState<CartData | null>(null);

  return (
    <CheckoutContext.Provider value={{ buy, setBuy }}>
      {children}
    </CheckoutContext.Provider>
  );
};
