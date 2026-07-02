"use client";

import { useEffect, useRef } from "react";

const TRUSTPILOT_BUSINESS_UNIT_ID = "67c81d7411f3ffaeab0a5f1b";
const TRUSTPILOT_PROFILE_URL = "https://uk.trustpilot.com/review/herocarfinance.com";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement | null, force?: boolean) => void;
    };
  }
}

function loadTrustpilotWidget(element: HTMLElement | null) {
  if (!element) return;

  if (window.Trustpilot) {
    window.Trustpilot.loadFromElement(element, true);
    return;
  }

  const existing = document.querySelector<HTMLScriptElement>(
    'script[src*="widget.trustpilot.com/bootstrap"]',
  );

  if (existing) {
    existing.addEventListener("load", () => window.Trustpilot?.loadFromElement(element, true), {
      once: true,
    });
    return;
  }

  const script = document.createElement("script");
  script.src = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
  script.async = true;
  script.onload = () => window.Trustpilot?.loadFromElement(element, true);
  document.head.appendChild(script);
}

export function TrustpilotWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadTrustpilotWidget(widgetRef.current);
  }, []);

  return (
    <div
      ref={widgetRef}
      className="trustpilot-widget text-base font-normal"
      data-locale="en-GB"
      data-template-id="5419b6a8b0d04a076446a9ad"
      data-businessunit-id={TRUSTPILOT_BUSINESS_UNIT_ID}
      data-style-height="24px"
      data-style-width="100%"
      data-theme="light"
    >
      <a href={TRUSTPILOT_PROFILE_URL} target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  );
}
