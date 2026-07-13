"use client";

import { formatMileage } from "@/data/vehicles";

interface VehicleSpecsProps {
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
}

export function VehicleSpecs({ year, mileage, fuel, transmission }: VehicleSpecsProps) {
  const items = [String(year), formatMileage(mileage), fuel, transmission];

  return (
    <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="inline-flex items-center gap-2">
          {index > 0 ? <span aria-hidden>·</span> : null}
          <span>{item}</span>
        </span>
      ))}
    </div>
  );
}
