"use client";

import FadeIn from "@/components/FadeIn";
import ComparisonToggle from "@/components/ComparisonToggle";
import Link from "next/link";
import { Grid3X3, Zap, Sun, MapPin, Fuel, ArrowRight } from "lucide-react";

const stats = [
  {
    icon: Sun,
    value: "Best Solar",
    label: "Australia's highest irradiance — 20–30% more generation per panel",
  },
  {
    icon: MapPin,
    value: "Cheap Land",
    label: "Cleared pastoral land with minimal planning friction",
  },
  {
    icon: Fuel,
    value: "Gas Access",
    label: "Extensive Surat Basin pipeline network for transitional firming",
  },
];

export default function AdvantageSection() {
  return (
    <section className="py-[80px] lg:py-[100px] bg-olive-tint">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            Faster &amp; Cheaper Than the Grid
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-[1.7]">
            Behind-the-meter power eliminates the grid bottleneck entirely.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <ComparisonToggle
            className="mt-10"
            optionA={{
              title: "Grid Connection",
              icon: Grid3X3,
              color: "red",
              items: [
                "Apply for grid connection (12+ months)",
                "Environmental & planning approvals",
                "Transmission upgrades & grid works",
                "NEM registration & compliance",
                "Commission & energise",
              ],
              stat: "$120–200+/MWh",
              statLabel: "Grid retail price — if you can get connected at all",
            }}
            optionB={{
              title: "Brightwood",
              icon: Zap,
              color: "olive",
              items: [
                "Site secured with power & fibre access",
                "Solar + battery + gas built behind-the-meter",
                "Commission & deliver power",
              ],
              stat: "~$110/MWh in 18–24 months",
              statLabel: "Faster, cheaper, 100% clean energy included",
            }}
          />
        </FadeIn>

        {/* Queensland stat tiles */}
        <FadeIn delay={0.3}>
          <div className="mt-12">
            <h3 className="font-serif text-xl text-text-primary mb-6">
              Why Queensland
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-5 bg-white rounded-lg border border-divider flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-olive/10 flex items-center justify-center shrink-0">
                    <stat.icon className="w-5 h-5 text-olive" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary text-[15px]">
                      {stat.value}
                    </p>
                    <p className="text-text-muted text-sm mt-0.5 leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Link
            href="/opportunity"
            className="inline-flex items-center gap-1.5 mt-8 text-olive font-medium text-sm hover:underline"
          >
            Explore the full opportunity
            <ArrowRight size={14} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
