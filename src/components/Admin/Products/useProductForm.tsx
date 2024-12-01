import { useToast } from "@/src/context/ToastContext";
import { insertProduct, updateProduct } from "@/src/lib/api/adminProduct";
import { Discount } from "@/src/shared/interfaces/Variant";
import { useCallback, useEffect, useState } from "react";
import { ZodError } from "zod";
import { productSchema } from "./productSchema";
import {
  ColorDto,
  InsertProductDto,
  SizeDto,
  VariantDto,
} from "@/src/shared/interfaces/InsertProductDto";

type VariantField = keyof VariantDto | `${keyof VariantDto}.${string}`;
type VariantValue = string | number | SizeDto | ColorDto | Discount | undefined;

const useProductForm = (
  onClose: () => void,
  isOpen: boolean,
  product: InsertProductDto | undefined
) => {
  const defaultVariant: VariantDto = {
    size: { name: "" },
    color: { name: "", hexCode: "" },
    price: 0,
    quantity: 0,
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState<VariantDto[]>([defaultVariant]);
  const [imageUpload, setImageUpload] = useState<Array<File> | []>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([""]);
  const [mainImage, setMainImage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const { setToast } = useToast();

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setVariants(product.variants || []);
      setMainImage(product.image?.main || "");
      setThumbnails(product.image?.thumbnails || []);
      setIsEditting(true);
    }
  }, [isOpen]);

  const isObject = (val: unknown): val is Record<string, unknown> =>
    typeof val === "object" && val !== null;

  const isSizeDto = (val: unknown): val is SizeDto =>
    isObject(val) && "name" in val;

  const isColorDto = (val: unknown): val is ColorDto =>
    isObject(val) && "name" in val && "hexCode" in val;

  const isDiscount = (val: unknown): val is Discount =>
    isObject(val) && "value" in val;

  const resetForm = () => {
    setName("");
    setDescription("");
    setMainImage("");
    setThumbnails([""]);
    setVariants([defaultVariant]);
    setImageUpload([]);
    setErrors({});
  };

  const validateError = (error: ZodError) => {
    const errorMessages: { [key: string]: string } = {};

    error.errors.forEach((err) => {
      if (err.path.length === 1) {
        errorMessages[err.path[0]] = err.message;
      } else if (err.path[0] === "image") {
        errorMessages[err.path.join(".")] = err.message;
      } else if (err.path[0] === "variants") {
        if (err.path.length === 4) {
          const index = err.path[1];
          const field = err.path[2];
          const subField = err.path[3];
          errorMessages[`variants[${index}].${field}.${subField}`] =
            err.message;
        } else {
          const index = err.path[1];
          const field = err.path[2];
          errorMessages[`variants[${index}].${field}`] = err.message;
        }
      }
    });

    setErrors(errorMessages);
  };

  const uploadImage = async (files: File[]): Promise<string[] | null> => {
    try {
      const formData = new FormData();
      formData.append("fileFolder", "products");

      for (const file of files) {
        formData.append("files", file);
      }

      const response = await fetch("/api/s3-bucket", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.fileUrls.length) return data.fileUrls;

      return null;
    } catch (error) {
      if (error instanceof Error) setToast(error.message, "error");
      return null;
    }
  };

  const updateTopLevelField = useCallback(
    (variant: VariantDto, field: keyof VariantDto, value: VariantValue) => {
      switch (field) {
        case "price":
        case "quantity":
          if (typeof value === "number") variant[field] = value;
          break;
        case "size":
          if (isSizeDto(value)) variant[field] = value;
          break;
        case "color":
          if (isColorDto(value)) variant[field] = value;
          break;
        case "discount":
          if (isDiscount(value) || value === undefined) variant[field] = value;
          break;
      }
    },
    [isSizeDto, isColorDto, isDiscount]
  );

  const updateNestedField = useCallback(
    (variant: VariantDto, field: string, value: VariantValue) => {
      const [parentField, subField] = field.split(".") as [
        keyof VariantDto,
        string
      ];
      const parent = variant[parentField];

      if (isObject(parent) && subField in parent && value !== undefined) {
        (parent as Record<string, unknown>)[subField] = value;
      }
    },
    []
  );

  const updateVariantField = useCallback(
    (index: number, field: VariantField, value: VariantValue) => {
      setVariants((prevVariants) => {
        const newVariants = [...prevVariants];
        const variant = newVariants[index];

        if (field.includes(".")) updateNestedField(variant, field, value);
        else updateTopLevelField(variant, field as keyof VariantDto, value);

        return newVariants;
      });
    },
    [updateNestedField, updateTopLevelField]
  );

  const haveImagesChanged = (
    mainImage: string,
    thumbnails: string[],
    originalProduct: InsertProductDto | undefined
  ): boolean => {
    if (!originalProduct) return true; // If no product, assume images have changed

    // Check if main image has changed
    const mainImageChanged = mainImage !== originalProduct.image.main;

    // Check if thumbnails have changed
    const thumbnailsChanged =
      thumbnails.filter((thumb) => thumb !== "").length !==
        originalProduct.image.thumbnails.length ||
      thumbnails.some(
        (thumb, idx) => thumb !== originalProduct.image.thumbnails[idx]
      );

    return mainImageChanged || thumbnailsChanged;
  };

  const submitProductData = async (productData: InsertProductDto) => {
    try {
      const result = isEditting
        ? await updateProduct(productData, product?.id)
        : await insertProduct(productData);
      if (!result) {
        throw new Error("Failed to insert product data");
      }

      const imagesChanged = haveImagesChanged(mainImage, thumbnails, product);

      if (imagesChanged) {
        const files = await uploadImage(imageUpload);
        if (files && files.length) {
          productData.image.main = files[0];
          productData.image.thumbnails = files.slice(1);

          const updateResult = await updateProduct(productData, result.id);
          if (!updateResult) {
            throw new Error("Failed to update product with image URLs");
          }
        }
      }

      setToast("Product inserted successfully!", "success");
      resetForm();
      onClose();
    } catch (error) {
      handleSubmissionError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddVariant = () => {
    setVariants([...variants, { ...defaultVariant }]);
  };

  const handleValidationOrSubmissionError = (error: unknown) => {
    if (error instanceof ZodError) {
      validateError(error);
    } else if (error instanceof Error) {
      setToast(error.message, "error");
    }
  };

  const handleSubmissionError = (error: unknown) => {
    if (error instanceof Error) {
      setErrors({ name: error.message });
      setToast(error.message, "error");
    }
  };

  const handleColorChange = (index: number, color: ColorDto) => {
    updateVariantField(index, "color.name", color.name);
    updateVariantField(index, "color.hexCode", color.hexCode);
  };

  const handleSizeChange = (index: number, size: string) => {
    updateVariantField(index, "size.name", size);
  };

  const handlePriceChange = (index: number, price: number) => {
    updateVariantField(index, "price", price);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    updateVariantField(index, "quantity", quantity);
  };

  const handleDiscountChange = (
    index: number,
    discount: Discount | undefined
  ) => {
    updateVariantField(index, "discount", discount);
  };

  const handleMainUpload = (file: File | null) => {
    if (file) {
      setMainImage(URL.createObjectURL(file));

      setImageUpload((prevImages) => {
        const newImages = [...prevImages];
        newImages[0] = file;
        return newImages;
      });
    }
  };

  const handleThumbnailUpload = (index: number, file: File | null) => {
    if (file) {
      setThumbnails((prevThumbnails) => {
        const newThumbnails = [...prevThumbnails];
        newThumbnails[index] = URL.createObjectURL(file);
        return newThumbnails;
      });

      setImageUpload((prevImages) => {
        const newImages = [...prevImages];
        newImages[index + 1] = file;
        return newImages;
      });
    }
  };

  const handleProductSubmission = async (productData: InsertProductDto) => {
    try {
      productSchema.parse(productData);
      setErrors({});
      setIsLoading(true);

      await submitProductData(productData);
    } catch (error) {
      handleValidationOrSubmissionError(error);
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

    await handleProductSubmission(productData);
  };

  return {
    errors,
    name,
    description,
    variants,
    mainImage,
    thumbnails,
    isLoading,
    isEditting,
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
  };
};

export default useProductForm;
