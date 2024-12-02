"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
import { deleteProduct, getProducts } from "@/src/lib/api/adminProduct";
import { useToast } from "@/src/context/ToastContext";

const Table = () => {
  const { products: productList, setProducts: updateProductList } =
    useProductContext();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductDto | null>(null);
  const [isViewProductModalOpen, setIsViewProductModalOpen] = useState(false);
  const [isAddOrEditProductModalOpen, setIsAddOrEditProductModalOpen] =
    useState(false);

  const rowData = useMemo(() => productList, [productList]);
  const { setToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestProducts = await getProducts();
        updateProductList(latestProducts);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [updateProductList]);

  const closeViewProductModal = () => setIsViewProductModalOpen(false);
  const closeAddOrEditProductModal = () =>
    setIsAddOrEditProductModalOpen(false);

  const openViewProductModal = useCallback((product: ProductDto) => {
    setCurrentProduct(product);
    setIsViewProductModalOpen(true);
  }, []);

  const openEditProductModal = useCallback((product: ProductDto) => {
    setCurrentProduct(product);
    setIsAddOrEditProductModalOpen(true);
  }, []);

  const refreshProducts = useCallback(async () => {
    const latestProducts = await getProducts();
    updateProductList(latestProducts);
  }, [updateProductList]);

  const deleteProductHandler = useCallback(
    async (product: ProductDto) => {
      const confirmation = confirm("Are you sure you want to delete?");
      if (!confirmation) return;

      const result = await deleteProduct(product.id);
      if (result) {
        await refreshProducts();
        setToast(result, "success");
      }
    },
    [refreshProducts, setToast]
  );

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
