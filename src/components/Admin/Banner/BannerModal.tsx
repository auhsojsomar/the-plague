"use client";

import { Banner } from "@/src/shared/interfaces/Banner";
import { Button, Modal, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import BannerNameInput from "./BannerNameInput";
import { bannerSchema } from "./bannerSchema";
import { ZodError } from "zod";

interface BannerModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const BannerModal: React.FC<BannerModalProps> = ({
  title,
  isOpen,
  onClose,
}) => {
  const [data, setData] = useState<Banner>({
    name: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<{ [key: string]: string }>({});
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");

  const handleSubmit = () => {
    try {
      bannerSchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        handleError(error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }

    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleModalTitle = () => {
    isEditting
      ? setModalTitle(`Update ${title}`)
      : setModalTitle(`Add ${title}`);
  };

  const handleError = (error: ZodError) => {
    error.errors.map((err) => {
      const key = err.path.join(".");
      setHasError((prev) => ({
        ...prev,
        [key]: err.message,
      }));
    });
  };

  useEffect(() => {
    handleModalTitle();
  }, [isOpen]);

  return (
    <>
      <Modal show={isOpen} onClose={onClose}>
        <Modal.Header>
          <span className="text-lg font-semibold text-primary-color">
            {modalTitle}
          </span>
        </Modal.Header>
        <Modal.Body>
          <BannerNameInput
            name={data.name}
            errors={hasError}
            setName={setData}
            setErrors={setHasError}
          />
          <ImageUpload
            isEditting={isEditting}
            alt={data.name}
            image={data.image}
            errors={hasError}
            setImage={setData}
            setErrors={setHasError}
            setImageFile={setImageFile}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="flex gap-2 justify-end w-full">
            <Button
              className="w-20"
              color="warning"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" color="white" /> : "Save"}
            </Button>
            <Button className="w-20" color="dark" onClick={onClose}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BannerModal;
