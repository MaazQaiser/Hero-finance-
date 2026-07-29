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
  budgetBand: string;     // "Under £200" | "£200 to £300" | "£300 to £400" | "£400 to £500" | "Over £500"
  depositBand: string;    // "None" | "Under £500" | "£500 to £1,000" | "£1,000 to £2,500" | "Over £2,500"
  carType: string;        // "Small car" | "Family car or estate" | "SUV" | "Van or pickup" | "Not sure yet"
  creditRating: string;   // "Excellent" | "Good" | "Fair" | "Poor" | "Not sure"
  // purchaseTimeframe shared with v1

  // Address (v2 uses addressTenure; legacy uses yearsAtAddress)
  postcode: string;
  address: string;
  yearsAtAddress: AddressDuration | string; // legacy
  addressTenure: string;  // v2: "Under 6 months" | "6 to 12 months" | "1 to 2 years" | "2 to 3 years" | "Over 3 years"
  livingStatus: string;   // v2 6-way: "Homeowner with a mortgage" | "Homeowner, no mortgage" | "Renting privately" | "Renting from council or housing association" | "Living with parents or family" | "Other"
  residentialStatus: ResidentialStatus | ""; // legacy
  previousPostcode: string;
  previousAddress: string;
  previousAddressTenure: string; // v2: "Under 1 year" | "1 to 2 years" | "2 to 3 years" | "Over 3 years"

  // Employment
  employmentStatus: EmploymentStatus | ""; // legacy 4-way
  employmentStatusFull: string; // v2 8-way: "employed-full-time" | "employed-part-time" | "self-employed" | "retired" | "student" | "unemployed" | "receiving-benefits" | "homemaker"
  employmentDuration: EmploymentDuration; // legacy
  jobDuration: string;    // v2: "Under 3 months" | "3 to 6 months" | "6 to 12 months" | "1 to 3 years" | "Over 3 years"
  previousEmployerName: string;
  previousEmploymentDuration: PreviousEmploymentDuration;
  employerName: string;
  jobTitle: string;
  businessType: string;
  yearsTrading: string;
  incomeSource: string;
  monthlyIncome: string;
  otherIncome: string;    // v2: optional additional income

  // Licence (extended in v2 to include EU/international)
  drivingLicence: DrivingLicence | "";

  // Vehicle (legacy — v2 removes vehicle search from apply)
  vehicleId: string;
  vehicleSearch: string;
  financeDeposit: string;
  purchaseTimeframe: string;
  hasFinanceToSettle: "" | "yes" | "no";
  settlementAmount: string;

  // Joint — null until the user picks on the joint-choice step
  jointApplicant: boolean | null;
  jointFirstName: string;
  jointLastName: string;
  jointMobile: string;
  jointDateOfBirth: string;
  jointEmploymentStatus: EmploymentStatus | "";
  jointMonthlyIncome: string;

  // Consent
  termsAccepted: boolean;
  privacyAccepted: boolean;
  marketingConsent: boolean;
}

export type StepId =
  // v2 Section 0 — Quick questions
  | "budget"
  | "deposit"
  | "car-type"
  | "credit-rating"
  | "when"
  // v2 Section 1 — Details
  | "name"
  | "mobile"
  | "email"
  | "dob"
  | "joint-choice"
  // v2 Section 2 — Licence
  | "licence"
  // v2 Section 3 — Address
  | "address"
  | "address-duration"
  | "living"
  | "previous-address"
  | "previous-address-duration"
  // v2 Section 4 — Work & income
  | "employment"
  | "employer"
  | "job-duration"
  | "income"
  // v2 Section 5 — Confirm
  | "consent"
  // Legacy (kept for storage/resume backward compat)
  | "residential"
  | "employment-duration"
  | "previous-employer"
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
  // employment
  employmentStatus: "",
  employmentStatusFull: "",
  employmentDuration: "",
  jobDuration: "",
  previousEmployerName: "",
  previousEmploymentDuration: "",
  employerName: "",
  jobTitle: "",
  businessType: "",
  yearsTrading: "",
  incomeSource: "",
  monthlyIncome: "",
  otherIncome: "",
  // licence
  drivingLicence: "",
  // vehicle (legacy)
  vehicleId: "",
  vehicleSearch: "",
  financeDeposit: "",
  purchaseTimeframe: "",
  hasFinanceToSettle: "",
  settlementAmount: "",
  // joint
  jointApplicant: null,
  jointFirstName: "",
  jointLastName: "",
  jointMobile: "",
  jointDateOfBirth: "",
  jointEmploymentStatus: "",
  jointMonthlyIncome: "",
  // consent
  termsAccepted: false,
  privacyAccepted: false,
  marketingConsent: false,
};

const AUTO_ADVANCE_STEPS: StepId[] = [
  "residential", "employment", "licence", "joint-choice",
  "budget", "deposit", "car-type", "credit-rating", "when",
  "address-duration", "living", "previous-address-duration",
  "job-duration",
];

export function isAutoAdvanceStep(stepId: StepId): boolean {
  return AUTO_ADVANCE_STEPS.includes(stepId);
}

export function normalizeStepId(stepId: string): StepId {
  if (stepId === "basic-details") return "mobile";
  if (stepId === "address-history") return "previous-address";
  if (stepId === "employment-duration") return "job-duration";
  if (stepId === "residential") return "living";
  return stepId as StepId;
}

export function needsPreviousEmployment(data: ApplicationData): boolean {
  if (!data.employmentDuration) return false;
  return data.employmentDuration !== "more-than-3-years";
}

export function needsPreviousAddress(data: ApplicationData): boolean {
  // v2 address tenure values
  if (data.addressTenure) {
    return ["Under 6 months", "6 to 12 months", "1 to 2 years", "2 to 3 years"].includes(
      data.addressTenure,
    );
  }
  // legacy values
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
