"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const layers = [
  {
    label: "AI Models",
    companies: "OpenAI, Anthropic, Google DeepMind, Meta AI, xAI, Mistral, Cohere",
    highlight: false,
  },
  {
    label: "Chips & Semiconductors",
    companies: "Nvidia, AMD, TSMC, Broadcom, Intel, Samsung",
    highlight: false,
  },
  {
    label: "Cloud & GPU Compute",
    companies: "AWS, Azure, Google Cloud, CoreWeave, Iren, Oracle",
    highlight: false,
  },
  {
    label: "Data Centres",
    companies: "NEXTDC, AirTrunk, Equinix, Digital Realty, Goodman, Stack",
    highlight: false,
  },
  {
    label: "Power Infrastructure",
    companies: "BRIGHTWOOD ENERGY",
    highlight: true,
  },
];

export default function ValueChainSection() {
  return (
    <section className="py-[120px] lg:py-[160px]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            Where Brightwood Sits
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-[1.7]">
            Every layer of AI depends on the one below it
          </p>
        </FadeIn>

        <div className="mt-14 max-w-3xl mx-auto">
          {layers.map((layer, i) => (
            <div key={i}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                <div
                  className={`rounded-lg px-6 ${
                    layer.highlight
                      ? "bg-olive text-white py-7 shadow-lg scale-[1.02]"
                      : "bg-white border border-divider py-5"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span
                      className={`font-semibold text-[15px] shrink-0 ${
                        layer.highlight ? "text-white text-base tracking-wide" : "text-text-primary"
                      }`}
                    >
                      {layer.label}
                    </span>
                    <span
                      className={`text-sm ${
                        layer.highlight ? "text-white/80" : "text-text-muted"
                      }`}
                    >
                      {layer.companies}
                    </span>
                  </div>
                </div>
              </motion.div>
              {i < layers.length - 1 && (
                <div className="flex justify-center py-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2L6 10M6 10L2 6M6 10L10 6" stroke="#857F78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <p className="mt-12 text-center text-text-muted italic max-w-lg mx-auto text-[17px] leading-relaxed">
            Models change yearly. Chips every 18 months. Electricity demand is
            permanent.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
