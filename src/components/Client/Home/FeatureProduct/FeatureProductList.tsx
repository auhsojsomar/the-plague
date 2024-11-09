"use client";

import { featureProduct } from "@/src/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./FeatureProductCard";
import { Navigation } from "swiper/modules";
import { Product } from "@/src/shared/types/Product";
import { useEffect, useState } from "react";
import ProductCardSkeleton from "@/skeleton/ProductCardSkeleton";

const FeatureProductList = () => {
  const [isMounted, setIsMounted] = useState(false);
  const products: Product[] = featureProduct.BEST_SELLER;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render skeletons with a fixed height
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
      slidesPerView="auto" // Use 'auto' for dynamic slide width
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
