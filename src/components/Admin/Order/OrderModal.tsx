import { Modal, Button } from "flowbite-react";
import { Order } from "@/shared/interfaces/Order";

interface OrderModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ order, isOpen, onClose }) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>
        <h3 className="text-lg font-semibold text-primary-color">
          Order Details
        </h3>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          {/* User Information */}
          <div className="bg-secondary-color p-4 rounded">
            <h4 className="font-semibold text-md">User Information</h4>
            <p>
              <strong>ID:</strong> {order.user.id}
            </p>
            <p>
              <strong>Email:</strong> {order.user.email ?? "N/A"}
            </p>
            <p>
              <strong>Full Name:</strong> {order.user.fullName ?? "N/A"}
            </p>
            {order.user.shippingAddress && (
              <div>
                <h5 className="mt-2 font-semibold">Shipping Addresses</h5>
                {order.user.shippingAddress.map((address, index) => (
                  <div key={index} className="mt-1">
                    <p>
                      <strong>Address:</strong> {address.address}
                    </p>
                    <p>
                      <strong>Contact:</strong> {address.contactNumber}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Information */}
          <div className="bg-secondary-color p-4 rounded">
            <h4 className="font-semibold text-md">Order Information</h4>
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Order Status:</strong> {order.orderStatus.name}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod.name}
            </p>
            <p>
              <strong>Payment Status:</strong> {order.paymentStatus.name}
            </p>
            <p>
              <strong>Shipping Fee:</strong> {order.shippingFee.name}
            </p>
            <p>
              <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {new Date(order.dateCreated).toLocaleDateString()}
            </p>
            <p>
              <strong>Modified:</strong>{" "}
              {new Date(order.dateModified).toLocaleDateString()}
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-secondary-color p-4 rounded">
            <h4 className="font-semibold text-md">Items</h4>
            <ul className="space-y-2">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {item.product} - {item.variant}
                  </span>
                  <span>Quantity: {item.quantity}</span>
                </li>
              ))}
            </ul>
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
