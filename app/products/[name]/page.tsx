import { Product } from "@/src/shared/types/Product";
import ProductPageComponent from "@/src/components/Client/ProductPage/ProductPage";
import { ProductPageContextProvider } from "@/src/context/ProductPageContext";

// Fetch product details by product name (kebab-case)
const fetchProductByName = async (name: string): Promise<Product | null> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("API URL is not defined");
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/products/name/${name}`);

    if (!response.ok) {
      console.error("Failed to fetch product:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Define revalidation period
export const revalidate = 30; // Revalidate every 30 seconds

interface ProductPageProps {
  params: { name: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { name } = params;
  const product = await fetchProductByName(name);

  // Handle product not found
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <ProductPageContextProvider initialProduct={product}>
      <ProductPageComponent />
    </ProductPageContextProvider>
  );
};

export default ProductPage;
