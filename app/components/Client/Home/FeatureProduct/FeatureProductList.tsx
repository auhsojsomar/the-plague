"use client";

import { featureProduct } from "@/app/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./FeatureProductCard";

const FeatureProductList = () => {
  const products = featureProduct.BEST_SELLER;

  return (
    <>
      <Swiper className="mt-16" spaceBetween={50} slidesPerView={4}>
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default FeatureProductList;
