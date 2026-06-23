import { TrustBadge } from "@/components/ui/TrustBadge";
import { DEPOSIT_AMOUNT } from "@/lib/reservation/storage";
import { formatPrice } from "@/data/vehicles";

function RefundIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3v18M8 7l-4 4 4 4M16 17l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V8a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function FeeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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

export function ReserveDepositCard() {
  return (
    <div className="rounded-[var(--radius-card)] border border-coral/20 bg-gradient-to-br from-coral/10 via-surface to-surface p-6">
      <p className="text-2xl font-medium text-cream">
        Reserve this vehicle for {formatPrice(DEPOSIT_AMOUNT)}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-cream-muted">
        This deposit is fully refundable and secures the vehicle while our team contacts you to
        finalise your finance.
      </p>
    </div>
  );
}

export function ReserveTrustStrip() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <TrustBadge icon={<RefundIcon />} label="Fully refundable deposit" />
      <TrustBadge icon={<LockIcon />} label="Secure Stripe payment" />
      <TrustBadge icon={<FeeIcon />} label="No hidden fees" />
      <TrustBadge icon={<TeamIcon />} label="One Hero team start to finish" />
    </div>
  );
}

interface ReserveStepListProps {
  steps: { title: string; description?: string }[];
}

export function ReserveStepList({ steps }: ReserveStepListProps) {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div
          key={step.title}
          className="flex gap-4 rounded-[var(--radius-card)] border border-cream/10 bg-surface p-4"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral/15 text-sm font-medium text-coral">
            {index + 1}
          </div>
          <div>
            <p className="font-medium text-cream">{step.title}</p>
            {step.description && (
              <p className="mt-1 text-sm text-cream-muted">{step.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
