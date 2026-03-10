"use client";

import FadeIn from "@/components/FadeIn";
import { Landmark, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: Landmark,
    title: "Toll-Road Model",
    description:
      "We build the power station. The data centre signs a long-term contract to buy the electricity. Revenue is contracted for 15\u201325 years with built-in annual escalators. The model is closer to a toll road than a tech startup \u2014 you build the infrastructure, someone pays to use it.",
  },
  {
    icon: Clock,
    title: "15\u201325 Year Contracts",
    description:
      "Power Purchase Agreements provide predictable, inflation-linked revenue for decades. Take-or-pay structures mean revenue flows whether the data centre runs at 50% or 100% utilisation.",
  },
  {
    icon: Shield,
    title: "Investment-Grade Customers",
    description:
      "Hyperscale cloud providers and enterprise data centre operators are among the most creditworthy companies on earth. Their PPA commitments carry balance-sheet certainty.",
  },
];

export default function EconomicsSection() {
  return (
    <section className="py-[120px] lg:py-[160px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            The Business Model
          </h2>
          <p className="mt-4 text-lg text-text-secondary leading-[1.7] max-w-3xl">
            Simple, proven, and built for durability. Brightwood develops power
            infrastructure under long-term contracts with the world&apos;s
            largest technology companies.
          </p>
        </FadeIn>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-8 bg-cream rounded-lg border-l-4 border-olive card-hover h-full">
                <feature.icon
                  className="w-6 h-6 text-olive mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="font-serif text-xl text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-[1.7] text-[15px]">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
