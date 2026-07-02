import Link from "next/link";
import { type ReactNode } from "react";
import { HeroLogo } from "@/components/HeroLogo";

const utilityLinks = [
  { label: "Privacy policy", href: "#" },
  { label: "Terms & conditions", href: "#" },
  { label: "Cookie policy", href: "#" },
  { label: "Complaints", href: "#" },
];

function SocialIcon({ label, children }: { label: string; children: ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white"
    >
      {children}
    </a>
  );
}

export function FooterV2() {
  return (
    <footer className="bg-green-deep pb-24 text-white md:pb-12">
      <div className="w-full px-5 py-12 md:py-14 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center lg:text-left">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Let&apos;s get you on the road
            </h2>

            <a
              href="mailto:support@herocarfinance.co.uk"
              className="mt-4 inline-block break-all text-lg font-medium text-white/60 transition-colors hover:text-green-bright sm:break-normal sm:text-xl lg:text-2xl"
            >
              support@herocarfinance.co.uk
            </a>

            <svg
              aria-hidden
              className="mx-auto mt-3 h-3 w-40 text-green-bright lg:mx-0"
              viewBox="0 0 192 12"
              fill="none"
            >
              <path
                d="M2 8C28 2 52 10 78 6C104 2 128 10 154 5C170 3 182 7 190 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3 lg:mt-24">
            <div>
              <p className="text-sm font-medium text-white/55">Customer support</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <SocialIcon label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </SocialIcon>
                <SocialIcon label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h2.5l.5-3H13v-2c0-.6.4-1 1-1z" />
                  </svg>
                </SocialIcon>
                <SocialIcon label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M6.5 8.5h3V19h-3V8.5zM8 6.5a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM11 8.5h2.9v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.1 3.9 4.9V19h-3v-5.2c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7V19h-3V8.5z" />
                  </svg>
                </SocialIcon>
                <SocialIcon label="X">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.3 4H20l-6.2 7.1L21 20h-5.5l-4.3-5.6L6.8 20H4l6.6-7.6L3 4h5.6l3.9 5.1L17.3 4zm-1.9 14.3h1.5L7.8 5.6H6.2l9.2 12.7z" />
                  </svg>
                </SocialIcon>
              </div>
            </div>

            <div className="md:text-center">
              <p className="text-sm font-medium text-white/55">Sales</p>
              <a
                href="tel:08001234567"
                className="mt-3 inline-block text-lg font-semibold text-white transition-colors hover:text-green-bright"
              >
                0800 123 4567
              </a>
            </div>

            <div className="md:text-right">
              <p className="text-sm font-medium text-white/55">Apply online</p>
              <Link
                href="/apply"
                className="mt-3 inline-flex min-h-11 items-center justify-center rounded-full bg-green-bright px-6 text-sm font-bold text-ink transition-colors hover:bg-green-bright/90 sm:text-base"
              >
                Check eligibility
              </Link>
            </div>
          </div>

          <div className="mt-10 border-t border-white/15 pt-6 lg:mt-12">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Link href="/" aria-label="Hero Car Finance home">
                  <HeroLogo />
                </Link>
                <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/45">
                  <span>Hero Car Finance</span>
                  <span aria-hidden className="text-green-bright">
                    ♥
                  </span>
                  <span>FCA regulated · FRN 123456</span>
                </p>
                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-white/40">
                  Hero Car Finance Ltd is authorised and regulated by the Financial Conduct Authority.
                  Registered in England & Wales. © {new Date().getFullYear()} Hero Car Finance.
                </p>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/55">
                {utilityLinks.map((link) => (
                  <a key={link.label} href={link.href} className="transition-colors hover:text-green-bright">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
