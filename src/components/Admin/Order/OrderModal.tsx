import { Modal, Button, TextInput, Label } from "flowbite-react";
import { Order } from "@/shared/interfaces/Order";
import { formatPrice } from "@/src/utils/priceUtils";

interface OrderModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ order, isOpen, onClose }) => {
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
                <TextInput id="orderId" value={order.id} readOnly disabled />
              </div>
              <div>
                <Label htmlFor="orderStatus">Order Status</Label>
                <TextInput
                  id="orderStatus"
                  value={order.orderStatus.name}
                  readOnly
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <TextInput
                  id="paymentStatus"
                  value={order.paymentStatus.name}
                  readOnly
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <TextInput
                  id="paymentMethod"
                  value={order.paymentMethod.name}
                  readOnly
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="shippingFee">Shipping Fee</Label>
                <TextInput
                  id="shippingFee"
                  value={formatPrice(order.shippingFee.cost)}
                  readOnly
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="totalPrice">Total Price</Label>
                <TextInput
                  id="totalPrice"
                  value={formatPrice(order.totalPrice)}
                  readOnly
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="dateCreated">Date Ordered</Label>
                <TextInput
                  id="dateCreated"
                  value={formatDate(order.dateCreated)}
                  readOnly
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="dateModified">Date Last Update</Label>
                <TextInput
                  id="dateModified"
                  value={formatDate(order.dateModified)}
                  readOnly
                  disabled
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
                <TextInput
                  id="userId"
                  value={order.user.id}
                  readOnly
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="userEmail">Email</Label>
                <TextInput
                  id="userEmail"
                  value={order.user.email ?? "N/A"}
                  readOnly
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="userFullName">Full Name</Label>
                <TextInput
                  id="userFullName"
                  value={order.user.fullName ?? "N/A"}
                  readOnly
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
                  value={order.shippingAddress.fullName}
                  readOnly
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="shippingAddress">Address</Label>
                <TextInput
                  id="shippingAddress"
                  value={order.shippingAddress.address}
                  readOnly
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="shippingContact">Contact Number</Label>
                <TextInput
                  id="shippingContact"
                  value={order.shippingAddress.contactNumber}
                  readOnly
                  disabled
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
                      readOnly
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor={`quantity${index}`}>Quantity</Label>
                    <TextInput
                      id={`quantity${index}`}
                      value={`${item.quantity}`}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
