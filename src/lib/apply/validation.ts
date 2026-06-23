import { type ApplicationData, type StepId } from "./types";

export type FieldErrors = Partial<Record<keyof ApplicationData, string>>;

const ukMobileRegex = /^(\+44|0)7\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

function cleanMobile(value: string): string {
  return value.replace(/\s+/g, "");
}

export function validateStep(stepId: StepId, data: ApplicationData): FieldErrors {
  const errors: FieldErrors = {};

  switch (stepId) {
    case "basic-details":
      if (!data.firstName.trim()) errors.firstName = "Please enter your first name";
      if (!data.lastName.trim()) errors.lastName = "Please enter your last name";
      if (!cleanMobile(data.mobile)) {
        errors.mobile = "Please enter your mobile number";
      } else if (!ukMobileRegex.test(cleanMobile(data.mobile))) {
        errors.mobile = "Please enter a valid mobile number";
      }
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

    case "address":
      if (!data.postcode.trim()) errors.postcode = "Enter your postcode";
      else if (!postcodeRegex.test(data.postcode.trim())) {
        errors.postcode = "Enter a valid UK postcode";
      }
      if (!data.address.trim()) errors.address = "Select your address";
      if (!data.yearsAtAddress) errors.yearsAtAddress = "Tell us how long you've lived here";
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

    case "address-history":
      if (!data.previousPostcode.trim()) errors.previousPostcode = "Enter your previous postcode";
      if (!data.previousAddress.trim()) errors.previousAddress = "Select your previous address";
      break;

    case "licence":
      if (!data.drivingLicence) errors.drivingLicence = "Select an option";
      break;

    case "vehicle":
      break;

    case "joint":
      if (data.jointApplicant) {
        if (!data.jointFirstName.trim()) errors.jointFirstName = "Please enter their first name";
        if (!data.jointLastName.trim()) errors.jointLastName = "Please enter their last name";
        if (!cleanMobile(data.jointMobile)) {
          errors.jointMobile = "Please enter their mobile number";
        } else if (!ukMobileRegex.test(cleanMobile(data.jointMobile))) {
          errors.jointMobile = "Please enter a valid mobile number";
        }
        if (!data.jointDateOfBirth) {
          errors.jointDateOfBirth = "Please enter their date of birth";
        }
        if (!data.jointEmploymentStatus) {
          errors.jointEmploymentStatus = "Please select their employment status";
        }
        if (!data.jointMonthlyIncome.trim()) {
          errors.jointMonthlyIncome = "Please enter their monthly income";
        } else if (Number(data.jointMonthlyIncome) <= 0) {
          errors.jointMonthlyIncome = "Please enter a valid monthly income";
        }
      }
      break;

    case "consent":
      if (!data.termsAccepted) errors.termsAccepted = "You must accept the terms";
      if (!data.privacyAccepted) errors.privacyAccepted = "You must accept the privacy policy";
      break;

    case "review":
      break;
  }

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
