"use client";

import { useState } from "react";
import CustomImage from "../../Shared/CustomImage";
import { toKebabCase } from "@/src/utils/stringUtils";
import { useProductCartContext } from "@/src/context/ProductCartContext";

const ProductPageImage = () => {
  const { product } = useProductCartContext();
  const { main, thumbnails = [] } = product.image;
  const [selectedImage, setSelectedImage] = useState(main);

  const productName = toKebabCase(product.name);

  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0 sm:flex-row sm:items-start">
      {/* Main Image */}
      <div className="sm:w-[500px] aspect-square relative">
        <CustomImage
          className="w-full h-full"
          src={selectedImage}
          alt={`${productName}-main`}
          fill
          imageClass="object-cover rounded-md"
        />
      </div>

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
            <div className="w-20 h-20 relative">
              <CustomImage
                className="w-full h-full"
                imageClass="object-cover rounded"
                src={image}
                alt={`${productName}-${index + 1}`}
                loading="lazy"
                fill
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductPageImage;
