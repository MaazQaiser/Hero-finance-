import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { TrustBadge } from "@/components/ui/TrustBadge";

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11 4.6-.85 8-5.75 8-11V6l-8-4z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function FinanceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function BuyToOrderHero() {
  return (
    <section className="relative min-h-[70svh] overflow-hidden bg-gradient-to-b from-paper via-mist-2 to-mist md:min-h-[75svh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_-10%,rgba(0,166,90,0.1),transparent_55%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-24 md:min-h-[75svh] md:px-8 md:pb-20 lg:px-12">
        <p className="eyebrow mb-4">Personal sourcing service</p>
        <h1 className="headline-xl max-w-2xl">
          Can&apos;t find your perfect car?
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Tell us what you&apos;re looking for and we&apos;ll source it for you — inspected,
          financed, and delivered by one trusted team.
        </p>

        <div className="mt-8">
          <Button size="lg" href="#request-form">
            Tell Us What You Need
          </Button>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <TrustBadge icon={<ShieldIcon />} label="AA inspected" />
          <TrustBadge icon={<FinanceIcon />} label="Finance available" />
          <TrustBadge icon={<TeamIcon />} label="One expert team" />
        </div>
      </div>
    </section>
  );
}

export function BuyToOrderHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 lg:px-12">
        <Link href="/" className="text-lg font-semibold text-ink">
          Hero <span className="font-normal text-muted">Car Finance</span>
        </Link>
        <Link href="/cars" className="text-sm text-muted hover:text-ink">
          Browse stock
        </Link>
      </div>
    </header>
  );
}
