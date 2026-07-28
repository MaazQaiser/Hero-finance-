"use client";

import React from "react";
import { type ApplicationData } from "@/lib/apply/types";
import { type FieldErrors } from "@/lib/apply/validation";
import { AddressLookup } from "@/components/apply/AddressLookup";
import { ChoiceOption } from "@/components/apply/shell/ChoiceOption";

interface ApplyStepContentProps {
  stepId: string;
  data: ApplicationData;
  onChange: (updates: Partial<ApplicationData>) => void;
  onAutoAdvance?: () => void;
  fieldErrors?: FieldErrors;
  behaviour?: unknown;
}

function ShellInput({
  id,
  label,
  error,
  optional = false,
  prefix,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  prefix?: string;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label
        htmlFor={id}
        style={{ display: "block", fontSize: 13.5, fontWeight: 600, marginBottom: 7, color: "var(--aink)" }}
      >
        {label}{" "}
        {optional && (
          <span style={{ fontWeight: 400, color: "var(--aink-soft)" }}>— optional</span>
        )}
      </label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {prefix && (
          <span
            style={{
              position: "absolute",
              left: 16,
              fontSize: 17,
              color: "var(--aink-soft)",
              pointerEvents: "none",
            }}
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          style={{
            width: "100%",
            fontSize: 17,
            color: "var(--aink)",
            background: "#fff",
            border: `1.5px solid ${error ? "var(--aerror)" : "var(--aline)"}`,
            borderRadius: "var(--aradius)",
            padding: prefix ? "15px 16px 15px 32px" : "15px 16px",
            appearance: "none",
          }}
          {...props}
        />
      </div>
      {error && (
        <p style={{ marginTop: 7, fontSize: 13, color: "var(--aerror)", fontWeight: 500 }}>
          {error}
        </p>
      )}
    </div>
  );
}

function RowFields({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {React.Children.map(children, (child) => (
        <div style={{ flex: 1 }}>{child}</div>
      ))}
    </div>
  );
}

function ChoiceList({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {options.map((opt) => (
        <ChoiceOption
          key={opt}
          label={opt}
          selected={value === opt}
          onClick={() => onSelect(opt)}
        />
      ))}
    </div>
  );
}

function ConsentCheck({
  id,
  checked,
  label,
  error,
  onChange,
}: {
  id: string;
  checked: boolean;
  label: string;
  error?: string;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        border: `1.5px solid ${checked ? "var(--agreen)" : error ? "var(--aerror)" : "var(--aline)"}`,
        borderRadius: "var(--aradius)",
        padding: "15px 16px",
        marginBottom: 9,
        cursor: "pointer",
        fontSize: 14.5,
        lineHeight: 1.45,
        background: checked ? "var(--agreen-wash)" : error ? "var(--aerror-wash)" : "#fff",
        transition: "border-color 0.15s, background 0.15s",
      }}
    >
      <span
        style={{
          width: 21,
          height: 21,
          flexShrink: 0,
          border: `1.5px solid ${checked ? "var(--agreen)" : "var(--aline-strong)"}`,
          borderRadius: 6,
          background: checked ? "var(--agreen)" : "#fff",
          display: "grid",
          placeItems: "center",
          marginTop: 1,
          transition: "background 0.2s, border-color 0.2s",
        }}
      >
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path
              d="M1 3.5l2.5 2.5 4.5-5"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        readOnly
      />
      <span style={{ color: "var(--aink)" }}>{label}</span>
    </label>
  );
}

