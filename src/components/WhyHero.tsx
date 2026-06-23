import { type ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const features: {
  label: string;
  hero: boolean;
  traditional: boolean;
  icon: ReactNode;
}[] = [
  {
    label: "Owns stock",
    hero: true,
    traditional: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 16l2-6h12l2 6M6 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="17" r="1.5" fill="currentColor" />
        <circle cx="16" cy="17" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "One point of contact",
    hero: true,
    traditional: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Soft search",
    hero: true,
    traditional: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11 4.6-.85 8-5.75 8-11V6l-8-4z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Quick decisions",
    hero: true,
    traditional: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "AA inspected cars",
    hero: true,
    traditional: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" className="fill-coral/20 stroke-coral" strokeWidth="1.5" />
      <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" className="stroke-coral" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" className="stroke-cream/20" strokeWidth="1.5" fill="none" />
      <path d="M9 9l6 6M15 9l-6 6" className="stroke-cream/30" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function WhyHero() {
  return (
    <section id="why-hero" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why Hero"
          title="Finance and your car, under one roof"
          description="Unlike traditional brokers, Hero owns the stock and manages your entire journey."
        />

        <div className="mt-12 hidden overflow-hidden rounded-[var(--radius-card)] border border-cream/10 md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-cream/10 bg-charcoal">
                <th className="px-8 py-6 text-sm font-medium text-cream-muted">Feature</th>
                <th className="bg-coral/10 px-8 py-6 text-sm font-semibold text-coral">
                  Hero Car Finance
                </th>
                <th className="px-8 py-6 text-sm font-medium text-cream-muted">Traditional brokers</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr
                  key={feature.label}
                  className={i % 2 === 0 ? "bg-surface/40" : "bg-charcoal/60"}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3 text-cream">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cream/5 text-coral">
                        {feature.icon}
                      </span>
                      <span className="font-medium">{feature.label}</span>
                    </div>
                  </td>
                  <td className="bg-coral/5 px-8 py-6">
                    {feature.hero ? <CheckIcon /> : <CrossIcon />}
                  </td>
                  <td className="px-8 py-6">
                    {feature.traditional ? <CheckIcon /> : <CrossIcon />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 space-y-4 md:hidden">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="rounded-[var(--radius-card)] border border-cream/10 bg-surface p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cream/5 text-coral">
                  {feature.icon}
                </span>
                <p className="font-medium text-cream">{feature.label}</p>
              </div>
              <div className="mt-5 flex gap-8 border-t border-cream/10 pt-4">
                <div className="flex items-center gap-2 rounded-xl bg-coral/10 px-3 py-2">
                  <CheckIcon />
                  <span className="text-sm font-medium text-coral">Hero</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2">
                  <CrossIcon />
                  <span className="text-sm text-cream-muted">Brokers</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
