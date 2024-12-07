"use client";

import { BannerDto } from "@/src/shared/interfaces/Banner";
import { Button, Modal, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

interface BannerModalProps {
  data?: BannerDto;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const BannerModal: React.FC<BannerModalProps> = ({
  data,
  title,
  isOpen,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<{ [key: string]: boolean }>({});
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");

  const handleSubmit = () => {
    if (!data) {
      setHasError((prev) => ({ ...prev, "image.main": true }));
      return;
    }

    setIsLoading(true);
    console.log("handleSubmit", data);
    setTimeout(() => setIsLoading(false), 1000);
  };

  useEffect(() => {
    setIsEditting(!!data);
    isEditting
      ? setModalTitle(`Update ${title}`)
      : setModalTitle(`Add ${title}`);
  }, [data, isOpen]);

  return (
    <>
      <Modal show={isOpen} onClose={onClose}>
        <Modal.Header>
          <span className="text-lg font-semibold text-primary-color">
            {modalTitle}
          </span>
        </Modal.Header>
        <Modal.Body></Modal.Body>
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
