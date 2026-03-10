"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import TabPanel from "@/components/TabPanel";
import IsometricPlant from "@/components/IsometricPlant";
import Link from "next/link";
import { Sun, Battery, Flame, ArrowRight } from "lucide-react";

/**
 * "How Brightwood Works" section.
 * Interactive isometric plant illustration synced with a TabPanel.
 */

function TechTab({
  icon: Icon,
  iconColor,
  title,
  capacity,
  description,
}: {
  icon: typeof Sun;
  iconColor: string;
  title: string;
  capacity: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 py-2">
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${iconColor}15` }}
      >
        <Icon className="w-5 h-5" style={{ color: iconColor }} strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="font-serif text-lg text-text-primary">{title}</h3>
        <p className="text-olive font-medium text-sm mt-0.5">{capacity}</p>
        <p className="text-text-secondary text-[14px] leading-[1.7] mt-2">
          {description}
        </p>
      </div>
    </div>
  );
}

/* Tab ↔ Zone mapping */
const zoneToTab: Record<string, string> = {
  solar: "solar",
  battery: "battery",
  gas: "gas",
};

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState("solar");

  const handleZoneChange = (zone: string) => {
    const tab = zoneToTab[zone];
    if (tab) setActiveTab(tab);
  };

  const activeZone = activeTab;

  return (
    <section className="py-[80px] lg:py-[100px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <p className="text-olive font-medium text-sm tracking-wide uppercase mb-3">
            How Brightwood Works
          </p>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            Purpose-Built Power Stations for AI Data Centres
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl leading-[1.7]">
            We build dedicated solar + battery + gas power plants in Queensland,
            directly connected to data centres — bypassing the grid entirely.
          </p>
        </FadeIn>

        {/* Desktop: Isometric plant (left) + TabPanel (right) */}
        <div className="mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-start">
          <FadeIn delay={0.15}>
            <IsometricPlant
              activeZone={activeZone}
              onZoneChange={handleZoneChange}
              className="w-full"
            />
          </FadeIn>

          <FadeIn delay={0.25}>
            <TabPanel
              layoutId="hiw-tab-underline"
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabs={[
                {
                  id: "solar",
                  label: "Solar",
                  icon: Sun,
                  content: (
                    <TechTab
                      icon={Sun}
                      iconColor="#D97706"
                      title="Solar Generation"
                      capacity="150–200 MW per site"
                      description="Utility-scale solar panels generating low-cost electricity. Queensland's irradiance yields 20–30% more energy per panel than anywhere in Europe or the US East Coast."
                    />
                  ),
                },
                {
                  id: "battery",
                  label: "Battery",
                  icon: Battery,
                  content: (
                    <TechTab
                      icon={Battery}
                      iconColor="#5C6F2D"
                      title="Battery Storage"
                      capacity="200–400 MWh per site"
                      description="Large-scale lithium-ion batteries storing solar energy for overnight use. Battery costs are falling 11–16% per year, making storage increasingly cost-competitive."
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
                      iconColor="#6B7280"
                      title="Gas Backup"
                      capacity="50–80 MW per site"
                      description="Fast-start reciprocating engines ensuring 99.99% uptime during extended cloud cover. Runs less than 5% of hours — a reliability layer, not a primary source."
                    />
                  ),
                },
              ]}
            />

            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1.5 mt-6 text-olive font-medium text-sm hover:underline"
            >
              See full technical specs
              <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
