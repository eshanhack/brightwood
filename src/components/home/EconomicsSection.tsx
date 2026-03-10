"use client";

import FadeIn from "@/components/FadeIn";

const stats = [
  { value: "$430\u2013530M", label: "Capital Cost" },
  { value: "~$110/MWh", label: "PPA Price (firm, 24/7)" },
  { value: "~$91M", label: "Annual Revenue" },
  { value: "62\u201365%", label: "EBITDA Margin" },
  { value: "18\u201325%", label: "Equity IRR" },
  { value: "4\u20136 years", label: "Equity Payback" },
];

export default function EconomicsSection() {
  return (
    <section className="py-[120px] lg:py-[160px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            The Economics
          </h2>
          <p className="mt-4 text-lg text-text-secondary leading-[1.7]">
            100 MW reference project
          </p>
        </FadeIn>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="p-6 lg:p-8 bg-cream rounded-lg border-l-4 border-olive card-hover h-full">
                <p className="font-serif text-[26px] md:text-[32px] text-olive leading-none">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm text-text-secondary font-medium">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-10 p-8 bg-olive-tint rounded-lg border-l-4 border-olive">
            <p className="text-text-secondary leading-[1.7]">
              <span className="font-semibold text-text-primary">
                You don&apos;t need $430M upfront.
              </span>{" "}
              $5\u201315M development capital funds the first 18 months. A signed
              PPA unlocks project finance (70\u201375% debt) + institutional equity.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
