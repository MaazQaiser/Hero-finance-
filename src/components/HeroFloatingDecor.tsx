const floatingCards = [
  { label: "8.9% APR from", className: "right-0 top-20 animate-float-delay-2" },
  { label: "400+ cars in stock", className: "-left-4 bottom-32 animate-float-delay-3" },
  { label: "Soft search only", className: "right-2 bottom-16 animate-float-delay-4" },
];

export function HeroFloatingDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {floatingCards.map((card) => (
        <div
          key={card.label}
          className={`glass-chip absolute ${card.className} px-4 py-2.5 text-xs font-bold text-ink shadow-[0_8px_24px_rgba(11,41,32,0.08)]`}
        >
          {card.label}
        </div>
      ))}
    </div>
  );
}
