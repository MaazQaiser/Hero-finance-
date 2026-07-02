import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "light";
}

const variantClasses = {
  default: "bg-paper border border-line text-ink",
  elevated:
    "bg-paper border border-line text-ink shadow-[0_8px_32px_rgba(11,41,32,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(11,41,32,0.12)]",
  light: "bg-mist-2 text-ink border border-line",
};

export function Card({
  children,
  className = "",
  variant = "default",
}: CardProps) {
  return (
    <div
      className={`rounded-[20px] p-6 md:p-8 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
