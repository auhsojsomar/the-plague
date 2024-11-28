import { FaEye, FaTrash } from "react-icons/fa";

interface ActionCellRendererProps<T> {
  onView: (data: T) => void;
  data: T;
}

const ActionCellRenderer = <T,>({
  data,
  onView,
}: ActionCellRendererProps<T>) => {
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
