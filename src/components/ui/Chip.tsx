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
          ? "border-green bg-green/15 text-green-deep"
          : "border-line bg-mist text-muted hover:border-green/40 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
