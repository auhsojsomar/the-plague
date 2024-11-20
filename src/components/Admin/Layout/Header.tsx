import React, { useState } from "react";
import CustomImage from "@/shared/CustomImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import {
  faUserAlt,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("adminId");
  };

  return (
    <section className="flex items-center justify-between gap-2 border-b border-gray-300 p-3 h-24">
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
      <div>
        {/* Profile Dropdown */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="h-9 w-9 bg-gray-100 rounded-full flex items-center justify-center shadow-md border border-gray-300 mr-2">
              <FontAwesomeIcon className="text-gray-700" icon={faUserAlt} />
            </div>
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-300 z-10">
              <div className="py-1">
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                  <FontAwesomeIcon className="mr-2" icon={faUserAlt} />
                  View Profile
                </button>
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                  <FontAwesomeIcon className="mr-2" icon={faCog} />
                  Settings
                </button>
                <button
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon className="mr-2" icon={faSignOutAlt} />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
