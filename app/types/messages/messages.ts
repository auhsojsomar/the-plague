import { Banner } from "./banner";
import { BestProduct } from "../product/bestProduct";
import { Offer } from "./offer";
import { FeatureProducts } from "../product/featureProducts";
import { FooterSection } from "../footer/footerSection";

export type Messages = {
  PRODUCT_BANNER: Banner[];
  BEST_PRODUCT: BestProduct;
  OFFER: Offer[];
  FEATURE_PRODUCTS: FeatureProducts;
  FOOTER: FooterSection;
};
