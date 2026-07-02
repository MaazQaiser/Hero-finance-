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
      className={`min-h-[4.5rem] w-full rounded-[var(--radius-card)] border px-5 py-4 text-left transition-colors ${
        selected
          ? "border-green bg-green/10"
          : "border-line bg-paper hover:border-line"
      }`}
    >
      <p className="font-medium text-ink">{label}</p>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
    </button>
  );
}
