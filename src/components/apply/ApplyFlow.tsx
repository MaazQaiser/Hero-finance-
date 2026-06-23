"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  clearProgress,
  getProgressAgeMs,
  loadProgress,
  mergeInitialData,
  saveProgress,
  SESSION_TIMEOUT_MS,
} from "@/lib/apply/storage";
import { type ApplicationData, getActiveSteps } from "@/lib/apply/types";
import { generateDecision, saveDecision } from "@/lib/apply/decision";

interface ApplyFlowProps {
  vehicleId?: string;
  resume?: boolean;
  sessionExpired?: boolean;
  simulateNetworkError?: boolean;
}

type FlowPhase = "form" | "loading" | "session-expired" | "network-error" | "resume-sent";

export function ApplyFlow({
  vehicleId,
  resume = false,
  sessionExpired = false,
  simulateNetworkError = false,
}: ApplyFlowProps) {
  const router = useRouter();
  const networkRetried = useRef(false);

  const [data, setData] = useState<ApplicationData>(() =>
    mergeInitialData(vehicleId, resume),
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<FlowPhase>(() => {
    if (sessionExpired) return "session-expired";
    if (!sessionExpired && resume) {
      const age = getProgressAgeMs();
      if (age !== null && age > SESSION_TIMEOUT_MS) return "session-expired";
    }
    return "form";
  });
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [saveMobile, setSaveMobile] = useState("");
  const [sendingResume, setSendingResume] = useState(false);

  const steps = useMemo(() => getActiveSteps(data), [data]);
  const currentStepId = steps[stepIndex] ?? "basic-details";
  const meta = stepMeta[currentStepId];
  const isReview = currentStepId === "review";

  useEffect(() => {
    if (!resume) return;
    const saved = loadProgress();
    if (!saved) return;

    setData((current) => ({ ...current, ...saved.data }));
    setSaveMobile(saved.data.mobile || "");
    const savedIndex = getActiveSteps(saved.data).indexOf(saved.stepId);
    if (savedIndex >= 0) setStepIndex(savedIndex);
  }, [resume]);

  useEffect(() => {
    if (data.mobile && !saveMobile) setSaveMobile(data.mobile);
  }, [data.mobile, saveMobile]);

  useEffect(() => {
    if (phase !== "form") return;
    saveProgress(data, currentStepId);
  }, [data, currentStepId, phase]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (phase !== "form") return;
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
    if (stepIndex === 0) {
      setExitOpen(true);
      return;
    }

    setStepIndex((index) => Math.max(index - 1, 0));
  }, [stepIndex]);

  const submitApplication = useCallback(() => {
    setPhase("loading");

    window.setTimeout(() => {
      const decision = generateDecision(data);
      saveDecision(decision);
      clearProgress();
      router.push(`/apply/decision?state=${decision.state}`);
    }, 4000);
  }, [data, router]);

  const goNext = useCallback(() => {
    if (isReview) {
      if (simulateNetworkError && !networkRetried.current) {
        networkRetried.current = true;
        setPhase("network-error");
        return;
      }

      submitApplication();
      return;
    }

    const nextSteps = getActiveSteps(data);
    setStepIndex((index) => Math.min(index + 1, nextSteps.length - 1));
  }, [data, isReview, simulateNetworkError, submitApplication]);

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
    [data, currentStepId],
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
      setData((current) => ({ ...current, ...saved.data }));
      const savedIndex = getActiveSteps(saved.data).indexOf(saved.stepId);
      if (savedIndex >= 0) setStepIndex(savedIndex);
    }
    setPhase("form");
  }, []);

  const handleStartAgain = useCallback(() => {
    clearProgress();
    setData(mergeInitialData(vehicleId, false));
    setStepIndex(0);
    setPhase("form");
  }, [vehicleId]);

  const handleNetworkRetry = useCallback(() => {
    setPhase("form");
    submitApplication();
  }, [submitApplication]);

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

  return (
    <>
      <ApplyProgressHeader
        stepNumber={stepIndex + 1}
        totalSteps={steps.length}
        onBack={goBack}
        canGoBack
      />

      <main className="mx-auto max-w-lg px-5 pb-40 pt-6">
        <p className="eyebrow">Finance application</p>
        <h1 className="mt-3 text-2xl font-medium text-cream md:text-3xl">{meta.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-cream-muted">{meta.helper}</p>

        {meta.encouragement && stepIndex > 0 && (
          <p className="mt-2 text-sm text-coral">{meta.encouragement}</p>
        )}

        <div className="mt-8">
          <ApplyStepContent stepId={currentStepId} data={data} onChange={updateData} />
        </div>

        {stepIndex > 0 && stepIndex % 3 === 0 && (
          <p className="mt-8 rounded-2xl border border-cream/10 bg-surface/50 px-4 py-3 text-center text-xs text-cream-muted">
            Soft search only · FCA regulated · Your data is secure
          </p>
        )}
      </main>

      <ApplyStickyFooter
        onContinue={goNext}
        onSave={handleSaveClick}
        continueLabel={isReview ? "Check My Eligibility" : "Continue"}
      />

      <SaveProgressModal
        open={saveModalOpen}
        mobile={saveMobile}
        onMobileChange={setSaveMobile}
        onSendResume={handleSendFromSaveModal}
        onContinue={() => setSaveModalOpen(false)}
        sending={sendingResume}
      />

      <ExitIntentModal
        open={exitOpen}
        onSendResume={handleSendFromExit}
        onContinue={() => setExitOpen(false)}
        onLeave={() => router.push("/")}
        sending={sendingResume}
      />
    </>
  );
}
