"use client";

import FadeIn from "@/components/FadeIn";

export default function WhyQueenslandSection() {
  return (
    <section className="py-[120px] lg:py-[160px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            Why Queensland
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-[1.7]">
            60% of Australia&apos;s data centres are in Sydney. Queensland has
            almost none. That&apos;s not a problem &mdash; it&apos;s the entire
            opportunity.
          </p>
        </FadeIn>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {/* Sydney & Melbourne Are Full */}
          <FadeIn delay={0.1}>
            <div className="p-8 bg-red-tint border-l-4 border-red rounded-lg h-full">
              <h3 className="text-lg font-semibold text-red mb-5">
                Sydney &amp; Melbourne Are Full
              </h3>
              <ul className="space-y-3.5 text-text-secondary text-[15px] leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-red mt-1.5 shrink-0">&bull;</span>
                  <span>
                    NSW capped data centre parcels at 10 hectares in Macquarie
                    Park &amp; Eastern Creek to preserve industrial land
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red mt-1.5 shrink-0">&bull;</span>
                  <span>
                    Western Sydney grid connections physically unavailable for
                    new large-scale data centres
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red mt-1.5 shrink-0">&bull;</span>
                  <span>
                    Industrial land at $600&ndash;800/m&sup2;, up 60% since 2023
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red mt-1.5 shrink-0">&bull;</span>
                  <span>
                    Melbourne: strict planning codes pushing operators to outer
                    suburbs
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red mt-1.5 shrink-0">&bull;</span>
                  <span>
                    Brisbane: zero new DC capacity added since mid-2023, yet
                    absorption timeframe compressed from 12 years to under 2
                    years
                  </span>
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* Queensland's Advantages */}
          <FadeIn delay={0.2}>
            <div className="p-8 bg-olive-tint border-l-4 border-olive rounded-lg h-full">
              <h3 className="text-lg font-semibold text-olive mb-5">
                Queensland&apos;s Advantages
              </h3>
              <ul className="space-y-3.5 text-text-secondary text-[15px] leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-olive mt-1.5 shrink-0">&bull;</span>
                  <span>
                    Australia&apos;s best solar irradiance &mdash; 20&ndash;30%
                    more generation per panel than Europe
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-olive mt-1.5 shrink-0">&bull;</span>
                  <span>
                    Cheap, cleared pastoral land with minimal planning friction
                    in supportive regional LGAs
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-olive mt-1.5 shrink-0">&bull;</span>
                  <span>
                    Extensive gas pipeline networks (Surat Basin) for
                    transitional firming
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-olive mt-1.5 shrink-0">&bull;</span>
                  <span>
                    Torus subsea cable now connecting Brisbane to international
                    fibre for the first time
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-olive mt-1.5 shrink-0">&bull;</span>
                  <span>
                    Quinbrook chose Brendale QLD for their flagship &mdash; the
                    smartest energy money in Australia bet on Queensland
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-olive mt-1.5 shrink-0">&bull;</span>
                  <span>
                    State 80% clean power target actively attracting hyperscale
                    feasibility studies
                  </span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.35}>
          <p className="mt-10 text-olive italic text-lg text-center">
            The empty space on the map isn&apos;t a warning. It&apos;s the
            entire addressable market.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-4 text-xs text-text-muted/60 text-center">
            Sources: M3 Property Data Centre Report Nov 2025, Mordor
            Intelligence Jan 2026, Quinbrook/Supernode public announcements.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
