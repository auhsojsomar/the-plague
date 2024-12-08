"use client";

import CustomImage from "@/shared/CustomImage";
import { Banner } from "@/src/shared/interfaces/Banner";
import { toKebabCase } from "@/src/utils/stringUtils";
import { Dispatch, SetStateAction } from "react";

interface ImageUploadProps {
  isEditting: boolean;
  errors: { [key: string]: string };
  image: string;
  alt: string;
  setErrors: Dispatch<SetStateAction<{ [key: string]: string }>>;
  setImage: Dispatch<SetStateAction<Banner>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  isEditting,
  errors,
  image,
  alt,
  setErrors,
  setImage,
  setImageFile,
}) => {
  const handleMainUpload = (file: File | null) => {
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage((prev) => ({
        ...prev,
        image: imageURL,
      }));
      setErrors((prev) => {
        const { image, ...rest } = prev;
        return rest;
      });
    }
    setImageFile(file);
  };

  return (
    <ImageWrapper errors={errors}>
      <ImageInput
        image={image}
        alt={alt}
        isEditting={isEditting}
        handleMainUpload={handleMainUpload}
      />
      {!image && <ImageLabel errors={errors} />}
    </ImageWrapper>
  );
};

const ImageWrapper = ({
  errors,
  children,
}: {
  errors: { [key: string]: string };
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`relative flex items-center justify-center bg-gray-50 border-2 aspect-video rounded-lg overflow-hidden mt-3 ${
        errors.image ? "border-red-500" : "border-gray-300"
      }`}
    >
      {children}
    </div>
  );
};

const ImageInput = ({
  image,
  alt,
  isEditting,
  handleMainUpload,
}: {
  image: string;
  alt: string;
  isEditting: boolean;
  handleMainUpload: (file: File | null) => void;
}) => {
  return (
    <>
      {image && (
        <CustomImage
          src={image}
          alt={toKebabCase(alt)}
          className="w-full h-full"
          imageClass="object-cover"
          useBucket={isEditting}
          fill
        />
      )}
      <input
        className="opacity-0 absolute inset-0 cursor-pointer"
        type="file"
        accept="image/*"
        onChange={(e) =>
          handleMainUpload(e.target.files ? e.target.files[0] : null)
        }
      />
    </>
  );
};

const ImageLabel = ({ errors }: { errors: { [key: string]: string } }) => {
  if (errors.image) {
    return (
      <p className="text-red-500 my-1 text-sm h-5 transition-opacity opacity-100">
        Main image is required.
      </p>
    );
  } else {
    return <span className="text-gray-300 text-5xl font-thin">+</span>;
  }
};

export default ImageUpload;
