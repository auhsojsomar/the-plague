"use client";

import { useEffect, useMemo, useState } from "react";
import TableSkeleton from "@/skeleton/TableSkeleton";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { ProductDto } from "@/interfaces/ProductDto";
import { productColumnDefs } from "./productColumnDefs";
import { ColDef } from "ag-grid-community";
import ActionCellRenderer from "@/shared/ActionCellRenderer";
import ProductModal from "./ShowProductModal";
import { useProductContext } from "@/src/context/ProductContext";

const Table = ({ initialProducts }: { initialProducts: ProductDto[] }) => {
  const { products, setProducts } = useProductContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (initialProducts.length > 0) {
      setProducts(initialProducts);
      setLoading(false);
    } else {
      setError(true);
    }
  }, [initialProducts, setProducts]);

  const handleViewProduct = (product: ProductDto) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
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

  const colDef: ColDef[] = [
    ...productColumnDefs,
    {
      headerName: "Actions",
      cellRenderer: ActionCellRenderer,
      cellRendererParams: {
        onView: handleViewProduct,
      },
    },
  ];

  return (
    <div className="w-full h-full">
      {loading ? (
        <TableSkeleton />
      ) : error ? (
        <div className="text-red-500">Error loading products</div>
      ) : (
        <div className="ag-theme-quartz h-full">
          <AgGridReact
            rowData={products}
            columnDefs={colDef}
            defaultColDef={defaultColDef}
            pagination
            paginationPageSize={20}
            domLayout="autoHeight"
            rowHeight={80}
          />
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Table;
