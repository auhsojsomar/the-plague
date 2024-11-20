import React from "react";

const CheckoutOrderSummarySkeleton = () => {
  return (
    <div>
      {/* Title Skeleton */}
      <h3 className="w-3/4 h-7 bg-gray-300 animate-pulse rounded mb-3"></h3>

      {/* Subtotal Skeleton */}
      <div className="flex justify-between">
        <div className="w-1/3 h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
        <div className="w-1/4 h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
      </div>

      {/* Shipping Fee Skeleton */}
      <div className="flex justify-between">
        <div className="w-1/3 h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
        <div className="w-1/4 h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
      </div>

      {/* Total Skeleton */}
      <div className="flex justify-between font-bold text-primary-color mt-2">
        <div className="w-1/3 h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
        <div className="w-1/4 h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
      </div>
    </div>
  );
};

export default CheckoutOrderSummarySkeleton;
