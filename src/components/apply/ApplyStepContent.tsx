"use client";

import { type ApplicationData, type StepId } from "@/lib/apply/types";
import { type FieldErrors } from "@/lib/apply/validation";
import { type JourneyBehaviour } from "@/lib/journey/journeyBehaviour";
import { getVehicleById } from "@/data/vehicles";
import { AddressLookup } from "@/components/apply/AddressLookup";
import { ApplyInput, ApplySelect } from "@/components/apply/ApplyField";
import { ApplyReviewSummary } from "@/components/apply/ApplyReviewSummary";
import { OptionCard } from "@/components/apply/OptionCard";
import { VehicleSearchInput } from "@/components/apply/VehicleSearchInput";
import { Checkbox } from "@/components/ui/checkbox";
import { isFieldValid } from "@/lib/apply/inlineValidation";
import { stepHasAutofocus } from "@/lib/apply/stepMeta";

interface ApplyStepContentProps {
  stepId: StepId;
  data: ApplicationData;
  onChange: (updates: Partial<ApplicationData>) => void;
  onAutoAdvance?: () => void;
  fieldErrors?: FieldErrors;
  behaviour?: JourneyBehaviour;
}

export function ApplyStepContent({
  stepId,
  data,
  onChange,
  onAutoAdvance,
  fieldErrors = {},
  behaviour,
}: ApplyStepContentProps) {
  const autofocus = stepHasAutofocus(stepId);

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
          inputMode="numeric"
          autoComplete="tel"
          autoFocus={autofocus}
          value={data.mobile}
          onChange={(e) => onChange({ mobile: e.target.value })}
          hint="We'll text your result and save your progress."
          error={fieldErrors.mobile}
          valid={isFieldValid("mobile", data, "mobile")}
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
            <p className="motion-error-in text-sm text-coral">{fieldErrors.employmentDuration}</p>
          )}
        </div>
      );

    case "previous-employer":
      return (
        <ApplyInput
          id="previousEmployerName"
          label="Employer name"
          required
          autoFocus={autofocus}
          value={data.previousEmployerName}
          onChange={(e) => onChange({ previousEmployerName: e.target.value })}
          error={fieldErrors.previousEmployerName}
          valid={isFieldValid("previousEmployerName", data, "previous-employer")}
          placeholder="Company name"
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
            <p className="motion-error-in text-sm text-coral">{fieldErrors.previousEmploymentDuration}</p>
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
          autoFocus={autofocus}
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
            <p className="motion-error-in text-sm text-coral">{fieldErrors.yearsAtAddress}</p>
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
          autoFocus={autofocus}
        />
      );

    case "email":
      return (
        <ApplyInput
          id="email"
          label="Email address"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoFocus={autofocus}
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          hint="Optional — helpful if you'd like a resume link"
          error={fieldErrors.email}
          valid={Boolean(data.email.trim()) && !fieldErrors.email}
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
          autoFocus={autofocus}
          value={data.dateOfBirth}
          onChange={(e) => onChange({ dateOfBirth: e.target.value })}
          error={fieldErrors.dateOfBirth}
          valid={isFieldValid("dateOfBirth", data, "dob")}
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
              highlighted={behaviour?.highlightEmploymentOption === option.value}
              onClick={() =>
                handleOptionSelect({
                  employmentStatus: option.value as ApplicationData["employmentStatus"],
                })
              }
            />
          ))}
          {behaviour?.employmentReassurance ? (
            <p className="pt-1 text-center text-sm leading-relaxed text-green-deep">
              {behaviour.employmentReassurance}
            </p>
          ) : null}
        </div>
      );

    case "income":
      return (
        <div className="space-y-4">
          {behaviour?.showNegativeEquityQuestions ? (
            <div className="space-y-3 rounded-[var(--radius-card)] border border-line bg-mist-2 p-4">
              <p className="text-sm font-medium text-ink">Do you currently have finance to settle?</p>
              <div className="grid grid-cols-2 gap-3">
                <OptionCard
                  label="Yes"
                  selected={data.hasFinanceToSettle === "yes"}
                  onClick={() => onChange({ hasFinanceToSettle: "yes" })}
                />
                <OptionCard
                  label="No"
                  selected={data.hasFinanceToSettle === "no"}
                  onClick={() => onChange({ hasFinanceToSettle: "no", settlementAmount: "" })}
                />
              </div>
              {data.hasFinanceToSettle === "yes" ? (
                <ApplyInput
                  id="settlementAmount"
                  label="Estimated settlement amount"
                  type="number"
                  inputMode="decimal"
                  value={data.settlementAmount}
                  onChange={(e) => onChange({ settlementAmount: e.target.value })}
                  error={fieldErrors.settlementAmount}
                  valid={isFieldValid("settlementAmount", data, "income")}
                  placeholder="e.g. 3500"
                  hint="An approximate figure is fine for now."
                />
              ) : null}
            </div>
          ) : null}

          {data.employmentStatus === "employed" && (
            <>
              <ApplyInput
                id="employerName"
                label="Employer name"
                required
                autoFocus={autofocus}
                value={data.employerName}
                onChange={(e) => onChange({ employerName: e.target.value })}
                error={fieldErrors.employerName}
                valid={isFieldValid("employerName", data, "income")}
              />
              <ApplyInput
                id="jobTitle"
                label="Job title"
                required
                value={data.jobTitle}
                onChange={(e) => onChange({ jobTitle: e.target.value })}
                error={fieldErrors.jobTitle}
                valid={isFieldValid("jobTitle", data, "income")}
              />
            </>
          )}

          {data.employmentStatus === "self-employed" && (
            <>
              <ApplyInput
                id="businessType"
                label="Business type"
                required
                autoFocus={autofocus}
                value={data.businessType}
                onChange={(e) => onChange({ businessType: e.target.value })}
                error={fieldErrors.businessType}
                valid={isFieldValid("businessType", data, "income")}
                placeholder="e.g. Plumbing, Consulting"
              />
              <ApplySelect
                id="yearsTrading"
                label="Years trading"
                required
                value={data.yearsTrading}
                onChange={(e) => onChange({ yearsTrading: e.target.value })}
                error={fieldErrors.yearsTrading}
                valid={isFieldValid("yearsTrading", data, "income")}
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
              autoFocus={autofocus}
              value={data.incomeSource}
              onChange={(e) => onChange({ incomeSource: e.target.value })}
              error={fieldErrors.incomeSource}
              valid={isFieldValid("incomeSource", data, "income")}
              placeholder="e.g. State pension, private pension"
            />
          )}

          <ApplyInput
            id="monthlyIncome"
            label="Monthly income (before tax)"
            required
            type="number"
            inputMode="decimal"
            autoFocus={autofocus && data.employmentStatus === "other"}
            value={data.monthlyIncome}
            onChange={(e) => onChange({ monthlyIncome: e.target.value })}
            error={fieldErrors.monthlyIncome}
            valid={isFieldValid("monthlyIncome", data, "income")}
            placeholder="2500"
            hint="Before tax, in pounds."
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

          {behaviour?.showDepositField ? (
            <ApplyInput
              id="financeDeposit"
              label="Deposit"
              type="number"
              inputMode="decimal"
              value={data.financeDeposit}
              onChange={(e) => onChange({ financeDeposit: e.target.value })}
              valid={Boolean(data.financeDeposit.trim())}
              hint={behaviour.depositHelperText}
              placeholder="0"
            />
          ) : null}

          {behaviour?.showPurchaseTimeframe ? (
            <div className="space-y-3">
              <p className="text-sm font-medium text-ink">When are you looking to purchase?</p>
              {[
                { value: "asap", label: "ASAP", description: "As soon as possible" },
                { value: "1-3-months", label: "1–3 months", description: "Within the next few months" },
                { value: "3-plus-months", label: "3+ months", description: "Just exploring for now" },
              ].map((option) => (
                <OptionCard
                  key={option.value}
                  label={option.label}
                  description={option.description}
                  selected={data.purchaseTimeframe === option.value}
                  highlighted={option.value === "asap"}
                  onClick={() => onChange({ purchaseTimeframe: option.value })}
                />
              ))}
              {behaviour.purchaseTimeframeHelper ? (
                <p className="text-center text-sm leading-relaxed text-green-deep">
                  {behaviour.purchaseTimeframeHelper}
                </p>
              ) : null}
            </div>
          ) : null}
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
            autoFocus={autofocus}
            value={data.jointFirstName}
            onChange={(e) => onChange({ jointFirstName: e.target.value })}
            error={fieldErrors.jointFirstName}
            valid={isFieldValid("jointFirstName", data, "joint")}
            autoComplete="given-name"
          />
          <ApplyInput
            id="jointLastName"
            label="Joint applicant last name"
            required
            value={data.jointLastName}
            onChange={(e) => onChange({ jointLastName: e.target.value })}
            error={fieldErrors.jointLastName}
            valid={isFieldValid("jointLastName", data, "joint")}
            autoComplete="family-name"
          />
          <ApplyInput
            id="jointMobile"
            label="Mobile number"
            required
            type="tel"
            inputMode="numeric"
            value={data.jointMobile}
            onChange={(e) => onChange({ jointMobile: e.target.value })}
            error={fieldErrors.jointMobile}
            valid={isFieldValid("jointMobile", data, "joint")}
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
            error={fieldErrors.jointDateOfBirth}
            valid={isFieldValid("jointDateOfBirth", data, "joint")}
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
            error={fieldErrors.jointEmploymentStatus}
            valid={isFieldValid("jointEmploymentStatus", data, "joint")}
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
            error={fieldErrors.jointMonthlyIncome}
            valid={isFieldValid("jointMonthlyIncome", data, "joint")}
            placeholder="e.g. 2500"
            hint="Before tax, in pounds"
          />
        </div>
      );

    case "consent":
      return (
        <div className="space-y-3">
          {behaviour?.consentEmphasiseSoftSearch ? (
            <div className="rounded-[var(--radius-card)] border border-green/30 bg-green/10 p-4 text-center">
              <p className="text-sm font-semibold text-green-deep">Soft search only</p>
              <p className="mt-1 text-sm leading-relaxed text-ink">
                No impact on your credit score.
              </p>
            </div>
          ) : null}
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
