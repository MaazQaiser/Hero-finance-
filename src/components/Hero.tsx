"use client";

import { useEffect, useState } from "react";
import { HeroCtas } from "@/components/HeroCtas";
import { HeroEligibilityCard } from "@/components/HeroEligibilityCard";
import { HeroTrustStats } from "@/components/HeroTrustStats";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-paper">
      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 flex-col px-5 pt-[72px] md:px-8 md:pt-[88px] lg:px-10">
        <div className="flex flex-1 items-center py-8 md:py-10 lg:py-12">
          <div
            className={`grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-10 xl:grid-cols-[58%_42%] xl:gap-12 ${
              mounted ? "" : "opacity-0"
            }`}
          >
            <div className={mounted ? "hero-fade-up" : ""}>
              <h1 className="cyclix-headline max-w-[640px] font-normal">
                Been refused before?{" "}
                <span className="hero-headline-accent">
                  You could still drive away.
                </span>
              </h1>

              <p className="mt-6 max-w-[520px] text-base font-normal leading-relaxed text-muted">
                We consider every credit story. Unlike brokers, we&apos;ve got real cars
                ready with decisions in under a minute with finance options tailored for
                you.
              </p>

              <div className="mt-10 hidden lg:block">
                <HeroCtas />
              </div>
            </div>

            <div className={mounted ? "hero-fade-up-delay" : ""}>
              <div
                id="hero-eligibility"
                className="relative mx-auto w-full max-w-[500px] scroll-mt-32 lg:mx-0"
              >
                <HeroEligibilityCard variant="cyclix" />
              </div>

              <div className="mt-10 lg:hidden">
                <HeroCtas />
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 pb-8 md:pb-10">
          <HeroTrustStats />
        </div>
      </div>
    </section>
  );
}
