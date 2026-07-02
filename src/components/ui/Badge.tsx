import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "coral" | "neutral" | "success";
  className?: string;
}

const variantClasses = {
  coral: "bg-green/15 text-green-deep border-green/30",
  neutral: "bg-mist text-ink border-line",
  success: "bg-success/15 text-success border-success/30",
};

export function Badge({
  children,
  variant = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
