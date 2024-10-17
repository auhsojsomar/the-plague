import { Messages } from "./types";
import { bestProduct } from "./product";
import { faComment, faShare, faTruck } from "@fortawesome/free-solid-svg-icons";

export const MESSAGE: Messages = {
  PRODUCT_BANNER: [
    {
      title: "Send her your love", // Swapped to description in the component
      description: "New design", // Swapped to title in the component
      label: "Get it now",
      link: "/",
      src: "https://placehold.co/370x247?text=Place+your+image+here",
      alt: "product-banner-1",
    },
    {
      title: "Send her your love", // Swapped to description in the component
      description: "New design", // Swapped to title in the component
      label: "Get it now",
      link: "/",
      src: "https://placehold.co/370x247?text=Place+your+image+here",
      alt: "product-banner-2",
    },
    {
      title: "Men’s Fashion", // Swapped to description in the component
      description: "Mid season sale", // Swapped to title in the component
      label: "View collection",
      link: "/",
      src: "https://placehold.co/370x510?text=Place+your+image+here",
      alt: "product-banner-3",
    },
  ],
  BEST_PRODUCT: {
    title: "Our Best Products",
    products: bestProduct,
  },
  OFFER: [
    {
      title: "Free shipping",
      description: "Place your text here.",
      icon: faTruck,
    },
    {
      title: "100% Money back",
      description: "Place your text here.",
      icon: faShare,
    },
    {
      title: "Online support",
      description: "Place your text here.",
      icon: faComment,
    },
  ],
  FEATURE_PRODUCTS: {
    title: ["Bestseller", "New Products", "Must have"],
    products: bestProduct,
  },
};
