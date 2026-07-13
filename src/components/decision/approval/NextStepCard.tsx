"use client";

interface NextStepCardProps {
  title?: string;
  description?: string;
}

export function NextStepCard({
  title = "What happens next?",
  description = "We'll now show you vehicles that fit your approval so you can continue with confidence.",
}: NextStepCardProps) {
  return (
    <section className="motion-card hero-fade-up-delay-5 rounded-[var(--radius-card)] border border-line bg-mist-2 p-5">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </section>
  );
}
