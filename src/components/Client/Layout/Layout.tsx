import React from "react";
import Navbar from "./Navbar/Navbar";
import BackToTopButton from "../../Shared/BackToTopButton";
import Footer from "./Footer/Footer";
import { CheckoutContextProvider } from "@/src/context/CheckoutContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CheckoutContextProvider>
      <Navbar />
      {children}
      <Footer />
      <BackToTopButton />
    </CheckoutContextProvider>
  );
};

export default Layout;
