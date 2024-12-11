import { ToastContextProvider } from "@/src/context/ToastContext";
import MenuTab from "./MenuTab";
import { BannerProvider } from "@/src/context/BannerContext";

const Banner = () => {
  return (
    <>
      <ToastContextProvider>
        <BannerProvider>
          <MenuTab />
        </BannerProvider>
      </ToastContextProvider>
    </>
  );
};

export default Banner;
