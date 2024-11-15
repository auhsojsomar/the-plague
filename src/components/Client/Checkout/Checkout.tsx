import CustomImage from "@/shared/CustomImage";
import OrderSummary from "@/shared/OrderSummary";
import CheckoutContactForm from "./CheckoutContactForm";
import { CHECKOUT } from "@/src/constants/checkout";
import CheckoutPaymentDetails from "./CheckoutPaymentDetails";
import CheckoutCart from "@/src/components/Client/Checkout/CheckoutCart";

const Checkout = () => {
  const {
    title,
    subTitle,
    cartTitle,
    titleImageAlt,
    titleImageUrl,
    orderSummary,
    paymentDetails,
    contactDetails,
    submitButtonText,
  } = CHECKOUT;

  return (
    <div className=" min-h-screen bg-gray-100 flex justify-center p-2 sm:p-6">
      <div className="w-full max-w-screen-xl bg-white border border-gray-300 rounded-lg shadow-lg p-2 sm:p-6 lg:p-8 lg:pt-0">
        {/* Title section */}
        <section className="flex items-center gap-2 border-b border-gray-300 py-6">
          <div className="flex-shrink-0 w-[60px] h-[60px] relative">
            <CustomImage
              src={titleImageUrl}
              alt={titleImageAlt}
              className="w-full h-full"
              fill
              useBucket
            />
          </div>
          <div className="flex flex-col items-center sm:flex-row">
            <h2 className="text-lg sm:text-2xl font-bold text-primary-color text-nowrap">
              {title}
            </h2>
            <div className="h-11 w-px bg-primary-color mx-2 hidden sm:block"></div>
            <h2 className="text-md sm:text-xl text-primary-color">
              {subTitle}
            </h2>
          </div>
        </section>

        {/* Main section */}
        <section className="flex flex-col lg:flex-row gap-6 pt-2">
          {/* Cart Items Section */}
          <div className="flex-1 max-h-screen overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-primary-color scrollbar-track-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-secondary-color">
              {cartTitle}
            </h3>
            <div className="space-y-4">
              <CheckoutCart />
            </div>
          </div>

          {/* Order Summary and Payment Section */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-6">
            <OrderSummary details={orderSummary} selectedItems={[]} />
            <CheckoutPaymentDetails details={paymentDetails} />
            <CheckoutContactForm
              buttonText={submitButtonText}
              details={contactDetails}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
