import { type InputHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from "react";

interface ApplyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function ApplyInput({ label, error, hint, className = "", ...props }: ApplyInputProps) {
  return (
    <div className={error ? "motion-shake" : undefined}>
      <label htmlFor={props.id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {props.required && <span className="text-green-deep"> *</span>}
      </label>
      <input
        {...props}
        aria-invalid={error ? true : undefined}
        className={`motion-field min-h-12 w-full rounded-2xl border bg-mist px-4 text-base text-ink placeholder:text-muted focus:outline-none focus:ring-2 ${
          error
            ? "border-coral/60 focus:ring-coral/30"
            : "border-line focus:border-green/40 focus:ring-green/20"
        } ${className}`}
      />
      {hint && !error && <p className="mt-2 text-xs text-muted">{hint}</p>}
      {error && <p className="motion-error-in mt-2 text-sm text-coral">{error}</p>}
    </div>
  );
}

interface ApplySelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: ReactNode;
}

export function ApplySelect({ label, error, children, className = "", ...props }: ApplySelectProps) {
  return (
    <div className={error ? "motion-shake" : undefined}>
      <label htmlFor={props.id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {props.required && <span className="text-green-deep"> *</span>}
      </label>
      <select
        {...props}
        aria-invalid={error ? true : undefined}
        className={`motion-field min-h-12 w-full rounded-2xl border bg-mist px-4 text-base text-ink focus:outline-none focus:ring-2 ${
          error
            ? "border-coral/60 focus:ring-coral/30"
            : "border-line focus:border-green/40 focus:ring-green/20"
        } ${className}`}
      >
        {children}
      </select>
      {error && <p className="motion-error-in mt-2 text-sm text-coral">{error}</p>}
    </div>
  );
}
