"use client";

interface ApplyValidationBannerProps {
  errorCount: number;
}

export function ApplyValidationBanner({ errorCount }: ApplyValidationBannerProps) {
  if (errorCount === 0) return null;

  return (
    <div
      role="alert"
      className="mb-6 rounded-2xl border border-green/30 bg-green/10 px-4 py-3"
    >
      <p className="text-sm font-medium text-green-deep">
        {errorCount === 1
          ? "Please check the highlighted field below."
          : `Please check the ${errorCount} highlighted fields below.`}
      </p>
      <p className="mt-1 text-xs text-muted">
        We need a few details corrected before you can continue.
      </p>
    </div>
  );
}
