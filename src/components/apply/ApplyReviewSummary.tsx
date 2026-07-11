"use client";

import { type ReactNode } from "react";
import { Briefcase, Car, Home, User, Users } from "lucide-react";
import { type ApplicationData } from "@/lib/apply/types";
import { getVehicleById } from "@/data/vehicles";

interface ApplyReviewSummaryProps {
  data: ApplicationData;
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

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="text-base font-medium leading-snug text-ink break-words">{value || "—"}</p>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[var(--radius-card)] border border-line bg-paper p-5">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green/10 text-green-deep">
          {icon}
        </span>
        <h3 className="text-base font-semibold text-ink">{title}</h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export function ApplyReviewSummary({ data }: ApplyReviewSummaryProps) {
  const vehicle = data.vehicleId ? getVehicleById(data.vehicleId) : null;
  const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ") || "—";
  const jointName =
    [data.jointFirstName, data.jointLastName].filter(Boolean).join(" ") || "—";

  return (
    <div className="space-y-5">
      <Section title="Personal details" icon={<User className="h-5 w-5" />}>
        <Field label="Full name" value={fullName} />
        <Field label="Mobile number" value={data.mobile} />
        <Field label="Email" value={data.email || "Not provided"} />
        <Field label="Date of birth" value={data.dateOfBirth} />
      </Section>

      <Section title="Address" icon={<Home className="h-5 w-5" />}>
        <div className="sm:col-span-2">
          <Field label="Current address" value={data.address || data.postcode} />
        </div>
        <Field
          label="Time at address"
          value={data.yearsAtAddress ? formatDuration(data.yearsAtAddress) : "—"}
        />
        {data.previousAddress ? (
          <div className="sm:col-span-2">
            <Field label="Previous address" value={data.previousAddress} />
          </div>
        ) : null}
      </Section>

      <Section title="Employment" icon={<Briefcase className="h-5 w-5" />}>
        <Field label="Status" value={formatTitleCase(data.employmentStatus)} />
        {data.employmentDuration ? (
          <Field label="Time with employer" value={formatDuration(data.employmentDuration)} />
        ) : null}
        {data.previousEmployerName ? (
          <Field label="Previous employer" value={data.previousEmployerName} />
        ) : null}
        <Field
          label="Monthly income"
          value={data.monthlyIncome ? `£${data.monthlyIncome}` : "—"}
        />
      </Section>

      <Section title="Vehicle" icon={<Car className="h-5 w-5" />}>
        <div className="sm:col-span-2">
          <Field
            label="Selected vehicle"
            value={
              vehicle
                ? `${vehicle.make} ${vehicle.model}`
                : data.vehicleSearch || "Not selected yet"
            }
          />
        </div>
      </Section>

      {data.jointApplicant ? (
        <Section title="Joint applicant" icon={<Users className="h-5 w-5" />}>
          <Field label="Full name" value={jointName} />
          <Field label="Mobile number" value={data.jointMobile} />
          <Field label="Date of birth" value={data.jointDateOfBirth} />
          <Field label="Employment status" value={formatTitleCase(data.jointEmploymentStatus)} />
          <Field
            label="Monthly income"
            value={data.jointMonthlyIncome ? `£${data.jointMonthlyIncome}` : "—"}
          />
        </Section>
      ) : null}
    </div>
  );
}
