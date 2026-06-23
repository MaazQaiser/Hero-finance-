export function DecisionTrustStrip() {
  const items = [
    "Soft search completed",
    "No impact on your credit score",
    "One team handling everything",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-cream/10 bg-surface/60 px-3 py-1.5 text-xs text-cream-muted"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
