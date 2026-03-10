"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const endorsements = [
  {
    source: "CEFC / Baringa",
    text: "Data centres need 3.2 GW of new renewables by 2035",
  },
  {
    source: "Industry Coalition",
    text: "100% additional renewable energy required",
  },
  {
    source: "Corrs Chambers",
    text: "Regional co-location should be fast-tracked",
  },
];

export default function ValidationSection() {
  return (
    <section className="bg-olive py-[80px] lg:py-[100px]">
      <div className="max-w-[900px] mx-auto px-6 lg:px-8 text-center">
        <FadeIn>
          <blockquote className="font-serif text-[24px] md:text-[32px] lg:text-[38px] text-white italic leading-[1.35]">
            &ldquo;Intelligence generated in real time requires power generated
            in real time. There is no abstraction layer beneath energy. It sets
            the ceiling on how much intelligence can be produced at all.&rdquo;
          </blockquote>
          <div className="mt-6 w-12 h-[2px] bg-white/40 mx-auto" />
          <p className="mt-4 text-white/60 text-sm font-medium">
            — Jensen Huang, CEO, Nvidia (March 2026)
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {endorsements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              >
                <p className="text-white/90 text-sm">
                  <span className="font-semibold text-white">
                    {item.source}
                  </span>
                  <span className="mx-2 text-white/40">—</span>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-10 text-white/70 text-sm font-medium tracking-wide uppercase">
            This is exactly what Brightwood builds.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
