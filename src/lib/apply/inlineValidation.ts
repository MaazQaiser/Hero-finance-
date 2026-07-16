import { type ApplicationData } from "@/lib/apply/types";
import { validateStep, type FieldErrors } from "@/lib/apply/validation";
import { type StepId } from "@/lib/apply/types";

export function getStepFieldErrors(stepId: StepId, data: ApplicationData): FieldErrors {
  return validateStep(stepId, data);
}

export function isFieldValid(
  field: keyof ApplicationData,
  data: ApplicationData,
  stepId: StepId,
): boolean {
  const errors = validateStep(stepId, data);
  if (errors[field]) return false;

  const value = data[field];

  if (typeof value === "string") {
    if (field === "email") return value.trim().length > 0;
    return value.trim().length > 0;
  }

  if (typeof value === "boolean") return value;
  return value !== "" && value != null;
}
