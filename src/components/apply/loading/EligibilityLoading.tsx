"use client";

import { useEffect, useState } from "react";
import { HeroLogo } from "@/components/HeroLogo";
import { LoadingIndicator } from "@/components/apply/loading/LoadingIndicator";
import { LoadingStatus } from "@/components/apply/loading/LoadingStatus";
import { RotatingTrustMessage } from "@/components/apply/loading/RotatingTrustMessage";
import {
  ELIGIBILITY_LOADING_DURATION_MS,
  ELIGIBILITY_STATE_FADE_MS,
  ELIGIBILITY_STATE_HOLD_MS,
  eligibilityLoadingStates,
  eligibilityRotatingTrustMessages,
  type LoadingStateMessage,
} from "@/config/loadingMessages";

export { ELIGIBILITY_LOADING_DURATION_MS };

interface EligibilityLoadingProps {
  states?: LoadingStateMessage[];
}

export function EligibilityLoading({
  states = eligibilityLoadingStates,
}: EligibilityLoadingProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [stepVisible, setStepVisible] = useState(true);

  useEffect(() => {
    if (states.length <= 1) return;

    const timers: number[] = [];

    states.forEach((_, index) => {
      if (index === 0) return;
      timers.push(
        window.setTimeout(() => {
          setStepVisible(false);
          window.setTimeout(() => {
            setStepIndex(index);
            setStepVisible(true);
          }, ELIGIBILITY_STATE_FADE_MS);
        }, index * ELIGIBILITY_STATE_HOLD_MS),
      );
    });

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [states]);

  const progress = (stepIndex + 1) / states.length;
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

        <div className="mt-4 flex items-center justify-center gap-2" aria-hidden>
          {states.map((state, index) => (
            <span
              key={state.title}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === stepIndex
                  ? "w-6 bg-green"
                  : index < stepIndex
                    ? "w-1.5 bg-green/50"
                    : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>

        <div className="mt-14 flex w-full justify-center border-t border-line/80 pt-4">
          <RotatingTrustMessage messages={eligibilityRotatingTrustMessages} />
        </div>
      </main>
    </div>
  );
}
