export type EmploymentStatus = "employed" | "self-employed" | "retired" | "other";
export type ResidentialStatus = "homeowner" | "renting" | "family" | "other";
export type DrivingLicence = "full-uk" | "provisional" | "none";
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
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dateOfBirth: string;
  postcode: string;
  address: string;
  yearsAtAddress: AddressDuration | string;
  residentialStatus: ResidentialStatus | "";
  employmentStatus: EmploymentStatus | "";
  employmentDuration: EmploymentDuration;
  previousEmployerName: string;
  previousEmploymentDuration: PreviousEmploymentDuration;
  employerName: string;
  jobTitle: string;
  businessType: string;
  yearsTrading: string;
  incomeSource: string;
  monthlyIncome: string;
  previousPostcode: string;
  previousAddress: string;
  drivingLicence: DrivingLicence | "";
  vehicleId: string;
  vehicleSearch: string;
  financeDeposit: string;
  purchaseTimeframe: string;
  hasFinanceToSettle: "" | "yes" | "no";
  settlementAmount: string;
  jointApplicant: boolean;
  jointFirstName: string;
  jointLastName: string;
  jointMobile: string;
  jointDateOfBirth: string;
  jointEmploymentStatus: EmploymentStatus | "";
  jointMonthlyIncome: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  marketingConsent: boolean;
}

export type StepId =
  | "residential"
  | "employment"
  | "licence"
  | "joint-choice"
  | "mobile"
  | "email"
  | "dob"
  | "employment-duration"
  | "previous-employer"
  | "previous-employment-duration"
  | "address"
  | "address-duration"
  | "previous-address"
  | "income"
  | "vehicle"
  | "joint"
  | "consent"
  | "review";

export const INTRO_SCREEN_COUNT = 7;

export const initialApplicationData: ApplicationData = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  dateOfBirth: "",
  postcode: "",
  address: "",
  yearsAtAddress: "",
  residentialStatus: "",
  employmentStatus: "",
  employmentDuration: "",
  previousEmployerName: "",
  previousEmploymentDuration: "",
  employerName: "",
  jobTitle: "",
  businessType: "",
  yearsTrading: "",
  incomeSource: "",
  monthlyIncome: "",
  previousPostcode: "",
  previousAddress: "",
  drivingLicence: "",
  vehicleId: "",
  vehicleSearch: "",
  financeDeposit: "",
  purchaseTimeframe: "",
  hasFinanceToSettle: "",
  settlementAmount: "",
  jointApplicant: false,
  jointFirstName: "",
  jointLastName: "",
  jointMobile: "",
  jointDateOfBirth: "",
  jointEmploymentStatus: "",
  jointMonthlyIncome: "",
  termsAccepted: false,
  privacyAccepted: false,
  marketingConsent: false,
};

const AUTO_ADVANCE_STEPS: StepId[] = ["residential", "employment", "licence", "joint-choice"];

export function isAutoAdvanceStep(stepId: StepId): boolean {
  return AUTO_ADVANCE_STEPS.includes(stepId);
}

export function normalizeStepId(stepId: string): StepId {
  if (stepId === "basic-details") return "mobile";
  if (stepId === "address-history") return "previous-address";
  return stepId as StepId;
}

export function needsPreviousEmployment(data: ApplicationData): boolean {
  if (!data.employmentDuration) return false;
  return data.employmentDuration !== "more-than-3-years";
}

export function needsPreviousAddress(data: ApplicationData): boolean {
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

  steps.push("consent", "review");

  return steps;
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
