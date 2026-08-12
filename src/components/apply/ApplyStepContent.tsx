"use client";

import React, { useState } from "react";
import { type ApplicationData } from "@/lib/apply/types";
import { type FieldErrors } from "@/lib/apply/validation";
import { AddressLookup } from "@/components/apply/AddressLookup";
import { ChoiceOption } from "@/components/apply/shell/ChoiceOption";
import { JointApplicantReview } from "@/components/apply/JointApplicantReview";
import { ApplyReviewSummary } from "@/components/apply/ApplyReviewSummary";

interface ApplyStepContentProps {
  stepId: string;
  data: ApplicationData;
  onChange: (updates: Partial<ApplicationData>) => void;
  onAutoAdvance?: () => void;
  onGoToStep?: (stepId: string) => void;
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

/** Map legacy "to" tenure labels onto the reordered en-dash labels. */
function normalizeJobDurationLabel(value: string): string {
  const map: Record<string, string> = {
    "3 to 6 months": "3–6 months",
    "6 to 12 months": "6–12 months",
    "1 to 3 years": "1–3 years",
  };
  return map[value] ?? value;
}

const BUDGET_OPTIONS = [
  "Under £150",
  "£150–£200",
  "£200–£300",
  "£300–£400",
  "£400+",
] as const;

const BUDGET_UNSURE = "I'm not sure yet — show me what I can afford";

const CREDIT_OPTIONS = [
  "Excellent",
  "Good",
  "Fair",
  "Poor",
  "I've been refused before",
] as const;

function HelpCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4" strokeLinecap="round" />
      <path d="M12 17h.01" strokeLinecap="round" />
    </svg>
  );
}

function BudgetStep({
  data,
  onChange,
  onAutoAdvance,
}: {
  data: ApplicationData;
  onChange: (updates: Partial<ApplicationData>) => void;
  onAutoAdvance?: () => void;
}) {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {BUDGET_OPTIONS.map((opt) => (
          <ChoiceOption
            key={opt}
            label={opt}
            selected={data.budgetBand === opt}
            onClick={() => {
              onChange({ budgetBand: opt });
              onAutoAdvance?.();
            }}
          />
        ))}
        <ChoiceOption
          label={BUDGET_UNSURE}
          selected={data.budgetBand === BUDGET_UNSURE}
          onClick={() => {
            onChange({ budgetBand: BUDGET_UNSURE });
            onAutoAdvance?.();
          }}
          variant="outlined"
          icon={<HelpCircleIcon />}
        />
      </div>
      <p
        style={{
          marginTop: 12,
          fontSize: 13.5,
          lineHeight: 1.45,
          color: "var(--aink-soft)",
        }}
      >
        Not sure? We&apos;ll help you find a budget that suits your circumstances.
      </p>
    </div>
  );
}

const DEPOSIT_OPTIONS = [
  "£0 Deposit",
  "Under £500",
  "£500–£1,000",
  "£1,000–£1,500",
  "£1,500–£2,500",
  "£2,500+",
] as const;

function DepositStep({
  data,
  onChange,
  onAutoAdvance,
}: {
  data: ApplicationData;
  onChange: (updates: Partial<ApplicationData>) => void;
  onAutoAdvance?: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {DEPOSIT_OPTIONS.map((opt) => (
        <ChoiceOption
          key={opt}
          label={opt}
          selected={data.depositBand === opt}
          onClick={() => {
            onChange({ depositBand: opt });
            onAutoAdvance?.();
          }}
        />
      ))}
    </div>
  );
}

const ADDRESS_TENURE_YES = "Yes, I've lived here for 3 years or more";
const ADDRESS_TENURE_NO = "No, I've moved within the last 3 years";

