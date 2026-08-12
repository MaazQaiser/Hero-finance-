"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HeroTrustStats } from "@/components/HeroTrustStats";
import { HeroV2FormPanel } from "@/components/home/v2/HeroV2FormPanel";
import { useLandingVariant } from "@/components/landing/LandingVariantProvider";

export function HeroV2() {
  const [mounted, setMounted] = useState(false);
  const { variant } = useLandingVariant();

  useEffect(() => {
    setMounted(true);
  }, []);

  const supportingCopy =
    variant.id === "default"
      ? "Soft search across specialist lenders, then browse AA Inspected Vehicles with one trusted team."
      : variant.supportingCopy;

  return (
    <section className="bg-paper pb-6 pt-3 md:pb-8 md:pt-4">
      <div className="w-full px-5">
        <div
          className={`relative min-h-[clamp(420px,calc(100svh-7.5rem),680px)] overflow-hidden rounded-[28px] transition-opacity duration-700 md:rounded-[32px] ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src="/images/v2/hero-owner-car.jpg"
            alt="Happy customer holding car keys beside a second-hand car on a dealership forecourt"
            fill
            priority
            className="object-cover object-[78%_top] sm:object-[72%_top] lg:object-[68%_top]"
            sizes="(max-width: 1320px) 100vw, 1320px"
          />

          {/* Strong left scrim keeps copy readable and clear of the face */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/72 to-ink/15 sm:from-ink/90 sm:via-ink/55 sm:to-transparent lg:from-ink/88 lg:via-ink/40 lg:to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent sm:from-ink/55 sm:via-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-[min(72%,520px)] bg-gradient-to-r from-green-deep/55 via-green-deep/20 to-transparent lg:w-[min(58%,560px)]"
          />

          <div className="relative flex min-h-[clamp(420px,calc(100svh-7.5rem),680px)] items-end">
            <div className="grid w-full min-w-0 items-end gap-6 p-8 sm:gap-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-10 lg:p-16 xl:grid-cols-[minmax(0,1fr)_400px]">
              <div
                className={`min-w-0 max-w-[20rem] text-white sm:max-w-md lg:max-w-xl ${
                  mounted ? "hero-fade-up" : ""
                }`}
              >
                <h1 className="font-display max-w-[11ch] text-[2rem] font-medium leading-[1.1] tracking-tight sm:max-w-[14ch] sm:text-[2.35rem] lg:max-w-none lg:text-[2.85rem] xl:text-[3.15rem]">
                  {variant.introHeading}
                </h1>

                <p className="mt-4 max-w-[32ch] text-[15px] leading-[1.7] text-white/90 sm:mt-5 sm:max-w-[38ch] sm:text-base sm:leading-[1.7] md:text-[17px] lg:mt-6 lg:max-w-[40ch]">
                  {supportingCopy}
                </p>
              </div>

              <div
                id="hero-eligibility"
                className={`min-w-0 w-full ${mounted ? "hero-fade-up-delay" : ""}`}
              >
                <HeroV2FormPanel />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-5xl md:mt-8">
          <HeroTrustStats />
        </div>
      </div>
    </section>
  );
}
