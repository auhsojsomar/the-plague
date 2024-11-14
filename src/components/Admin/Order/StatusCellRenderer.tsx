import React from "react";

interface StatusCellRendererProps {
  value: string;
}

const StatusCellRenderer: React.FC<StatusCellRendererProps> = ({ value }) => {
  let colorClass = "bg-gray-300"; // Default color for unknown status

  switch (value) {
    case "Pending":
      colorClass = "bg-yellow-400";
      break;
    case "Completed":
      colorClass = "bg-green-400";
      break;
    case "Cancelled":
      colorClass = "bg-red-400";
      break;
    default:
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
