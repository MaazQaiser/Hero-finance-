import { type ApplicationData, type StepId } from "./types";

export type FieldErrors = Partial<Record<keyof ApplicationData, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

export function validateStep(stepId: StepId | string, data: ApplicationData): FieldErrors {
  const errors: FieldErrors = {};

  switch (stepId) {
    // v2 Section 0 — Quick questions (auto-advance, no validation needed)
    case "budget":
    case "deposit":
    case "car-type":
    case "credit-rating":
    case "when":
      break;

    // v2 Section 1 — Details
    case "name":
      if (!data.firstName.trim()) errors.firstName = "Enter your first name";
      if (!data.lastName.trim()) errors.lastName = "Enter your last name";
      break;

    case "mobile":
      break;

    case "joint-choice":
      break;

    case "email":
      if (data.email && !emailRegex.test(data.email)) {
        errors.email = "Please enter a valid email address";
      }
      break;

    case "dob":
      break;

    // v2 Section 2 — Licence / ID
    case "licence":
      if (!data.drivingLicence) errors.drivingLicence = "Select an option";
      break;

    case "uk-passport":
      break;

    // v2 Section 3 — Address
    case "address":
      if (!data.postcode.trim()) errors.postcode = "Enter your postcode";
      else if (!postcodeRegex.test(data.postcode.trim())) {
        errors.postcode = "Enter a valid UK postcode";
      }
      if (!data.address.trim()) errors.address = "Select your address";
      break;

    case "address-duration":
      if (!data.addressTenure && !data.yearsAtAddress) {
        errors.addressTenure = "Tell us how long you've lived here";
      }
      break;

    case "living":
      if (!data.livingStatus) errors.livingStatus = "Select your living situation";
      break;

    case "previous-address":
      if (!data.previousPostcode.trim()) errors.previousPostcode = "Enter your previous postcode";
      else if (!postcodeRegex.test(data.previousPostcode.trim())) {
        errors.previousPostcode = "Enter a valid UK postcode";
      }
      if (!data.previousAddress.trim()) errors.previousAddress = "Select your previous address";
      break;

    case "previous-address-duration":
      if (!data.previousAddressTenure) errors.previousAddressTenure = "Tell us how long you lived there";
      break;

    // v2 Section 4 — Work & income
    case "employment":
      if (!data.employmentStatusFull && !data.employmentStatus) {
        errors.employmentStatusFull = "Select your employment status";
      }
      break;

    case "employer":
      if (!data.employerName.trim()) errors.employerName = "Enter your employer or business name";
      if (!data.jobTitle.trim()) errors.jobTitle = "Enter your job title";
      break;

    case "job-duration":
      if (!data.jobDuration && !data.employmentDuration) {
        errors.jobDuration = "Select how long you've been in your role";
      }
      break;

    case "income":
      if (!data.monthlyIncome.trim()) {
        errors.monthlyIncome = "Enter your monthly income";
      } else if (Number(data.monthlyIncome) <= 0) {
        errors.monthlyIncome = "Enter a valid monthly income";
      }
      break;

    // v2 Section 5 — Confirm
    case "consent":
      if (!data.termsAccepted) {
        errors.termsAccepted = "Please accept the Terms & Conditions to continue";
      }
      if (!data.privacyAccepted) {
        errors.privacyAccepted = "Please accept the Privacy Policy to continue";
      }
      break;

    // Legacy steps (kept for backward compat)
    case "employment-duration":
      if (!data.employmentDuration) {
        errors.employmentDuration = "Select how long you've been with your employer";
      }
      break;

    case "previous-employer":
      if (!data.previousEmployerName.trim()) {
        errors.previousEmployerName = "Enter your previous employer name";
      }
      break;

    case "previous-employment-duration":
      if (!data.previousEmploymentDuration) {
        errors.previousEmploymentDuration = "Select how long you were with your previous employer";
      }
      break;

    case "residential":
      if (!data.residentialStatus) errors.residentialStatus = "Select your living situation";
      break;

    case "vehicle":
    case "joint":
    case "review":
      break;
  }

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function isStepComplete(stepId: StepId | string, data: ApplicationData): boolean {
  return !hasErrors(validateStep(stepId, data));
}
