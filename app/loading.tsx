import { Spinner } from "flowbite-react";

const Loading = () => {
  return (
    <div className="absolute inset-0 bg-gray-700 flex justify-center items-center">
      <Spinner className="w-16 h-16" aria-label="Loading..." />
    </div>
  );
};

export default Loading;
