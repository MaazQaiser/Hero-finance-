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
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 9h14l-1.5 6H6.5L5 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="8" cy="17" r="1.5" fill="currentColor" />
      <circle cx="16" cy="17" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function BuyToOrderTrust() {
  return (
    <section className="section-padding bg-mist">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-lg font-medium text-ink">Why you can trust Hero</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <TrustBadge icon={<SearchIcon />} label="Soft search available" />
          <TrustBadge icon={<ShieldIcon />} label="No impact on credit score" />
          <TrustBadge icon={<TeamIcon />} label="Expert sourcing team" />
          <TrustBadge icon={<StockIcon />} label="Hand-picked stock" />
        </div>
      </div>
    </section>
  );
}
