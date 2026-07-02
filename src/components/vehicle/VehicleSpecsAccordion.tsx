import { type VehicleSpecs } from "@/data/vehicles";

interface VehicleSpecsAccordionProps {
  specs: VehicleSpecs;
}

const sections: { key: keyof VehicleSpecs; label: string }[] = [
  { key: "engine", label: "Engine" },
  { key: "interior", label: "Interior" },
  { key: "exterior", label: "Exterior" },
  { key: "features", label: "Features" },
  { key: "safety", label: "Safety" },
  { key: "performance", label: "Performance" },
];

export function VehicleSpecsAccordion({ specs }: VehicleSpecsAccordionProps) {
  return (
    <section className="px-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-lg font-medium text-ink">Vehicle specification</h2>

        <div className="mt-4 space-y-2">
          {sections.map((section) => (
            <details
              key={section.key}
              className="group rounded-[var(--radius-card)] border border-line bg-paper open:bg-paper/80"
            >
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 py-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
                {section.label}
                <span className="text-muted transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <ul className="space-y-2 border-t border-line px-5 py-4">
                {specs[section.key].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
