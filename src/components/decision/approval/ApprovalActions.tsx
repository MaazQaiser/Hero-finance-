"use client";

import { Button } from "@/components/ui/Button";
import { approvalContent } from "@/config/approvalContent";

interface ApprovalActionsProps {
  onPrimaryClick?: () => void;
  className?: string;
}

export function ApprovalActions({ onPrimaryClick, className = "" }: ApprovalActionsProps) {
  const { primaryLabel, primaryHref, secondaryLabel, secondaryHref } = approvalContent.actions;

  return (
    <div className={`approval-actions space-y-3 ${className}`}>
      <Button variant="secondary" fullWidth size="lg" href={secondaryHref}>
        {secondaryLabel}
      </Button>
      {onPrimaryClick ? (
        <Button fullWidth size="lg" onClick={onPrimaryClick}>
          {primaryLabel}
        </Button>
      ) : (
        <Button fullWidth size="lg" href={primaryHref}>
          {primaryLabel}
        </Button>
      )}
    </div>
  );
}
