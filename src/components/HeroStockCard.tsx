import Image from "next/image";
import Link from "next/link";

const stockAvatars = [
  { src: "/images/stock/used-car-1.jpg", alt: "Used BMW" },
  { src: "/images/stock/used-car-listed-2.jpg", alt: "Used hatchback" },
  { src: "/images/stock/used-car-3.jpg", alt: "Used family car" },
  { src: "/images/stock/forecourt-row.jpg", alt: "Used cars on forecourt" },
];

export function HeroStockCard() {
  return (
    <div className="w-full max-w-[280px] rounded-2xl border border-line bg-mist-2 p-4 shadow-[0_12px_40px_rgba(30,22,53,0.12)] sm:max-w-[300px]">
      <p className="font-display text-sm font-extrabold tracking-wide text-green-deep">
        In stock now
      </p>
      <div className="mt-3 flex -space-x-2">
        {stockAvatars.map((car) => (
          <div
            key={car.alt}
            className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-paper ring-1 ring-line"
          >
            <Image src={car.src} alt={car.alt} fill className="object-cover" sizes="40px" />
          </div>
        ))}
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-paper bg-green text-[10px] font-bold text-white ring-1 ring-line">
          400+
        </span>
      </div>
      <p className="mt-3 text-sm font-medium leading-snug text-muted">
        AA-assured cars ready to finance today.
      </p>
      <Link
        href="/cars"
        className="mt-3 inline-flex text-sm font-bold text-green-deep transition-colors hover:text-ink"
      >
        Browse stock →
      </Link>
    </div>
  );
}
