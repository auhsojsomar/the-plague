import { useToast } from "@/src/context/ToastContext";
import { insertBanner, updateBanner } from "@/src/lib/api/adminBannerApi";
import { Banner } from "@/interfaces/Banner";
import { useCallback, useEffect, useState } from "react";
import { ZodError } from "zod";
import { bannerSchema } from "./bannerSchema";
import { useBannerContext } from "@/src/context/BannerContext";

const useBanner = () => {
  const [data, setData] = useState<Banner>({
    name: "",
    image: "",
    bannerType: 1,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<{ [key: string]: string }>({});
  const [modalTitle, setModalTitle] = useState<string>("");

  const { setToast } = useToast();
  const { refetchData, isOpen, setIsOpen, activeTab, selectedBanner } =
    useBannerContext();

  const resetForm = () => {
    setData({ name: "", image: "", bannerType: 1 });
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

  const loadSelectedBanner = useCallback(() => {
    if (selectedBanner) {
      setData({
        name: selectedBanner.name,
        image: selectedBanner.image,
        bannerType: selectedBanner.bannerType,
      });
    } else {
      setData({ name: "", image: "", bannerType: 1 });
    }
  }, [selectedBanner]);

  const handleClose = () => {
    resetForm();
    setIsOpen(false);
  };

  const handleModalTitle = useCallback(() => {
    if (selectedBanner) setModalTitle(`Update ${activeTab}`);
    else setModalTitle(`Add ${activeTab}`);
  }, [selectedBanner, activeTab]);

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
      const updatedData = {
        ...data,
        bannerType: activeTab === "Main Banner" ? 1 : 2,
      };

      bannerSchema.parse(updatedData);

      setIsLoading(true);

      let fileUrl: string | null = updatedData.image;
      if (imageFile) {
        fileUrl = await uploadImage();
        if (!fileUrl) {
          setToast("Failed to upload image", "error");
          return; // Exit if image upload fails
        }
      }

      const bannerData: Banner = {
        ...updatedData,
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

  useEffect(() => {
    if (!isOpen) resetForm();
    handleModalTitle();
    loadSelectedBanner();
  }, [isOpen, handleModalTitle, loadSelectedBanner]);

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
