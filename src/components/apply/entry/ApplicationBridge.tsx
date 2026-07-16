"use client";

import { useEffect } from "react";
import { LoadingIndicator } from "@/components/apply/loading/LoadingIndicator";
import { AmbientTrust } from "@/components/apply/AmbientTrust";
import { VehicleJourneySummary } from "@/components/apply/VehicleJourneySummary";
import { useJourneyBehaviour } from "@/components/apply/JourneyVariantProvider";
import { BRIDGE_LOADING_DURATION_MS, bridgeLoadingMessage } from "@/config/loadingMessages";
import { getVehicleById } from "@/data/vehicles";

interface ApplicationBridgeProps {
  onContinue: () => void;
  vehicleId?: string;
}

export function ApplicationBridge({ onContinue, vehicleId }: ApplicationBridgeProps) {
  const behaviour = useJourneyBehaviour();
  const summaryVehicle =
    behaviour.showVehicleSummary && vehicleId ? getVehicleById(vehicleId) : null;

  useEffect(() => {
    const timer = window.setTimeout(onContinue, BRIDGE_LOADING_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="bg-paper">
      <main className="mx-auto flex max-w-lg flex-col justify-center px-5 pb-12 pt-8 text-center md:px-8">
        <div className="mx-auto mb-8">
          <LoadingIndicator progress={0.45} />
        </div>

        <h1 className="headline-md">Preparing your full application</h1>
        <p className="body-lg mx-auto mt-4 max-w-md">
          We&apos;re moving you from the quick check into the full finance application.
        </p>

        {summaryVehicle ? (
          <div className="mx-auto mt-6 max-w-md text-left">
            <VehicleJourneySummary vehicle={summaryVehicle} compact />
          </div>
        ) : null}

        <div className="mt-8 flex justify-center border-t border-line/80 pt-3">
          <AmbientTrust
            message={{ description: bridgeLoadingMessage }}
            className="w-full max-w-sm border-t-0 pt-0"
          />
        </div>
      </main>
    </div>
  );
}
