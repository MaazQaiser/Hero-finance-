export const mockAddresses: Record<string, string[]> = {
  M11AA: ["12 High Street, Manchester, M1 1AA", "14 High Street, Manchester, M1 1AA"],
  B11BB: ["8 Broad Street, Birmingham, B1 1BB", "10 Broad Street, Birmingham, B1 1BB"],
  LS11CC: ["22 Park Lane, Leeds, LS1 1CC", "24 Park Lane, Leeds, LS1 1CC"],
  E11DD: ["5 City Road, London, E1 1DD", "7 City Road, London, E1 1DD"],
  SW1A1AA: ["10 Downing Street, London, SW1A 1AA"],
};

export function lookupAddresses(postcode: string): string[] {
  const key = postcode.replace(/\s+/g, "").toUpperCase();
  return mockAddresses[key] ?? [];
}

export function formatPostcode(value: string): string {
  return value.toUpperCase();
}
