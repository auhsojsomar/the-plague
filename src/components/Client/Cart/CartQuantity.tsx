import { Variant } from "@/src/shared/interfaces/Variant";
import { formatPrice } from "@/utils/priceUtils";
import React from "react";

interface CartQuantityProps {
  variant: Variant;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const CartQuantity: React.FC<CartQuantityProps> = ({
  variant,
  quantity,
  onQuantityChange,
}) => {
  const increment = () => onQuantityChange(quantity + 1);
  const decrement = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };
  return (
    <div className="flex flex-col gap-2">
      {/* Price section */}
      <p className="text-sm sm:text-base font-semibold text-start sm:text-end">
        {variant.salePrice
          ? formatPrice(variant.salePrice * quantity)
          : formatPrice(variant.price * quantity)}
      </p>
      {/* Quantity section */}
      <div className="flex items-center w-fit rounded-md space-x-2 border">
        <button
          onClick={decrement}
          className="w-7 h-7 flex justify-center items-center bg-gray-300 hover:bg-gray-400 text-lg rounded-l"
        >
          -
        </button>
        <span className="text-sm text-center min-w-5 m-0 font-medium">
          {quantity}
        </span>
        <button
          onClick={increment}
          className="w-7 h-7 flex justify-center items-center bg-gray-300 hover:bg-gray-400 text-lg rounded-r"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartQuantity;
