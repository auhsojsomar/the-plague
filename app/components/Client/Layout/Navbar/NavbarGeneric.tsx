import Image from "next/image";
import NavbarBurgerButton from "./NavbarBurgerButton";
import NavbarContent from "./NavbarContent";
import { NavbarContextProvider } from "@/app/context/NavbarContext";

const NavbarGeneric = () => {
  return (
    <nav className="bg-black/85 backdrop-blur-md px-5 sm:px-0 sm:h-20 p-2 sm:py-0 sticky top-0 w-full z-50 border-b border-neutral-700/80">
      <div className="container flex flex-wrap items-center justify-between h-full">
        <Image
          src="/image/logo.jpg"
          alt="the-plague-icon"
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
