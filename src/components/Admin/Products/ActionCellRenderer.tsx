import { Product } from "@/types/Product";
import { FaEye, FaTrash } from "react-icons/fa";

interface ActionCellRendererProps {
  onView: (product: Product) => void;
  data: Product;
}

const ActionCellRenderer: React.FC<ActionCellRendererProps> = ({
  data,
  onView,
}) => {
  return (
    <div className="flex space-x-2 justify-center">
      <button
        className="p-2 text-blue-500"
        title="View"
        onClick={() => onView(data)}
      >
        <FaEye />
      </button>
      <button className="p-2 text-red-500" title="Delete">
        <FaTrash />
      </button>
    </div>
  );
};

export default ActionCellRenderer;
