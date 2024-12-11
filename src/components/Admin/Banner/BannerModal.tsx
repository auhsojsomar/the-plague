"use client";

import { Button, Modal, Spinner } from "flowbite-react";
import ImageUpload from "./ImageUpload";
import BannerNameInput from "./BannerNameInput";
import useBanner from "./useBanner";
import { useBannerContext } from "@/src/context/BannerContext";

const BannerModal = () => {
  const { isOpen, setIsOpen } = useBannerContext();
  const {
    modalTitle,
    data,
    hasError,
    isLoading,
    setData,
    setHasError,
    setImageFile,
    handleSubmit,
  } = useBanner();
  return (
    <>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
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
            <Button
              className="w-20"
              color="dark"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BannerModal;
