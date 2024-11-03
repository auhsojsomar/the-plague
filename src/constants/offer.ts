import { Offer } from "@/src/types/messages/offer";
import { faTruck, faShare, faComment } from "@fortawesome/free-solid-svg-icons";

export const OFFERS: Offer[] = [
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
];
