"use client";

import { type ApplicationData, type StepId } from "@/lib/apply/types";
import { lookupAddresses } from "@/lib/apply/mockAddresses";
import { getVehicleById } from "@/data/vehicles";
import { ApplyInput, ApplySelect } from "@/components/apply/ApplyField";
import { OptionCard } from "@/components/apply/OptionCard";
import { VehicleSearchInput } from "@/components/apply/VehicleSearchInput";

interface ApplyStepContentProps {
  stepId: StepId;
  data: ApplicationData;
  onChange: (updates: Partial<ApplicationData>) => void;
}

export function ApplyStepContent({
  stepId,
  data,
  onChange,
}: ApplyStepContentProps) {
  const prefilledVehicle = data.vehicleId ? getVehicleById(data.vehicleId) : null;
  const addressOptions = lookupAddresses(data.postcode);
  const previousAddressOptions = lookupAddresses(data.previousPostcode);

  switch (stepId) {
    case "basic-details":
      return (
        <div className="space-y-4">
          <ApplyInput
            id="firstName"
            label="First name"
            required
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            autoComplete="given-name"
          />
          <ApplyInput
            id="lastName"
            label="Last name"
            required
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            autoComplete="family-name"
          />
          <ApplyInput
            id="mobile"
            label="Mobile number"
            required
            type="tel"
            inputMode="tel"
            value={data.mobile}
            onChange={(e) => onChange({ mobile: e.target.value })}
            hint="We'll only use this to update you on your application"
            autoComplete="tel"
            placeholder="07XXX XXXXXX"
          />
          <p className="rounded-2xl border border-cream/10 bg-surface/60 px-4 py-3 text-sm text-cream-muted">
            We never ask for bank details at this stage.
          </p>
        </div>
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
          max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
            .toISOString()
            .split("T")[0]}
        />
      );

    case "address":
      return (
        <div className="space-y-4">
          <ApplyInput
            id="postcode"
            label="Postcode"
            required
            value={data.postcode}
            onChange={(e) => onChange({ postcode: e.target.value.toUpperCase(), address: "" })}
            autoComplete="postal-code"
            placeholder="M1 1AA"
          />

          {addressOptions.length > 0 ? (
            <ApplySelect
              id="address"
              label="Select your address"
              required
              value={data.address}
              onChange={(e) => onChange({ address: e.target.value })}
            >
              <option value="">Choose an address</option>
              {addressOptions.map((address) => (
                <option key={address} value={address}>
                  {address}
                </option>
              ))}
            </ApplySelect>
          ) : (
            data.postcode.trim() && (
              <p className="text-sm text-cream-muted">
                Try M1 1AA, B1 1BB, LS1 1CC, E1 1DD, or SW1A 1AA to see sample addresses.
              </p>
            )
          )}

          <ApplySelect
            id="yearsAtAddress"
            label="How long have you lived here?"
            required
            value={data.yearsAtAddress}
            onChange={(e) => onChange({ yearsAtAddress: e.target.value })}
          >
            <option value="">Select duration</option>
            <option value="1">Less than 1 year</option>
            <option value="2">1–2 years</option>
            <option value="3">2–3 years</option>
            <option value="5">3–5 years</option>
            <option value="10">5+ years</option>
          </ApplySelect>
        </div>
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
              onClick={() => onChange({ residentialStatus: option.value as ApplicationData["residentialStatus"] })}
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
              onClick={() => onChange({ employmentStatus: option.value as ApplicationData["employmentStatus"] })}
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

    case "address-history":
      return (
        <div className="space-y-4">
          <p className="text-sm text-cream-muted">
            Because you&apos;ve lived at your current address for less than 3 years, we need your
            previous address.
          </p>
          <ApplyInput
            id="previousPostcode"
            label="Previous postcode"
            required
            value={data.previousPostcode}
            onChange={(e) =>
              onChange({ previousPostcode: e.target.value.toUpperCase(), previousAddress: "" })
            }
          />
          {previousAddressOptions.length > 0 && (
            <ApplySelect
              id="previousAddress"
              label="Previous address"
              required
              value={data.previousAddress}
              onChange={(e) => onChange({ previousAddress: e.target.value })}
            >
              <option value="">Choose an address</option>
              {previousAddressOptions.map((address) => (
                <option key={address} value={address}>
                  {address}
                </option>
              ))}
            </ApplySelect>
          )}
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
              onClick={() => onChange({ drivingLicence: option.value as ApplicationData["drivingLicence"] })}
            />
          ))}
        </div>
      );

    case "vehicle": {
      const selectedVehicle = data.vehicleId ? getVehicleById(data.vehicleId) : null;

      return (
        <div className="space-y-4">
          {selectedVehicle ? (
            <div className="rounded-[var(--radius-card)] border border-coral/20 bg-coral/10 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-cream-muted">Selected vehicle</p>
                  <p className="mt-1 font-medium text-cream">
                    {selectedVehicle.make} {selectedVehicle.model}
                  </p>
                  <p className="text-sm text-cream-muted">
                    {selectedVehicle.year} · {selectedVehicle.fuel} · {selectedVehicle.transmission}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ vehicleId: "", vehicleSearch: "" })}
                  className="shrink-0 text-sm text-coral hover:underline"
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
          <div className="grid grid-cols-2 gap-3">
            <OptionCard
              label="Just me"
              description="Apply on my own"
              selected={!data.jointApplicant}
              onClick={() => onChange({ jointApplicant: false })}
            />
            <OptionCard
              label="Apply with someone else"
              description="Joint application"
              selected={data.jointApplicant}
              onClick={() => onChange({ jointApplicant: true })}
            />
          </div>

          {data.jointApplicant && (
            <details open className="group rounded-[var(--radius-card)] border border-cream/10 bg-surface">
              <summary className="cursor-pointer list-none px-4 py-4 [&::-webkit-details-marker]:hidden">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-cream">Joint applicant details</p>
                    <p className="mt-0.5 text-xs text-cream-muted">
                      {data.jointFirstName || data.jointLastName
                        ? `${data.jointFirstName} ${data.jointLastName}`.trim()
                        : "Add their details below"}
                    </p>
                  </div>
                  <span className="text-cream-muted transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </div>
              </summary>

              <div className="space-y-4 border-t border-cream/10 px-4 pb-4 pt-2">
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
            </details>
          )}
        </div>
      );

    case "consent":
      return (
        <div className="space-y-4">
          <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-2xl border border-cream/10 bg-surface p-4">
            <input
              type="checkbox"
              checked={data.termsAccepted}
              onChange={(e) => onChange({ termsAccepted: e.target.checked })}
              className="mt-1 h-5 w-5 accent-coral"
            />
            <span className="text-sm text-cream">
              I agree to the Terms & Conditions and understand this is a finance application.
            </span>
          </label>

          <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-2xl border border-cream/10 bg-surface p-4">
            <input
              type="checkbox"
              checked={data.privacyAccepted}
              onChange={(e) => onChange({ privacyAccepted: e.target.checked })}
              className="mt-1 h-5 w-5 accent-coral"
            />
            <span className="text-sm text-cream">
              I have read and accept the Privacy Policy.
            </span>
          </label>

          <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-2xl border border-cream/10 bg-surface/60 p-4">
            <input
              type="checkbox"
              checked={data.marketingConsent}
              onChange={(e) => onChange({ marketingConsent: e.target.checked })}
              className="mt-1 h-5 w-5 accent-coral"
            />
            <span className="text-sm text-cream-muted">
              Send me updates about cars and offers (optional)
            </span>
          </label>
        </div>
      );

    case "review": {
      const vehicle = prefilledVehicle;
      return (
        <div className="space-y-4">
          {[
            {
              title: "Personal details",
              items: [
                `${data.firstName} ${data.lastName}`,
                data.mobile,
                data.email || "No email provided",
                data.dateOfBirth,
              ],
            },
            {
              title: "Address",
              items: [data.address, `Lived here: ${data.yearsAtAddress} years`],
            },
            {
              title: "Employment",
              items: [
                data.employmentStatus,
                data.monthlyIncome ? `£${data.monthlyIncome}/month` : "",
              ].filter(Boolean),
            },
            {
              title: "Vehicle",
              items: [
                vehicle
                  ? `${vehicle.make} ${vehicle.model}`
                  : data.vehicleSearch || "Not selected yet",
              ],
            },
            ...(data.jointApplicant
              ? [
                  {
                    title: "Joint applicant",
                    items: [
                      `${data.jointFirstName} ${data.jointLastName}`,
                      data.jointMobile,
                      data.jointDateOfBirth,
                      data.jointEmploymentStatus,
                      data.jointMonthlyIncome ? `£${data.jointMonthlyIncome}/month` : "",
                    ].filter(Boolean),
                  },
                ]
              : []),
          ].map((section) => (
            <div
              key={section.title}
              className="rounded-[var(--radius-card)] border border-cream/10 bg-surface p-4"
            >
              <p className="text-xs uppercase tracking-wide text-cream-muted">{section.title}</p>
              <ul className="mt-2 space-y-1">
                {section.items.map((item) => (
                  <li key={item} className="text-sm text-cream">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p className="rounded-2xl border border-coral/20 bg-coral/10 px-4 py-3 text-sm text-cream">
            Soft search only — no impact on your credit score at this stage.
          </p>
        </div>
      );
    }

    default:
      return null;
  }
}
