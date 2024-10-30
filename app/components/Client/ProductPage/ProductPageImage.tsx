"use client";

import { useState } from "react";
import CustomImage from "../../Shared/CustomImage";
import { useProductPageContext } from "@/app/context/ProductPageContext";

const ProductPageImage = () => {
  const {
    product: { image },
  } = useProductPageContext();
  const { main, thumbnails = [] } = image;
  const [selectedImage, setSelectedImage] = useState(main);

  return (
    <div className="flex gap-2 flex-shrink-0">
      {/* Main Image */}
      <CustomImage
        src={selectedImage}
        alt="Product Image"
        width={500}
        height={500}
        className="object-cover rounded-md"
      />

      {/* Thumbnail Images */}
      <div className="flex flex-col pr-2 gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-primary-color scrollbar-track-gray-200 max-h-[500px]">
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
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="object-cover rounded"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductPageImage;
