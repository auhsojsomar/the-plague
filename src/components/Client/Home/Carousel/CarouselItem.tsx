"use client";

import { Carousel } from "flowbite-react";
import CustomImage from "@/src/components/Shared/CustomImage";
import { BannerDto } from "@/src/shared/interfaces/Banner";
import { useEffect, useState } from "react";
import { getBanner } from "@/src/lib/api/adminBannerApi";

const CarouselItem = () => {
  const [banners, setBanners] = useState<BannerDto[]>([]);

  const fetchBanner = async () => {
    try {
      const data = await getBanner();
      setBanners(data);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);
  return (
    <Carousel slide={false}>
      {banners.map((banner, index) => (
        <div key={banner.id} className="relative w-full h-full">
          <CustomImage
            className="w-full h-full"
            src={banner.image}
            alt={banner.name}
            fill
            loading={index === 0 ? "eager" : "lazy"}
            priority={index === 0}
            useBucket={index === 0}
            imageClass="object-contain lg:object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselItem;
