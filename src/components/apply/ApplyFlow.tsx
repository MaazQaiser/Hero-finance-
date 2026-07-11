"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ApplyBridgeScreen } from "@/components/apply/entry/ApplyBridgeScreen";
import { ApplyWelcomeScreen } from "@/components/apply/entry/ApplyWelcomeScreen";
import { ApplyLoadingScreen } from "@/components/apply/ApplyLoadingScreen";
import { ApplyNetworkError } from "@/components/apply/ApplyNetworkError";
import { ApplyProgressHeader } from "@/components/apply/ApplyProgressHeader";
import { ApplySessionTimeout } from "@/components/apply/ApplySessionTimeout";
import { ApplyStepContent } from "@/components/apply/ApplyStepContent";
import { ApplyStickyFooter } from "@/components/apply/ApplyStickyFooter";
import { ExitIntentModal } from "@/components/apply/ExitIntentModal";
import { ResumeLinkSent } from "@/components/apply/ResumeLinkSent";
import { SaveProgressModal } from "@/components/apply/SaveProgressModal";
import { stepMeta } from "@/lib/apply/stepMeta";
import { getStepReassurance } from "@/lib/apply/stepReassurance";
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
import { resolveLandingVariant } from "@/lib/landing/resolveVariant";
import { loadLandingCampaign, saveLandingCampaign } from "@/lib/landing/storage";

interface ApplyFlowProps {
  vehicleId?: string;
  resume?: boolean;
  sessionExpired?: boolean;
  simulateNetworkError?: boolean;
  campaign?: string;
}

type FlowPhase =
  | "welcome"
  | "qualifying"
  | "bridge"
  | "form"
  | "loading"
  | "session-expired"
  | "network-error"
  | "resume-sent";

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
}: ApplyFlowProps) {
  const router = useRouter();
  const networkRetried = useRef(false);

  const [landingVariant, setLandingVariant] = useState(() => resolveLandingVariant(campaign));

  useEffect(() => {
    if (campaign) {
      setLandingVariant(resolveLandingVariant(campaign));
      saveLandingCampaign(campaign);
      return;
    }

    const stored = loadLandingCampaign();
    setLandingVariant(resolveLandingVariant(stored));
  }, [campaign]);

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

  const preBridgeSteps = useMemo(() => getPreBridgeSteps(), []);
  const postBridgeSteps = useMemo(() => getPostBridgeSteps(data), [data]);
  const totalSteps = useMemo(() => getTotalStepCount(data), [data]);

  const currentQualifyingStepId = preBridgeSteps[qualifyingIndex] ?? "residential";
  const currentFormStepId = postBridgeSteps[formIndex] ?? "email";
  const currentStepId =
    phase === "qualifying" ? currentQualifyingStepId : phase === "form" ? currentFormStepId : "mobile";
  const meta = stepMeta[currentStepId];
  const isReview = currentFormStepId === "review";
  const isMobileStep = phase === "qualifying" && currentQualifyingStepId === "mobile";
  const showStickyFooter = phase === "form" || isMobileStep;
  const fieldErrors = useMemo(
    () => (phase === "form" || isMobileStep ? validateStep(currentStepId, data) : {}),
    [currentStepId, data, isMobileStep, phase],
  );
  const canContinue = phase === "form" || isMobileStep ? isStepComplete(currentStepId, data) : true;
  const stepReassurance = phase === "form" ? getStepReassurance(currentStepId) : null;

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
      setPhase("qualifying");
      return;
    }

    const postIndex = getPostBridgeSteps(saved.data).indexOf(stepId);
    if (postIndex >= 0) {
      setFormIndex(postIndex);
      setPhase("form");
    }
  }, [preBridgeSteps, resume]);

  useEffect(() => {
    if (phase !== "form") return;
    if (formIndex >= postBridgeSteps.length) {
      setFormIndex(Math.max(postBridgeSteps.length - 1, 0));
    }
  }, [formIndex, phase, postBridgeSteps.length]);

  useEffect(() => {
    if (data.mobile && !saveMobile) setSaveMobile(data.mobile);
  }, [data.mobile, saveMobile]);

  useEffect(() => {
    if (!["welcome", "qualifying", "bridge", "form"].includes(phase)) return;
    saveProgress(data, currentStepId);
  }, [currentStepId, data, phase]);

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
    }, 4000);
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

  const handleSaveClick = useCallback(() => {
    setSaveMobile(data.mobile || saveMobile);
    setSaveModalOpen(true);
  }, [data.mobile, saveMobile]);

  const sendResumeLink = useCallback(
    (mobile: string) => {
      setSendingResume(true);
      saveProgress({ ...data, mobile }, currentStepId);

      window.setTimeout(() => {
        setSendingResume(false);
        setSaveModalOpen(false);
        setExitOpen(false);
        setPhase("resume-sent");
      }, 800);
    },
    [currentStepId, data],
  );

  const handleSendFromSaveModal = useCallback(() => {
    sendResumeLink(saveMobile);
  }, [saveMobile, sendResumeLink]);

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
    setPhase("welcome");
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
      mobile={saveMobile}
      onMobileChange={setSaveMobile}
      onSendResume={handleSendFromSaveModal}
      onContinue={() => setSaveModalOpen(false)}
      sending={sendingResume}
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

  if (phase === "resume-sent") {
    return <ResumeLinkSent onContinue={() => setPhase("form")} />;
  }

  if (!entryResolved && resume) {
    return <div className="min-h-[100svh] bg-paper" aria-busy="true" />;
  }

  if (phase === "welcome") {
    return (
      <>
        <ApplyWelcomeScreen
          onContinue={handleContinueFromWelcome}
          onSaveLater={handleSaveClick}
          headline={landingVariant.applicationHeadline}
          body={landingVariant.applicationBody}
          ctaLabel={landingVariant.applicationCta}
          trustMessage={landingVariant.trustMessage}
        />
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
          />
          <ApplyBridgeScreen onContinue={handleContinueFromBridge} />
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
        />

        <main className={`mx-auto max-w-lg px-5 pt-6 ${phase === "form" ? "pb-44" : "pb-40"}`}>
          <p className="eyebrow">Finance application</p>
          <h1 className="mt-3 text-2xl font-medium text-ink md:text-3xl">{meta.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">{meta.helper}</p>

          {meta.encouragement && phase === "form" && formIndex > 0 && (
            <p className="mt-2 text-sm text-green-deep">{meta.encouragement}</p>
          )}

          <div className="mt-8">
            <ApplyStepContent
              stepId={currentStepId}
              data={data}
              onChange={updateData}
              onAutoAdvance={phase === "qualifying" ? handleAutoAdvance : undefined}
              fieldErrors={fieldErrors}
            />
          </div>
        </main>

        {showStickyFooter && (
          <ApplyStickyFooter
            onContinue={goNext}
            onSave={handleSaveClick}
            continueLabel={isReview ? "Check My Eligibility" : "Continue"}
            continueDisabled={!canContinue}
            reassurance={stepReassurance}
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
