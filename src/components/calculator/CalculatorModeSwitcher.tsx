"use client";

export type CalculatorMode = "monthly" | "affordability" | "deposit";

const modes: { id: CalculatorMode; label: string }[] = [
  { id: "monthly", label: "Monthly Payment" },
  { id: "affordability", label: "What Can I Afford" },
  { id: "deposit", label: "Maximum Deposit" },
];

interface CalculatorModeSwitcherProps {
  mode: CalculatorMode;
  onChange: (mode: CalculatorMode) => void;
}

export function CalculatorModeSwitcher({ mode, onChange }: CalculatorModeSwitcherProps) {
  return (
    <div className="rounded-full border border-line bg-mist-2 p-1.5">
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
        {modes.map((item) => {
          const active = mode === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-all duration-300 ${
                active
                  ? "bg-paper text-ink shadow-[0_4px_16px_rgba(30,22,53,0.08)]"
                  : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
