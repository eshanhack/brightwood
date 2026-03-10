"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import SourcesPanel from "@/components/SourcesPanel";
import Link from "next/link";
import { Sun, Battery, Flame, CheckCircle, Droplets, Leaf, Grid3X3, Zap } from "lucide-react";
import ComparisonToggle from "@/components/ComparisonToggle";

const techSpecs = [
  {
    icon: Sun,
    title: "Solar Generation",
    role: "Primary Generation",
    capacity: "150–200 MW",
    cost: "$200–270M",
    borderColor: "border-amber",
    details: [
      "Utility-scale bifacial solar panels on single-axis trackers",
      "Generates 300–400 GWh annually in regional Queensland",
      "Lowest-cost generation source at $30–40/MWh LCOE",
      "20–30% higher yield than European equivalents due to superior irradiance",
      "25-year design life with <0.5% annual degradation",
    ],
  },
  {
    icon: Battery,
    title: "Battery Storage",
    role: "Time-Shifting & Firming",
    capacity: "200–400 MWh (4–6hr duration)",
    cost: "$150–200M",
    borderColor: "border-olive",
    details: [
      "Lithium-ion battery energy storage system (BESS)",
      "Stores excess solar during the day, discharges overnight",
      "Provides frequency regulation and ramp-rate smoothing",
      "Battery costs falling 11–16% per year (CSIRO GenCost 2025–26)",
      "15-year warranty with capacity augmentation pathway",
    ],
  },
  {
    icon: Flame,
    title: "Gas Backup",
    role: "Firm Capacity Guarantee",
    capacity: "50–80 MW",
    cost: "$60–80M",
    borderColor: "border-grey",
    details: [
      "Fast-start reciprocating gas engines (Jenbacher or Wärtsilä)",
      "Sub-60-second start time for rapid response",
      "Connected to existing regional gas pipeline infrastructure",
      "Runs <5% of annual hours — primarily extended cloud cover events",
      "Ensures 99.99% uptime SLA required by hyperscale customers",
    ],
  },
];

const FONT = "Inter, system-ui, sans-serif";

function PowerProfileChart() {
  const solar = [0, 0, 0, 0, 0, 5, 30, 70, 110, 140, 155, 160, 155, 140, 120, 90, 50, 15, 0, 0, 0, 0, 0, 0];
  const battery = [20, 20, 20, 20, 20, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 35, 50, 50, 45, 35, 25, 20];
  const gas = [5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 10, 5];
  const demand = 75;

  const chartW = 800;
  const chartH = 200;
  const padL = 50;
  const padR = 20;
  const padT = 10;
  const padB = 30;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;
  const maxY = 180;

  function toPath(data: number[], baseData?: number[]) {
    return data.map((v, i) => {
      const x = padL + (i / 23) * plotW;
      const base = baseData ? baseData[i] : 0;
      const y = padT + plotH - ((v + base) / maxY) * plotH;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    }).join(" ");
  }

  function toAreaPath(data: number[], baseData?: number[]) {
    const top = data.map((v, i) => {
      const x = padL + (i / 23) * plotW;
      const base = baseData ? baseData[i] : 0;
      const y = padT + plotH - ((v + base) / maxY) * plotH;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    }).join(" ");

    const bottom = data.map((_, i) => {
      const idx = 23 - i;
      const x = padL + (idx / 23) * plotW;
      const base = baseData ? baseData[idx] : 0;
      const y = padT + plotH - (base / maxY) * plotH;
      return `L${x},${y}`;
    }).join(" ");

    return `${top} ${bottom} Z`;
  }

  return (
    <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full" role="img" aria-label="24-hour power generation profile showing solar, battery, and gas output">
      <title>24-Hour Power Generation Profile</title>
      {/* Grid lines */}
      {[0, 50, 100, 150].map((v) => {
        const y = padT + plotH - (v / maxY) * plotH;
        return (
          <g key={v}>
            <line x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="#E8E5E1" strokeWidth="1" />
            <text x={padL - 8} y={y + 4} textAnchor="end" fill="#857F78" fontSize="10" fontFamily={FONT}>{v}</text>
          </g>
        );
      })}

      {/* X-axis labels */}
      {[0, 4, 8, 12, 16, 20].map((h) => {
        const x = padL + (h / 23) * plotW;
        return (
          <text key={h} x={x} y={chartH - 5} textAnchor="middle" fill="#857F78" fontSize="10" fontFamily={FONT}>
            {h.toString().padStart(2, "0")}:00
          </text>
        );
      })}

      {/* Gas area (bottom) */}
      <path d={toAreaPath(gas)} fill="#9CA3AF" opacity="0.3" />
      {/* Battery area (on top of gas) */}
      <path d={toAreaPath(battery, gas)} fill="#5C6F2D" opacity="0.25" />
      {/* Solar area (on top of battery + gas) */}
      <path d={toAreaPath(solar, solar.map((_, i) => battery[i] + gas[i]))} fill="#D97706" opacity="0.25" />

      {/* Lines */}
      <path d={toPath(gas)} fill="none" stroke="#9CA3AF" strokeWidth="1.5" />
      <path d={toPath(battery, gas)} fill="none" stroke="#5C6F2D" strokeWidth="1.5" />
      <path d={toPath(solar, solar.map((_, i) => battery[i] + gas[i]))} fill="none" stroke="#D97706" strokeWidth="1.5" />

      {/* Demand line */}
      <line
        x1={padL}
        y1={padT + plotH - (demand / maxY) * plotH}
        x2={chartW - padR}
        y2={padT + plotH - (demand / maxY) * plotH}
        stroke="#CD412B"
        strokeWidth="1.5"
        strokeDasharray="6,4"
      />
      <text
        x={chartW - padR + 4}
        y={padT + plotH - (demand / maxY) * plotH + 4}
        fill="#CD412B" fontSize="10" fontWeight="500" fontFamily={FONT}
      >
        DC Load
      </text>

      {/* Y-axis label */}
      <text x={12} y={padT + plotH / 2} textAnchor="middle" fill="#857F78" fontSize="10" fontFamily={FONT} transform={`rotate(-90, 12, ${padT + plotH / 2})`}>
        MW
      </text>
    </svg>
  );
}

