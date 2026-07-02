import { Button } from "@/components/ui/Button";

export function StockFinanceCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/90 p-4 backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink">Can&apos;t find your car?</p>
          <p className="text-xs text-muted">We&apos;ll source and finance it for you.</p>
        </div>
        <Button size="md" href="/buy-to-order" className="shrink-0">
          Buy To Order
        </Button>
      </div>
    </div>
  );
}
