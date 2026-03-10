"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Interactive isometric SVG illustration of a Brightwood power facility.
 * Shows solar panels, battery storage, gas backup and data centre with
 * animated power-flow lines. Hover/click zones sync with external tab state.
 */

interface IsometricPlantProps {
  activeZone: string | null;
  onZoneChange: (zone: string) => void;
  className?: string;
}

/* ── Zone metadata ── */
const zones = {
  solar: {
    label: "Solar Generation",
    capacity: "150–200 MW",
    desc: "Utility-scale panels in Australia's best irradiance zone",
    color: "#D97706",
    colorLight: "#FEF3C7",
  },
  battery: {
    label: "Battery Storage",
    capacity: "200–400 MWh",
    desc: "Lithium-ion banks for overnight & peak supply",
    color: "#5C6F2D",
    colorLight: "#F0F4E4",
  },
  gas: {
    label: "Gas Backup",
    capacity: "50–80 MW",
    desc: "Fast-start engines for 99.99% uptime guarantee",
    color: "#6B7280",
    colorLight: "#F3F4F6",
  },
} as const;

type ZoneId = keyof typeof zones;

/* ── QLD environment badges ── */
const badges = [
  { label: "Best Solar Irradiance", x: 22, y: 52 },
  { label: "Access to Water", x: 400, y: 52 },
  { label: "Cheap Pastoral Land", x: 22, y: 350 },
  { label: "Gas Pipeline Access", x: 370, y: 350 },
];

