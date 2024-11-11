"use client";

import { useRouter } from "next/navigation"; // Import useRouter from next/router
import { ContactDetails } from "@/src/types/checkout/checkout";
import CustomImage from "../../Shared/CustomImage";
import { useCheckoutContext } from "@/src/context/CheckoutContext";
import { useEffect, useState } from "react";
import { Items, OrderData, ShippingAddress } from "@/interfaces/OderData";
import { submitOrder } from "@/src/lib/api/checkoutApi";
import { z } from "zod";
import { Spinner, Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";

interface CheckoutContactFormProps {
  details: ContactDetails;
  buttonText: string;
}

// Define a Zod schema for form validation
const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  contactNumber: z.string().regex(/^9\d{9}$/, {
    message: "Contact number must start with '9' and be 10 digits long",
  }),
  paymentTransactionFile: z
    .string()
    .min(1, { message: "Payment transaction file is required" }),
});

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
  const { checkout, paymentTransactionImage } = useCheckoutContext();
  const [items, setItems] = useState<Items[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission status
  const router = useRouter();

  // Map checkout items to the required structure
  useEffect(() => {
    if (checkout) {
      const mappedItems = checkout.map(({ product, variant, quantity }) => ({
        productId: product.id,
        variantId: variant.id,
        quantity,
      }));
      setItems(mappedItems);
    }
  }, [checkout]);

  // Validate form data
  const validateForm = (formValues: Record<string, string>) => {
    const validation = formSchema.safeParse(formValues);
    if (!validation.success) {
      setErrors(validation.error.errors.map((error) => error.message));
      return false;
    }
    setErrors([]);
    return true;
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (items.length === 0) {
      setErrors(["Your cart is empty. Please add items before proceeding."]);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const formValues = {
      fullName: formData.get("fullName") as string,
      address: formData.get("address") as string,
      contactNumber: formData.get("contactNumber") as string,
      paymentTransactionFile: paymentTransactionImage,
    };

    if (!validateForm(formValues)) return; // Validate form before proceeding

    setIsSubmitting(true); // Set submitting state to true

    const shippingAddress: ShippingAddress = {
      fullName: formValues.fullName,
      address: formValues.address,
      contactNumber: formValues.contactNumber,
    };

    const order: OrderData = {
      items,
      shippingAddress,
      paymentTransactionFile: formValues.paymentTransactionFile,
    };

    try {
      await submitOrder(order);
      setSuccessMessage("Your order has been placed successfully!");
      setTimeout(() => router.push("/products"), 1000); // Redirect after success
    } catch {
      alert("Error while ordering, please try again.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  const handleFocus = () => setErrors([]); // Clear errors when any field is focused

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="fixed right-5 bottom-5 z-50 flex flex-col gap-2">
        {/* Display Toast for each error */}
        {errors.map((error, index) => (
          <Toast key={index}>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{error}</div>
            <Toast.Toggle />
          </Toast>
        ))}

        {/* Display Success Toast */}
        {successMessage && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-700 dark:text-green-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{successMessage}</div>
          </Toast>
        )}
      </div>

      <h3 className="text-base sm:text-lg font-semibold text-secondary-color">
        {title}
      </h3>

      {/* Full Name */}
      <input
        type="text"
        name="fullName"
        placeholder={fullNamePlaceholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-primary-color focus:border-transparent"
        onFocus={handleFocus}
      />

      {/* Address */}
      <textarea
        name="address"
        placeholder={addressPlaceholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-primary-color focus:border-transparent"
        rows={3}
        onFocus={handleFocus}
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
            accept="image/*"
            name="contactNumber"
            className="w-full px-4 py-2 border-gray-300 border-l-0 rounded-r-md text-sm sm:text-base focus:ring-2 focus:ring-primary-color focus:border-transparent"
            placeholder={phonePlaceholder}
            onFocus={handleFocus}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full bg-primary-color text-white font-semibold rounded-lg py-2 hover:bg-opacity-90 transition ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner size="sm" color="white" /> : buttonText}
      </button>
    </form>
  );
};

export default CheckoutContactForm;
