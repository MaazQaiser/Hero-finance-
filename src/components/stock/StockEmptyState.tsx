import { Button } from "@/components/ui/Button";

interface StockEmptyStateProps {
  onAdjustFilters: () => void;
}

export function StockEmptyState({ onAdjustFilters }: StockEmptyStateProps) {
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-paper px-6 py-16 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green/10 text-3xl text-green-deep">
        ∅
      </div>
      <h2 className="mt-6 text-xl font-medium text-ink">No cars match your search</h2>
      <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
        Try adjusting your filters or let us source one for you.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button size="lg" onClick={onAdjustFilters}>
          Adjust Filters
        </Button>
        <Button size="lg" variant="secondary" href="/buy-to-order">
          Buy To Order
        </Button>
      </div>
    </div>
  );
}
