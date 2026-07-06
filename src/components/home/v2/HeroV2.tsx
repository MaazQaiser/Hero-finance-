"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HeroTrustStats } from "@/components/HeroTrustStats";
import { HeroV2FormPanel } from "@/components/home/v2/HeroV2FormPanel";

export function HeroV2() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            className="object-cover object-[68%_22%]"
            sizes="(max-width: 1320px) 100vw, 1320px"
          />

          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-green-deep/90 via-green/55 to-green/10 lg:from-green-deep/85 lg:via-green/40 lg:to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-green-deep/40 via-transparent to-transparent"
          />

          <div className="relative flex min-h-[clamp(420px,calc(100svh-7.5rem),680px)] items-end">
            <div className="grid w-full min-w-0 items-end gap-6 p-8 sm:gap-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-10 lg:p-16 xl:grid-cols-[minmax(0,1fr)_400px]">
              <div
                className={`min-w-0 max-w-xl text-white ${mounted ? "hero-fade-up" : ""}`}
              >
                <h1 className="font-display max-w-[12ch] text-[2rem] font-medium leading-[1.06] tracking-tight sm:max-w-none sm:text-[2.35rem] lg:text-[2.85rem] xl:text-[3.15rem]">
                  Been refused before? You could still drive away.
                </h1>

                <p className="mt-5 max-w-[38ch] text-base leading-[1.65] text-white/88 md:text-[17px] lg:mt-6 lg:max-w-[42ch]">
                  We consider every credit story. Unlike brokers, we&apos;ve got real cars ready
                  with decisions in under a minute with finance options tailored for you.
                </p>
              </div>

              <div className={`min-w-0 w-full ${mounted ? "hero-fade-up-delay" : ""}`}>
                <HeroV2FormPanel />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-[980px] md:mt-8">
          <HeroTrustStats />
        </div>
      </div>
    </section>
  );
}
