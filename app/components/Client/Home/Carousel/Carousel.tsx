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
    <div className="h-56 sm:h-80 md:h-96 lg:h-auto max-w-screen-2xl mx-auto">
      <Flowbite theme={{ theme: customTheme }}>
        <Carousel slide={false}>
          {/* First Slide */}
          <div className="relative h-[calc(100vh-80px)]">
            <CustomImage
              className="object-contain lg:object-cover mx-auto"
              src="/image/main-banner.jpg" // Path from the public folder
              alt="banner-1"
              loading="lazy" // Optional: Use lazy loading
              decoding="async" // Optional: For better performance
              useNextImage={true}
              fill
            />
          </div>

          {/* Second Slide */}
          <div className="relative h-[calc(100vh-80px)]">
            <CustomImage
              className="object-contain lg:object-cover mx-auto h-full"
              src="https://placehold.co/1536x650?text=Place+your+image+here"
              alt="banner-2"
              loading="lazy" // Optional: Use lazy loading
              decoding="async" // Optional: For better performance
            />
          </div>

          {/* Third Slide */}
          <div className="relative h-[calc(100vh-80px)]">
            <CustomImage
              className="object-contain lg:object-cover mx-auto h-full"
              src="https://placehold.co/1536x650?text=Place+your+image+here"
              alt="banner-3"
              loading="lazy" // Optional: Use lazy loading
              decoding="async" // Optional: For better performance
            />
          </div>

          {/* Fourth Slide */}
          <div className="relative h-[calc(100vh-80px)]">
            <CustomImage
              className="object-contain lg:object-cover mx-auto h-full"
              src="https://placehold.co/1536x650?text=Place+your+image+here"
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
