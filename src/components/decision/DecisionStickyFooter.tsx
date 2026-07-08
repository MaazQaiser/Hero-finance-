import { Button } from "@/components/ui/Button";
import { type DecisionState } from "@/lib/apply/decision";

interface DecisionStickyFooterProps {
  state: DecisionState;
}

const ctaConfig: Record<
  DecisionState,
  { label: string; href: string; secondary?: { label: string; href: string } }
> = {
  approved: {
    label: "View Cars",
    href: "/cars",
  },
  declined: {
    label: "Browse Cars",
    href: "/cars",
  },
  pending: {
    label: "Continue Browsing",
    href: "/cars",
  },
};

export function DecisionStickyFooter({ state }: DecisionStickyFooterProps) {
  const config = ctaConfig[state];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-2xl">
      <div className="mx-auto max-w-lg px-5 py-4">
        {config.secondary && (
          <Button
            variant="secondary"
            fullWidth
            size="lg"
            href={config.secondary.href}
            className="mb-3"
          >
            {config.secondary.label}
          </Button>
        )}
        <Button fullWidth size="lg" href={config.href}>
          {config.label}
        </Button>
      </div>
    </div>
  );
}
