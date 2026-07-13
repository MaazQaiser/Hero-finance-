"use client";

interface LoadingStepProps {
  title: string;
  description: string;
  visible: boolean;
}

export function LoadingStep({ title, description, visible }: LoadingStepProps) {
  return (
    <div
      className={`mx-auto max-w-sm transition-all duration-300 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
      aria-live="polite"
      aria-atomic
    >
      <h1 className="text-2xl font-medium text-ink md:text-3xl">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
