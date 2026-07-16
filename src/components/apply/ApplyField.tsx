import { type InputHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from "react";
import { FormHelperText } from "@/components/apply/form/FormHelperText";
import { FieldStatus } from "@/components/apply/form/FieldStatus";

interface ApplyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  valid?: boolean;
}

export function ApplyInput({
  label,
  error,
  hint,
  valid = false,
  className = "",
  autoFocus,
  ...props
}: ApplyInputProps) {
  const showValid = valid && !error;
  const borderClass = error
    ? "border-coral/60 focus:ring-coral/30"
    : showValid
      ? "border-success/50 bg-white focus:border-success/50 focus:ring-success/20"
      : "border-line focus:border-green/40 focus:ring-green/20";

  return (
    <FieldStatus valid={showValid} error={error}>
      <label htmlFor={props.id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {props.required && <span className="text-green-deep"> *</span>}
      </label>
      <input
        {...props}
        autoFocus={autoFocus}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          hint ? `${props.id}-hint` : error ? `${props.id}-error` : undefined
        }
        className={`motion-field min-h-12 w-full rounded-2xl border bg-mist px-4 text-base text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus-visible:ring-2 ${borderClass} ${className}`}
      />
      {hint && !error && !showValid ? (
        <FormHelperText id={`${props.id}-hint`}>{hint}</FormHelperText>
      ) : null}
    </FieldStatus>
  );
}

interface ApplySelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  hint?: string;
  valid?: boolean;
  children: ReactNode;
}

export function ApplySelect({
  label,
  error,
  hint,
  valid = false,
  children,
  className = "",
  autoFocus,
  ...props
}: ApplySelectProps) {
  const showValid = valid && !error;
  const borderClass = error
    ? "border-coral/60 focus:ring-coral/30"
    : showValid
      ? "border-success/50 bg-white focus:border-success/50 focus:ring-success/20"
      : "border-line focus:border-green/40 focus:ring-green/20";

  return (
    <FieldStatus valid={showValid} error={error}>
      <label htmlFor={props.id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {props.required && <span className="text-green-deep"> *</span>}
      </label>
      <select
        {...props}
        autoFocus={autoFocus}
        aria-invalid={error ? true : undefined}
        className={`motion-field min-h-12 w-full rounded-2xl border bg-mist px-4 text-base text-ink focus:outline-none focus:ring-2 focus-visible:ring-2 ${borderClass} ${className}`}
      >
        {children}
      </select>
      {hint && !error && !showValid ? <FormHelperText>{hint}</FormHelperText> : null}
    </FieldStatus>
  );
}
