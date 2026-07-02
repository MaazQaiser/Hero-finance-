import { TrustpilotWidget } from "@/components/TrustpilotWidget";

const flatStats = [{ value: "8.9%", label: "APR from" }];

function AAAssuredCarsBadge() {
  return (
    <div className="flex items-center gap-2.5">
      <div
        aria-hidden
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#FEDD00] shadow-[0_0_0_1px_rgba(11,41,32,0.1)] sm:h-9 sm:w-9"
      >
        <span className="select-none font-display text-[11px] font-extrabold italic leading-none text-ink sm:text-xs">
          AA
        </span>
      </div>
      <p className="text-sm font-medium leading-none text-ink">
        <span className="font-display text-xl font-extrabold sm:text-2xl">Assured</span>{" "}
        <span className="font-normal text-muted">cars</span>
      </p>
    </div>
  );
}

export function HeroTrustStats() {
  return (
    <div className="border-t border-line/50 pt-8 md:pt-10">
      <div className="flex flex-col items-stretch gap-8 sm:flex-row sm:items-center sm:justify-center sm:gap-0">
        <div className="flex flex-1 items-center justify-center sm:px-8">
          <div className="w-full max-w-[320px]">
            <TrustpilotWidget />
          </div>
        </div>

        {flatStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-1 items-center justify-center gap-2 border-line/50 sm:border-l sm:px-8"
          >
            <p className="font-display text-2xl font-extrabold text-ink">{stat.value}</p>
            <p className="text-sm font-medium text-muted">{stat.label}</p>
          </div>
        ))}

        <div className="flex flex-1 items-center justify-center border-line/50 sm:border-l sm:px-8">
          <AAAssuredCarsBadge />
        </div>
      </div>
    </div>
  );
}
