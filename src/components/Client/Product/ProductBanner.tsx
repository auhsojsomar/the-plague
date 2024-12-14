import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import CustomImage from "@/shared/CustomImage";
import { getBanner } from "@/src/lib/api/adminBannerApi";
import { BannerType } from "@/src/shared/enums/BannerType";
import { useCallback, useEffect, useState } from "react";
import { BannerDto } from "@/src/shared/interfaces/Banner";
import { toKebabCase } from "@/src/utils/stringUtils";

const ProductBanner = () => {
  const [banners, setBanners] = useState<BannerDto[]>([]);

  const fetchBanners = useCallback(async () => {
    try {
      const data = await getBanner(BannerType.Product);
      setBanners(data);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);
  return (
    <div className="w-full h-auto">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="mySwiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="h-[200px] relative">
              <CustomImage
                className="w-full h-full"
                imageClass="object-cover"
                src={banner.image}
                alt={toKebabCase(banner.name)}
                fill
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductBanner;
