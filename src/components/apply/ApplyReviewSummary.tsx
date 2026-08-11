"use client";

import { useState } from "react";
import { type ApplicationData } from "@/lib/apply/types";

interface ApplyReviewSummaryProps {
  data: ApplicationData;
  onEdit?: (stepId: string) => void;
}

const EMPLOYMENT_LABELS: Record<string, string> = {
  "employed-full-time": "Employed full time",
  "employed-part-time": "Employed part time",
  "self-employed": "Self employed",
  retired: "Retired",
  student: "Student",
  unemployed: "Unemployed",
  "receiving-benefits": "Receiving benefits",
  homemaker: "Homemaker",
  other: "Other",
};

function formatTitleCase(value: string): string {
  if (!value) return "—";
  return value
    .split(/[-_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatMoney(value: string): string {
  if (!value) return "—";
  const n = Number(value.replace(/[^\d]/g, ""));
  if (!Number.isFinite(n) || n <= 0) return `£${value}`;
  return `£${n.toLocaleString("en-GB")}/month`;
}

function formatMileage(value: string): string {
  if (!value) return "—";
  const n = Number(value.replace(/[^\d]/g, ""));
  if (!Number.isFinite(n)) return value;
  return `${n.toLocaleString("en-GB")} miles`;
}

function formatTenure(value: string): string {
  if (!value) return "—";
  if (value.startsWith("Yes")) return "3 years or more";
  if (value.startsWith("No")) return "Less than 3 years";
  return value.replace(/-/g, " ");
}

function employmentLabel(statusFull: string, fallback = ""): string {
  return EMPLOYMENT_LABELS[statusFull] ?? formatTitleCase(statusFull || fallback);
}

type ReviewSection = {
  id: string;
  title: string;
  editStepId: string;
  summary: string[];
  details: { label: string; value: string }[];
};

function buildSections(data: ApplicationData): ReviewSection[] {
  const fullName =
    [data.firstName, data.lastName].filter(Boolean).join(" ") || "—";
  const jointName =
    [data.jointFirstName, data.jointLastName].filter(Boolean).join(" ") || "—";

  const sections: ReviewSection[] = [
    {
      id: "personal",
      title: "Personal Details",
      editStepId: "name",
      summary: [fullName, data.mobile || "—"].filter(Boolean),
      details: [
        { label: "Full name", value: fullName },
        { label: "Mobile", value: data.mobile || "—" },
        { label: "Email", value: data.email || "Not provided" },
        { label: "Date of birth", value: data.dateOfBirth || "—" },
      ],
    },
    {
      id: "address",
      title: "Address History",
      editStepId: "address",
      summary: [
        data.address || data.postcode || "—",
        formatTenure(data.addressTenure || data.yearsAtAddress),
      ],
      details: [
        { label: "Current address", value: data.address || data.postcode || "—" },
        {
          label: "Time at address",
          value: formatTenure(data.addressTenure || data.yearsAtAddress),
        },
        ...(data.previousAddress
          ? [{ label: "Previous address", value: data.previousAddress }]
          : []),
        ...(data.livingStatus
          ? [{ label: "Residential status", value: data.livingStatus }]
          : []),
      ],
    },
    {
      id: "employment",
      title: "Employment",
      editStepId: "employment",
      summary: [
        employmentLabel(data.employmentStatusFull, data.employmentStatus),
        data.employerName || data.jobDuration || data.employmentDuration || "—",
      ],
      details: [
        {
          label: "Status",
          value: employmentLabel(data.employmentStatusFull, data.employmentStatus),
        },
        ...(data.employerName
          ? [{ label: "Employer", value: data.employerName }]
          : []),
        ...(data.jobTitle ? [{ label: "Job title", value: data.jobTitle }] : []),
        ...(data.jobDuration || data.employmentDuration
          ? [
              {
                label: "Time in role",
                value: (data.jobDuration || data.employmentDuration).replace(
                  /-/g,
                  " ",
                ),
              },
            ]
          : []),
        ...(data.previousEmployerName
          ? [{ label: "Previous employer", value: data.previousEmployerName }]
          : []),
      ],
    },
    {
      id: "income",
      title: "Income",
      editStepId: "income",
      summary: [formatMoney(data.monthlyIncome)],
      details: [
        { label: "Monthly gross income", value: formatMoney(data.monthlyIncome) },
        ...(data.otherIncome
          ? [{ label: "Other income", value: formatMoney(data.otherIncome) }]
          : []),
        ...(data.creditRating
          ? [{ label: "Credit profile", value: data.creditRating }]
          : []),
      ],
    },
    {
      id: "vehicle",
      title: "Vehicle Preferences",
      editStepId: "car-type",
      summary: [
        data.carType || "—",
        data.budgetBand || "—",
      ],
      details: [
        { label: "Vehicle type", value: data.carType || "—" },
        { label: "Monthly budget", value: data.budgetBand || "—" },
        ...(data.purchaseTimeframe
          ? [{ label: "When", value: data.purchaseTimeframe }]
          : []),
      ],
    },
    {
      id: "deposit",
      title: "Deposit",
      editStepId: "deposit",
      summary: [data.depositBand || "—"],
      details: [
        { label: "Deposit", value: data.depositBand || "—" },
        {
          label: "Part exchange",
          value:
            data.hasPartExchange === "yes"
              ? "Yes"
              : data.hasPartExchange === "no"
                ? "No"
                : "—",
        },
      ],
    },
  ];

  if (data.hasPartExchange === "yes") {
    const reg = data.partExchangeRegUnknown
      ? "Registration unknown"
      : data.partExchangeRegistration.trim().toUpperCase() || "—";
    const mileage = formatMileage(data.partExchangeMileage);
    const finance =
      data.hasFinanceToSettle === "yes"
        ? "On finance"
        : data.hasFinanceToSettle === "no"
          ? "Not on finance"
          : "—";

    sections.push({
      id: "part-exchange",
      title: "Part Exchange",
      editStepId: "px-registration",
      summary: [reg, mileage, finance].filter((line) => line && line !== "—"),
      details: [
        { label: "Registration", value: reg },
        { label: "Mileage", value: mileage },
        { label: "Finance", value: finance },
        ...(data.hasFinanceToSettle === "yes" && data.partExchangeLender
          ? [{ label: "Lender", value: data.partExchangeLender }]
          : []),
        ...(data.hasFinanceToSettle === "yes" && data.partExchangeMonthlyPayment
          ? [
              {
                label: "Monthly payment",
                value: formatMoney(data.partExchangeMonthlyPayment),
              },
            ]
          : []),
        ...(data.settlementAmount
          ? [{ label: "Settlement", value: `£${data.settlementAmount}` }]
          : []),
      ],
    });
  }

  if (data.jointApplicant) {
    sections.push({
      id: "joint",
      title: "Joint Applicant",
      editStepId: "ja-name",
      summary: [
        jointName,
        employmentLabel(
          data.jointEmploymentStatusFull,
          data.jointEmploymentStatus,
        ),
        formatMoney(data.jointMonthlyIncome),
      ],
      details: [
        { label: "Full name", value: jointName },
        { label: "Date of birth", value: data.jointDateOfBirth || "—" },
        { label: "Relationship", value: data.jointRelationship || "—" },
        {
          label: "Address",
          value: data.jointAddress || data.jointPostcode || "—",
        },
        {
          label: "Employment",
          value: employmentLabel(
            data.jointEmploymentStatusFull,
            data.jointEmploymentStatus,
          ),
        },
        {
          label: "Monthly income",
          value: formatMoney(data.jointMonthlyIncome),
        },
        { label: "Mobile", value: data.jointMobile || "—" },
        { label: "Email", value: data.jointEmail || "—" },
      ],
    });
  }

  return sections;
}

function AccordionCard({
  title,
  summary,
  details,
  open,
  onToggle,
  onEdit,
}: {
  title: string;
  summary: string[];
  details: { label: string; value: string }[];
  open: boolean;
  onToggle: () => void;
  onEdit?: () => void;
}) {
  return (
    <section
      style={{
        borderRadius: "var(--aradius)",
        border: "1.5px solid var(--aline)",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          padding: "14px 14px 12px",
        }}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            background: "transparent",
            padding: 0,
            textAlign: "left",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 700,
                color: "var(--aink)",
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </h3>
            <span
              aria-hidden
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "var(--agreen-wash)",
                color: "var(--agreen)",
                transform: open ? "rotate(180deg)" : "none",
                transition: "transform 0.18s ease",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {summary.map((line, i) => (
              <p
                key={`${title}-summary-${i}`}
                style={{
                  margin: 0,
                  fontSize: 14.5,
                  lineHeight: 1.35,
                  color: "var(--aink-soft)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </button>

        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit"
            title="Edit"
            style={{
              flexShrink: 0,
              marginTop: 0,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              border: "none",
              borderRadius: "50%",
              background: "var(--agreen-wash)",
              color: "var(--agreen)",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 20h9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
      </div>

      {open ? (
        <div
          style={{
            padding: "0 14px 14px",
            borderTop: "1px solid var(--aline)",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: 12,
              paddingTop: 12,
            }}
          >
            {details.map((item) => (
              <div key={`${title}-${item.label}`}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11.5,
                    fontWeight: 650,
                    color: "var(--aink-soft)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    margin: "3px 0 0",
                    fontSize: 14.5,
                    fontWeight: 550,
                    lineHeight: 1.35,
                    color: "var(--aink)",
                    wordBreak: "break-word",
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function ApplyReviewSummary({ data, onEdit }: ApplyReviewSummaryProps) {
  const sections = buildSections(data);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {sections.map((section) => (
        <AccordionCard
          key={section.id}
          title={section.title}
          summary={section.summary}
          details={section.details}
          open={openId === section.id}
          onToggle={() =>
            setOpenId((prev) => (prev === section.id ? null : section.id))
          }
          onEdit={onEdit ? () => onEdit(section.editStepId) : undefined}
        />
      ))}
    </div>
  );
}

/** Trust checklist shown under the Submit CTA on the review screen. */
export function ReviewTrustChecklist() {
  const items = [
    "Soft search only",
    "No impact on your credit score",
    "Secure FCA regulated application",
  ];

  return (
    <ul
      style={{
        listStyle: "none",
        margin: "14px 0 0",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {items.map((item) => (
        <li
          key={item}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontSize: 13,
            lineHeight: 1.35,
            color: "var(--aink-soft)",
          }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "var(--agreen-wash)",
              color: "var(--agreen)",
              flexShrink: 0,
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            ✓
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
