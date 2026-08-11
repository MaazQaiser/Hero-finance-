import Image from "next/image";
import { type ReactNode } from "react";

/** Update when live Google review totals are confirmed. */
const GOOGLE_RATING = "4.8";
const GOOGLE_REVIEW_COUNT = "2,000+";

function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function SoftSearchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function FcaIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrustBadgeIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green/10 text-green-deep sm:h-9 sm:w-9">
      {children}
    </span>
  );
}

function TrustStripItem({
  icon,
  label,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  detail?: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 px-1">
      {icon}
      <div className="min-w-0 leading-tight">
        <p className="text-[13px] font-semibold text-ink sm:text-sm">{label}</p>
        {detail ? <p className="mt-0.5 text-[11px] font-medium text-muted sm:text-xs">{detail}</p> : null}
      </div>
    </div>
  );
}

function GoogleReviewsBadge() {
  return (
    <TrustStripItem
      icon={
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-paper sm:h-9 sm:w-9">
          <GoogleIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
        </span>
      }
      label={`Google ${GOOGLE_RATING}★`}
      detail={`${GOOGLE_REVIEW_COUNT} reviews`}
    />
  );
}

function AAInspectedBadge() {
  return (
    <TrustStripItem
      icon={
        <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full border border-line bg-ink sm:h-9 sm:w-9">
          <Image
            src="/images/aa-approved-dealer.png"
            alt=""
            width={36}
            height={36}
            className="h-full w-full object-cover object-left"
          />
        </span>
      }
      label="AA Inspected Vehicles"
    />
  );
}

const trustBadges = [
  { id: "google", node: <GoogleReviewsBadge /> },
  {
    id: "soft-search",
    node: (
      <TrustStripItem
        icon={
          <TrustBadgeIcon>
            <SoftSearchIcon />
          </TrustBadgeIcon>
        }
        label="Soft Search"
      />
    ),
  },
  {
    id: "secure",
    node: (
      <TrustStripItem
        icon={
          <TrustBadgeIcon>
            <LockIcon />
          </TrustBadgeIcon>
        }
        label="Secure Application"
      />
    ),
  },
  {
    id: "fca",
    node: (
      <TrustStripItem
        icon={
          <TrustBadgeIcon>
            <FcaIcon />
          </TrustBadgeIcon>
        }
        label="FCA Regulated"
      />
    ),
  },
  { id: "aa", node: <AAInspectedBadge /> },
];

export function HeroTrustStats() {
  return (
    <div className="border-t border-line/50 pt-8 md:pt-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
          Multiple lenders. One soft search.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
          We&apos;ll search across specialist lenders to find the best finance options available to
          you.
        </p>
      </div>

      <div className="-mx-1 mt-7 overflow-x-auto pb-1 md:mt-8 md:overflow-visible">
        <ul
          className="mx-auto flex w-max min-w-full items-center justify-between gap-5 px-1 sm:gap-6 md:w-full md:max-w-5xl md:gap-4 lg:gap-6"
          aria-label="Trust signals"
        >
          {trustBadges.map((badge, index) => (
            <li
              key={badge.id}
              className={`flex items-center ${
                index > 0 ? "border-l border-line/60 pl-5 sm:pl-6 md:pl-4 lg:pl-6" : ""
              }`}
            >
              {badge.node}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
