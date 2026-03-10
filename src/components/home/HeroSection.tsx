"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

/* ── Animated mesh gradient background ── */
function AnimatedBackground() {
  const blobs = [
    { x: "15%", y: "20%", size: 400, color: "#5C6F2D", delay: 0 },
    { x: "70%", y: "60%", size: 350, color: "#8BA04A", delay: 5 },
    { x: "40%", y: "75%", size: 300, color: "#5C6F2D", delay: 10 },
    { x: "85%", y: "25%", size: 280, color: "#4A5A23", delay: 15 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color}22 0%, transparent 70%)`,
            left: blob.x,
            top: blob.y,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -25, 15, -10, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blob.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ── Energy Grid SVG animation ── */
function EnergyGrid() {
  const nodes = [
    { cx: 50, cy: 40 },
    { cx: 150, cy: 20 },
    { cx: 260, cy: 55 },
    { cx: 370, cy: 25 },
    { cx: 460, cy: 50 },
    { cx: 110, cy: 110 },
    { cx: 210, cy: 130 },
    { cx: 320, cy: 105 },
    { cx: 420, cy: 120 },
    { cx: 60, cy: 190 },
    { cx: 170, cy: 200 },
    { cx: 280, cy: 185 },
    { cx: 380, cy: 195 },
    { cx: 470, cy: 180 },
    { cx: 120, cy: 265 },
    { cx: 240, cy: 260 },
    { cx: 350, cy: 255 },
    { cx: 450, cy: 250 },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [1, 5], [2, 6], [3, 7], [4, 8],
    [5, 6], [6, 7], [7, 8],
    [5, 9], [5, 10], [6, 10], [6, 11], [7, 11], [7, 12], [8, 12], [8, 13],
    [9, 10], [10, 11], [11, 12], [12, 13],
    [9, 14], [10, 14], [10, 15], [11, 15], [11, 16], [12, 16], [13, 17],
    [14, 15], [15, 16], [16, 17],
  ];

  return (
    <svg viewBox="0 0 520 290" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="nodeGrad">
          <stop offset="0%" stopColor="#8BA04A" />
          <stop offset="100%" stopColor="#5C6F2D" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {connections.map(([a, b], i) => (
        <line
          key={`l-${i}`}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="#5C6F2D"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
      ))}

      {connections.filter((_, i) => i % 2 === 0).map(([a, b], i) => (
        <circle key={`p-${i}`} r="2" fill="#8BA04A" opacity="0" filter="url(#glow)">
          <animateMotion
            dur={`${2.5 + (i % 5) * 0.6}s`}
            repeatCount="indefinite"
            begin={`${(i * 0.4) % 3}s`}
            path={`M${nodes[a].cx},${nodes[a].cy} L${nodes[b].cx},${nodes[b].cy}`}
          />
          <animate
            attributeName="opacity"
            values="0;0.7;0.7;0"
            dur={`${2.5 + (i % 5) * 0.6}s`}
            repeatCount="indefinite"
            begin={`${(i * 0.4) % 3}s`}
          />
        </circle>
      ))}

      {nodes.map((node, i) => (
        <g key={`n-${i}`} className="energy-node">
          <circle
            cx={node.cx}
            cy={node.cy}
            r="7"
            fill="#FAF9F6"
            stroke="#5C6F2D"
            strokeWidth="1.5"
            strokeOpacity="0.3"
          />
          <circle cx={node.cx} cy={node.cy} r="3.5" fill="url(#nodeGrad)">
            <animate
              attributeName="opacity"
              values="0.35;0.85;0.35"
              dur={`${2.2 + (i % 3) * 0.6}s`}
              repeatCount="indefinite"
              begin={`${(i * 0.3) % 2}s`}
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}

/* ── Hero stat bar ── */
const heroStats = [
  { value: 6, suffix: " GW", label: "Capacity pipeline" },
  { value: 18, suffix: "–24 mo", label: "To operational" },
  { value: 99.99, suffix: "%", label: "Uptime target", decimals: 2 },
  { label: "Energy cost", staticValue: "~$110/MWh" },
];

export default function HeroSection() {
  return (
    <section className="min-h-[100dvh] flex items-center pt-[60px] sm:pt-[72px] relative overflow-hidden">
      <AnimatedBackground />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full py-16 lg:py-0 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-16 items-center">
          {/* Left — Text */}
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="font-serif text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[1.05] text-text-primary"
            >
              Dedicated Power for the AI Era
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="mt-6 text-lg lg:text-[19px] text-text-secondary leading-[1.7]"
            >
              Every AI application depends on five layers of infrastructure.
              Energy is the foundation. We build it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 mt-8"
            >
              <Link
                href="#problem"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-olive text-white text-[15px] font-medium rounded-lg hover:bg-olive-dark transition-all duration-200 hover:shadow-lg"
              >
                See How It Works
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-7 py-3.5 border-2 border-olive/30 text-olive text-[15px] font-medium rounded-lg hover:border-olive/50 hover:bg-olive/5 transition-all duration-200"
              >
                Talk to Us
              </Link>
            </motion.div>

            {/* Hero stat bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-10 grid grid-cols-4 gap-0 border border-divider rounded-lg bg-white/60 backdrop-blur-sm overflow-hidden"
            >
              {heroStats.map((stat, i) => (
                <div
                  key={i}
                  className={`px-3 py-3 ${i > 0 ? "border-l border-divider" : ""}`}
                >
                  <p className="text-[10px] uppercase tracking-wider text-text-muted font-medium leading-tight">
                    {stat.label}
                  </p>
                  <p className="font-serif text-[18px] text-text-primary mt-1 whitespace-nowrap">
                    {"staticValue" in stat && stat.staticValue ? (
                      stat.staticValue
                    ) : (
                      <AnimatedCounter
                        target={stat.value ?? 0}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        className="inherit"
                      />
                    )}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Energy Grid Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="w-full max-w-[560px] mx-auto lg:ml-auto"
          >
            <EnergyGrid />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
