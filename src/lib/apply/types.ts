export type EmploymentStatus = "employed" | "self-employed" | "retired" | "other";
export type ResidentialStatus = "homeowner" | "renting" | "family" | "other";
export type DrivingLicence = "full-uk" | "provisional" | "eu-international" | "none";
export type EmploymentDuration =
  | "less-than-3-months"
  | "3-6-months"
  | "6-12-months"
  | "1-3-years"
  | "more-than-3-years"
  | "";
export type PreviousEmploymentDuration =
  | "less-than-1-year"
  | "1-2-years"
  | "2-3-years"
  | "more-than-3-years"
  | "";
export type AddressDuration =
  | "less-than-1-year"
  | "1-2-years"
  | "2-3-years"
  | "3-5-years"
  | "more-than-5-years"
  | "";

export interface ApplicationData {
  // Core personal
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dateOfBirth: string;

  // v2 Section 0 — Quick questions
  budgetBand: string; // "Under £150" | "£150–£200" | "£200–£300" | "£300–£400" | "£400+" | "I'm not sure yet — show me what I can afford"
  depositBand: string; // "£0 Deposit" | "Under £500" | "£500–£1,000" | "£1,000–£1,500" | "£1,500–£2,500" | "£2,500+"
  carType: string; // "Small car" | "Family car or estate" | "SUV" | "Van or pickup" | "Not sure yet"
  creditRating: string; // "Excellent" | "Good" | "Fair" | "Poor" | "I've been refused before"
  /** Captured on the deposit screen — vehicle details collected later */
  hasPartExchange: "" | "yes" | "no";
  // purchaseTimeframe shared with v1

  // Address (v2 uses addressTenure; legacy uses yearsAtAddress)
  postcode: string;
  address: string;
  yearsAtAddress: AddressDuration | string; // legacy
  addressTenure: string; // "Yes, I've lived here for 3 years or more" | "No, I've moved within the last 3 years" (legacy bands still recognised)
  livingStatus: string; // v2 6-way: "Homeowner with a mortgage" | ...
  residentialStatus: ResidentialStatus | ""; // legacy
  previousPostcode: string;
  previousAddress: string;
  previousAddressTenure: string; // legacy tenure bands — superseded by move dates when present
  previousAddressMovedIn: string; // YYYY-MM-DD
  previousAddressMovedOut: string; // YYYY-MM-DD

  // Employment
  employmentStatus: EmploymentStatus | ""; // legacy 4-way
  employmentStatusFull: string; // v2 8-way: "employed-full-time" | "employed-part-time" | "self-employed" | "retired" | "student" | "unemployed" | "receiving-benefits" | "homemaker"
  employmentDuration: EmploymentDuration; // legacy
  jobDuration: string; // v2: "Over 3 years" | "1–3 years" | "6–12 months" | "3–6 months" | "Under 3 months"
  previousEmployerName: string;
  previousJobTitle: string;
  previousEmploymentDuration: PreviousEmploymentDuration; // legacy
  previousEmploymentStart: string; // YYYY-MM-DD
  previousEmploymentEnd: string; // YYYY-MM-DD
  employerName: string;
  jobTitle: string;
  businessType: string;
  yearsTrading: string;
  incomeSource: string;
  monthlyIncome: string;
  otherIncome: string;    // v2: optional additional income

  // Licence (extended in v2 to include EU/international)
  drivingLicence: DrivingLicence | "";
  /** UK passport — empty until answered */
  ukPassport: "" | "yes" | "no";

  // Vehicle (legacy — v2 removes vehicle search from apply)
  vehicleId: string;
  vehicleSearch: string;
  financeDeposit: string;
  purchaseTimeframe: string;
  hasFinanceToSettle: "" | "yes" | "no";
  settlementAmount: string;
  /** Part exchange vehicle details — collected near end when hasPartExchange is yes */
  partExchangeRegistration: string;
  partExchangeRegUnknown: boolean;
  partExchangeMileage: string;
  partExchangeLender: string;
  partExchangeMonthlyPayment: string;

