"use client";

import FadeIn from "@/components/FadeIn";
import TabPanel from "@/components/TabPanel";
import Link from "next/link";
import { Sun, Battery, Flame, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

function TechTab({
  icon: Icon,
  title,
  capacity,
  description,
  color,
}: {
  icon: LucideIcon;
  title: string;
  capacity: string;
  description: string;
  color: string;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-serif text-xl text-text-primary">{title}</h3>
            <p className="text-sm text-text-muted">{capacity}</p>
          </div>
        </div>
        <p className="text-text-secondary leading-[1.7] text-[15px] max-w-lg">
          {description}
        </p>
      </div>

      {/* Compact energy flow */}
      <div className="w-full md:w-[280px] shrink-0">
        <svg
          viewBox="0 0 280 80"
          className="w-full"
          role="img"
          aria-label="Energy flow diagram"
        >
          <line x1="30" y1="40" x2="100" y2="40" stroke="#E8E5E1" strokeWidth="2" />
          <line x1="140" y1="40" x2="210" y2="40" stroke="#E8E5E1" strokeWidth="2" />

          {/* Animated particles */}
          {[0, 1].map((seg) => (
            <circle key={seg} r="3" fill="#8BA04A" opacity="0.8">
              <animateMotion
                dur="2.5s"
                repeatCount="indefinite"
                begin={`${seg * 0.6}s`}
                path={`M${30 + seg * 110},40 L${100 + seg * 110},40`}
              />
              <animate
                attributeName="opacity"
                values="0;0.8;0.8;0"
                dur="2.5s"
                repeatCount="indefinite"
                begin={`${seg * 0.6}s`}
              />
            </circle>
          ))}

          {/* Source */}
          <circle cx="15" cy="40" r="12" fill="#F0F4E4" stroke="#5C6F2D" strokeWidth="1.5" />
          <text x="15" y="44" textAnchor="middle" fontSize="11" fill="#5C6F2D" fontFamily="Inter, system-ui, sans-serif">&#9728;</text>

          {/* Storage */}
          <rect x="100" y="26" width="40" height="28" rx="4" fill="#F0F4E4" stroke="#5C6F2D" strokeWidth="1.5" />
          <text x="120" y="44" textAnchor="middle" fill="#5C6F2D" fontSize="9" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">Store</text>

          {/* DC */}
          <rect x="210" y="26" width="55" height="28" rx="4" fill="#5C6F2D" />
          <text x="237" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">Data Centre</text>

          {/* Arrows */}
          <polygon points="97,36 97,44 103,40" fill="#5C6F2D" opacity="0.5" />
          <polygon points="207,36 207,44 213,40" fill="#5C6F2D" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="py-[80px] lg:py-[100px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            How Brightwood Works
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-[1.7]">
            Three proven technologies. One guaranteed power supply.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <TabPanel
            className="mt-10"
            tabs={[
              {
                id: "solar",
                label: "Solar Generation",
                icon: Sun,
                content: (
                  <TechTab
                    icon={Sun}
                    title="Solar Generation"
                    capacity="150–200 MW per site"
                    description="Utility-scale solar generating low-cost electricity. Australia's irradiance yields 20–30% more energy per panel than Europe — making regional Queensland one of the best solar locations on earth."
                    color="bg-amber"
                  />
                ),
              },
              {
                id: "battery",
                label: "Battery Storage",
                icon: Battery,
                content: (
                  <TechTab
                    icon={Battery}
                    title="Battery Storage"
                    capacity="200–400 MWh per site"
                    description="Large-scale lithium-ion storing solar energy for overnight use. Battery costs are falling 11–16% per year, making 4–6 hour duration storage increasingly economical."
                    color="bg-olive"
                  />
                ),
              },
              {
                id: "gas",
                label: "Gas Backup",
                icon: Flame,
                content: (
                  <TechTab
                    icon={Flame}
                    title="Gas Backup"
                    capacity="50–80 MW per site"
                    description="Fast-start reciprocating engines for 99.99% uptime during extended cloud cover. Runs less than 5% of hours annually — a reliability layer, not a primary energy source."
                    color="bg-grey"
                  />
                ),
              },
            ]}
          />
        </FadeIn>

        <FadeIn delay={0.3}>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 mt-8 text-olive font-medium text-sm hover:underline"
          >
            See full technical specs
            <ArrowRight size={14} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
