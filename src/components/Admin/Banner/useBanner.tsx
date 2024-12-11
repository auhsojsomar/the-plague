import { useToast } from "@/src/context/ToastContext";
import { insertBanner, updateBanner } from "@/src/lib/api/adminBannerApi";
import { Banner } from "@/interfaces/Banner";
import { useEffect, useState } from "react";
import { ZodError } from "zod";
import { bannerSchema } from "./bannerSchema";
import { useBannerContext } from "@/src/context/BannerContext";

const useBanner = () => {
  const [data, setData] = useState<Banner>({
    name: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<{ [key: string]: string }>({});
  const [modalTitle, setModalTitle] = useState<string>("");

  const { setToast } = useToast();
  const { refetchData, isOpen, setIsOpen, activeTab, selectedBanner } =
    useBannerContext();

  useEffect(() => {
    if (!isOpen) resetForm();
    handleModalTitle();
    loadSelectedBanner();
  }, [isOpen]);

  const resetForm = () => {
    setData({ name: "", image: "" });
    setImageFile(null);
    setHasError({});
  };

  const uploadImage = async (): Promise<string | null> => {
    try {
      if (!imageFile) {
        setToast("Please upload an image", "error");
        return null;
      }

      const formData = new FormData();
      formData.append("files", imageFile);
      formData.append("fileFolder", "banner");

      const response = await fetch("/api/s3-bucket", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.fileUrl) return data.fileUrl;

      return null;
    } catch (error) {
      if (error instanceof Error) setToast(error.message, "error");
      return null;
    }
  };

  const loadSelectedBanner = () => {
    if (selectedBanner) {
      setData({
        name: selectedBanner.name,
        image: selectedBanner.image,
      });
    } else {
      setData({ name: "", image: "" });
    }
  };

  const handleClose = () => {
    resetForm();
    setIsOpen(false);
  };

  const handleModalTitle = () => {
    selectedBanner
      ? setModalTitle(`Update ${activeTab}`)
      : setModalTitle(`Add ${activeTab}`);
  };

  const handleError = (error: ZodError) => {
    const errorMap: { [key: string]: string } = {};
    error.errors.forEach((err) => {
      const key = err.path.join(".");
      errorMap[key] = err.message;
    });
    setHasError(errorMap);
  };

  const handleSubmit = async () => {
    try {
      bannerSchema.parse(data);

      setIsLoading(true);

      let fileUrl: string | null = data.image;
      if (imageFile) {
        fileUrl = await uploadImage();
        if (!fileUrl) {
          setToast("Failed to upload image", "error");
          return; // Exit if image upload fails
        }
      }

      const bannerData: Banner = {
        ...data,
        image: fileUrl,
      };

      if (selectedBanner) await updateBanner(bannerData, selectedBanner.id);
      else await insertBanner(bannerData);

      setToast("Banner saved successfully", "success");
      refetchData();
      handleClose();
    } catch (error) {
      if (error instanceof ZodError) {
        handleError(error);
      } else {
        console.error("An unexpected error occurred:", error);
        setToast("An unexpected error occurred. Please try again.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    modalTitle,
    data,
    hasError,
    isLoading,
    setData,
    setHasError,
    setImageFile,
    handleSubmit,
  };
};

export default useBanner;
