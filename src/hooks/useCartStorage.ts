"use client";

import { useState, useEffect, useCallback } from "react";
import { CartData } from "@/shared/interfaces/CartData";
import { useCartCountContext } from "../context/CartCountContext";

export const useCartStorage = () => {
  const [cart, setCart] = useState<CartData[]>([]); // Cart state
  const { cartCount, setCartCount } = useCartCountContext();

  // Helper function to update cart count based on quantities
  const updateCartCount = useCallback(
    (updatedCart: CartData[]) => {
      const totalQuantity = updatedCart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartCount(totalQuantity); // Set total quantity as cart count
    },
    [setCartCount]
  );

  // Helper function to update cart in both state and localStorage
  const updateCartStorage = (updatedCart: CartData[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Store cart in localStorage
    setCart(updatedCart);
    updateCartCount(updatedCart);
  };

  // Function to handle adding to the cart (either updating or adding a new product)
  const addToCartStorage = (newItem: CartData) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(
      (item) =>
        item.product.id === newItem.product.id &&
        item.variant.id === newItem.variant.id
    );

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += newItem.quantity;
    } else {
      updatedCart.push(newItem);
    }

    updateCartStorage(updatedCart); // Save updated cart to localStorage and state
  };

  // Load cart data from localStorage when the component mounts
  useEffect(() => {
    const cartStorage = localStorage.getItem("cart");

    if (cartStorage) {
      try {
        const parsedCart = JSON.parse(cartStorage);
        setCart(parsedCart);
        updateCartCount(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage", error);
      }
    }
  }, [updateCartCount]); // Runs once when the component mounts

  return { cart, cartCount, addToCartStorage };
};
