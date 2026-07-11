const trustItems = [
  "Soft search",
  "FCA regulated",
  "Real cars in stock",
  "AA inspected",
  "Finance & car, one team",
];

export function CalculatorTrustStrip() {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium text-muted">
      {trustItems.map((label) => (
        <span key={label} className="flex items-center gap-1.5">
          <span className="text-green-deep" aria-hidden>
            ✓
          </span>
          {label}
        </span>
      ))}
    </div>
  );
}
