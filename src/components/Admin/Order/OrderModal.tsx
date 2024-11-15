import { Modal, Button, TextInput, Label, Select } from "flowbite-react";
import { Order } from "@/shared/interfaces/Order";
import { formatPrice } from "@/src/utils/priceUtils";
import { useState } from "react";

interface OrderModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ order, isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false); // State to track if in edit mode

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

  const handleEdit = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleSave = () => {
    setIsEditing(false); // Disable editing mode
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="5xl">
      <Modal.Header>
        <h3 className="text-lg font-semibold text-primary-color">
          Order Details
        </h3>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {/* Order Information */}
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-md mb-2">Order Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="orderId">Order ID</Label>
                <TextInput id="orderId" value={order.id} disabled />{" "}
                {/* Always disabled */}
              </div>
              <div>
                <Label htmlFor="orderStatus">Order Status</Label>
                <Select
                  className="focus:ring-0 focus:outline-none"
                  id="orderStatus"
                  value={order.orderStatus.name}
                  disabled={!isEditing} // Disabled when not editing
                >
                  {/* Replace this with dynamic options if needed */}
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <Select
                  className="focus:ring-0 focus:outline-none"
                  id="paymentStatus"
                  value={order.paymentStatus.name}
                  disabled={!isEditing} // Disabled when not editing
                >
                  {/* Replace this with dynamic options if needed */}
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Paid</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <TextInput
                  id="paymentMethod"
                  value={order.paymentMethod.name}
                  disabled={!isEditing} // Disabled when not editing
                />
              </div>
              <div>
                <Label htmlFor="shippingFee">Shipping Fee</Label>
                <TextInput
                  id="shippingFee"
                  value={formatPrice(order.shippingFee.cost)}
                  disabled={!isEditing} // Disabled when not editing
                />
              </div>
              <div>
                <Label htmlFor="totalPrice">
                  Total Price <span>(Including Shipping Fee.)</span>
                </Label>
                <TextInput
                  id="totalPrice"
                  value={formatPrice(order.totalPrice)}
                  disabled={!isEditing} // Disabled when not editing
                />
              </div>
              <div>
                <Label htmlFor="dateCreated">Date Ordered</Label>
                <TextInput
                  id="dateCreated"
                  value={formatDate(order.dateCreated)}
                  disabled // Disabled when not editing
                />
              </div>
              <div>
                <Label htmlFor="dateModified">Date Last Update</Label>
                <TextInput
                  id="dateModified"
                  value={formatDate(order.dateModified)}
                  disabled // Disabled when not editing
                />
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-md mb-2">User Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="userId">User ID</Label>
                <TextInput id="userId" value={order.user.id} disabled />
                {/* Always disabled */}
              </div>
              <div>
                <Label htmlFor="userEmail">Email</Label>
                <TextInput
                  id="userEmail"
                  value={order.user.email ?? "N/A"}
                  disabled={!isEditing} // Disabled when not editing
                />
              </div>
              <div>
                <Label htmlFor="userFullName">Full Name</Label>
                <TextInput
                  id="userFullName"
                  value={order.user.fullName ?? "N/A"}
                  disabled={!isEditing} // Disabled when not editing
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
                  value={order.shippingAddress.fullName}
                  disabled={!isEditing} // Disabled when not editing
                />
              </div>
              <div>
                <Label htmlFor="shippingAddress">Address</Label>
                <TextInput
                  id="shippingAddress"
                  value={order.shippingAddress.address}
                  disabled={!isEditing} // Disabled when not editing
                />
              </div>
              <div>
                <Label htmlFor="shippingContact">Contact Number</Label>
                <TextInput
                  id="shippingContact"
                  value={order.shippingAddress.contactNumber}
                  disabled={!isEditing} // Disabled when not editing
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
      </Modal.Body>
      <Modal.Footer>
        <div className="flex gap-2 justify-end w-full">
          {isEditing ? (
            <Button className="w-20" color="warning" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button className="w-20" color="dark" onClick={handleEdit}>
              Edit
            </Button>
          )}
          <Button className="w-20" color="dark" onClick={onClose}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
