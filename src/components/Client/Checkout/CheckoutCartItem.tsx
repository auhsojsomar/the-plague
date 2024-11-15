import { formatPrice } from "@/src/utils/priceUtils";
import CustomImage from "../../Shared/CustomImage";
import { Product } from "@/src/shared/types/Product";
import { toKebabCase } from "@/src/utils/stringUtils";
import { Variant } from "@/src/shared/interfaces/Variant";

interface CneckoutCartItemProps {
  product: Product;
  variant: Variant;
  quantity: number;
}

const CneckoutCartItem = ({
  product,
  variant,
  quantity,
}: CneckoutCartItemProps) => {
  const kebabCaseName = toKebabCase(product.name);

  return (
    <div className="flex gap-2 justify-between border-b border-gray-200 py-3">
      {/* Image section */}
      <div className="flex-shrink-0 w-20 h-20 relative">
        <CustomImage
          className="w-full h-full"
          src={product.image.main}
          alt={kebabCaseName}
          width={80}
          height={80}
        />
      </div>

      <div className="flex-1 flex-col sm:flex-row flex justify-between gap-1">
        {/* Product name and variant section */}
        <div className="flex flex-col gap-px">
          <p className="text-sm sm:text-base font-medium">{product.name}</p>
          <p className="text-gray-500 text-xs sm:text-sm">
            <span>{variant.color.name}</span>
            <span>, </span>
            <span>{variant.size.name}</span>
          </p>
        </div>

        {/* Price and Quantity section */}
        <div className="flex flex-col gap-px">
          <p className="text-sm sm:text-base font-semibold">
            {variant.salePrice
              ? formatPrice(variant.salePrice * quantity)
              : formatPrice(variant.price * quantity)}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 sm:text-end">
            Qty: {quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CneckoutCartItem;
