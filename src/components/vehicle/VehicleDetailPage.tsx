"use client";

import { useMemo, useState } from "react";
import {
  type Vehicle,
  calculateHpMonthly,
  getRelatedVehicles,
} from "@/data/vehicles";
import { VehicleBuyToOrder } from "@/components/vehicle/VehicleBuyToOrder";
import { VehicleFinanceCalculator } from "@/components/vehicle/VehicleFinanceCalculator";
import { VehicleGallery } from "@/components/vehicle/VehicleGallery";
import { VehiclePricingBlock } from "@/components/vehicle/VehiclePricingBlock";
import { VehicleRelatedCars } from "@/components/vehicle/VehicleRelatedCars";
import { VehicleSpecsAccordion } from "@/components/vehicle/VehicleSpecsAccordion";
import { VehicleStickyCta } from "@/components/vehicle/VehicleStickyCta";
import { VehicleSummary } from "@/components/vehicle/VehicleSummary";
import { VehicleTopNav } from "@/components/vehicle/VehicleTopNav";
import { VehicleTrustSection } from "@/components/trust/VehicleTrustSection";
import { DealerAdvantageCard } from "@/components/trust/DealerAdvantageCard";

interface VehicleDetailPageProps {
  vehicle: Vehicle;
  fromFinanceFlow?: boolean;
}

export function VehicleDetailPage({
  vehicle,
  fromFinanceFlow = false,
}: VehicleDetailPageProps) {
  const [deposit, setDeposit] = useState(0);
  const [termMonths, setTermMonths] = useState(48);

  const monthlyPayment = useMemo(
    () => calculateHpMonthly(vehicle.price, deposit, termMonths, vehicle.apr),
    [vehicle.price, vehicle.apr, deposit, termMonths],
  );

  const relatedVehicles = useMemo(
    () => getRelatedVehicles(vehicle),
    [vehicle],
  );

  return (
    <>
      <VehicleTopNav showFinanceProgress={fromFinanceFlow} />

      <main className="space-y-6 pb-36 pt-0 md:space-y-8 md:pb-28">
        <VehicleGallery vehicle={vehicle} />
        <VehicleSummary vehicle={vehicle} />
        <VehiclePricingBlock
          monthlyPayment={monthlyPayment}
          vehiclePrice={vehicle.price}
          apr={vehicle.apr}
          deposit={deposit}
          termMonths={termMonths}
        />
        <VehicleFinanceCalculator
          vehiclePrice={vehicle.price}
          apr={vehicle.apr}
          deposit={deposit}
          termMonths={termMonths}
          monthlyPayment={monthlyPayment}
          onDepositChange={setDeposit}
          onTermChange={setTermMonths}
        />
        <section className="px-5 md:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl space-y-5">
            <VehicleTrustSection vehicle={vehicle} />
            <DealerAdvantageCard />
          </div>
        </section>
        <VehicleSpecsAccordion specs={vehicle.specs} />
        <VehicleRelatedCars vehicles={relatedVehicles} />
        <VehicleBuyToOrder />
      </main>

      <VehicleStickyCta monthlyPayment={monthlyPayment} vehicleId={vehicle.id} />
    </>
  );
}
