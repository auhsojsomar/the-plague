import React from "react";
import BannerTable from "./BannerTable";
import { BannerDto } from "@/src/shared/interfaces/Banner";

const MainBanner = React.memo(() => {
  const bannerList: BannerDto[] = [
    {
      id: "1",
      name: "Product A",
      src: "image/design-1.jpg",
      alt: "product-alt",
    },
    {
      id: "2",
      name: "Product B",
      src: "image/design-2.jpg",
      alt: "product-alt",
    },
    {
      id: "3",
      name: "Product C",
      src: "image/design-3.jpg",
      alt: "product-alt",
    },
    {
      id: "4",
      name: "Product D",
      src: "image/design-4.jpg",
      alt: "product-alt",
    },
  ];

  return <BannerTable rowData={bannerList} />;
});

export default MainBanner;
