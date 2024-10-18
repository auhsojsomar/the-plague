import { Product } from "@/app/shared/interfaces/Product";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Basic Types
export type Route = {
  label: string;
  link: string;
};

export type TitleDescription = {
  title: string;
  description: string;
};

export type ImageProps = {
  src: string;
  alt: string;
};

// Complex Types
export type LabelWithIcon = {
  label: string;
  icon: IconDefinition;
};

export type IconWithLink = {
  icon: IconDefinition;
  link: string;
};

export type Footer = {
  title: string;
  label: Route[];
};

export type Messages = {
  PRODUCT_BANNER: Banner[];
  BEST_PRODUCT: BestProduct;
  OFFER: Offer[];
  FEATURE_PRODUCTS: FeatureProducts;
  FOOTER: FooterSection;
};

// Specific Types
export type Routes = {
  HOME: Route;
  ABOUT_US: Route;
  PRODUCTS: Route;
  LOGIN: Route;
};

type Banner = TitleDescription & Route & ImageProps;

type BestProduct = {
  title: string;
  products: Product[];
};

type FeatureProducts = {
  title: Route[];
  products: {
    BEST_SELLER: Product[];
    NEW_PRODUCTS: Product[];
    MUST_HAVE: Product[];
  };
};

type ContactUsFooter = {
  title: string;
  label: LabelWithIcon[];
};

type FooterSection = {
  CONTACT_US: ContactUsFooter;
  INFORMATION: Footer;
  OUR_OFFERS: Footer;
  OUR_POLICY: Footer;
  GET_NEWSLETTERS: NewsletterSection;
};

type NewsletterSection = {
  title: string;
  textbox: {
    placeholder: string;
  };
  button: {
    text: string;
  };
  CONNECT_US: {
    title: string;
    label: IconWithLink[];
  };
};

type Offer = TitleDescription & { icon: IconDefinition };
