"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLandingVariant } from "@/components/landing/LandingVariantProvider";

function ArrowIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FinalCta() {
  const { variant, applyHref } = useLandingVariant();

  return (
    <section className="section-padding bg-mist-2">
      <div className="container-site">
        <ScrollReveal>
          <div className="relative min-h-[480px] overflow-hidden rounded-[32px] md:min-h-[520px]">
            <Image
              src="/images/cta-handshake-car.jpg"
              alt="Customer and dealer shaking hands in front of a car at a dealership"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-transparent" />

            <div className="relative flex h-full min-h-[480px] items-center p-5 sm:p-8 md:min-h-[520px] md:p-10 lg:p-14">
              <div className="w-full max-w-[500px] rounded-[24px] bg-white p-7 shadow-[0_24px_64px_rgba(30,22,53,0.18)] md:p-9 lg:p-10">
                <span className="inline-flex rounded-full bg-mist px-4 py-2 text-sm font-semibold text-ink">
                  Get started today
                </span>

                <h2 className="headline-lg mt-5 text-ink">
                  Find out where you stand today
                </h2>

                <div className="mt-5 space-y-1 text-sm font-medium text-ink">
                  <p>Takes about 60 seconds</p>
                  <p>{variant.firstReassurance}</p>
                </div>

                <p className="mt-5 text-base leading-relaxed text-muted">
                  {variant.supportingCopy}
                </p>

                <div className="mt-8 space-y-3">
                  <Link
                    href={applyHref}
                    className="flex w-full items-center justify-between rounded-full bg-green-bright px-6 py-4 text-base font-bold text-ink shadow-[0_8px_24px_rgba(223,255,77,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-bright/90 hover:shadow-[0_12px_32px_rgba(223,255,77,0.42)]"
                  >
                    <span>{variant.cta}</span>
                    <ArrowIcon />
                  </Link>

                  <Link
                    href="/cars"
                    className="flex w-full items-center justify-between rounded-full border border-line bg-mist-2 px-6 py-4 text-base font-semibold text-ink transition-all duration-300 hover:border-green/30 hover:bg-mist"
                  >
                    <span>Browse cars first</span>
                    <ArrowIcon />
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                  <span className="flex items-center gap-2">
                    <span className="text-green-deep">✓</span> FCA regulated
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-green-deep">✓</span> Soft search only
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-green-deep">✓</span> AA inspected stock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
