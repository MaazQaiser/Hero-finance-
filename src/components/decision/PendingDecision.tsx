import { Button } from "@/components/ui/Button";
import { type FinanceDecision } from "@/lib/apply/decision";
import { DecisionSupportCard } from "@/components/decision/DecisionSupportCard";
import { DecisionTrustStrip } from "@/components/decision/DecisionTrustStrip";

interface PendingDecisionProps {
  decision: FinanceDecision;
}

export function PendingDecision({ decision }: PendingDecisionProps) {
  return (
    <div className="space-y-8 pb-36">
      <section className="text-center">
        <div className="relative mx-auto h-20 w-20">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-cream/10 border-t-coral" />
          <div className="absolute inset-3 flex items-center justify-center rounded-full bg-surface text-xl text-coral">
            …
          </div>
        </div>
        <h1 className="mt-6 text-3xl font-medium text-cream">
          Your application is being processed
        </h1>
        <p className="mx-auto mt-3 max-w-md text-cream-muted">
          This usually takes just a little longer. We&apos;ll be in touch as soon as we have an
          update.
        </p>
      </section>

      <section className="rounded-[var(--radius-card)] border border-cream/10 bg-surface p-6">
        <div className="grid gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-cream-muted">Reference ID</p>
            <p className="mt-1 font-medium text-cream">{decision.referenceId}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-cream-muted">Expected response</p>
            <p className="mt-1 font-medium text-cream">
              Within {decision.expectedResponseHours ?? 24} hours
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-cream-muted">Contact</p>
            <p className="mt-1 text-sm text-cream">0330 123 4567 · support@herocarfinance.co.uk</p>
          </div>
        </div>
      </section>

      <section className="rounded-[var(--radius-card)] border border-cream/10 bg-surface/60 p-6 text-center">
        <h2 className="text-lg font-medium text-cream">Browse while you wait</h2>
        <p className="mt-2 text-sm text-cream-muted">
          No need to sit tight — start exploring cars that fit your budget.
        </p>
        <Button size="lg" href="/cars" className="mt-5">
          Browse Cars While You Wait
        </Button>
      </section>

      <DecisionTrustStrip />
      <DecisionSupportCard />
    </div>
  );
}
