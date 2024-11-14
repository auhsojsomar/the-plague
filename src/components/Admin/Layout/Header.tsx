import React from "react";
import CustomImage from "@/shared/CustomImage";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <section className="flex items-center gap-2 border-b border-gray-300 p-3">
      <div className="flex">
        <div className="flex-shrink-0 w-[60px] h-[60px] relative">
          <CustomImage
            src="image/logo.webp"
            alt="the-plague-logo"
            className="w-full h-full"
            fill
            useBucket
          />
        </div>
        <div className="flex flex-col items-center sm:flex-row">
          <h2 className="text-lg sm:text-2xl font-bold text-primary-color">
            The Plague
          </h2>
          <div className="h-11 w-px bg-primary-color mx-2 hidden sm:block"></div>
          <h2 className="text-md sm:text-xl text-primary-color">{title}</h2>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default Header;
