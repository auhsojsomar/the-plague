import React from "react";

const getRandomWidth = (min: number, max: number) =>
  `${Math.floor(Math.random() * (max - min + 1)) + min}%`;

const TableSkeleton = () => {
  return (
    <div className="space-y-4 p-4">
      {/* Header Skeleton */}
      <div className="h-12 bg-gray-200 rounded w-full mb-4"></div>

      {/* Randomized Skeleton Rows */}
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="flex w-full animate-pulse space-x-4">
          <div
            className="h-6 bg-gray-200 rounded mx-2"
            style={{ width: getRandomWidth(15, 20) }}
          ></div>
          <div
            className="h-6 bg-gray-200 rounded mx-2"
            style={{ width: getRandomWidth(15, 25) }}
          ></div>
          <div
            className="h-6 bg-gray-200 rounded mx-2"
            style={{ width: getRandomWidth(10, 20) }}
          ></div>
          <div
            className="h-6 bg-gray-200 rounded mx-2"
            style={{ width: getRandomWidth(8, 12) }}
          ></div>
          <div
            className="h-6 bg-gray-200 rounded mx-2"
            style={{ width: getRandomWidth(8, 12) }}
          ></div>
          <div
            className="h-6 bg-gray-200 rounded mx-2"
            style={{ width: getRandomWidth(15, 20) }}
          ></div>
          <div
            className="h-6 bg-gray-200 rounded mx-2"
            style={{ width: getRandomWidth(15, 25) }}
          ></div>
          <div
            className="h-6 bg-gray-200 rounded mx-2"
            style={{ width: getRandomWidth(5, 10) }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
