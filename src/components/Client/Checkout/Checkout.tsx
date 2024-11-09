import CustomImage from "@/shared/CustomImage";
import CheckoutCartItem from "./CheckoutCartItem";
import CheckoutOrderSummary from "./CheckoutOrderSummary";
import CheckoutContactForm from "./CheckoutContactForm";
import { allProduct } from "@/src/constants";
import { CHECKOUT } from "@/src/constants/checkout";
import CheckoutPaymentDetails from "./CheckoutPaymentDetails";

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
          <div className="flex-shrink-0 w-[60px] h-[60px]">
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
          <div className="flex-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-primary-color scrollbar-track-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-secondary-color">
              {cartTitle}
            </h3>
            <div className="space-y-4">
              {allProduct.map((product) => (
                <CheckoutCartItem
                  key={product.id}
                  product={product}
                  quantity={1}
                  totalPrice={120}
                />
              ))}
            </div>
          </div>

          {/* Order Summary and Payment Section */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-6">
            <CheckoutOrderSummary
              details={orderSummary}
              subTotal={200}
              shippingFee={75}
              total={275}
            />
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