import { Modal, Button, TextInput, Label, Select } from "flowbite-react";
import { Order } from "@/shared/interfaces/Order";
import { formatPrice } from "@/src/utils/priceUtils";
import { useState, useRef, useEffect } from "react";
import {
  getOrderStatus,
  getPaymentMethod,
  getPaymentStatus,
  StatusProps,
} from "@/api/getStatusApi";

import { updateOrder } from "@/api/orderApi";
import CustomImage from "@/shared/CustomImage";

interface OrderModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  order: initialOrder,
  isOpen,
  onClose,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [order, setOrder] = useState<Order>(initialOrder);
  const [orderStatusOptions, setOrderStatusOptions] = useState<StatusProps[]>(
    []
  );
  const [paymentStatusOptions, setPaymentStatusOptions] = useState<
    StatusProps[]
  >([]);
  const [paymentMethodOptions, setPaymentMethodOptions] = useState<
    StatusProps[]
  >([]);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(
    order.orderStatus.name
  );
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(
    order.paymentStatus.name
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    order.paymentMethod.name
  );

  const formRef = useRef<HTMLFormElement | null>(null);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d
      .toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(", ", " ")
      .replace(", ", " ");
  };

  const fetchOrderStatusOptions = async () => {
    try {
      const data = await getOrderStatus();
      setOrderStatusOptions(data);
    } catch (error) {
      console.error("Error fetching order status options:", error);
    }
  };

  const fetchPaymentStatusOptions = async () => {
    try {
      const data = await getPaymentStatus();
      setPaymentStatusOptions(data);
    } catch (error) {
      console.error("Error fetching payment status options:", error);
    }
  };

  const fetchPaymentMethodOptions = async () => {
    try {
      const data = await getPaymentMethod();
      setPaymentMethodOptions(data);
    } catch (error) {
      console.error("Error fetching payment method options:", error);
    }
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(event.target.value.replace(/[^0-9.-]+/g, "")); // Remove non-numeric characters
    if (!isNaN(newPrice)) {
      setOrder((prevState) => ({
        ...prevState,
        totalPrice: newPrice,
      }));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    fetchOrderStatusOptions();
    fetchPaymentStatusOptions();
    fetchPaymentMethodOptions();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      // Parsing the price from the formatted value to ensure it's in number format
      const totalPrice = parseFloat(formData.get("totalPrice") as string); // Convert to float

      // Collecting form data and transforming it into the structure you provided
      const updatedOrder = {
        orderStatusKey: formData.get("orderStatusKey"),
        paymentMethodKey: formData.get("paymentMethodKey"),
        paymentStatusKey: formData.get("paymentStatusKey"),
        totalPrice, // Convert to float
        shippingAddress: {
          address: formData.get("shippingAddress"),
          contactNumber: formData.get("shippingContact"),
          fullName: formData.get("shippingFullName"),
        },
      };

      await updateOrder(order.id, updatedOrder);
      onClose();
      setIsEditing(false); // Switch off editing mode
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="5xl">
      <Modal.Header>
        <span className="text-lg font-semibold text-primary-color">
          Order Details
        </span>
      </Modal.Header>
      <Modal.Body>
        <form ref={formRef} onSubmit={handleSave}>
          <div className="space-y-6">
            {/* Order Information */}
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold text-md mb-2">Order Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="orderId">Order ID</Label>
                  <TextInput
                    id="orderId"
                    name="orderId"
                    value={order.id}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="paymentStatus">Payment Status</Label>
                  <Select
                    id="paymentStatus"
                    name="paymentStatusKey"
                    value={selectedPaymentStatus}
                    disabled={!isEditing}
                    onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                  >
                    {isEditing ? (
                      paymentStatusOptions.map(({ key, name }) => (
                        <option key={key} value={key}>
                          {name}
                        </option>
                      ))
                    ) : (
                      <option value={order.paymentStatus.name}>
                        {order.paymentStatus.name}
                      </option>
                    )}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="orderStatus">Order Status</Label>
                  <Select
                    id="orderStatus"
                    name="orderStatusKey"
                    value={selectedOrderStatus}
                    disabled={!isEditing}
                    onChange={(e) => setSelectedOrderStatus(e.target.value)}
                  >
                    {isEditing ? (
                      orderStatusOptions.map(({ key, name }) => (
                        <option key={key} value={key}>
                          {name}
                        </option>
                      ))
                    ) : (
                      <option value={order.orderStatus.name}>
                        {order.orderStatus.name}
                      </option>
                    )}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select
                    id="paymentMethod"
                    name="paymentMethodKey"
                    value={selectedPaymentMethod}
                    disabled={!isEditing}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  >
                    {isEditing ? (
                      paymentMethodOptions.map(({ key, name }) => (
                        <option key={key} value={key}>
                          {name}
                        </option>
                      ))
                    ) : (
                      <option value={order.paymentStatus.name}>
                        {order.paymentStatus.name}
                      </option>
                    )}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="shippingFee">Shipping Fee</Label>
                  <TextInput
                    id="shippingFee"
                    name="shippingFee"
                    value={formatPrice(order.shippingFee.cost)}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="totalPrice">
                    Total Price (Including Shipping Fee.)
                  </Label>
                  <TextInput
                    id="totalPrice"
                    name="totalPrice"
                    value={
                      isEditing
                        ? order.totalPrice
                        : formatPrice(order.totalPrice)
                    }
                    disabled={!isEditing}
                    onChange={handlePriceChange}
                  />
                </div>
                <div>
                  <Label htmlFor="dateCreated">Date Ordered</Label>
                  <TextInput
                    id="dateCreated"
                    name="dateCreated"
                    value={formatDate(order.dateCreated)}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="dateModified">Date Last Update</Label>
                  <TextInput
                    id="dateModified"
                    name="dateModified"
                    value={formatDate(order.dateModified)}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Payment Transaction File */}
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold text-md mb-2">
                Payment Transaction
              </h4>
              {order.paymentTransactionFile ? (
                <div className="flex flex-col items-center">
                  <div className="min-h-40">
                    <CustomImage
                      src={order.paymentTransactionFile}
                      alt="Payment Transaction"
                      className="rounded-lg border w-full h-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 italic">
                  No payment transaction file available.
                </div>
              )}
            </div>

            {/* User Information */}
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold text-md mb-2">User Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="userId">User ID</Label>
                  <TextInput
                    id="userId"
                    name="userId"
                    value={order.user.id}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="userEmail">Email</Label>
                  <TextInput
                    id="userEmail"
                    name="userEmail"
                    value={order.user.email ?? "N/A"}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="userFullName">Full Name</Label>
                  <TextInput
                    id="userFullName"
                    name="userFullName"
                    value={order.user.fullName ?? "N/A"}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold text-md mb-2">Shipping Address</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="shippingFullName">Full Name</Label>
                  <TextInput
                    id="shippingFullName"
                    name="shippingFullName"
                    value={order.shippingAddress.fullName}
                    disabled={!isEditing}
                    onChange={(e) => {
                      if (isEditing) {
                        setOrder((prevOrder) => ({
                          ...prevOrder,
                          shippingAddress: {
                            ...prevOrder.shippingAddress,
                            fullName: e.target.value, // Update the address in the state
                          },
                        }));
                      }
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="shippingAddress">Address</Label>
                  <TextInput
                    id="shippingAddress"
                    name="shippingAddress"
                    value={order.shippingAddress.address}
                    disabled={!isEditing}
                    onChange={(e) => {
                      if (isEditing) {
                        setOrder((prevOrder) => ({
                          ...prevOrder,
                          shippingAddress: {
                            ...prevOrder.shippingAddress,
                            address: e.target.value, // Update the address in the state
                          },
                        }));
                      }
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="shippingContact">Contact Number</Label>
                  <TextInput
                    id="shippingContact"
                    name="shippingContact"
                    value={order.shippingAddress.contactNumber}
                    disabled={!isEditing}
                    onChange={(e) => {
                      if (isEditing) {
                        setOrder((prevOrder) => ({
                          ...prevOrder,
                          shippingAddress: {
                            ...prevOrder.shippingAddress,
                            contactNumber: e.target.value, // Update the address in the state
                          },
                        }));
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold text-md mb-2">Items</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <div>
                      <Label htmlFor={`product${index}`}>Product</Label>
                      <TextInput
                        id={`product${index}`}
                        value={`${item.product} - ${item.variant}`}
                        disabled // Disabled when not editing
                      />
                    </div>
                    <div>
                      <Label htmlFor={`quantity${index}`}>Quantity</Label>
                      <TextInput
                        id={`quantity${index}`}
                        value={`${item.quantity}`}
                        disabled // Disabled when not editing
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex gap-2 justify-end w-full">
          {isEditing ? (
            <>
              <Button className="w-20" color="warning" onClick={handleSave}>
                Save
              </Button>
              <Button className="w-20" color="dark" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button className="w-20" color="dark" onClick={handleEdit}>
                Edit
              </Button>
              <Button className="w-20" color="dark" onClick={onClose}>
                Close
              </Button>
            </>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
