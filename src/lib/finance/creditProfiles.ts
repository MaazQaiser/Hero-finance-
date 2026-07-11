export type CreditProfileId = "excellent" | "good" | "fair" | "rebuilding";

export interface CreditProfile {
  id: CreditProfileId;
  label: string;
  description: string;
  apr: number;
}

export const creditProfiles: CreditProfile[] = [
  {
    id: "excellent",
    label: "Excellent",
    description: "Strong credit history",
    apr: 8.9,
  },
  {
    id: "good",
    label: "Good",
    description: "Minor issues, if any",
    apr: 10.9,
  },
  {
    id: "fair",
    label: "Fair",
    description: "Some missed payments",
    apr: 13.9,
  },
  {
    id: "rebuilding",
    label: "Rebuilding",
    description: "CCJs or past refusals",
    apr: 16.9,
  },
];

export const defaultCreditProfile: CreditProfileId = "good";

export function getCreditProfile(id: CreditProfileId): CreditProfile {
  return creditProfiles.find((profile) => profile.id === id) ?? creditProfiles[1];
}

export const termOptions = [12, 24, 36, 48, 60, 72, 84] as const;

export const defaultTermMonths = 48;
