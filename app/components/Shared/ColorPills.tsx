import { Color } from "@/app/shared/interfaces/Variant";

interface ColorPillsProps {
  colors: Color[];
}

const ColorPills: React.FC<ColorPillsProps> = ({ colors }) => {
  return (
    <>
      {colors?.map(({ id, name, hex }) => (
        <div
          key={id}
          className="flex items-center m-1 px-4 py-2 rounded-full border text-sm font-medium bg-white hover:shadow-md cursor-pointer transition-all"
        >
          <span
            className="w-5 h-5 rounded-full border mr-1"
            style={{ backgroundColor: hex }}
          ></span>
          {name}
        </div>
      ))}
    </>
  );
};

export default ColorPills;
