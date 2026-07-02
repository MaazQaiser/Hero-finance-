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
          className="rounded-full border border-line bg-mist px-3 py-1.5 text-xs text-muted"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
