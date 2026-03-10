"use client";

import FadeIn from "@/components/FadeIn";

const examples = [
  {
    title: "Chevron + GE Vernova",
    description:
      "4 GW of behind-the-meter gas generation being built specifically for US data centres.",
  },
  {
    title: "Stargate (OpenAI)",
    description:
      "$500B AI infrastructure project with dedicated gas turbines and solar in West Texas.",
  },
  {
    title: "xAI (Elon Musk)",
    description:
      "Built the world\u2019s largest AI training centre entirely off-grid in four months.",
  },
];

export default function GlobalShiftSection() {
  return (
    <section className="py-[120px] lg:py-[160px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            The Global Shift to Dedicated Power
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-[1.7]">
            Data centres worldwide are building their own power plants. This
            trend hasn&apos;t reached Australia yet.
          </p>
        </FadeIn>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {examples.map((ex, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-8 bg-cream rounded-lg border-l-4 border-olive card-hover h-full">
                <h3 className="font-serif text-xl text-text-primary mb-3">
                  {ex.title}
                </h3>
                <p className="text-text-secondary leading-[1.7] text-[15px]">
                  {ex.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <p className="mt-10 text-olive italic text-lg text-center">
            Brightwood brings this model to Australia.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
