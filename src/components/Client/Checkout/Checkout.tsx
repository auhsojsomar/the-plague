import CustomImage from "@/shared/CustomImage";
import CheckoutCartItem from "./CheckoutCartItem";
import CheckoutOrderSummary from "./CheckoutOrderSummary";
import CheckoutPaymentForm from "./CheckoutPaymentForm";
import { allProduct } from "@/src/constants";

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-screen-xl bg-white border border-gray-300 rounded-lg shadow-lg p-6 lg:p-8 lg:pt-0">
        {/* Title section */}
        <div className="flex items-center gap-2 border-b border-gray-300 py-6">
          <div className="w-[60px] h-[60px]">
            <CustomImage
              className="w-full h-full"
              src="logo.webp"
              alt="the-plague-logo"
              fill
              useBucket
            />
          </div>
          <h2 className="text-2xl font-bold text-primary-color">The Plague</h2>
          <div className="h-11 w-px bg-primary-color mx-2"></div>
          <h2 className="text-xl text-primary-color">Checkout</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items Section */}
          <div className="flex-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-primary-color scrollbar-track-gray-200">
            <h3 className="text-lg font-semibold text-secondary-color">
              Your Cart
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
            <CheckoutOrderSummary subTotal={200} shippingFee={75} total={275} />
            <CheckoutPaymentForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
