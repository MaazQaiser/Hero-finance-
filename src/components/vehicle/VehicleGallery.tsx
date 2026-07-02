"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { type Vehicle } from "@/data/vehicles";

interface VehicleGalleryProps {
  vehicle: Vehicle;
}

export function VehicleGallery({ vehicle }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      const nextIndex = (index + vehicle.images.length) % vehicle.images.length;
      setActiveIndex(nextIndex);

      const container = scrollRef.current;
      if (container) {
        container.scrollTo({
          left: container.clientWidth * nextIndex,
          behavior: "smooth",
        });
      }
    },
    [vehicle.images.length],
  );

  useEffect(() => {
    if (!expanded) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [expanded]);

  return (
    <>
      <section className="md:px-8 lg:px-12">
        <div className="relative mx-auto max-w-7xl md:pt-4">
          <div className="relative md:overflow-hidden md:rounded-[var(--radius-image)]">
            <div
              ref={scrollRef}
              className="carousel-snap aspect-[4/3] w-full bg-paper md:aspect-[16/10]"
              onScroll={(event) => {
                const container = event.currentTarget;
                const index = Math.round(container.scrollLeft / container.clientWidth);
                if (index !== activeIndex) setActiveIndex(index);
              }}
            >
              {vehicle.images.map((image, index) => (
                <button
                  key={`${vehicle.id}-gallery-${index}`}
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="relative h-full min-w-full shrink-0 snap-center"
                  aria-label={`View image ${index + 1} full screen`}
                >
                  <Image
                    src={image}
                    alt={`${vehicle.make} ${vehicle.model} — image ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="100vw"
                  />
                </button>
              ))}
            </div>

            <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {vehicle.images.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to image ${index + 1}`}
                  className={`pointer-events-auto h-2 rounded-full transition-all ${
                    index === activeIndex ? "w-6 bg-cream" : "w-2 bg-cream/40"
                  }`}
                />
              ))}
            </div>

            <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
              <Badge variant="coral">{vehicle.badge}</Badge>
              <Badge variant="success">AA Inspected</Badge>
              {vehicle.mileage < 25000 && <Badge variant="neutral">Low Mileage</Badge>}
            </div>
          </div>
        </div>
      </section>

      {expanded && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-paper">
          <div className="flex items-center justify-between px-5 py-4">
            <p className="text-sm text-muted">
              {activeIndex + 1} / {vehicle.images.length}
            </p>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Close gallery"
              className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line text-ink"
            >
              ✕
            </button>
          </div>

          <div className="relative flex flex-1 items-center">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous image"
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper/90 text-ink shadow-sm"
            >
              ‹
            </button>

            <div className="relative mx-auto h-full w-full max-w-5xl px-14">
              <Image
                src={vehicle.images[activeIndex]}
                alt={`${vehicle.make} ${vehicle.model} full screen`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next image"
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper/90 text-ink shadow-sm"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}
