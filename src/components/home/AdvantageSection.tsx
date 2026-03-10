"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import {
  Grid3X3,
  Zap,
  Sun,
  MapPin,
  Fuel,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Advantage section with integrated toggle.
 * Grid Connection → shows metro grid downsides
 * Brightwood → shows Queensland advantages
 */

/* ── Toggle option data ── */
interface PathStep {
  text: string;
}

interface ToggleOption {
  title: string;
  icon: LucideIcon;
  color: "red" | "olive";
  steps: PathStep[];
  stat: string;
  statLabel: string;
}

const gridOption: ToggleOption = {
  title: "Grid Connection",
  icon: Grid3X3,
  color: "red",
  steps: [
    { text: "Apply for grid connection (12+ months)" },
    { text: "Environmental & planning approvals" },
    { text: "Transmission upgrades & grid works" },
    { text: "NEM registration & compliance" },
    { text: "Commission & energise" },
  ],
  stat: "$120–200+/MWh",
  statLabel: "Grid retail price — if you can get connected at all",
};

const brightwoodOption: ToggleOption = {
  title: "Brightwood",
  icon: Zap,
  color: "olive",
  steps: [
    { text: "Site secured with power & fibre access" },
    { text: "Solar + battery + gas built behind-the-meter" },
    { text: "Commission & deliver power" },
  ],
  stat: "~$110/MWh in 18–24 months",
  statLabel: "Faster, cheaper, 100% clean energy included",
};

/* ── Grid problem cities ── */
const gridProblems = [
  {
    city: "Sydney",
    problem: "Grid congested, 5+ year queue. Transgrid capacity maxed out for new large loads.",
    icon: AlertTriangle,
  },
  {
    city: "Melbourne",
    problem: "Land costs 10× regional rates. Water restrictions. CitiPower network constraints.",
    icon: AlertTriangle,
  },
  {
    city: "Other Metros",
    problem: "Adelaide & Perth have limited interconnection and smaller market pools for firming.",
    icon: AlertTriangle,
  },
];

/* ── QLD advantages ── */
const qldAdvantages = [
  {
    icon: Sun,
    value: "Best Solar",
    label: "Australia's highest irradiance — 20–30% more generation per panel",
  },
  {
    icon: MapPin,
    value: "Cheap Land",
    label: "Cleared pastoral land with minimal planning friction",
  },
  {
    icon: Fuel,
    value: "Gas Access",
    label: "Extensive Surat Basin pipeline network for transitional firming",
  },
];

export default function AdvantageSection() {
  const [isGridSelected, setIsGridSelected] = useState(false);
  const active = isGridSelected ? gridOption : brightwoodOption;
  const colorMap = {
    red: {
      bg: "bg-red-tint",
      border: "border-red/20",
      text: "text-red",
      statBg: "bg-red/10",
    },
    olive: {
      bg: "bg-olive-tint",
      border: "border-olive/20",
      text: "text-olive",
      statBg: "bg-olive/10",
    },
  };
  const colors = colorMap[active.color];

  return (
    <section className="py-[80px] lg:py-[100px] bg-olive-tint">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            Faster &amp; Cheaper Than the Grid
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-[1.7]">
            Behind-the-meter power eliminates the grid bottleneck entirely.
          </p>
        </FadeIn>

        {/* Toggle pill */}
        <FadeIn delay={0.1}>
          <div className="mt-10 flex justify-center sm:justify-start">
            <div className="inline-flex bg-white rounded-full p-1 border border-divider shadow-sm">
              <button
                onClick={() => setIsGridSelected(true)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  isGridSelected ? "text-white" : "text-text-muted"
                }`}
              >
                {isGridSelected && (
                  <motion.div
                    layoutId="advantage-toggle-bg"
                    className="absolute inset-0 bg-red rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Grid3X3 size={14} />
                  Grid Connection
                </span>
              </button>
              <button
                onClick={() => setIsGridSelected(false)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  !isGridSelected ? "text-white" : "text-text-muted"
                }`}
              >
                {!isGridSelected && (
                  <motion.div
                    layoutId="advantage-toggle-bg"
                    className="absolute inset-0 bg-olive rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Zap size={14} />
                  Brightwood
                </span>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Comparison content */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.title}
              initial={{ opacity: 0, x: isGridSelected ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isGridSelected ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className={`p-6 lg:p-8 rounded-xl ${colors.bg} border ${colors.border}`}
            >
              <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-start">
                {/* Steps */}
                <div>
                  <h3 className={`font-serif text-xl ${colors.text} mb-4`}>
                    {active.title} Path
                  </h3>
                  <div className="space-y-3">
                    {active.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                            active.color === "red"
                              ? "bg-red/15 text-red"
                              : "bg-olive/15 text-olive"
                          }`}
                        >
                          {i + 1}
                        </div>
                        <p className="text-text-primary text-[15px]">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stat card */}
                <div
                  className={`p-5 rounded-lg ${colors.statBg} text-center min-w-[200px]`}
                >
                  <p className={`font-serif text-[28px] ${colors.text} leading-tight`}>
                    {active.stat}
                  </p>
                  <p className="text-text-muted text-[13px] mt-2 max-w-[180px] mx-auto">
                    {active.statLabel}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Conditional bottom section: Grid Problems OR QLD Advantages */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {isGridSelected ? (
              <motion.div
                key="grid-problems"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="font-serif text-xl text-text-primary mb-4">
                  Why Metro Grids Are Full
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {gridProblems.map((item, i) => (
                    <div
                      key={i}
                      className="p-5 bg-red-tint rounded-lg border border-red/15 flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-red/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-red" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary text-[15px]">
                          {item.city}
                        </p>
                        <p className="text-text-muted text-sm mt-0.5 leading-relaxed">
                          {item.problem}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="qld-advantages"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="font-serif text-xl text-text-primary mb-4">
                  Why Queensland
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {qldAdvantages.map((stat, i) => (
                    <div
                      key={i}
                      className="p-5 bg-white rounded-lg border border-divider flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-olive/10 flex items-center justify-center shrink-0">
                        <stat.icon
                          className="w-5 h-5 text-olive"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary text-[15px]">
                          {stat.value}
                        </p>
                        <p className="text-text-muted text-sm mt-0.5 leading-relaxed">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <FadeIn delay={0.3}>
          <Link
            href="/opportunity"
            className="inline-flex items-center gap-1.5 mt-8 text-olive font-medium text-sm hover:underline"
          >
            Explore the full opportunity
            <ArrowRight size={14} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
