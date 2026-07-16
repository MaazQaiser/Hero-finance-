interface ValidationBadgeProps {
  className?: string;
}

export function ValidationBadge({ className = "" }: ValidationBadgeProps) {
  return (
    <span
      className={`field-valid-badge inline-flex items-center gap-1 text-xs font-medium text-success ${className}`}
      aria-live="polite"
    >
      <span aria-hidden>✓</span>
      Valid
    </span>
  );
}
