"use client";

import { useState } from "react";
import CustomImage from "../../Shared/CustomImage";
import { useProductPageContext } from "@/src/context/ProductPageContext";

const ProductPageImage = () => {
  const {
    product: { image },
  } = useProductPageContext();
  const { main, thumbnails = [] } = image;
  const [selectedImage, setSelectedImage] = useState(main);

  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0 sm:flex-row sm:items-start">
      {/* Main Image */}
      <CustomImage
        className="object-cover rounded-md"
        src={selectedImage}
        alt="Product Image"
        width={500}
        height={500}
      />

      {/* Thumbnail Images */}
      <div className="flex flex-row flex-wrap justify-center gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-primary-color scrollbar-track-gray-200 max-h-[500px] sm:flex-col sm:pr-2 sm:flex-nowrap sm:justify-start md:grid md:grid-cols-2 lg:flex">
        {[main, ...thumbnails].map((image, index) => (
          <button
            key={index}
            onMouseEnter={() => setSelectedImage(image)}
            className={`border-2 rounded-md ${
              selectedImage === image
                ? "border-primary-color"
                : "border-gray-300"
            }`}
          >
            <CustomImage
              imageClass="object-cover rounded"
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={80}
              height={80}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductPageImage;
