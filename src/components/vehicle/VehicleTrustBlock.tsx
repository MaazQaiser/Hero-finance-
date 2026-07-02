import { TrustBadge } from "@/components/ui/TrustBadge";

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11 4.6-.85 8-5.75 8-11V6l-8-4z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function VehicleTrustBlock() {
  return (
    <section className="px-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-lg font-medium text-ink">Why buy with Hero</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <TrustBadge icon={<SearchIcon />} label="Soft search — no credit score impact" />
          <TrustBadge icon={<ShieldIcon />} label="AA inspected vehicle" />
          <TrustBadge icon={<TeamIcon />} label="One team from finance to delivery" />
          <TrustBadge icon={<ClockIcon />} label="Fast finance decision" />
        </div>
      </div>
    </section>
  );
}
