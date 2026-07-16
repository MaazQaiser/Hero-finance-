"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ApplyBridgeScreen } from "@/components/apply/entry/ApplyBridgeScreen";
import { ApplyWelcomeScreen } from "@/components/apply/entry/ApplyWelcomeScreen";
import { ApplyLoadingScreen } from "@/components/apply/ApplyLoadingScreen";
import { ELIGIBILITY_LOADING_DURATION_MS } from "@/components/apply/loading/EligibilityLoading";
import { ApplyNetworkError } from "@/components/apply/ApplyNetworkError";
import { ApplyProgressHeader } from "@/components/apply/ApplyProgressHeader";
import { ApplySessionTimeout } from "@/components/apply/ApplySessionTimeout";
import { ApplyStepContent } from "@/components/apply/ApplyStepContent";
import { ApplyStickyFooter } from "@/components/apply/ApplyStickyFooter";
import { AmbientTrust } from "@/components/apply/AmbientTrust";
import { AnimatedPage } from "@/components/motion/AnimatedPage";
import { ExitIntentModal } from "@/components/apply/ExitIntentModal";
import { SaveProgressModal } from "@/components/apply/SaveProgressModal";
import { ResumeApplicationScreen } from "@/components/apply/save/ResumeApplicationScreen";
import { JourneyVariantProvider, useJourneyVariant } from "@/components/apply/JourneyVariantProvider";
import { VehicleJourneySummary } from "@/components/apply/VehicleJourneySummary";
import {
  applyJourneyDefaults,
  getJourneyBehaviour,
  getStepMetaForJourney,
} from "@/lib/journey/journeyBehaviour";
import { getVehicleById } from "@/data/vehicles";
import { mockSavedApplication } from "@/lib/apply/mockSaveProgress";
import { saveContinueContent } from "@/config/saveContinueContent";
import { stepMeta } from "@/lib/apply/stepMeta";
import { personalizeStepMeta } from "@/lib/apply/stepPersonalization";
import {
  getTrustMessageKeyForStep,
  getTrustMessage,
} from "@/config/trustMessages";
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
  getPostBridgeSteps,
  getPreBridgeSteps,
  getTotalStepCount,
  INTRO_SCREEN_COUNT,
  isAutoAdvanceStep,
  normalizeStepId,
} from "@/lib/apply/types";
import { generateDecision, saveDecision } from "@/lib/apply/decision";
import { isStepComplete, validateStep } from "@/lib/apply/validation";

interface ApplyFlowProps {
  vehicleId?: string;
  resume?: boolean;
  sessionExpired?: boolean;
  simulateNetworkError?: boolean;
  campaign?: string;
  variant?: string;
  source?: string;
}

type FlowPhase =
  | "welcome"
  | "qualifying"
  | "bridge"
  | "form"
  | "loading"
  | "session-expired"
  | "network-error"
  | "resume-sent"
  | "resume-hub";

function getPhaseForStep(stepId: StepId): FlowPhase {
  if (getPreBridgeSteps().includes(stepId)) return "qualifying";
  return "form";
}

function shouldSkipWelcome(resume: boolean, sessionExpired: boolean): boolean {
  if (sessionExpired) return true;
  if (!resume) return false;

  const saved = loadProgress();
  if (!saved) return false;

  const age = getProgressAgeMs();
  if (age !== null && age > SESSION_TIMEOUT_MS) return true;

  const stepId = normalizeStepId(saved.stepId);
  return Boolean(
    saved.data.mobile ||
      saved.data.residentialStatus ||
      saved.data.employmentStatus ||
      stepId !== "mobile",
  );
}

export function ApplyFlow({
  vehicleId,
  resume = false,
  sessionExpired = false,
  simulateNetworkError = false,
  campaign,
  variant,
  source,
}: ApplyFlowProps) {
  return (
    <JourneyVariantProvider
      campaign={campaign}
      variant={variant}
      vehicleId={vehicleId}
      source={source}
    >
      <ApplyFlowContent
        vehicleId={vehicleId}
        resume={resume}
        sessionExpired={sessionExpired}
        simulateNetworkError={simulateNetworkError}
      />
    </JourneyVariantProvider>
  );
}

