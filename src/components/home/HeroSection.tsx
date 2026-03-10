"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function EnergyGrid() {
  const nodes = [
    { cx: 60, cy: 50 },
    { cx: 160, cy: 30 },
    { cx: 260, cy: 70 },
    { cx: 360, cy: 40 },
    { cx: 140, cy: 120 },
    { cx: 240, cy: 140 },
    { cx: 340, cy: 110 },
    { cx: 100, cy: 190 },
    { cx: 200, cy: 210 },
    { cx: 300, cy: 180 },
    { cx: 400, cy: 160 },
    { cx: 180, cy: 270 },
    { cx: 280, cy: 250 },
    { cx: 380, cy: 230 },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [0, 4], [1, 4], [2, 5],
    [3, 6], [4, 5], [5, 6], [4, 7], [5, 8], [6, 10],
    [7, 8], [8, 9], [9, 10], [8, 11], [9, 12], [10, 13],
    [11, 12], [12, 13],
  ];

  return (
    <svg viewBox="0 0 460 300" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5C6F2D" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#5C6F2D" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#5C6F2D" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="nodeGrad">
          <stop offset="0%" stopColor="#8BA04A" />
          <stop offset="100%" stopColor="#5C6F2D" />
        </radialGradient>
      </defs>

      {/* Connection lines */}
      {connections.map(([a, b], i) => (
        <line
          key={`line-${i}`}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="#5C6F2D"
          strokeOpacity="0.15"
          strokeWidth="1"
        />
      ))}

      {/* Animated particles along connections */}
      {connections.filter((_, i) => i % 3 === 0).map(([a, b], i) => (
        <circle key={`particle-${i}`} r="2.5" fill="#8BA04A" opacity="0">
          <animateMotion
            dur={`${3 + i * 0.7}s`}
            repeatCount="indefinite"
            path={`M${nodes[a].cx},${nodes[a].cy} L${nodes[b].cx},${nodes[b].cy}`}
          />
          <animate
            attributeName="opacity"
            values="0;0.8;0.8;0"
            dur={`${3 + i * 0.7}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={`node-${i}`} className="energy-node">
          <circle
            cx={node.cx}
            cy={node.cy}
            r="6"
            fill="#FAF9F6"
            stroke="#5C6F2D"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <circle
            cx={node.cx}
            cy={node.cy}
            r="3"
            fill="url(#nodeGrad)"
            opacity="0.7"
          >
            <animate
              attributeName="opacity"
              values="0.4;0.9;0.4"
              dur={`${2 + (i % 4) * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-[72px] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left - Text */}
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="font-serif text-[48px] sm:text-[64px] lg:text-[80px] leading-[1.05] text-text-primary"
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
              className="mt-6 text-lg lg:text-xl text-text-secondary leading-relaxed"
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
                className="inline-flex items-center mt-8 px-7 py-3.5 bg-olive text-white text-[15px] font-medium rounded-[7px] hover:bg-olive-dark transition-colors duration-200"
              >
                Learn More
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right - Energy Grid Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:block w-full max-w-[500px] ml-auto"
          >
            <EnergyGrid />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
