import { Flowbite } from "flowbite-react";
import CarouselItem from "./CarouselItem";

const HomeCarousel = () => {
  const customTheme = {
    carousel: {
      scrollContainer: {
        base: "flex h-full snap-mandatory overflow-x-scroll scroll-smooth",
        snap: "snap-x",
      },
    },
  };

  return (
    <div className="h-auto max-w-screen-2xl max-h-[1080px] lg:h-screen lg:relative lg:-top-20 mx-auto overflow-hidden aspect-video lg:aspect-auto">
      <Flowbite theme={{ theme: customTheme }}>
        <CarouselItem />
      </Flowbite>
    </div>
  );
};

export default HomeCarousel;
