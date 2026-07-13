"use client";

import { useState } from "react";
import { CoverageList } from "@/components/decision/warranty/CoverageList";
import { notCoveredItems } from "@/lib/warranty/plans";

export function ProtectionSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-[var(--radius-card)] border border-line bg-paper">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-ink">Not covered</span>
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-mist text-ink transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-line px-5 pb-5 pt-1">
            <p className="mb-3 text-xs leading-relaxed text-muted">
              We keep exclusions clear so you know exactly what you&apos;re covered for.
            </p>
            <CoverageList title="" items={notCoveredItems} tone="neutral" />
          </div>
        </div>
      </div>
    </section>
  );
}
