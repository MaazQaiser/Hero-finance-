"use client";

import { approvalContent } from "@/config/approvalContent";

interface ApprovalHeaderProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  applicantName?: string;
}

export function ApprovalHeader({
  eyebrow = approvalContent.eyebrow,
  title = approvalContent.title,
  description = approvalContent.description,
  applicantName,
}: ApprovalHeaderProps) {
  const personalizedDescription =
    applicantName && !description.includes(applicantName)
      ? `${description.replace(/\.$/, "")}, ${applicantName}.`
      : description;

  return (
    <section className="approval-header text-center">
      <div
        className="approval-success-icon hero-success-in mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-success"
        aria-hidden
      >
        <svg
          className="h-10 w-10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <p className="hero-fade-up-delay mt-6 text-sm font-semibold tracking-wide text-green-deep">
        {eyebrow}
      </p>
      <h1 className="hero-fade-up-delay-2 mt-2 text-3xl font-medium text-ink">{title}</h1>
      <p className="hero-fade-up-delay-3 mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
        {personalizedDescription}
      </p>
    </section>
  );
}
