import NavbarBurgerButton from "./NavbarBurgerButton";
import NavbarContent from "./NavbarContent";
import { NavbarContextProvider } from "@/src/context/NavbarContext";
import CustomImage from "@/src/components/Shared/CustomImage";

const Navbar = () => {
  return (
    <nav className="bg-black/85 backdrop-blur-md px-5 sm:px-0 sm:h-20 p-2 sm:py-0 sticky top-0 w-full z-50 border-b border-neutral-700/80">
      <div className="container flex flex-wrap items-center justify-between h-full">
        <div className="w-[60px] h-[60px] relative">
          <CustomImage
            className="w-full h-full"
            src="image/logo.webp"
            alt="the-plague-icon"
            fill
            useBucket
            priority
          />
        </div>
        <NavbarContextProvider>
          <NavbarBurgerButton />
          <NavbarContent />
        </NavbarContextProvider>
      </div>
    </nav>
  );
};

export default Navbar;
