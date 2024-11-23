import { VariantDto } from "@/interfaces/InsertProductDto";
import CustomInput from "@/shared/CustomInput";
import { Label } from "flowbite-react";

interface VariantProps {
  variant: VariantDto;
  index: number;
  onColorChange: (index: number, color: string) => void;
  onSizeChange: (index: number, size: string) => void;
  onPriceChange: (index: number, price: number) => void;
  onQuantityChange: (index: number, quantity: number) => void;
}

const Variant: React.FC<VariantProps> = ({
  variant,
  index,
  onColorChange,
  onSizeChange,
  onPriceChange,
  onQuantityChange,
}) => {
  return (
    <div className="flex flex-col gap-4 border-b py-4">
      {/* First Row (3 columns: Color, Size, Color Picker) */}
      <div className="grid grid-cols-[1fr_1fr_40px] gap-4">
        {/* Color Name */}
        <CustomInput
          type="text"
          value={variant.color.name}
          onChange={(e) => onColorChange(index, e.target.value)}
          placeholder="Color Name"
        />

        {/* Size Name */}
        <CustomInput
          type="text"
          value={variant.size.name}
          onChange={(e) => onSizeChange(index, e.target.value)}
          placeholder="Size Name"
        />

        {/* Color Picker */}
        <div className="relative flex justify-center items-center h-10 w-10 border border-gray-300 rounded-full overflow-hidden">
          {/* Display selected color */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: variant.color.hexCode }}
          ></div>
          {/* Hidden but interactive color picker */}
          <input
            type="color"
            value={variant.color.hexCode}
            onChange={(e) => onColorChange(index, e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Second Row (Price and Quantity) */}
      <div className="grid grid-cols-2 gap-4">
        {/* Price */}
        <div>
          <Label
            htmlFor={`price-${index}`}
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Price (&#8369;) {/* Peso sign */}
          </Label>
          <CustomInput
            id={`price-${index}`}
            type="number"
            value={variant.price}
            onChange={(e) => onPriceChange(index, parseFloat(e.target.value))}
            placeholder="Price"
          />
        </div>

        {/* Quantity */}
        <div>
          <Label
            htmlFor={`quantity-${index}`}
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Quantity
          </Label>
          <CustomInput
            id={`quantity-${index}`}
            type="number"
            value={variant.quantity}
            onChange={(e) => onQuantityChange(index, parseInt(e.target.value))}
            placeholder="Quantity"
          />
        </div>
      </div>
    </div>
  );
};

export default Variant;
