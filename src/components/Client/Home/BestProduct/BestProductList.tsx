import { bestProduct } from "@/src/constants";
import ProductCard from "./BestProductCard";
import { getBestProducts } from "@/src/lib/api/getProductsApi";
import { processProducts } from "@/src/utils/productUtils";

const BestProductList = async () => {
  const products = processProducts(await getBestProducts());

  const getOrderClass = (index: number) => {
    switch (index) {
      case 1:
        return "order-2 lg:order-3"; // 2nd product becomes 3rd on lg
      case 2:
        return "order-3 lg:order-2"; // 3rd product becomes 2nd on lg
      default:
        return `order-${index + 1}`; // Default order for all other products
    }
  };

  return (
    <div className="py-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {products.map((product, index) => (
        <div
          key={index}
          className={`w-full h-auto aspect-square relative ${getOrderClass(
            index
          )} ${index === 2 ? "sm:row-span-2 sm:col-span-2 lg:col-span-2" : ""}`}
        >
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
};

export default BestProductList;
