"use client";

import { useEffect, useState } from "react";
import { HeroLogo } from "@/components/HeroLogo";
import { LoadingIndicator } from "@/components/apply/loading/LoadingIndicator";
import { LoadingStatus } from "@/components/apply/loading/LoadingStatus";
import { RotatingTrustMessage } from "@/components/apply/loading/RotatingTrustMessage";
import { VehicleJourneySummary } from "@/components/apply/VehicleJourneySummary";
import {
  ELIGIBILITY_LOADING_DURATION_MS,
  eligibilityLoadingStates,
  eligibilityRotatingTrustMessages,
  type LoadingStateMessage,
} from "@/config/loadingMessages";
import { type Vehicle } from "@/data/vehicles";

export { ELIGIBILITY_LOADING_DURATION_MS };

interface EligibilityLoadingProps {
  states?: LoadingStateMessage[];
  vehicle?: Vehicle | null;
}

export function EligibilityLoading({
  states = eligibilityLoadingStates,
  vehicle = null,
}: EligibilityLoadingProps) {
  const stepIndex = 0;
  const stepVisible = true;
  const [progress, setProgress] = useState(0.18);

  useEffect(() => {
    const start = window.setTimeout(() => setProgress(0.56), 700);
    const mid = window.setTimeout(() => setProgress(0.82), 1800);
    const end = window.setTimeout(() => setProgress(0.96), 3200);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(mid);
      window.clearTimeout(end);
    };
  }, []);

  const current = states[stepIndex] ?? states[0];

  return (
    <div className="flex min-h-[100svh] flex-col bg-paper">
      <header className="flex justify-center px-5 py-6">
        <HeroLogo className="h-7 w-auto" />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-5 pb-16 text-center">
        <LoadingIndicator progress={progress} />

        <div className="mt-10 w-full">
          <LoadingStatus
            title={current.title}
            description={current.description}
            visible={stepVisible}
          />
        </div>

        {vehicle ? (
          <div className="mt-8 w-full max-w-md text-left">
            <VehicleJourneySummary vehicle={vehicle} compact />
          </div>
        ) : null}

        <div className="mt-14 flex w-full justify-center border-t border-line/80 pt-4">
          <RotatingTrustMessage messages={eligibilityRotatingTrustMessages} />
        </div>
      </main>
    </div>
  );
}
