import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
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

function SoftSearchIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function FcaIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const trustItems = [
  {
    id: "google",
    label: "Google Reviews",
    detail: "4.8★",
    icon: (
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-paper">
        <GoogleIcon />
      </span>
    ),
  },
  {
    id: "aa",
    label: "AA Inspected",
    icon: (
      <span className="relative flex h-8 w-8 overflow-hidden rounded-full border border-line bg-ink">
        <Image
          src="/images/aa-approved-dealer.png"
          alt=""
          width={32}
          height={32}
          className="h-full w-full object-cover object-left"
        />
      </span>
    ),
  },
  {
    id: "fca",
    label: "FCA Regulated",
    icon: (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green/10 text-green-deep">
        <FcaIcon />
      </span>
    ),
  },
  {
    id: "soft",
    label: "Soft Search",
    icon: (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green/10 text-green-deep">
        <SoftSearchIcon />
      </span>
    ),
  },
  {
    id: "secure",
    label: "Secure Application",
    icon: (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green/10 text-green-deep">
        <LockIcon />
      </span>
    ),
  },
];

export function WhyHeroV2() {
  return (
    <section id="why-hero" className="bg-paper py-16 md:py-20 lg:py-24">
      <div className="w-full px-5">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-green-bright px-4 py-2 text-sm font-semibold text-ink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Part of Oakwood Motor Company group, trading 20+ years
          </span>

          <h2 className="mt-8 max-w-5xl font-display text-3xl font-extrabold leading-[1.25] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.2] xl:text-5xl">
            Car finance and your car, from one team.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
            We arrange your car finance through a panel of lenders, including specialists for bad
            credit, and supply the car ourselves, so the finance and the car come from one place.
            One application, one team, from the first soft search to the keys.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mt-10 overflow-x-auto pb-1 md:mt-12 md:overflow-visible">
            <ul
              className="mx-auto flex w-max min-w-full items-center justify-between gap-5 border-y border-line/70 py-5 sm:gap-6 md:w-full md:max-w-5xl md:gap-4 lg:gap-6"
              aria-label="Trust signals"
            >
              {trustItems.map((item, index) => (
                <li
                  key={item.id}
                  className={`flex shrink-0 items-center gap-2.5 ${
                    index > 0 ? "border-l border-line/60 pl-5 sm:pl-6 md:pl-4 lg:pl-6" : ""
                  }`}
                >
                  {item.icon}
                  <div className="leading-tight">
                    <p className="text-[13px] font-semibold text-ink sm:text-sm">{item.label}</p>
                    {item.detail ? (
                      <p className="mt-0.5 text-[11px] font-medium text-muted sm:text-xs">{item.detail}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href="/apply"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-paper px-7 text-base font-semibold text-ink transition-colors hover:border-green/30 hover:bg-mist"
            >
              Check my options
            </Link>
            <p className="text-sm text-muted">Soft search · no impact on your credit score</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
