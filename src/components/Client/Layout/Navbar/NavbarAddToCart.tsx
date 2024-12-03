// components/NavbarAddToCart.tsx
import dynamic from "next/dynamic";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useMemo } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import IconSkeleton from "@/src/components/Skeleton/IconSkeleton";
import Link from "next/link";
import { ROUTES } from "@/src/constants";
import { useCartCountContext } from "@/src/context/CartCountContext";
import { CartData } from "@/src/shared/interfaces/CartData";

// Dynamically import the FontAwesomeIcon component
const FontAwesomeIcon = dynamic(() =>
  import("@fortawesome/react-fontawesome").then((mod) => mod.FontAwesomeIcon)
);

const NavbarAddToCart = () => {
  const { cartCount, setCartCount } = useCartCountContext();
  const [iconLoaded, setIconLoaded] = useState(false);

  // Set the iconLoaded state to true once the icon component is available
  useEffect(() => {
    if (FontAwesomeIcon) {
      setIconLoaded(true);
    }
  }, []);

  useEffect(() => {
    const cartStorage = localStorage.getItem("cart");
    if (cartStorage) {
      const parsedCart = JSON.parse(cartStorage);
      updateCartCount(parsedCart);
    }
  }, [cartCount]);

  const updateCartCount = (updatedCart: CartData[]) => {
    const totalQuantity = updatedCart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(totalQuantity); // Set total quantity as cart count
  };

  return (
    <button className="absolute top-[25px] right-12 flex items-center justify-center w-12 sm:relative sm:top-0 sm:right-0">
      <Link href={ROUTES.CART.link}>
        <span className="sr-only">{ROUTES.CART.link}</span>
        {!iconLoaded && (
          <div className="w-6 h-6">
            <IconSkeleton />
          </div>
        )}
        {iconLoaded && (
          <div className="relative">
            {cartCount > 0 && (
              <span className="text-white text-sm absolute -top-3 bg-primary-color px-2 rounded-xl">
                {cartCount}
              </span>
            )}
            <div className="w-6 h-6">
              <FontAwesomeIcon
                className="text-gray-100 w-full h-full cursor-pointer hover:text-gray-300"
                icon={faCartShopping as IconDefinition} // Cast icon as IconDefinition
              />
            </div>
          </div>
        )}
      </Link>
    </button>
  );
};

export default NavbarAddToCart;
