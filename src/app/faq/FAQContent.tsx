"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "What does Brightwood actually do?",
    answer:
      "We develop, build, own, and operate dedicated power stations purpose-built for AI data centres in regional Australia. Each facility combines solar, battery storage, and gas backup to deliver firm, 24/7 electricity directly to the data centre \u2014 completely independent of the grid.",
  },
  {
    question: "What does \u2018behind-the-meter\u2019 mean?",
    answer:
      "In traditional power delivery, electricity is generated at a power station, travels through high-voltage transmission lines, passes through substations, and arrives at the customer via distribution networks. Behind-the-meter means the power is generated on the customer\u2019s side of the electricity meter \u2014 directly adjacent to or co-located with the data centre. This bypasses the entire public grid, eliminating the 3\u20135 year connection queue and the associated network charges.",
  },
  {
    question: "Why can\u2019t data centres just connect to the grid?",
    answer:
      "They\u2019re trying. AEMO received 44 GW of data centre connection requests. But metro grids \u2014 particularly Western Sydney and Melbourne \u2014 are at capacity. Substation upgrades take years. New transmission lines take longer. Meanwhile, 11 GW of coal generation is retiring by 2035, further tightening supply. The queue is real and getting longer.",
  },
  {
    question: "Why does AI need so much power?",
    answer:
      "Training and running AI models requires massive parallel computation across thousands of GPUs, each consuming hundreds of watts. A single hyperscale AI training cluster can draw 100+ MW \u2014 equivalent to powering 100,000 homes. And unlike traditional data centres that have variable loads, AI training runs at near-100% utilisation 24/7 for weeks or months at a time.",
  },
  {
    question: "Why Australia specifically? Why not just build in Texas?",
    answer:
      "Two reasons: latency and law. Real-time AI applications for Australian enterprises need sub-50ms response times \u2014 physically impossible from US-based servers (150\u2013280ms). And Australian data sovereignty laws (APRA CPS 234 for banking, My Health Records Act for healthcare, AUKUS for defence) legally require certain workloads to be processed on Australian soil.",
  },
  {
    question: "Why regional rather than metro?",
    answer:
      "Metro grids are full. Western Sydney \u2014 Australia\u2019s largest data centre corridor \u2014 literally cannot connect new large-scale facilities. Regional sites offer cheap cleared land, world-class solar irradiance, existing gas pipeline infrastructure, and far less planning friction. The tradeoff is that there\u2019s no grid to connect to \u2014 which is exactly why you need dedicated behind-the-meter generation.",
  },
  {
    question: "What is a PPA?",
    answer:
      "A Power Purchase Agreement is a long-term contract between an electricity generator and a customer. The customer agrees to buy a set amount of electricity at a fixed price (usually with annual CPI escalators) for 15\u201325 years. For the generator, it guarantees revenue. For the customer, it guarantees supply and price certainty. PPAs are the standard contracting mechanism for large-scale renewable energy projects globally.",
  },
  {
    question: "Doesn\u2019t AI efficiency (like DeepSeek) reduce power demand?",
    answer:
      "The evidence consistently shows the opposite net effect. More efficient AI \u2192 cheaper AI \u2192 more adoption \u2192 more total compute \u2192 more total power. This is Jevons paradox \u2014 the same phenomenon that occurred with more fuel-efficient cars leading to more total driving. Every major forecaster (AEMO, IEA, Moody\u2019s) still projects rising total data centre power demand even after accounting for efficiency gains.",
  },
  {
    question: "What about nuclear power for data centres?",
    answer:
      "Nuclear is currently prohibited in Australia. Even if that changed, CSIRO estimates 15\u201320 years from policy change to first generation. Data centres need power in 2\u20133 years, not 2040. Small modular reactors (SMRs) are being explored globally but have no commercially operating examples at data centre scale. Solar + battery + gas is proven, available, and deployable now.",
  },
  {
    question: "Who are Brightwood\u2019s customers?",
    answer:
      "Brightwood\u2019s target customers are the hyperscale cloud providers (AWS, Microsoft, Google, Meta) and Australian data centre operators (NEXTDC, Equinix, Macquarie Data Centres) expanding into regional sites. These are among the most creditworthy companies on earth \u2014 their PPA commitments are backed by investment-grade balance sheets.",
  },
];

export default function FAQContent() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-[140px] pb-[100px] lg:pt-[180px] lg:pb-[140px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[48px] md:text-[64px] lg:text-[76px] leading-[1.05] text-text-primary max-w-4xl"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-xl text-text-secondary max-w-2xl leading-relaxed"
          >
            Everything you need to know about behind-the-meter power, AI data
            centre energy, and what Brightwood is building.
          </motion.p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-[100px] lg:py-[140px] bg-white">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8">
          <div className="space-y-4">
            {faqItems.map((item, i) => {
              const isOpen = openItems.has(i);
              return (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="bg-cream rounded-lg border-l-4 border-olive overflow-hidden">
                    <button
                      onClick={() => toggleItem(i)}
                      className="w-full flex items-center justify-between p-6 lg:p-8 text-left cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-lg lg:text-xl text-text-primary pr-4">
                        {item.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0"
                      >
                        <ChevronDown
                          className="w-5 h-5 text-olive"
                          strokeWidth={2}
                        />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                            <p className="text-text-secondary leading-[1.7] text-[15px]">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-olive py-[100px] lg:py-[120px]">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-white">
              Still Have Questions?
            </h2>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              We&apos;re happy to talk through anything in more detail. Get in
              touch and we&apos;ll get back to you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center mt-8 px-8 py-4 bg-white text-olive font-medium rounded-lg hover:bg-cream transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
