"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import {
  Search,
  PenTool,
  Hammer,
  Cable,
  Settings,
  CheckCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Customer-focused business model section.
 * Interactive 5-step journey with auto-advance and click navigation.
 */

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: Search,
    title: "Discover",
    description:
      "You need reliable, affordable power for your data centre — but the grid queue is 3–5 years long.",
  },
  {
    icon: PenTool,
    title: "Design",
    description:
      "We design a dedicated solar + battery + gas power plant sized to your specific load and redundancy requirements.",
  },
  {
    icon: Hammer,
    title: "Build",
    description:
      "Construction on secured Queensland land in 12–18 months — no grid approvals, no transmission upgrades.",
  },
  {
    icon: Cable,
    title: "Connect",
    description:
      "Direct behind-the-meter connection to your data centre. No grid queue. Power flows from day one.",
  },
  {
    icon: Settings,
    title: "Operate",
    description:
      "We maintain and operate the plant 24/7. You get guaranteed power for 15–25 years under a fixed-price PPA.",
  },
];

const benefits = [
  "99.99% uptime guarantee",
  "Fixed-price power from ~$110/MWh",
  "No grid queue",
  "No capital outlay on generation",
  "15–25 year contract flexibility",
];

export default function BusinessModelSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  /* Auto-advance every 4s (pauses on user interaction) */
  useEffect(() => {
    if (!inView || isPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [inView, isPaused]);

  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index);
    setIsPaused(true);
    /* Resume auto-advance after 10s of inactivity */
    setTimeout(() => setIsPaused(false), 10000);
  }, []);

  return (
    <section className="py-[80px] lg:py-[100px] bg-white" ref={ref}>
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-olive font-medium text-sm tracking-wide uppercase mb-3">
            Your Journey
          </p>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            How We Work With You
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-[1.7]">
            From first conversation to guaranteed power — here&apos;s the
            customer experience.
          </p>
        </FadeIn>

        {/* ── Desktop: Horizontal stepper ── */}
        <div className="hidden md:block mt-14">
          {/* Step indicators */}
          <div className="relative">
            {/* Background progress line */}
            <div className="absolute top-5 left-[8%] right-[8%] h-[3px] bg-divider rounded-full" />
            {/* Active progress line */}
            <motion.div
              className="absolute top-5 left-[8%] h-[3px] bg-olive rounded-full origin-left"
              animate={{ width: `${(activeStep / (steps.length - 1)) * 84}%` }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            />

            <div className="relative grid grid-cols-5 gap-2">
              {steps.map((step, i) => {
                const isActive = i === activeStep;
                const isCompleted = i < activeStep;

                return (
                  <button
                    key={i}
                    onClick={() => handleStepClick(i)}
                    className="flex flex-col items-center text-center group cursor-pointer pt-0"
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        backgroundColor: isActive
                          ? "#5C6F2D"
                          : isCompleted
                          ? "#8BA04A"
                          : "#E8E5E1",
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center relative z-10"
                    >
                      <step.icon
                        size={16}
                        className={
                          isActive || isCompleted
                            ? "text-white"
                            : "text-text-muted"
                        }
                        strokeWidth={1.5}
                      />
                    </motion.div>
                    <p
                      className={`mt-2.5 text-[13px] font-semibold transition-colors ${
                        isActive
                          ? "text-olive"
                          : isCompleted
                          ? "text-olive/70"
                          : "text-text-muted group-hover:text-text-secondary"
                      }`}
                    >
                      {step.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Expanded content for active step */}
          <div className="mt-8 min-h-[100px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-olive-tint rounded-xl border border-olive/10 max-w-2xl mx-auto text-center"
              >
                <p className="text-text-primary text-[15px] leading-[1.7]">
                  <span className="font-semibold text-olive">
                    Step {activeStep + 1}: {steps[activeStep].title}
                  </span>
                  <span className="mx-2 text-divider">—</span>
                  {steps[activeStep].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile: Vertical stepper ── */}
        <div className="md:hidden mt-10">
          <div className="relative pl-10">
            {/* Vertical line */}
            <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-divider" />
            <motion.div
              className="absolute left-[15px] top-0 w-[2px] bg-olive origin-top"
              animate={{
                height: `${(activeStep / (steps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />

            <div className="space-y-6">
              {steps.map((step, i) => {
                const isActive = i === activeStep;
                const isCompleted = i < activeStep;

                return (
                  <button
                    key={i}
                    onClick={() => handleStepClick(i)}
                    className="relative flex items-start gap-4 text-left w-full cursor-pointer"
                  >
                    <motion.div
                      animate={{
                        backgroundColor: isActive
                          ? "#5C6F2D"
                          : isCompleted
                          ? "#8BA04A"
                          : "#E8E5E1",
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 absolute -left-10 z-10"
                    >
                      <step.icon
                        size={14}
                        className={
                          isActive || isCompleted
                            ? "text-white"
                            : "text-text-muted"
                        }
                        strokeWidth={1.5}
                      />
                    </motion.div>
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          isActive ? "text-olive" : "text-text-primary"
                        }`}
                      >
                        {step.title}
                      </p>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-text-secondary text-[13px] mt-1 leading-[1.6] overflow-hidden"
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Benefits row ── */}
        <FadeIn delay={0.3}>
          <div className="mt-10 p-5 bg-cream rounded-xl border border-divider">
            <p className="text-text-primary font-semibold text-[14px] mb-3">
              What you get:
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-olive shrink-0" />
                  <p className="text-text-secondary text-[13px]">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
