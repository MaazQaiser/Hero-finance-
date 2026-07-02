"use client";

import Image from "next/image";
import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const reviews = [
  {
    quote:
      "The soft search gave me confidence to apply. Approved the same day and I reserved my car online — couldn't believe how smooth it was.",
    name: "Sarah M.",
    location: "Manchester",
    avatar: "/images/avatars/sarah.jpg",
  },
  {
    quote:
      "One team handled everything — finance and the car. No back and forth with brokers. I was driving within a week.",
    name: "James T.",
    location: "Birmingham",
    avatar: "/images/avatars/james.jpg",
  },
  {
    quote:
      "Clear monthly payments, AA inspected car, and a smooth process from start to finish. Exactly what I needed after being refused elsewhere.",
    name: "Priya K.",
    location: "Leeds",
    avatar: "/images/avatars/priya.jpg",
  },
  {
    quote:
      "Been refused by two other lenders before Hero. The soft search meant no risk, and I got a yes the same afternoon. Brilliant service.",
    name: "David R.",
    location: "Bristol",
    avatar: "/images/avatars/david.jpg",
  },
  {
    quote:
      "Reserved my Audi online after seeing the exact monthly HP payment. No hidden fees, no dealer games — just honest finance.",
    name: "Emma L.",
    location: "Glasgow",
    avatar: "/images/avatars/emma.jpg",
  },
  {
    quote:
      "From eligibility check to collecting my car, one team looked after me throughout. Felt like a premium experience, not a broker runaround.",
    name: "Michael H.",
    location: "London",
    avatar: "/images/avatars/michael.jpg",
  },
];

function Stars() {
  return (
    <div className="flex justify-center gap-1" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-ink" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function NavArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous review" : "Next review"}
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mist text-ink transition-colors hover:bg-line active:scale-95"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        {direction === "prev" ? (
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export function TrustReviews() {
  const [active, setActive] = useState(0);
  const review = reviews[active];

  const goPrev = () => setActive((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const goNext = () => setActive((i) => (i === reviews.length - 1 ? 0 : i + 1));

  return (
    <section id="trust-reviews" className="section-padding bg-paper">
      <div className="container-site">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center rounded-full bg-mist px-4 py-2 text-[13px] font-bold text-muted">
              What our customers say
            </span>

            <div className="mt-6">
              <Stars />
            </div>

            <div className="mt-10 flex min-w-0 items-center gap-3 sm:gap-4 md:gap-8">
              <NavArrow direction="prev" onClick={goPrev} />

              <blockquote className="min-w-0 flex-1">
                <p
                  key={active}
                  className="font-display text-xl font-extrabold leading-snug tracking-tight text-ink sm:text-2xl md:text-[1.75rem] lg:text-[2rem]"
                >
                  &ldquo;{review.quote}&rdquo;
                </p>
              </blockquote>

              <NavArrow direction="next" onClick={goNext} />
            </div>

            <p className="mt-6 text-sm font-medium text-muted">
              {review.name} · {review.location}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="flex gap-3 overflow-x-auto pb-2 sm:justify-center sm:overflow-visible">
              {reviews.map((item, index) => {
                const isActive = index === active;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-pressed={isActive}
                    aria-label={`Read review from ${item.name}`}
                    className={`flex min-w-[100px] flex-1 flex-col items-center rounded-[20px] px-3 py-4 transition-all duration-300 sm:min-w-[120px] sm:max-w-[140px] ${
                      isActive
                        ? "bg-green-bright shadow-[0_8px_28px_rgba(47,212,128,0.25)]"
                        : "bg-mist hover:bg-mist/80"
                    }`}
                  >
                    <span className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/80" aria-hidden>
                      <Image
                        src={item.avatar}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </span>
                    <span className="mt-2 text-sm font-semibold text-ink">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-6 text-center text-sm text-muted">
            <span className="font-bold text-ink">FCA regulated</span>
            <span className="hidden h-4 w-px bg-line sm:block" aria-hidden />
            <span>4.8★ Trustpilot rating</span>
            <span className="hidden h-4 w-px bg-line sm:block" aria-hidden />
            <span>10,000+ drivers financed</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
