import { Size } from "@/app/shared/interfaces/Variant";

interface SizeProps {
  size: Size[];
}

const SizePills: React.FC<SizeProps> = ({ size }) => {
  return (
    <>
      {size?.map(({ id, name }) => (
        <div
          key={id}
          className="px-4 py-2 rounded-full font-medium border shadow-sm border-gray-300 text-xs text-secondary-color hover:shadow-md hover:bg-gray-100 cursor-pointer transition-all"
        >
          {name}
        </div>
      ))}
    </>
  );
};

export default SizePills;
