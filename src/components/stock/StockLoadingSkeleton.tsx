export function StockVehicleSkeleton() {
  return (
    <article className="overflow-hidden rounded-[var(--radius-card)] border border-cream/10 bg-surface animate-pulse">
      <div className="aspect-[16/10] bg-cream/5" />
      <div className="space-y-3 p-4 md:p-5">
        <div className="h-5 w-2/3 rounded-lg bg-cream/10" />
        <div className="h-4 w-full rounded-lg bg-cream/5" />
        <div className="rounded-2xl border border-cream/10 bg-charcoal/40 p-4">
          <div className="h-4 w-1/3 rounded bg-cream/10" />
          <div className="mt-2 h-6 w-1/2 rounded bg-cream/10" />
          <div className="mt-3 h-8 w-2/3 rounded bg-coral/20" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="h-11 rounded-full bg-cream/10" />
          <div className="h-11 rounded-full bg-cream/10" />
        </div>
      </div>
    </article>
  );
}

export function StockLoadingGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <StockVehicleSkeleton key={index} />
      ))}
    </div>
  );
}
