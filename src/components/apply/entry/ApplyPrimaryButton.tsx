import { type ReactNode } from "react";

interface ApplyPrimaryButtonProps {
  onClick: () => void;
  children: ReactNode;
  reassurance?: string;
  disabled?: boolean;
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ApplyPrimaryButton({
  onClick,
  children,
  reassurance = "No impact on your credit score.",
  disabled = false,
}: ApplyPrimaryButtonProps) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="cyclix-cta min-h-[3.5rem] gap-2 px-8 disabled:cursor-not-allowed"
      >
        {children}
        <ArrowIcon className="h-5 w-5" />
      </button>
      {reassurance && (
        <p className="text-center text-xs font-medium text-muted">{reassurance}</p>
      )}
    </div>
  );
}
