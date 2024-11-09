import { formatPrice } from "@/src/utils/priceUtils";

interface CheckoutOrderSummaryProps {
  subTotal: number;
  shippingFee: number;
  total: number;
}

const CheckoutOrderSummary: React.FC<CheckoutOrderSummaryProps> = ({
  subTotal,
  shippingFee,
  total,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-secondary-color mb-3">
        Order Summary
      </h3>
      <div className="flex justify-between">
        <p>Subtotal</p>
        <p>{formatPrice(subTotal)}</p>
      </div>
      <div className="flex justify-between">
        <p>Shipping fee</p>
        <p>{formatPrice(shippingFee)}</p>
      </div>
      <div className="flex justify-between font-bold text-primary-color mt-2">
        <p>Total</p>
        <p>{formatPrice(total)}</p>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
