"use client";

import { useState, useEffect } from "react";
import { CART } from "@/constants/cart";
import CustomImage from "@/shared/CustomImage";
import { CartData } from "@/shared/interfaces/CartData";
import CartItem from "./CartItem";
import OrderSummary from "@/shared/OrderSummary";
import { Spinner, Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";
import { useCheckoutContext } from "@/src/context/CheckoutContext";
import { useRouter } from "next/navigation";

interface SelectedCartData extends CartData {
  uniqueId: string;
}

const Cart = () => {
  const {
    title,
    subTitle,
    titleImageAlt,
    titleImageUrl,
    submitButtonText,
    orderSummary,
  } = CART;

  const router = useRouter();
  const { setCheckout } = useCheckoutContext();

  const [selectedItems, setSelectedItems] = useState<SelectedCartData[]>([]);
  const [cart, setCart] = useState<CartData[]>([]);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const cartList = localStorage.getItem("cart");
    if (cartList) {
      setCart(JSON.parse(cartList) as CartData[]);
    }
  }, []);

  useEffect(() => {
    if (error) {
      setShowToast(true); // Show toast when there's an error
    }
  }, [error]);

  const getUniqueId = (item: CartData) =>
    `${item.product.id}-${item.variant.id}`;

  const handleItemCheck = (item: CartData, checked: boolean) => {
    const uniqueId = getUniqueId(item);
    setSelectedItems((prevSelected) =>
      checked
        ? [...prevSelected, { ...item, uniqueId }]
        : prevSelected.filter((i) => i.uniqueId !== uniqueId)
    );
  };

  const handleQuantityChange = (item: CartData, newQuantity: number) => {
    const uniqueId = getUniqueId(item);
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.product.id === item.product.id &&
        cartItem.variant.id === item.variant.id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
    setSelectedItems((prevSelected) =>
      prevSelected.map((i) =>
        i.uniqueId === uniqueId ? { ...i, quantity: newQuantity } : i
      )
    );
  };

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      setError("Please select at least one item to proceed.");
      setShowToast(true); // Ensure toast is shown when error occurs
      setTimeout(() => {
        setShowToast(false); // Hide toast after 3 seconds
      }, 3000);
      return;
    }

    setIsSubmitting(true);

    setCheckout(selectedItems);
    setTimeout(() => {
      router.push("/checkout");
    }, 1000);
  };

  const handleToastClose = () => {
    setShowToast(false); // Hide toast when closed
    setError(""); // Reset the error state
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-2 sm:p-6">
      <div className="w-full max-w-screen-xl bg-white border border-gray-300 rounded-lg shadow-lg p-2 sm:p-6 lg:p-8 lg:pt-0">
        {/* Toast Notification */}
        <div
          className={`fixed bottom-5 z-50 transition-all duration-500 ${
            showToast ? "right-5" : "-right-full"
          }`}
        >
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{error}</div>
            <Toast.Toggle onDismiss={handleToastClose} />
          </Toast>
        </div>

        {/* Title Section */}
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
            <h2 className="text-lg sm:text-2xl font-bold text-primary-color">
              {title}
            </h2>
            <div className="h-11 w-px bg-primary-color mx-2 hidden sm:block"></div>
            <h2 className="text-md sm:text-xl text-primary-color">
              {subTitle}
            </h2>
          </div>
        </section>

        {/* Cart Section */}
        <section className="flex flex-col lg:flex-row gap-6 pt-2">
          {/* Cart Items */}
          <div className="flex-1 max-h-screen overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-primary-color scrollbar-track-gray-200">
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={getUniqueId(item)}
                  {...item}
                  onItemCheck={handleItemCheck}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
          </div>

          {/* Order Summary and Payment Section */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-6">
            <OrderSummary
              selectedItems={selectedItems}
              details={orderSummary}
            />
            <button
              onClick={handleSubmit}
              className={`w-full bg-primary-color text-white font-semibold rounded-lg py-2 hover:bg-opacity-90 transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Spinner size="sm" color="white" />
              ) : (
                submitButtonText
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;
