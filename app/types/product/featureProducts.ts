import { Route } from "../common/route";
import { Product } from "../../shared/types/Product";

export type FeatureProducts = {
  title: Route[];
  products: {
    BEST_SELLER: Product[];
    NEW_PRODUCTS: Product[];
    MUST_HAVE: Product[];
  };
};
