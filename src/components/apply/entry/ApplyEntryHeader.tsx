"use client";

import Link from "next/link";
import { HeroLogo } from "@/components/HeroLogo";

interface ApplyEntryHeaderProps {
  onSaveLater: () => void;
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function ApplyEntryHeader({ onSaveLater }: ApplyEntryHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto flex h-[72px] max-w-2xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <Link
          href="/"
          className="shrink-0 transition-opacity hover:opacity-80"
          aria-label="Hero Car Finance home"
        >
          <HeroLogo />
        </Link>

        <div className="hidden items-center gap-2 text-sm font-medium text-ink sm:flex">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green/10 text-green-deep">
            <LockIcon className="h-4 w-4" />
          </span>
          Secure Application
        </div>

        <button
          type="button"
          onClick={onSaveLater}
          className="motion-button min-h-11 shrink-0 rounded-full border border-green/30 bg-green/10 px-4 text-sm font-semibold text-green-deep hover:border-green/50 hover:bg-green/15"
        >
          <span className="hidden sm:inline">Save &amp; Continue Later</span>
          <span className="sm:hidden">Save &amp; Continue</span>
        </button>
      </div>
    </header>
  );
}
