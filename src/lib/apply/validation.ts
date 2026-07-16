import { type ApplicationData, type StepId } from "./types";

export type FieldErrors = Partial<Record<keyof ApplicationData, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

function cleanMobile(value: string): string {
  return value.replace(/\s+/g, "");
}

export function validateStep(stepId: StepId, data: ApplicationData): FieldErrors {
  const errors: FieldErrors = {};

  switch (stepId) {
    case "mobile":
      if (!cleanMobile(data.mobile)) {
        errors.mobile = "Please enter your mobile number";
      }
      break;

    case "joint-choice":
      break;

    case "email":
      if (data.email && !emailRegex.test(data.email)) {
        errors.email = "Please enter a valid email address";
      }
      break;

    case "dob":
      if (!data.dateOfBirth) {
        errors.dateOfBirth = "Enter your date of birth";
      } else {
        const dob = new Date(data.dateOfBirth);
        const age = (Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
        if (age < 18) errors.dateOfBirth = "You must be 18 or over to apply";
      }
      break;

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

    case "address":
      if (!data.postcode.trim()) errors.postcode = "Enter your postcode";
      else if (!postcodeRegex.test(data.postcode.trim())) {
        errors.postcode = "Enter a valid UK postcode";
      }
      if (!data.address.trim()) errors.address = "Select your address";
      break;

    case "address-duration":
      if (!data.yearsAtAddress) {
        errors.yearsAtAddress = "Tell us how long you've lived here";
      }
      break;

    case "previous-address":
      if (!data.previousPostcode.trim()) errors.previousPostcode = "Enter your previous postcode";
      else if (!postcodeRegex.test(data.previousPostcode.trim())) {
        errors.previousPostcode = "Enter a valid UK postcode";
      }
      if (!data.previousAddress.trim()) errors.previousAddress = "Select your previous address";
      break;

    case "residential":
      if (!data.residentialStatus) errors.residentialStatus = "Select your living situation";
      break;

    case "employment":
      if (!data.employmentStatus) errors.employmentStatus = "Select your employment status";
      break;

    case "income":
      if (data.employmentStatus === "employed") {
        if (!data.employerName.trim()) errors.employerName = "Enter your employer name";
        if (!data.jobTitle.trim()) errors.jobTitle = "Enter your job title";
      }
      if (data.employmentStatus === "self-employed") {
        if (!data.businessType.trim()) errors.businessType = "Enter your business type";
        if (!data.yearsTrading) errors.yearsTrading = "Enter years trading";
      }
      if (data.employmentStatus === "retired") {
        if (!data.incomeSource.trim()) errors.incomeSource = "Enter your income source";
      }
      if (!data.monthlyIncome.trim()) {
        errors.monthlyIncome = "Enter your monthly income";
      } else if (Number(data.monthlyIncome) <= 0) {
        errors.monthlyIncome = "Enter a valid monthly income";
      }
      break;

    case "licence":
      if (!data.drivingLicence) errors.drivingLicence = "Select an option";
      break;

    case "vehicle":
      break;

    case "joint":
      // Mock-friendly: allow any entered details through without format checks
      break;

    case "consent":
      if (!data.termsAccepted) {
        errors.termsAccepted = "Please accept the Terms & Conditions to continue";
      }
      if (!data.privacyAccepted) {
        errors.privacyAccepted = "Please accept the Privacy Policy to continue";
      }
      break;

    case "review":
      break;
  }

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function isStepComplete(stepId: StepId, data: ApplicationData): boolean {
  return !hasErrors(validateStep(stepId, data));
}