  // Joint — null until the user picks on the joint-choice step
  jointApplicant: boolean | null;
  jointFirstName: string;
  jointLastName: string;
  jointDateOfBirth: string;
  jointRelationship: string;
  jointPostcode: string;
  jointAddress: string;
  jointAddressTenure: string;
  jointPreviousPostcode: string;
  jointPreviousAddress: string;
  jointPreviousMovedIn: string;
  jointPreviousMovedOut: string;
  jointLivingStatus: string;
  jointEmploymentStatus: EmploymentStatus | ""; // legacy
  jointEmploymentStatusFull: string;
  jointEmployerName: string;
  jointJobTitle: string;
  jointJobDuration: string;
  jointPreviousEmployerName: string;
  jointPreviousJobTitle: string;
  jointPreviousEmploymentStart: string;
  jointPreviousEmploymentEnd: string;
  jointMonthlyIncome: string;
  jointMobile: string;
  jointEmail: string;

  // Consent
  termsAccepted: boolean;
  privacyAccepted: boolean;
  marketingConsent: boolean;
}

export type StepId =
  // v2 Section 0 — Quick questions
  | "budget"
  | "deposit"
  | "part-exchange-choice"
  | "car-type"
  | "credit-rating"
  | "when"
  // v2 Section 1 — Details
  | "name"
  | "mobile"
  | "email"
  | "dob"
  | "joint-choice"
  // v2 Section 2 — Licence / ID
  | "licence"
  | "uk-passport"
  // v2 Section 3 — Address
  | "address"
  | "address-duration"
  | "living"
  | "previous-address"
  | "previous-address-duration"
  // v2 Section 4 — Work & income
  | "employment"
  | "employer"
  | "job-title"
  | "job-duration"
  | "previous-employer"
  | "previous-job-title"
  | "previous-employment-start"
  | "previous-employment-end"
  | "income"
  | "other-income"
  // Part exchange (conditional)
  | "px-intro"
  | "px-registration"
  | "px-mileage"
  | "px-on-finance"
  | "px-lender"
  | "px-monthly-payment"
  | "px-settlement"
  | "px-complete"
  // Joint applicant (conditional)
  | "ja-intro"
  | "ja-name"
  | "ja-dob"
  | "ja-relationship"
  | "ja-address"
  | "ja-address-duration"
  | "ja-previous-address"
  | "ja-previous-address-duration"
  | "ja-living"
  | "ja-employment"
  | "ja-employer"
  | "ja-job-title"
  | "ja-job-duration"
  | "ja-previous-employer"
  | "ja-previous-job-title"
  | "ja-previous-employment-start"
  | "ja-previous-employment-end"
  | "ja-income"
  | "ja-mobile"
  | "ja-email"
  | "ja-review"
  // Confirm / Review
  | "consent"
  // Legacy (kept for storage/resume backward compat)
  | "residential"
  | "employment-duration"
  | "previous-employment-duration"
  | "vehicle"
  | "joint"
  | "review";

export const INTRO_SCREEN_COUNT = 7;

export const initialApplicationData: ApplicationData = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  dateOfBirth: "",
  // v2 quick questions
  budgetBand: "",
  depositBand: "",
  carType: "",
  creditRating: "",
  hasPartExchange: "",
  // address
  postcode: "",
  address: "",
  yearsAtAddress: "",
  addressTenure: "",
  livingStatus: "",
  residentialStatus: "",
  previousPostcode: "",
  previousAddress: "",
  previousAddressTenure: "",
  previousAddressMovedIn: "",
  previousAddressMovedOut: "",
  // employment
  employmentStatus: "",
  employmentStatusFull: "",
  employmentDuration: "",
  jobDuration: "",
  previousEmployerName: "",
  previousJobTitle: "",
  previousEmploymentDuration: "",
  previousEmploymentStart: "",
  previousEmploymentEnd: "",
  employerName: "",
  jobTitle: "",
  businessType: "",
  yearsTrading: "",
  incomeSource: "",
  monthlyIncome: "",
  otherIncome: "",
  // licence
  drivingLicence: "",
  ukPassport: "",
  // vehicle (legacy)
  vehicleId: "",
  vehicleSearch: "",
  financeDeposit: "",
  purchaseTimeframe: "",
  hasFinanceToSettle: "",
  settlementAmount: "",
  partExchangeRegistration: "",
  partExchangeRegUnknown: false,
  partExchangeMileage: "",
  partExchangeLender: "",
  partExchangeMonthlyPayment: "",
  // joint
  jointApplicant: null,
  jointFirstName: "",
  jointLastName: "",
  jointDateOfBirth: "",
  jointRelationship: "",
  jointPostcode: "",
  jointAddress: "",
  jointAddressTenure: "",
  jointPreviousPostcode: "",
  jointPreviousAddress: "",
  jointPreviousMovedIn: "",
  jointPreviousMovedOut: "",
  jointLivingStatus: "",
  jointEmploymentStatus: "",
  jointEmploymentStatusFull: "",
  jointEmployerName: "",
  jointJobTitle: "",
  jointJobDuration: "",
  jointPreviousEmployerName: "",
  jointPreviousJobTitle: "",
  jointPreviousEmploymentStart: "",
  jointPreviousEmploymentEnd: "",
  jointMonthlyIncome: "",
  jointMobile: "",
  jointEmail: "",
  // consent
  termsAccepted: false,
  privacyAccepted: false,
  marketingConsent: false,
};

