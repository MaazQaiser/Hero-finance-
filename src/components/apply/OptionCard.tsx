interface OptionCardProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ label, description, selected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`motion-option min-h-[4.5rem] w-full rounded-[var(--radius-card)] border px-5 py-4 text-left ${
        selected
          ? "border-green bg-green/10 shadow-[0_6px_18px_rgba(91,43,212,0.1)]"
          : "border-line bg-paper hover:border-green/20 hover:shadow-[0_6px_16px_rgba(30,22,53,0.05)]"
      }`}
    >
      <p className="font-medium text-ink">{label}</p>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
    </button>
  );
}
