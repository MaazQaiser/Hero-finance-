"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Browse cars", href: "/cars" },
  { label: "Why Hero", href: "#why-hero" },
];

const panelClass =
  "relative rounded-2xl border border-white/60 bg-white/88 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-xl";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="flex w-5 flex-col gap-1.5">
      <span
        className={`block h-0.5 w-full bg-charcoal transition-transform duration-200 ${
          open ? "translate-y-2 rotate-45" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-full bg-charcoal transition-opacity duration-200 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-full bg-charcoal transition-transform duration-200 ${
          open ? "-translate-y-2 -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-5">
      <div className="mx-auto flex max-w-6xl items-center gap-0">
        <div
          className={`${panelClass} flex min-h-[3.25rem] flex-1 items-center px-5 py-3 md:min-h-[3.5rem] md:px-7`}
        >
          <Link href="/" className="relative z-10 shrink-0">
            <span className="text-xl font-medium italic tracking-tight text-charcoal md:text-2xl">
              Hero
            </span>
            <span className="ml-1.5 hidden text-[10px] font-medium uppercase tracking-[0.25em] text-charcoal/45 sm:inline">
              Car Finance
            </span>
          </Link>

          <nav className="relative z-10 ml-auto hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-charcoal/55 transition-colors hover:text-charcoal"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div aria-hidden className="relative z-20 mx-0 h-px w-5 shrink-0 bg-coral md:w-6" />

        <div
          className={`${panelClass} flex min-h-[3.25rem] shrink-0 items-center gap-4 px-4 py-3 md:min-h-[3.5rem] md:gap-5 md:px-5`}
        >
          <Link
            href="/apply"
            className="relative z-10 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.2em] text-charcoal transition-colors hover:text-coral"
          >
            Check Eligibility
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-charcoal/8 bg-charcoal/[0.04] transition-colors hover:bg-charcoal/[0.08] lg:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mx-auto mt-3 max-w-6xl overflow-hidden rounded-2xl border border-white/60 bg-white/92 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl">
          <nav className="flex flex-col divide-y divide-charcoal/8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="min-h-14 px-6 py-4 text-sm font-medium uppercase tracking-[0.15em] text-charcoal transition-colors hover:bg-charcoal/[0.03]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#faqs"
              onClick={() => setMenuOpen(false)}
              className="min-h-14 px-6 py-4 text-sm font-medium uppercase tracking-[0.15em] text-charcoal transition-colors hover:bg-charcoal/[0.03]"
            >
              FAQs
            </Link>
            <Link
              href="/apply"
              onClick={() => setMenuOpen(false)}
              className="min-h-14 px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-coral transition-colors hover:bg-charcoal/[0.03]"
            >
              Check Eligibility
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
