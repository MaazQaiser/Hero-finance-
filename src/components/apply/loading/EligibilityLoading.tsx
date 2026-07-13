"use client";

import { useEffect, useState } from "react";
import { HeroLogo } from "@/components/HeroLogo";
import { LoadingIndicator } from "@/components/apply/loading/LoadingIndicator";
import { LoadingMessage } from "@/components/apply/loading/LoadingMessage";
import { LoadingStep } from "@/components/apply/loading/LoadingStep";

export interface EligibilityLoadingState {
  title: string;
  description: string;
}

const DEFAULT_STATES: EligibilityLoadingState[] = [
  {
    title: "Reviewing your application",
    description: "We're securely checking the information you've provided.",
  },
  {
    title: "Finding suitable finance options",
    description: "Matching your application with finance providers.",
  },
  {
    title: "Preparing your result",
    description: "Almost finished. We're putting everything together.",
  },
];

/** Total prototype duration — keep in sync with ApplyFlow redirect timing */
export const ELIGIBILITY_LOADING_DURATION_MS = 4500;
const STATE_HOLD_MS = 1400;
const FADE_MS = 300;

interface EligibilityLoadingProps {
  states?: EligibilityLoadingState[];
}

export function EligibilityLoading({ states = DEFAULT_STATES }: EligibilityLoadingProps) {
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
          }, FADE_MS);
        }, index * STATE_HOLD_MS),
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
          <LoadingStep
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
                index === stepIndex ? "w-6 bg-green" : index < stepIndex ? "w-1.5 bg-green/50" : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>

        <div className="mt-14 flex w-full justify-center">
          <LoadingMessage />
        </div>
      </main>
    </div>
  );
}
