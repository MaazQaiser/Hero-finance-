"use client";

import Image from "next/image";
import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLandingVariant } from "@/components/landing/LandingVariantProvider";

const steps = [
  {
    number: "01",
    label: "Check eligibility",
    image: "/images/how-it-works/check-eligibility.jpg",
    imageAlt: "Person checking car finance eligibility on their phone",
    objectPosition: "center",
  },
  {
    number: "02",
    label: "Get approved",
    image: "/images/finance/fixed-payments.jpg",
    imageAlt: "Customer and dealer shaking hands after finance approval",
    objectPosition: "center",
  },
  {
    number: "03",
    label: "Choose your car",
    image: "/images/how-it-works/choose-your-car.jpg",
    imageAlt: "Many second-hand cars parked on a dealership forecourt",
    objectPosition: "center",
  },
  {
    number: "04",
    label: "Drive away",
    image: "/images/dealer/customer-keys.jpg",
    imageAlt: "Customer receiving keys to their second-hand car",
    objectPosition: "center",
  },
];

export function HowItWorksV2() {
  const [activeStep, setActiveStep] = useState(0);
  const { variant } = useLandingVariant();
  const step = steps[activeStep];

  return (
    <section id="how-it-works" className="bg-mist-2 py-16 md:py-20 lg:py-24">
      <div className="w-full px-5">
        <ScrollReveal>
          <h2 className="max-w-3xl font-display text-2xl uppercase leading-tight tracking-tight sm:text-3xl lg:text-[2.5rem]">
            <span className="font-extrabold text-ink">How it works </span>
            <span className="font-medium">
              <span className="text-ink">from planning </span>
              <span className="text-green">to keys</span>
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
            <nav className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0">
              {steps.map((item, index) => {
                const isActive = index === activeStep;

                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    aria-current={isActive ? "step" : undefined}
                    className={`shrink-0 rounded-full px-5 py-3 text-left text-sm font-semibold transition-all duration-300 lg:w-full lg:px-6 lg:py-4 lg:text-base ${
                      isActive
                        ? "bg-green text-white shadow-[0_8px_24px_rgba(91,43,212,0.3)]"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    <span className={isActive ? "text-white/80" : "text-muted/70"}>{item.number}</span>{" "}
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="relative min-h-[240px] overflow-hidden rounded-[28px] sm:min-h-[280px] lg:min-h-[320px]">
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
                  One roof for your car and HP finance
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  Unlike traditional brokers, Hero owns the stock. Browse AA-inspected vehicles, see
                  your monthly payment, and reserve — all without chasing a dealer.
                </p>
              </div>

              <div className="relative m-4 min-h-[220px] overflow-hidden rounded-[24px] lg:m-4 lg:min-h-0 lg:self-stretch">
                <Image
                  src="/images/dealer/sales-handshake.jpg"
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
                {variant.reassuranceHeadline}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/85">{variant.reassuranceBody}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
