"use client";

interface CoverageListProps {
  title: string;
  items: string[];
  tone?: "positive" | "neutral";
}

export function CoverageList({ title, items, tone = "positive" }: CoverageListProps) {
  return (
    <div>
      {title ? <p className="text-sm font-semibold text-ink">{title}</p> : null}
      <ul className={title ? "mt-3 space-y-2" : "space-y-2"}>
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-muted">
            <span className={tone === "positive" ? "text-green-deep" : "text-muted"} aria-hidden>
              {tone === "positive" ? "✓" : "–"}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
