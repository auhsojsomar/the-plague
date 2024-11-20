import React from "react";

interface StatusCellRendererProps {
  statusKey: number;
  value: string;
}

const StatusCellRenderer: React.FC<StatusCellRendererProps> = ({
  statusKey,
  value,
}) => {
  let colorClass = "bg-gray-300"; // Default color for unknown status
  switch (statusKey) {
    case 1: // Pending
      colorClass = "bg-yellow-400";
      break;
    case 2: // Processing
      colorClass = "bg-blue-400";
      break;
    case 3: // Shipped
      colorClass = "bg-indigo-400";
      break;
    case 4: // Delivered
      colorClass = "bg-green-400";
      break;
    case 5: // Cancelled
      colorClass = "bg-red-400";
      break;
    default:
      colorClass = "bg-gray-300"; // Default color for unknown status
      break;
  }

  return (
    <span
      className={`px-4 py-1 rounded-full text-sm text-white font-semibold ${colorClass}`}
    >
      {value}
    </span>
  );
};

export default StatusCellRenderer;
