"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { Shield, Landmark, HeartPulse, Swords, Clock, MapPin, Zap, TrendingUp } from "lucide-react";

const demandStats = [
  { value: "3.9 TWh", label: "Data centre consumption in FY25 (~2.2% of NEM demand)" },
  { value: "12 TWh", label: "Projected consumption by FY30 (AEMO Step Change)" },
  { value: "25.1%", label: "Annual demand growth rate" },
  { value: "44 GW", label: "Connection requests received by AEMO" },
];

const sovereigntyReqs = [
  {
    icon: Landmark,
    title: "Government",
    description:
      "Federal and state agencies require data residency within Australian borders. Critical government workloads cannot leave the jurisdiction.",
  },
  {
    icon: Shield,
    title: "Banking & Finance",
    description:
      "APRA-regulated entities must ensure data remains in Australia. Major banks are the largest enterprise AI adopters in the country.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description:
      "Patient data under the My Health Records Act must be stored domestically. AI-driven diagnostics and drug discovery require local compute.",
  },
  {
    icon: Swords,
    title: "Defence",
    description:
      "AUKUS, Five Eyes, and Defence classified workloads mandate Australian sovereign infrastructure — no exceptions.",
  },
];

const latencyBars = [
  { city: "Sydney → Sydney", ms: "~1 ms", width: "8%" },
  { city: "Sydney → Singapore", ms: "~90 ms", width: "45%" },
  { city: "Sydney → US West", ms: "~150 ms", width: "75%" },
  { city: "Sydney → Europe", ms: "~280 ms", width: "100%" },
];

export default function OpportunityContent() {
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
            Why Now
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-xl text-text-secondary max-w-2xl leading-relaxed"
          >
            The convergence of AI demand, grid constraints, and falling
            renewable costs creates a once-in-a-decade opportunity.
          </motion.p>
        </div>
      </section>

      {/* The AI Power Crisis */}
      <section className="py-[100px] lg:py-[140px] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              The AI Power Crisis
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-relaxed">
              Data centres consumed 3.9 TWh in FY25, roughly 2.2% of National
              Electricity Market demand. AEMO&apos;s Step Change scenario
              projects this will triple to 12 TWh by FY30 — a 25.1% annual
              growth rate that dwarfs every other demand category.
            </p>
          </FadeIn>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {demandStats.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-6 bg-cream rounded-lg border-l-4 border-olive card-hover h-full">
                  <p className="font-serif text-[30px] md:text-[36px] text-olive leading-none">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm text-text-secondary leading-snug">
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-10 p-8 bg-red-tint border-l-4 border-red rounded-lg">
              <h3 className="text-lg font-semibold text-red mb-3">
                The Phantom Demand Problem
              </h3>
              <p className="text-text-secondary leading-relaxed">
                AEMO received 44 GW of data centre connection requests, but
                Oxford Economics found that 6 in 7 MW is &apos;phantom
                demand&apos; — speculative applications that will never proceed.
                The real need is approximately 6 GW. But even 6 GW overwhelms
                metro grids. Western Sydney literally cannot connect new
                large-scale data centres. The queue is years long, and
                developers are being forced to look elsewhere.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Australia */}
      <section className="py-[100px] lg:py-[140px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              Why Australia
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-relaxed">
              Latency requirements and data sovereignty laws mean AI workloads
              for Australian enterprises cannot be served from overseas.
            </p>
          </FadeIn>

          {/* Latency bars */}
          <div className="mt-14 max-w-2xl space-y-5">
            {latencyBars.map((bar, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">
                      {bar.city}
                    </span>
                    <span className="text-sm text-text-muted">{bar.ms}</span>
                  </div>
                  <div className="w-full bg-divider/50 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: bar.width }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.2 + i * 0.1,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                      className={`h-full rounded-full ${
                        i === 0 ? "bg-olive" : "bg-olive/40"
                      }`}
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Sovereignty requirements */}
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {sovereigntyReqs.map((req, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-8 bg-white rounded-lg border border-divider card-hover h-full">
                  <req.icon className="w-7 h-7 text-olive mb-4" strokeWidth={1.5} />
                  <h3 className="font-serif text-xl text-text-primary mb-2">
                    {req.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-[15px]">
                    {req.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-10 p-8 bg-olive-tint rounded-lg border-l-4 border-olive">
              <p className="text-text-secondary leading-relaxed">
                <span className="font-semibold text-text-primary">
                  The investment is already flowing.
                </span>{" "}
                Amazon has committed AUD $20B to Australian data centre
                infrastructure. Microsoft has committed AUD $5B. These are not
                speculative — they&apos;re funded, announced, and in planning.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Regional */}
      <section className="py-[100px] lg:py-[140px] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              Why Regional
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-relaxed">
              Metro grids are full. The next generation of data centres will be
              built in regional Australia — and they need their own power.
            </p>
          </FadeIn>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <div className="p-8 bg-cream rounded-lg border-l-4 border-olive">
                <MapPin className="w-7 h-7 text-olive mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-xl text-text-primary mb-3">
                  Cheap Land
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px]">
                  Cleared pastoral land in regional Queensland costs a fraction
                  of metro industrial sites. Thousands of hectares available for
                  solar arrays with minimal planning friction.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-8 bg-cream rounded-lg border-l-4 border-olive">
                <Zap className="w-7 h-7 text-olive mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-xl text-text-primary mb-3">
                  World-Class Solar
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px]">
                  Queensland&apos;s solar irradiance is among the best globally.
                  Regional sites generate 20–30% more energy per panel than
                  European equivalents, driving down the cost of generation.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="p-8 bg-cream rounded-lg border-l-4 border-olive">
                <TrendingUp className="w-7 h-7 text-olive mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-xl text-text-primary mb-3">
                  Existing Gas Infrastructure
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px]">
                  Regional Queensland has extensive gas pipeline networks.
                  Behind-the-meter gas backup can be connected without grid
                  upgrades, ensuring 99.99% uptime guarantees.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The Window */}
      <section className="py-[100px] lg:py-[140px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              The Window
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-relaxed">
              The opportunity to establish a dominant position in
              behind-the-meter power for Australian data centres is 18–24
              months. After that, established energy developers and
              international players will have mobilised.
            </p>
          </FadeIn>

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <FadeIn delay={0.1}>
              <div className="p-8 bg-olive-tint rounded-lg border-l-4 border-olive">
                <Clock className="w-7 h-7 text-olive mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-xl text-text-primary mb-3">
                  First-Mover Advantage
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px]">
                  Land options, planning approvals, and grid exemption
                  applications take 12–18 months. Starting now means being
                  construction-ready before competitors have begun their
                  applications.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-8 bg-olive-tint rounded-lg border-l-4 border-olive">
                <Zap className="w-7 h-7 text-olive mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-xl text-text-primary mb-3">
                  The Capital Is Ready
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px]">
                  Institutional investors — superannuation funds, infrastructure
                  managers, sovereign wealth funds — are actively seeking
                  deployment opportunities in Australian energy infrastructure.
                  A signed PPA unlocks billions in project finance.
                </p>
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
              Ready to Learn More?
            </h2>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Explore how Brightwood&apos;s three-technology model delivers
              guaranteed 24/7 power.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/how-it-works"
                className="inline-flex items-center px-7 py-3.5 bg-white text-olive font-medium rounded-lg hover:bg-cream transition-colors duration-200"
              >
                How It Works
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
