"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  SECTIONS,
  getV2Steps,
  getJourneyProgress,
  PART_EXCHANGE_SECTION_INDEX,
  type V2StepMeta,
} from "@/lib/apply/sections";
import { ApplyBrandBar } from "@/components/apply/shell/ApplyBrandBar";
import { SectionRail } from "@/components/apply/shell/SectionRail";
import { SectionArrival } from "@/components/apply/shell/SectionArrival";
import { ApplyStepContent } from "@/components/apply/ApplyStepContent";
import { ApplySessionTimeout } from "@/components/apply/ApplySessionTimeout";
import { ApplyNetworkError } from "@/components/apply/ApplyNetworkError";
import { SaveProgressModal } from "@/components/apply/SaveProgressModal";
import { ResumeApplicationScreen } from "@/components/apply/save/ResumeApplicationScreen";
import { ReviewTrustChecklist } from "@/components/apply/ApplyReviewSummary";
import { mockSavedApplication } from "@/lib/apply/mockSaveProgress";
import {
  clearProgress,
  getProgressAgeMs,
  loadProgress,
  mergeInitialData,
  saveProgress,
  SESSION_TIMEOUT_MS,
} from "@/lib/apply/storage";
import {
  type ApplicationData,
  type StepId,
  normalizeStepId,
} from "@/lib/apply/types";
import { generateDecision, saveDecision } from "@/lib/apply/decision";
import { isStepComplete, validateStep } from "@/lib/apply/validation";

const LOADING_DURATION_MS = 2100;

type FlowPhase = "flow" | "loading" | "session-expired" | "network-error" | "resume-hub";

interface ApplyFlowProps {
  resume?: boolean;
  sessionExpired?: boolean;
  simulateNetworkError?: boolean;
  vehicleId?: string;
  campaign?: string;
  variant?: string;
  source?: string;
}

