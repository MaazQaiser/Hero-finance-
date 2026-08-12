import { type ApplicationData } from "./types";
import { vehicles } from "@/data/vehicles";

export type DecisionState = "approved" | "declined" | "pending";

export interface FinanceDecision {
  state: DecisionState;
  referenceId: string;
  applicantName: string;
  approvedAmount?: number;
  apr?: number;
  estimatedMonthly?: number;
  termMonths?: number;
  lenderName?: string;
  expectedResponseHours?: number;
  // v2 — customer-provided context
  budgetBand?: string;
  depositBand?: string;
  carType?: string;
  purchaseTimeframe?: string;
}

const DECISION_KEY = "hero-finance-decision";

export function generateReferenceId(): string {
  return `HF-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

export function generateDecision(data: ApplicationData): FinanceDecision {
  // Strip currency symbols / commas so "2,500" or "£2500" parse correctly
  const income = Number(String(data.monthlyIncome).replace(/[£,\s]/g, "")) || 0;
  const referenceId = generateReferenceId();
  const applicantName = data.firstName || "there";

  const context = {
    budgetBand: data.budgetBand || undefined,
    // Keep "None" as a real value — don't treat it as empty
    depositBand: data.depositBand.trim() ? data.depositBand : undefined,
    carType: data.carType || undefined,
    purchaseTimeframe: data.purchaseTimeframe || undefined,
  };

  if (income > 0 && income < 1200) {
    return { state: "declined", referenceId, applicantName, ...context };
  }

  if (income >= 1200 && income < 1800) {
    return {
      state: "pending",
      referenceId,
      applicantName,
      expectedResponseHours: 24,
      ...context,
    };
  }

  const approvedAmount = Math.min(
    Math.round((income * 0.35 * 48) / 100) * 100 || 18000,
    28000,
  );
  const termMonths = 48;
  const apr = 9.9;
  const principal = approvedAmount * 0.9;
  const monthlyRate = apr / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, termMonths);
  const estimatedMonthly = Math.round((principal * monthlyRate * factor) / (factor - 1));

  return {
    state: "approved",
    referenceId,
    applicantName,
    approvedAmount: Math.max(approvedAmount, 10000),
    apr,
    estimatedMonthly,
    termMonths,
    lenderName: "Close Brothers Motor Finance",
    ...context,
  };
}

export function saveDecision(decision: FinanceDecision): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(DECISION_KEY, JSON.stringify(decision));
}

export function loadDecision(): FinanceDecision | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(DECISION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as FinanceDecision;
  } catch {
    return null;
  }
}

export function getMatchedVehicles(approvedAmount: number) {
  return vehicles
    .filter((vehicle) => vehicle.price <= approvedAmount)
    .sort((a, b) => b.monthlyHp - a.monthlyHp)
    .slice(0, 6);
}

export function parseDecisionState(value?: string): DecisionState | null {
  if (value === "approved" || value === "declined" || value === "pending") {
    return value;
  }
  return null;
}
