"use client";

import Link from "next/link";
import { useState } from "react";
import { HeroLogo } from "@/components/HeroLogo";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Browse cars", href: "/cars" },
  { label: "Why Hero", href: "#why-hero" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="flex w-5 flex-col gap-1.5">
      <span className={`block h-0.5 w-full bg-ink transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
      <span className={`block h-0.5 w-full bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
      <span className={`block h-0.5 w-full bg-ink transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
    </span>
  );
}

export function HeaderV2() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <div className="mx-auto flex h-[72px] max-w-none items-center gap-4 md:h-[80px]">
        <div className="flex flex-1 items-center">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Hero Car Finance home">
            <HeroLogo priority />
          </Link>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3">
          <Link
            href="#hero-eligibility"
            className="hidden rounded-full border-[1.5px] border-line px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white md:inline-flex"
          >
            Check eligibility
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-line/60 pb-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-semibold text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#hero-eligibility"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex rounded-full border-[1.5px] border-line px-6 py-2.5 text-sm font-semibold text-ink"
          >
            Check eligibility
          </Link>
        </nav>
      )}
    </header>
  );
}
