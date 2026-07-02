import Image from "next/image";

interface HeroLogoProps {
  priority?: boolean;
  className?: string;
}

export function HeroLogo({ priority = false, className = "" }: HeroLogoProps) {
  return (
    <span className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src="/brand/hero-wordmark-light.svg"
        alt="Hero Car Finance"
        width={100}
        height={36}
        className="h-8 w-auto sm:hidden"
        priority={priority}
      />
      <Image
        src="/brand/hero-logo-full-light.svg"
        alt="Hero Car Finance"
        width={156}
        height={44}
        className="hidden h-9 w-auto sm:block md:h-10"
        priority={priority}
      />
    </span>
  );
}
