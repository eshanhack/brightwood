"use client";

import FadeIn from "@/components/FadeIn";
import { Cite } from "@/components/SourcesPanel";
import { DollarSign, Zap, Clock, TrendingUp } from "lucide-react";

const stats = [
  {
    value: "$15B",
    label: "Energy investment needed by 2035",
    accent: false,
    icon: DollarSign,
    cite: 2,
  },
  {
    value: "6 GW",
    label: "Real data centre capacity needed",
    accent: false,
    icon: Zap,
    cite: 3,
  },
  {
    value: "3\u20135 yrs",
    label: "Grid connection wait time",
    accent: true,
    icon: Clock,
  },
  {
    value: "25%",
    label: "Annual DC demand growth rate",
    accent: false,
    icon: TrendingUp,
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-[120px] lg:py-[160px]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            The Grid Can&apos;t Keep Up
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-[1.7]">
            AI data centres are the fastest-growing electricity consumers on
            earth. Australia&apos;s grid cannot connect them fast enough.
          </p>
        </FadeIn>

        {/* Stats Row */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className={`p-6 rounded-lg card-hover ${
                  stat.accent
                    ? "bg-red-tint border-l-4 border-red"
                    : "bg-white border-l-4 border-olive"
                }`}
              >
                <stat.icon
                  className={`w-5 h-5 mb-3 ${
                    stat.accent ? "text-red" : "text-olive"
                  }`}
                  strokeWidth={1.5}
                />
                <p
                  className={`font-serif text-[28px] md:text-[36px] leading-none ${
                    stat.accent ? "text-red" : "text-olive"
                  }`}
                >
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-text-secondary leading-snug">
                  {stat.label}
                  {"cite" in stat && stat.cite && <Cite n={stat.cite} />}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Two panels */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <FadeIn delay={0.1}>
            <div className="p-8 bg-red-tint border-l-4 border-red rounded-lg h-full">
              <h3 className="text-lg font-semibold text-red mb-3">
                The Constraint
              </h3>
              <p className="text-text-secondary leading-[1.7]">
                AEMO received 44 GW of data centre connection requests — but
                Oxford Economics found 6 in 7 MW is &apos;phantom
                demand.&apos;<Cite n={3} /> Even so, metro grids are full.
                Western Sydney literally cannot connect new large-scale data
                centres. Developers are being pushed to regional sites.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="p-8 bg-olive-tint border-l-4 border-olive rounded-lg h-full">
              <h3 className="text-lg font-semibold text-olive mb-3">
                The Arbitrage
              </h3>
              <p className="text-text-secondary leading-[1.7]">
                World-class solar irradiance. Battery costs falling 11–16% per
                year.<Cite n={4} /> Cheap regional land. Existing gas pipelines.
                The cost of building dedicated power is well below what
                hyperscalers will pay for guaranteed supply.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
