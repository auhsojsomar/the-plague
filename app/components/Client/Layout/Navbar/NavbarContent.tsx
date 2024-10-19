"use client";

import NavbarLink from "./NavbarLink";
import { useNavbarContext } from "@/app/context/NavbarContext";
import AddToCart from "./NavbarAddToCart";
import { ROUTES } from "@/app/constants";

const NavbarContent = () => {
  const { isOpen } = useNavbarContext();

  return (
    <div className="flex h-full w-full sm:w-auto">
      <div
        className={`w-full sm:flex text-white transition-all duration-1000 ${
          !isOpen ? "hidden" : ""
        }`}
      >
        <ul
          className={`flex flex-col sm:flex-row sm:items-center mt-5 sm:mt-0`}
        >
          {Object.entries(ROUTES).map(([key, { label, link }], index) => (
            <NavbarLink key={key} exact={index === 0} href={link}>
              {label}
            </NavbarLink>
          ))}
        </ul>
      </div>
      <AddToCart />
    </div>
  );
};

export default NavbarContent;
