import { Carousel } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import CustomImage from "@/src/components/Shared/CustomImage"; // Custom wrapper for the Next.js Image
import { homeCarouselImage } from "@/src/constants";

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
    <div className="h-auto max-w-screen-2xl max-h-[1080px] lg:h-screen lg:relative lg:-top-20 mx-auto overflow-hidden">
      {/* Added overflow-hidden */}
      <Flowbite theme={{ theme: customTheme }}>
        <Carousel slide={false}>
          {homeCarouselImage.map((image, index) => (
            <div key={index} className="relative w-full h-full">
              <CustomImage
                className="object-contain lg:object-cover mx-auto h-full"
                src={image.src}
                alt={image.alt}
                width={1920}
                height={1080}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </Carousel>
      </Flowbite>
    </div>
  );
};

export default HomeCarousel;
