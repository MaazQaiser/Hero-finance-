import { type ReactNode } from "react";
import { ValidationBadge } from "@/components/apply/form/ValidationBadge";

interface FieldStatusProps {
  children: ReactNode;
  valid?: boolean;
  error?: string;
}

export function FieldStatus({ children, valid = false, error }: FieldStatusProps) {
  return (
    <div className={error ? "motion-shake" : undefined}>
      {children}
      {valid && !error ? (
        <div className="field-valid-in mt-2">
          <ValidationBadge />
        </div>
      ) : null}
      {error ? <p className="motion-error-in mt-2 text-sm text-coral">{error}</p> : null}
    </div>
  );
}
