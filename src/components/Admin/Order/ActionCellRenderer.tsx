import { Order } from "@/interfaces/Order";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface ActionCellRendererProps {
  onView: (order: Order) => void;
  data: {
    order: Order;
  };
}

const ActionCellRenderer: React.FC<ActionCellRendererProps> = ({
  data: { order },
  onView,
}) => {
  return (
    <div className="flex space-x-2 justify-center">
      <button
        className="p-2 text-blue-500"
        title="View"
        onClick={() => onView(order)}
      >
        <FaEye />
      </button>
      <button className="p-2 text-yellow-500" title="Edit">
        <FaEdit />
      </button>
      <button className="p-2 text-red-500" title="Delete">
        <FaTrash />
      </button>
    </div>
  );
};

export default ActionCellRenderer;
