import { useState, useCallback } from "react";
import { Modal, Button, Textarea, Label } from "flowbite-react";
import CustomImage from "../../Shared/CustomImage";
import {
  ColorDto,
  InsertProductDto,
  VariantDto,
} from "@/interfaces/InsertProductDto";
import Variant from "./Variant"; // Import the Variant component
import CustomInput from "../../Shared/CustomInput";
import { Discount } from "@/src/shared/interfaces/Variant";
import { z, ZodError } from "zod";
import { insertProduct } from "@/src/lib/api/adminProduct";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  const variantSchema = z.object({
    size: z.object({ name: z.string().min(1, "Size name is required") }),
    color: z.object({
      name: z.string().min(1, "Color name is required"),
      hexCode: z.string().min(4, "Hex code is invalid"),
    }),
    price: z.number().positive("Price must be atleast 1"),
    quantity: z.number().nonnegative("Quantity cannot be negative"),
    discount: z
      .object({
        type: z.enum(["Percentage", "FixedAmount"]),
        value: z.number().positive("Discount value must be positive"),
      })
      .optional(),
  });

  const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    image: z.object({
      main: z.string().min(1, "Main image is required"),
      thumbnails: z
        .array(z.string().url("Invalid thumbnail URL"))
        .min(1, "Please upload at least 1 thumbnail image"),
    }),
    variants: z.array(variantSchema).min(1, "At least one variant is required"),
  });

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const handleSubmit = async () => {
    const productData: InsertProductDto = {
      name,
      description,
      image: {
        main: mainImage,
        thumbnails: thumbnails.filter((thumb) => thumb),
      },
      variants,
    };

    try {
      console.log("Raw data: ", productData);

      // Perform validation
      productSchema.parse(productData);
      // productSchema.parse(negativeData);
      console.log("Product data is valid: ", productData);
      try {
        const result = await insertProduct(productData);
        console.log("Product inserted successfully:", result);
      } catch (error) {
        // Handle the error here
        if (error instanceof Error) {
          console.error("Error inserting product:", error.message);
          if (error.message.includes("Conflict")) {
            alert(error.message);
          }
          // Optionally, you can display the error message to the user using SweetAlert or any other method
        } else {
          console.error("Unexpected error:", error);
        }
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages: { [key: string]: string } = {};

        console.log("error:", error.errors);

        // Collect error messages for product-level fields
        error.errors.forEach((err) => {
          console.log("Error path: ", err.path);
          if (err.path.length === 1) {
            // Collect product-level error messages
            errorMessages[err.path[0]] = err.message;
          } else if (err.path[0] === "image") {
            // Collect image-related error messages
            errorMessages[err.path.join(".")] = err.message;
          } else if (err.path[0] === "variants") {
            if (err.path.length === 4) {
              const index = err.path[1];
              const field = err.path[2];
              const subField = err.path[3];
              // Collect variant-specific error messages
              errorMessages[`variants[${index}].${field}.${subField}`] =
                err.message;
            } else {
              const index = err.path[1];
              const field = err.path[2];
              // Collect variant-specific error messages
              errorMessages[`variants[${index}].${field}`] = err.message;
            }
          }
        });

        console.log("Formatted Error:", errorMessages);
        setErrors(errorMessages);
      }
    }
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
          <div
            className={`relative flex items-center justify-center bg-gray-50 border-2 aspect-square rounded-lg overflow-hidden mb-4 ${
              errors["image.main"] ? "border-red-500" : "border-gray-300"
            }`}
          >
            {mainImage ? (
              <CustomImage
                src={mainImage}
                alt="Main"
                className="w-full h-full"
                imageClass="object-cover"
                useBucket={false}
                fill
              />
            ) : errors["image.main"] ? (
              <p className="text-red-500 my-1 text-sm h-5 transition-opacity opacity-100">
                {errors["image.main"]}
              </p>
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
                className={`relative flex items-center justify-center bg-gray-50 border-2 aspect-square w-[94px] rounded-lg overflow-hidden ${
                  errors["image.thumbnails"]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
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
                ) : errors["image.thumbnails"] ? (
                  <p className="text-red-500 my-1 text-xs">
                    {errors["image.thumbnails"]}
                  </p>
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
          <Button className="w-20" color="dark" onClick={onClose}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
