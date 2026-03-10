"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { Clock, Banknote } from "lucide-react";

const bars = [
  {
    label: "Brightwood generation cost",
    price: "$60\u201380/MWh",
    width: "35%",
    color: "bg-olive-light",
  },
  {
    label: "Brightwood PPA price",
    price: "~$110/MWh",
    width: "55%",
    color: "bg-olive",
  },
  {
    label: "Grid retail price (IF you can get connected)",
    price: "$120\u2013200+/MWh",
    width: "90%",
    color: "bg-red",
  },
];

const advantages = [
  {
    icon: Clock,
    title: "Speed Advantage",
    description:
      "18\u201324 months to power vs 3\u20135 year grid wait. The real bottleneck isn\u2019t price \u2014 it\u2019s time.",
  },
  {
    icon: Banknote,
    title: "Price Advantage",
    description:
      "Brightwood power costs less than grid retail \u2014 and the customer gets 100% clean energy included.",
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
        <div className="mt-14 space-y-8 max-w-3xl">
          {bars.map((bar, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div>
                <div className="flex items-baseline justify-between mb-2.5">
                  <span className="text-sm text-text-secondary">
                    {bar.label}
                  </span>
                  <span className="font-serif text-lg text-text-primary">
                    {bar.price}
                  </span>
                </div>
                <div className="w-full bg-divider/50 rounded-full h-5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: bar.width }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.15 + 0.2,
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
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-8 bg-white rounded-lg border-l-4 border-olive card-hover h-full">
                <adv.icon className="w-6 h-6 text-olive mb-3" strokeWidth={1.5} />
                <h3 className="font-serif text-xl text-text-primary mb-3">
                  {adv.title}
                </h3>
                <p className="text-text-secondary leading-[1.7]">
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
