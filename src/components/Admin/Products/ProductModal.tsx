import { ProductDto } from "@/interfaces/ProductDto";
import { Button, Modal } from "flowbite-react";
import CustomImage from "@/shared/CustomImage";
import { formatPrice } from "@/src/utils/priceUtils";
import { useState } from "react";

interface ProductModalProps {
  product: ProductDto;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [mainImage, setMainImage] = useState<string>(product.image.main);
  const [activeThumbnail, setActiveThumbnail] = useState<number | null>(null); // Track active thumbnail index

  const handleThumbnailClick = (thumbnail: string, index: number) => {
    if (activeThumbnail === index) {
      // If the same thumbnail is clicked again, reset to initial main image
      setActiveThumbnail(null);
      setMainImage(product.image.main);
    } else {
      setActiveThumbnail(index); // Set the new active thumbnail
      setMainImage(thumbnail); // Update the main image
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="4xl">
      <Modal.Header>
        <span className="text-lg font-semibold text-primary-color">
          {product.name}
        </span>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col md:flex-row space-y-6 md:space-x-6">
          <div className="w-full md:w-1/2">
            {/* Main Image */}
            <div className="min-h-40">
              <CustomImage
                className="w-full h-full rounded-lg"
                imageClass="object-cover w-full h-full"
                src={mainImage}
                alt={product.name}
              />
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-2 mt-4 overflow-x-auto">
              {product.image.thumbnails.map((thumb, index) => (
                <div
                  key={index}
                  className={`relative w-20 h-20 cursor-pointer rounded-lg border-2 overflow-hidden ${
                    activeThumbnail === index
                      ? "border-primary-color" // Apply ring here for border
                      : "border-0 hover:opacity-80"
                  }`}
                  onClick={() => handleThumbnailClick(thumb, index)}
                >
                  <CustomImage
                    className="w-full h-full"
                    imageClass="object-cover" // Keep this class clean without border-related styles
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              {product.description}
            </p>

            {/* Variants Section */}
            <h3 className="mt-4 text-lg font-semibold">Available Variants:</h3>
            <div className="space-y-4 mt-2">
              {product.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
                >
                  <p>
                    <strong>Size:</strong> {variant.size.name}
                  </p>
                  <p className="flex items-center gap-1">
                    <strong>Color:</strong> {variant.color.name}
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: variant.color.hexCode }}
                    />
                  </p>
                  <p>
                    <strong>Price:</strong> {formatPrice(variant.price)}
                  </p>
                  {variant.discount && (
                    <p className="text-red-500">
                      <strong>Discount:</strong>{" "}
                      {variant.discount.type === "Percentage"
                        ? `${variant.discount.value}% off`
                        : `${formatPrice(variant.discount.value)} off`}
                    </p>
                  )}
                  <p>
                    <strong>Quantity:</strong> {variant.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="ml-auto w-20" color="dark" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
