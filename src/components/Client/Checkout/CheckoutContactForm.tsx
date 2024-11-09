import { ContactDetails } from "@/src/types/checkout/checkout";
import CustomImage from "../../Shared/CustomImage";

interface CheckoutContactFormProps {
  details: ContactDetails;
  buttonText: string;
}

const CheckoutContactForm: React.FC<CheckoutContactFormProps> = ({
  details: {
    title,
    fullNamePlaceholder,
    addressPlaceholder,
    phoneLabel,
    phoneImageUrl,
    phoneImageAlt,
    phoneCountryCode,
    phonePlaceholder,
  },
  buttonText,
}) => {
  return (
    <form className="space-y-4">
      <h3 className="text-base sm:text-lg font-semibold text-secondary-color">
        {title}
      </h3>

      {/* Full Name */}
      <input
        type="text"
        placeholder={fullNamePlaceholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-primary-color focus:border-transparent"
      />

      {/* Address */}
      <textarea
        placeholder={addressPlaceholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-primary-color focus:border-transparent"
        rows={3}
      />

      {/* Contact Number Field with Philippine Flag */}
      <div>
        <label
          htmlFor="contactNumber"
          className="block text-sm font-medium text-gray-700"
        >
          {phoneLabel}
        </label>
        <div className="flex items-stretch mt-1">
          <div className="flex items-center bg-gray-200 px-2 rounded-l-md">
            <div className="w-6 h-full mr-2">
              <CustomImage
                src={phoneImageUrl}
                alt={phoneImageAlt}
                className="w-full h-full"
                useBucket={true}
                fill
              />
            </div>
            <span className="text-gray-600 text-sm sm:text-base">
              {phoneCountryCode}
            </span>
          </div>
          <input
            type="tel"
            id="contactNumber"
            required
            className="w-full px-4 py-2 border-gray-300 border-l-0 rounded-r-md text-sm sm:text-base focus:ring-2 focus:ring-primary-color focus:border-transparent"
            placeholder={phonePlaceholder}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary-color text-white font-semibold rounded-lg py-2 hover:bg-opacity-90 transition"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default CheckoutContactForm;
