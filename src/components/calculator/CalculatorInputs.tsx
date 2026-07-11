"use client";

import { formatPrice } from "@/data/vehicles";

interface CurrencyStepperProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function CurrencyStepper({
  id,
  label,
  value,
  min,
  max,
  step = 250,
  onChange,
}: CurrencyStepperProps) {
  const handleInput = (raw: string) => {
    const parsed = Number(raw.replace(/[^\d]/g, ""));
    if (Number.isNaN(parsed)) {
      onChange(min);
      return;
    }
    onChange(clamp(parsed, min, max));
  };

  return (
    <div className="rounded-2xl border border-line bg-paper p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
        </label>
        <span className="text-sm font-semibold text-green-deep">{formatPrice(value)}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(clamp(value - step, min, max))}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-mist-2 text-lg font-semibold text-ink transition-colors hover:border-green/30 active:scale-95"
          aria-label={`Decrease ${label}`}
        >
          −
        </button>

        <div className="relative min-w-0 flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            £
          </span>
          <input
            id={id}
            type="text"
            inputMode="numeric"
            value={value.toLocaleString("en-GB")}
            onChange={(event) => handleInput(event.target.value)}
            className="min-h-11 w-full rounded-xl border border-line bg-mist-2 px-4 pl-8 text-center text-base font-semibold text-ink outline-none transition-colors focus:border-green/40"
          />
        </div>

        <button
          type="button"
          onClick={() => onChange(clamp(value + step, min, max))}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-mist-2 text-lg font-semibold text-ink transition-colors hover:border-green/30 active:scale-95"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

interface CurrencySliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

export function CurrencySlider({
  id,
  label,
  value,
  min,
  max,
  step = 250,
  onChange,
}: CurrencySliderProps) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
        </label>
        <span className="text-sm font-semibold text-green-deep transition-all duration-300">
          {formatPrice(value)}
        </span>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="calculator-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-green"
      />

      <div className="mt-2 flex justify-between text-xs text-muted">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>
    </div>
  );
}
