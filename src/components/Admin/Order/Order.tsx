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

const OrderPage = () => {
  const [rowData, setRowData] = useState<any[]>([]);
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders: Order[] = await getOrders();
        const mappedData = orders.flatMap((order) =>
          order.items.map((item) => ({
            customerName: order.user.fullName ?? order.user.id,
            productName: item.product,
            variant: item.variant,
            price: formatPrice(order.totalPrice),
            quantity: item.quantity,
            paymentStatus: order.paymentStatus.name,
            orderStatus: order.orderStatus.name,
            order,
          }))
        );
        setRowData(mappedData);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
