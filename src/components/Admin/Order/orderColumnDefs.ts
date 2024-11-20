import {
  ColDef,
  ValueGetterParams,
  ICellRendererParams,
} from "ag-grid-community";

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
    valueGetter: (params: ValueGetterParams) => {
      return params.data.products
        .map((product: { productName: string }) => product.productName)
        .join(", ");
    },
  },
  {
    field: "variant",
    headerName: "Variant",
    filter: "agTextColumnFilter",
    valueGetter: (params: ValueGetterParams) => {
      return params.data.products
        .map((product: { variant: string }) => product.variant)
        .join(", ");
    },
  },
  {
    field: "price",
    headerName: "Total Price",
    filter: "agSetColumnFilter",
    cellClass: "flex justify-end",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    filter: "agSetColumnFilter",
    cellClass: "flex justify-end",
    valueGetter: (params: ValueGetterParams) => {
      // Aggregating quantity for all products in the order
      return params.data.products.reduce(
        (sum: number, product: { quantity: number }) => sum + product.quantity,
        0
      );
    },
  },
  {
    field: "paymentStatus",
    headerName: "Payment Status",
    filter: "agTextColumnFilter",
    cellRenderer: "statusCellRenderer",
    cellRendererParams: (params: ICellRendererParams) => ({
      statusKey: params.data.order.paymentStatus.key,
      value: params.data.order.paymentStatus.name,
    }),
  },
  {
    field: "orderStatus",
    headerName: "Order Status",
    filter: "agTextColumnFilter",
    cellRenderer: "statusCellRenderer",
    cellRendererParams: (params: ICellRendererParams) => ({
      statusKey: params.data.order.orderStatus.key,
      value: params.data.order.orderStatus.name,
    }),
  },
];
