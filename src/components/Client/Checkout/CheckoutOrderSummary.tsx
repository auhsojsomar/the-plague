"use client";

import { useState, useEffect } from "react";
import { OrderSummary } from "@/src/types/checkout/checkout";
import { formatPrice } from "@/src/utils/priceUtils";
import { getShippingFee } from "@/lib/api/checkoutApi";
import { useCheckoutContext } from "@/src/context/CheckoutContext";
import OrderSummarySkeleton from "@/skeleton/OrderSummarySkeleton";

interface CheckoutOrderSummaryProps {
  details: OrderSummary;
}

interface ShippingFeeData {
  cost: number;
}

const CheckoutOrderSummary = ({
  details: { title, subTotalLabel, shippingFeeLabel, totalLabel },
}: CheckoutOrderSummaryProps) => {
  const { checkout } = useCheckoutContext();
  const [shippingFee, setShippingFee] = useState<ShippingFeeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the shipping fee on component mount
    const fetchShippingFee = async () => {
      try {
        const fee = await getShippingFee();
        setShippingFee(fee);
      } catch (error) {
        console.error("Error fetching shipping fee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShippingFee();
  }, []); // Run once on component mount

  const subTotal = () => {
    if (!checkout || checkout.length === 0) return 0; // Return 0 if checkout is empty or null

    return checkout.reduce((total, item) => {
      const price = item.variant.salePrice || item.variant.price; // Fallback to price if salePrice is undefined
      if (price && item.quantity > 0) {
        return total + price * item.quantity; // Add to total if price and quantity are valid
      }
      return total; // If not valid, don't add anything
    }, 0);
  };

  const total = () => {
    const calculatedSubTotal = subTotal();
    const calculatedShippingFee = shippingFee?.cost || 0;
    return calculatedSubTotal + calculatedShippingFee; // Calculate total
  };

  if (loading) return <OrderSummarySkeleton />;

  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-secondary-color mb-3">
        {title}
      </h3>
      <div className="flex justify-between">
        <p className="text-sm sm:text-base">{subTotalLabel}</p>
        <p className="text-sm sm:text-base">{formatPrice(subTotal())}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm sm:text-base">{shippingFeeLabel}</p>
        <p className="text-sm sm:text-base">
          {formatPrice(shippingFee?.cost || 0)}
        </p>
      </div>
      <div className="flex justify-between font-bold text-primary-color mt-2">
        <p className="text-sm sm:text-base">{totalLabel}</p>
        <p className="text-sm sm:text-base">{formatPrice(total())}</p>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
