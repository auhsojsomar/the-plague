import { Product } from "@/app/shared/interfaces/Product";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

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

export type Routes = {
  HOME: Route;
  ABOUT_US: Route;
  PRODUCTS: Route;
  LOGIN: Route;
};

export type Messages = {
  PRODUCT_BANNER: Banner[];
  BEST_PRODUCT?: {
    title: string;
    products: Product[];
  };
  OFFER: Offer;
  FEATURE_PRODUCTS: {
    title: string[];
    products: Product[];
  };
};

type Banner = TitleDescription & Route & ImageProps;

type Offer = (TitleDescription & { icon: IconDefinition })[];
