"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { formatPrice, vehicles } from "@/data/vehicles";

const FEATURED_IDS = ["1", "2", "3", "4", "5", "6"];

const featuredCars = FEATURED_IDS.map((id) => vehicles.find((vehicle) => vehicle.id === id)).filter(
  (vehicle) => vehicle !== undefined,
);

function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isNext = direction === "next";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isNext ? "Next cars" : "Previous cars"}
      className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
        isNext
          ? "bg-ink text-white hover:bg-ink/90"
          : "border border-line bg-paper text-muted hover:border-ink/20 hover:text-ink"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        {isNext ? (
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export function FeaturedCarsV2() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "prev" | "next") => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>("article");
    const gap = 20;
    const amount = card ? card.offsetWidth + gap : 320;

    container.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="featured-cars" className="overflow-hidden bg-paper py-16 md:py-20 lg:py-24">
      <div className="w-full px-5">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:gap-16">
          <ScrollReveal className="w-full max-w-md shrink-0">
            <div className="lg:sticky lg:top-28 lg:pr-4 xl:pr-8">
              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl lg:text-[2.5rem]">
                Featured cars
              </h2>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-muted md:text-lg">
                A wide selection of AA-inspected stock with clear monthly HP payments — ready to
                reserve online.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100} className="min-w-0 w-full">
            <div className="min-w-0">
              <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {featuredCars.map((car) => (
                  <article key={car.id} className="w-[220px] shrink-0 sm:w-[240px] md:w-[260px]">
                    <Link href={`/cars/${car.id}`} className="group block">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-mist">
                        <Image
                          src={car.images[0]}
                          alt={`${car.make} ${car.model}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="260px"
                        />
                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-ink">
                        {car.make} {car.model}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {formatPrice(car.monthlyHp)}/mo · {car.year}
                      </p>
                    </Link>
                  </article>
                ))}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <NavButton direction="prev" onClick={() => scroll("prev")} />
                <NavButton direction="next" onClick={() => scroll("next")} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
