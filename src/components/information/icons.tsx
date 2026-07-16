import type { ReactElement } from "react";
import { type InformationTopicId } from "@/config/informationPanelsContent";

function ShieldCheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11 4.6-.85 8-5.75 8-11V6l-8-4z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 11v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 11h4M6 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l7 3v6c0 4.5-2.9 8.7-7 9.5C7.9 20.7 5 16.5 5 12V6l7-3z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 7h11v8H3V7z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 10h4l2 3v2h-6v-5z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function GuaranteeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const topicIcons: Record<InformationTopicId, () => ReactElement> = {
  aaInspection: ShieldCheckIcon,
  batteryHealth: BatteryIcon,
  warranty: WarrantyIcon,
  freeDelivery: DeliveryIcon,
  moneyBackGuarantee: GuaranteeIcon,
};

export function InformationTopicIcon({ topic }: { topic: InformationTopicId }) {
  const Icon = topicIcons[topic];
  return <Icon />;
}
