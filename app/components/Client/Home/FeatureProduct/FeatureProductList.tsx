"use client";

import { featureProduct } from "@/app/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./FeatureProductCard";
import { Navigation } from "swiper/modules";
import { Product } from "@/app/shared/interfaces/Product";
import { useEffect, useState } from "react";

const FeatureProductList = () => {
  const [isMounted, setIsMounted] = useState(false);
  const products: Product[] = featureProduct.BEST_SELLER;

  useEffect(() => {
    setIsMounted(true); // Ensure this component is only rendered on the client
  }, []);

  if (!isMounted) return null; // Prevent server-side rendering issues

  return (
    <Swiper
      className="mt-16 mx-12 sm:mx-6"
      slidesPerView={1}
      spaceBetween={10}
      navigation
      modules={[Navigation]}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
    >
      {products.map((product, index) => (
        <SwiperSlide key={index}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FeatureProductList;
