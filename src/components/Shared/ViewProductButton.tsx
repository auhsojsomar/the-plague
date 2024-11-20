import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const ViewProductButton = ({ href }: { href: string }) => {
  return (
    <Link href={href}>
      <button className="h-10 w-10 rounded-full bg-white border border-solid border-gray-300 shadow-sm mx-1 hover:bg-primary-color hover:text-white transition-all duration-400">
        <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
      </button>
    </Link>
  );
};

export default ViewProductButton;