export default function IsometricPlant({
  activeZone,
  onZoneChange,
  className = "",
}: IsometricPlantProps) {
  const [hoverZone, setHoverZone] = useState<string | null>(null);
  const displayZone = hoverZone || activeZone;

  const isActive = useCallback(
    (zone: string) => displayZone === zone,
    [displayZone]
  );

  const zoneOpacity = (zone: string) => (isActive(zone) ? 1 : 0.7);
  const zoneStroke = (zone: ZoneId) =>
    isActive(zone) ? zones[zone].color : "transparent";
  const zoneFilter = (zone: string) =>
    isActive(zone) ? "url(#zone-glow)" : "none";

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 520 400"
        className="w-full h-auto"
        aria-label="Interactive isometric illustration of a Brightwood power facility"
      >
        <defs>
          {/* Glow filter for active zones */}
          <filter id="zone-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Animated dash pattern for power flow */}
          <pattern id="flow-dots" width="12" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#5C6F2D" opacity="0.6" />
          </pattern>
        </defs>

        {/* ── Ground plane ── */}
        <rect x="30" y="70" width="460" height="290" rx="16" fill="#F0F4E4" opacity="0.5" />

        {/* ── Solar Field (top-left) ── */}
        <g
          className="cursor-pointer transition-all duration-300"
          opacity={zoneOpacity("solar")}
          filter={zoneFilter("solar")}
          onClick={() => onZoneChange("solar")}
          onMouseEnter={() => setHoverZone("solar")}
          onMouseLeave={() => setHoverZone(null)}
          role="button"
          aria-label="Solar Generation zone"
        >
          <rect
            x="50"
            y="85"
            width="200"
            height="120"
            rx="8"
            fill={zones.solar.colorLight}
            stroke={zoneStroke("solar")}
            strokeWidth="2.5"
          />
          {/* Solar panel rows */}
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <rect
                key={`sp-${row}-${col}`}
                x={62 + col * 38}
                y={95 + row * 26}
                width={32}
                height={18}
                rx="2"
                fill="#D97706"
                opacity={0.6 + row * 0.1}
              />
            ))
          )}
          {/* Label */}
          <text
            x="150"
            y="220"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontSize="11"
            fontWeight="600"
            fill="#D97706"
          >
            SOLAR · 150–200 MW
          </text>
        </g>

        {/* ── Battery Storage (top-right) ── */}
        <g
          className="cursor-pointer transition-all duration-300"
          opacity={zoneOpacity("battery")}
          filter={zoneFilter("battery")}
          onClick={() => onZoneChange("battery")}
          onMouseEnter={() => setHoverZone("battery")}
          onMouseLeave={() => setHoverZone(null)}
          role="button"
          aria-label="Battery Storage zone"
        >
          <rect
            x="280"
            y="85"
            width="190"
            height="100"
            rx="8"
            fill={zones.battery.colorLight}
            stroke={zoneStroke("battery")}
            strokeWidth="2.5"
          />
          {/* Battery containers */}
          {[0, 1, 2, 3].map((col) => (
            <g key={`bat-${col}`}>
              <rect
                x={295 + col * 44}
                y={100}
                width={34}
                height={55}
                rx="4"
                fill="#5C6F2D"
                opacity={0.5 + col * 0.1}
              />
              {/* Charge indicator */}
              <rect
                x={299 + col * 44}
                y={105 + (4 - col) * 5}
                width={26}
                height={40 - (4 - col) * 5}
                rx="2"
                fill="#8BA04A"
                opacity="0.7"
              />
            </g>
          ))}
          <text
            x="375"
            y="200"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontSize="11"
            fontWeight="600"
            fill="#5C6F2D"
          >
            BATTERY · 200–400 MWh
          </text>
        </g>

        {/* ── Power flow lines ── */}
        {/* Solar → DC */}
        <line x1="200" y1="230" x2="200" y2="265" stroke="#D97706" strokeWidth="2" strokeDasharray="6 4" opacity="0.4">
          <animate attributeName="strokeDashoffset" values="0;-20" dur="1.5s" repeatCount="indefinite" />
        </line>
        {/* Battery → DC */}
        <line x1="375" y1="200" x2="375" y2="265" stroke="#5C6F2D" strokeWidth="2" strokeDasharray="6 4" opacity="0.4">
          <animate attributeName="strokeDashoffset" values="0;-20" dur="1.5s" repeatCount="indefinite" />
        </line>
        {/* Gas → DC */}
        <line x1="115" y1="308" x2="155" y2="308" stroke="#6B7280" strokeWidth="2" strokeDasharray="6 4" opacity="0.4">
          <animate attributeName="strokeDashoffset" values="0;-20" dur="1.5s" repeatCount="indefinite" />
        </line>

        {/* Flow particles */}
        <circle r="3" fill="#D97706" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" path="M200,225 L200,265" />
          <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle r="3" fill="#5C6F2D" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s" path="M375,195 L375,265" />
          <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
        </circle>
        <circle r="3" fill="#6B7280" opacity="0.8">
          <animateMotion dur="1.5s" repeatCount="indefinite" begin="1s" path="M110,308 L155,308" />
          <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.5s" repeatCount="indefinite" begin="1s" />
        </circle>

        {/* ── Data Centre (bottom-center) ── */}
        <rect
          x="155"
          y="265"
          width="275"
          height="70"
          rx="8"
          fill="#E8E5E1"
          stroke="#2B2723"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <text
          x="292"
          y="295"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="12"
          fontWeight="700"
          fill="#2B2723"
        >
          DATA CENTRE
        </text>
        <text
          x="292"
          y="312"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="10"
          fill="#6B6560"
        >
          Your AI workloads — powered 24/7
        </text>

        {/* ── Gas Backup (bottom-left) ── */}
        <g
          className="cursor-pointer transition-all duration-300"
          opacity={zoneOpacity("gas")}
          filter={zoneFilter("gas")}
          onClick={() => onZoneChange("gas")}
          onMouseEnter={() => setHoverZone("gas")}
          onMouseLeave={() => setHoverZone(null)}
          role="button"
          aria-label="Gas Backup zone"
        >
          <rect
            x="50"
            y="275"
            width="95"
            height="65"
            rx="8"
            fill={zones.gas.colorLight}
            stroke={zoneStroke("gas")}
            strokeWidth="2.5"
          />
          {/* Generator symbol */}
          <circle cx="97" cy="300" r="16" fill="#6B7280" opacity="0.3" />
          <circle cx="97" cy="300" r="8" fill="#6B7280" opacity="0.5" />
          <text
            x="97"
            y="332"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontSize="8"
            fontWeight="600"
            fill="#6B7280"
          >
            GAS · 50–80 MW
          </text>
        </g>

        {/* ── QLD environment badges ── */}
        {badges.map((badge, i) => (
          <g key={i}>
            <rect
              x={badge.x}
              y={badge.y}
              width={badge.label.length * 6.8 + 16}
              height={22}
              rx="11"
              fill="white"
              stroke="#5C6F2D"
              strokeWidth="1"
              opacity="0.85"
            />
            <text
              x={badge.x + 8}
              y={badge.y + 15}
              fontFamily="system-ui, sans-serif"
              fontSize="9.5"
              fontWeight="500"
              fill="#5C6F2D"
            >
              ✦ {badge.label}
            </text>
          </g>
        ))}
      </svg>

      {/* ── Tooltip ── */}
      <AnimatePresence>
        {displayZone && zones[displayZone as ZoneId] && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg border border-divider px-4 py-3 pointer-events-none max-w-[260px] z-10"
          >
            <p className="font-semibold text-[13px] text-text-primary">
              {zones[displayZone as ZoneId].label}
            </p>
            <p className="text-[12px] text-text-secondary mt-0.5">
              {zones[displayZone as ZoneId].capacity} — {zones[displayZone as ZoneId].desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
