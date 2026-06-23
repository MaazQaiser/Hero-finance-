import { type Vehicle, formatMileage } from "@/data/vehicles";

interface VehicleSummaryProps {
  vehicle: Vehicle;
}

export function VehicleSummary({ vehicle }: VehicleSummaryProps) {
  const specs = [
    { label: "Year", value: String(vehicle.year) },
    { label: "Reg", value: vehicle.registration },
    { label: "Miles", value: formatMileage(vehicle.mileage).replace(" miles", "") },
    { label: "Fuel", value: vehicle.fuel },
    { label: "Gearbox", value: vehicle.transmission },
  ];

  return (
    <section className="px-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-medium text-cream md:text-3xl">
          {vehicle.make} {vehicle.model}
        </h1>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="shrink-0 rounded-2xl border border-cream/10 bg-surface px-4 py-3"
            >
              <p className="text-[11px] uppercase tracking-wide text-cream-muted">
                {spec.label}
              </p>
              <p className="mt-0.5 text-sm font-medium text-cream">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
