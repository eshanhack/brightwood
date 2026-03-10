"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { Hammer, FileText, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const steps: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Hammer,
    title: "Build",
    description: "We build the power station",
  },
  {
    icon: FileText,
    title: "Contract",
    description: "15–25 year PPAs with hyperscalers",
  },
  {
    icon: TrendingUp,
    title: "Earn",
    description: "Contracted, inflation-linked revenue",
  },
];

export default function BusinessModelSection() {
  return (
    <section className="py-[80px] lg:py-[100px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            The Business Model
          </h2>
        </FadeIn>

        {/* Desktop: horizontal pipeline */}
        <FadeIn delay={0.15}>
          <div className="mt-12 hidden md:block">
            <div className="relative flex items-start justify-between max-w-3xl mx-auto">
              {/* Connecting line */}
              <div className="absolute top-[28px] left-[56px] right-[56px] h-[2px] bg-divider">
                {/* Animated dots */}
                <motion.div
                  className="absolute top-[-2px] w-1.5 h-1.5 rounded-full bg-olive"
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute top-[-2px] w-1.5 h-1.5 rounded-full bg-olive opacity-60"
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
                />
              </div>

              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center w-[180px] relative z-10">
                  <div className="w-14 h-14 rounded-full bg-olive flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-lg text-text-primary mb-1">
                    {step.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical pipeline */}
          <div className="mt-10 md:hidden">
            <div className="relative pl-10">
              {/* Vertical connecting line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-divider" />

              {steps.map((step, i) => (
                <div key={i} className={`relative flex items-start gap-5 ${i < steps.length - 1 ? "pb-10" : ""}`}>
                  <div className="w-10 h-10 rounded-full bg-olive flex items-center justify-center shrink-0 relative z-10 -ml-10">
                    <step.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-text-primary mb-1">
                      {step.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Callout box */}
        <FadeIn delay={0.3}>
          <div className="mt-10 p-6 bg-cream rounded-lg border border-divider max-w-2xl mx-auto text-center">
            <p className="text-text-secondary leading-[1.7] text-[15px]">
              Investment-grade customers. Take-or-pay revenue. Like a toll road
              for electricity.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
