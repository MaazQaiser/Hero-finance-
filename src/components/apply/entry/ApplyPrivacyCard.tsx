function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function ApplyPrivacyCard() {
  return (
    <div className="rounded-[20px] border border-green/15 bg-gradient-to-br from-mist/80 to-mist-2 p-5 md:p-6">
      <div className="flex gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green/10 text-green-deep">
          <ShieldIcon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-base font-bold text-ink">
            Your information stays private.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            We only use your information to assess your finance options and never perform a hard
            credit search without your permission.
          </p>
        </div>
      </div>
    </div>
  );
}
