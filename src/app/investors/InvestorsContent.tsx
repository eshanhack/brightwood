"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const phases = [
  {
    phase: "Phase 1",
    timeline: "Months 0–18",
    capital: "$5–15M",
    milestones: [
      "Land options secured (3–5 sites)",
      "Planning approvals initiated",
      "Grid exemption applications",
      "PPA negotiations with hyperscalers",
      "Energy co-founder recruited",
    ],
  },
  {
    phase: "Phase 2",
    timeline: "Months 12–30",
    capital: "$430–530M (project finance)",
    milestones: [
      "First PPA signed",
      "Project finance closed (70–75% debt)",
      "Construction begins on Site 1",
      "100 MW solar + 200 MWh battery + 50 MW gas",
      "Institutional equity partner onboarded",
    ],
  },
  {
    phase: "Phase 3",
    timeline: "Months 24–48",
    capital: "$1.5–2B (portfolio finance)",
    milestones: [
      "Site 1 operational (100 MW)",
      "Sites 2 and 3 under construction",
      "Portfolio reaches 300–500 MW",
      "Platform operating model established",
      "Additional PPA contracts secured",
    ],
  },
  {
    phase: "Phase 4",
    timeline: "Months 36–72",
    capital: "$3–5B (portfolio)",
    milestones: [
      "Portfolio reaches 500 MW – 1 GW",
      "5–7 operating sites across regional QLD/NSW",
      "~$500M+ annual revenue",
      "Exit-ready or permanent hold",
      "Strategic options: IPO, trade sale, or infrastructure fund",
    ],
  },
];

const aiProofScenarios = [
  {
    scenario: "AI model efficiency improves 10x",
    impact:
      "Same chips run 10x more inference \u2192 same power draw, more useful compute",
    outcome: "Demand holds",
  },
  {
    scenario: "Nvidia releases more efficient chips",
    impact:
      "Operators fill the same racks with more powerful GPUs \u2192 same power per rack",
    outcome: "Demand holds",
  },
  {
    scenario: "AI bubble pops, demand slows",
    impact:
      "Cloud migration continues regardless. Enterprise workloads still need Australian compute.",
    outcome: "Demand slows but doesn\u2019t reverse",
  },
  {
    scenario: "Nuclear becomes viable in Australia",
    impact:
      "15\u201320 year build timeline. Data centres need power in 2\u20133 years, not 2040.",
    outcome: "No near-term impact",
  },
  {
    scenario: "Grid catches up",
    impact:
      "Brightwood PPAs are 15\u201320 year contracts with take-or-pay. Revenue is locked in.",
    outcome: "Contracted cash flows protected",
  },
];

export default function InvestorsContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-[140px] pb-[100px] lg:pt-[180px] lg:pb-[140px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[48px] md:text-[64px] lg:text-[76px] leading-[1.05] text-text-primary max-w-4xl"
          >
            Path to Scale
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-xl text-text-secondary max-w-2xl leading-relaxed"
          >
            From a single 100 MW project to a multi-gigawatt infrastructure
            portfolio within five to seven years.
          </motion.p>
        </div>
      </section>

      {/* Phase Timeline */}
      <section className="py-[100px] lg:py-[140px] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              Development Phases
            </h2>
          </FadeIn>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-6 bg-cream rounded-lg border-t-4 border-olive h-full flex flex-col card-hover">
                  <div className="mb-4">
                    <p className="font-serif text-xl text-olive">
                      {phase.phase}
                    </p>
                    <p className="text-sm text-text-muted mt-1">
                      {phase.timeline}
                    </p>
                    <p className="text-sm font-medium text-text-primary mt-1">
                      {phase.capital}
                    </p>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {phase.milestones.map((ms, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-text-secondary text-[14px] leading-snug"
                      >
                        <CheckCircle
                          className="w-4 h-4 text-olive shrink-0 mt-0.5"
                          strokeWidth={1.5}
                        />
                        {ms}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Proof Scenarios */}
      <section className="py-[100px] lg:py-[140px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              Why This Is AI-Proof
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-relaxed">
              Five scenarios that challenge the AI thesis — and why Brightwood is
              resilient to each.
            </p>
          </FadeIn>

          <div className="mt-14 space-y-4">
            {aiProofScenarios.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-6 bg-white rounded-lg grid md:grid-cols-3 gap-4 items-start">
                  <div>
                    <p className="font-medium text-text-primary text-[15px]">
                      {s.scenario}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-[15px] leading-relaxed">
                      {s.impact}
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-3 py-1 bg-olive-tint text-olive text-sm font-medium rounded-full">
                      {s.outcome}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-olive py-[100px] lg:py-[120px]">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-white">
              Interested in Learning More?
            </h2>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              We&apos;re building Australia&apos;s dedicated power
              infrastructure for the AI era. Get in touch to discuss the
              opportunity.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center mt-8 px-8 py-4 bg-white text-olive font-medium rounded-lg hover:bg-cream transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
