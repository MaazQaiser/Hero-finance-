interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p className={`eyebrow mb-4 ${dark ? "text-green-bright" : ""}`}>{eyebrow}</p>
      )}
      <h2 className={`headline-lg ${dark ? "text-white" : ""}`}>{title}</h2>
      {description && (
        <p className={`body-lg mt-5 ${dark ? "text-white/70" : ""}`}>{description}</p>
      )}
    </div>
  );
}
