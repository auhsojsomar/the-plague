import Product from "@/src/components/Client/Product/Product";
import { getProducts } from "@/src/lib/api/getProductsApi";
import { processProducts } from "@/src/utils/productUtils";

const ProductListPage = async () => {
  const products = await getProducts();
  const processedProducts = processProducts(products);

  return <Product products={processedProducts} />;
};

export default ProductListPage;