function ApplyFlowContent({
  vehicleId,
  resume = false,
  sessionExpired = false,
  simulateNetworkError = false,
}: Omit<ApplyFlowProps, "campaign" | "variant" | "source">) {
  const router = useRouter();
  const networkRetried = useRef(false);
  const journey = useJourneyVariant();
  const behaviour = useMemo(() => getJourneyBehaviour(journey.id), [journey.id]);
  const journeyDefaultsApplied = useRef(false);

  const [data, setData] = useState<ApplicationData>(() =>
    mergeInitialData(vehicleId, resume),
  );
  const [phase, setPhase] = useState<FlowPhase>(() =>
    sessionExpired ? "session-expired" : "welcome",
  );
  const [qualifyingIndex, setQualifyingIndex] = useState(0);
  const [formIndex, setFormIndex] = useState(0);
  const [entryResolved, setEntryResolved] = useState(sessionExpired);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [saveMobile, setSaveMobile] = useState("");
  const [sendingResume, setSendingResume] = useState(false);
  const [backNotice, setBackNotice] = useState<string | null>(null);
  const backNoticeIndex = useRef(0);

  const preBridgeSteps = useMemo(() => getPreBridgeSteps(), []);
  const postBridgeSteps = useMemo(() => getPostBridgeSteps(data), [data]);
  const totalSteps = useMemo(() => getTotalStepCount(data), [data]);

  const currentQualifyingStepId = preBridgeSteps[qualifyingIndex] ?? "residential";
  const currentFormStepId = postBridgeSteps[formIndex] ?? "email";
  const currentStepId =
    phase === "qualifying" ? currentQualifyingStepId : phase === "form" ? currentFormStepId : "mobile";
  const meta = personalizeStepMeta(
    currentStepId,
    getStepMetaForJourney(currentStepId, behaviour, stepMeta[currentStepId]),
    data,
  );
  const summaryVehicle =
    behaviour.showVehicleSummary && data.vehicleId
      ? getVehicleById(data.vehicleId)
      : null;
  const isReview = currentFormStepId === "review";
  const isMobileStep = phase === "qualifying" && currentQualifyingStepId === "mobile";
  const showStickyFooter = phase === "form" || isMobileStep;
  const fieldErrors = useMemo(
    () =>
      phase === "qualifying" || phase === "form"
        ? validateStep(currentStepId, data)
        : {},
    [currentStepId, data, phase],
  );
  const canContinue = phase === "form" || isMobileStep ? isStepComplete(currentStepId, data) : true;
  const ambientTrustKey =
    phase === "qualifying" || phase === "form"
      ? getTrustMessageKeyForStep(currentStepId)
      : null;

  const progressStepNumber =
    phase === "qualifying"
      ? qualifyingIndex + 2
      : phase === "bridge"
        ? INTRO_SCREEN_COUNT
        : INTRO_SCREEN_COUNT + formIndex + 1;

  useEffect(() => {
    if (sessionExpired) {
      setEntryResolved(true);
      return;
    }

    if (resume) {
      const age = getProgressAgeMs();
      if (age !== null && age > SESSION_TIMEOUT_MS) {
        setPhase("session-expired");
        setEntryResolved(true);
        return;
      }

      // Design prototype: land on the resume hub before jumping back into steps
      setPhase("resume-hub");
      setEntryResolved(true);
      return;
    }

    if (shouldSkipWelcome(resume, sessionExpired)) {
      const saved = loadProgress();
      if (saved) {
        const stepId = normalizeStepId(saved.stepId);
        const nextPhase = getPhaseForStep(stepId);
        const preIndex = preBridgeSteps.indexOf(stepId);
        const postIndex = getPostBridgeSteps(saved.data).indexOf(stepId);

        if (preIndex >= 0) {
          setQualifyingIndex(preIndex);
          setPhase("qualifying");
        } else if (postIndex >= 0) {
          setFormIndex(postIndex);
          setPhase("form");
        } else {
          setPhase(nextPhase);
        }
      } else {
        setPhase("qualifying");
      }
    }

    setEntryResolved(true);
  }, [preBridgeSteps, resume, sessionExpired]);

  useEffect(() => {
    if (!resume) return;
    const saved = loadProgress();
    if (!saved) return;

    const stepId = normalizeStepId(saved.stepId);
    setData((current) => ({ ...current, ...saved.data }));
    setSaveMobile(saved.data.mobile || "");

    const preIndex = preBridgeSteps.indexOf(stepId);
    if (preIndex >= 0) {
      setQualifyingIndex(preIndex);
    }

    const postIndex = getPostBridgeSteps(saved.data).indexOf(stepId);
    if (postIndex >= 0) {
      setFormIndex(postIndex);
    }
  }, [preBridgeSteps, resume]);

  useEffect(() => {
    if (phase !== "form") return;
    if (formIndex >= postBridgeSteps.length) {
      setFormIndex(Math.max(postBridgeSteps.length - 1, 0));
    }
  }, [formIndex, phase, postBridgeSteps.length]);

  useEffect(() => {
    if (journeyDefaultsApplied.current) return;
    journeyDefaultsApplied.current = true;
    setData((current) => applyJourneyDefaults(current, behaviour));
  }, [behaviour]);

  useEffect(() => {
    if (data.mobile && !saveMobile) setSaveMobile(data.mobile);
  }, [data.mobile, saveMobile]);

  useEffect(() => {
    if (!["welcome", "qualifying", "bridge", "form"].includes(phase)) return;
    saveProgress(data, currentStepId);
  }, [currentStepId, data, phase]);

  useEffect(() => {
    if (!["welcome", "qualifying", "bridge", "form"].includes(phase)) return;
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStepId, phase]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!["welcome", "qualifying", "bridge", "form"].includes(phase)) return;
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [phase]);

  const updateData = useCallback((updates: Partial<ApplicationData>) => {
    setData((current) => ({ ...current, ...updates }));
  }, []);

  const goBack = useCallback(() => {
    const messages = saveContinueContent.backNavigation;
    setBackNotice(messages[backNoticeIndex.current % messages.length]);
    backNoticeIndex.current += 1;

    if (phase === "form") {
      if (formIndex === 0) {
        setPhase("bridge");
        return;
      }
      setFormIndex((index) => Math.max(index - 1, 0));
      return;
    }

    if (phase === "bridge") {
      setPhase("qualifying");
      setQualifyingIndex(preBridgeSteps.length - 1);
      return;
    }

    if (phase === "qualifying") {
      if (qualifyingIndex === 0) {
        setPhase("welcome");
        return;
      }
      setQualifyingIndex((index) => Math.max(index - 1, 0));
    }
  }, [formIndex, phase, preBridgeSteps.length, qualifyingIndex]);

  const submitApplication = useCallback(() => {
    setPhase("loading");

    window.setTimeout(() => {
      const decision = generateDecision(data);
      saveDecision(decision);
      clearProgress();
      router.push(`/apply/decision?state=${decision.state}`);
    }, ELIGIBILITY_LOADING_DURATION_MS);
  }, [data, router]);

  const goNextQualifying = useCallback(() => {
    if (qualifyingIndex < preBridgeSteps.length - 1) {
      setQualifyingIndex((index) => index + 1);
      return;
    }

    setPhase("bridge");
  }, [preBridgeSteps.length, qualifyingIndex]);

  const goNextForm = useCallback(() => {
    if (!isStepComplete(currentFormStepId, data)) return;

    if (isReview) {
      if (simulateNetworkError && !networkRetried.current) {
        networkRetried.current = true;
        setPhase("network-error");
        return;
      }

      submitApplication();
      return;
    }

    setFormIndex((index) => Math.min(index + 1, postBridgeSteps.length - 1));
  }, [currentFormStepId, data, isReview, postBridgeSteps.length, simulateNetworkError, submitApplication]);

  const goNext = useCallback(() => {
    setBackNotice(null);

    if (phase === "qualifying") {
      if (isMobileStep && !isStepComplete("mobile", data)) return;
      goNextQualifying();
      return;
    }

    if (phase === "form") {
      goNextForm();
    }
  }, [data, goNextForm, goNextQualifying, isMobileStep, phase]);

  const handleAutoAdvance = useCallback(() => {
    if (phase !== "qualifying" || !isAutoAdvanceStep(currentQualifyingStepId)) return;
    window.setTimeout(() => goNextQualifying(), 280);
  }, [currentQualifyingStepId, goNextQualifying, phase]);

  useEffect(() => {
    if (!backNotice) return;
    const timer = window.setTimeout(() => setBackNotice(null), 4000);
    return () => window.clearTimeout(timer);
  }, [backNotice]);

  const handleSaveClick = useCallback(() => {
    saveProgress(data, currentStepId);
    setSaveModalOpen(true);
  }, [currentStepId, data]);

  const sendResumeLink = useCallback(
    (mobile: string) => {
      setSendingResume(true);
      saveProgress({ ...data, mobile }, currentStepId);

      window.setTimeout(() => {
        setSendingResume(false);
        setSaveModalOpen(false);
        setExitOpen(false);
        setPhase("resume-hub");
      }, 800);
    },
    [currentStepId, data],
  );

  const handleContinueLater = useCallback(() => {
    saveProgress(data, currentStepId);
    setSaveModalOpen(false);
    setPhase("resume-hub");
  }, [currentStepId, data]);

  const handleReturnToApplication = useCallback(() => {
    setSaveModalOpen(false);
  }, []);

  const handleSendFromExit = useCallback(() => {
    sendResumeLink(data.mobile || saveMobile);
  }, [data.mobile, saveMobile, sendResumeLink]);

  const handleResumeFromTimeout = useCallback(() => {
    const saved = loadProgress();
    if (saved) {
      const stepId = normalizeStepId(saved.stepId);
      setData((current) => ({ ...current, ...saved.data }));
      const preIndex = preBridgeSteps.indexOf(stepId);
      const postIndex = getPostBridgeSteps(saved.data).indexOf(stepId);
      if (preIndex >= 0) {
        setQualifyingIndex(preIndex);
        setPhase("qualifying");
        return;
      }
      if (postIndex >= 0) {
        setFormIndex(postIndex);
        setPhase("form");
        return;
      }
    }
    // Prototype fallback when no real progress exists
    setPhase("form");
    setFormIndex(0);
  }, [preBridgeSteps]);

  const handleStartAgain = useCallback(() => {
    clearProgress();
    setData(mergeInitialData(vehicleId, false));
    setQualifyingIndex(0);
    setFormIndex(0);
    setPhase("welcome");
  }, [vehicleId]);

  const handleContinueFromWelcome = useCallback(() => {
    setPhase("qualifying");
    setQualifyingIndex(0);
  }, []);

  const handleContinueFromBridge = useCallback(() => {
    setPhase("form");
    setFormIndex(0);
  }, []);

  const handleNetworkRetry = useCallback(() => {
    setPhase("form");
    submitApplication();
  }, [submitApplication]);

  const saveModal = (
    <SaveProgressModal
      open={saveModalOpen}
      onContinueLater={handleContinueLater}
      onReturnToApplication={handleReturnToApplication}
    />
  );

  if (phase === "loading") {
    return <ApplyLoadingScreen />;
  }

  if (phase === "session-expired") {
    return (
      <ApplySessionTimeout onResume={handleResumeFromTimeout} onStartAgain={handleStartAgain} />
    );
  }

  if (phase === "network-error") {
    return <ApplyNetworkError onRetry={handleNetworkRetry} />;
  }

  if (phase === "resume-sent" || phase === "resume-hub") {
    return (
      <ResumeApplicationScreen
        saved={mockSavedApplication}
        onResume={handleResumeFromTimeout}
        onStartAgain={handleStartAgain}
        onStartNew={handleStartAgain}
      />
    );
  }

  if (!entryResolved && resume) {
    return <div className="min-h-[100svh] bg-paper" aria-busy="true" />;
  }

  if (phase === "welcome") {
    return (
      <>
        <AnimatedPage pageKey="welcome">
          <ApplyWelcomeScreen
            onContinue={handleContinueFromWelcome}
            onSaveLater={handleSaveClick}
            vehicleId={vehicleId}
          />
        </AnimatedPage>
        {saveModal}
      </>
    );
  }

  if (phase === "bridge") {
    return (
      <>
        <div className="min-h-[100svh] bg-paper">
          <ApplyProgressHeader
            stepNumber={INTRO_SCREEN_COUNT}
            totalSteps={totalSteps}
            onBack={goBack}
            canGoBack
            backNotice={backNotice}
          />
          <AnimatedPage pageKey="bridge">
            <ApplyBridgeScreen onContinue={handleContinueFromBridge} vehicleId={vehicleId} />
          </AnimatedPage>
        </div>
        {saveModal}
      </>
    );
  }

  if (phase === "qualifying" || phase === "form") {
    return (
      <div className="min-h-[100svh] bg-paper">
        <ApplyProgressHeader
          stepNumber={progressStepNumber}
          totalSteps={totalSteps}
          onBack={goBack}
          canGoBack
          backNotice={backNotice}
        />

        <main className={`mx-auto max-w-lg px-5 pt-6 ${phase === "form" ? "pb-44" : "pb-40"}`}>
          <AnimatedPage pageKey={`${phase}-${currentStepId}`}>
            <p className="eyebrow">Finance application</p>
            <h1 className="mt-3 text-2xl font-medium text-ink md:text-3xl">{meta.title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">{meta.helper}</p>

            {meta.encouragement && phase === "form" && formIndex > 0 && (
              <p className="mt-2 text-sm text-green-deep">{meta.encouragement}</p>
            )}

            {summaryVehicle ? <VehicleJourneySummary vehicle={summaryVehicle} /> : null}

            <div className="mt-8">
              <ApplyStepContent
                stepId={currentStepId}
                data={data}
                onChange={updateData}
                onAutoAdvance={phase === "qualifying" ? handleAutoAdvance : undefined}
                fieldErrors={fieldErrors}
                behaviour={behaviour}
              />
            </div>

            {ambientTrustKey && !showStickyFooter && (
              <div className="mt-10">
                <AmbientTrust message={getTrustMessage(ambientTrustKey)} />
              </div>
            )}
          </AnimatedPage>
        </main>

        {showStickyFooter && (
          <ApplyStickyFooter
            onContinue={goNext}
            onSave={handleSaveClick}
            continueLabel={isReview ? "Check My Eligibility" : "Continue"}
            continueDisabled={!canContinue}
            trustKey={ambientTrustKey}
          />
        )}

        {saveModal}

        <ExitIntentModal
          open={exitOpen}
          onSendResume={handleSendFromExit}
          onContinue={() => setExitOpen(false)}
          onLeave={() => router.push("/")}
          sending={sendingResume}
        />
      </div>
    );
  }

  return null;
}
