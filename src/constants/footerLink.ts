import { LabelWithIcon } from "@/src/types/icons/labelWithIcon";
import { Route } from "@/src/types/common/route";
import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faThreads,
} from "@fortawesome/free-brands-svg-icons";

export const FOOTER_LINKS = {
  CONTACT_US: [
    { label: "Caloocan City", icon: faLocationDot },
    { label: "order@theplagueclothing.com", icon: faEnvelope },
    { label: "(+63) 912 345 6789", icon: faPhone },
  ] as LabelWithIcon[],
  INFORMATION: [
    { label: "My account", link: "/" },
    { label: "Order history", link: "/" },
    { label: "Returns", link: "/" },
    { label: "Privacy Policy", link: "/" },
    { label: "Site Map", link: "/" },
  ] as Route[],
  OUR_OFFERS: [
    { label: "New collection", link: "/" },
    { label: "Best sellers", link: "/" },
    { label: "Manufacturers", link: "/" },
    { label: "New products", link: "/" },
    { label: "Delivery & Returns", link: "/" },
  ] as Route[],
  OUR_POLICY: [
    { label: "Help & Contact", link: "/" },
    { label: "Shipping & Taxes", link: "/" },
    { label: "Return policy", link: "/" },
    { label: "Careens", link: "/" },
    { label: "Affiliates", link: "/" },
    { label: "Legal Notice", link: "/" },
  ] as Route[],
  CONNECT_US: [
    { icon: faFacebookF, link: "/" },
    { icon: faInstagram, link: "/" },
    { icon: faThreads, link: "/" },
    { icon: faLinkedinIn, link: "/" },
  ],
};
