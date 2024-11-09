"use client";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Variant } from "@/src/shared/interfaces/Variant";
import { useProductPageContext } from "@/src/context/ProductPageContext";
import Cookies from "js-cookie";

interface ProductPageActionButtonProps {
  disabled: boolean;
  variant: Variant | null;
  quantity: number;
}

interface CartData {
  productId: string;
  variantId: string | undefined;
  quantity: number;
}

const ProductPageActionButton: React.FC<ProductPageActionButtonProps> = ({
  variant,
  disabled,
  quantity,
}) => {
  const { product } = useProductPageContext();

  const cart: CartData[] = [];

  cart.push({
    productId: product.id,
    variantId: variant?.id,
    quantity,
  });

  const handleBuyNow = () => {
    const newItem = cart[0]; // Assuming `cart` contains the single item to add

    if (!Cookies.get("cart"))
      return Cookies.set("cart", JSON.stringify(cart), { expires: 7 });

    const cartCookies = Cookies.get("cart") ?? "";
    const existedCart = JSON.parse(cartCookies) as CartData[];

    /* If Array A (productId, variantId) has the same in Array B add quantity
       If Array A productId with different variant on Array B update the Array A from the Array B
    */

    // Check if an item with the same productId and variantId already exists
    let itemHandled = false;
    const updatedCart = existedCart.map((existingItem) => {
      if (existingItem.productId === newItem.productId) {
        if (existingItem.variantId === newItem.variantId) {
          // If both productId and variantId match, add the quantity
          itemHandled = true;
          return {
            ...existingItem,
            quantity: existingItem.quantity + newItem.quantity,
          };
        }
        // If productId matches but variantId is different, replace the item
        itemHandled = true;
        return newItem;
      }
      return existingItem;
    });

    // If no matching productId (or productId and variantId) was found, add new item
    if (!itemHandled) {
      updatedCart.push(newItem);
    }

    // Update the cart cookie with the modified cart data
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
      <button
        className={`bg-primary-color text-lg w-full h-12 text-white rounded-md sm:w-56 lg:w-full xl:w-56 ${
          disabled ? "opacity-50 cursor-not-allowed" : " hover:opacity-80"
        }`}
        onClick={handleBuyNow}
        disabled={disabled}
      >
        Buy Now
      </button>
      <button
        className={`flex justify-center items-center gap-2 bg-secondary-color text-lg w-full h-12 text-white rounded-md sm:w-56 lg:w-full xl:w-56 ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
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
