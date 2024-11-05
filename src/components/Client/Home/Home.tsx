import React, { lazy } from "react";

// Lazy load the components using React.lazy
const Carousel = lazy(() => import("./Carousel/Carousel"));
const ProductBanner = lazy(() => import("./ProductBanner/ProductBanner"));
const BestProduct = lazy(() => import("./BestProduct/BestProduct"));
const FeatureProduct = lazy(() => import("./FeatureProduct/FeatureProduct"));

const Home = () => {
  return (
    <>
      <Carousel />
      <ProductBanner />
      <BestProduct />
      <FeatureProduct />
    </>
  );
};

export default Home;
