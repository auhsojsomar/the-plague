"use client";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Variant } from "@/src/shared/interfaces/Variant";
import { useProductCartContext } from "@/src/context/ProductCartContext";
import { useState } from "react";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useCartCookies } from "@/src/hooks/useCartCookies";
import { CartData } from "@/src/shared/interfaces/CartData";

interface ProductPageActionButtonProps {
  disabled: boolean;
  variant: Variant | null;
  quantity: number;
}

const ProductPageActionButton: React.FC<ProductPageActionButtonProps> = ({
  variant,
  disabled,
  quantity,
}) => {
  const router = useRouter();
  const { addToCartCookies } = useCartCookies();
  const { product, addToCart } = useProductCartContext();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const handleAddToCart = () => {
    if (!isAddingToCart && variant && product && quantity > 0) {
      const newProduct: CartData = {
        product,
        variant,
        quantity,
      };

      setIsAddingToCart(true);

      addToCartCookies(newProduct);
      addToCart(newProduct);

      setTimeout(() => {
        setIsAddingToCart(false);
      }, 1000);
    }
  };

  const handleBuyNow = () => {
    if (!isBuying && variant && product && quantity > 0) {
      const newProduct: CartData = {
        product,
        variant,
        quantity,
      };

      setIsBuying(true);

      addToCartCookies(newProduct);
      addToCart(newProduct);

      setTimeout(() => {
        router.push("/checkout");
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
      <button
        className={`bg-primary-color text-lg w-full h-12 text-white rounded-md sm:w-56 lg:w-full xl:w-56 ${
          disabled || isBuying
            ? "opacity-50 cursor-not-allowed"
            : "hover:opacity-80"
        }`}
        onClick={handleBuyNow}
        disabled={disabled || isBuying}
      >
        {isBuying ? <Spinner size="sm" color="white" /> : "Buy Now"}
      </button>
      <button
        className={`flex justify-center items-center gap-2 bg-secondary-color text-lg w-full h-12 text-white rounded-md sm:w-56 lg:w-full xl:w-56 ${
          disabled || isAddingToCart
            ? "opacity-50 cursor-not-allowed"
            : "hover:opacity-80"
        }`}
        onClick={handleAddToCart}
        disabled={disabled || isAddingToCart}
      >
        <div className="w-5 h-auto">
          <FontAwesomeIcon icon={faShoppingCart} />
        </div>
        {isAddingToCart ? <Spinner size="sm" color="white" /> : "Add to cart"}
      </button>
    </div>
  );
};

export default ProductPageActionButton;
