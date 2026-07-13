"use client";

import { Button } from "@/components/ui/Button";
import { type Vehicle, vehicles } from "@/data/vehicles";
import { VehicleCard } from "@/components/decision/recommended/VehicleCard";

interface RecommendedCarsSectionProps {
  /** Optional approval amount — used to curate a shortlist from mock stock */
  approvedAmount?: number;
  limit?: number;
}

function getRecommendedVehicles(approvedAmount?: number, limit = 4): Vehicle[] {
  const budget = approvedAmount && approvedAmount > 0 ? approvedAmount : 25000;
  const withinBudget = vehicles.filter((vehicle) => vehicle.price <= budget * 1.05);

  const shortlist = (withinBudget.length >= 3 ? withinBudget : vehicles).slice(0, limit);
  return shortlist;
}

export function RecommendedCarsSection({
  approvedAmount,
  limit = 4,
}: RecommendedCarsSectionProps) {
  const recommended = getRecommendedVehicles(approvedAmount, Math.min(Math.max(limit, 3), 5));

  return (
    <section className="hero-fade-up-delay-6 space-y-5 border-t border-line pt-8">
      <div>
        <h2 className="text-xl font-medium text-ink md:text-2xl">Recommended for your approval</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Based on your finance approval, these vehicles may be a great fit.
        </p>
      </div>

      <div className="carousel-snap -mx-5 px-5 pb-1">
        {recommended.map((vehicle, index) => (
          <div key={vehicle.id} className="w-[78vw] shrink-0 snap-center sm:w-[280px]">
            <VehicleCard vehicle={vehicle} index={index} />
          </div>
        ))}
      </div>

      <div className="pt-1">
        <Button variant="secondary" fullWidth size="lg" href="/cars">
          Browse All Cars
        </Button>
      </div>
    </section>
  );
}
