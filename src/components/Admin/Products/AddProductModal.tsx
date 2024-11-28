import { Modal, Button, Textarea, Label } from "flowbite-react";
import Variant from "./Variant"; // Import the Variant component
import CustomInput from "@/shared/CustomInput";
import useProductForm from "./useProductForm";
import ThumbnailUpload from "./ThumbnailUpload";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    errors,
    name,
    description,
    variants,
    mainImage,
    thumbnails,
    resetForm,
    setName,
    setDescription,
    setThumbnails,
    handleColorChange,
    handleSizeChange,
    handlePriceChange,
    handleQuantityChange,
    handleDiscountChange,
    handleMainUpload,
    handleThumbnailUpload,
    handleAddVariant,
    handleSubmit,
  } = useProductForm(onClose);

  const onCloseModal = () => {
    onClose();
    resetForm();
  };

  return (
    <Modal className="z-40" show={isOpen} onClose={onCloseModal} size="5xl">
      <Modal.Header>
        <span className="text-lg font-semibold text-primary-color">
          Add New Product
        </span>
      </Modal.Header>
      <Modal.Body className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-4">
        <ThumbnailUpload
          errors={errors}
          mainImage={mainImage}
          thumbnails={thumbnails}
          setThumbnails={setThumbnails}
          handleMainUpload={handleMainUpload}
          handleThumbnailUpload={handleThumbnailUpload}
        />

        {/* Right Side */}
        <div className="flex flex-col gap-1">
          {/* Product Name */}
          <div>
            <Label
              htmlFor="productName"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Product Name
            </Label>
            <CustomInput
              id="productName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              error={errors.name}
            />
          </div>

          {/* Product Description */}
          <div>
            <Label
              htmlFor="description"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Product Description
            </Label>
            <Textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className={`border p-2.5 text-sm rounded-lg bg-white w-full focus:ring-primary-color focus:border-primary-color ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p
              className={`text-red-500 my-1 text-sm h-5 transition-opacity ${
                errors.description ? "opacity-100" : "opacity-0"
              }`}
            >
              {errors.description}
            </p>
          </div>

          {/* Variants */}
          {variants.map((variant, index) => {
            return (
              <Variant
                key={index}
                variant={variant}
                index={index}
                onColorChange={handleColorChange}
                onSizeChange={handleSizeChange}
                onPriceChange={handlePriceChange}
                onQuantityChange={handleQuantityChange}
                onDiscountChange={handleDiscountChange}
                errors={errors}
              />
            );
          })}

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
          <Button className="w-20" color="dark" onClick={onCloseModal}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
