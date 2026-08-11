"use client";

import Image from "next/image";
import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const steps = [
  {
    number: "01",
    label: "Tell us about yourself",
    image: "/images/dealer/sales-handshake.jpg",
    imageAlt: "Customer and dealer in consultation at a car dealership",
    objectPosition: "center",
  },
  {
    number: "02",
    label: "We search specialist lenders",
    image: "/images/finance/fixed-payments.jpg",
    imageAlt: "Customer reviewing finance options with a dealer",
    objectPosition: "center",
  },
  {
    number: "03",
    label: "Choose your finance",
    image: "/images/how-it-works/choose-your-car.jpg",
    imageAlt: "Second-hand cars parked on a dealership forecourt",
    objectPosition: "center",
  },
  {
    number: "04",
    label: "Drive away",
    image: "/images/dealer/keys-handover.jpg",
    imageAlt: "Handing over car keys after arranging finance",
    objectPosition: "center",
  },
];

const SOFT_SEARCH_BODY =
  "Start with a soft search that has no impact on your credit score, then browse AA Inspected Vehicles and arrange the finance and the car with one team.";

function StepConnector() {
  return (
    <div className="flex justify-center py-1" aria-hidden>
      <svg className="h-5 w-5 text-green/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function HowItWorksV2() {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];

  return (
    <section id="how-it-works" className="bg-mist-2 py-16 md:py-20 lg:py-24">
      <div className="w-full px-5">
        <ScrollReveal>
          <h2 className="max-w-3xl font-display text-2xl uppercase leading-tight tracking-tight sm:text-3xl lg:text-[2.5rem]">
            <span className="font-extrabold text-ink">How car finance works </span>
            <span className="font-medium">
              <span className="text-ink">from planning </span>
              <span className="text-green">to keys</span>
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-2 lg:items-start lg:gap-10">
            <nav aria-label="How it works steps" className="flex flex-col gap-0">
              {steps.map((item, index) => {
                const isActive = index === activeStep;

                return (
                  <div key={item.number}>
                    <button
                      type="button"
                      onClick={() => setActiveStep(index)}
                      aria-current={isActive ? "step" : undefined}
                      className={`flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all duration-300 sm:gap-5 sm:px-5 sm:py-5 ${
                        isActive
                          ? "bg-paper text-ink shadow-[0_8px_28px_rgba(30,22,53,0.08)] ring-1 ring-line"
                          : "text-muted hover:bg-paper/70 hover:text-ink"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors sm:h-11 sm:w-11 sm:text-base ${
                          isActive
                            ? "bg-green-bright text-ink"
                            : "bg-mist text-muted"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className={`text-base font-semibold leading-snug sm:text-lg ${isActive ? "text-ink" : ""}`}>
                        {item.label}
                      </span>
                    </button>
                    {index < steps.length - 1 ? <StepConnector /> : null}
                  </div>
                );
              })}
            </nav>

            <div className="relative min-h-[240px] overflow-hidden rounded-[28px] sm:min-h-[300px] lg:min-h-[420px]">
              <Image
                key={step.image}
                src={step.image}
                alt={step.imageAlt}
                fill
                className="object-cover transition-opacity duration-500"
                style={{ objectPosition: step.objectPosition }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-[1.65fr_1fr] lg:items-stretch lg:gap-6">
          <ScrollReveal delay={120} className="h-full">
            <div className="grid h-full overflow-hidden rounded-[32px] bg-paper lg:grid-cols-[minmax(0,35%)_1fr] lg:items-stretch">
              <div className="flex flex-col p-8 md:p-10 lg:pr-4">
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
                  One place for your car and your finance
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  We arrange your car finance through a panel of lenders and supply the car, so it is
                  all in one place. Browse AA Inspected Vehicles, see the monthly payment, and
                  reserve, with no chasing a separate dealer.
                </p>
              </div>

              <div className="relative m-4 min-h-[220px] overflow-hidden rounded-[24px] lg:m-4 lg:min-h-0 lg:self-stretch">
                <Image
                  src="/images/dealer/handshake.jpg"
                  alt="Dealer and customer shaking hands in the showroom"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={180} className="h-full">
            <div className="flex h-full flex-col justify-center overflow-hidden rounded-[32px] bg-green p-8 md:p-10">
              <p className="text-4xl font-normal text-white md:text-5xl lg:text-[3.25rem] lg:leading-none">
                Soft search
              </p>
              <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                Soft search, no impact on your credit score.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/85">{SOFT_SEARCH_BODY}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
