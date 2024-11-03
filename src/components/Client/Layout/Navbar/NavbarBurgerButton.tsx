"use client";

import { useNavbarContext } from "@/src/context/NavbarContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const NavbarBurgerButton = () => {
  const { isOpen, setIsOpen } = useNavbarContext();

  const handleClick = () => {
    setIsOpen((state) => !state);
  };

  return (
    <button className="absolute top-6 right-2 sm:hidden" onClick={handleClick}>
      <span className="sr-only">Open main menu</span>
      <FontAwesomeIcon
        className="text-white h-7 mr-3 hover:text-gray-300"
        icon={isOpen ? faXmark : faBars}
      />
    </button>
  );
};

export default NavbarBurgerButton;
