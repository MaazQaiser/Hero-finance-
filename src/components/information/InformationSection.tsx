interface InformationSectionProps {
  title?: string;
  items: string[];
  variant?: "positive" | "neutral";
  className?: string;
}

export function InformationSection({
  title,
  items,
  variant = "positive",
  className = "",
}: InformationSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className={className}>
      {title ? <h3 className="text-sm font-semibold text-ink">{title}</h3> : null}
      <ul className={`space-y-2 ${title ? "mt-3" : ""}`}>
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
            <span
              className={`mt-0.5 shrink-0 ${variant === "positive" ? "text-green-deep" : "text-muted"}`}
              aria-hidden
            >
              {variant === "positive" ? "✓" : "–"}
            </span>
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
