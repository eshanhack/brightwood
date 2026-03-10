"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FadeIn from "@/components/FadeIn";

/**
 * Nvidia's 5-layer AI stack visual.
 * Layers animate in from top to bottom on scroll, making the
 * dependency chain visually obvious. The Energy layer (Brightwood)
 * at the bottom animates last with extra emphasis.
 *
 * Source: Jensen Huang / Nvidia, March 2026
 */

interface StackLayer {
  number: number;
  title: string;
  content: string;
  variant: "muted" | "brightwood";
}

const layers: StackLayer[] = [
  {
    number: 5,
    title: "Applications",
    content:
      "Drug discovery · Autonomous vehicles · Copilots · Robotics · Enterprise AI",
    variant: "muted",
  },
  {
    number: 4,
    title: "Models",
    content: "OpenAI · Anthropic · Google DeepMind · Meta AI · xAI · Mistral",
    variant: "muted",
  },
  {
    number: 3,
    title: "Infrastructure (AI Factories)",
    content: "AWS · Azure · Google Cloud · CoreWeave · NEXTDC · AirTrunk",
    variant: "muted",
  },
  {
    number: 2,
    title: "Chips",
    content: "Nvidia · AMD · TSMC · Broadcom · Intel · Samsung",
    variant: "muted",
  },
  {
    number: 1,
    title: "Energy",
    content:
      "Every token produced is the result of electrons moving. Intelligence generated in real time requires power generated in real time.",
    variant: "brightwood",
  },
];

function DownArrow({ delay, inView }: { delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={inView ? { opacity: 0.35, y: 0 } : {}}
      transition={{ duration: 0.3, delay }}
      className="flex justify-center py-1"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 1v10M3 8l4 4 4-4"
          stroke="#5C6F2D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

export default function AIStackSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-[80px] lg:py-[100px]" ref={ref}>
      <div className="max-w-[800px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary text-center">
            The AI Stack
          </h2>
          <p className="mt-4 text-center text-text-muted italic text-[15px] leading-[1.7] max-w-2xl mx-auto">
            &ldquo;Energy is the first principle of AI infrastructure and the
            binding constraint on how much intelligence the system can
            produce.&rdquo;
          </p>
          <p className="mt-2 text-center text-text-muted text-[13px]">
            — Jensen Huang, CEO, Nvidia (March 2026)
          </p>
        </FadeIn>

        {/* Stack layers */}
        <div className="mt-14">
          {layers.map((layer, i) => {
            const delay = 0.15 + i * 0.1;
            const isBrightwood = layer.variant === "brightwood";

            return (
              <div key={layer.number}>
                {/* Arrow between layers */}
                {i > 0 && <DownArrow delay={delay - 0.05} inView={inView} />}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: -15,
                    scale: isBrightwood ? 0.97 : 1,
                  }}
                  animate={
                    inView
                      ? { opacity: 1, y: 0, scale: 1 }
                      : {}
                  }
                  transition={{
                    duration: isBrightwood ? 0.7 : 0.5,
                    delay,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className={`rounded-xl px-6 py-5 ${
                    isBrightwood
                      ? "bg-olive text-white shadow-lg shadow-olive/20"
                      : "bg-white border border-divider"
                  }`}
                >
                  <div
                    className={`flex flex-col sm:flex-row sm:items-start gap-4 ${
                      isBrightwood ? "sm:items-center" : ""
                    }`}
                  >
                    {/* Layer number + title */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          isBrightwood
                            ? "bg-white/20 text-white"
                            : "bg-olive/10 text-olive"
                        }`}
                      >
                        {layer.number}
                      </span>
                      <h3
                        className={`font-serif text-[18px] sm:text-[20px] ${
                          isBrightwood ? "text-white" : "text-text-primary"
                        }`}
                      >
                        {isBrightwood ? (
                          <>
                            <span className="tracking-wide">
                              BRIGHTWOOD ENERGY
                            </span>
                          </>
                        ) : (
                          layer.title
                        )}
                      </h3>
                    </div>

                    {/* Content */}
                    <p
                      className={`text-[13px] sm:text-[14px] leading-[1.6] ${
                        isBrightwood
                          ? "text-white/80 italic"
                          : "text-text-muted"
                      }`}
                    >
                      {layer.content}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Bottom closing line */}
        <FadeIn delay={0.8}>
          <p className="mt-10 text-center text-text-muted text-[14px] leading-[1.7] max-w-lg mx-auto">
            Every successful application pulls on every layer beneath it, all
            the way down to the power plant that keeps it alive.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
