"use client";

import { type CSSProperties } from "react";
import { type Vehicle } from "@/data/vehicles";
import { getVehicleTrustItems } from "@/lib/vehicle/trust";
import { vehicleTrustContent } from "@/config/vehicleTrustContent";
import { trustBadgeTopicMap } from "@/config/informationPanelsContent";
import { TrustBadge } from "@/components/trust/TrustBadge";
import { InformationTrigger } from "@/components/information/InformationTrigger";

interface VehicleTrustPanelProps {
  vehicle: Pick<Vehicle, "fuel" | "make" | "model">;
  compact?: boolean;
  className?: string;
}

export function VehicleTrustPanel({
  vehicle,
  compact = false,
  className = "",
}: VehicleTrustPanelProps) {
  const items = getVehicleTrustItems(vehicle);

  return (
    <div
      className={`motion-card rounded-2xl border border-line bg-mist-2 ${compact ? "p-3" : "p-4"} ${className}`}
      aria-label="Vehicle trust guarantees"
    >
      {!compact ? (
        <p className="mb-2.5 text-xs font-medium tracking-wide text-muted">
          {vehicleTrustContent.panelTitle}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => {
          const topic = trustBadgeTopicMap[item.id];

          return (
            <div key={item.id} className="inline-flex items-center gap-1">
              <TrustBadge
                label={item.label}
                className="approval-trust-item"
                style={{ animationDelay: `${index * 50}ms` } as CSSProperties}
              />
              {topic ? <InformationTrigger topic={topic} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
