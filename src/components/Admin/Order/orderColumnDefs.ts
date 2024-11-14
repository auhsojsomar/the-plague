import { ColDef } from "ag-grid-community";

export const orderColumnDefs: ColDef[] = [
  {
    field: "customerName",
    headerName: "Customer Name",
    filter: "agSetColumnFilter",
  },
  {
    field: "productName",
    headerName: "Product Name",
    filter: "agTextColumnFilter",
    cellClass: "font-semibold",
  },
  {
    field: "variant",
    headerName: "Variant",
    filter: "agTextColumnFilter",
  },
  {
    field: "price",
    headerName: "Price",
    filter: "agSetColumnFilter",
    cellClass: "flex justify-end",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    filter: "agSetColumnFilter",
    cellClass: "flex justify-end",
  },
  {
    field: "paymentStatus",
    headerName: "Payment Status",
    filter: "agTextColumnFilter",
    cellRenderer: "statusCellRenderer",
  },
  {
    field: "orderStatus",
    headerName: "Order Status",
    filter: "agTextColumnFilter",
    cellRenderer: "statusCellRenderer",
  },
  {
    field: "action",
    headerName: "Actions",
    cellRenderer: "actionCellRenderer",
  },
];
