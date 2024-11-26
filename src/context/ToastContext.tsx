"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the Toast Context type
interface ToastContextType {
  toastMessage: string;
  toastType: "success" | "error" | ""; // success or error or empty for no toast
  setToast: (message: string, type: "success" | "error") => void;
  clearToast: () => void;
}

// Create the context with default values
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast Provider Component
export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error" | "">("");

  // Set the toast message and type
  const setToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
  };

  // Clear the toast message and type
  const clearToast = () => {
    setToastMessage("");
    setToastType("");
  };

  return (
    <ToastContext.Provider
      value={{ toastMessage, toastType, setToast, clearToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use the Toast Context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
