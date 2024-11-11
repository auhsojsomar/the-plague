"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { CartData } from "@/shared/interfaces/CartData";

// Create the context for handling the "Buy Now" state
interface CheckoutContextType {
  checkout: CartData[] | null;
  setCheckout: (product: CartData[] | null) => void;
  paymentTransactionImage: string;
  setPaymentTransactionImage: (image: string) => void;
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
  const [checkout, setCheckout] = useState<CartData[] | null>(null);
  const [paymentTransactionImage, setPaymentTransactionImage] =
    useState<string>("");

  return (
    <CheckoutContext.Provider
      value={{
        checkout,
        setCheckout,
        paymentTransactionImage,
        setPaymentTransactionImage,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
