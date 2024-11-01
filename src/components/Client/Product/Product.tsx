import ProductList from "./ProductList";
import { Product as ProductType } from "@/src/shared/types/Product";
import ProductSidebar from "./ProductSidebar";
import ProductBanner from "./ProductBanner";

interface ProductProps {
  products: ProductType[];
}

const Product = ({ products }: ProductProps) => {
  return (
    <div>
      <div className="max-w-screen-2xl mx-auto">
        {/* Sidebar */}
        <ProductSidebar />

        {/* Main content */}
        <div className="p-4 ml-64">
          <ProductBanner />
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default Product;
