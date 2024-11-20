const ProductCardSkeleton = () => {
  return (
    <div className="text-center shadow-lg border animate-pulse">
      <div className="w-full h-64 bg-gray-200" />
      <div className="py-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
