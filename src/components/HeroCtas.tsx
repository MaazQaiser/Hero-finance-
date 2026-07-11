"use client";

import Link from "next/link";

export function HeroCtas() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link href="/apply" className="btn-cyclix-primary sm:min-w-[220px] text-center">
        Check my eligibility
      </Link>
      <Link href="/cars" className="btn-hero-outline text-center sm:min-w-[200px]">
        Browse cars first
      </Link>
    </div>
  );
}
