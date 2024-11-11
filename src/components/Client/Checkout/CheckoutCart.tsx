"use client";

import CheckoutCartItem from "./CheckoutCartItem"; // Ensure the name is correct
import { useCheckoutContext } from "@/src/context/CheckoutContext";

const CheckoutCart = () => {
  const { checkout } = useCheckoutContext(); // Get the 'checkout' item from the context

  // If 'checkout' is empty, show "No items in the cart"
  if (!checkout) {
    return <div>No items in the cart</div>;
  }

  return (
    <div>
      {/* If 'checkout' is not empty, display the item */}
      {checkout.map((c) => {
        return (
          <CheckoutCartItem
            key="checkout-now"
            product={c.product}
            variant={c.variant}
            quantity={c.quantity}
          />
        );
      })}
    </div>
  );
};

export default CheckoutCart;
