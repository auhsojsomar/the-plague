"use client";

import dynamic from "next/dynamic";
import { useNavbarContext } from "@/src/context/NavbarContext";
import { useState, useEffect } from "react";
import IconSkeleton from "@/src/components/Skeleton/IconSkeleton";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

// Dynamically import the FontAwesomeIcon component
const FontAwesomeIcon = dynamic(() =>
  import("@fortawesome/react-fontawesome").then((mod) => mod.FontAwesomeIcon)
);

const NavbarBurgerButton = () => {
  const { isOpen, setIsOpen } = useNavbarContext();
  const [iconLoaded, setIconLoaded] = useState(false);

  const handleClick = () => {
    setIsOpen((state) => !state);
  };

  // Set the iconLoaded state to true once the icon component is available
  useEffect(() => {
    if (FontAwesomeIcon) {
      setIconLoaded(true);
    }
  }, [FontAwesomeIcon]);

  return (
    <button
      className="absolute top-6 right-2 sm:hidden flex items-center justify-center w-12"
      onClick={handleClick}
    >
      <span className="sr-only">Open main menu</span>
      {!iconLoaded && (
        <div className="w-6 h-6">
          <IconSkeleton />
        </div>
      )}
      {iconLoaded && (
        <div className="w-6 h-6">
          <FontAwesomeIcon
            className="text-white h-full w-full cursor-pointer hover:text-gray-300"
            icon={isOpen ? faXmark : faBars}
          />
        </div>
      )}
    </button>
  );
};

export default NavbarBurgerButton;
