"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { CheckCircle, MapPin, Zap, Ruler } from "lucide-react";

/**
 * Project pipeline / milestone timeline section.
 * Shows construction progress with animated drawing timeline.
 */

const milestones = [
  { label: "Site Secured", date: "Q1 2025", status: "complete" as const },
  { label: "DA Submitted", date: "Q3 2025", status: "complete" as const },
  { label: "Construction Begins", date: "Q1 2026", status: "active" as const },
  { label: "Grid-Independent", date: "Q3 2026", status: "planned" as const },
  { label: "First Power", date: "Q1 2027", status: "planned" as const },
];

function MilestoneNode({
  milestone,
  index,
  inView,
}: {
  milestone: (typeof milestones)[0];
  index: number;
  inView: boolean;
}) {
  const isComplete = milestone.status === "complete";
  const isActive = milestone.status === "active";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.12 }}
      className="flex flex-col items-center text-center relative z-10"
    >
      {/* Node circle */}
      <div className="relative">
        {isComplete && (
          <div className="w-10 h-10 rounded-full bg-olive flex items-center justify-center">
            <CheckCircle size={18} className="text-white" />
          </div>
        )}
        {isActive && (
          <div className="w-10 h-10 rounded-full bg-amber border-[3px] border-amber/30 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-3 h-3 rounded-full bg-white"
            />
          </div>
        )}
        {!isComplete && !isActive && (
          <div className="w-10 h-10 rounded-full border-2 border-divider bg-white flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-divider" />
          </div>
        )}
      </div>

      {/* Label */}
      <p
        className={`mt-3 text-[13px] font-semibold leading-tight ${
          isComplete
            ? "text-olive"
            : isActive
            ? "text-amber"
            : "text-text-muted"
        }`}
      >
        {milestone.label}
      </p>
      <p className="text-[11px] text-text-muted mt-1">{milestone.date}</p>
    </motion.div>
  );
}

export default function ProjectPipelineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-[80px] lg:py-[100px] bg-white" ref={ref}>
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-olive font-medium text-sm tracking-wide uppercase mb-3">
            Project Pipeline
          </p>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            From Site to First Power
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-[1.7]">
            Brightwood&apos;s first facility is underway in Queensland. Here&apos;s
            where we are.
          </p>
        </FadeIn>

        {/* ── Desktop Timeline ── */}
        <div className="hidden md:block mt-14">
          <div className="relative">
            {/* Progress line */}
            <div className="absolute top-5 left-[10%] right-[10%] h-[2px] bg-divider" />
            <motion.div
              className="absolute top-5 left-[10%] h-[2px] bg-olive origin-left"
              initial={{ width: 0 }}
              animate={inView ? { width: "35%" } : { width: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            />

            {/* Milestone nodes */}
            <div className="relative grid grid-cols-5 gap-4">
              {milestones.map((ms, i) => (
                <MilestoneNode
                  key={i}
                  milestone={ms}
                  index={i}
                  inView={inView}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile Timeline (vertical) ── */}
        <div className="md:hidden mt-10">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-divider" />
            <motion.div
              className="absolute left-[19px] top-0 w-[2px] bg-olive origin-top"
              initial={{ height: 0 }}
              animate={inView ? { height: "40%" } : { height: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />

            <div className="space-y-8">
              {milestones.map((ms, i) => {
                const isComplete = ms.status === "complete";
                const isActive = ms.status === "active";

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-4 relative"
                  >
                    <div className="absolute left-[-12px]">
                      {isComplete && (
                        <div className="w-8 h-8 rounded-full bg-olive flex items-center justify-center">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                      )}
                      {isActive && (
                        <div className="w-8 h-8 rounded-full bg-amber flex items-center justify-center">
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-2.5 h-2.5 rounded-full bg-white"
                          />
                        </div>
                      )}
                      {!isComplete && !isActive && (
                        <div className="w-8 h-8 rounded-full border-2 border-divider bg-white flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-divider" />
                        </div>
                      )}
                    </div>
                    <div className="ml-6">
                      <p
                        className={`text-sm font-semibold ${
                          isComplete ? "text-olive" : isActive ? "text-amber" : "text-text-muted"
                        }`}
                      >
                        {ms.label}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">{ms.date}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Project Card ── */}
        <FadeIn delay={0.4}>
          <div className="mt-14 p-6 lg:p-8 bg-cream rounded-xl border border-divider">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-serif text-[22px] text-text-primary">
                    Site Alpha — Queensland
                  </h3>
                  <span className="px-3 py-1 text-xs font-semibold bg-amber/10 text-amber rounded-full border border-amber/20">
                    In Development
                  </span>
                </div>
                <p className="text-text-secondary text-[15px] leading-[1.6] max-w-lg">
                  Regional Queensland location with direct gas pipeline access, premium
                  solar irradiance, and abundant water supply for cooling.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <Zap size={18} className="text-olive mx-auto mb-1.5" />
                  <p className="font-serif text-[20px] text-text-primary">200 MW</p>
                  <p className="text-xs text-text-muted">Solar capacity</p>
                </div>
                <div className="text-center">
                  <Ruler size={18} className="text-olive mx-auto mb-1.5" />
                  <p className="font-serif text-[20px] text-text-primary">500+ ha</p>
                  <p className="text-xs text-text-muted">Land area</p>
                </div>
                <div className="text-center">
                  <MapPin size={18} className="text-olive mx-auto mb-1.5" />
                  <p className="font-serif text-[20px] text-text-primary">QLD</p>
                  <p className="text-xs text-text-muted">Region</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
