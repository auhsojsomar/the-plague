import Image from "next/image";
import NavbarBurgerButton from "./NavbarBurgerButton";
import NavbarContent from "./NavbarContent";
import { NavbarContextProvider } from "@/app/context/NavbarContext";

const NavbarGeneric = () => {
  return (
    <nav className="bg-secondary-color px-5 sm:px-0 sm:h-20 p-2 sm:py-0 fixed w-full z-10">
      <div className="container flex flex-wrap items-center justify-between h-full">
        <Image
          src="/favicon.ico"
          alt="Picture of the author"
          width={60}
          height={60}
        />
        <NavbarContextProvider>
          <NavbarBurgerButton />
          <NavbarContent />
        </NavbarContextProvider>
      </div>
    </nav>
  );
};

export default NavbarGeneric;