export default function HowItWorksContent() {
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
            Three Technologies. One Guarantee.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-xl text-text-secondary max-w-2xl leading-relaxed"
          >
            Solar generates. Batteries store. Gas guarantees. Together they
            deliver firm, 24/7, behind-the-meter power.
          </motion.p>
        </div>
      </section>

      {/* Detailed Tech Breakdown */}
      <section className="py-[100px] lg:py-[140px] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="space-y-12">
            {techSpecs.map((tech, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className={`p-8 lg:p-10 bg-cream rounded-lg border-l-4 ${tech.borderColor}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <tech.icon
                          className="w-8 h-8 text-olive"
                          strokeWidth={1.5}
                        />
                        <div>
                          <h3 className="font-serif text-2xl text-text-primary">
                            {tech.title}
                          </h3>
                          <p className="text-sm text-olive font-medium">
                            {tech.role}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-3 mt-6">
                        {tech.details.map((detail, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-text-secondary text-[15px] leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-olive mt-2 shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:text-right shrink-0">
                      <p className="font-serif text-[28px] text-olive">
                        {tech.capacity}
                      </p>
                      <p className="text-sm text-text-muted mt-1">
                        {tech.cost}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 24-Hour Power Profile */}
      <section className="py-[100px] lg:py-[140px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              24-Hour Power Profile
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-relaxed">
              Solar generates during daylight hours. Batteries discharge
              overnight. Gas fills any remaining gaps. The data centre receives
              uninterrupted power — guaranteed.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 bg-white p-6 lg:p-10 rounded-lg border border-divider">
              <PowerProfileChart />
              <div className="flex flex-wrap gap-6 mt-6 justify-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber" />
                  <span className="text-sm text-text-secondary">Solar</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-olive" />
                  <span className="text-sm text-text-secondary">Battery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-grey" />
                  <span className="text-sm text-text-secondary">Gas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-0 border-t-2 border-dashed border-red" />
                  <span className="text-sm text-text-secondary">
                    Data Centre Load
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Water-Smart by Design */}
      <section className="py-[100px] lg:py-[140px] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="w-8 h-8 text-olive" strokeWidth={1.5} />
              <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
                Water-Smart by Design
              </h2>
            </div>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-[1.7]">
              Brightwood builds power stations, not data centres. Solar panels
              use almost no water. Batteries use zero water. Our gas engines
              (Jenbacher or Wärtsilä) are air-cooled, not water-cooled.
              Brightwood&apos;s generation footprint uses a fraction of the water
              that coal-fired grid power requires.
            </p>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-[1.7]">
              For the data centre itself, site selection explicitly includes
              water availability. Regional Queensland has access via the
              Condamine&ndash;Balonne system and the Great Artesian Basin. We
              work with operators to incorporate dry and hybrid cooling systems
              and water recycling into precinct design.
            </p>
          </FadeIn>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <FadeIn delay={0.1}>
              <div className="p-8 bg-red-tint rounded-lg border-l-4 border-red h-full">
                <h3 className="text-lg font-semibold text-red mb-3">
                  Coal-Fired Grid Power
                </h3>
                <p className="text-text-secondary text-[15px] leading-relaxed">
                  High water use for cooling towers + generation. Thermal plants
                  consume billions of litres annually.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-8 bg-olive-tint rounded-lg border-l-4 border-olive h-full">
                <h3 className="text-lg font-semibold text-olive mb-3">
                  Brightwood Solar + Battery
                </h3>
                <p className="text-text-secondary text-[15px] leading-relaxed">
                  Negligible water use. Air-cooled backup. Solar panels need
                  occasional washing only.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Glide Path to 100% Renewable */}
      <section className="py-[100px] lg:py-[140px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="w-8 h-8 text-olive" strokeWidth={1.5} />
              <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
                Glide Path to 100% Renewable
              </h2>
            </div>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-[1.7]">
              Each Brightwood facility starts at approximately 95% renewable on
              day one. Solar and battery handle 95%+ of all operating hours. Gas
              engines run less than 5% of the time &mdash; only during extended
              multi-day cloud events where battery reserves are depleted.
            </p>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-[1.7]">
              The gas component is designed from the outset to be transitional.
              As longer-duration battery storage (8&ndash;12 hour) becomes
              cost-effective &mdash; CSIRO projects continued double-digit annual
              cost declines &mdash; we have a funded, engineered pathway to
              replace gas engines with additional BESS within 5&ndash;8 years.
              The gas engines are modular and can be physically decommissioned.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-12">
              {/* Timeline */}
              <div className="relative">
                {/* Connecting line */}
                <div className="hidden md:block absolute top-6 left-[calc(12.5%+12px)] right-[calc(12.5%+12px)] h-0.5 bg-olive/20" />

                <div className="grid md:grid-cols-4 gap-8 md:gap-4">
                  {[
                    {
                      stage: "Day 1",
                      label: "~95% Renewable",
                      detail:
                        "Solar + battery + gas backup. Gas runs <5% of hours.",
                      active: true,
                    },
                    {
                      stage: "Year 3–5",
                      label: "Battery Augmentation",
                      detail:
                        "Longer-duration BESS added. Gas usage drops below 2%.",
                      active: false,
                    },
                    {
                      stage: "Year 5–8",
                      label: "Gas Decommissioned",
                      detail:
                        "Gas engines physically removed. Replaced with long-duration BESS.",
                      active: false,
                    },
                    {
                      stage: "Endpoint",
                      label: "100% Renewable",
                      detail:
                        "Fully solar + battery. Zero fossil fuel generation.",
                      active: false,
                      endpoint: true,
                    },
                  ].map((step, i) => (
                    <div key={i} className="text-center">
                      <div className="flex justify-center mb-4">
                        <div
                          className={`rounded-full flex items-center justify-center ${
                            step.endpoint
                              ? "w-14 h-14 bg-olive"
                              : "w-12 h-12 bg-olive/15"
                          }`}
                        >
                          {step.endpoint ? (
                            <CheckCircle className="w-7 h-7 text-white" />
                          ) : (
                            <span className="w-3 h-3 rounded-full bg-olive" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-olive mb-1">
                        {step.stage}
                      </p>
                      <p className="font-serif text-lg text-text-primary mb-2">
                        {step.label}
                      </p>
                      <p className="text-text-secondary text-[13px] leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p className="mt-4 text-xs text-text-muted/60 text-center">
              Source: CSIRO GenCost 2025–26 (battery cost projections).
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Behind-the-Meter Explained */}
      <section className="py-[100px] lg:py-[140px] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              Behind-the-Meter Explained
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-relaxed">
              Traditional grid connections take 3–5 years. Brightwood builds
              dedicated power that connects directly — no grid queue, no
              substation upgrades, no wait.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <ComparisonToggle
              className="mt-10"
              optionA={{
                title: "Grid Connection",
                icon: Grid3X3,
                color: "red",
                items: [
                  "Apply for grid connection (12+ months)",
                  "Transmission network assessment",
                  "Substation upgrade & grid works",
                  "NEM registration & compliance",
                  "Commission & energise",
                ],
                stat: "3–5 year wait time",
                statLabel: "Subject to grid capacity, substation upgrades, regulatory approvals",
              }}
              optionB={{
                title: "Brightwood Behind-the-Meter",
                icon: Zap,
                color: "olive",
                items: [
                  "Site secured with power & fibre access",
                  "Solar + battery + gas built behind-the-meter",
                  "Commission & deliver power",
                ],
                stat: "18–24 months to power",
                statLabel: "No grid queue. No substation. Direct, dedicated supply.",
              }}
            />
          </FadeIn>
        </div>
      </section>

      <SourcesPanel
        sources={[
          { id: 1, text: "CSIRO GenCost 2025\u201326, battery and solar cost projections." },
          { id: 2, text: "CSIRO GenCost 2025\u201326, long-duration battery storage cost trajectory." },
        ]}
      />

      {/* CTA */}
      <section className="bg-olive py-[100px] lg:py-[120px]">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-white">
              Have Questions?
            </h2>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Learn more about behind-the-meter power, AI energy demands, and
              what Brightwood is building.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/faq"
                className="inline-flex items-center px-7 py-3.5 bg-white text-olive font-medium rounded-lg hover:bg-cream transition-colors duration-200"
              >
                Read the FAQ
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-7 py-3.5 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
