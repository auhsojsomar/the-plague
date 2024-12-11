"use client";

import { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { BannerDto } from "@/src/shared/interfaces/Banner";
import { ColDef } from "ag-grid-community";
import TableSkeleton from "@/skeleton/TableSkeleton";
import columnDefs from "./columnDefs";
import { useBannerContext } from "@/src/context/BannerContext";
import { deleteBanner } from "@/api/adminBannerApi";

interface BannerTableProps {
  rowData: BannerDto[];
}

const BannerTable: React.FC<BannerTableProps> = ({ rowData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError] = useState<boolean>(false);

  const { setIsOpen, setSelectedBanner, refetchData } = useBannerContext();

  const handleEdit = (data: BannerDto) => {
    setSelectedBanner(data);
    setIsOpen(true);
  };

  const handleDelete = async (data: BannerDto) => {
    const confirmation = confirm(
      "Are you sure you want to delete this banner?"
    );
    if (!confirmation) return;
    await deleteBanner(data.id);
    await fetch(`/api/s3-bucket?key=${data.image}`, { method: "DELETE" });
    refetchData();
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="ag-theme-quartz">
        <TableSkeleton />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="ag-theme-quartz">
        <ErrorLabel />
      </div>
    );
  }

  return (
    <div className="ag-theme-quartz">
      <MainTable
        rowData={rowData}
        columnDefs={columnDefs({ onEdit: handleEdit, onDelete: handleDelete })}
      />
    </div>
  );
};

const ErrorLabel = () => (
  <div className="text-red-500">Error loading products</div>
);

const MainTable = ({
  rowData,
  columnDefs,
}: {
  rowData: BannerDto[];
  columnDefs: ColDef[];
}) => (
  <AgGridReact
    rowData={rowData}
    columnDefs={columnDefs}
    rowHeight={150}
    defaultColDef={{
      resizable: false,
      sortable: false,
    }}
    domLayout="autoHeight"
    pagination
    paginationPageSize={20}
  />
);

export default BannerTable;
