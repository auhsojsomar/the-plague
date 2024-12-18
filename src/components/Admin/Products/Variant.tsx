import { ColorDto, VariantDto } from "@/interfaces/InsertProductDto";
import CustomInput from "@/shared/CustomInput";
import { Label } from "flowbite-react";
import { Discount } from "@/interfaces/Variant";
import { formatPrice } from "@/src/utils/priceUtils";

type VariantErrorPath =
  | `variants[${number}].color.name`
  | `variants[${number}].color.hexCode`
  | `variants[${number}].size.name`
  | `variants[${number}].price`
  | `variants[${number}].quantity`
  | `variants[${number}].discount`;

// Or, for stricter typing:
type ErrorsTypeStrict = Record<VariantErrorPath | string, string | undefined>;

// Update the VariantProps interface
interface VariantProps {
  variant: VariantDto;
  index: number;
  onColorChange: (index: number, color: ColorDto) => void;
  onSizeChange: (index: number, size: string) => void;
  onPriceChange: (index: number, price: number) => void;
  onQuantityChange: (index: number, quantity: number) => void;
  onDiscountChange: (index: number, discount: Discount | undefined) => void;
  errors: ErrorsTypeStrict; // Use the refined type here
}

const Variant: React.FC<VariantProps> = ({
  variant,
  index,
  onColorChange,
  onSizeChange,
  onPriceChange,
  onQuantityChange,
  onDiscountChange,
  errors,
}) => {
  const getError = (field: string) => {
    return errors[`variants[${index}].${field}` as VariantErrorPath];
  };

  const handleDiscountValueChange = (value: number) => {
    if (variant.discount && variant.discount.type !== "NoDiscount") {
      // Ensure that the type is always present before updating the discount value
      onDiscountChange(index, { ...variant.discount, value });
    } else {
      // If there's no discount, create a default discount object with a valid type (e.g., "No Discount")
      onDiscountChange(index, { type: "NoDiscount", value: 0 });
    }
  };

  const calculateDiscountedPrice = () => {
    const { price, discount } = variant;
    if (!discount || discount.value <= 0) return price;

    if (discount.type === "Percentage") {
      return price * (1 - discount.value / 100);
    } else if (discount.type === "FixedAmount") {
      return Math.max(0, price - discount.value);
    }
    return price;
  };

  const isDiscountDisabled = () => {
    return (
      variant.discount?.type === "NoDiscount" || variant.discount === undefined
    ); // Only disable if discount type is "NoDiscount"
  };

  return (
    <div className="flex flex-col gap-4 border-b py-4">
      {/* First Row (3 columns: Color, Size, Color Picker) */}
      <div className="grid grid-cols-[1fr_1fr_70px] md:grid-cols-[1fr_70px] lg:grid-cols-[1fr_1fr_70px] gap-1">
        {/* Color Name */}
        <div className="w-full md:order-1">
          <Label
            htmlFor={`colorName-${index}`}
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Color Name
          </Label>
          <CustomInput
            id={`colorName-${index}`}
            type="text"
            value={variant.color.name}
            placeholder="Red"
            onChange={(e) =>
              onColorChange(index, {
                ...variant.color,
                name: e.target.value,
              })
            }
            error={getError("color.name")}
          />
        </div>

        {/* Size Name */}
        <div className="w-full md:col-span-2 lg:col-span-1 md:order-3 lg:order-2">
          <Label
            htmlFor={`size-${index}`}
            className="block mb-1 text-sm font-medium text-gray-700 break-words"
          >
            Size Name
          </Label>
          <CustomInput
            id={`size-${index}`}
            type="text"
            value={variant.size.name}
            onChange={(e) => onSizeChange(index, e.target.value)}
            placeholder="Large"
            error={getError("size.name")}
          />
        </div>

        {/* Color Picker */}
        <div className="flex flex-col items-center md:order-2">
          <Label
            htmlFor={`colorName-${index}`}
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Hex Code
          </Label>
          <div
            className={`relative flex justify-center items-center h-10 w-10 border rounded-full overflow-hidden ${
              getError("color.hexCode") ? "border-red-500" : "border-gray-300"
            }`}
          >
            {/* Display selected color */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: variant.color.hexCode }}
            ></div>
            {/* Hidden but interactive color picker */}
            <input
              type="color"
              value={variant.color.hexCode}
              onChange={(e) =>
                onColorChange(index, {
                  ...variant.color,
                  hexCode: e.target.value,
                })
              }
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <p
            className={`text-red-500 my-1 text-sm h-5 transition-opacity ${
              getError("color.hexCode") ? "opacity-100" : "opacity-0"
            }`}
          >
            {getError("color.hexCode")}
          </p>
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
            type="text"
            value={variant.price}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (/^\d*\.?\d*$/.test(value) || value === "") {
                onPriceChange(index, value === "" ? 0 : parseFloat(value));
              }
            }}
            placeholder="Price"
            error={getError("price")}
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
            type="text"
            value={variant.quantity}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (/^\d*$/.test(value) || value === "") {
                onQuantityChange(index, value === "" ? 0 : parseInt(value));
              }
            }}
            placeholder="Quantity"
            error={getError("quantity")}
          />
        </div>
      </div>

      {/* Third Row (Discount) */}
      <div className="grid grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Discount Type Dropdown */}
        <div>
          <Label
            htmlFor={`discountType-${index}`}
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Discount Type
          </Label>
          <select
            id={`discountType-${index}`}
            value={variant.discount ? variant.discount.type : "NoDiscount"} // Default to "No Discount"
            onChange={(e) => {
              const selectedType = e.target.value;
              if (selectedType === "NoDiscount") {
                onDiscountChange(index, undefined); // Clear the discount
              } else {
                onDiscountChange(index, {
                  type: selectedType as "Percentage" | "FixedAmount", // Type assertion for valid types
                  value: variant.discount?.value || 0, // Initialize value if not set
                });
              }
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-color focus:ring-primary-color"
          >
            <option value="NoDiscount">No Discount</option>
            <option value="Percentage">Percentage</option>
            <option value="FixedAmount">Fixed Amount</option>
          </select>
        </div>

        {/* Discount Value Input */}
        <div>
          <Label
            htmlFor={`discountValue-${index}`}
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Discount Value
          </Label>
          <CustomInput
            id={`discountValue-${index}`}
            type="text"
            value={variant.discount?.value || ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value.trim()) || 0;
              handleDiscountValueChange(value);
            }}
            placeholder="Value"
            disabled={isDiscountDisabled()}
            error={getError("discount.value")}
          />
        </div>

        {/* Final Price (After Discount) */}
        <div>
          <Label
            htmlFor={`finalPrice-${index}`}
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Final Price (&#8369;)
          </Label>
          <CustomInput
            value={formatPrice(calculateDiscountedPrice())}
            id={`finalPrice-${index}`}
            placeholder=""
            onChange={() => {}}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Variant;
