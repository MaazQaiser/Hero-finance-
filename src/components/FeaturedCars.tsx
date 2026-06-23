import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ArrowLink } from "@/components/ui/ArrowLink";

const cars = [
  {
    id: "1",
    image: "/images/car-1.png",
    make: "BMW",
    model: "320d M Sport",
    price: "£18,995",
    monthly: "£289",
    badge: "Hot Deal" as const,
    badgeVariant: "coral" as const,
  },
  {
    id: "2",
    image: "/images/car-2.png",
    make: "Audi",
    model: "A3 Sportback",
    price: "£16,450",
    monthly: "£249",
    badge: "Low Mileage",
    badgeVariant: "success" as const,
  },
  {
    id: "3",
    image: "/images/car-3.png",
    make: "Ford",
    model: "Focus ST-Line",
    price: "£12,995",
    monthly: "£199",
    badge: "Hot Deal",
    badgeVariant: "coral" as const,
  },
  {
    id: "4",
    image: "/images/car-4.png",
    make: "Mercedes-Benz",
    model: "C220d AMG Line",
    price: "£22,750",
    monthly: "£349",
    badge: "Low Mileage",
    badgeVariant: "success" as const,
  },
];

export function FeaturedCars() {
  return (
    <section id="featured-cars" className="section-padding bg-surface/50">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Featured cars"
            title="Premium stock, ready to reserve"
            description="Every vehicle is AA inspected with clear monthly HP payments shown first."
          />
          <Link href="/cars" className="hidden md:inline-flex">
            <ArrowLink>View all stock</ArrowLink>
          </Link>
        </div>

        <div className="carousel-snap mt-10 -mx-5 px-5 md:-mx-8 md:px-8">
          {cars.map((car) => (
            <article
              key={car.id}
              className="w-[85vw] shrink-0 snap-center sm:w-[300px] md:w-[320px]"
            >
              <Link
                href={`/cars/${car.id}`}
                className="group block overflow-hidden rounded-[var(--radius-image)] border border-cream/10 bg-charcoal transition-colors hover:border-cream/20"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 85vw, 320px"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge variant={car.badgeVariant}>{car.badge}</Badge>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-3xl font-medium leading-none text-coral">
                    {car.monthly}
                    <span className="text-base font-normal text-cream-muted">/mo</span>
                  </p>
                  <p className="mt-2 text-sm text-cream-muted">{car.price} vehicle price</p>
                  <h3 className="mt-3 text-base font-medium text-cream/90">
                    {car.make} {car.model}
                  </h3>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/cars" className="arrow-link group inline-flex">
            <span>View all stock</span>
            <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
