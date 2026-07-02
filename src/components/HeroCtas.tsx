"use client";

import Link from "next/link";

export function HeroCtas() {
  const scrollToForm = () => {
    const form = document.getElementById("hero-eligibility");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
    const input = document.getElementById("hero-first-name");
    window.setTimeout(() => input?.focus(), 400);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button type="button" onClick={scrollToForm} className="btn-cyclix-primary sm:min-w-[220px]">
        Check my eligibility
      </button>
      <Link href="/cars" className="btn-cyclix-secondary text-center sm:min-w-[200px]">
        Browse cars first
      </Link>
    </div>
  );
}
