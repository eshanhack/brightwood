"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import SourcesPanel from "@/components/SourcesPanel";
import Link from "next/link";

const competitors = [
  {
    title: "Hyperscalers",
    subtitle: "AWS, Microsoft, Google, Meta",
    description:
      "Building their own power is not core competence. Australian planning and environmental approvals are harder than the US. They strongly prefer to sign PPAs with specialised operators — exactly what Brightwood offers.",
  },
  {
    title: "DC Operators",
    subtitle: "NEXTDC, AirTrunk, Equinix",
    description:
      "Real estate and IT infrastructure companies. Their skills are designing server halls and managing interconnects, not building power stations. Different industry, different capabilities, different regulatory expertise.",
  },
  {
    title: "Utilities",
    subtitle: "AGL, Origin, EnergyAustralia",
    description:
      "Grid retailers serving millions of customers. Not set up for bespoke, off-grid, single-customer power stations. Their model is centralised generation → transmission → distribution. Brightwood is the opposite.",
  },
  {
    title: "Iren",
    subtitle: "Formerly Iris Energy",
    description:
      "A GPU compute company, not a power company. $9.7B Microsoft contract is for compute services, not electricity. 4.5 GW of power secured — but all in North America. No Australian energy development capability.",
  },
  {
    title: "US BYOP Players",
    subtitle: "Constellation, Talen, Intersect",
    description:
      "Building behind-the-meter power in Texas and the US Midwest. Not present in Australia. Years away from entering a market with different regulations, planning systems, and grid architecture.",
  },
  {
    title: "Quinbrook",
    subtitle: "Supernode, Brendale QLD",
    description:
      "$3B+ integrated battery storage and data centre campus at Brendale, QLD. 780 MW BESS committed. Three high-voltage grid connections via South Pine substation. FIRB approved. Origin Energy as offtake partner. CBRE managing customer engagement. Well-funded and credible — but grid-connected at one metro-adjacent site. Australia needs ~6 GW distributed across multiple regions.",
  },
];

const validations = [
  {
    stat: "353 MW",
    title: "Microsoft / FRV PPA",
    description:
      "Microsoft signed a 15-year PPA with FRV Australia for a 353 MW solar plant in NSW. This proves hyperscalers will sign long-term PPAs with Australian renewable energy developers.",
  },
  {
    stat: "$24B",
    title: "AirTrunk Exit",
    description:
      "AirTrunk was founded in Sydney in 2015 and acquired by Blackstone for AUD $24B in 2024. 800 MW capacity. ~$600M EBITDA. ~40x multiple. Nine years from founding to $24B exit.",
  },
];

export default function LandscapeContent() {
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
            Why Hasn&apos;t Anyone Done This?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-xl text-text-secondary max-w-2xl leading-relaxed"
          >
            The short answer: it sits at the intersection of energy, data
            centres, and project development. No single player has all three.
          </motion.p>
        </div>
      </section>

      {/* Competitor Grid */}
      <section className="py-[100px] lg:py-[140px] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              The Competitive Landscape
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-relaxed">
              Six categories of potential competitors — and why none of them are
              doing what Brightwood does.
            </p>
          </FadeIn>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitors.map((comp, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-8 bg-red-tint rounded-lg border-t-4 border-red h-full card-hover">
                  <h3 className="font-serif text-xl text-text-primary">
                    {comp.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-1 mb-4">
                    {comp.subtitle}
                  </p>
                  <p className="text-text-secondary leading-relaxed text-[15px]">
                    {comp.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Brightwood Positioning */}
      <section className="py-[100px] lg:py-[140px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="p-8 lg:p-12 bg-olive-tint rounded-lg border-l-4 border-olive">
              <h3 className="font-serif text-[28px] md:text-[32px] text-text-primary mb-4">
                Brightwood&apos;s Position
              </h3>
              <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
                Australian-founded. Energy-focused. Distributed regional model —
                multiple sites, behind-the-meter, off-grid. 6 GW of demand
                can&apos;t be served from one campus. Brightwood builds power
                stations where the data centres need to be, not where the grid
                happens to have capacity.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Market Validation */}
      <section className="py-[100px] lg:py-[140px] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              Market Validation
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-relaxed">
              The model is already proven. Major transactions confirm that
              hyperscalers will pay for dedicated power and that infrastructure
              investors will pay premium multiples.
            </p>
          </FadeIn>

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {validations.map((val, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="p-8 bg-cream rounded-lg border-l-4 border-olive h-full card-hover">
                  <p className="font-serif text-[36px] text-olive mb-2">
                    {val.stat}
                  </p>
                  <h3 className="font-serif text-xl text-text-primary mb-3">
                    {val.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-[15px]">
                    {val.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SourcesPanel
        sources={[
          { id: 1, text: "PV Tech / FRV Australia, Microsoft 353 MW solar PPA announcement, 2025." },
          { id: 2, text: "Blackstone, AirTrunk acquisition announcement, AUD $24B, 2024." },
          { id: 3, text: "Quinbrook / Supernode public announcements, FIRB approval, Origin Energy offtake, 2025\u20132026." },
        ]}
      />

      {/* CTA */}
      <section className="bg-olive py-[100px] lg:py-[120px]">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-white">
              Learn More
            </h2>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Explore how Brightwood builds dedicated power infrastructure for
              data centres, or get in touch to start a conversation.
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
