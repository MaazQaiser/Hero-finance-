"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { type Vehicle, formatPrice } from "@/data/vehicles";
import { VehicleSpecs } from "@/components/decision/recommended/VehicleSpecs";
import { VehicleTrustSection } from "@/components/trust/VehicleTrustSection";

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
  onOpenWarranty?: () => void;
}

export function VehicleCard({ vehicle, index = 0, onOpenWarranty }: VehicleCardProps) {
  const delayClass =
    index === 0
      ? "hero-fade-up-delay"
      : index === 1
        ? "hero-fade-up-delay-2"
        : index === 2
          ? "hero-fade-up-delay-3"
          : index === 3
            ? "hero-fade-up-delay-4"
            : "hero-fade-up-delay-5";

  return (
    <article
      className={`motion-card motion-card-interactive group overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper ${delayClass}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={vehicle.images[0]}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 85vw, 280px"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-ink">
          {vehicle.make} {vehicle.model}
        </h3>

        <VehicleSpecs
          year={vehicle.year}
          mileage={vehicle.mileage}
          fuel={vehicle.fuel}
          transmission={vehicle.transmission}
        />

        <div className="mt-4 rounded-2xl border border-line bg-mist p-3.5">
          <p className="text-xs tracking-wide text-muted">Est. monthly HP</p>
          <p className="mt-0.5 text-2xl font-medium text-green-deep">
            {formatPrice(vehicle.monthlyHp)}
            <span className="text-sm font-normal text-muted">/mo</span>
          </p>
          <p className="mt-2 text-sm text-muted">
            Vehicle price <span className="font-medium text-ink">{formatPrice(vehicle.price)}</span>
          </p>
        </div>

        <VehicleTrustSection
          vehicle={vehicle}
          compact
          onOpenWarranty={onOpenWarranty}
          className="mt-3"
        />

        <Link href={`/cars/${vehicle.id}`} className="mt-4 block">
          <Button fullWidth size="md">
            View Vehicle
          </Button>
        </Link>
      </div>
    </article>
  );
}
