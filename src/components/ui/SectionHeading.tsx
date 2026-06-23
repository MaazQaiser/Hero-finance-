interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const textClass = light ? "text-charcoal" : "text-cream";
  const descClass = light ? "text-charcoal/60" : "text-cream-muted";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${light ? "text-charcoal/50" : ""}`}>{eyebrow}</p>}
      <h2 className={`headline-lg ${textClass}`}>{title}</h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed md:text-lg ${descClass}`}>
          {description}
        </p>
      )}
    </div>
  );
}
