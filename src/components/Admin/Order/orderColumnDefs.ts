import { formatPrice } from "@/src/utils/priceUtils";
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
    valueGetter: (params: any) => {
      // Aggregating product names from all items in the order
      return params.data.products
        .map((product: any) => product.productName)
        .join(", ");
    },
  },
  {
    field: "variant",
    headerName: "Variant",
    filter: "agTextColumnFilter",
    valueGetter: (params: any) => {
      // Aggregating variants from all items in the order
      return params.data.products
        .map((product: any) => product.variant)
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
    valueGetter: (params: any) => {
      // Aggregating quantity for all products in the order
      return params.data.products.reduce(
        (sum: number, product: any) => sum + product.quantity,
        0
      );
    },
  },
  {
    field: "paymentStatus",
    headerName: "Payment Status",
    filter: "agTextColumnFilter",
    cellRenderer: "statusCellRenderer",
    cellRendererParams: (params: any) => ({
      statusKey: params.data.order.paymentStatus.key, // Corrected the property for payment status
      value: params.data.order.paymentStatus.name, // Corrected the property for payment status
    }),
  },
  {
    field: "orderStatus",
    headerName: "Order Status",
    filter: "agTextColumnFilter",
    cellRenderer: "statusCellRenderer",
    cellRendererParams: (params: any) => ({
      statusKey: params.data.order.orderStatus.key, // Corrected the property for order status
      value: params.data.order.orderStatus.name, // Corrected the property for order status
    }),
  },
];
