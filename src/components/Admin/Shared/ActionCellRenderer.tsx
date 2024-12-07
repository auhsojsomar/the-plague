import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

interface ActionCellRendererProps<T> {
  data: T;
  onView?: (data: T) => void;
  onEdit?: (data: T) => void;
  onDelete?: (data: T) => void;
}

const ActionCellRenderer = <T,>({
  data,
  onView,
  onEdit,
  onDelete,
}: ActionCellRendererProps<T>) => {
  return (
    <div className="flex space-x-2 justify-center">
      {onView && (
        <button
          className="p-2 text-blue-400"
          title="View"
          onClick={() => onView(data)}
        >
          <FaEye />
        </button>
      )}
      {onEdit && (
        <button
          className="p-2 text-orange-400"
          title="Edit"
          onClick={() => onEdit(data)}
        >
          <FaEdit />
        </button>
      )}
      {onDelete && (
        <button
          className="p-2 text-red-400"
          title="Delete"
          onClick={() => onDelete(data)}
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
};

export default ActionCellRenderer;
