export function StockVehicleSkeleton() {
  return (
    <article className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper animate-pulse">
      <div className="aspect-[16/10] bg-mist" />
      <div className="space-y-3 p-4 md:p-5">
        <div className="h-5 w-2/3 rounded-lg bg-line" />
        <div className="h-4 w-full rounded-lg bg-mist" />
        <div className="rounded-2xl border border-line bg-mist p-4">
          <div className="h-4 w-1/3 rounded bg-line" />
          <div className="mt-2 h-6 w-1/2 rounded bg-line" />
          <div className="mt-3 h-8 w-2/3 rounded bg-green/15" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="h-11 rounded-full bg-line" />
          <div className="h-11 rounded-full bg-line" />
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
