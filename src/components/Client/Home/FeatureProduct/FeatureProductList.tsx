"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./FeatureProductCard";
import { Navigation } from "swiper/modules";
import { Product } from "@/src/shared/types/Product";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCardSkeleton from "@/skeleton/ProductCardSkeleton";
import {
  getBestProducts,
  getFeatureProducts,
} from "@/src/lib/api/getProductsApi"; // Import both API calls
import { processProducts } from "@/src/utils/productUtils";

const FeatureProductList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchProductsByFilter();
  }, [searchParams]); // Re-run when the query parameter changes

  const fetchProductsByFilter = async () => {
    setIsLoading(true);
    const filter = searchParams.get("filter") || "best-seller"; // Default to 'New Products'

    try {
      let fetchedProducts: Product[] = [];

      // Determine which API call to use based on the filter
      if (filter === "new-products") {
        fetchedProducts = await getFeatureProducts();
      } else {
        fetchedProducts = await getBestProducts(); // Handle "New Products" or any default case
      }

      setProducts(processProducts(fetchedProducts));
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // Display skeletons while loading
    return (
      <div className="mt-16 mx-4 sm:mx-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
      </div>
    );
  }

  return (
    <Swiper
      className="mt-16 mx-4 sm:mx-6"
      slidesPerView="auto"
      spaceBetween={10}
      navigation
      modules={[Navigation]}
    >
      {products.map((product, index) => (
        <SwiperSlide key={index} className="w-auto">
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FeatureProductList;
