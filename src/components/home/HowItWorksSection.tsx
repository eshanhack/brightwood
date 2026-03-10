"use client";

import FadeIn from "@/components/FadeIn";
import { Sun, Battery, Flame } from "lucide-react";

const techCards = [
  {
    icon: Sun,
    title: "Solar Generation",
    capacity: "150–200 MW | $200–270M",
    description:
      "Utility-scale solar arrays generating low-cost electricity during daylight hours. Australia\u2019s solar irradiance is among the best in the world \u2014 regional Queensland sites generate 20\u201330% more energy per panel than European equivalents.",
    borderColor: "border-amber",
    iconColor: "text-amber",
  },
  {
    icon: Battery,
    title: "Battery Storage",
    capacity: "200–400 MWh | $150–200M",
    description:
      "Large-scale lithium-ion battery systems that store excess solar energy during the day and discharge it through the night. Battery costs have fallen 11\u201316% year-on-year, making 4\u20136 hour duration storage economically viable.",
    borderColor: "border-olive",
    iconColor: "text-olive",
  },
  {
    icon: Flame,
    title: "Gas Backup",
    capacity: "50–80 MW | $60–80M",
    description:
      "Fast-start reciprocating gas engines providing firm backup power during extended cloud cover or peak demand periods. Ensures 99.99% uptime guarantees required by hyperscale customers. Runs <5% of hours annually.",
    borderColor: "border-grey",
    iconColor: "text-grey",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-[120px] lg:py-[160px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            How Brightwood Works
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-[1.7]">
            Three proven technologies. One guaranteed power supply.
          </p>
        </FadeIn>

        {/* Cards */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {techCards.map((card, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className={`p-8 bg-cream rounded-lg border-l-4 ${card.borderColor} card-hover h-full`}
              >
                <card.icon className={`w-8 h-8 ${card.iconColor} mb-4`} strokeWidth={1.5} />
                <h3 className="font-serif text-2xl text-text-primary mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-olive font-medium mb-4">
                  {card.capacity}
                </p>
                <p className="text-text-secondary leading-[1.7] text-[15px]">
                  {card.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Energy Flow Diagram — inline styled SVG text */}
        <FadeIn delay={0.2}>
          <div className="mt-16 flex justify-center">
            <svg
              viewBox="0 0 900 120"
              className="w-full max-w-[800px]"
              role="img"
              aria-label="Energy flow: Sun to Solar Panels to Battery Storage to Data Centre, with Gas as backup"
            >
              {/* Flow lines */}
              <line x1="80" y1="60" x2="260" y2="60" stroke="#E8E5E1" strokeWidth="2" />
              <line x1="330" y1="60" x2="510" y2="60" stroke="#E8E5E1" strokeWidth="2" />
              <line x1="580" y1="60" x2="760" y2="60" stroke="#E8E5E1" strokeWidth="2" />

              {/* Gas backup branch */}
              <line x1="650" y1="60" x2="650" y2="22" stroke="#E8E5E1" strokeWidth="1.5" strokeDasharray="4,4" />
              <text x="650" y="14" textAnchor="middle" fill="#857F78" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Gas Backup</text>

              {/* Animated particles */}
              {[0, 1, 2].map((seg) => (
                <circle key={seg} r="4" fill="#8BA04A" opacity="0.8">
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${seg * 0.8}s`}
                    path={`M${80 + seg * 250},60 L${260 + seg * 250},60`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.9;0.9;0"
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${seg * 0.8}s`}
                  />
                </circle>
              ))}

              {/* Sun */}
              <circle cx="40" cy="60" r="22" fill="#F0F4E4" stroke="#D97706" strokeWidth="1.5" />
              <text x="40" y="66" textAnchor="middle" fontSize="20" fill="#D97706">&#9728;</text>
              <text x="40" y="100" textAnchor="middle" fill="#6B6560" fontSize="11" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">Sun</text>

              {/* Solar */}
              <rect x="260" y="38" width="70" height="44" rx="6" fill="#F0F4E4" stroke="#5C6F2D" strokeWidth="1.5" />
              <text x="295" y="64" textAnchor="middle" fill="#5C6F2D" fontSize="11" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">Solar</text>
              <text x="295" y="100" textAnchor="middle" fill="#6B6560" fontSize="11" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">150–200 MW</text>

              {/* Battery */}
              <rect x="510" y="38" width="70" height="44" rx="6" fill="#F0F4E4" stroke="#5C6F2D" strokeWidth="1.5" />
              <text x="545" y="64" textAnchor="middle" fill="#5C6F2D" fontSize="11" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">Battery</text>
              <text x="545" y="100" textAnchor="middle" fill="#6B6560" fontSize="11" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">200–400 MWh</text>

              {/* Data Centre */}
              <rect x="760" y="38" width="100" height="44" rx="6" fill="#5C6F2D" />
              <text x="810" y="64" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">Data Centre</text>
              <text x="810" y="100" textAnchor="middle" fill="#6B6560" fontSize="11" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">100 MW load</text>

              {/* Arrows */}
              <polygon points="255,55 255,65 265,60" fill="#5C6F2D" opacity="0.5" />
              <polygon points="505,55 505,65 515,60" fill="#5C6F2D" opacity="0.5" />
              <polygon points="755,55 755,65 765,60" fill="#5C6F2D" opacity="0.5" />
            </svg>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
