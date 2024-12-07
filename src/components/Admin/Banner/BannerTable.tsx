"use client";

import { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { BannerDto } from "@/src/shared/interfaces/Banner";
import { ColDef } from "ag-grid-community";
import TableSkeleton from "@/skeleton/TableSkeleton";
import columnDefs from "./columnDefs";

interface BannerTableProps {
  rowData: BannerDto[];
}

const BannerTable: React.FC<BannerTableProps> = ({ rowData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError] = useState<boolean>(false);

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
      <MainTable rowData={rowData} columnDefs={columnDefs} />
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
  />
);

export default BannerTable;
