"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useLandingVariant } from "@/components/landing/LandingVariantProvider";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);
  const { variant, applyHref } = useLandingVariant();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/95 p-4 shadow-[0_-12px_32px_rgba(30,22,53,0.1)] backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-3">
        <Button fullWidth size="lg" href={applyHref} className="bg-green-bright text-ink hover:bg-green-bright/90">
          {variant.cta}
        </Button>
        <a
          href="tel:08001234567"
          className="btn-outline-mist min-h-[3rem] shrink-0 px-5 text-sm"
        >
          Call Now
        </a>
      </div>
    </div>
  );
}
