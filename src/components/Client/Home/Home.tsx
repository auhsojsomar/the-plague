import Carousel from "./Carousel/Carousel";
import ProductBanner from "./ProductBanner/ProductBanner";
import BestProduct from "./BestProduct/BestProduct";
import FeatureProduct from "./FeatureProduct/FeatureProduct";

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
