interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        selected
          ? "border-coral bg-coral/15 text-coral"
          : "border-cream/20 bg-charcoal/40 text-cream-muted hover:border-cream/40 hover:text-cream"
      }`}
    >
      {label}
    </button>
  );
}
