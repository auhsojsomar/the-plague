import BestProductFooter from "./BestProductFooter";
import BestProductTitle from "./BestProductTitle";
import ProductList from "./BestProductList";

const BestProduct = () => {
  return (
    <div className="bg-secondary-color py-12 px-5 sm:py-20">
      <div className="container">
        <BestProductTitle />
        <ProductList />
        <BestProductFooter />
      </div>
    </div>
  );
};

export default BestProduct;
