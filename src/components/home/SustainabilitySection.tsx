"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FadeIn from "@/components/FadeIn";

/**
 * Sustainability section with animated circular progress rings.
 * Dark olive background for visual contrast.
 */

interface RingProps {
  value: number;
  label: string;
  sublabel: string;
  displayValue: string;
  delay: number;
  inView: boolean;
}

function ProgressRing({ value, label, sublabel, displayValue, delay, inView }: RingProps) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-[140px] h-[140px]">
        {/* Background ring */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="white"
            strokeWidth="6"
            opacity="0.12"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-white font-serif text-[26px]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.5 }}
          >
            {displayValue}
          </motion.span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
        className="mt-5"
      >
        <p className="text-white font-semibold text-[15px]">{label}</p>
        <p className="text-white/60 text-[13px] mt-1.5 leading-[1.5] max-w-[200px]">{sublabel}</p>
      </motion.div>
    </div>
  );
}

const pillars = [
  {
    value: 100,
    displayValue: "100%",
    label: "Renewable Target",
    sublabel: "Glide path from gas backup to fully renewable generation",
  },
  {
    value: 75,
    displayValue: "<1.2",
    label: "PUE Target",
    sublabel: "Industry-leading power usage effectiveness for tropical climate",
  },
  {
    value: 100,
    displayValue: "Net 0",
    label: "Water Impact",
    sublabel: "Dry-cooled systems designed for Queensland conditions",
  },
];

export default function SustainabilitySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="bg-olive py-[80px] lg:py-[100px]" ref={ref}>
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-olive-light font-medium text-sm tracking-wide uppercase text-center mb-3">
            Sustainability
          </p>
          <h2 className="font-serif text-[36px] md:text-[44px] text-white text-center">
            Built for the Long Term
          </h2>
        </FadeIn>

        <div className="mt-14 grid md:grid-cols-3 gap-12 md:gap-8">
          {pillars.map((pillar, i) => (
            <ProgressRing
              key={i}
              value={pillar.value}
              displayValue={pillar.displayValue}
              label={pillar.label}
              sublabel={pillar.sublabel}
              delay={i * 0.2}
              inView={inView}
            />
          ))}
        </div>

        <FadeIn delay={0.6}>
          <p className="mt-14 text-center text-white/50 text-sm max-w-xl mx-auto leading-[1.6]">
            Brightwood&apos;s sustainability roadmap aligns with Australia&apos;s 2030
            renewable energy target — building clean power infrastructure that
            supports the energy transition, not competes with it.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
