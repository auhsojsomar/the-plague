"use client";

import { useEffect, useMemo, useState } from "react";
import TableSkeleton from "@/skeleton/TableSkeleton";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { ProductDto } from "@/interfaces/ProductDto";
import { productColumnDefs } from "./productColumnDefs";
import ActionCellRenderer from "@/shared/ActionCellRenderer";
import ShowProductModal from "./ShowProductModal";
import AddOrEditProductModal from "./AddOrEditProductModal";
import { useProductContext } from "@/src/context/ProductContext";

const Table = ({ initialProducts }: { initialProducts: ProductDto[] }) => {
  const { products: productList, setProducts: updateProductList } =
    useProductContext();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductDto | null>(null);
  const [isViewProductModalOpen, setIsViewProductModalOpen] = useState(false);
  const [isAddOrEditProductModalOpen, setIsAddOrEditProductModalOpen] =
    useState(false);

  const rowData = useMemo(() => productList, [productList]);

  useEffect(() => {
    if (initialProducts.length > 0) {
      const areProductsSame =
        JSON.stringify(productList) === JSON.stringify(initialProducts);

      if (!areProductsSame) {
        updateProductList(initialProducts);
      }
      setIsLoading(false);
    } else {
      setHasError(true);
    }
  }, [initialProducts, productList, updateProductList]);

  const closeViewProductModal = () => setIsViewProductModalOpen(false);
  const closeAddOrEditProductModal = () =>
    setIsAddOrEditProductModalOpen(false);

  const openViewProductModal = (product: ProductDto) => {
    setCurrentProduct(product);
    setIsViewProductModalOpen(true);
  };

  const openEditProductModal = (product: ProductDto) => {
    setCurrentProduct(product);
    setIsAddOrEditProductModalOpen(true);
  };

  const deleteProductHandler = () => {
    alert("Delete Product");
  };

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
      flex: 1,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
      }),
    }),
    []
  );

  const colDef = useMemo(
    () => [
      ...productColumnDefs,
      {
        headerName: "Actions",
        cellRenderer: ActionCellRenderer,
        cellRendererParams: {
          onView: openViewProductModal,
          onEdit: openEditProductModal,
          onDelete: deleteProductHandler,
        },
      },
    ],
    [openViewProductModal, openEditProductModal, deleteProductHandler]
  );

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <TableSkeleton />
      ) : hasError ? (
        <div className="text-red-500">Error loading products</div>
      ) : (
        <div className="ag-theme-quartz h-full">
          <AgGridReact
            rowData={rowData}
            columnDefs={colDef}
            defaultColDef={defaultColDef}
            pagination
            paginationPageSize={20}
            domLayout="autoHeight"
            rowHeight={80}
          />
        </div>
      )}

      {currentProduct && (
        <>
          <ShowProductModal
            product={currentProduct}
            isOpen={isViewProductModalOpen}
            onClose={closeViewProductModal}
          />
          <AddOrEditProductModal
            product={currentProduct}
            isOpen={isAddOrEditProductModalOpen}
            onClose={closeAddOrEditProductModal}
          />
        </>
      )}
    </div>
  );
};

export default Table;
