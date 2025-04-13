"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getSalesReport } from "@/api/salesReportApi";
import { SalesReport } from "@/interfaces/SalesReport";
import { formatPrice } from "@/src/utils/priceUtils";
import TableSkeleton from "../../Skeleton/TableSkeleton";
import { ColDef, ValueGetterParams } from "ag-grid-community";

interface TableProps {
  dateFrom: Date;
  dateTo: Date;
  setGrandTotal: (total: number) => void;
}

const Table: React.FC<TableProps> = ({ dateFrom, dateTo, setGrandTotal }) => {
  const [rowData, setRowData] = useState<SalesReport[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  const dateFormatter = useCallback((params: { value: string }) => {
    const date = new Date(params.value);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(date);
  }, []);

  const columnDefs: ColDef<SalesReport>[] = useMemo(
    () => [
      {
        headerName: "Date Created",
        field: "dateCreated",
        valueFormatter: dateFormatter,
      },
      { headerName: "Product Name", field: "productName" },
      { headerName: "Variant Name", field: "variantName" },
      {
        headerName: "Quantity Sold",
        field: "quantitySold",
        width: 150,
        type: "numericColumn",
      },
      {
        headerName: "Unit Price",
        field: "unitPrice",
        type: "numericColumn",
        width: 150,
        valueFormatter: ({ value }: { value: number }) =>
          value != null ? formatPrice(value) : "N/A",
      },
      {
        headerName: "Discount",
        field: "discount",
        type: "numericColumn",
        width: 150,
        valueGetter: (params: ValueGetterParams) => {
          const discount = params.data.discount;
          if (!discount || discount.type === "NoDiscount") {
            return "N/A";
          }
          return discount.type === "Percentage"
            ? `${discount.value}%`
            : formatPrice(discount.value);
        },
      },
      {
        headerName: "Total",
        field: "total",
        type: "numericColumn",
        flex: 1,
        valueFormatter: ({ value }: { value: number }) =>
          value != null ? formatPrice(value) : "N/A",
      },
    ],
    [dateFormatter]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getSalesReport({ dateFrom, dateTo });
        setRowData(response.data);
        setGrandTotal(response.grandTotal);
      } catch (error) {
        console.error("Error loading sales report:", error);
      } finally {
        setLoading(false);
      }
    };

    if (dateFrom && dateTo) {
      fetchData();
    }
  }, [dateFrom, dateTo, setGrandTotal]);

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "600px" }}>
      {loading ? (
        <TableSkeleton />
      ) : rowData.length === 0 ? (
        <p className="text-center py-4">
          No data available for the selected dates.
        </p>
      ) : (
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination
          paginationPageSize={20}
          domLayout="autoHeight"
          rowHeight={50}
        />
      )}
    </div>
  );
};

export default Table;
