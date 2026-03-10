"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { User, MapPin, Shield, Building2, Lock, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Build with Honesty",
    description:
      "We use verified data from AEMO, CSIRO, Oxford Economics, and Moody\u2019s. We don\u2019t inflate demand projections or cherry-pick statistics. Every claim on this website is sourced.",
  },
  {
    icon: Building2,
    title: "Infrastructure-Grade Thinking",
    description:
      "We build assets designed to operate for 25+ years. Every decision \u2014 site selection, technology, contracts \u2014 optimises for durability over speed.",
  },
  {
    icon: Lock,
    title: "The Complexity Is the Moat",
    description:
      "Australian energy development is complex. Planning approvals, environmental assessments, NEM regulations, gas licensing \u2014 these barriers are exactly why no one has done this yet. They\u2019re also why whoever does it first will be very hard to displace.",
  },
];

export default function AboutContent() {
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
            About Brightwood
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-xl text-text-secondary max-w-2xl leading-relaxed"
          >
            Building dedicated power infrastructure for the AI era in Australia.
          </motion.p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-[100px] lg:py-[140px] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              Why Brightwood Exists
            </h2>
          </FadeIn>
          <div className="mt-10 max-w-3xl space-y-6">
            <FadeIn delay={0.1}>
              <p className="text-lg text-text-secondary leading-[1.8]">
                Brightwood Energy was founded in 2026 in Brisbane, Australia,
                with a simple observation: AI data centres are the
                fastest-growing electricity consumers on earth, and
                Australia&apos;s grid cannot connect them fast enough.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-lg text-text-secondary leading-[1.8]">
                While the US has seen a wave of &ldquo;bring your own
                power&rdquo; projects &mdash; Chevron building gas turbines for
                data centres, OpenAI&apos;s Stargate project with dedicated
                solar in West Texas &mdash; Australia has no equivalent. The grid
                connection queue is 3&ndash;5 years. Metro substations are full.
                Meanwhile, Amazon, Microsoft, and Google have collectively
                committed over $25 billion to Australian data centre
                infrastructure and need power now.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg text-text-secondary leading-[1.8]">
                Brightwood exists to close that gap. We develop, build, own, and
                operate dedicated power stations &mdash; solar, battery, and gas
                backup &mdash; purpose-built for data centres in regional
                Australia. Behind-the-meter, off-grid, delivered in 18&ndash;24
                months instead of 3&ndash;5 years.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-[100px] lg:py-[140px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              The Team
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-10 p-8 lg:p-10 bg-white rounded-lg border border-divider max-w-2xl">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-olive-tint rounded-full flex items-center justify-center shrink-0">
                  <User className="w-7 h-7 text-olive" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-text-primary">
                    Ishan Haque
                  </h3>
                  <p className="text-olive font-medium mt-1">Founder</p>
                  <p className="mt-4 text-text-secondary leading-[1.7]">
                    Based in Brisbane. Background in capital markets, venture
                    building, and investment across technology and
                    infrastructure. Previously co-founded and scaled ventures in
                    digital assets and investment management.
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-text-muted text-sm">
                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                    Brisbane, Australia
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Hiring */}
      <section className="py-[100px] lg:py-[140px] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              We&apos;re Hiring
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-relaxed">
              Brightwood is building a founding team. We&apos;re looking for
              people who want to build critical infrastructure from the ground
              up.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 p-8 bg-cream rounded-lg border-l-4 border-olive max-w-3xl">
              <h3 className="font-serif text-xl text-text-primary mb-3">
                Energy Co-Founder
              </h3>
              <p className="text-text-secondary leading-[1.7] text-[15px] mb-4">
                We&apos;re looking for an energy co-founder with Australian
                renewable energy project delivery experience &mdash; someone who
                has personally taken 50+ MW projects from concept to
                commissioning. If that&apos;s you, or you know someone, get in
                touch.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-olive font-medium hover:text-olive-dark transition-colors duration-200"
              >
                Get in Touch
                <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-[100px] lg:py-[140px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
              What We Believe
            </h2>
          </FadeIn>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-8 bg-white rounded-lg border-l-4 border-olive card-hover h-full">
                  <value.icon
                    className="w-6 h-6 text-olive mb-4"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-serif text-xl text-text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary leading-[1.7] text-[15px]">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-olive py-[100px] lg:py-[120px]">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-[36px] md:text-[44px] text-white">
              Let&apos;s Build Together
            </h2>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Whether you&apos;re an energy professional, data centre operator,
              or investor &mdash; we&apos;d love to hear from you.
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
