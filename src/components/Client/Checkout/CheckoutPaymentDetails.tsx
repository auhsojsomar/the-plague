import { PaymentDetails } from "@/src/types/checkout/checkout";
import CustomImage from "../../Shared/CustomImage";
import { FileInput, Label } from "flowbite-react";

interface CheckoutPaymentDetailsProps {
  details: PaymentDetails;
}

const CheckoutPaymentDetails: React.FC<CheckoutPaymentDetailsProps> = ({
  details: {
    title,
    paymentImageUrl,
    paymentImageAlt,
    paymentLabel,
    paymentText,
    inputFileLabel,
  },
}) => {
  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-secondary-color mb-3">
        {title}
      </h3>

      <label htmlFor="payment-gcash" className="cursor-pointer">
        <div className="flex justify-between items-center rounded-lg border border-gray-200 bg-white shadow-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10">
              <CustomImage
                imageClass="rounded-sm"
                className="w-full h-full"
                src={paymentImageUrl}
                alt={paymentImageAlt}
                fill
                useBucket
              />
            </div>
            <p className="text-sm sm:text-base">{paymentLabel}</p>
          </div>

          <div className="flex items-center gap-1">
            <p className="text-sm">{paymentText}</p>
            <input
              className="appearance-none checked:bg-primary-color focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none"
              type="radio"
              name="payment"
              id="payment-gcash"
              defaultChecked
            />
          </div>
        </div>
      </label>

      <div className="flex flex-col gap-2 my-4">
        <FileInput id="small-file-upload" sizing="sm" />
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
