"use client";

import FadeIn from "@/components/FadeIn";
import BentoGrid from "@/components/BentoGrid";
import AnimatedCounter from "@/components/AnimatedCounter";
import EnergyGapChart from "@/components/EnergyGapChart";
import Link from "next/link";
import { DollarSign, Zap, Clock, TrendingUp, ArrowRight } from "lucide-react";

export default function ProblemSection() {
  return (
    <section id="problem" className="py-[80px] lg:py-[100px]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            The Grid Can&apos;t Keep Up
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-[1.7]">
            AI data centres are the fastest-growing electricity consumers on
            earth. Australia&apos;s grid cannot connect them fast enough.
          </p>
        </FadeIn>

        <div className="mt-12">
          <BentoGrid
            items={[
              {
                value: (
                  <AnimatedCounter
                    target={15}
                    prefix="$"
                    suffix="B"
                    className="inherit"
                  />
                ),
                label: "Energy investment needed for Australian data centres by 2035",
                accent: "olive",
                size: "lg",
                icon: DollarSign,
              },
              {
                value: (
                  <AnimatedCounter target={6} suffix=" GW" className="inherit" />
                ),
                label: "Real data centre capacity needed",
                accent: "olive",
                size: "md",
                icon: Zap,
              },
              {
                value: "3–5 yrs",
                label: "Grid connection wait time",
                accent: "red",
                size: "md",
                icon: Clock,
              },
              {
                value: (
                  <AnimatedCounter target={25} suffix="%" className="inherit" />
                ),
                label: "Annual DC demand growth rate",
                accent: "olive",
                size: "md",
                icon: TrendingUp,
              },
            ]}
          />
        </div>

        {/* Energy Gap Chart */}
        <FadeIn delay={0.2}>
          <EnergyGapChart className="mt-12" />
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="mt-10 text-text-secondary leading-[1.7] max-w-3xl">
            AEMO received 44 GW of data centre connection requests — but 6 in 7
            MW is &apos;phantom demand.&apos; Even so, metro grids are full.
            Dedicated power is the only path to delivery in under 2 years.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-6 flex items-center gap-3">
            <p className="text-olive italic">
              Chevron, OpenAI, and xAI are already building their own power in
              the US. Brightwood brings this model to Australia.
            </p>
          </div>
          <Link
            href="/opportunity"
            className="inline-flex items-center gap-1.5 mt-3 text-olive font-medium text-sm hover:underline"
          >
            Explore the opportunity
            <ArrowRight size={14} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
