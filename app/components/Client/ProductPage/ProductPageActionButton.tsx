// ProductPageActionButton.tsx

"use client";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Variant } from "@/app/shared/interfaces/Variant";

interface ProductPageActionButtonProps {
  disabled: boolean;
  variant: Variant | null;
}

const ProductPageActionButton: React.FC<ProductPageActionButtonProps> = ({
  disabled,
  variant,
}) => {
  return (
    <div className="flex gap-2">
      <button
        className={`bg-primary-color text-lg w-56 h-12 text-white rounded-md ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
      >
        Buy Now
      </button>
      <button className="flex justify-center items-center gap-2 bg-secondary-color text-lg w-56 h-12 text-white rounded-md">
        <FontAwesomeIcon icon={faShoppingCart} />
        Add to cart
      </button>
    </div>
  );
};

export default ProductPageActionButton;
