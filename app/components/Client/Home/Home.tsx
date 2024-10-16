import BestProduct from "./BestProduct/BestProduct";
import Carousel from "./Carousel/Carousel";
import ProductBanner from "./ProductBanner/ProductBanner";

const Home = () => {
  return (
    <>
      <Carousel />
      <ProductBanner />
      <BestProduct />
    </>
  );
};

export default Home;
