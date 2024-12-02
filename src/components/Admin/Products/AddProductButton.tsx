"use client";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddProductModal from "./AddOrEditProductModal";
import { useState } from "react";

const AddProductButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 flex justify-end">
      <button
        className="flex items-center gap-1 bg-primary-color px-5 py-3 rounded-lg text-white"
        onClick={handleAddProduct}
      >
        <FontAwesomeIcon icon={faPlusCircle} />
        <span>Add Product</span>
      </button>

      <AddProductModal isOpen={isModalOpen} onClose={onClose} />
    </div>
  );
};

export default AddProductButton;
