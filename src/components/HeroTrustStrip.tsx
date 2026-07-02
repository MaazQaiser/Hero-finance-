const trustMetrics = [
  { value: "4.8★", label: "Trustpilot" },
  { value: "8.9%", label: "APR from" },
  { value: "AA", label: "Assured cars" },
];

const partners = ["Close Brothers", "Black Horse", "Santander", "MotoNovo"];

export function HeroTrustStrip() {
  return (
    <div className="mt-10 lg:mt-14">
      <div className="flex flex-wrap items-center gap-6 border-t border-line/80 pt-6">
        {trustMetrics.map((item) => (
          <div key={item.label} className="text-left">
            <p className="font-display text-xl font-extrabold text-ink md:text-2xl">
              {item.value}
            </p>
            <p className="text-[11px] font-semibold tracking-wide text-muted">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 hidden items-center gap-4 lg:flex">
        {partners.map((partner) => (
          <span
            key={partner}
            className="text-xs font-bold tracking-wide text-muted/70 grayscale transition-all hover:grayscale-0"
          >
            {partner}
          </span>
        ))}
      </div>
    </div>
  );
}
