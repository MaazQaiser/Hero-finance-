import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { type Vehicle, formatPrice } from "@/data/vehicles";

interface VehicleRelatedCarsProps {
  vehicles: Vehicle[];
}

export function VehicleRelatedCars({ vehicles }: VehicleRelatedCarsProps) {
  if (vehicles.length === 0) return null;

  return (
    <section className="px-5 pb-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-lg font-medium text-cream">Similar cars you may like</h2>

        <div className="carousel-snap mt-4 -mx-5 px-5 md:-mx-8 md:px-8">
          {vehicles.map((vehicle) => (
            <article
              key={vehicle.id}
              className="w-[78vw] shrink-0 snap-center sm:w-[280px]"
            >
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-cream/10 bg-surface">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={vehicle.images[0]}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-cream">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="mt-2 text-xl font-medium text-coral">
                    {formatPrice(vehicle.monthlyHp)}
                    <span className="text-sm font-normal text-cream-muted">/mo</span>
                  </p>
                  <p className="text-sm text-cream-muted">{formatPrice(vehicle.price)}</p>
                  <Link href={`/cars/${vehicle.id}`} className="mt-4 block">
                    <Button variant="secondary" fullWidth>
                      View Car
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
