"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ComparisonOption {
  title: string;
  icon: LucideIcon;
  color: "red" | "olive";
  items: string[];
  stat: string;
  statLabel: string;
}

interface ComparisonToggleProps {
  optionA: ComparisonOption;
  optionB: ComparisonOption;
  className?: string;
}

const colorMap = {
  red: {
    bg: "bg-red",
    tint: "bg-red-tint",
    text: "text-red",
    border: "border-red",
    dot: "bg-red/10",
    dotText: "text-red",
    statBg: "bg-white",
    statBorder: "border-red/20",
  },
  olive: {
    bg: "bg-olive",
    tint: "bg-olive-tint",
    text: "text-olive",
    border: "border-olive",
    dot: "bg-olive/10",
    dotText: "text-olive",
    statBg: "bg-white",
    statBorder: "border-olive/20",
  },
};

export default function ComparisonToggle({
  optionA,
  optionB,
  className = "",
}: ComparisonToggleProps) {
  const [activeIndex, setActiveIndex] = useState(1); // default to option B (Brightwood)
  const active = activeIndex === 0 ? optionA : optionB;
  const colors = colorMap[active.color];
  const direction = activeIndex === 0 ? -1 : 1;

  return (
    <div className={className}>
      {/* Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-white rounded-full p-1 border border-divider shadow-sm">
          {[optionA, optionB].map((opt, i) => {
            const isActive = activeIndex === i;
            const Icon = opt.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  isActive ? "text-white" : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="toggle-bg"
                    className={`absolute inset-0 rounded-full ${colorMap[opt.color].bg}`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  {opt.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: direction * 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -30 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`p-8 rounded-xl ${colors.tint} border ${colors.border}/20`}
        >
          <div className="flex items-center gap-2 mb-6">
            <active.icon className={`w-6 h-6 ${colors.text}`} strokeWidth={1.5} />
            <h3 className={`font-serif text-xl ${colors.text}`}>
              {active.title}
            </h3>
          </div>

          {/* Steps timeline */}
          <div className="space-y-3">
            {active.items.map((item, j) => (
              <div key={j}>
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-full ${colors.dot} flex items-center justify-center ${colors.dotText} text-sm font-medium shrink-0`}
                  >
                    {j + 1}
                  </span>
                  <span className="text-text-secondary text-[15px]">
                    {item}
                  </span>
                </div>
                {j < active.items.length - 1 && (
                  <div className={`ml-4 h-4 border-l-2 border-dashed ${colors.border}/30`} />
                )}
              </div>
            ))}
          </div>

          {/* Stat card */}
          <div
            className={`mt-6 p-4 ${colors.statBg} rounded-lg border ${colors.statBorder}`}
          >
            <p className={`${colors.text} font-serif text-2xl`}>
              {active.stat}
            </p>
            <p className="text-text-muted text-sm mt-1">
              {active.statLabel}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
