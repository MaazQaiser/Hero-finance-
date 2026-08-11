"use client";

import { type ApplicationData } from "@/lib/apply/types";

interface JointApplicantReviewProps {
  data: ApplicationData;
  onEdit?: (stepId: string) => void;
}

function formatDuration(value: string): string {
  return value.replace(/-/g, " ");
}

function formatTitleCase(value: string): string {
  if (!value) return "—";
  return value
    .split(/[-_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function Row({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit?: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        padding: "12px 0",
        borderBottom: "1px solid var(--aline)",
      }}
    >
      <div style={{ minWidth: 0, flex: 1 }}>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            fontWeight: 600,
            color: "var(--aink-soft)",
          }}
        >
          {label}
        </p>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: 15.5,
            fontWeight: 550,
            lineHeight: 1.35,
            color: "var(--aink)",
            wordBreak: "break-word",
          }}
        >
          {value || "—"}
        </p>
      </div>
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
  );
}

export function JointApplicantReview({ data, onEdit }: JointApplicantReviewProps) {
  const name =
    [data.jointFirstName, data.jointLastName].filter(Boolean).join(" ") || "—";
  const employmentLabel =
    {
      "employed-full-time": "Employed full time",
      "employed-part-time": "Employed part time",
      "self-employed": "Self employed",
      retired: "Retired",
      student: "Student",
      unemployed: "Unemployed",
      "receiving-benefits": "Receiving benefits",
      homemaker: "Homemaker",
    }[data.jointEmploymentStatusFull] ??
    formatTitleCase(data.jointEmploymentStatusFull || data.jointEmploymentStatus);

  return (
    <div
      style={{
        borderRadius: "var(--aradius)",
        border: "1.5px solid var(--aline)",
        background: "#fff",
        padding: "4px 16px 8px",
      }}
    >
      <Row label="Full name" value={name} onEdit={onEdit ? () => onEdit("ja-name") : undefined} />
      <Row
        label="Date of birth"
        value={data.jointDateOfBirth}
        onEdit={onEdit ? () => onEdit("ja-dob") : undefined}
      />
      <Row
        label="Relationship"
        value={data.jointRelationship}
        onEdit={onEdit ? () => onEdit("ja-relationship") : undefined}
      />
      <Row
        label="Current address"
        value={data.jointAddress || data.jointPostcode}
        onEdit={onEdit ? () => onEdit("ja-address") : undefined}
      />
      <Row
        label="Time at address"
        value={
          data.jointAddressTenure?.startsWith("Yes")
            ? "3 years or more"
            : data.jointAddressTenure?.startsWith("No")
              ? "Less than 3 years"
              : formatDuration(data.jointAddressTenure)
        }
        onEdit={onEdit ? () => onEdit("ja-address-duration") : undefined}
      />
      {data.jointPreviousAddress ? (
        <Row
          label="Previous address"
          value={data.jointPreviousAddress}
          onEdit={onEdit ? () => onEdit("ja-previous-address") : undefined}
        />
      ) : null}
      <Row
        label="Residential status"
        value={data.jointLivingStatus}
        onEdit={onEdit ? () => onEdit("ja-living") : undefined}
      />
      <Row
        label="Employment status"
        value={employmentLabel}
        onEdit={onEdit ? () => onEdit("ja-employment") : undefined}
      />
      {data.jointEmployerName ? (
        <Row
          label="Employer"
          value={[data.jointEmployerName, data.jointJobTitle].filter(Boolean).join(" · ")}
          onEdit={onEdit ? () => onEdit("ja-employer") : undefined}
        />
      ) : null}
      {data.jointJobDuration ? (
        <Row
          label="Time in role"
          value={formatDuration(data.jointJobDuration)}
          onEdit={onEdit ? () => onEdit("ja-job-duration") : undefined}
        />
      ) : null}
      <Row
        label="Monthly income"
        value={data.jointMonthlyIncome ? `£${data.jointMonthlyIncome}` : "—"}
        onEdit={onEdit ? () => onEdit("ja-income") : undefined}
      />
      <Row
        label="Mobile number"
        value={data.jointMobile}
        onEdit={onEdit ? () => onEdit("ja-mobile") : undefined}
      />
      <Row
        label="Email"
        value={data.jointEmail}
        onEdit={onEdit ? () => onEdit("ja-email") : undefined}
      />
    </div>
  );
}
