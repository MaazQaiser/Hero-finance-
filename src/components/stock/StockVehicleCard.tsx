import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  type SearchMode,
  type Vehicle,
  formatMileage,
  formatPrice,
} from "@/data/vehicles";

interface StockVehicleCardProps {
  vehicle: Vehicle;
  searchMode: SearchMode;
}

const badgeVariantMap = {
  "Hot Deal": "coral",
  "Just In": "neutral",
  "Low Mileage": "success",
} as const;

export function StockVehicleCard({ vehicle, searchMode }: StockVehicleCardProps) {
  const monthlyFirst = searchMode === "monthly";

  return (
    <article className="motion-card motion-card-interactive overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper">
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="carousel-snap absolute inset-0 h-full">
          {vehicle.images.map((image, index) => (
            <div
              key={`${vehicle.id}-${index}`}
              className="relative h-full min-w-full shrink-0 snap-center"
            >
            <Image
              src={image}
              alt={`${vehicle.make} ${vehicle.model} view ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          ))}
        </div>
        <div className="pointer-events-none absolute left-4 top-4 z-10">
          <Badge variant={badgeVariantMap[vehicle.badge]}>{vehicle.badge}</Badge>
        </div>
      </div>

      <div className="p-4 md:p-5">
        <h3 className="text-lg font-medium text-ink">
          {vehicle.make} {vehicle.model}
        </h3>

        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
          <span>{vehicle.year}</span>
          <span>·</span>
          <span>{formatMileage(vehicle.mileage)}</span>
          <span>·</span>
          <span>{vehicle.fuel}</span>
          <span>·</span>
          <span>{vehicle.transmission}</span>
        </div>

        <div
          className={`mt-4 rounded-2xl border border-line bg-mist p-4 ${
            monthlyFirst ? "flex flex-col-reverse" : ""
          }`}
        >
          <div className={monthlyFirst ? "mt-3" : ""}>
            <p className="text-xs tracking-wide text-muted">Vehicle price</p>
            <p className="text-lg font-medium text-ink">{formatPrice(vehicle.price)}</p>
          </div>

          <div className={monthlyFirst ? "" : "mt-3 border-t border-line pt-3"}>
            <p className="text-xs tracking-wide text-muted">Monthly HP</p>
            <p className="text-2xl font-medium text-green-deep md:text-3xl">
              {formatPrice(vehicle.monthlyHp)}
              <span className="text-sm font-normal text-muted">/mo</span>
            </p>
          </div>
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          Representative HP example. Subject to status and affordability checks.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="secondary" fullWidth href={`/apply?vehicle=${vehicle.id}`}>
            Apply Now
          </Button>
          <Link href={`/cars/${vehicle.id}`} className="block">
            <Button fullWidth>View Car</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
