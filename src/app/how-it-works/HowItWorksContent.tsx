"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { Sun, Battery, Flame, CheckCircle, XCircle } from "lucide-react";

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

          <div className="mt-14 grid md:grid-cols-2 gap-8">
            {/* Traditional path */}
            <FadeIn delay={0.1}>
              <div className="p-8 bg-red-tint rounded-lg border border-red/20">
                <div className="flex items-center gap-2 mb-6">
                  <XCircle className="w-6 h-6 text-red" />
                  <h3 className="font-serif text-xl text-red">
                    Traditional Grid Connection
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    "Power Station",
                    "Transmission Network",
                    "Substation Upgrade",
                    "Distribution Network",
                    "Data Centre",
                  ].map((step, j) => (
                    <div key={j}>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-red/10 flex items-center justify-center text-red text-sm font-medium">
                          {j + 1}
                        </span>
                        <span className="text-text-secondary text-[15px]">
                          {step}
                        </span>
                      </div>
                      {j < 4 && (
                        <div className="ml-4 h-4 border-l-2 border-dashed border-red/30" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-white rounded border border-red/20">
                  <p className="text-red font-medium text-sm">
                    3–5 year wait time
                  </p>
                  <p className="text-text-muted text-sm mt-1">
                    Subject to grid capacity, substation upgrades, regulatory
                    approvals
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Brightwood path */}
            <FadeIn delay={0.2}>
              <div className="p-8 bg-olive-tint rounded-lg border border-olive/20">
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle className="w-6 h-6 text-olive" />
                  <h3 className="font-serif text-xl text-olive">
                    Brightwood Behind-the-Meter
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    "Solar + Battery + Gas",
                    "Direct Connection",
                    "Data Centre",
                  ].map((step, j) => (
                    <div key={j}>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-olive/10 flex items-center justify-center text-olive text-sm font-medium">
                          {j + 1}
                        </span>
                        <span className="text-text-secondary text-[15px]">
                          {step}
                        </span>
                      </div>
                      {j < 2 && (
                        <div className="ml-4 h-4 border-l-2 border-dashed border-olive/30" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-white rounded border border-olive/20">
                  <p className="text-olive font-medium text-sm">
                    18–24 months to power
                  </p>
                  <p className="text-text-muted text-sm mt-1">
                    No grid queue. No substation. Direct, dedicated supply.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-olive py-[100px] lg:py-[120px]">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-white">
              See the Competitive Landscape
            </h2>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Why hasn&apos;t anyone done this yet? Explore the competitors and
              understand Brightwood&apos;s positioning.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/landscape"
                className="inline-flex items-center px-7 py-3.5 bg-white text-olive font-medium rounded-lg hover:bg-cream transition-colors duration-200"
              >
                Competitive Landscape
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
