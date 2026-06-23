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
    <footer className="border-t border-cream/10 bg-charcoal pb-24 md:pb-12">
      <div className="section-padding !pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <p className="text-xl font-medium text-cream">
                Hero <span className="font-light text-cream-muted">Car Finance</span>
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-muted">
                Finance-first car buying. Check eligibility, get approved, and
                reserve AA-inspected vehicles — all with one trusted team.
              </p>
            </div>

            <div>
              <p className="eyebrow mb-4">Company</p>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-cream-muted transition-colors hover:text-cream"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-4">Legal</p>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-cream-muted transition-colors hover:text-cream"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-[var(--radius-card)] border border-cream/10 bg-surface/50 p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-cream-muted">
              Representative example
            </p>
            <p className="mt-3 text-xs leading-relaxed text-cream-muted">
              Hire Purchase: Cash price £10,000, deposit £0, amount of credit
              £10,000, 48 monthly payments of £251.32, total amount payable
              £12,063.36, representative APR 9.9% (fixed). Subject to status.
              18+ UK residents only. Hero Car Finance is a credit broker, not a
              lender.
            </p>
          </div>

          <div className="mt-8 space-y-2 border-t border-cream/10 pt-8 text-xs text-cream-muted">
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
