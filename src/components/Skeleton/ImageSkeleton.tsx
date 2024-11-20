import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ImageSkeleton = () => {
  return (
    <>
      <div
        role="status"
        className="flex items-center justify-center w-full h-full bg-gray-300 rounded-md animate-pulse dark:bg-gray-700"
      >
        <FontAwesomeIcon className="w-6 h-6" icon={faImage} />
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default ImageSkeleton;
