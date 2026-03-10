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

// Triple for seamless loop
const marqueeItems = [...companies, ...companies, ...companies];

export default function CredibilityBar() {
  return (
    <section className="py-14 border-t border-b border-divider overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-center text-[13px] text-text-muted tracking-widest uppercase mb-10 font-medium">
            Building power infrastructure for the world&apos;s leading data
            centre operators
          </p>
        </FadeIn>
      </div>

      {/* Seamless marquee with edge fades */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div className="animate-marquee flex items-center whitespace-nowrap">
            {marqueeItems.map((company, i) => (
              <span
                key={i}
                className="mx-5 sm:mx-8 md:mx-12 text-[15px] sm:text-[18px] md:text-[22px] font-semibold text-text-muted/50 hover:text-olive transition-colors duration-300 select-none cursor-default"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
