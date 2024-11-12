import { CartData } from "@/shared/interfaces/CartData";
import { useState } from "react";
import CustomImage from "@/shared/CustomImage";
import { toKebabCase } from "@/src/utils/stringUtils";
import CartQuantity from "./CartQuantity";

interface CartItemProps extends CartData {
  onItemCheck: (item: CartData, checked: boolean) => void;
  onQuantityChange: (item: CartData, quantity: number) => void;
}
const CartItem: React.FC<CartItemProps> = ({
  product,
  variant,
  quantity,
  onItemCheck,
  onQuantityChange,
}) => {
  const [currentQuantity, setQuantity] = useState(quantity);
  const [isChecked, setIsChecked] = useState(false);
  const kebabCaseName = toKebabCase(product.name);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onItemCheck({ product, variant, quantity: currentQuantity }, checked);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    onQuantityChange({ product, variant, quantity: newQuantity }, newQuantity); // Update quantity in parent
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-200 px-2 py-3 gap-2">
      {/* Checkbox */}
      <div className="flex-shrink-0 w-5 h-5">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheck}
          className="w-full h-full appearance-none checked:bg-primary-color focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none"
        />
      </div>

      {/* Image section */}
      <div className="flex-shrink-0 w-20 h-20">
        <CustomImage
          className="w-full h-full"
          src={product.image.main}
          alt={kebabCaseName}
          width={80}
          height={80}
        />
      </div>

      {/* Product Information */}
      <div className="flex-1 flex-col sm:flex-row flex justify-between gap-1">
        {/* Product Name and Variant */}
        <div className="flex flex-col gap-px">
          <p className="text-sm sm:text-base font-medium">{product.name}</p>
          <p className="text-gray-500 text-xs sm:text-sm">
            <span>{variant.color.name}</span>
            <span>, </span>
            <span>{variant.size.name}</span>
          </p>
        </div>

        {/* Price and Quantity */}
        <CartQuantity
          variant={variant}
          quantity={currentQuantity}
          onQuantityChange={handleQuantityChange}
        />
      </div>
    </div>
  );
};

export default CartItem;
