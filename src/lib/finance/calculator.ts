import { getCreditProfile, type CreditProfileId } from "./creditProfiles";

export interface FinanceQuote {
  monthlyPayment: number;
  apr: number;
  amountBorrowed: number;
  totalRepayable: number;
  costOfCredit: number;
}

export function calculateMonthlyPayment(
  principal: number,
  apr: number,
  termMonths: number,
): number {
  if (principal <= 0 || termMonths <= 0) return 0;
  if (apr <= 0) return principal / termMonths;

  const rate = apr / 100 / 12;
  const factor = Math.pow(1 + rate, termMonths);
  return (principal * rate * factor) / (factor - 1);
}

export function calculatePrincipalFromPayment(
  monthlyPayment: number,
  apr: number,
  termMonths: number,
): number {
  if (monthlyPayment <= 0 || termMonths <= 0) return 0;
  if (apr <= 0) return monthlyPayment * termMonths;

  const rate = apr / 100 / 12;
  const factor = Math.pow(1 + rate, termMonths);
  return (monthlyPayment * (factor - 1)) / (rate * factor);
}

export function calculateFinanceQuote(
  amountBorrowed: number,
  creditProfile: CreditProfileId,
  termMonths: number,
): FinanceQuote {
  const apr = getCreditProfile(creditProfile).apr;
  const monthlyPayment = calculateMonthlyPayment(amountBorrowed, apr, termMonths);
  const totalRepayable = monthlyPayment * termMonths;
  const costOfCredit = Math.max(0, totalRepayable - amountBorrowed);

  return {
    monthlyPayment,
    apr,
    amountBorrowed,
    totalRepayable,
    costOfCredit,
  };
}

export function calculateMonthlyPaymentMode(input: {
  vehiclePrice: number;
  deposit: number;
  termMonths: number;
  creditProfile: CreditProfileId;
}) {
  const amountBorrowed = Math.max(0, input.vehiclePrice - input.deposit);
  const quote = calculateFinanceQuote(amountBorrowed, input.creditProfile, input.termMonths);

  return {
    ...quote,
    vehiclePrice: input.vehiclePrice,
    deposit: input.deposit,
    headline: quote.monthlyPayment,
    headlineLabel: "Estimated monthly payment",
  };
}

export function calculateAffordabilityMode(input: {
  monthlyBudget: number;
  deposit: number;
  termMonths: number;
  creditProfile: CreditProfileId;
}) {
  const amountBorrowed = calculatePrincipalFromPayment(
    input.monthlyBudget,
    getCreditProfile(input.creditProfile).apr,
    input.termMonths,
  );
  const maxVehiclePrice = Math.round(amountBorrowed + input.deposit);
  const quote = calculateFinanceQuote(amountBorrowed, input.creditProfile, input.termMonths);

  return {
    ...quote,
    maxVehiclePrice,
    suggestedMonthlyBudget: input.monthlyBudget,
    headline: maxVehiclePrice,
    headlineLabel: "Estimated maximum vehicle price",
  };
}

