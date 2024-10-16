import { Carousel } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import CustomImage from "@/app/components/Shared/CustomImage";

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
    <div className="h-auto max-w-screen-2xl lg:h-screen lg:relative -top-20">
      <Flowbite theme={{ theme: customTheme }}>
        <Carousel slide={false}>
          {/* First Slide */}
          <div className="relative w-full h-full">
            <CustomImage
              className="object-contain lg:object-cover mx-auto"
              src="/image/main-banner-full.jpg" // Path from the public folder
              alt="banner-1"
              loading="lazy" // Optional: Use lazy loading
              decoding="async" // Optional: For better performance
              useNextImage={true}
              fill
            />
          </div>

          {/* Second Slide */}
          <div className="relative w-full h-auto">
            <CustomImage
              className="object-contain lg:object-cover mx-auto h-full"
              src="https://placehold.co/1920x1080?text=Place+your+image+here"
              alt="banner-2"
              loading="lazy" // Optional: Use lazy loading
              decoding="async" // Optional: For better performance
            />
          </div>

          {/* Third Slide */}
          <div className="relative w-full h-auto">
            <CustomImage
              className="object-contain lg:object-cover mx-auto h-full"
              src="https://placehold.co/1920x1080?text=Place+your+image+here"
              alt="banner-3"
              loading="lazy" // Optional: Use lazy loading
              decoding="async" // Optional: For better performance
            />
          </div>

          {/* Fourth Slide */}
          <div className="relative w-full h-auto">
            <CustomImage
              className="object-contain lg:object-cover mx-auto h-full"
              src="https://placehold.co/1920x1080?text=Place+your+image+here"
              alt="banner-4"
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
