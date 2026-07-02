import Image from "next/image";
import { type Vehicle, formatPrice } from "@/data/vehicles";

interface ReserveVehicleSummaryProps {
  vehicle: Vehicle;
}

export function ReserveVehicleSummary({ vehicle }: ReserveVehicleSummaryProps) {
  return (
    <div className="flex gap-4 rounded-[var(--radius-card)] border border-line bg-paper p-4">
      <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-2xl">
        <Image
          src={vehicle.images[0]}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover"
          sizes="128px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs tracking-wide text-muted">Selected vehicle</p>
        <h2 className="mt-1 font-medium text-ink">
          {vehicle.make} {vehicle.model}
        </h2>
        <p className="mt-1 text-sm text-muted">{vehicle.year} · Ref {vehicle.registration}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          <p className="text-sm text-ink">{formatPrice(vehicle.price)}</p>
          <p className="text-sm font-medium text-green-deep">
            {formatPrice(vehicle.monthlyHp)}/mo
          </p>
        </div>
      </div>
    </div>
  );
}
