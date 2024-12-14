"use client";

import { Carousel } from "flowbite-react";
import CustomImage from "@/src/components/Shared/CustomImage";
import { BannerDto } from "@/src/shared/interfaces/Banner";
import { useCallback, useEffect, useState } from "react";
import { getBanner } from "@/src/lib/api/adminBannerApi";
import { BannerType } from "@/src/shared/enums/BannerType";

const CarouselItem = () => {
  const [banners, setBanners] = useState<BannerDto[]>([]);

  const fetchBanners = useCallback(async () => {
    try {
      const data = await getBanner(BannerType.Main);
      setBanners(data);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);
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
            imageClass="object-contain lg:object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselItem;
