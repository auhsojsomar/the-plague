"use client";

import CheckoutCartItem from "./CheckoutCartItem"; // Ensure the name is correct
import { useCheckoutContext } from "@/src/context/CheckoutContext";

const CheckoutCart = () => {
  const { buy } = useCheckoutContext(); // Get the 'buy' item from the context

  // If 'buy' is empty, show "No items in the cart"
  if (!buy) {
    return <div>No items in the cart</div>;
  }

  return (
    <div>
      {/* If 'buy' is not empty, display the item */}
      <CheckoutCartItem
        key="buy-now"
        product={buy.product}
        variant={buy.variant}
        quantity={buy.quantity}
      />
    </div>
  );
};

export default CheckoutCart;
