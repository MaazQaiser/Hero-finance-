"use client";

import Image from "next/image";
import { useState } from "react";

const stockImages = [
  {
    src: "/images/stock/used-car-1.jpg",
    alt: "Used Ford Focus from Hero stock",
  },
  {
    src: "/images/stock/used-car-3.jpg",
    alt: "Used car ready to finance from Hero stock",
  },
];

export function HowItWorksStockImages() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="flex h-full min-h-[220px] gap-3 px-8 pb-8 sm:min-h-[260px] lg:w-[360px] lg:gap-1 lg:self-stretch lg:px-0 lg:pb-0 lg:pr-0"
      onMouseLeave={() => setActive(null)}
    >
      {stockImages.map((image, index) => {
        const isActive = active === index;
        const isInactive = active !== null && active !== index;

        return (
          <button
            key={image.src}
            type="button"
            aria-label={image.alt}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            className={`relative h-full min-h-[220px] overflow-hidden rounded-[20px] transition-[flex,flex-basis] duration-500 ease-out sm:min-h-[260px] lg:min-h-0 lg:rounded-none ${
              index === 0 ? "lg:rounded-l-[28px]" : ""
            } ${index === stockImages.length - 1 ? "lg:rounded-r-[28px]" : ""} ${
              isActive
                ? "flex-[1.75] lg:flex-[2.2]"
                : isInactive
                  ? "flex-[0.65] lg:flex-[0.55]"
                  : "flex-1"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={`object-cover transition-transform duration-500 ${
                isActive ? "scale-105" : "scale-100"
              }`}
              sizes="(max-width: 1024px) 50vw, 220px"
            />
          </button>
        );
      })}
    </div>
  );
}
