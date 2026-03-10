"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

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

      {/* Connection lines */}
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

      {/* Animated particles — more of them, varied speeds */}
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

      {/* Nodes */}
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
          <circle
            cx={node.cx}
            cy={node.cy}
            r="3.5"
            fill="url(#nodeGrad)"
          >
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

export default function HeroSection() {
  return (
    <section className="min-h-[100dvh] flex items-center pt-[72px] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full py-16 lg:py-0">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-16 items-center">
          {/* Left — Text */}
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="font-serif text-[44px] sm:text-[60px] lg:text-[76px] xl:text-[84px] leading-[1.05] text-text-primary"
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
              We build, own, and operate solar + battery power stations
              purpose-built for AI data centres in regional Australia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link
                href="#problem"
                className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-olive text-white text-[15px] font-medium rounded-lg hover:bg-olive-dark transition-all duration-200 hover:shadow-lg"
              >
                Learn More
                <ChevronDown size={18} />
              </Link>
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
