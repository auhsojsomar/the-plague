"use client";

import { useToast } from "@/src/context/ToastContext";
import { Toast, ToastToggle } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiExclamation } from "react-icons/hi";

const ToastMessage = () => {
  const { toastMessage, toastType, clearToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      setIsVisible(true); // Show the toast with animation
      const timeout = setTimeout(() => {
        setIsVisible(false); // Hide the toast with animation after 3 seconds
        setTimeout(() => clearToast(), 300); // Clear the toast after the slide-out animation
      }, 3000);

      // Clean up timeout on component unmount
      return () => clearTimeout(timeout);
    }
  }, [toastMessage, clearToast]);

  return (
    toastMessage && (
      <Toast
        className={`fixed right-5 bottom-5 z-50 shadow-md border transform transition-all ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
            toastType === "success"
              ? "bg-green-100 text-green-500 dark:bg-green-700 dark:text-green-200"
              : "bg-red-100 text-red-500 dark:bg-red-700 dark:text-red-200"
          }`}
        >
          <HiExclamation className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{toastMessage}</div>
        <ToastToggle />
      </Toast>
    )
  );
};

export default ToastMessage;
