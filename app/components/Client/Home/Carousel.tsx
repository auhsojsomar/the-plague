import Image from "next/image";
import { Carousel } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import styles from "./Carousel.module.css";

import banner from "@/image/main-banner.jpg";

const customTheme: CustomFlowbiteTheme = {
  carousel: {
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
      snap: "snap-x",
    },
  },
};

const HomeCarousel = () => {
  return (
    <div className="h-56 sm:h-80 md:h-96 lg:h-auto max-w-screen-2xl mx-auto">
      <Flowbite theme={{ theme: customTheme }}>
        <Carousel slide={false}>
          <div className="relative">
            <Image
              className={`${styles.carouselImage} object-contain lg:object-cover mx-auto`}
              src={banner}
              alt="banner-1"
            />
          </div>
          <div className="relative">
            <img
              className={`${styles.carouselImage} object-contain lg:object-cover mx-auto`}
              src="https://placehold.co/1536x650?text=Place+your+image+here"
              alt="banner-2"
            />
          </div>
          <div className="relative">
            <img
              className={`${styles.carouselImage} object-contain lg:object-cover mx-auto`}
              src="https://placehold.co/1536x650?text=Place+your+image+here"
              alt="banner-3"
            />
          </div>
          <div className="relative">
            <img
              className={`${styles.carouselImage} object-contain lg:object-cover mx-auto`}
              src="https://placehold.co/1536x650?text=Place+your+image+here"
              alt="banner-4"
            />
          </div>
        </Carousel>
      </Flowbite>
    </div>
  );
};

export default HomeCarousel;
