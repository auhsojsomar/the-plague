import { Messages } from "@/app/types/messages/messages";
import { bestProduct } from "./product";
import { PRODUCT_BANNER } from "./banner";
import { OFFERS } from "./offer";
import { FEATURE_PRODUCTS } from "./featureProducts";
import { FOOTER_LINKS } from "./footerLink";

export const MESSAGE: Messages = {
  PRODUCT_BANNER,
  BEST_PRODUCT: {
    title: "Our Best Products",
    products: bestProduct,
  },
  OFFER: OFFERS,
  FEATURE_PRODUCTS,
  FOOTER: {
    CONTACT_US: {
      title: "Contact Us",
      label: FOOTER_LINKS.CONTACT_US,
    },
    INFORMATION: {
      title: "Information",
      label: FOOTER_LINKS.INFORMATION,
    },
    OUR_OFFERS: {
      title: "Our Offers",
      label: FOOTER_LINKS.OUR_OFFERS,
    },
    OUR_POLICY: {
      title: "Our Policy",
      label: FOOTER_LINKS.OUR_POLICY,
    },
    GET_NEWSLETTERS: {
      title: "Get Newsletters",
      textbox: { placeholder: "Email" },
      button: { text: "Subscribe" },
      CONNECT_US: {
        title: "Connect Us",
        label: FOOTER_LINKS.CONNECT_US,
      },
    },
  },
};
