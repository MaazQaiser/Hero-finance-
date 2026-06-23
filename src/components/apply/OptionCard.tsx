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
          ? "border-coral bg-coral/10"
          : "border-cream/15 bg-surface hover:border-cream/30"
      }`}
    >
      <p className="font-medium text-cream">{label}</p>
      {description && <p className="mt-1 text-sm text-cream-muted">{description}</p>}
    </button>
  );
}
