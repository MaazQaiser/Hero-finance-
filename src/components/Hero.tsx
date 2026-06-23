import Link from "next/link";
import { Button } from "@/components/ui/Button";

const trustStrip = [
  "Soft search only",
  "No impact on credit score",
  "Decision in minutes",
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-28 pt-28 md:px-8 md:pb-32 lg:max-w-[52rem] lg:justify-center lg:px-12 lg:pb-0 lg:pt-32">
      <p className="eyebrow mb-5">Finance-first car buying</p>
      <h1 className="headline-hero max-w-4xl text-cream">
        Get car finance approved in minutes
      </h1>

      <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center">
        <Button
          size="lg"
          href="/apply"
          className="shadow-lg shadow-coral/25 sm:min-w-[220px]"
        >
          Check Eligibility
        </Button>
        <Link
          href="/cars"
          className="inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-base font-medium text-cream/80 transition-colors hover:text-cream sm:min-h-[3rem]"
        >
          Browse Cars
        </Link>
      </div>

      <ul className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
        {trustStrip.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm font-medium text-cream">
            <span
              aria-hidden
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/20 text-xs text-success"
            >
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
