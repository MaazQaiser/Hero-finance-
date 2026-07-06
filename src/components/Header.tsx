"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeroLogo } from "@/components/HeroLogo";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Browse cars", href: "/cars" },
  { label: "Why Hero", href: "#why-hero" },
];

const PHONE_HREF = "tel:08001234567";
const PHONE_DISPLAY = "0800 123 4567";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="flex w-5 flex-col gap-1.5">
      <span
        className={`block h-0.5 w-full bg-ink transition-transform duration-200 ${
          open ? "translate-y-2 rotate-45" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-full bg-ink transition-opacity duration-200 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-full bg-ink transition-transform duration-200 ${
          open ? "-translate-y-2 -rotate-45" : ""
        }`}
      />
    </span>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/60 bg-white/75 shadow-[0_8px_32px_rgba(30,22,53,0.06)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center gap-4 px-5 md:h-[88px] md:px-8 lg:px-10">
        <div className="flex flex-1 items-center">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Hero Car Finance home">
            <HeroLogo priority />
          </Link>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-10 lg:flex">
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

        <div className="flex flex-1 items-center justify-end gap-4">
          <Link href="#hero-eligibility" className="header-cta-pill hidden md:inline-flex">
            Check eligibility
          </Link>

          <a
            href={PHONE_HREF}
            aria-label={`Call now ${PHONE_DISPLAY}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/80 bg-white/60 text-ink backdrop-blur-sm transition-all hover:border-green/30 sm:hidden"
          >
            <PhoneIcon className="h-4 w-4" />
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line/80 bg-white/60 backdrop-blur-sm transition-colors hover:bg-white lg:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-line/50 bg-white/90 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-[1320px] flex-col divide-y divide-line/60 px-5 md:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="min-h-14 py-4 text-sm font-semibold text-ink transition-colors hover:text-green-deep"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#faqs"
              onClick={() => setMenuOpen(false)}
              className="min-h-14 py-4 text-sm font-semibold text-ink transition-colors hover:text-green-deep"
            >
              FAQs
            </Link>
            <a
              href={PHONE_HREF}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-14 items-center gap-2 py-4 text-sm font-bold text-green-deep"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {PHONE_DISPLAY}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
