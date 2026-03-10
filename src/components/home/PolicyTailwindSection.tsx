"use client";

import FadeIn from "@/components/FadeIn";

const findings = [
  {
    source: "CEFC / Baringa Partners, December 2025",
    text: "Australia needs an additional 3.2 GW of renewable generation and 1.9 GW of battery storage by 2035 for data centres. Without it: +26% wholesale prices in NSW, +23% in Victoria, +14% grid emissions.",
  },
  {
    source:
      "Industry Coalition (CEC, ETU, WWF, ACF, Smart Energy Council), February 2026",
    text: "Data centres must be powered by 100% additional renewable energy. Approvals should be conditional on new long-term firmed renewable PPAs.",
  },
  {
    source: "Corrs Chambers Westgarth (in The Australian), February 2026",
    text: "Regional co-location should be fast-tracked. Hybrid energy models will remain part of the operating playbook.",
  },
];

export default function PolicyTailwindSection() {
  return (
    <section className="py-[120px] lg:py-[160px]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            Government, Industry &amp; Unions Agree
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-[1.7]">
            A rare consensus: data centres must bring their own renewable power.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-14 p-8 lg:p-10 bg-olive-tint rounded-lg">
            <div className="space-y-8">
              {findings.map((finding, i) => (
                <div
                  key={i}
                  className={`${
                    i < findings.length - 1
                      ? "pb-8 border-b border-olive/15"
                      : ""
                  }`}
                >
                  <p className="text-sm font-semibold text-olive mb-2">
                    {finding.source}
                  </p>
                  <p className="text-text-secondary leading-[1.7] text-[15px] lg:text-base">
                    &ldquo;{finding.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="mt-10 text-olive font-semibold text-lg text-center">
            This is exactly what Brightwood builds.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
