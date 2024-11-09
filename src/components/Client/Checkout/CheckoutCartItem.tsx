import { formatPrice } from "@/src/utils/priceUtils";
import CustomImage from "../../Shared/CustomImage";
import { Product } from "@/src/shared/types/Product";
import { toKebabCase } from "@/src/utils/stringUtils";

interface CneckoutCartItemProps {
  product: Product;
  quantity: number;
  totalPrice: number;
}

const CneckoutCartItem = ({
  product,
  quantity,
  totalPrice,
}: CneckoutCartItemProps) => {
  const kebabCaseName = toKebabCase(product.name);

  return (
    <div className="flex justify-between border-b border-gray-200 py-3">
      {/* Left section */}
      <div className="flex gap-x-2">
        {/* Image section */}
        <div className="w-20 h-20">
          <CustomImage
            className="w-full h-full"
            src={product.image.main}
            alt={kebabCaseName}
            fill
          />
        </div>
        {/* Product name and variant section */}
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-gray-500 text-sm">
            <span>{product.variants[0].size.name}</span>
            <span>, </span>
            <span>{product.variants[0].color.name}</span>
          </p>
        </div>
      </div>

      {/* Right section */}
      <div>
        <p className="font-semibold">{formatPrice(totalPrice)}</p>
        <p className="text-sm text-gray-500 text-end">Qty: {quantity}</p>
      </div>
    </div>
  );
};

export default CneckoutCartItem;
