export type EmploymentStatus = "employed" | "self-employed" | "retired" | "other";
export type ResidentialStatus = "homeowner" | "renting" | "family" | "other";
export type DrivingLicence = "full-uk" | "provisional" | "none";

export interface ApplicationData {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dateOfBirth: string;
  postcode: string;
  address: string;
  yearsAtAddress: string;
  residentialStatus: ResidentialStatus | "";
  employmentStatus: EmploymentStatus | "";
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
  | "basic-details"
  | "email"
  | "dob"
  | "address"
  | "residential"
  | "employment"
  | "income"
  | "address-history"
  | "licence"
  | "vehicle"
  | "joint"
  | "consent"
  | "review";

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

export function needsAddressHistory(data: ApplicationData): boolean {
  const years = Number(data.yearsAtAddress);
  return years > 0 && years < 3;
}

export function getActiveSteps(data: ApplicationData): StepId[] {
  const steps: StepId[] = [
    "basic-details",
    "email",
    "dob",
    "address",
    "residential",
    "employment",
    "income",
  ];

  if (needsAddressHistory(data)) {
    steps.push("address-history");
  }

  steps.push("licence", "vehicle", "joint", "consent", "review");

  return steps;
}