export function ApplyStepContent({
  stepId,
  data,
  onChange,
  onAutoAdvance,
  fieldErrors = {},
}: ApplyStepContentProps) {
  const autoSelect = (updates: Partial<ApplicationData>) => {
    onChange(updates);
    onAutoAdvance?.();
  };

  switch (stepId) {
    // ── Section 0: Quick questions ────────────────────────────────────────
    case "budget":
      return (
        <ChoiceList
          options={["Under £200", "£200 to £300", "£300 to £400", "£400 to £500", "Over £500"]}
          value={data.budgetBand}
          onSelect={(v) => autoSelect({ budgetBand: v })}
        />
      );

    case "deposit":
      return (
        <ChoiceList
          options={["None", "Under £500", "£500 to £1,000", "£1,000 to £2,500", "Over £2,500"]}
          value={data.depositBand}
          onSelect={(v) => autoSelect({ depositBand: v })}
        />
      );

    case "car-type":
      return (
        <ChoiceList
          options={["Small car", "Family car or estate", "SUV", "Van or pickup", "Not sure yet"]}
          value={data.carType}
          onSelect={(v) => autoSelect({ carType: v })}
        />
      );

    case "credit-rating":
      return (
        <ChoiceList
          options={["Excellent", "Good", "Fair", "Poor", "Not sure"]}
          value={data.creditRating}
          onSelect={(v) => autoSelect({ creditRating: v })}
        />
      );

    case "when":
      return (
        <ChoiceList
          options={["This week", "Within a month", "1 to 3 months", "Just looking for now"]}
          value={data.purchaseTimeframe}
          onSelect={(v) => autoSelect({ purchaseTimeframe: v })}
        />
      );

    // ── Section 1: Your details ───────────────────────────────────────────
    case "name":
      return (
        <RowFields>
          <ShellInput
            id="firstName"
            label="First name"
            placeholder="Daniel"
            autoFocus
            autoComplete="given-name"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            error={fieldErrors.firstName}
          />
          <ShellInput
            id="lastName"
            label="Last name"
            placeholder="Smith"
            autoComplete="family-name"
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            error={fieldErrors.lastName}
          />
        </RowFields>
      );

    case "mobile":
      return (
        <ShellInput
          id="mobile"
          label="Mobile number"
          type="tel"
          inputMode="numeric"
          placeholder="07700 900000"
          autoFocus
          autoComplete="tel"
          value={data.mobile}
          onChange={(e) => onChange({ mobile: e.target.value })}
          error={fieldErrors.mobile}
        />
      );

    case "email":
      return (
        <ShellInput
          id="email"
          label="Email address"
          type="email"
          inputMode="email"
          placeholder="you@email.com"
          autoFocus
          autoComplete="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          error={fieldErrors.email}
        />
      );

    case "dob":
      return (
        <ShellInput
          id="dob"
          label="Date of birth"
          type="date"
          autoFocus
          value={data.dateOfBirth}
          onChange={(e) => onChange({ dateOfBirth: e.target.value })}
          error={fieldErrors.dateOfBirth}
          max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
            .toISOString()
            .split("T")[0]}
        />
      );

    case "joint-choice":
      return (
        <ChoiceList
          options={["Just me", "With someone else"]}
          value={data.jointApplicant ? "With someone else" : "Just me"}
          onSelect={(v) => autoSelect({ jointApplicant: v === "With someone else" })}
        />
      );

    // ── Section 2: Licence ────────────────────────────────────────────────
    case "licence":
      return (
        <ChoiceList
          options={[
            "Full UK licence",
            "Provisional licence",
            "EU or international licence",
            "No licence",
          ]}
          value={
            data.drivingLicence === "full-uk"
              ? "Full UK licence"
              : data.drivingLicence === "provisional"
                ? "Provisional licence"
                : data.drivingLicence === "eu-international"
                  ? "EU or international licence"
                  : data.drivingLicence === "none"
                    ? "No licence"
                    : ""
          }
          onSelect={(v) => {
            const map: Record<string, ApplicationData["drivingLicence"]> = {
              "Full UK licence": "full-uk",
              "Provisional licence": "provisional",
              "EU or international licence": "eu-international",
              "No licence": "none",
            };
            autoSelect({ drivingLicence: map[v] ?? "" });
          }}
        />
      );

    // ── Section 3: Address ────────────────────────────────────────────────
    case "address":
      return (
        <AddressLookup
          key="current-address"
          postcodeId="postcode"
          addressId="address"
          postcode={data.postcode}
          address={data.address}
          onPostcodeChange={(postcode) => onChange({ postcode, address: "" })}
          onAddressChange={(address) => onChange({ address })}
          errors={{
            postcode: fieldErrors.postcode,
            address: fieldErrors.address,
          }}
          autoFocus
        />
      );

    case "address-duration":
      return (
        <ChoiceList
          options={[
            "Under 6 months",
            "6 to 12 months",
            "1 to 2 years",
            "2 to 3 years",
            "Over 3 years",
          ]}
          value={data.addressTenure}
          onSelect={(v) => autoSelect({ addressTenure: v })}
        />
      );

    case "living":
      return (
        <ChoiceList
          options={[
            "Homeowner with a mortgage",
            "Homeowner, no mortgage",
            "Renting privately",
            "Renting from council or housing association",
            "Living with parents or family",
            "Other",
          ]}
          value={data.livingStatus}
          onSelect={(v) => autoSelect({ livingStatus: v })}
        />
      );

    case "previous-address":
      return (
        <AddressLookup
          key="previous-address"
          postcodeId="previousPostcode"
          addressId="previousAddress"
          postcode={data.previousPostcode}
          address={data.previousAddress}
          onPostcodeChange={(previousPostcode) =>
            onChange({ previousPostcode, previousAddress: "" })
          }
          onAddressChange={(previousAddress) => onChange({ previousAddress })}
          errors={{
            postcode: fieldErrors.previousPostcode,
            address: fieldErrors.previousAddress,
          }}
          autoFocus
        />
      );

    case "previous-address-duration":
      return (
        <ChoiceList
          options={["Under 1 year", "1 to 2 years", "2 to 3 years", "Over 3 years"]}
          value={data.previousAddressTenure}
          onSelect={(v) => autoSelect({ previousAddressTenure: v })}
        />
      );

    // ── Section 4: Work & income ──────────────────────────────────────────
    case "employment":
      return (
        <ChoiceList
          options={[
            "Employed full time",
            "Employed part time",
            "Self employed",
            "Retired",
            "Student",
            "Unemployed",
            "Receiving benefits",
            "Homemaker",
          ]}
          value={
            {
              "employed-full-time": "Employed full time",
              "employed-part-time": "Employed part time",
              "self-employed": "Self employed",
              retired: "Retired",
              student: "Student",
              unemployed: "Unemployed",
              "receiving-benefits": "Receiving benefits",
              homemaker: "Homemaker",
            }[data.employmentStatusFull] ?? ""
          }
          onSelect={(v) => {
            const map: Record<string, string> = {
              "Employed full time": "employed-full-time",
              "Employed part time": "employed-part-time",
              "Self employed": "self-employed",
              Retired: "retired",
              Student: "student",
              Unemployed: "unemployed",
              "Receiving benefits": "receiving-benefits",
              Homemaker: "homemaker",
            };
            autoSelect({ employmentStatusFull: map[v] ?? v });
          }}
        />
      );

    case "employer": {
      const isSe = data.employmentStatusFull === "self-employed";
      return (
        <div>
          <ShellInput
            id="employerName"
            label={isSe ? "Business name" : "Employer name"}
            placeholder={isSe ? "Smith Joinery" : "Oakwood Motor Company"}
            autoFocus
            value={data.employerName}
            onChange={(e) => onChange({ employerName: e.target.value })}
            error={fieldErrors.employerName}
          />
          <ShellInput
            id="jobTitle"
            label="Job title"
            placeholder="Site manager"
            value={data.jobTitle}
            onChange={(e) => onChange({ jobTitle: e.target.value })}
            error={fieldErrors.jobTitle}
          />
        </div>
      );
    }

    case "job-duration":
      return (
        <ChoiceList
          options={[
            "Under 3 months",
            "3 to 6 months",
            "6 to 12 months",
            "1 to 3 years",
            "Over 3 years",
          ]}
          value={data.jobDuration}
          onSelect={(v) => autoSelect({ jobDuration: v })}
        />
      );

    case "income":
      return (
        <div>
          <ShellInput
            id="monthlyIncome"
            label="Monthly income before tax"
            type="text"
            inputMode="numeric"
            placeholder="2,500"
            autoFocus
            prefix="£"
            value={data.monthlyIncome}
            onChange={(e) => onChange({ monthlyIncome: e.target.value })}
            error={fieldErrors.monthlyIncome}
          />
          <ShellInput
            id="otherIncome"
            label="Other regular income"
            type="text"
            inputMode="numeric"
            placeholder="0"
            optional
            prefix="£"
            value={data.otherIncome}
            onChange={(e) => onChange({ otherIncome: e.target.value })}
          />
        </div>
      );

    // ── Section 5: Confirm ────────────────────────────────────────────────
    case "consent": {
      const consentError =
        fieldErrors.termsAccepted ?? fieldErrors.privacyAccepted;
      return (
        <div>
          <p
            style={{
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              color: "var(--aink-soft)",
              margin: "4px 0 10px",
            }}
          >
            Required
          </p>
          <ConsentCheck
            id="termsAccepted"
            checked={data.termsAccepted}
            label="I agree to the Terms and Conditions and understand this is a finance application."
            error={fieldErrors.termsAccepted}
            onChange={(v) => onChange({ termsAccepted: v })}
          />
          <ConsentCheck
            id="privacyAccepted"
            checked={data.privacyAccepted}
            label="I have read and accept the Privacy Policy."
            error={fieldErrors.privacyAccepted}
            onChange={(v) => onChange({ privacyAccepted: v })}
          />
          {consentError && (
            <p
              style={{
                marginTop: 4,
                fontSize: 13,
                color: "var(--aerror)",
                fontWeight: 500,
              }}
            >
              Accept the required policies to continue
            </p>
          )}

          <p
            style={{
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              color: "var(--aink-soft)",
              margin: "20px 0 10px",
            }}
          >
            Optional
          </p>
          <ConsentCheck
            id="marketingConsent"
            checked={data.marketingConsent}
            label="Send me updates about cars and offers."
            onChange={(v) => onChange({ marketingConsent: v })}
          />
        </div>
      );
    }

    default:
      return null;
  }
}