function AddressTenureStep({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        <ChoiceOption
          label={ADDRESS_TENURE_YES}
          selected={value === ADDRESS_TENURE_YES}
          onClick={() => onSelect(ADDRESS_TENURE_YES)}
        />
        <ChoiceOption
          label={ADDRESS_TENURE_NO}
          selected={value === ADDRESS_TENURE_NO}
          onClick={() => onSelect(ADDRESS_TENURE_NO)}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          padding: "12px 14px",
          borderRadius: "var(--aradius)",
          border: "1.5px solid var(--aline)",
          background: "var(--agreen-wash)",
        }}
      >
        <span
          aria-hidden
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 22,
            height: 22,
            flexShrink: 0,
            marginTop: 1,
            borderRadius: "50%",
            background: "#fff",
            color: "var(--agreen)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 10v5" strokeLinecap="round" />
            <path d="M12 7h.01" strokeLinecap="round" />
          </svg>
        </span>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.45, color: "var(--aink-soft)" }}>
          If you&apos;ve moved within the last three years, we&apos;ll simply ask for your previous
          address next.
        </p>
      </div>
    </div>
  );
}

const FINANCE_LENDERS = [
  "Black Horse",
  "MotoNovo",
  "Close Brothers",
  "Santander",
  "Alphabet",
  "Lex Autolease",
  "Hire Purchase Direct",
  "Other",
];

function PartExchangeRegistrationStep({
  registration,
  unknown,
  error,
  onRegistrationChange,
  onUnknown,
}: {
  registration: string;
  unknown: boolean;
  error?: string;
  onRegistrationChange: (value: string) => void;
  onUnknown: () => void;
}) {
  return (
    <div>
      <label
        htmlFor="partExchangeRegistration"
        style={{ display: "block", fontSize: 13.5, fontWeight: 600, marginBottom: 10, color: "var(--aink)" }}
      >
        Registration number
      </label>
      <input
        id="partExchangeRegistration"
        autoFocus={!unknown}
        autoCapitalize="characters"
        spellCheck={false}
        placeholder="AB12 CDE"
        value={registration}
        disabled={unknown}
        onChange={(e) =>
          onRegistrationChange(e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, ""))
        }
        style={{
          width: "100%",
          minHeight: 64,
          textAlign: "center",
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: "0.12em",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          color: "#1a1a1a",
          background: unknown ? "#f3f0f8" : "#F7C948",
          border: error ? "2px solid var(--aerror)" : "2px solid #1a1a1a",
          borderRadius: 10,
          padding: "14px 16px",
          opacity: unknown ? 0.55 : 1,
        }}
      />
      {error && (
        <p style={{ marginTop: 8, fontSize: 13, color: "var(--aerror)", fontWeight: 500 }}>{error}</p>
      )}
      <button
        type="button"
        onClick={onUnknown}
        style={{
          display: "block",
          marginTop: 14,
          border: "none",
          background: "transparent",
          padding: "8px 0",
          fontFamily: "inherit",
          fontSize: 14,
          fontWeight: 500,
          color: unknown ? "var(--agreen)" : "var(--aink-soft)",
          textDecoration: "underline",
          textUnderlineOffset: 3,
          cursor: "pointer",
        }}
      >
        I don&apos;t know my registration
      </button>
      {unknown && (
        <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.4, color: "var(--aink-soft)" }}>
          No problem — our team can look this up later. Tap Continue to move on.
        </p>
      )}
    </div>
  );
}

