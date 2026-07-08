import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { type FinanceDecision, getMatchedVehicles } from "@/lib/apply/decision";
import { formatPrice } from "@/data/vehicles";
import { DecisionSupportCard } from "@/components/decision/DecisionSupportCard";
import { DecisionTrustStrip } from "@/components/decision/DecisionTrustStrip";

const badgeVariantMap = {
  "Hot Deal": "coral",
  "Just In": "neutral",
  "Low Mileage": "success",
} as const;

interface ApprovedDecisionProps {
  decision: FinanceDecision;
}

export function ApprovedDecision({ decision }: ApprovedDecisionProps) {
  const matches = getMatchedVehicles(decision.approvedAmount ?? 25000);

  return (
    <div className="space-y-8 pb-36">
      <section className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-3xl text-success">
          ✓
        </div>
        <h1 className="mt-6 text-3xl font-medium text-ink">
          You&apos;re approved — let&apos;s find your car
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Great news{decision.applicantName ? `, ${decision.applicantName}` : ""}. Your soft
          search is complete and you&apos;re ready to browse vehicles within your budget.
        </p>
      </section>

      <section className="rounded-[var(--radius-card)] border border-green/30 bg-gradient-to-br from-green to-green-deep p-6 text-white">
        <p className="text-xs font-medium tracking-wide text-white/70">
          Your finance summary
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs tracking-wide text-white/70">Approved amount</p>
            <p className="mt-1 text-2xl font-medium text-white">
              {formatPrice(decision.approvedAmount ?? 0)}
            </p>
          </div>
          <div>
            <p className="text-xs tracking-wide text-white/70">Est. monthly</p>
            <p className="mt-1 text-2xl font-medium text-green-bright">
              {formatPrice(decision.estimatedMonthly ?? 0)}
              <span className="text-sm font-normal text-white/70">/mo</span>
            </p>
          </div>
          <div>
            <p className="text-xs tracking-wide text-white/70">Representative APR</p>
            <p className="mt-1 text-lg font-medium text-white">{decision.apr}% fixed</p>
          </div>
          <div>
            <p className="text-xs tracking-wide text-white/70">Term</p>
            <p className="mt-1 text-lg font-medium text-white">
              {decision.termMonths} months
            </p>
          </div>
        </div>

        {decision.lenderName && (
          <div className="mt-5 rounded-2xl bg-green-bright px-4 py-3">
            <p className="text-sm font-medium text-ink/70">
              Finance partner:{" "}
              <span className="font-semibold text-ink">{decision.lenderName}</span>
            </p>
          </div>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-medium text-ink">Cars within your budget</h2>
            <p className="mt-1 text-sm text-muted">
              Hand-picked matches based on your approval
            </p>
          </div>
          <Link href="/cars" className="text-sm text-green-deep hover:underline">
            View all
          </Link>
        </div>

        <div className="carousel-snap -mx-5 px-5">
          {matches.map((vehicle) => (
            <article
              key={vehicle.id}
              className="w-[78vw] shrink-0 snap-center sm:w-[280px]"
            >
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={vehicle.images[0]}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge variant={badgeVariantMap[vehicle.badge]}>{vehicle.badge}</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-ink">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="mt-2 text-xl font-medium text-green-deep">
                    {formatPrice(vehicle.monthlyHp)}
                    <span className="text-sm font-normal text-muted">/mo</span>
                  </p>
                  <p className="text-sm text-muted">{formatPrice(vehicle.price)}</p>
                  <Link href={`/cars/${vehicle.id}`} className="mt-4 block">
                    <Button variant="secondary" fullWidth>
                      View Car
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <DecisionTrustStrip />
      <DecisionSupportCard />
    </div>
  );
}
