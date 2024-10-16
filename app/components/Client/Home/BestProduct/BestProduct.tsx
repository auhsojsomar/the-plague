import BestProductTitle from "./BestProductTitle";
import ProductList from "./ProductList";

const BestProduct = () => {
  return (
    <div className="bg-secondary-color py-12 px-5 sm:py-20">
      <div className="container">
        <BestProductTitle />
        <ProductList />
      </div>
    </div>
  );
};

export default BestProduct;
