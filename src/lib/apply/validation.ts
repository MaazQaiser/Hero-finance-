import { type ApplicationData, type StepId } from "./types";

export type FieldErrors = Partial<Record<keyof ApplicationData, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

export function validateStep(stepId: StepId | string, data: ApplicationData): FieldErrors {
  const errors: FieldErrors = {};

  switch (stepId) {
    // v2 Section 0 — Quick questions (auto-advance, no validation needed)
    case "budget":
      if (!data.budgetBand.trim()) errors.budgetBand = "Select a monthly payment band";
      break;
    case "deposit":
      if (!data.depositBand.trim()) errors.depositBand = "Select a deposit amount";
      break;
    case "part-exchange-choice":
      if (!data.hasPartExchange) errors.hasPartExchange = "Select whether you have a part exchange";
      break;
    case "credit-rating":
      if (!data.creditRating.trim()) errors.creditRating = "Select a credit description";
      break;
    case "car-type":
      if (!data.carType.trim()) errors.carType = "Select a vehicle type";
      break;
    case "when":
      if (!data.purchaseTimeframe.trim()) errors.purchaseTimeframe = "Select a timeframe";
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
      if (!data.ukPassport) errors.ukPassport = "Select an option";
      break;

    case "passport-nationality":
      if (!data.ukPassportNationality.trim()) {
        errors.ukPassportNationality = "Select your passport nationality";
      }
      break;

    case "passport-country":
      if (!data.passportCountry.trim()) {
        errors.passportCountry = "Enter the country that issued your passport";
      }
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
      if (!data.addressTenure) {
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
      if (!data.previousAddressMovedIn) {
        errors.previousAddressMovedIn = "Enter the date you moved in";
      }
      if (!data.previousAddressMovedOut) {
        errors.previousAddressMovedOut = "Enter the date you moved out";
      } else if (
        data.previousAddressMovedIn &&
        data.previousAddressMovedOut < data.previousAddressMovedIn
      ) {
        errors.previousAddressMovedOut = "Move-out date should be after move-in date";
      }
      break;

    // v2 Section 4 — Work & income
    case "employment":
      if (!data.employmentStatusFull && !data.employmentStatus) {
        errors.employmentStatusFull = "Select your employment status";
      }
      break;

    case "employer":
      if (!data.employerName.trim()) errors.employerName = "Enter your employer or business name";
      break;

    case "job-title":
      if (!data.jobTitle.trim()) errors.jobTitle = "Enter your job title";
      break;

    case "job-duration":
      if (!data.jobDuration && !data.employmentDuration) {
        errors.jobDuration = "Select how long you've been in your role";
      }
      break;

    case "previous-employer":
      if (!data.previousEmployerName.trim()) {
        errors.previousEmployerName = "Enter your previous employer name";
      }
      break;

    case "previous-job-title":
      if (!data.previousJobTitle.trim()) {
        errors.previousJobTitle = "Enter your previous job title";
      }
      break;

    case "previous-employment-start":
      if (!data.previousEmploymentStart) {
        errors.previousEmploymentStart = "Enter the start date";
      }
      break;

    case "previous-employment-end":
      if (!data.previousEmploymentEnd) {
        errors.previousEmploymentEnd = "Enter the end date";
      } else if (
        data.previousEmploymentStart &&
        data.previousEmploymentEnd < data.previousEmploymentStart
      ) {
        errors.previousEmploymentEnd = "End date should be after the start date";
      }
      break;

    case "income":
      if (!data.monthlyIncome.trim()) {
        errors.monthlyIncome = "Enter your monthly income";
      } else if (Number(data.monthlyIncome) <= 0) {
        errors.monthlyIncome = "Enter a valid monthly income";
      }
      break;

    case "other-income":
      // Optional — never block
      break;

    // Part exchange
    case "px-intro":
    case "px-complete":
      break;

    case "px-registration":
      if (!data.partExchangeRegUnknown && !data.partExchangeRegistration.trim()) {
        errors.partExchangeRegistration = "Enter your registration or choose I don't know";
      }
      break;

    case "px-mileage":
      if (!data.partExchangeMileage.trim()) {
        errors.partExchangeMileage = "Enter an estimated mileage";
      }
      break;

    case "px-on-finance":
      if (!data.hasFinanceToSettle) {
        errors.hasFinanceToSettle = "Select whether the vehicle is on finance";
      }
      break;

    case "px-lender":
      if (!data.partExchangeLender.trim()) {
        errors.partExchangeLender = "Select or enter your finance lender";
      }
      break;

    case "px-monthly-payment":
      if (!data.partExchangeMonthlyPayment.trim()) {
        errors.partExchangeMonthlyPayment = "Enter your monthly payment";
      }
      break;

    case "px-settlement":
      // Optional — never block
      break;

    // Joint applicant
    case "ja-intro":
    case "ja-review":
      break;

    case "ja-name":
      if (!data.jointFirstName.trim()) errors.jointFirstName = "Enter their first name";
      if (!data.jointLastName.trim()) errors.jointLastName = "Enter their last name";
      break;

    case "ja-dob":
      if (!data.jointDateOfBirth) {
        errors.jointDateOfBirth = "Enter their date of birth";
      } else {
        const dob = new Date(data.jointDateOfBirth);
        const today = new Date();
        if (Number.isNaN(dob.getTime()) || dob > today) {
          errors.jointDateOfBirth = "Enter a valid date of birth";
        } else {
          const eighteen = new Date(today);
          eighteen.setFullYear(eighteen.getFullYear() - 18);
          if (dob > eighteen) {
            errors.jointDateOfBirth = "They must be 18 or over";
          }
        }
      }
      break;

    case "ja-relationship":
      if (!data.jointRelationship) errors.jointRelationship = "Select their relationship to you";
      break;

    case "ja-address":
      if (!data.jointPostcode.trim()) errors.jointPostcode = "Enter their postcode";
      else if (!postcodeRegex.test(data.jointPostcode.trim())) {
        errors.jointPostcode = "Enter a valid UK postcode";
      }
      if (!data.jointAddress.trim()) errors.jointAddress = "Select their address";
      break;

    case "ja-address-duration":
      if (!data.jointAddressTenure) {
        errors.jointAddressTenure = "Tell us how long they've lived there";
      }
      break;

    case "ja-previous-address":
      if (!data.jointPreviousPostcode.trim()) {
        errors.jointPreviousPostcode = "Enter their previous postcode";
      } else if (!postcodeRegex.test(data.jointPreviousPostcode.trim())) {
        errors.jointPreviousPostcode = "Enter a valid UK postcode";
      }
      if (!data.jointPreviousAddress.trim()) {
        errors.jointPreviousAddress = "Select their previous address";
      }
      break;

    case "ja-previous-address-duration":
      if (!data.jointPreviousMovedIn) {
        errors.jointPreviousMovedIn = "Enter the date they moved in";
      }
      if (!data.jointPreviousMovedOut) {
        errors.jointPreviousMovedOut = "Enter the date they moved out";
      } else if (
        data.jointPreviousMovedIn &&
        data.jointPreviousMovedOut < data.jointPreviousMovedIn
      ) {
        errors.jointPreviousMovedOut = "Move-out date should be after move-in";
      }
      break;

    case "ja-living":
      if (!data.jointLivingStatus) errors.jointLivingStatus = "Select their residential status";
      break;

    case "ja-employment":
      if (!data.jointEmploymentStatusFull) {
        errors.jointEmploymentStatusFull = "Select their employment status";
      }
      break;

    case "ja-employer":
      if (!data.jointEmployerName.trim()) {
        errors.jointEmployerName = "Enter their employer or business name";
      }
      break;

    case "ja-job-title":
      if (!data.jointJobTitle.trim()) errors.jointJobTitle = "Enter their job title";
      break;

    case "ja-job-duration":
      if (!data.jointJobDuration) {
        errors.jointJobDuration = "Select how long they've been in their role";
      }
      break;

    case "ja-previous-employer":
      if (!data.jointPreviousEmployerName.trim()) {
        errors.jointPreviousEmployerName = "Enter their previous employer name";
      }
      break;

    case "ja-previous-job-title":
      if (!data.jointPreviousJobTitle.trim()) {
        errors.jointPreviousJobTitle = "Enter their previous job title";
      }
      break;

    case "ja-previous-employment-start":
      if (!data.jointPreviousEmploymentStart) {
        errors.jointPreviousEmploymentStart = "Enter the start date";
      }
      break;

    case "ja-previous-employment-end":
      if (!data.jointPreviousEmploymentEnd) {
        errors.jointPreviousEmploymentEnd = "Enter the end date";
      } else if (
        data.jointPreviousEmploymentStart &&
        data.jointPreviousEmploymentEnd < data.jointPreviousEmploymentStart
      ) {
        errors.jointPreviousEmploymentEnd = "End date should be after the start date";
      }
      break;

    case "ja-income":
      if (!data.jointMonthlyIncome.trim()) {
        errors.jointMonthlyIncome = "Enter their monthly income";
      } else if (Number(data.jointMonthlyIncome) <= 0) {
        errors.jointMonthlyIncome = "Enter a valid monthly income";
      }
      break;

    case "ja-mobile":
      if (!data.jointMobile.trim()) errors.jointMobile = "Enter their mobile number";
      break;

    case "ja-email":
      if (!data.jointEmail.trim()) {
        errors.jointEmail = "Enter their email address";
      } else if (!emailRegex.test(data.jointEmail)) {
        errors.jointEmail = "Please enter a valid email address";
      }
      break;

    // v2 Section — Confirm
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
