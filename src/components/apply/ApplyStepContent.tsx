"use client";

import { type ApplicationData, type StepId } from "@/lib/apply/types";
import { getVehicleById } from "@/data/vehicles";
import { AddressLookup } from "@/components/apply/AddressLookup";
import { ApplyInput, ApplySelect } from "@/components/apply/ApplyField";
import { ApplyReviewSummary } from "@/components/apply/ApplyReviewSummary";
import { OptionCard } from "@/components/apply/OptionCard";
import { VehicleSearchInput } from "@/components/apply/VehicleSearchInput";
import { Checkbox } from "@/components/ui/checkbox";
import { type FieldErrors } from "@/lib/apply/validation";

interface ApplyStepContentProps {
  stepId: StepId;
  data: ApplicationData;
  onChange: (updates: Partial<ApplicationData>) => void;
  onAutoAdvance?: () => void;
  fieldErrors?: FieldErrors;
}

export function ApplyStepContent({
  stepId,
  data,
  onChange,
  onAutoAdvance,
  fieldErrors = {},
}: ApplyStepContentProps) {
  const handleOptionSelect = (updates: Partial<ApplicationData>) => {
    onChange(updates);
    onAutoAdvance?.();
  };

  switch (stepId) {
    case "mobile":
      return (
        <ApplyInput
          id="mobile"
          label="Mobile number"
          required
          type="tel"
          inputMode="tel"
          value={data.mobile}
          onChange={(e) => onChange({ mobile: e.target.value })}
          hint="We'll text your result and save your progress."
          autoComplete="tel"
          placeholder="07XXX XXXXXX"
        />
      );

    case "joint-choice":
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <OptionCard
            label="Just me"
            description="Apply on my own"
            selected={!data.jointApplicant}
            onClick={() => handleOptionSelect({ jointApplicant: false })}
          />
          <OptionCard
            label="Apply with someone else"
            description="Joint application"
            selected={data.jointApplicant}
            onClick={() => handleOptionSelect({ jointApplicant: true })}
          />
        </div>
      );

    case "employment-duration":
      return (
        <div className="space-y-3">
          {[
            { value: "less-than-3-months", label: "Less than 3 months" },
            { value: "3-6-months", label: "3–6 months" },
            { value: "6-12-months", label: "6–12 months" },
            { value: "1-3-years", label: "1–3 years" },
            { value: "more-than-3-years", label: "More than 3 years" },
          ].map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              selected={data.employmentDuration === option.value}
              onClick={() =>
                onChange({
                  employmentDuration: option.value as ApplicationData["employmentDuration"],
                })
              }
            />
          ))}
          {fieldErrors.employmentDuration && (
            <p className="text-sm text-coral">{fieldErrors.employmentDuration}</p>
          )}
        </div>
      );

    case "previous-employer":
      return (
        <ApplyInput
          id="previousEmployerName"
          label="Employer name"
          required
          value={data.previousEmployerName}
          onChange={(e) => onChange({ previousEmployerName: e.target.value })}
          error={fieldErrors.previousEmployerName}
          placeholder="Company name"
          className={data.previousEmployerName.trim() ? "border-green/40 bg-white" : ""}
        />
      );

    case "previous-employment-duration":
      return (
        <div className="space-y-3">
          {[
            { value: "less-than-1-year", label: "Less than 1 year" },
            { value: "1-2-years", label: "1–2 years" },
            { value: "2-3-years", label: "2–3 years" },
            { value: "more-than-3-years", label: "More than 3 years" },
          ].map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              selected={data.previousEmploymentDuration === option.value}
              onClick={() =>
                onChange({
                  previousEmploymentDuration:
                    option.value as ApplicationData["previousEmploymentDuration"],
                })
              }
            />
          ))}
          {fieldErrors.previousEmploymentDuration && (
            <p className="text-sm text-coral">{fieldErrors.previousEmploymentDuration}</p>
          )}
        </div>
      );

    case "address":
      return (
        <AddressLookup
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
        />
      );

    case "address-duration":
      return (
        <div className="space-y-3">
          {[
            { value: "less-than-1-year", label: "Less than 1 year" },
            { value: "1-2-years", label: "1–2 years" },
            { value: "2-3-years", label: "2–3 years" },
            { value: "3-5-years", label: "3–5 years" },
            { value: "more-than-5-years", label: "More than 5 years" },
          ].map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              selected={data.yearsAtAddress === option.value}
              onClick={() => onChange({ yearsAtAddress: option.value })}
            />
          ))}
          {fieldErrors.yearsAtAddress && (
            <p className="text-sm text-coral">{fieldErrors.yearsAtAddress}</p>
          )}
        </div>
      );

    case "previous-address":
      return (
        <AddressLookup
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
        />
      );

    case "email":
      return (
        <ApplyInput
          id="email"
          label="Email address"
          type="email"
          inputMode="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          hint="Optional — but helpful if you'd like a resume link"
          autoComplete="email"
          placeholder="you@email.com"
        />
      );

    case "dob":
      return (
        <ApplyInput
          id="dateOfBirth"
          label="Date of birth"
          type="date"
          required
          value={data.dateOfBirth}
          onChange={(e) => onChange({ dateOfBirth: e.target.value })}
          error={fieldErrors.dateOfBirth}
          className={data.dateOfBirth ? "border-green/40 bg-white" : ""}
          max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
            .toISOString()
            .split("T")[0]}
        />
      );

    case "residential":
      return (
        <div className="space-y-3">
          {[
            { value: "homeowner", label: "Homeowner", description: "You own your home" },
            { value: "renting", label: "Renting", description: "You rent your home" },
            { value: "family", label: "Living with family", description: "You live with parents or family" },
            { value: "other", label: "Other", description: "Another living arrangement" },
          ].map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              description={option.description}
              selected={data.residentialStatus === option.value}
              onClick={() =>
                handleOptionSelect({
                  residentialStatus: option.value as ApplicationData["residentialStatus"],
                })
              }
            />
          ))}
        </div>
      );

    case "employment":
      return (
        <div className="space-y-3">
          {[
            { value: "employed", label: "Employed", description: "Full-time or part-time employment" },
            { value: "self-employed", label: "Self-employed", description: "Sole trader or business owner" },
            { value: "retired", label: "Retired", description: "Receiving pension or retirement income" },
            { value: "other", label: "Other", description: "Benefits or other income" },
          ].map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              description={option.description}
              selected={data.employmentStatus === option.value}
              onClick={() =>
                handleOptionSelect({
                  employmentStatus: option.value as ApplicationData["employmentStatus"],
                })
              }
            />
          ))}
        </div>
      );

    case "income":
      return (
        <div className="space-y-4">
          {data.employmentStatus === "employed" && (
            <>
              <ApplyInput
                id="employerName"
                label="Employer name"
                required
                value={data.employerName}
                onChange={(e) => onChange({ employerName: e.target.value })}
              />
              <ApplyInput
                id="jobTitle"
                label="Job title"
                required
                value={data.jobTitle}
                onChange={(e) => onChange({ jobTitle: e.target.value })}
              />
            </>
          )}

          {data.employmentStatus === "self-employed" && (
            <>
              <ApplyInput
                id="businessType"
                label="Business type"
                required
                value={data.businessType}
                onChange={(e) => onChange({ businessType: e.target.value })}
                placeholder="e.g. Plumbing, Consulting"
              />
              <ApplySelect
                id="yearsTrading"
                label="Years trading"
                required
                value={data.yearsTrading}
                onChange={(e) => onChange({ yearsTrading: e.target.value })}
              >
                <option value="">Select</option>
                <option value="1">Less than 1 year</option>
                <option value="2">1–2 years</option>
                <option value="3">2–3 years</option>
                <option value="5">3+ years</option>
              </ApplySelect>
            </>
          )}

          {data.employmentStatus === "retired" && (
            <ApplyInput
              id="incomeSource"
              label="Income source"
              required
              value={data.incomeSource}
              onChange={(e) => onChange({ incomeSource: e.target.value })}
              placeholder="e.g. State pension, private pension"
            />
          )}

          <ApplyInput
            id="monthlyIncome"
            label="Monthly income (before tax)"
            required
            type="number"
            inputMode="decimal"
            value={data.monthlyIncome}
            onChange={(e) => onChange({ monthlyIncome: e.target.value })}
            placeholder="2500"
          />
        </div>
      );

    case "licence":
      return (
        <div className="space-y-3">
          {[
            { value: "full-uk", label: "Full UK licence", description: "Valid full driving licence" },
            { value: "provisional", label: "Provisional licence", description: "UK provisional licence holder" },
            { value: "none", label: "No licence", description: "I don't currently hold a licence" },
          ].map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              description={option.description}
              selected={data.drivingLicence === option.value}
              onClick={() =>
                handleOptionSelect({
                  drivingLicence: option.value as ApplicationData["drivingLicence"],
                })
              }
            />
          ))}
        </div>
      );

    case "vehicle": {
      const selectedVehicle = data.vehicleId ? getVehicleById(data.vehicleId) : null;

      return (
        <div className="space-y-4">
          {selectedVehicle ? (
            <div className="rounded-[var(--radius-card)] border border-green/20 bg-green/10 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs tracking-wide text-muted">Selected vehicle</p>
                  <p className="mt-1 font-medium text-ink">
                    {selectedVehicle.make} {selectedVehicle.model}
                  </p>
                  <p className="text-sm text-muted">
                    {selectedVehicle.year} · {selectedVehicle.fuel} · {selectedVehicle.transmission}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ vehicleId: "", vehicleSearch: "" })}
                  className="shrink-0 text-sm text-green-deep hover:underline"
                >
                  Change
                </button>
              </div>
            </div>
          ) : (
            <VehicleSearchInput
              value={data.vehicleSearch}
              onChange={(vehicleSearch) => onChange({ vehicleSearch, vehicleId: "" })}
              onSelect={(vehicle) =>
                onChange({
                  vehicleId: vehicle.id,
                  vehicleSearch: `${vehicle.make} ${vehicle.model}`,
                })
              }
            />
          )}
        </div>
      );
    }

    case "joint":
      return (
        <div className="space-y-4">
          <ApplyInput
            id="jointFirstName"
            label="Joint applicant first name"
            required
            value={data.jointFirstName}
            onChange={(e) => onChange({ jointFirstName: e.target.value })}
            autoComplete="given-name"
          />
          <ApplyInput
            id="jointLastName"
            label="Joint applicant last name"
            required
            value={data.jointLastName}
            onChange={(e) => onChange({ jointLastName: e.target.value })}
            autoComplete="family-name"
          />
          <ApplyInput
            id="jointMobile"
            label="Mobile number"
            required
            type="tel"
            inputMode="tel"
            value={data.jointMobile}
            onChange={(e) => onChange({ jointMobile: e.target.value })}
            placeholder="07XXX XXXXXX"
            autoComplete="tel"
          />
          <ApplyInput
            id="jointDateOfBirth"
            label="Date of birth"
            type="date"
            required
            value={data.jointDateOfBirth}
            onChange={(e) => onChange({ jointDateOfBirth: e.target.value })}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
              .toISOString()
              .split("T")[0]}
          />
          <ApplySelect
            id="jointEmploymentStatus"
            label="Employment status"
            required
            value={data.jointEmploymentStatus}
            onChange={(e) =>
              onChange({
                jointEmploymentStatus: e.target.value as ApplicationData["jointEmploymentStatus"],
              })
            }
          >
            <option value="">Select status</option>
            <option value="employed">Employed</option>
            <option value="self-employed">Self-employed</option>
            <option value="retired">Retired</option>
            <option value="other">Other</option>
          </ApplySelect>
          <ApplyInput
            id="jointMonthlyIncome"
            label="Monthly income"
            required
            type="number"
            inputMode="decimal"
            value={data.jointMonthlyIncome}
            onChange={(e) => onChange({ jointMonthlyIncome: e.target.value })}
            placeholder="e.g. 2500"
            hint="Before tax, in pounds"
          />
        </div>
      );

    case "consent":
      return (
        <div className="space-y-3">
          {[
            {
              id: "termsAccepted",
              checked: data.termsAccepted,
              onCheckedChange: (checked: boolean) => onChange({ termsAccepted: checked }),
              label: "I agree to the Terms & Conditions and understand this is a finance application.",
              optional: false,
            },
            {
              id: "privacyAccepted",
              checked: data.privacyAccepted,
              onCheckedChange: (checked: boolean) => onChange({ privacyAccepted: checked }),
              label: "I have read and accept the Privacy Policy.",
              optional: false,
            },
            {
              id: "marketingConsent",
              checked: data.marketingConsent,
              onCheckedChange: (checked: boolean) => onChange({ marketingConsent: checked }),
              label: "Send me updates about cars and offers (optional)",
              optional: true,
            },
          ].map((item) => (
            <label
              key={item.id}
              htmlFor={item.id}
              className="flex min-h-12 cursor-pointer items-start gap-3 rounded-2xl border border-line bg-mist-2 p-4 transition-colors hover:border-green/25"
            >
              <Checkbox
                id={item.id}
                checked={item.checked}
                onCheckedChange={(value) => item.onCheckedChange(value === true)}
                className="mt-0.5"
              />
              <span className={`text-sm leading-relaxed ${item.optional ? "text-muted" : "text-ink"}`}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      );

    case "review":
      return <ApplyReviewSummary data={data} />;

    default:
      return null;
  }
}
