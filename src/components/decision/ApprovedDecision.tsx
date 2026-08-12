"use client";

import Link from "next/link";
import Image from "next/image";
import { type FinanceDecision } from "@/lib/apply/decision";
import { vehicles, formatPrice, formatMileage } from "@/data/vehicles";

interface ApprovedDecisionProps {
  decision: FinanceDecision;
  onOpenWarranty?: () => void;
}

function getStockForBudget(decision: FinanceDecision) {
  const budget = decision.approvedAmount && decision.approvedAmount > 0
    ? decision.approvedAmount
    : 25000;
  const list = vehicles.filter((v) => v.price <= budget * 1.05);
  return (list.length >= 3 ? list : vehicles).slice(0, 3);
}

const NEXT_STEPS = [
  "Pick a car, or tell us what you want and we will source it.",
  "We confirm your figures against that car and your final APR.",
  "ID and proof of income checked, then your agreement is issued.",
  "AA inspection completed, then delivery or collection.",
];

export function ApprovedDecision({ decision }: ApprovedDecisionProps) {
  const firstName = decision.applicantName !== "there" ? decision.applicantName : null;
  const budget = decision.budgetBand ?? "your budget";
  const deposit = decision.depositBand ?? "—";
  const carType = decision.carType ?? "—";
  const timeframe = decision.purchaseTimeframe ?? "—";
  const stock = getStockForBudget(decision);

  return (
    <div style={{ padding: "26px 20px calc(24px + env(safe-area-inset-bottom))" }}>

      {/* Approved in principle stamp */}
      <div className="a-pop" style={{ marginBottom: 18 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--agreen)",
            color: "#fff",
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            padding: "9px 15px",
            borderRadius: 99,
          }}
        >
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden>
            <path
              d="M1 5l3.5 4L11 1"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Approved in principle
        </span>
      </div>

      {/* Headline */}
      <h1
        style={{
          fontSize: 34,
          fontWeight: 600,
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
          marginBottom: 10,
          color: "var(--aink)",
        }}
      >
        Good news{firstName ? `, ${firstName}` : ""}.
      </h1>

      <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--aink-soft)", marginBottom: 14 }}>
        A lender on our panel is happy to proceed based on your soft search. Nothing here
        has touched your credit score.
      </p>

      <div
        style={{
          marginBottom: 22,
          padding: "12px 14px",
          borderRadius: 14,
          border: "1.5px solid var(--aline)",
          background: "var(--agreen-wash, #f3f7f2)",
          fontSize: 13.5,
          lineHeight: 1.5,
          color: "var(--aink)",
        }}
      >
        <strong style={{ fontWeight: 600 }}>We&apos;re still working hard to improve your offer.</strong>{" "}
        These cars are a starting point — as we refine your options with lenders, your figures
        may get better.
      </div>

      {/* Budget summary card */}
      <div
        style={{
          borderRadius: 20,
          overflow: "hidden",
          margin: "0 0 18px",
          border: "1.5px solid var(--aline)",
        }}
      >
        {/* Dark top */}
        <div style={{ background: "var(--aink)", color: "#fff", padding: 22 }}>
          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)", marginBottom: 6 }}>Your budget</p>
          <p
            style={{
              fontWeight: 600,
              fontSize: 32,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            <span style={{ color: "var(--alime)" }}>{budget}</span>
            <span style={{ fontSize: 18, fontWeight: 400, color: "rgba(255,255,255,0.55)" }}> per month</span>
          </p>
        </div>

        {/* Details list */}
        <ul
          style={{
            listStyle: "none",
            padding: "6px 20px 16px",
            background: "#fff",
            margin: 0,
          }}
        >
          {[
            { label: "Deposit", value: deposit },
            { label: "Looking for", value: carType },
            { label: "Timeframe", value: timeframe },
            { label: "Status", value: "Approved in principle" },
          ].map(({ label, value }) => (
            <li
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 14,
                padding: "11px 0",
                borderBottom: "1px solid var(--aline)",
                fontSize: 14.5,
              }}
            >
              <span style={{ color: "var(--aink-soft)" }}>{label}</span>
              <span style={{ fontWeight: 600, textAlign: "right", color: "var(--aink)" }}>
                {value}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Matching stock */}
      {stock.length > 0 && (
        <>
          <p
            style={{
              fontWeight: 600,
              fontSize: 17,
              letterSpacing: "-0.015em",
              margin: "4px 0 12px",
              color: "var(--aink)",
            }}
          >
            {stock.length} in stock that fit
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {stock.map((vehicle) => (
              <Link
                key={vehicle.id}
                href={`/cars/${vehicle.id}`}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                  border: "1.5px solid var(--aline)",
                  borderRadius: 16,
                  padding: "13px 15px",
                  background: "#fff",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: 64,
                    height: 46,
                    borderRadius: 10,
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "var(--agreen-wash)",
                    position: "relative",
                  }}
                >
                  {vehicle.images[0] ? (
                    <Image
                      src={vehicle.images[0]}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="64px"
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <svg width="34" height="16" viewBox="0 0 26 12" fill="none">
                        <path
                          d="M2 9h22M4.5 9c0-3 2.2-5.5 5-5.5h4c1.6 0 3.1.7 4.1 1.9L19.4 7h2.1c1.4 0 2.5 1 2.5 2"
                          stroke="var(--agreen)"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="8" cy="9.6" r="1.9" fill="var(--agreen)" />
                        <circle cx="18.5" cy="9.6" r="1.9" fill="var(--agreen)" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong
                    style={{
                      display: "block",
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      color: "var(--aink)",
                    }}
                  >
                    {vehicle.make} {vehicle.model}
                  </strong>
                  <span style={{ fontSize: 12.5, color: "var(--aink-soft)" }}>
                    {vehicle.year} · {formatMileage(vehicle.mileage)}
                  </span>
                </div>

                {/* Price */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <strong
                    style={{
                      display: "block",
                      fontWeight: 600,
                      fontSize: 19,
                      letterSpacing: "-0.02em",
                      color: "var(--agreen)",
                    }}
                  >
                    {formatPrice(vehicle.monthlyHp)}
                  </strong>
                  <span style={{ fontSize: 11.5, color: "var(--aink-soft)" }}>per month</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* What happens next */}
      <div
        style={{
          background: "var(--agreen-wash)",
          borderRadius: 18,
          padding: "18px 20px",
          marginBottom: 16,
        }}
      >
        <h3
          style={{
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: "-0.015em",
            marginBottom: 10,
            color: "var(--aink)",
          }}
        >
          What happens next
        </h3>
        <ol
          style={{
            paddingLeft: 19,
            fontSize: 14.5,
            lineHeight: 1.6,
            color: "var(--aink-soft)",
            margin: 0,
          }}
        >
          {NEXT_STEPS.map((step) => (
            <li key={step} style={{ paddingBottom: 4 }}>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Representative example */}
      <div
        style={{
          border: "1.5px solid var(--aline)",
          borderRadius: "var(--aradius)",
          padding: "15px 16px",
          fontSize: 12.5,
          lineHeight: 1.6,
          color: "var(--aink-soft)",
          marginBottom: 20,
          background: "#fff",
        }}
      >
        <strong
          style={{
            display: "block",
            color: "var(--aink)",
            marginBottom: 6,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            fontSize: 11,
          }}
        >
          Representative example
        </strong>
        Borrowing £12,000 over 60 months at 12.9% APR representative. 60 monthly payments of
        £268.13. Total amount payable £16,087.80. Total cost of credit £4,087.80. Rate fixed.
        Approval in principle is subject to full underwriting, identity and income verification
        and the vehicle chosen. Hero Car Finance is a credit broker, not a lender. Vehicles and
        figures shown are illustrative only.
      </div>

      {/* CTAs */}
      <Link
        href="/cars"
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          fontSize: 17,
          fontWeight: 600,
          color: "#fff",
          background: "var(--agreen)",
          border: "none",
          borderRadius: 9999,
          padding: 17,
          boxShadow: "0 4px 14px rgba(91, 43, 212, 0.25)",
          textDecoration: "none",
          marginBottom: 9,
        }}
      >
        See all cars that fit {budget}
      </Link>

      <a
        href="tel:+441234567890"
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          fontSize: 16,
          fontWeight: 600,
          color: "var(--aink)",
          background: "#fff",
          border: "1.5px solid var(--aline-strong)",
          borderRadius: 9999,
          padding: 16,
          textDecoration: "none",
        }}
      >
        Speak to a finance specialist
      </a>
    </div>
  );
}
