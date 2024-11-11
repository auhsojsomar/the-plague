import React from "react";

const PaymentMethodSkeleton = () => {
  return (
    <div className="cursor-pointer">
      <div className="flex justify-between items-center rounded-lg border border-gray-200 bg-white shadow-md p-4 animate-pulse">
        <div className="flex items-center gap-2">
          {/* Placeholder for Image */}
          <div className="w-10 h-10 bg-gray-200 rounded-sm" />

          {/* Placeholder for Name */}
          <div className="w-24 h-4 bg-gray-200 rounded-sm" />
        </div>

        <div className="flex items-center gap-1">
          {/* Placeholder for Label */}
          <div className="w-10 h-4 bg-gray-200 rounded-sm" />

          {/* Placeholder for Radio Button */}
          <div className="w-4 h-4 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSkeleton;
