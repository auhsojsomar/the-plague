"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Link = {
  href: string;
  children?: React.ReactNode;
  exact?: true | null;
  className?: string;
};

const NavbarLink = ({
  href,
  children = null,
  exact = null,
  className = "",
}: Link) => {
  const pathname = usePathname();

  // Add background color on active navbar link and hover
  const classString = () => {
    const isActive =
      exact !== null ? pathname === href : pathname.startsWith(href);

    return `${
      isActive
        ? "bg-primary-color"
        : "hover:bg-gray-900 transition-all duration-300"
    } px-5 h-full flex items-center py-3`;
  };

  return (
    <Link href={href} className={`${classString()} ${className}`}>
      {children}
    </Link>
  );
};

export default NavbarLink;
