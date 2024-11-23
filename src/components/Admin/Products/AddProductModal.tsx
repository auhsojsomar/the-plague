import { useState, useCallback } from "react";
import { Modal, Button, Textarea, Label } from "flowbite-react";
import CustomImage from "../../Shared/CustomImage";
import { ColorDto, VariantDto } from "@/interfaces/InsertProductDto";
import Variant from "./Variant"; // Import the Variant component
import CustomInput from "../../Shared/CustomInput";
import { Discount } from "@/src/shared/interfaces/Variant";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  const defaultVariant: VariantDto = {
    size: { name: "" },
    color: { name: "", hexCode: "" },
    price: 0,
    quantity: 0,
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [thumbnails, setThumbnails] = useState<string[]>([""]);
  const [variants, setVariants] = useState<VariantDto[]>([defaultVariant]);

  // Handle adding a new variant
  const handleAddVariant = () => {
    setVariants([...variants, { ...defaultVariant }]);
  };

  // Handle color change within a variant
  const handleColorChange = useCallback(
    (index: number, color: ColorDto) => {
      const newVariants = [...variants];
      newVariants[index].color.name = color.name;
      newVariants[index].color.hexCode = color.hexCode;
      setVariants(newVariants);
    },
    [variants]
  );

  // Handle size name change within a variant
  const handleSizeChange = useCallback(
    (index: number, size: string) => {
      const newVariants = [...variants];
      newVariants[index].size.name = size;
      setVariants(newVariants);
    },
    [variants]
  );

  // Handle price change within a variant
  const handlePriceChange = useCallback(
    (index: number, price: number) => {
      const newVariants = [...variants];
      newVariants[index].price = price;
      setVariants(newVariants);
    },
    [variants]
  );

  // Handle quantity change within a variant
  const handleQuantityChange = useCallback(
    (index: number, quantity: number) => {
      const newVariants = [...variants];
      newVariants[index].quantity = quantity;
      setVariants(newVariants);
    },
    [variants]
  );

  // Handle discount change within a variant
  const handleDiscountChange = useCallback(
    (index: number, discount: Discount | undefined) => {
      const newVariants = [...variants];
      newVariants[index].discount = discount;
      setVariants(newVariants);
    },
    [variants]
  );

  // Handle thumbnail image upload
  const handleThumbnailUpload = (index: number, file: File | null) => {
    if (file) {
      const newThumbnails = [...thumbnails];
      newThumbnails[index] = URL.createObjectURL(file);
      setThumbnails(newThumbnails);
    }
  };

  const handleSubmit = () => {
    const productData = {
      name,
      description,
      image: {
        main: mainImage,
        thumbnails: thumbnails.filter((thumb) => thumb),
      },
      variants,
    };
    console.log(productData);
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="5xl">
      <Modal.Header>
        <span className="text-lg font-semibold text-primary-color">
          Add New Product
        </span>
      </Modal.Header>
      <Modal.Body className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-4">
        <div>
          {/* Main Image */}
          <div className="relative flex items-center justify-center bg-gray-50 border-2 border-gray-300 aspect-square rounded-lg overflow-hidden mb-4">
            {mainImage ? (
              <CustomImage
                src={mainImage}
                alt="Main"
                className="w-full h-full"
                imageClass="object-cover"
                useBucket={false}
                fill
              />
            ) : (
              <span className="text-gray-300 text-5xl font-thin">+</span>
            )}
            <input
              className="opacity-0 absolute inset-0 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setMainImage(
                  e.target.files && e.target.files[0]
                    ? URL.createObjectURL(e.target.files[0])
                    : ""
                )
              }
            />
          </div>

          {/* Thumbnails */}
          <div className="flex flex-wrap gap-2">
            {thumbnails.map((thumb, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center bg-gray-50 border-2 border-gray-300 aspect-square w-[94px] rounded-lg overflow-hidden"
              >
                {thumb ? (
                  <CustomImage
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full"
                    imageClass="object-cover"
                    useBucket={false}
                    fill
                  />
                ) : (
                  <span className="text-gray-300 text-2xl font-thin">+</span>
                )}
                <input
                  className="opacity-0 absolute inset-0 cursor-pointer"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleThumbnailUpload(
                      index,
                      e.target.files ? e.target.files[0] : null
                    )
                  }
                />
              </div>
            ))}
            {/* Add more thumbnails */}
            <button
              className="w-[94px] aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400"
              onClick={() => setThumbnails([...thumbnails, ""])}
            >
              +
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4">
          {/* Product Name */}
          <div>
            <Label
              htmlFor={`productName`}
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Product Name
            </Label>
            <CustomInput
              id="productName"
              type="text"
              placeholder="T-Shirt Basic"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Product Description */}
          <div>
            <Label
              htmlFor={`productDescription`}
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Product Description
            </Label>
            <Textarea
              id="productDescription"
              placeholder="A simple and comfortable basic t-shirt for everyday wear."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="focus:ring-primary-color focus:border-primary-color focus:outline-none bg-white"
            />
          </div>

          {/* Variants */}
          {variants.map((variant, index) => (
            <Variant
              key={index}
              variant={variant}
              index={index}
              onColorChange={handleColorChange}
              onSizeChange={handleSizeChange}
              onPriceChange={handlePriceChange}
              onQuantityChange={handleQuantityChange}
              onDiscountChange={handleDiscountChange}
            />
          ))}
          <button
            className="border bg-primary-color p-2.5 text-sm text-white rounded-lg hover:opacity-80"
            onClick={handleAddVariant}
          >
            Add Variant
          </button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex gap-2 justify-end w-full">
          <Button color="warning" onClick={handleSubmit}>
            Add Product
          </Button>
          <Button className="w-20" color="dark" onClick={onClose}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
