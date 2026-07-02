"use client";

import Link from "next/link";
import { useState } from "react";

interface VehicleTopNavProps {
  showFinanceProgress?: boolean;
}

export function VehicleTopNav({ showFinanceProgress = false }: VehicleTopNavProps) {
  const [saved, setSaved] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-paper/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3 md:px-8 lg:px-12">
        <Link
          href="/cars"
          className="flex min-h-11 min-w-11 items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-green-deep"
        >
          <span aria-hidden>←</span>
          <span className="hidden sm:inline">Back</span>
        </Link>

        {showFinanceProgress && (
          <div className="hidden flex-1 px-4 md:block">
            <div className="mx-auto max-w-xs">
              <p className="mb-1 text-center text-[11px] tracking-wide text-muted">
                Finance application
              </p>
              <div className="h-1.5 overflow-hidden rounded-full bg-cream/10">
                <div className="h-full w-2/3 rounded-full bg-green" />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSaved((value) => !value)}
            aria-label={saved ? "Remove from saved" : "Save vehicle"}
            aria-pressed={saved}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-mist text-ink transition-colors hover:border-line"
          >
            {saved ? "♥" : "♡"}
          </button>
          <button
            type="button"
            aria-label="Share vehicle"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-mist text-ink transition-colors hover:border-line"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 3v12M8 7l4-4 4 4M6 14v5a2 2 0 002 2h8a2 2 0 002-2v-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {showFinanceProgress && (
        <div className="border-t border-line px-5 py-2 md:hidden">
          <p className="text-center text-[11px] tracking-wide text-muted">
            Step 2 of 3 — Choose your car
          </p>
          <div className="mx-auto mt-1.5 h-1.5 max-w-xs overflow-hidden rounded-full bg-cream/10">
            <div className="h-full w-2/3 rounded-full bg-green" />
          </div>
        </div>
      )}
    </header>
  );
}
