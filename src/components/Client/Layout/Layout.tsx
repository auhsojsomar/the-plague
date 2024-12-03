import React from "react";
import Navbar from "./Navbar/Navbar";
import BackToTopButton from "../../Shared/BackToTopButton";
import Footer from "./Footer/Footer";
import { CheckoutContextProvider } from "@/src/context/CheckoutContext";
import { CartCountContextProvider } from "@/src/context/CartCountContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CheckoutContextProvider>
      <CartCountContextProvider>
        <Navbar />
        {children}
        <Footer />
        <BackToTopButton />
      </CartCountContextProvider>
    </CheckoutContextProvider>
  );
};

export default Layout;
