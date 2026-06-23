"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

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
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-cream/10 bg-charcoal/95 p-4 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-3">
        <Button fullWidth size="lg" href="/apply" className="shadow-lg shadow-coral/20">
          Check Eligibility
        </Button>
        <a
          href="tel:08001234567"
          className="inline-flex min-h-[3rem] shrink-0 items-center justify-center rounded-full border border-cream/25 px-5 text-sm font-medium text-cream transition-colors hover:border-cream/50"
        >
          Call Now
        </a>
      </div>
    </div>
  );
}
