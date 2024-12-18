import { featureProduct } from "./product";
import { Route } from "@/src/types/common/route";

const { BEST_SELLER, NEW_PRODUCTS, MUST_HAVE } = featureProduct;

export const FEATURE_PRODUCT_TITLES: Route[] = [
  { label: "Best Seller", link: "/?filter=best-seller" },
  { label: "New Products", link: "/?filter=new-products" },
];

export const FEATURE_PRODUCTS = {
  title: FEATURE_PRODUCT_TITLES,
  products: { BEST_SELLER, NEW_PRODUCTS, MUST_HAVE },
};
