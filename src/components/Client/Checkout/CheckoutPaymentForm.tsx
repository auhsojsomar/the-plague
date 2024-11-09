import CustomImage from "../../Shared/CustomImage";

const CheckoutPaymentForm = () => {
  return (
    <form className="space-y-4">
      <h3 className="text-lg font-semibold text-secondary-color">
        Payment Details
      </h3>

      {/* Full Name */}
      <input
        type="text"
        placeholder="Full Name"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-color focus:border-transparent"
      />

      {/* Address */}
      <textarea
        placeholder="Address"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-color focus:border-transparent"
        rows={3}
      ></textarea>

      {/* Contact Number Field with Philippine Flag */}
      <div>
        <label
          htmlFor="contactNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Contact Number
        </label>
        <div className="flex items-stretch mt-1">
          <div className="flex items-center bg-gray-200 px-2 rounded-l-md">
            <div className="w-6 h-full mr-2">
              <CustomImage
                src="philipiines-flag.svg"
                alt="Philippine Flag"
                className="w-full h-full"
                useBucket={true}
                fill
              />
            </div>
            <span className="text-gray-600">+63</span>
          </div>
          <input
            type="tel"
            id="contactNumber"
            required
            className="w-full px-4 py-2 border-gray-300 border-l-0 rounded-r-md focus:ring-2 focus:ring-primary-color focus:border-transparent"
            placeholder="9123456789"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary-color text-white font-semibold rounded-lg py-2 hover:bg-opacity-90 transition"
      >
        Place Order
      </button>
    </form>
  );
};

export default CheckoutPaymentForm;
