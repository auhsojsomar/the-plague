"use client";

import { AgGridReact } from "ag-grid-react";
import { useState, useRef } from "react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const OrderPage = () => {
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  const [colDefs] = useState<ColDef[]>([
    { field: "make", filter: "agTextColumnFilter" },
    { field: "model", filter: "agTextColumnFilter" },
    { field: "price", filter: "agNumberColumnFilter" },
    { field: "electric", filter: "agSetColumnFilter" },
  ]);

  // Reference to the grid API
  const gridRef = useRef(null);

  // Function to handle quick filter
  const onQuickFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    gridRef.current.api.setQuickFilter(event.target.value);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* Data Grid */}
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          ref={gridRef} // Assign ref to grid for quick filtering
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            filter: true, // Enable filtering for each column
            sortable: true, // Enable sorting for each column
          }}
        />
      </div>
    </div>
  );
};

export default OrderPage;
