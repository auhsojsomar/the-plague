"use client";

import LinkGeneric from "./NavbarLink";
import { useNavbarContext } from "@/app/context/NavbarContext";
import AddToCart from "./AddToCart";

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
          <LinkGeneric exact href="/">
            Home
          </LinkGeneric>
          <LinkGeneric href="/about-us">About Us</LinkGeneric>
          <LinkGeneric href="/products">Products</LinkGeneric>
          <LinkGeneric href="/login">Login</LinkGeneric>
        </ul>
      </div>
      <AddToCart />
    </div>
  );
};

export default NavbarContent;
