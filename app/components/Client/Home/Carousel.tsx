"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const imgWidth = 200;
const imgHeight = 200;

const carouselImgSrc = [
  "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
  "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
  "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
  "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
  "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp",
  "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp",
  "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp",
];

export default function Carousel() {
  const [carouselActiveItem, setCarouselActiveItem] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollItem = () => {
    setCarouselActiveItem((prevState) => {
      if (carouselImgSrc.length - 1 > prevState) {
        return prevState + 1;
      } else {
        return 0;
      }
    });
  };

  const autoplay = useCallback(() => setInterval(scrollItem, 1000), []);

  useEffect(() => {
    const play = autoplay();
    return () => clearInterval(play);
  }, [autoplay]);

  useEffect(() => {
    carouselRef.current?.scroll({ left: imgWidth * carouselActiveItem });
  }, [carouselActiveItem]);

  return (
    <div ref={carouselRef} className="carousel carousel-center">
      {carouselImgSrc.map((imgSrc) => (
        <div key={imgSrc} className="carousel-item">
          <Image
            width={imgWidth}
            height={imgHeight}
            src={imgSrc}
            alt={imgSrc}
          />
        </div>
      ))}
    </div>
  );
}