function LenderSearchField({
  value,
  error,
  onChange,
}: {
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const [query, setQuery] = useState(value);
  const filtered = FINANCE_LENDERS.filter((lender) =>
    lender.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div>
      <label
        htmlFor="partExchangeLender"
        style={{ display: "block", fontSize: 13.5, fontWeight: 600, marginBottom: 7, color: "var(--aink)" }}
      >
        Finance lender
      </label>
      <input
        id="partExchangeLender"
        autoFocus
        placeholder="Search lenders…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
        }}
        style={{
          width: "100%",
          fontSize: 17,
          color: "var(--aink)",
          background: "#fff",
          border: `1.5px solid ${error ? "var(--aerror)" : "var(--aline)"}`,
          borderRadius: "var(--aradius)",
          padding: "15px 16px",
        }}
      />
      {error && (
        <p style={{ marginTop: 7, fontSize: 13, color: "var(--aerror)", fontWeight: 500 }}>{error}</p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
        {(filtered.length > 0 ? filtered : ["Other"]).map((lender) => (
          <ChoiceOption
            key={lender}
            label={lender}
            selected={value === lender}
            onClick={() => {
              setQuery(lender);
              onChange(lender);
            }}
          />
        ))}
      </div>
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
  onGoToStep,
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
        <BudgetStep
          data={data}
          onChange={onChange}
          onAutoAdvance={onAutoAdvance}
        />
      );

    case "deposit":
      return (
        <DepositStep
          data={data}
          onChange={onChange}
          onAutoAdvance={onAutoAdvance}
        />
      );

    case "part-exchange-choice":
      return (
        <ChoiceList
          options={["Yes", "No"]}
          value={
            data.hasPartExchange === "yes"
              ? "Yes"
              : data.hasPartExchange === "no"
                ? "No"
                : ""
          }
          onSelect={(v) =>
            autoSelect({ hasPartExchange: v === "Yes" ? "yes" : "no" })
          }
        />
      );

    case "car-type":
      return (
        <ChoiceList
          options={[
            "Small car",
            "Family car or estate",
            "SUV",
            "Van or pickup",
            "Not sure yet",
          ]}
          value={data.carType}
          onSelect={(v) => autoSelect({ carType: v })}
        />
      );

    case "credit-rating":
      return (
        <ChoiceList
          options={[...CREDIT_OPTIONS]}
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
          value={
            data.jointApplicant === null
              ? ""
              : data.jointApplicant
                ? "With someone else"
                : "Just me"
          }
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

    case "uk-passport":
      return (
        <ChoiceList
          options={["Yes", "No"]}
          value={
            data.ukPassport === "yes" ? "Yes" : data.ukPassport === "no" ? "No" : ""
          }
          onSelect={(v) => {
            if (v === "Yes") {
              autoSelect({ ukPassport: "yes", passportCountry: "" });
            } else {
              autoSelect({ ukPassport: "no" });
            }
          }}
        />
      );

    case "passport-country":
      return (
        <ShellInput
          id="passportCountry"
          label="Country of issue"
          placeholder="e.g. Poland, India, France"
          autoFocus
          autoComplete="country-name"
          value={data.passportCountry}
          onChange={(e) => onChange({ passportCountry: e.target.value })}
          error={fieldErrors.passportCountry}
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
        <AddressTenureStep
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
        <div>
          <ShellInput
            id="previousAddressMovedIn"
            label="Date moved in"
            type="date"
            autoFocus
            value={data.previousAddressMovedIn}
            onChange={(e) => onChange({ previousAddressMovedIn: e.target.value })}
            error={fieldErrors.previousAddressMovedIn}
          />
          <ShellInput
            id="previousAddressMovedOut"
            label="Date moved out"
            type="date"
            value={data.previousAddressMovedOut}
            onChange={(e) => onChange({ previousAddressMovedOut: e.target.value })}
            error={fieldErrors.previousAddressMovedOut}
          />
        </div>
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
        <ShellInput
          id="employerName"
          label={isSe ? "Business name" : "Employer name"}
          placeholder={isSe ? "Smith Joinery" : "Oakwood Motor Company"}
          autoFocus
          value={data.employerName}
          onChange={(e) => onChange({ employerName: e.target.value })}
          error={fieldErrors.employerName}
        />
      );
    }

    case "job-title":
      return (
        <ShellInput
          id="jobTitle"
          label="Job title"
          placeholder="Site manager"
          autoFocus
          value={data.jobTitle}
          onChange={(e) => onChange({ jobTitle: e.target.value })}
          error={fieldErrors.jobTitle}
        />
      );

    case "job-duration":
      return (
        <ChoiceList
          options={[
            "Over 3 years",
            "1–3 years",
            "6–12 months",
            "3–6 months",
            "Under 3 months",
          ]}
          value={normalizeJobDurationLabel(data.jobDuration)}
          onSelect={(v) => autoSelect({ jobDuration: v })}
        />
      );

    case "previous-employer":
      return (
        <ShellInput
          id="previousEmployerName"
          label="Previous employer name"
          placeholder="Oakwood Motor Company"
          autoFocus
          value={data.previousEmployerName}
          onChange={(e) => onChange({ previousEmployerName: e.target.value })}
          error={fieldErrors.previousEmployerName}
        />
      );

    case "previous-job-title":
      return (
        <ShellInput
          id="previousJobTitle"
          label="Job title"
          placeholder="Site manager"
          autoFocus
          value={data.previousJobTitle}
          onChange={(e) => onChange({ previousJobTitle: e.target.value })}
          error={fieldErrors.previousJobTitle}
        />
      );

    case "previous-employment-start":
      return (
        <ShellInput
          id="previousEmploymentStart"
          label="Employment start date"
          type="date"
          autoFocus
          value={data.previousEmploymentStart}
          onChange={(e) => onChange({ previousEmploymentStart: e.target.value })}
          error={fieldErrors.previousEmploymentStart}
        />
      );

    case "previous-employment-end":
      return (
        <ShellInput
          id="previousEmploymentEnd"
          label="Employment end date"
          type="date"
          autoFocus
          value={data.previousEmploymentEnd}
          onChange={(e) => onChange({ previousEmploymentEnd: e.target.value })}
          error={fieldErrors.previousEmploymentEnd}
        />
      );

    case "income":
      return (
        <ShellInput
          id="monthlyIncome"
          label="Monthly income before tax"
          type="text"
          inputMode="numeric"
          placeholder="2,500"
          autoFocus
          prefix="£"
          value={data.monthlyIncome}
          onChange={(e) => onChange({ monthlyIncome: e.target.value.replace(/[^\d]/g, "") })}
          error={fieldErrors.monthlyIncome}
        />
      );

    case "other-income":
      return (
        <ShellInput
          id="otherIncome"
          label="Other regular income"
          type="text"
          inputMode="numeric"
          placeholder="e.g. 200"
          optional
          autoFocus
          prefix="£"
          value={data.otherIncome}
          onChange={(e) => onChange({ otherIncome: e.target.value.replace(/[^\d]/g, "") })}
        />
      );

    // ── Part Exchange ─────────────────────────────────────────────────────
    case "px-intro":
      return (
        <div
          style={{
            padding: "18px 16px",
            borderRadius: "var(--aradius)",
            border: "1.5px solid var(--aline)",
            background: "var(--agreen-wash)",
          }}
        >
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "var(--aink-soft)" }}>
            A few quick details about your current car. We&apos;ll pass them to our team so they can
            prepare a part exchange valuation — nothing else to do right now.
          </p>
        </div>
      );

    case "px-registration":
      return (
        <PartExchangeRegistrationStep
          registration={data.partExchangeRegistration}
          unknown={data.partExchangeRegUnknown}
          error={fieldErrors.partExchangeRegistration}
          onRegistrationChange={(partExchangeRegistration) =>
            onChange({ partExchangeRegistration, partExchangeRegUnknown: false })
          }
          onUnknown={() =>
            onChange({ partExchangeRegUnknown: true, partExchangeRegistration: "" })
          }
        />
      );

    case "px-mileage":
      return (
        <ShellInput
          id="partExchangeMileage"
          label="Current mileage"
          type="text"
          inputMode="numeric"
          placeholder="42,500"
          autoFocus
          value={
            data.partExchangeMileage
              ? Number(data.partExchangeMileage).toLocaleString("en-GB")
              : ""
          }
          onChange={(e) =>
            onChange({ partExchangeMileage: e.target.value.replace(/[^\d]/g, "") })
          }
          error={fieldErrors.partExchangeMileage}
        />
      );

    case "px-on-finance":
      return (
        <ChoiceList
          options={["Yes", "No"]}
          value={
            data.hasFinanceToSettle === "yes"
              ? "Yes"
              : data.hasFinanceToSettle === "no"
                ? "No"
                : ""
          }
          onSelect={(v) =>
            autoSelect({ hasFinanceToSettle: v === "Yes" ? "yes" : "no" })
          }
        />
      );

    case "px-lender":
      return (
        <LenderSearchField
          value={data.partExchangeLender}
          error={fieldErrors.partExchangeLender}
          onChange={(partExchangeLender) => onChange({ partExchangeLender })}
        />
      );

    case "px-monthly-payment":
      return (
        <ShellInput
          id="partExchangeMonthlyPayment"
          label="Current monthly payment"
          type="text"
          inputMode="numeric"
          placeholder="250"
          autoFocus
          prefix="£"
          value={data.partExchangeMonthlyPayment}
          onChange={(e) =>
            onChange({ partExchangeMonthlyPayment: e.target.value.replace(/[^\d]/g, "") })
          }
          error={fieldErrors.partExchangeMonthlyPayment}
        />
      );

    case "px-settlement":
      return (
        <ShellInput
          id="settlementAmount"
          label="Settlement figure"
          type="text"
          inputMode="numeric"
          placeholder="4,500"
          autoFocus
          optional
          prefix="£"
          value={data.settlementAmount}
          onChange={(e) =>
            onChange({ settlementAmount: e.target.value.replace(/[^\d]/g, "") })
          }
        />
      );

    case "px-complete":
      return (
        <div
          style={{
            padding: "22px 18px",
            borderRadius: "var(--aradius)",
            border: "1.5px solid var(--aline)",
            background: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "var(--agreen-wash)",
              color: "var(--agreen)",
              marginBottom: 14,
            }}
            aria-hidden
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "var(--aink)" }}>
            We&apos;ll use these details to prepare your part exchange options.
          </p>
          <p
            style={{
              margin: "10px 0 0",
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--aink-soft)",
            }}
          >
            Our team will confirm everything after reviewing your application.
          </p>
        </div>
      );

    // ── Joint Applicant ───────────────────────────────────────────────────
    case "ja-intro":
      return (
        <div
          style={{
            padding: "18px 16px",
            borderRadius: "var(--aradius)",
            border: "1.5px solid var(--aline)",
            background: "var(--agreen-wash)",
          }}
        >
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "var(--aink-soft)" }}>
            We&apos;ll ask a few details about the person applying with you. This usually takes
            around two minutes.
          </p>
        </div>
      );

    case "ja-name":
      return (
        <RowFields>
          <ShellInput
            id="jointFirstName"
            label="First name"
            autoFocus
            autoComplete="given-name"
            value={data.jointFirstName}
            onChange={(e) => onChange({ jointFirstName: e.target.value })}
            error={fieldErrors.jointFirstName}
          />
          <ShellInput
            id="jointLastName"
            label="Last name"
            autoComplete="family-name"
            value={data.jointLastName}
            onChange={(e) => onChange({ jointLastName: e.target.value })}
            error={fieldErrors.jointLastName}
          />
        </RowFields>
      );

    case "ja-dob":
      return (
        <ShellInput
          id="jointDateOfBirth"
          label="Date of birth"
          type="date"
          autoFocus
          value={data.jointDateOfBirth}
          onChange={(e) => onChange({ jointDateOfBirth: e.target.value })}
          error={fieldErrors.jointDateOfBirth}
          max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
            .toISOString()
            .split("T")[0]}
        />
      );

    case "ja-relationship":
      return (
        <ChoiceList
          options={[
            "Husband / Wife",
            "Partner",
            "Parent",
            "Family Member",
            "Friend",
            "Other",
          ]}
          value={data.jointRelationship}
          onSelect={(v) => autoSelect({ jointRelationship: v })}
        />
      );

    case "ja-address":
      return (
        <AddressLookup
          key="joint-address"
          postcodeId="jointPostcode"
          addressId="jointAddress"
          postcode={data.jointPostcode}
          address={data.jointAddress}
          onPostcodeChange={(jointPostcode) =>
            onChange({ jointPostcode, jointAddress: "" })
          }
          onAddressChange={(jointAddress) => onChange({ jointAddress })}
          errors={{
            postcode: fieldErrors.jointPostcode,
            address: fieldErrors.jointAddress,
          }}
          autoFocus
        />
      );

    case "ja-address-duration":
      return (
        <ChoiceList
          options={["Yes", "No"]}
          value={
            data.jointAddressTenure === ADDRESS_TENURE_YES
              ? "Yes"
              : data.jointAddressTenure === ADDRESS_TENURE_NO
                ? "No"
                : ""
          }
          onSelect={(v) =>
            autoSelect({
              jointAddressTenure: v === "Yes" ? ADDRESS_TENURE_YES : ADDRESS_TENURE_NO,
            })
          }
        />
      );

    case "ja-previous-address":
      return (
        <AddressLookup
          key="joint-previous-address"
          postcodeId="jointPreviousPostcode"
          addressId="jointPreviousAddress"
          postcode={data.jointPreviousPostcode}
          address={data.jointPreviousAddress}
          onPostcodeChange={(jointPreviousPostcode) =>
            onChange({ jointPreviousPostcode, jointPreviousAddress: "" })
          }
          onAddressChange={(jointPreviousAddress) => onChange({ jointPreviousAddress })}
          errors={{
            postcode: fieldErrors.jointPreviousPostcode,
            address: fieldErrors.jointPreviousAddress,
          }}
          autoFocus
        />
      );

    case "ja-previous-address-duration":
      return (
        <div>
          <ShellInput
            id="jointPreviousMovedIn"
            label="Date moved in"
            type="date"
            autoFocus
            value={data.jointPreviousMovedIn}
            onChange={(e) => onChange({ jointPreviousMovedIn: e.target.value })}
            error={fieldErrors.jointPreviousMovedIn}
          />
          <ShellInput
            id="jointPreviousMovedOut"
            label="Date moved out"
            type="date"
            value={data.jointPreviousMovedOut}
            onChange={(e) => onChange({ jointPreviousMovedOut: e.target.value })}
            error={fieldErrors.jointPreviousMovedOut}
          />
        </div>
      );

    case "ja-living":
      return (
        <ChoiceList
          options={[
            "Homeowner",
            "Mortgage",
            "Renting",
            "Living with Parents",
            "Other",
          ]}
          value={data.jointLivingStatus}
          onSelect={(v) => autoSelect({ jointLivingStatus: v })}
        />
      );

    case "ja-employment":
      return (
        <ChoiceList
          options={[
            "Full Time",
            "Part Time",
            "Self Employed",
            "Retired",
            "Student",
            "Benefits",
            "Other",
          ]}
          value={
            {
              "employed-full-time": "Full Time",
              "employed-part-time": "Part Time",
              "self-employed": "Self Employed",
              retired: "Retired",
              student: "Student",
              "receiving-benefits": "Benefits",
              other: "Other",
            }[data.jointEmploymentStatusFull] ?? ""
          }
          onSelect={(v) => {
            const map: Record<string, string> = {
              "Full Time": "employed-full-time",
              "Part Time": "employed-part-time",
              "Self Employed": "self-employed",
              Retired: "retired",
              Student: "student",
              Benefits: "receiving-benefits",
              Other: "other",
            };
            autoSelect({ jointEmploymentStatusFull: map[v] ?? v });
          }}
        />
      );

    case "ja-employer": {
      const isSe = data.jointEmploymentStatusFull === "self-employed";
      return (
        <ShellInput
          id="jointEmployerName"
          label={isSe ? "Business name" : "Employer name"}
          placeholder={isSe ? "Smith Joinery" : "Oakwood Motor Company"}
          autoFocus
          value={data.jointEmployerName}
          onChange={(e) => onChange({ jointEmployerName: e.target.value })}
          error={fieldErrors.jointEmployerName}
        />
      );
    }

    case "ja-job-title":
      return (
        <ShellInput
          id="jointJobTitle"
          label="Job title"
          placeholder="Site manager"
          autoFocus
          value={data.jointJobTitle}
          onChange={(e) => onChange({ jointJobTitle: e.target.value })}
          error={fieldErrors.jointJobTitle}
        />
      );

    case "ja-job-duration":
      return (
        <ChoiceList
          options={[
            "Over 3 years",
            "1–3 years",
            "6–12 months",
            "3–6 months",
            "Under 3 months",
          ]}
          value={normalizeJobDurationLabel(data.jointJobDuration)}
          onSelect={(v) => autoSelect({ jointJobDuration: v })}
        />
      );

    case "ja-previous-employer":
      return (
        <ShellInput
          id="jointPreviousEmployerName"
          label="Previous employer name"
          placeholder="Oakwood Motor Company"
          autoFocus
          value={data.jointPreviousEmployerName}
          onChange={(e) => onChange({ jointPreviousEmployerName: e.target.value })}
          error={fieldErrors.jointPreviousEmployerName}
        />
      );

    case "ja-previous-job-title":
      return (
        <ShellInput
          id="jointPreviousJobTitle"
          label="Job title"
          placeholder="Site manager"
          autoFocus
          value={data.jointPreviousJobTitle}
          onChange={(e) => onChange({ jointPreviousJobTitle: e.target.value })}
          error={fieldErrors.jointPreviousJobTitle}
        />
      );

    case "ja-previous-employment-start":
      return (
        <ShellInput
          id="jointPreviousEmploymentStart"
          label="Employment start date"
          type="date"
          autoFocus
          value={data.jointPreviousEmploymentStart}
          onChange={(e) => onChange({ jointPreviousEmploymentStart: e.target.value })}
          error={fieldErrors.jointPreviousEmploymentStart}
        />
      );

    case "ja-previous-employment-end":
      return (
        <ShellInput
          id="jointPreviousEmploymentEnd"
          label="Employment end date"
          type="date"
          autoFocus
          value={data.jointPreviousEmploymentEnd}
          onChange={(e) => onChange({ jointPreviousEmploymentEnd: e.target.value })}
          error={fieldErrors.jointPreviousEmploymentEnd}
        />
      );

    case "ja-income":
      return (
        <ShellInput
          id="jointMonthlyIncome"
          label="Monthly income before tax"
          type="text"
          inputMode="numeric"
          placeholder="2,500"
          autoFocus
          prefix="£"
          value={data.jointMonthlyIncome}
          onChange={(e) =>
            onChange({ jointMonthlyIncome: e.target.value.replace(/[^\d]/g, "") })
          }
          error={fieldErrors.jointMonthlyIncome}
        />
      );

    case "ja-mobile":
      return (
        <ShellInput
          id="jointMobile"
          label="Mobile number"
          type="tel"
          inputMode="numeric"
          placeholder="07700 900000"
          autoFocus
          autoComplete="tel"
          value={data.jointMobile}
          onChange={(e) => onChange({ jointMobile: e.target.value })}
          error={fieldErrors.jointMobile}
        />
      );

    case "ja-email":
      return (
        <ShellInput
          id="jointEmail"
          label="Email address"
          type="email"
          inputMode="email"
          placeholder="them@email.com"
          autoFocus
          autoComplete="email"
          value={data.jointEmail}
          onChange={(e) => onChange({ jointEmail: e.target.value })}
          error={fieldErrors.jointEmail}
        />
      );

    case "ja-review":
      return <JointApplicantReview data={data} onEdit={onGoToStep} />;

    // ── Review / Confirm ──────────────────────────────────────────────────
    case "consent": {
      const consentError =
        fieldErrors.termsAccepted ?? fieldErrors.privacyAccepted;
      return (
        <div>
          <ApplyReviewSummary data={data} onEdit={onGoToStep} />

          <div style={{ marginTop: 22 }}>
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
        </div>
      );
    }

    default:
      return null;
  }
}
