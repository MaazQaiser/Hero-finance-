"use client";

import {
  getInformationPanelContent,
  type InformationTopicId,
} from "@/config/informationPanelsContent";
import { useInformationPanel } from "@/components/information/InformationPanelProvider";

interface InformationTriggerProps {
  topic: InformationTopicId;
  variant?: "icon" | "learn-more";
  label?: string;
  className?: string;
}

export function InformationTrigger({
  topic,
  variant = "icon",
  label,
  className = "",
}: InformationTriggerProps) {
  const { openPanel } = useInformationPanel();
  const panelTitle = getInformationPanelContent(topic).title;

  if (variant === "learn-more") {
    return (
      <button
        type="button"
        onClick={() => openPanel(topic)}
        className={`text-xs font-medium text-green-deep underline-offset-2 hover:underline ${className}`}
      >
        {label ?? "Learn more"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => openPanel(topic)}
      aria-label={`More information about ${panelTitle}`}
      className={`motion-button inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-[11px] font-semibold leading-none text-muted transition-colors hover:border-green/30 hover:bg-green/5 hover:text-green-deep ${className}`}
    >
      ⓘ
    </button>
  );
}
