import { OrderSummary } from "@/src/types/checkout/checkout";
import { formatPrice } from "@/src/utils/priceUtils";

interface CheckoutOrderSummaryProps {
  details: OrderSummary;
  subTotal: number;
  shippingFee: number;
  total: number;
}

const CheckoutOrderSummary: React.FC<CheckoutOrderSummaryProps> = ({
  details: { title, subTotalLabel, shippingFeeLabel, totalLabel },
  subTotal,
  shippingFee,
  total,
}) => {
  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-secondary-color mb-3">
        {title}
      </h3>
      <div className="flex justify-between">
        <p className="text-sm sm:text-base">{subTotalLabel}</p>
        <p className="text-sm sm:text-base">{formatPrice(subTotal)}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm sm:text-base">{shippingFeeLabel}</p>
        <p className="text-sm sm:text-base">{formatPrice(shippingFee)}</p>
      </div>
      <div className="flex justify-between font-bold text-primary-color mt-2">
        <p className="text-sm sm:text-base">{totalLabel}</p>
        <p className="text-sm sm:text-base">{formatPrice(total)}</p>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
