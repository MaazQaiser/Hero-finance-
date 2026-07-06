import Image from "next/image";
import { type ReactNode } from "react";

interface HeroVisualPanelProps {
  children: ReactNode;
}

export function HeroVisualPanel({ children }: HeroVisualPanelProps) {
  return (
    <div className="relative mx-auto w-full max-w-[480px] lg:max-w-none">
      <div
        aria-hidden
        className="hero-diagonal-accent absolute -left-3 top-4 bottom-4 right-2 rounded-[24px] bg-green-bright lg:-left-5 lg:top-6 lg:bottom-6"
      />

      <div className="hero-diagonal-image relative min-h-[280px] overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(30,22,53,0.15)] sm:min-h-[340px] lg:min-h-[520px]">
        <Image
          src="/images/dealer/customer-keys.jpg"
          alt="Happy customer receiving keys at a used car dealership"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 90vw, 45vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent"
        />
      </div>

      <div className="relative z-10 -mt-16 px-3 pb-2 sm:-mt-20 lg:absolute lg:inset-x-4 lg:bottom-6 lg:mt-0 lg:px-0">
        {children}
      </div>
    </div>
  );
}
