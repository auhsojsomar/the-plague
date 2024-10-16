import Image from "next/image";
import { Carousel } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import styles from "./Carousel.module.css";

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
          {/* First Slide */}
          <div className="relative h-[calc(100vh-80px)]">
            <Image
              className="object-contain lg:object-cover mx-auto"
              src="/image/main-banner.jpg" // Path from the public folder
              alt="banner-1"
              layout="fill" // Makes the image fill the parent div
              loading="lazy" // Optional: Use lazy loading
              decoding="async" // Optional: For better performance
            />
          </div>

          {/* Second Slide */}
          <div className="relative h-[calc(100vh-80px)]">
            <Image
              className="object-contain lg:object-cover mx-auto"
              src="https://placehold.co/1536x650?text=Place+your+image+here"
              alt="banner-2"
              layout="fill" // Fill the parent div
              objectFit="cover" // Ensure the image covers the area
              loading="lazy" // Optional: Use lazy loading
              decoding="async" // Optional: For better performance
            />
          </div>

          {/* Third Slide */}
          <div className="relative h-[calc(100vh-80px)]">
            <Image
              className="object-contain lg:object-cover mx-auto"
              src="https://placehold.co/1536x650?text=Place+your+image+here"
              alt="banner-3"
              layout="fill" // Fill the parent div
              objectFit="cover" // Ensure the image covers the area
              loading="lazy" // Optional: Use lazy loading
              decoding="async" // Optional: For better performance
            />
          </div>

          {/* Fourth Slide */}
          <div className="relative h-[calc(100vh-80px)]">
            <Image
              className="object-contain lg:object-cover mx-auto"
              src="https://placehold.co/1536x650?text=Place+your+image+here"
              alt="banner-4"
              layout="fill" // Fill the parent div
              objectFit="cover" // Ensure the image covers the area
              loading="lazy" // Optional: Use lazy loading
              decoding="async" // Optional: For better performance
            />
          </div>
        </Carousel>
      </Flowbite>
    </div>
  );
};

export default HomeCarousel;
