import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { formatPrice, vehicles } from "@/data/vehicles";

const FEATURED_IDS = ["1", "2", "3", "4"];

const badgeVariantMap = {
  "Hot Deal": "coral",
  "Just In": "neutral",
  "Low Mileage": "success",
} as const;

const featuredCars = FEATURED_IDS.map((id) => vehicles.find((vehicle) => vehicle.id === id)).filter(
  (vehicle) => vehicle !== undefined,
);

export function FeaturedCars() {
  return (
    <section id="featured-cars" className="section-padding bg-paper">
      <div className="container-site">
        <ScrollReveal>
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
        </ScrollReveal>

        <div className="carousel-snap mt-12 -mx-5 px-5 md:-mx-8 md:px-8">
          {featuredCars.map((car) => (
            <article
              key={car.id}
              className="w-[88vw] shrink-0 snap-center sm:w-[340px] md:w-[360px]"
            >
              <div className="card-elevated group overflow-hidden p-0">
                <Link href={`/cars/${car.id}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                    <Image
                      src={car.images[0]}
                      alt={`${car.make} ${car.model}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 88vw, 360px"
                    />
                    <div className="absolute left-4 top-4">
                      <Badge variant={badgeVariantMap[car.badge]}>{car.badge}</Badge>
                    </div>
                    <div className="absolute right-4 top-4 rounded-xl bg-green px-3 py-2 text-center shadow-lg">
                      <p className="font-display text-xl font-extrabold leading-none text-white">
                        {formatPrice(car.monthlyHp)}
                      </p>
                      <p className="text-[10px] font-bold tracking-wide text-white/85">
                        per month
                      </p>
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <h3 className="headline-md text-xl">
                      {car.make} {car.model}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{formatPrice(car.price)} vehicle price</p>
                    <span className="mt-5 flex min-h-11 w-full items-center justify-center rounded-full bg-green text-sm font-semibold text-white transition-colors group-hover:bg-green-deep">
                      View this car
                    </span>
                  </div>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
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
