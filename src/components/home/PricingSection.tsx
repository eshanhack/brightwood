"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const bars = [
  {
    label: "Brightwood generation cost",
    price: "$60–80/MWh",
    width: "35%",
    color: "bg-olive-light",
    delay: 0,
  },
  {
    label: "Brightwood PPA price",
    price: "~$110/MWh",
    width: "55%",
    color: "bg-olive",
    delay: 0.15,
  },
  {
    label: "Grid retail price (IF you can get connected)",
    price: "$120–200+/MWh",
    width: "90%",
    color: "bg-red",
    delay: 0.3,
  },
];

const advantages = [
  {
    title: "Speed Advantage",
    description:
      "18–24 months to power vs 3–5 year grid wait. The real bottleneck isn't price — it's time.",
  },
  {
    title: "Price Advantage",
    description:
      "$30–50/MWh margin. 60–65% EBITDA. Customer saves vs grid + gets 100% clean energy.",
  },
];

export default function PricingSection() {
  return (
    <section className="py-[120px] lg:py-[160px]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            Faster Than the Grid
          </h2>
        </FadeIn>

        {/* Price comparison bars */}
        <div className="mt-14 space-y-6 max-w-3xl">
          {bars.map((bar, i) => (
            <FadeIn key={i} delay={bar.delay}>
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm text-text-secondary">
                    {bar.label}
                  </span>
                  <span className="font-serif text-lg text-text-primary font-medium">
                    {bar.price}
                  </span>
                </div>
                <div className="w-full bg-divider/50 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: bar.width }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      delay: bar.delay + 0.2,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                    className={`h-full rounded-full ${bar.color}`}
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Advantage cards */}
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {advantages.map((adv, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.1}>
              <div className="p-8 bg-white rounded-lg border-l-4 border-olive">
                <h3 className="font-serif text-xl text-text-primary mb-3">
                  {adv.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {adv.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
