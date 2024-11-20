"use client";

import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { formatPrice } from "@/src/utils/priceUtils";
import { Order } from "@/shared/interfaces/Order";
import { getOrders } from "@/api/orderApi";
import TableSkeleton from "@/skeleton/TableSkeleton";
import OrderModal from "./OrderModal";
import ActionCellRenderer from "./ActionCellRenderer";
import { orderColumnDefs } from "./orderColumnDefs";
import StatusCellRenderer from "./StatusCellRenderer";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface Product {
  productName: string;
  variant: string;
  quantity: number;
}

interface RowData {
  orderId: string;
  customerName: string;
  paymentStatus: string;
  orderStatus: string;
  products: Product[];
  order: Order; // The full order object for modal
  price: string;
}

const OrderPage = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      const orders: Order[] = await getOrders();
      // Group products by orderId
      const groupedData = orders.map((order) => {
        const products = order.items.map((item) => ({
          productName: item.product,
          variant: item.variant,
          quantity: item.quantity,
        }));

        return {
          orderId: order.id, // Unique identifier for the order
          customerName: order.user.fullName ?? order.user.id,
          paymentStatus: order.paymentStatus.name,
          paymentTransactionFile: order.paymentTransactionFile,
          orderStatus: order.orderStatus.name,
          products, // Array of products for this order
          order, // The whole order object if needed for modal display
          price: formatPrice(order.totalPrice),
        };
      });
      setRowData(groupedData);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchOrders();
  }, []);

  // Refresh data when modal is closed (selectedOrder is null)
  useEffect(() => {
    if (!selectedOrder) {
      fetchOrders();
    }
  }, [selectedOrder]);

  const columnDefs = [
    ...orderColumnDefs,
    {
      field: "action",
      headerName: "Actions",
      cellRenderer: "actionCellRenderer", // Specify the custom cell renderer
      cellRendererParams: {
        onView: handleViewOrder, // Pass the function here
      },
    },
  ];

  return (
    <div className="w-full h-full">
      {loading ? (
        <TableSkeleton />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="ag-theme-quartz h-full">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{
              flex: 1,
              minWidth: 100,
              resizable: true,
              sortable: true,
              filter: true,
              cellStyle: () => ({
                display: "flex",
                alignItems: "center",
              }),
            }}
            components={{
              actionCellRenderer: ActionCellRenderer,
              statusCellRenderer: StatusCellRenderer,
            }}
            rowHeight={60}
            pagination
            paginationPageSize={20}
            domLayout="autoHeight"
          />
        </div>
      )}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default OrderPage;
