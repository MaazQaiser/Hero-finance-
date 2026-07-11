"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

interface CalculatorStickyCtaProps {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CalculatorStickyCta({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CalculatorStickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/95 p-4 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-lg gap-3">
        {secondaryLabel && secondaryHref && (
          <Button variant="secondary" size="lg" href={secondaryHref} className="shrink-0 px-5">
            {secondaryLabel}
          </Button>
        )}
        <Button fullWidth size="lg" href={primaryHref} className="bg-green-bright text-ink hover:bg-green-bright/90">
          {primaryLabel}
        </Button>
      </div>
    </div>
  );
}
