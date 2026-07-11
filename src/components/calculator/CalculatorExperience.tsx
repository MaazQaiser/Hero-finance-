"use client";

import { useEffect, useMemo, useState } from "react";
import { formatPrice } from "@/data/vehicles";
import {
  calculateAffordabilityMode,
  calculateDepositMode,
  calculateMonthlyPaymentMode,
} from "@/lib/finance/calculator";
import {
  defaultCreditProfile,
  defaultTermMonths,
  type CreditProfileId,
} from "@/lib/finance/creditProfiles";
import { CalculatorModeSwitcher, type CalculatorMode } from "@/components/calculator/CalculatorModeSwitcher";
import { CreditProfileSelector, TermSelector } from "@/components/calculator/CalculatorControls";
import { CurrencySlider, CurrencyStepper } from "@/components/calculator/CalculatorInputs";
import { CalculatorResultCard } from "@/components/calculator/CalculatorResultCard";
import { CalculatorTrustStrip } from "@/components/calculator/CalculatorTrustStrip";
import { CalculatorFaq } from "@/components/calculator/CalculatorFaq";
import { CalculatorStickyCta } from "@/components/calculator/CalculatorStickyCta";

export function CalculatorExperience() {
  const [mode, setMode] = useState<CalculatorMode>("monthly");
  const [vehiclePrice, setVehiclePrice] = useState(15000);
  const [deposit, setDeposit] = useState(1000);
  const [monthlyBudget, setMonthlyBudget] = useState(250);
  const [termMonths, setTermMonths] = useState(defaultTermMonths);
  const [creditProfile, setCreditProfile] = useState<CreditProfileId>(defaultCreditProfile);

  useEffect(() => {
    const maxDeposit = Math.round(vehiclePrice * 0.5);
    if (deposit > maxDeposit) setDeposit(maxDeposit);
  }, [deposit, vehiclePrice]);

  const monthlyResult = useMemo(
    () =>
      calculateMonthlyPaymentMode({
        vehiclePrice,
        deposit,
        termMonths,
        creditProfile,
      }),
    [vehiclePrice, deposit, termMonths, creditProfile],
  );

  const affordabilityResult = useMemo(
    () =>
      calculateAffordabilityMode({
        monthlyBudget,
        deposit,
        termMonths,
        creditProfile,
      }),
    [monthlyBudget, deposit, termMonths, creditProfile],
  );

  const depositResult = useMemo(
    () =>
      calculateDepositMode({
        vehiclePrice,
        monthlyBudget,
        termMonths,
        creditProfile,
      }),
    [vehiclePrice, monthlyBudget, termMonths, creditProfile],
  );

  const activeResult =
    mode === "monthly"
      ? monthlyResult
      : mode === "affordability"
        ? affordabilityResult
        : depositResult;

  const browseHref =
    mode === "affordability"
      ? `/cars?mode=monthly&monthly=${monthlyBudget}&deposit=${deposit}&term=${termMonths}`
      : mode === "deposit"
        ? `/cars?mode=price&maxPrice=${vehiclePrice}`
        : `/cars?mode=price&maxPrice=${vehiclePrice}`;

  const primaryCta =
    mode === "affordability"
      ? { label: "Browse Cars Within This Budget", href: browseHref }
      : mode === "deposit"
        ? { label: "Continue Application", href: "/apply" }
        : { label: "Check My Eligibility", href: "/apply?campaign=price-budget" };

  const secondaryCta =
    mode === "deposit"
      ? { label: "Browse Cars", href: browseHref }
      : { label: "Browse Cars", href: browseHref };

  const resultRows =
    mode === "monthly"
      ? [
          { label: "Amount borrowed", value: formatPrice(monthlyResult.amountBorrowed) },
          { label: "Cost of credit", value: formatPrice(monthlyResult.costOfCredit) },
          { label: "Total repayable", value: formatPrice(monthlyResult.totalRepayable), highlight: true },
        ]
      : mode === "affordability"
        ? [
            { label: "Amount borrowed", value: formatPrice(affordabilityResult.amountBorrowed) },
            { label: "Suggested monthly budget", value: formatPrice(affordabilityResult.suggestedMonthlyBudget) },
            { label: "Total repayable", value: formatPrice(affordabilityResult.totalRepayable) },
          ]
        : [
            { label: "Remaining finance amount", value: formatPrice(depositResult.remainingFinance) },
            { label: "Estimated monthly payment", value: `${formatPrice(depositResult.monthlyPayment)}/mo`, highlight: true },
            { label: "Total repayable", value: formatPrice(depositResult.totalRepayable) },
          ];

  return (
    <>
      <section className="bg-paper pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container-site max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Finance tools</p>
            <h1 className="headline-lg mt-3">Car Finance Calculator</h1>
            <p className="body-lg mx-auto mt-4 max-w-2xl">
              Estimate your finance in seconds with a soft search that won&apos;t affect your credit
              score.
            </p>
            <div className="mt-6">
              <CalculatorTrustStrip />
            </div>
          </div>

          <div className="mt-10">
            <CalculatorModeSwitcher mode={mode} onChange={setMode} />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:items-start lg:gap-8">
            <div className="space-y-4">
              {mode === "monthly" && (
                <>
                  <CurrencySlider
                    id="vehicle-price"
                    label="Vehicle price"
                    value={vehiclePrice}
                    min={3000}
                    max={50000}
                    step={500}
                    onChange={setVehiclePrice}
                  />
                  <CurrencyStepper
                    id="deposit"
                    label="Deposit"
                    value={deposit}
                    min={0}
                    max={Math.round(vehiclePrice * 0.5)}
                    step={250}
                    onChange={setDeposit}
                  />
                </>
              )}

              {mode === "affordability" && (
                <>
                  <CurrencySlider
                    id="monthly-budget"
                    label="Monthly budget"
                    value={monthlyBudget}
                    min={100}
                    max={800}
                    step={10}
                    onChange={setMonthlyBudget}
                  />
                  <CurrencyStepper
                    id="affordability-deposit"
                    label="Deposit"
                    value={deposit}
                    min={0}
                    max={15000}
                    step={250}
                    onChange={setDeposit}
                  />
                </>
              )}

              {mode === "deposit" && (
                <>
                  <CurrencySlider
                    id="deposit-vehicle-price"
                    label="Vehicle price"
                    value={vehiclePrice}
                    min={3000}
                    max={50000}
                    step={500}
                    onChange={setVehiclePrice}
                  />
                  <CurrencySlider
                    id="deposit-monthly-budget"
                    label="Monthly budget"
                    value={monthlyBudget}
                    min={100}
                    max={800}
                    step={10}
                    onChange={setMonthlyBudget}
                  />
                </>
              )}

              <TermSelector value={termMonths} onChange={setTermMonths} />
              <CreditProfileSelector value={creditProfile} onChange={setCreditProfile} />
            </div>

            <div className="lg:sticky lg:top-24">
              <CalculatorResultCard
                key={mode}
                mode={mode}
                headlineLabel={activeResult.headlineLabel}
                headlineValue={activeResult.headline}
                apr={activeResult.apr}
                rows={resultRows}
                primaryCta={primaryCta}
                secondaryCta={secondaryCta}
              />
            </div>
          </div>
        </div>
      </section>

      <CalculatorFaq />

      <CalculatorStickyCta
        primaryLabel={primaryCta.label}
        primaryHref={primaryCta.href}
        secondaryLabel={secondaryCta.label}
        secondaryHref={secondaryCta.href}
      />
    </>
  );
}
