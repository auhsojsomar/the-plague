import { Carousel } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import CustomImage from "@/src/components/Shared/CustomImage";
import { homeCarouselImage } from "@/src/constants";

const customTheme: CustomFlowbiteTheme = {
  carousel: {
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-x-scroll scroll-smooth",
      snap: "snap-x",
    },
  },
};

const HomeCarousel = () => {
  return (
    <div className="h-auto max-w-screen-2xl max-h-[1080px] lg:h-screen lg:relative lg:-top-20 mx-auto overflow-hidden aspect-video lg:aspect-auto">
      <Flowbite theme={{ theme: customTheme }}>
        <Carousel slide={false}>
          {homeCarouselImage.map((image, index) => (
            <div key={index} className="relative w-full h-full">
              <CustomImage
                className="w-full h-full"
                src={image.src}
                alt={image.alt}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                priority={index === 0}
                useBucket={index === 0}
                imageClass="object-contain lg:object-cover"
              />
            </div>
          ))}
        </Carousel>
      </Flowbite>
    </div>
  );
};

export default HomeCarousel;
