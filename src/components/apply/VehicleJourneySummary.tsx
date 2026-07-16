"use client";

import Image from "next/image";
import { formatPrice, type Vehicle } from "@/data/vehicles";

interface VehicleJourneySummaryProps {
  vehicle: Vehicle;
}

export function VehicleJourneySummary({ vehicle }: VehicleJourneySummaryProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-[var(--radius-card)] border border-green/20 bg-paper">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={vehicle.images[0]}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover"
          sizes="(max-width: 512px) 100vw, 512px"
        />
      </div>
      <div className="p-4">
        <p className="text-xs tracking-wide text-muted">Continuing with</p>
        <p className="mt-1 text-lg font-medium text-ink">
          {vehicle.make} {vehicle.model}
        </p>
        <p className="mt-1 text-sm text-muted">
          Est. {formatPrice(vehicle.monthlyHp)}
          <span className="text-muted">/mo</span>
          <span className="mx-2 text-line">·</span>
          {formatPrice(vehicle.price)}
        </p>
      </div>
    </div>
  );
}
