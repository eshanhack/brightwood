"use client";

import FadeIn from "@/components/FadeIn";
import AnimatedCounter from "@/components/AnimatedCounter";
import EnergyGapChart from "@/components/EnergyGapChart";
import Link from "next/link";
import { DollarSign, Zap, TrendingUp, Clock, ArrowRight } from "lucide-react";

/**
 * Problem section: chart + wait-time side-by-side, demand stats below.
 */

const demandStats = [
  {
    icon: DollarSign,
    target: 15,
    prefix: "$",
    suffix: "B",
    label: "Energy investment needed for Australian data centres by 2035",
  },
  {
    icon: Zap,
    target: 6,
    prefix: "",
    suffix: " GW",
    label: "Real data centre capacity needed by 2035",
  },
  {
    icon: TrendingUp,
    target: 25,
    prefix: "",
    suffix: "%",
    label: "Annual data centre demand growth rate (CAGR)",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-[80px] lg:py-[100px]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Title */}
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            The Grid Can&apos;t Keep Up
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-[1.7]">
            AI data centres are the fastest-growing electricity consumers on
            earth. Australia&apos;s grid cannot connect them fast enough.
          </p>
        </FadeIn>

        {/* Row 1: Chart (left) + Wait-time card (right) */}
        <div className="mt-12 grid lg:grid-cols-[1fr_300px] gap-6 items-stretch">
          <FadeIn delay={0.1}>
            <EnergyGapChart className="h-full" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="h-full flex flex-col justify-between p-6 bg-red-tint rounded-xl border-t-4 border-red">
              <div>
                <Clock className="w-6 h-6 text-red mb-3" strokeWidth={1.5} />
                <div className="font-serif text-[52px] text-red leading-none">
                  <AnimatedCounter target={3} className="inherit" />–
                  <AnimatedCounter target={5} className="inherit" />
                </div>
                <p className="font-serif text-lg text-red mt-1">years</p>
                <p className="text-text-secondary text-[14px] leading-[1.6] mt-3">
                  Average wait time for a new grid connection in Australia.
                  AEMO received 44 GW of connection requests — but metro grids
                  are full and 6 in 7 MW is phantom demand.
                </p>
              </div>
              <p className="text-red text-[13px] font-medium mt-4">
                Source: AEMO ESOO 2025
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Row 2: Three demand stat cards */}
        <FadeIn delay={0.25}>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {demandStats.map((stat, i) => (
              <div
                key={i}
                className="p-5 bg-white rounded-xl border border-divider border-t-4 border-t-olive"
              >
                <stat.icon
                  className="w-5 h-5 text-olive mb-2"
                  strokeWidth={1.5}
                />
                <p className="font-serif text-[32px] text-text-primary leading-none">
                  <AnimatedCounter
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className="inherit"
                  />
                </p>
                <p className="text-text-muted text-[13px] mt-2 leading-[1.5]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Callout */}
        <FadeIn delay={0.35}>
          <div className="mt-8 p-5 bg-olive-tint rounded-lg border border-olive/10">
            <p className="text-text-primary text-[15px] font-medium">
              &ldquo;This is becoming the largest infrastructure buildout in
              human history. Every company will use AI. Every nation will build
              it.&rdquo;
            </p>
            <p className="text-text-muted text-[13px] mt-1">
              — Jensen Huang, CEO, Nvidia
            </p>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-olive italic text-[15px]">
              Chevron, OpenAI, and xAI are already building their own power in
              the US. Brightwood brings this model to Australia.
            </p>
            <Link
              href="/opportunity"
              className="inline-flex items-center gap-1.5 text-olive font-medium text-sm hover:underline shrink-0"
            >
              Explore the opportunity
              <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
