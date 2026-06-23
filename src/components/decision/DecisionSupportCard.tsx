import { Button } from "@/components/ui/Button";

export function DecisionSupportCard() {
  return (
    <div className="rounded-[var(--radius-card)] border border-cream/10 bg-surface p-5">
      <p className="font-medium text-cream">Need help?</p>
      <p className="mt-1 text-sm text-cream-muted">
        Our friendly team is here to guide you through your next step.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <Button variant="secondary" fullWidth size="md">
          Chat
        </Button>
        <Button variant="secondary" fullWidth size="md">
          Call
        </Button>
        <Button variant="secondary" fullWidth size="md">
          WhatsApp
        </Button>
      </div>
    </div>
  );
}
