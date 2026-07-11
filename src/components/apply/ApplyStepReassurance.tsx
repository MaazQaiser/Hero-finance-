import { type ReactNode } from "react";

interface ApplyStepReassuranceProps {
  icon: ReactNode;
  text: string;
}

export function ApplyStepReassurance({ icon, text }: ApplyStepReassuranceProps) {
  return (
    <div className="mb-3 flex items-center justify-center gap-2 text-xs leading-snug text-muted">
      <span className="shrink-0 text-muted/80">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
