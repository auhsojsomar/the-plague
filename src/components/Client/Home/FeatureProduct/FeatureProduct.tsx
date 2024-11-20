import FeatureProductList from "./FeatureProductList";
import FeatureProductTitle from "./FeatureProductTitle";

const FeatureProduct = () => {
  return (
    <div className="container py-12  min-h-[538px]">
      <FeatureProductTitle />
      <FeatureProductList />
    </div>
  );
};

export default FeatureProduct;
