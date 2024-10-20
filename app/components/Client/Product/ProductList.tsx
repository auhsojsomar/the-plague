import ProductCard from "./ProductCard";
import { allProduct } from "@/app/constants/";

const ProductList = () => {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {allProduct.map((product) => (
        <ProductCard key={product.productName} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
