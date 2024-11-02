import React from "react";
import Navbar from "./Navbar/Navbar";
import BackToTopButton from "../../Shared/BackToTopButton";
import Footer from "./Footer/Footer";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <BackToTopButton />
    </>
  );
};

export default Layout;
