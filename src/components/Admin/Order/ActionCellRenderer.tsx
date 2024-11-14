import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface ActionCellRendererProps {
  params: any; // AG Grid params type
}

const ActionCellRenderer: React.FC<ActionCellRendererProps> = ({ params }) => {
  const { order, handleViewOrder } = params.context || {}; // Get context with the function

  // Ensure order and handleViewOrder are defined
  if (!order || !handleViewOrder) {
    return null; // Or render a fallback UI if needed
  }

  return (
    <div className="flex space-x-2 justify-center">
      <button
        className="p-2 text-blue-500"
        title="View"
        onClick={() => handleViewOrder(order)} // Trigger handleViewOrder with order
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