const AUTO_ADVANCE_STEPS: StepId[] = [
  "residential", "employment", "licence", "uk-passport", "joint-choice",
  "budget", "deposit", "part-exchange-choice", "car-type", "credit-rating", "when",
  "address-duration", "living",
  "job-duration",
  "px-on-finance",
  "ja-relationship", "ja-address-duration", "ja-living", "ja-employment", "ja-job-duration",
];

export function isAutoAdvanceStep(stepId: StepId): boolean {
  return AUTO_ADVANCE_STEPS.includes(stepId);
}

export function normalizeStepId(stepId: string): StepId {
  if (stepId === "basic-details") return "mobile";
  if (stepId === "address-history") return "previous-address";
  if (stepId === "employment-duration") return "job-duration";
  if (stepId === "residential") return "living";
  if (stepId === "previous-employment-duration") return "previous-employment-start";
  return stepId as StepId;
}

export function needsPreviousEmployment(data: ApplicationData): boolean {
  if (data.jobDuration) {
    return data.jobDuration === "Under 3 months";
  }
  if (!data.employmentDuration) return false;
  return data.employmentDuration !== "more-than-3-years";
}

export function needsJointPrevAddress(data: ApplicationData): boolean {
  if (data.jointAddressTenure === "No, I've moved within the last 3 years") return true;
  if (data.jointAddressTenure === "Yes, I've lived here for 3 years or more") return false;
  return ["Under 6 months", "6 to 12 months", "1 to 2 years", "2 to 3 years"].includes(
    data.jointAddressTenure,
  );
}

export function needsJointEmployerInfo(data: ApplicationData): boolean {
  return ["employed-full-time", "employed-part-time", "self-employed"].includes(
    data.jointEmploymentStatusFull,
  );
}

export function needsJointPreviousEmployment(data: ApplicationData): boolean {
  return data.jointJobDuration === "Under 3 months";
}

export function needsPreviousAddress(data: ApplicationData): boolean {
  return needsPrevAddressFromTenure(data);
}

/** Shared 3-year address history rule for v1 + v2 flows. */
export function needsPrevAddressFromTenure(data: ApplicationData): boolean {
  if (data.addressTenure) {
    if (data.addressTenure === "No, I've moved within the last 3 years") return true;
    if (data.addressTenure === "Yes, I've lived here for 3 years or more") return false;
    // Legacy multi-band values
    return ["Under 6 months", "6 to 12 months", "1 to 2 years", "2 to 3 years"].includes(
      data.addressTenure,
    );
  }
  if (!data.yearsAtAddress) return false;
  return ["less-than-1-year", "1-2-years", "2-3-years"].includes(data.yearsAtAddress);
}

export function getPreBridgeSteps(): StepId[] {
  return ["residential", "employment", "licence", "joint-choice", "mobile"];
}

export function getPostBridgeSteps(data: ApplicationData): StepId[] {
  const steps: StepId[] = ["email", "dob", "employment-duration"];

  if (needsPreviousEmployment(data)) {
    steps.push("previous-employer", "previous-employment-duration");
  }

  steps.push("address", "address-duration");

  if (needsPreviousAddress(data)) {
    steps.push("previous-address");
  }

  steps.push("income", "vehicle");

  if (data.jointApplicant) {
    steps.push("joint");
  }

  steps.push("consent");

  // Guard against accidental duplicates if step list is extended later
  return steps.filter((step, index) => steps.indexOf(step) === index);
}

export function getActiveSteps(data: ApplicationData): StepId[] {
  return [...getPreBridgeSteps(), ...getPostBridgeSteps(data)];
}

export function getStepNumber(stepId: StepId, data: ApplicationData): number {
  const allSteps = getActiveSteps(data);
  const index = allSteps.indexOf(stepId);
  return index >= 0 ? index + 2 : 2;
}

export function getTotalStepCount(data: ApplicationData): number {
  return INTRO_SCREEN_COUNT + getPostBridgeSteps(data).length;
}
