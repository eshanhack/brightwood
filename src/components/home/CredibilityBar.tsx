"use client";

import FadeIn from "@/components/FadeIn";

const companies = [
  "AWS",
  "Microsoft",
  "Google Cloud",
  "Meta",
  "NEXTDC",
  "Equinix",
  "AirTrunk",
];

export default function CredibilityBar() {
  return (
    <section className="py-16 border-t border-b border-divider overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-center text-sm text-text-muted tracking-wide uppercase mb-8">
            Building power infrastructure for the world&apos;s leading data
            centre operators
          </p>
        </FadeIn>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="animate-marquee flex items-center gap-16 whitespace-nowrap">
          {[...companies, ...companies].map((company, i) => (
            <span
              key={i}
              className="text-xl md:text-2xl font-semibold text-text-muted/40 hover:text-text-secondary/70 transition-colors duration-300 select-none"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
