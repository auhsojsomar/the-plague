import Image from "next/image";
import NavbarBurgerButton from "../Home/NavbarBurgerButton";
import NavbarContent from "../Home/NavbarContent";
import { NavbarContextProvider } from "@/app/context/NavbarContext";

const NavbarGeneric = () => {
  return (
    <nav className="bg-black sm:h-20 p-2 sm:py-0 relative opacity-90 z-10">
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