export function ApplyFlow({
  resume = false,
  sessionExpired = false,
  simulateNetworkError = false,
}: ApplyFlowProps) {
  const router = useRouter();
  const networkRetried = useRef(false);
  const [data, setData] = useState<ApplicationData>(() => mergeInitialData(undefined, resume));
  const dataRef = useRef(data);
  dataRef.current = data;
  const [stepIndex, setStepIndex] = useState(0);
  const [maxStepIndex, setMaxStepIndex] = useState(0);
  const [phase, setPhase] = useState<FlowPhase>(() =>
    sessionExpired ? "session-expired" : "flow",
  );
  const [arrivalSection, setArrivalSection] = useState<number | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [goingBack, setGoingBack] = useState(false);
  const [returnStepId, setReturnStepId] = useState<string | null>(null);

  const steps = useMemo(() => getV2Steps(data), [data]);
  const safeIndex = Math.min(stepIndex, Math.max(steps.length - 1, 0));
  const currentStep: V2StepMeta = steps[safeIndex] ?? steps[0];
  const journeyProgress = getJourneyProgress(steps, safeIndex);
  const fillProgress = getJourneyProgress(steps, safeIndex, Math.max(safeIndex, maxStepIndex));
  const { sectionIndex } = journeyProgress;
  const currentSection = SECTIONS[sectionIndex];
  const isChoice = currentStep?.stepType === "choice";
  const isReviewSubmit = currentStep?.id === "consent";
  const showSaveLater = sectionIndex >= 2 && sectionIndex !== PART_EXCHANGE_SECTION_INDEX;
  const reassuranceText = isReviewSubmit
    ? undefined
    : (currentStep?.assure ?? currentSection?.assure);

  useEffect(() => {
    setMaxStepIndex((prev) => Math.max(prev, safeIndex));
  }, [safeIndex]);

  const fieldErrors = useMemo(
    () => (currentStep ? validateStep(currentStep.id, data) : {}),
    [currentStep, data],
  );
  const canContinue = currentStep ? isStepComplete(currentStep.id, data) : false;

  // Clamp stepIndex if step list shrinks due to conditional logic
  useEffect(() => {
    if (stepIndex >= steps.length && steps.length > 0) {
      setStepIndex(steps.length - 1);
    }
  }, [steps.length, stepIndex]);

  // Resume progress hydration
  useEffect(() => {
    if (!resume) return;
    const age = getProgressAgeMs();
    if (age !== null && age > SESSION_TIMEOUT_MS) {
      setPhase("session-expired");
      return;
    }
    const saved = loadProgress();
    if (!saved) return;

    setData((cur) => ({ ...cur, ...saved.data }));
    const merged = { ...data, ...saved.data };
    const savedStepId = normalizeStepId(saved.stepId);
    const rebuiltSteps = getV2Steps(merged);
    const idx = rebuiltSteps.findIndex((s) => s.id === savedStepId);
    if (idx >= 0) {
      setStepIndex(idx);
      setMaxStepIndex(idx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume]);

  // Scroll to top on step change
  useEffect(() => {
    if (phase !== "flow") return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [safeIndex, phase]);

  // Auto-save
  useEffect(() => {
    if (phase !== "flow" || !currentStep) return;
    saveProgress(data, currentStep.id as StepId);
  }, [currentStep, data, phase]);

  // Prevent accidental navigation away
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (phase !== "flow") return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [phase]);

  const flashSaved = useCallback(() => {
    setSavedFlash(true);
    const t = window.setTimeout(() => setSavedFlash(false), 2200);
    return () => window.clearTimeout(t);
  }, []);

  const updateData = useCallback((updates: Partial<ApplicationData>) => {
    setData((cur) => ({ ...cur, ...updates }));
  }, []);

  const submitApplication = useCallback(() => {
    setPhase("loading");
    window.setTimeout(() => {
      const decision = generateDecision(dataRef.current);
      saveDecision(decision);
      clearProgress();
      router.push(`/apply/decision?state=${decision.state}`);
    }, LOADING_DURATION_MS);
  }, [router]);

  const goToStep = useCallback(
    (stepId: string) => {
      const nextSteps = getV2Steps(dataRef.current);
      const idx = nextSteps.findIndex((s) => s.id === stepId);
      if (idx >= 0) {
        // Editing from a review screen should return there after Continue
        if (currentStep?.id === "consent" || currentStep?.id === "ja-review") {
          setReturnStepId(currentStep.id);
        }
        setGoingBack(true);
        setStepIndex(idx);
      }
    },
    [currentStep?.id],
  );

  const goNext = useCallback(() => {
    if (!currentStep) return;
    if (!isChoice && !canContinue) return;

    flashSaved();
    const latestData = dataRef.current;
    saveProgress(latestData, currentStep.id as StepId);

    const latestSteps = getV2Steps(latestData);

    // After editing a field from a review screen, jump straight back
    if (returnStepId) {
      const reviewIdx = latestSteps.findIndex((s) => s.id === returnStepId);
      if (reviewIdx >= 0) {
        setReturnStepId(null);
        setGoingBack(false);
        setStepIndex(reviewIdx);
        return;
      }
      setReturnStepId(null);
    }

    const currentIdx = latestSteps.findIndex((s) => s.id === currentStep.id);
    const nextIndex = (currentIdx >= 0 ? currentIdx : safeIndex) + 1;

    if (nextIndex >= latestSteps.length) {
      if (simulateNetworkError && !networkRetried.current) {
        networkRetried.current = true;
        setPhase("network-error");
        return;
      }
      submitApplication();
      return;
    }

    const nextSec = latestSteps[nextIndex].sectionIndex;
    setGoingBack(false);
    setStepIndex(nextIndex);

    if (nextSec > sectionIndex) {
      setArrivalSection(nextSec);
    }
  }, [
    currentStep, isChoice, canContinue, flashSaved, safeIndex,
    sectionIndex, simulateNetworkError, submitApplication, returnStepId,
  ]);

  const goBack = useCallback(() => {
    if (safeIndex === 0) return;
    setReturnStepId(null);
    setGoingBack(true);
    setArrivalSection(null);
    setStepIndex(safeIndex - 1);
  }, [safeIndex]);

  const handleAutoAdvance = useCallback(() => {
    window.setTimeout(() => goNext(), 260);
  }, [goNext]);

  const handleSaveClick = useCallback(() => {
    if (currentStep) saveProgress(data, currentStep.id as StepId);
    setSaveModalOpen(true);
  }, [currentStep, data]);

  const handleResumeFromTimeout = useCallback(() => {
    const saved = loadProgress();
    if (saved) {
      setData((cur) => ({ ...cur, ...saved.data }));
      const rebuiltSteps = getV2Steps({ ...data, ...saved.data });
      const idx = rebuiltSteps.findIndex((s) => s.id === normalizeStepId(saved.stepId));
      const nextIndex = idx >= 0 ? idx : 0;
      setStepIndex(nextIndex);
      setMaxStepIndex(nextIndex);
    } else {
      setStepIndex(0);
      setMaxStepIndex(0);
    }
    setPhase("flow");
  }, [data]);

  const handleStartAgain = useCallback(() => {
    clearProgress();
    setData(mergeInitialData(undefined, false));
    setStepIndex(0);
    setMaxStepIndex(0);
    setArrivalSection(null);
    setGoingBack(false);
    setPhase("flow");
  }, []);

  // ── Infrastructure screens ──────────────────────────────────────────────

  if (phase === "loading") {
    const loadingProgress = getJourneyProgress(steps, steps.length - 1, steps.length - 1, {
      loadingMode: true,
    });
    return (
      <div className="apply-shell-outer">
        <div className="apply-shell">
          <div className="sticky top-0 z-40 bg-white">
            <ApplyBrandBar savedFlash={false} />
            <SectionRail
              sectionIndex={loadingProgress.sectionIndex}
              segmentPct={loadingProgress.segmentPct}
              sectionName={loadingProgress.sectionName}
              timeRemainingLabel={loadingProgress.timeRemainingLabel}
              loadingMode
              sticky
            />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "90px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "3px solid var(--aline)",
                borderTopColor: "var(--agreen)",
                marginBottom: 20,
              }}
              className="a-spinner"
            />
            <p style={{ fontSize: 15, color: "var(--aink-soft)" }}>
              Running your soft search across our lender panel…
            </p>
          </div>
          <style>{`
            .a-spinner { animation: a-spin 0.8s linear infinite; }
            @keyframes a-spin { to { transform: rotate(360deg); } }
          `}</style>
        </div>
      </div>
    );
  }

  if (phase === "session-expired") {
    return (
      <ApplySessionTimeout
        onResume={handleResumeFromTimeout}
        onStartAgain={handleStartAgain}
      />
    );
  }

  if (phase === "network-error") {
    return (
      <ApplyNetworkError onRetry={() => { setPhase("flow"); submitApplication(); }} />
    );
  }

  if (phase === "resume-hub") {
    return (
      <ResumeApplicationScreen
        saved={mockSavedApplication}
        onResume={handleResumeFromTimeout}
        onStartAgain={handleStartAgain}
        onStartNew={handleStartAgain}
      />
    );
  }

  if (!currentStep) return null;

  const tone = currentSection?.tone ?? "warm";

  return (
    <div className="apply-shell-outer">
      <div className="apply-shell">
        <div className="sticky top-0 z-40 bg-white">
          <ApplyBrandBar savedFlash={savedFlash} />
          <SectionRail
            sectionIndex={fillProgress.sectionIndex}
            segmentPct={fillProgress.segmentPct}
            sectionName={journeyProgress.sectionName}
            timeRemainingLabel={journeyProgress.timeRemainingLabel}
            sticky
          />
        </div>

        {/* Scrollable stage */}
        <main
          key={currentStep.id}
          className={goingBack ? "a-slideback" : "a-slidein"}
          style={{
            flex: 1,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            padding: "22px 20px 8px",
          }}
        >
          <h1
            style={{
              fontWeight: 600,
              letterSpacing: "-0.027em",
              lineHeight: 1.12,
              marginBottom: 8,
              fontSize: tone === "warm" ? 33 : 26,
              color: "var(--aink)",
            }}
          >
            {currentStep.id === "employer" && data.employmentStatusFull === "self-employed"
              ? "Tell us about your business."
              : currentStep.title}
          </h1>

          {currentStep.help && (
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.45,
                color: "var(--aink-soft)",
                marginBottom: 22,
              }}
            >
              {currentStep.help}
            </p>
          )}

          <div style={{ marginTop: currentStep.help ? 0 : 22 }}>
            <ApplyStepContent
              key={currentStep.id}
              stepId={currentStep.id}
              data={data}
              onChange={updateData}
              onAutoAdvance={isChoice ? handleAutoAdvance : undefined}
              onGoToStep={goToStep}
              fieldErrors={fieldErrors}
            />
          </div>
        </main>

        {/* Footer — always rendered; CTA hidden for choice steps */}
        <footer
          style={{
            padding: "12px 20px calc(16px + env(safe-area-inset-bottom))",
            background: "transparent",
            flexShrink: 0,
          }}
        >
          {/* Shield + trust line — shown on every step */}
          {reassuranceText && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                justifyContent: "center",
                fontSize: 12.5,
                color: "var(--aink-soft)",
                marginBottom: 11,
                textAlign: "center",
                lineHeight: 1.35,
              }}
            >
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
                <path
                  d="M7 1L1 3.5v4.2C1 11.3 3.6 14.4 7 15c3.4-.6 6-3.7 6-7.3V3.5L7 1z"
                  stroke="var(--agreen)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              {reassuranceText}
            </div>
          )}

          {/* Primary — Continue / Submit */}
          {!isChoice && (
            <button
              type="button"
              className="a-cta"
              onClick={goNext}
              disabled={!canContinue}
            >
              {currentStep.id === "px-complete"
                ? "Continue to Review"
                : isReviewSubmit
                  ? "Submit"
                  : "Continue"}
            </button>
          )}

          {isReviewSubmit ? <ReviewTrustChecklist /> : null}

          {/* Secondary — Back */}
          {safeIndex > 0 && (
            <button
              type="button"
              onClick={goBack}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                width: "100%",
                marginTop: isChoice ? 4 : 10,
                minHeight: 44,
                padding: "10px 16px",
                border: "1.5px solid var(--aline)",
                borderRadius: 9999,
                background: "transparent",
                fontFamily: "inherit",
                fontSize: 15,
                fontWeight: 600,
                color: "var(--aink)",
                cursor: "pointer",
                transition: "background 0.15s, border-color 0.15s",
              }}
            >
              <span aria-hidden>←</span> Back
            </button>
          )}

          {/* Tertiary — Save & continue later */}
          {showSaveLater && (
            <div style={{ marginTop: 14, textAlign: "center" }}>
              <button
                type="button"
                onClick={handleSaveClick}
                style={{
                  border: "none",
                  background: "transparent",
                  padding: "6px 8px",
                  fontFamily: "inherit",
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "var(--aink-soft)",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  textDecorationColor: "rgba(110,106,124,0.45)",
                }}
              >
                Save &amp; continue later
              </button>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 12,
                  lineHeight: 1.4,
                  color: "var(--aink-soft)",
                  opacity: 0.9,
                }}
              >
                We&apos;ll text you a secure link so you can continue where you left off.
              </p>
            </div>
          )}
        </footer>

        {/* Section arrival overlay */}
        {arrivalSection !== null && SECTIONS[arrivalSection] && (
          <SectionArrival
            section={SECTIONS[arrivalSection]}
            sectionIndex={arrivalSection}
            onDone={() => setArrivalSection(null)}
          />
        )}

        {/* Save later modal */}
        <SaveProgressModal
          open={saveModalOpen}
          onContinueLater={() => { setSaveModalOpen(false); setPhase("resume-hub"); }}
          onReturnToApplication={() => setSaveModalOpen(false)}
        />
      </div>
    </div>
  );
}
