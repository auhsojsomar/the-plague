"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import CustomImage from "../../Shared/CustomImage";

// Sample banner images
const bannerImages = [
  {
    id: 1,
    image: "https://placehold.co/1200x200?text=Banner+1",
    alt: "Banner 1",
  },
  {
    id: 2,
    image: "https://placehold.co/1200x200?text=Banner+2",
    alt: "Banner 2",
  },
  {
    id: 3,
    image: "https://placehold.co/1200x200?text=Banner+3",
    alt: "Banner 3",
  },
];

const ProductBanner = () => {
  return (
    <div className="w-full h-auto">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="mySwiper"
      >
        {bannerImages.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="h-[200px] relative">
              <CustomImage
                className="w-full h-full"
                imageClass="object-cover"
                src={banner.image}
                alt={banner.alt}
                fill
                useBucket={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductBanner;
