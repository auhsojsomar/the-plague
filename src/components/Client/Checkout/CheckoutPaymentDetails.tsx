"use client";

import { useState, useEffect } from "react";
import CustomImage from "../../Shared/CustomImage";
import { FileInput, Label } from "flowbite-react";
import { getPaymentMethod } from "@/src/lib/api/checkoutApi";
import { PaymentOption } from "@/src/shared/interfaces/PaymentMethod";
import PaymentMethodSkeleton from "../../Skeleton/PaymentMethodSkeleton";
import { useCheckoutContext } from "@/src/context/CheckoutContext"; // adjust path as needed
import { PaymentDetails } from "@/shared/types/PaymentDetails";

interface CheckoutPaymentDetailsProps {
  details: PaymentDetails;
}

const CheckoutPaymentDetails: React.FC<CheckoutPaymentDetailsProps> = ({
  details: { title, paymentImageAlt, inputFileLabel },
}) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { setPaymentTransactionImage } = useCheckoutContext();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
    // Fetch payment methods on component mount
    const fetchPaymentMethods = async () => {
      try {
        const data = await getPaymentMethod();
        setPaymentMethods(data);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  if (!isBrowser) {
    return null; // Return null or placeholder if it's server-side rendering
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentTransactionImage(file);
    }
  };

  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-secondary-color mb-3">
        {title}
      </h3>

      {/* Payment Method Options */}
      {!loading ? (
        paymentMethods.map((x) => (
          <label
            key={x.name}
            htmlFor={`payment-${x.name}`}
            className="cursor-pointer"
          >
            <div className="flex justify-between items-center rounded-lg border border-gray-200 bg-white shadow-md p-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 relative">
                  <CustomImage
                    imageClass="rounded-sm"
                    className="w-full h-full"
                    src={x.imageUrl}
                    alt={paymentImageAlt}
                    fill
                    useBucket
                  />
                </div>
                <p className="text-sm sm:text-base">{x.name}</p>
              </div>

              <div className="flex items-center gap-1">
                <p className="text-sm">{x.label}</p>
                <input
                  className="appearance-none checked:bg-primary-color focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none"
                  type="radio"
                  name="payment"
                  id={`payment-${x.name}`}
                  defaultChecked
                />
              </div>
            </div>
          </label>
        ))
      ) : (
        <PaymentMethodSkeleton />
      )}

      {/* File Input */}
      <div className="flex flex-col gap-2 my-4">
        <FileInput
          id="small-file-upload"
          sizing="sm"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Label
          className="text-sm"
          htmlFor="small-file-upload"
          value={inputFileLabel}
        />
      </div>
    </div>
  );
};

export default CheckoutPaymentDetails;
