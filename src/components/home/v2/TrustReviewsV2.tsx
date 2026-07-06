"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const AUTO_ADVANCE_MS = 5000;

const reviews = [
  {
    quote: "The soft search gave me confidence to apply. Approved the same day and I reserved my car online.",
    supporting:
      "Trust the process — Hero made car finance feel straightforward when other lenders had already said no.",
    name: "Sarah M.",
    role: "Driver, Manchester",
    avatar: "/images/avatars/sarah.jpg",
  },
  {
    quote: "One team handled everything — finance and the car. No back and forth with brokers.",
    supporting:
      "Having stock and finance under one roof saved weeks of hassle. I was driving within seven days.",
    name: "James T.",
    role: "Driver, Birmingham",
    avatar: "/images/avatars/james.jpg",
  },
  {
    quote: "Clear monthly payments, AA inspected car, and a smooth process from start to finish.",
    supporting:
      "The monthly HP payment was shown upfront on every car. No hidden fees and no broker runaround.",
    name: "Priya K.",
    role: "Driver, Leeds",
    avatar: "/images/avatars/priya.jpg",
  },
  {
    quote: "Been refused elsewhere before Hero. The soft search meant no risk, and I got a yes the same afternoon.",
    supporting:
      "I could check eligibility without worrying about my credit file — that made all the difference.",
    name: "David R.",
    role: "Driver, Bristol",
    avatar: "/images/avatars/david.jpg",
  },
  {
    quote: "Reserved my car online after seeing the exact monthly HP payment on the listing.",
    supporting:
      "Everything was transparent from the first click. Honest finance and a car I could actually reserve.",
    name: "Emma L.",
    role: "Driver, Glasgow",
    avatar: "/images/avatars/emma.jpg",
  },
  {
    quote: "From eligibility check to collecting my car, one team looked after me throughout.",
    supporting:
      "It felt like a premium experience — not the usual back-and-forth between a broker and a dealer.",
    name: "Michael H.",
    role: "Driver, London",
    avatar: "/images/avatars/michael.jpg",
  },
];

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function scrollAvatarIntoContainer(container: HTMLElement, activeButton: HTMLElement) {
  const isVertical = window.matchMedia("(min-width: 1024px)").matches;

  if (isVertical) {
    const targetTop =
      activeButton.offsetTop - container.clientHeight / 2 + activeButton.clientHeight / 2;
    container.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    return;
  }

  const targetLeft =
    activeButton.offsetLeft - container.clientWidth / 2 + activeButton.clientWidth / 2;
  container.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
}

export function TrustReviewsV2() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const avatarListRef = useRef<HTMLDivElement>(null);
  const skipInitialScroll = useRef(true);
  const review = reviews[active];

  useEffect(() => {
    if (paused) return;

    const interval = window.setInterval(() => {
      setActive((index) => (index + 1) % reviews.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    const container = avatarListRef.current;
    const activeButton = container?.querySelector<HTMLElement>(`[data-review-index="${active}"]`);
    if (!container || !activeButton) return;

    if (skipInitialScroll.current) {
      skipInitialScroll.current = false;
      return;
    }

    scrollAvatarIntoContainer(container, activeButton);
  }, [active]);

  const selectReview = (index: number) => {
    setActive(index);
    setPaused(true);
    window.setTimeout(() => setPaused(false), AUTO_ADVANCE_MS * 2);
  };

  return (
    <section id="trust-reviews" className="bg-mist-2 py-16 md:py-20 lg:py-24">
      <div className="w-full px-5">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-deep">
            What customers say
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Honest feedback from UK drivers
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">
            Real stories from customers who trusted Hero for finance and stock under one roof. Their
            words reflect the difference a soft-search-first journey can make.
          </p>
        </div>

        <div
          className="mx-auto mt-12 grid max-w-5xl gap-6 lg:mt-14 lg:grid-cols-[112px_1fr] lg:items-stretch lg:gap-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            ref={avatarListRef}
            className="flex h-28 gap-3 overflow-x-auto overflow-y-hidden pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:h-[min(420px,72vh)] lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((item, index) => {
              const isActive = index === active;

              return (
                <button
                  key={item.name}
                  type="button"
                  data-review-index={index}
                  onClick={() => selectReview(index)}
                  aria-pressed={isActive}
                  aria-label={`Read review from ${item.name}`}
                  className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-[20px] transition-all duration-300 sm:h-28 sm:w-28 ${
                    isActive
                      ? "border-2 border-green shadow-[0_8px_24px_rgba(91,43,212,0.2)]"
                      : "border-2 border-transparent grayscale opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image src={item.avatar} alt="" fill className="object-cover" sizes="112px" />
                </button>
              );
            })}
          </div>

          <article
            className="relative flex h-auto min-h-[280px] flex-col overflow-hidden rounded-[28px] bg-paper p-6 shadow-[0_20px_60px_rgba(30,22,53,0.08)] sm:p-8 md:p-10 lg:h-[min(420px,72vh)] lg:p-12"
            aria-live="polite"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-2 font-display text-[5rem] leading-none text-line/80 sm:right-6 sm:top-4 sm:text-[7rem] md:right-10 md:text-[8rem] lg:text-[10rem]"
            >
              &ldquo;
            </span>

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex-1">
                <p className="max-w-2xl font-display text-xl font-extrabold leading-snug tracking-tight text-ink sm:text-2xl md:text-3xl">
                  {review.quote}
                </p>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{review.supporting}</p>
              </div>

              <div className="mt-auto pt-8">
                <div className="border-t border-dashed border-line pb-6" />

                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-xl font-extrabold text-ink">{review.name}</p>
                    <p className="mt-1 text-sm text-muted">{review.role}</p>
                  </div>
                  <Stars />
                </div>
              </div>
            </div>
          </article>
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center font-display text-lg text-ink md:mt-14">
          See how straightforward car finance makes a difference?
        </p>
      </div>
    </section>
  );
}
