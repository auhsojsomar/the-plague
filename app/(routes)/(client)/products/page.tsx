import Product from "@/app/components/Client/Product/Product";
import { allProduct } from "@/app/constants";
import { Variant } from "@/app/shared/interfaces/Variant";
import { Product as ProductType } from "@/app/shared/types/Product";

const fetchProducts = async (): Promise<ProductType[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        next: { revalidate: 30 }, // Re-fetch after 30 seconds
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch products:", response.statusText);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const getBestVariant = (variants: Variant[]) => {
  return variants.reduce((best, current) => {
    const bestPrice = best.salePrice ?? best.price;
    const currentPrice = current.salePrice ?? current.price;
    return currentPrice < bestPrice ? current : best;
  });
};

const processProducts = (products: ProductType[]) => {
  return products.map((product) => {
    const selectedVariant = getBestVariant(product.variants);
    return {
      ...product,
      price: selectedVariant.price,
      salePrice: selectedVariant.salePrice,
      isSale: Boolean(selectedVariant.salePrice),
    };
  });
};

const ProductListPage = async () => {
  const products = await fetchProducts();
  const processedProducts = processProducts(products);

  return <Product products={processedProducts} />;
};

export default ProductListPage;
