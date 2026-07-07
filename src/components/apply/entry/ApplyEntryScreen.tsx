"use client";

import { ApplyEntryHeader } from "@/components/apply/entry/ApplyEntryHeader";
import { ApplyInfoCard } from "@/components/apply/entry/ApplyInfoCard";
import { ApplyPrimaryButton } from "@/components/apply/entry/ApplyPrimaryButton";
import { ApplyPrivacyCard } from "@/components/apply/entry/ApplyPrivacyCard";
import { ApplyProgressBar } from "@/components/apply/entry/ApplyProgressBar";
import { ApplyTrustBadge } from "@/components/apply/entry/ApplyTrustBadge";

interface ApplyEntryScreenProps {
  onContinue: () => void;
  onSaveLater: () => void;
}

const TOTAL_STEPS = 5;

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  );
}

function CarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function BadgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

const infoCards = [
  {
    icon: <UserIcon className="h-5 w-5" />,
    title: "Personal Details",
    items: ["Name", "Date of Birth", "Contact Information"],
  },
  {
    icon: <BriefcaseIcon className="h-5 w-5" />,
    title: "Employment",
    items: ["Employment Status", "Income", "Affordability"],
  },
  {
    icon: <CarIcon className="h-5 w-5" />,
    title: "Vehicle Preferences",
    items: ["Budget", "Deposit", "Monthly Payment"],
  },
];

const trustBadges = [
  { label: "Soft Search", icon: <SearchIcon className="h-3.5 w-3.5" /> },
  { label: "FCA Regulated", icon: <BadgeIcon className="h-3.5 w-3.5" /> },
  { label: "Secure & Encrypted", icon: <LockIcon className="h-3.5 w-3.5" /> },
  { label: "Takes about 5 minutes", icon: <ClockIcon className="h-3.5 w-3.5" /> },
];

export function ApplyEntryScreen({ onContinue, onSaveLater }: ApplyEntryScreenProps) {
  return (
    <div className="min-h-[100svh] bg-paper">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 saas-glow" aria-hidden />

      <ApplyEntryHeader onSaveLater={onSaveLater} />

      <main className="relative mx-auto max-w-2xl px-5 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8">
        <div className="hero-fade-up">
          <ApplyProgressBar currentStep={1} totalSteps={TOTAL_STEPS} estimatedMinutes={5} />
        </div>

        <section className="hero-fade-up-delay mt-8 md:mt-10">
          <p className="eyebrow">Finance application</p>
          <h1 className="headline-lg mt-3 max-w-lg">Let&apos;s get you on the road.</h1>
          <p className="body-lg mt-4 max-w-xl">
            We&apos;ll ask a few simple questions to understand your eligibility. Your initial
            checks won&apos;t affect your credit score.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {trustBadges.map((badge) => (
              <ApplyTrustBadge key={badge.label} icon={badge.icon} label={badge.label} />
            ))}
          </div>
        </section>

        <section className="mt-10 md:mt-12">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
            What we&apos;ll ask
          </h2>
          <p className="mt-2 text-sm text-muted">
            Three short sections — nothing complicated.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3 md:gap-5">
            {infoCards.map((card) => (
              <ApplyInfoCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                items={card.items}
              />
            ))}
          </div>
        </section>

        <section className="mt-8 md:mt-10">
          <ApplyPrivacyCard />
        </section>

        <section className="mt-8 md:mt-10">
          <ApplyPrimaryButton onClick={onContinue}>Continue Application</ApplyPrimaryButton>
        </section>
      </main>
    </div>
  );
}
