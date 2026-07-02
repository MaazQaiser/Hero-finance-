interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  step?: number;
  formatMin: (value: number) => string;
  formatMax: (value: number) => string;
  onChange: (min: number, max: number) => void;
  highlight?: boolean;
}

export function RangeSlider({
  label,
  min,
  max,
  valueMin,
  valueMax,
  step = 1,
  formatMin,
  formatMax,
  onChange,
  highlight = false,
}: RangeSliderProps) {
  return (
    <div className={highlight ? "rounded-2xl border border-green/20 bg-green/5 p-4" : ""}>
      <div className="mb-3 flex items-center justify-between">
        <p className={`text-sm font-medium ${highlight ? "text-green-deep" : "text-ink"}`}>
          {label}
        </p>
        <p className="text-sm text-muted">
          {formatMin(valueMin)} – {formatMax(valueMax)}
        </p>
      </div>
      <div className="space-y-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={(event) => {
            const next = Number(event.target.value);
            onChange(Math.min(next, valueMax), valueMax);
          }}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-green"
          aria-label={`${label} minimum`}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={(event) => {
            const next = Number(event.target.value);
            onChange(valueMin, Math.max(next, valueMin));
          }}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-green"
          aria-label={`${label} maximum`}
        />
      </div>
    </div>
  );
}

interface SingleSliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  step?: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
  highlight?: boolean;
}

export function SingleSlider({
  label,
  min,
  max,
  value,
  step = 1,
  format,
  onChange,
  highlight = false,
}: SingleSliderProps) {
  return (
    <div className={highlight ? "rounded-2xl border border-green/20 bg-green/5 p-4" : ""}>
      <div className="mb-3 flex items-center justify-between">
        <p className={`text-sm font-medium ${highlight ? "text-green-deep" : "text-ink"}`}>
          {label}
        </p>
        <p className={`text-sm font-medium ${highlight ? "text-green-deep" : "text-ink"}`}>
          {format(value)}
        </p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-green"
        aria-label={label}
      />
      <div className="mt-2 flex justify-between text-xs text-muted">
        <span>{format(min)}</span>
        <span>{format(max)}+</span>
      </div>
    </div>
  );
}
