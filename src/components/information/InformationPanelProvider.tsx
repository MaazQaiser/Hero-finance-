"use client";

import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { BottomSheet } from "@/components/information/BottomSheet";
import { InformationPanel } from "@/components/information/InformationPanel";
import { InformationTopicIcon } from "@/components/information/icons";
import {
  getInformationPanelContent,
  type InformationTopicId,
} from "@/config/informationPanelsContent";

interface InformationPanelContextValue {
  openPanel: (topic: InformationTopicId) => void;
  closePanel: () => void;
  activeTopic: InformationTopicId | null;
}

const InformationPanelContext = createContext<InformationPanelContextValue | null>(null);

export function InformationPanelProvider({ children }: { children: ReactNode }) {
  const [activeTopic, setActiveTopic] = useState<InformationTopicId | null>(null);

  const openPanel = useCallback((topic: InformationTopicId) => {
    setActiveTopic(topic);
  }, []);

  const closePanel = useCallback(() => {
    setActiveTopic(null);
  }, []);

  const value = useMemo(
    () => ({ openPanel, closePanel, activeTopic }),
    [openPanel, closePanel, activeTopic],
  );

  const content = activeTopic ? getInformationPanelContent(activeTopic) : null;

  return (
    <InformationPanelContext.Provider value={value}>
      {children}
      <BottomSheet
        open={activeTopic !== null}
        onClose={closePanel}
        labelledBy="information-panel-title"
      >
        {content ? (
          <InformationPanel
            title={content.title}
            icon={<InformationTopicIcon topic={content.id} />}
            description={content.description}
            benefits={content.benefits}
            exclusions={content.exclusions}
            exclusionsTitle={content.exclusionsTitle}
            cta={
              content.cta
                ? {
                    label: content.cta.label,
                    href: content.cta.href,
                    onClick: content.cta.href ? undefined : closePanel,
                  }
                : undefined
            }
            onClose={closePanel}
          />
        ) : null}
      </BottomSheet>
    </InformationPanelContext.Provider>
  );
}

export function useInformationPanel() {
  const context = useContext(InformationPanelContext);
  if (!context) {
    throw new Error("useInformationPanel must be used within InformationPanelProvider");
  }
  return context;
}
