"use client";

import { useState } from "react";
import { type Vehicle } from "@/data/vehicles";
import { isEvOrHybrid } from "@/lib/vehicle/trust";
import { VehicleTrustPanel } from "@/components/trust/VehicleTrustPanel";
import { InspectionCard } from "@/components/trust/InspectionCard";
import { BatteryCard } from "@/components/trust/BatteryCard";
import { WarrantyBadge } from "@/components/trust/WarrantyBadge";
import { CertificateModal } from "@/components/trust/CertificateModal";
import { WarrantyOverviewModal } from "@/components/trust/WarrantyOverviewModal";
import { InformationTrigger } from "@/components/information/InformationTrigger";
import { type CertificateType, vehicleTrustContent } from "@/config/vehicleTrustContent";

interface VehicleTrustSectionProps {
  vehicle: Vehicle;
  compact?: boolean;
  onOpenWarranty?: () => void;
  className?: string;
}

export function VehicleTrustSection({
  vehicle,
  compact = false,
  onOpenWarranty,
  className = "",
}: VehicleTrustSectionProps) {
  const [certificateType, setCertificateType] = useState<CertificateType | null>(null);
  const [warrantyOpen, setWarrantyOpen] = useState(false);
  const showBattery = isEvOrHybrid(vehicle);
  const vehicleLabel = `${vehicle.make} ${vehicle.model}`;

  const handleWarrantyClick = () => {
    if (onOpenWarranty) {
      onOpenWarranty();
      return;
    }
    setWarrantyOpen(true);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <VehicleTrustPanel vehicle={vehicle} compact={compact} />

      {!compact ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <InspectionCard onViewCertificate={() => setCertificateType("inspection")} />
          {showBattery ? (
            <BatteryCard onViewReport={() => setCertificateType("battery")} />
          ) : null}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <button
            type="button"
            onClick={() => setCertificateType("inspection")}
            className="text-xs font-medium text-green-deep underline-offset-2 hover:underline"
          >
            {vehicleTrustContent.inspection.actionLabel}
          </button>
          <InformationTrigger topic="aaInspection" variant="learn-more" />
          {showBattery ? (
            <>
              <button
                type="button"
                onClick={() => setCertificateType("battery")}
                className="text-xs font-medium text-green-deep underline-offset-2 hover:underline"
              >
                {vehicleTrustContent.battery.actionLabel}
              </button>
              <InformationTrigger topic="batteryHealth" variant="learn-more" />
            </>
          ) : null}
        </div>
      )}

      <WarrantyBadge onClick={handleWarrantyClick} />

      <CertificateModal
        open={certificateType !== null}
        type={certificateType ?? "inspection"}
        vehicleLabel={vehicleLabel}
        registration={vehicle.registration}
        onClose={() => setCertificateType(null)}
      />

      {!onOpenWarranty ? (
        <WarrantyOverviewModal open={warrantyOpen} onClose={() => setWarrantyOpen(false)} />
      ) : null}
    </div>
  );
}
