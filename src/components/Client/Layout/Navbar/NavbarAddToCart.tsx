// components/NavbarAddToCart.tsx
import dynamic from "next/dynamic";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import IconSkeleton from "@/src/components/Skeleton/IconSkeleton";
import Link from "next/link";
import { ROUTES } from "@/src/constants";

// Dynamically import the FontAwesomeIcon component
const FontAwesomeIcon = dynamic(() =>
  import("@fortawesome/react-fontawesome").then((mod) => mod.FontAwesomeIcon)
);

const NavbarAddToCart = () => {
  const [iconLoaded, setIconLoaded] = useState(false);

  // Set the iconLoaded state to true once the icon component is available
  useEffect(() => {
    if (FontAwesomeIcon) {
      setIconLoaded(true);
    }
  }, []);

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
          <div className="w-6 h-6">
            <FontAwesomeIcon
              className="text-gray-100 w-full h-full cursor-pointer hover:text-gray-300"
              icon={faCartShopping as IconDefinition} // Cast icon as IconDefinition
            />
          </div>
        )}
      </Link>
    </button>
  );
};

export default NavbarAddToCart;
