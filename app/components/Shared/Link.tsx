"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkType = {
  href: string;
  children?: React.ReactNode;
  exact?: true | null;
};

const LinkGeneric = ({ href, children = null, exact = null }: LinkType) => {
  const pathname = usePathname();

  const classString = () => {
    if (exact !== null) {
      return `${
        pathname === href ? "bg-primary-color" : ""
      } px-5 h-full flex items-center`;
    }

    return `${
      pathname.startsWith(href) ? "bg-primary-color" : ""
    } px-5 h-full flex items-center`;
  };

  return (
    <Link href={href} className={classString()}>
      {children}
    </Link>
  );
};

export default LinkGeneric;
