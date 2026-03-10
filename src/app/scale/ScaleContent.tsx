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

const valuationScenarios = [
  {
    scenario: "500 MW Portfolio",
    revenue: "~$455M",
    ebitda: "~$295M",
    valuationRange: "$4.2–6.6B",
    multiple: "14–22x EBITDA",
  },
  {
    scenario: "1 GW Portfolio",
    revenue: "~$910M",
    ebitda: "~$591M",
    valuationRange: "$8.4–13.2B",
    multiple: "14–22x EBITDA",
  },
];

const aiProofScenarios = [
  {
    scenario: "AI model efficiency improves 10x",
    impact: "Same chips run 10x more inference → same power draw, more useful compute",
    outcome: "Demand holds",
  },
  {
    scenario: "Nvidia releases more efficient chips",
    impact: "Operators fill the same racks with more powerful GPUs → same power per rack",
    outcome: "Demand holds",
  },
  {
    scenario: "AI bubble pops, demand slows",
    impact: "Cloud migration continues regardless. Enterprise workloads still need Australian compute.",
    outcome: "Demand slows but doesn't reverse",
  },
  {
    scenario: "Nuclear becomes viable in Australia",
    impact: "15–20 year build timeline. Data centres need power in 2–3 years, not 2040.",
    outcome: "No near-term impact",
  },
  {
    scenario: "Grid catches up",
    impact: "Brightwood PPAs are 15–20 year contracts with take-or-pay. Revenue is locked in.",
    outcome: "Contracted cash flows protected",
  },
];

const exitBuyers = [
  "Macquarie",
  "IFM Investors",
  "AustralianSuper",
  "Brookfield",
  "Blackstone",
  "CPP Investments",
  "GIC",
  "Temasek",
];

export default function ScaleContent() {
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
            $5–15M in development capital today. A multi-billion dollar
            infrastructure portfolio within five to seven years.
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
                <div className="p-6 bg-cream rounded-lg border-t-4 border-olive h-full flex flex-col">
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

      {/* Valuation Scenarios */}
      <section className="py-[100px] lg:py-[140px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              Valuation Scenarios
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-relaxed">
              Based on comparable infrastructure transactions and contracted
              cash flow multiples.
            </p>
          </FadeIn>

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {valuationScenarios.map((scenario, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="p-8 bg-white rounded-lg border border-divider">
                  <h3 className="font-serif text-2xl text-text-primary mb-6">
                    {scenario.scenario}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline border-b border-divider pb-3">
                      <span className="text-text-secondary">
                        Annual Revenue
                      </span>
                      <span className="font-medium text-text-primary">
                        {scenario.revenue}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-divider pb-3">
                      <span className="text-text-secondary">EBITDA</span>
                      <span className="font-medium text-text-primary">
                        {scenario.ebitda}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-divider pb-3">
                      <span className="text-text-secondary">Multiple</span>
                      <span className="font-medium text-text-primary">
                        {scenario.multiple}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline pt-1">
                      <span className="text-text-secondary font-medium">
                        Valuation
                      </span>
                      <span className="font-serif text-[28px] text-olive">
                        {scenario.valuationRange}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* AirTrunk Comparable */}
          <FadeIn delay={0.3}>
            <div className="mt-10 p-8 bg-olive-tint rounded-lg border-l-4 border-olive">
              <h3 className="font-serif text-xl text-text-primary mb-3">
                The AirTrunk Comparable
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Founded Sydney 2015. Acquired by Blackstone for AUD $24B in
                2024. 800 MW capacity. ~$600M EBITDA. ~40x multiple. Nine
                years from founding to one of the largest infrastructure
                transactions in Australian history.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* AI-Proof Scenarios */}
      <section className="py-[100px] lg:py-[140px] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              Why This Is AI-Proof
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-relaxed">
              Five scenarios that challenge the AI thesis — and why Brightwood
              is resilient to each.
            </p>
          </FadeIn>

          <div className="mt-14 space-y-4">
            {aiProofScenarios.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-6 bg-cream rounded-lg grid md:grid-cols-3 gap-4 items-start">
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

      {/* Exit Buyers */}
      <section className="py-[100px] lg:py-[140px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              Natural Exit Buyers
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-relaxed">
              The world&apos;s largest infrastructure investors are actively
              seeking contracted, long-duration energy assets.
            </p>
          </FadeIn>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {exitBuyers.map((buyer, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="p-6 bg-white rounded-lg border border-divider text-center">
                  <span className="text-lg font-medium text-text-primary">
                    {buyer}
                  </span>
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
              The Opportunity
            </h2>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Raising $5–15M AUD in development capital. The window to establish
              position is 18–24 months.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center mt-8 px-8 py-4 bg-white text-olive font-medium rounded-[7px] hover:bg-cream transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
