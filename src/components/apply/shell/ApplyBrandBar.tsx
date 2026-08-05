"use client";

import Image from "next/image";
import Link from "next/link";

interface ApplyBrandBarProps {
  savedFlash: boolean;
}

export function ApplyBrandBar({ savedFlash }: ApplyBrandBarProps) {
  return (
    <div
      className="flex items-center justify-between px-5 py-4"
      style={{ paddingTop: "max(16px, env(safe-area-inset-top))" }}
    >
      <Link href="/" aria-label="Hero Car Finance home" className="inline-flex items-center">
        <Image
          src="/brand/hero-logo-primary.png"
          alt="Hero Car Finance"
          width={160}
          height={40}
          className="h-7 w-auto"
          priority
        />
      </Link>

      <div
        style={{
          fontSize: 12,
          color: "var(--aink-soft)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          opacity: savedFlash ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        aria-live="polite"
        aria-atomic
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--agreen)",
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        Progress saved
      </div>
    </div>
  );
}
