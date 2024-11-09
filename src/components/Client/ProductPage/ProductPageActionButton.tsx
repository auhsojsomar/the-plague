"use client";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Variant } from "@/src/shared/interfaces/Variant";

interface ProductPageActionButtonProps {
  disabled: boolean;
  variant?: Variant | null;
}

const ProductPageActionButton: React.FC<ProductPageActionButtonProps> = ({
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
      <button
        className={`bg-primary-color text-lg w-full h-12 text-white rounded-md sm:w-56 lg:w-full xl:w-56 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
      >
        Buy Now
      </button>
      <button
        className={`flex justify-center items-center gap-2 bg-secondary-color text-lg w-full h-12 text-white rounded-md sm:w-56 lg:w-full xl:w-56 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
      >
        <div className="w-5 h-auto">
          <FontAwesomeIcon icon={faShoppingCart} />
        </div>
        Add to cart
      </button>
    </div>
  );
};

export default ProductPageActionButton;
