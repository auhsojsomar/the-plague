"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { CartData } from "@/shared/interfaces/CartData";

export const useCartCookies = () => {
  const [cart, setCart] = useState<CartData[]>([]);

  const addToCartCookies = (newItem: CartData) => {
    const cartCookies = Cookies.get("cart") ?? "";
    const existedCart = cartCookies
      ? (JSON.parse(cartCookies) as CartData[])
      : [];

    let itemHandled = false;
    const updatedCart = existedCart.map((existingItem) => {
      if (existingItem.productId === newItem.productId) {
        if (existingItem.variantId === newItem.variantId) {
          itemHandled = true;
          return {
            ...existingItem,
            quantity: existingItem.quantity + newItem.quantity,
          };
        }
        itemHandled = true;
        return newItem;
      }
      return existingItem;
    });

    if (!itemHandled) {
      updatedCart.push(newItem);
    }

    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
    setCart(updatedCart);
  };

  return { cart, addToCartCookies };
};
