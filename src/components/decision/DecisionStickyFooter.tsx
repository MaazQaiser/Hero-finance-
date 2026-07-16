"use client";

import { Button } from "@/components/ui/Button";
import { ApprovalActions } from "@/components/decision/approval/ApprovalActions";
import { type DecisionState } from "@/lib/apply/decision";

interface DecisionStickyFooterProps {
  state: DecisionState;
  /** When set, primary approved CTA advances the prototype stage instead of linking */
  onApprovedContinue?: () => void;
  hide?: boolean;
}

const PHONE_HREF = "tel:08001234567";

const ctaConfig: Record<
  DecisionState,
  { label: string; href: string; secondary?: { label: string; href: string } }
> = {
  approved: {
    label: "See Matching Cars",
    href: "/cars",
    secondary: {
      label: "Speak to a Finance Specialist",
      href: PHONE_HREF,
    },
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

export function DecisionStickyFooter({
  state,
  onApprovedContinue,
  hide = false,
}: DecisionStickyFooterProps) {
  const config = ctaConfig[state];
  const animateIn = state === "approved";

  if (hide) return null;

  if (state === "approved") {
    return (
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-2xl ${
          animateIn ? "hero-fade-up-delay-cta" : ""
        }`}
      >
        <div className="mx-auto max-w-lg px-5 py-4">
          <ApprovalActions onPrimaryClick={onApprovedContinue} />
        </div>
      </div>
    );
  }

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
