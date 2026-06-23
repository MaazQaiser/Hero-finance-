import { type InputHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from "react";

interface ApplyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function ApplyInput({ label, error, hint, className = "", ...props }: ApplyInputProps) {
  return (
    <div>
      <label htmlFor={props.id} className="mb-2 block text-sm font-medium text-cream">
        {label}
        {props.required && <span className="text-coral"> *</span>}
      </label>
      <input
        {...props}
        aria-invalid={error ? true : undefined}
        className={`min-h-12 w-full rounded-2xl border bg-charcoal/40 px-4 text-base text-cream placeholder:text-cream-muted focus:outline-none focus:ring-2 ${
          error
            ? "border-coral/60 focus:ring-coral/30"
            : "border-cream/15 focus:border-coral/40 focus:ring-coral/20"
        } ${className}`}
      />
      {hint && !error && <p className="mt-2 text-xs text-cream-muted">{hint}</p>}
      {error && <p className="mt-2 text-sm text-coral">{error}</p>}
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
    <div>
      <label htmlFor={props.id} className="mb-2 block text-sm font-medium text-cream">
        {label}
        {props.required && <span className="text-coral"> *</span>}
      </label>
      <select
        {...props}
        aria-invalid={error ? true : undefined}
        className={`min-h-12 w-full rounded-2xl border bg-charcoal/40 px-4 text-base text-cream focus:outline-none focus:ring-2 ${
          error
            ? "border-coral/60 focus:ring-coral/30"
            : "border-cream/15 focus:border-coral/40 focus:ring-coral/20"
        } ${className}`}
      >
        {children}
      </select>
      {error && <p className="mt-2 text-sm text-coral">{error}</p>}
    </div>
  );
}
