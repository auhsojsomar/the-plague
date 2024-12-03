const PillsSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="w-16 h-8 bg-gray-300 animate-pulse rounded-full"
            ></div>
          ))}
      </div>
    </div>
  );
};

export default PillsSkeleton;
