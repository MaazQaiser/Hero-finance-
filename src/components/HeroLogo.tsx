import Image from "next/image";

type HeroLogoVariant = "primary" | "endorsed" | "icon";

interface HeroLogoProps {
  priority?: boolean;
  className?: string;
  /** primary = Hero Car Finance · endorsed = + Part of Oakwood · icon = shield only */
  variant?: HeroLogoVariant;
}

const ASSETS: Record<
  HeroLogoVariant,
  { src: string; width: number; height: number; alt: string; className: string }
> = {
  primary: {
    src: "/brand/hero-logo-primary.png",
    width: 220,
    height: 56,
    alt: "Hero Car Finance",
    className: "h-8 w-auto sm:h-9 md:h-10",
  },
  endorsed: {
    src: "/brand/hero-logo-endorsed.png",
    width: 240,
    height: 72,
    alt: "Hero — Part of Oakwood Motor Company",
    className: "h-10 w-auto sm:h-11 md:h-12",
  },
  icon: {
    src: "/brand/hero-icon.png",
    width: 48,
    height: 60,
    alt: "Hero Car Finance",
    className: "h-9 w-auto",
  },
};

export function HeroLogo({
  priority = false,
  className = "",
  variant = "primary",
}: HeroLogoProps) {
  const asset = ASSETS[variant];

  return (
    <span className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        className={asset.className}
        priority={priority}
      />
    </span>
  );
}
