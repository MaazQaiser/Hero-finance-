import Link from "next/link";
import { HeroLogo } from "@/components/HeroLogo";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const footerLinks = {
  company: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Why Hero", href: "#why-hero" },
    { label: "Browse cars", href: "#featured-cars" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy policy", href: "#" },
    { label: "Terms & conditions", href: "#" },
    { label: "Cookie policy", href: "#" },
    { label: "Complaints", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-line bg-mist pb-24 md:pb-12">
      <div className="section-padding !pb-8">
        <div className="container-site">
          <ScrollReveal>
            <div className="grid gap-12 md:grid-cols-3">
              <div>
                <Link href="/" aria-label="Hero Car Finance home">
                  <HeroLogo />
                </Link>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                  Finance-first car buying. Check eligibility, get approved, and
                  reserve AA-inspected vehicles — all with one trusted team.
                </p>
              </div>

              <div>
                <p className="eyebrow mb-5">Company</p>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="eyebrow mb-5">Legal</p>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-14 space-y-3 border-t border-line pt-6 text-xs leading-relaxed text-muted">
            <p>
              Hero Car Finance Ltd is authorised and regulated by the Financial
              Conduct Authority (FRN: 123456). Registered in England & Wales
              (Company No. 12345678). Registered office: 1 Finance Street,
              London, EC1A 1AA.
            </p>
            <p>© {new Date().getFullYear()} Hero Car Finance. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
