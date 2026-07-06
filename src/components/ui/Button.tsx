import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  fullWidth?: boolean;
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-green text-white hover:bg-green-deep border border-transparent shadow-[0_4px_14px_rgba(91,43,212,0.25)] active:scale-[0.98]",
  secondary:
    "bg-mist-2 text-ink border-2 border-line hover:border-green/30 hover:bg-mist active:scale-[0.98]",
  ghost:
    "bg-transparent text-ink hover:text-green-deep border border-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-11 px-6 py-2.5 text-sm",
  lg: "min-h-[3rem] px-8 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
