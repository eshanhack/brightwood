"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon?: LucideIcon;
  content: ReactNode;
}

interface TabPanelProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  /** Controlled mode: pass to sync with external state */
  activeTab?: string;
  /** Controlled mode: fires when user clicks/keys a tab */
  onTabChange?: (id: string) => void;
  /** Unique layoutId prefix to avoid conflicts when multiple TabPanels are on-screen */
  layoutId?: string;
}

export default function TabPanel({
  tabs,
  defaultTab,
  className = "",
  activeTab: controlledTab,
  onTabChange,
  layoutId = "tab-underline",
}: TabPanelProps) {
  const [internalTab, setInternalTab] = useState(defaultTab || tabs[0]?.id);
  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = (id: string) => {
    if (onTabChange) onTabChange(id);
    else setInternalTab(id);
  };
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = tabs.findIndex((t) => t.id === activeTab);
      let newIndex = currentIndex;

      if (e.key === "ArrowRight") {
        newIndex = (currentIndex + 1) % tabs.length;
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        e.preventDefault();
      }

      if (newIndex !== currentIndex) {
        setActiveTab(tabs[newIndex].id);
        const buttons = tabListRef.current?.querySelectorAll("[role='tab']");
        (buttons?.[newIndex] as HTMLElement)?.focus();
      }
    },
    [activeTab, tabs]
  );

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={className}>
      {/* Tab buttons */}
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Content tabs"
        className="flex gap-1 overflow-x-auto scrollbar-none border-b border-divider"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                isActive ? "text-olive" : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {tab.icon && (
                <tab.icon className="w-4 h-4" strokeWidth={1.5} />
              )}
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId={layoutId}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-olive rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {activeContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
