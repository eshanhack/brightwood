"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/*
 * Data points derived from AEMO ESOO 2025, Oxford Economics, CEFC/Baringa:
 *   - Grid available capacity for new DC connections (declining as coal retires + demand grows)
 *   - Data centre power demand (growing ~25% p.a. from ~0.5 GW in 2024)
 *   - The gap = unmet demand = the Brightwood opportunity
 *
 * Units: GW (capacity/demand)
 */

const YEARS = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];

// Available grid capacity for NEW data centre connections (GW)
// Declining as coal retires (11 GW by 2035) and existing demand grows
const gridCapacity = [1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.5, 0.4, 0.4, 0.3];

// Data centre power demand (GW) — ~25% CAGR from 0.5 GW base
const dcDemand = [0.5, 0.7, 0.9, 1.1, 1.4, 1.8, 2.3, 2.9, 3.6, 4.2, 5.0, 6.0];

const FONT = "Inter, system-ui, sans-serif";

// Chart dimensions
const W = 800;
const H = 340;
const PAD = { top: 20, right: 30, bottom: 50, left: 55 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const MAX_Y = 7;

function xPos(i: number) {
  return PAD.left + (i / (YEARS.length - 1)) * PLOT_W;
}
function yPos(v: number) {
  return PAD.top + PLOT_H - (v / MAX_Y) * PLOT_H;
}

function toLinePath(data: number[]) {
  return data
    .map((v, i) => `${i === 0 ? "M" : "L"}${xPos(i).toFixed(1)},${yPos(v).toFixed(1)}`)
    .join(" ");
}

function toAreaPath(data: number[], baseline: number[]) {
  const top = data
    .map((v, i) => `${i === 0 ? "M" : "L"}${xPos(i).toFixed(1)},${yPos(v).toFixed(1)}`)
    .join(" ");
  const bottom = [...baseline]
    .reverse()
    .map(
      (v, j) =>
        `L${xPos(baseline.length - 1 - j).toFixed(1)},${yPos(v).toFixed(1)}`
    )
    .join(" ");
  return `${top} ${bottom} Z`;
}

interface TooltipData {
  year: number;
  grid: number;
  demand: number;
  gap: number;
  x: number;
}

export default function EnergyGapChart({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [progress, setProgress] = useState(0);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const hasAnimated = useRef(false);

  // Animate drawing on scroll
  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setProgress(1);
      return;
    }

    const start = performance.now();
    const duration = 1800;

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView]);

  // Clip data to current animation progress
  const visibleCount = Math.max(1, Math.round(progress * YEARS.length));
  const clippedGrid = gridCapacity.slice(0, visibleCount);
  const clippedDemand = dcDemand.slice(0, visibleCount);

  // For the gap area, only show where demand > grid
  const gapTopData = clippedDemand.map((d, i) =>
    d > clippedGrid[i] ? d : clippedGrid[i]
  );
  const gapBottomData = clippedGrid.slice(0, visibleCount);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * W;
      const relX = mouseX - PAD.left;
      const idx = Math.round((relX / PLOT_W) * (YEARS.length - 1));
      const clamped = Math.max(0, Math.min(idx, YEARS.length - 1));

      if (clamped < visibleCount) {
        const gap = Math.max(0, dcDemand[clamped] - gridCapacity[clamped]);
        setTooltip({
          year: YEARS[clamped],
          grid: gridCapacity[clamped],
          demand: dcDemand[clamped],
          gap,
          x: xPos(clamped),
        });
      }
    },
    [visibleCount]
  );

  const gapAtEnd = dcDemand[dcDemand.length - 1] - gridCapacity[gridCapacity.length - 1];

  return (
    <div ref={containerRef} className={className}>
      <div className="bg-white rounded-xl border border-divider p-4 sm:p-6 lg:p-8">
        {/* Legend */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-olive" />
            <span className="text-text-secondary">Available grid capacity for DCs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red" />
            <span className="text-text-secondary">Data centre power demand</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-3 rounded-sm bg-red/15" />
            <span className="text-text-secondary">Unmet demand (the gap)</span>
          </div>
        </div>

        {/* SVG Chart */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full cursor-crosshair select-none"
          role="img"
          aria-label="Chart showing growing gap between data centre power demand and available grid capacity from 2024 to 2035"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltip(null)}
        >
          <title>Energy Gap: Grid Capacity vs Data Centre Demand</title>

          {/* Y-axis grid lines */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((v) => (
            <g key={v}>
              <line
                x1={PAD.left}
                y1={yPos(v)}
                x2={W - PAD.right}
                y2={yPos(v)}
                stroke="#E8E5E1"
                strokeWidth="1"
              />
              <text
                x={PAD.left - 10}
                y={yPos(v) + 4}
                textAnchor="end"
                fill="#857F78"
                fontSize="11"
                fontFamily={FONT}
              >
                {v}
              </text>
            </g>
          ))}

          {/* Y-axis label */}
          <text
            x={14}
            y={PAD.top + PLOT_H / 2}
            textAnchor="middle"
            fill="#857F78"
            fontSize="11"
            fontFamily={FONT}
            transform={`rotate(-90, 14, ${PAD.top + PLOT_H / 2})`}
          >
            GW
          </text>

          {/* X-axis labels */}
          {YEARS.map((year, i) => (
            <text
              key={year}
              x={xPos(i)}
              y={H - 15}
              textAnchor="middle"
              fill="#857F78"
              fontSize="11"
              fontFamily={FONT}
            >
              {year}
            </text>
          ))}

          {/* Gap area (red tint between demand and grid where demand > grid) */}
          {visibleCount > 1 && (
            <path
              d={toAreaPath(gapTopData, gapBottomData)}
              fill="#CD412B"
              opacity="0.12"
            />
          )}

          {/* Grid capacity line */}
          {visibleCount > 1 && (
            <path
              d={toLinePath(clippedGrid)}
              fill="none"
              stroke="#5C6F2D"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* DC demand line */}
          {visibleCount > 1 && (
            <path
              d={toLinePath(clippedDemand)}
              fill="none"
              stroke="#CD412B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Dots on lines */}
          {clippedGrid.map((v, i) => (
            <circle
              key={`g-${i}`}
              cx={xPos(i)}
              cy={yPos(v)}
              r="3.5"
              fill="#5C6F2D"
              stroke="#FAF9F6"
              strokeWidth="1.5"
            />
          ))}
          {clippedDemand.map((v, i) => (
            <circle
              key={`d-${i}`}
              cx={xPos(i)}
              cy={yPos(v)}
              r="3.5"
              fill="#CD412B"
              stroke="#FAF9F6"
              strokeWidth="1.5"
            />
          ))}

          {/* Gap label at end of animation */}
          {progress > 0.9 && (
            <>
              {/* Gap bracket */}
              <line
                x1={xPos(11) + 14}
                y1={yPos(dcDemand[11])}
                x2={xPos(11) + 14}
                y2={yPos(gridCapacity[11])}
                stroke="#CD412B"
                strokeWidth="2"
                strokeDasharray="4,3"
                opacity={progress > 0.95 ? 1 : 0}
              />
              <text
                x={xPos(11) + 28}
                y={(yPos(dcDemand[11]) + yPos(gridCapacity[11])) / 2 + 4}
                fill="#CD412B"
                fontSize="13"
                fontWeight="600"
                fontFamily={FONT}
                opacity={progress > 0.95 ? 1 : 0}
              >
                {gapAtEnd.toFixed(1)} GW gap
              </text>
            </>
          )}

          {/* Tooltip hover line + values */}
          {tooltip && (
            <>
              <line
                x1={tooltip.x}
                y1={PAD.top}
                x2={tooltip.x}
                y2={PAD.top + PLOT_H}
                stroke="#3D3B38"
                strokeWidth="1"
                strokeDasharray="3,3"
                opacity="0.3"
              />
              {/* Tooltip box */}
              <rect
                x={tooltip.x > W / 2 ? tooltip.x - 155 : tooltip.x + 10}
                y={PAD.top + 8}
                width="145"
                height="76"
                rx="6"
                fill="#3D3B38"
                opacity="0.92"
              />
              <text
                x={tooltip.x > W / 2 ? tooltip.x - 82 : tooltip.x + 82}
                y={PAD.top + 28}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="12"
                fontWeight="600"
                fontFamily={FONT}
              >
                {tooltip.year}
              </text>
              <text
                x={tooltip.x > W / 2 ? tooltip.x - 140 : tooltip.x + 24}
                y={PAD.top + 46}
                fill="#8BA04A"
                fontSize="11"
                fontFamily={FONT}
              >
                Grid: {tooltip.grid.toFixed(1)} GW
              </text>
              <text
                x={tooltip.x > W / 2 ? tooltip.x - 140 : tooltip.x + 24}
                y={PAD.top + 62}
                fill="#E87070"
                fontSize="11"
                fontFamily={FONT}
              >
                Demand: {tooltip.demand.toFixed(1)} GW
              </text>
              <text
                x={tooltip.x > W / 2 ? tooltip.x - 140 : tooltip.x + 24}
                y={PAD.top + 78}
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="600"
                fontFamily={FONT}
              >
                Gap: {tooltip.gap.toFixed(1)} GW
              </text>
            </>
          )}
        </svg>

        {/* Caption */}
        <p className="mt-4 text-xs text-text-muted/60 text-center">
          Illustrative projection based on AEMO ESOO 2025, CEFC/Baringa Dec 2025,
          Oxford Economics Nov 2025. Hover/tap for values.
        </p>
      </div>

      {/* Callout stat — animated */}
      {progress > 0.9 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-5 bg-red-tint rounded-lg border border-red/20 flex items-center gap-4 max-w-xl"
        >
          <div className="shrink-0 w-14 h-14 rounded-full bg-red/10 flex items-center justify-center">
            <span className="font-serif text-xl text-red">
              {gapAtEnd.toFixed(1)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-text-primary text-[15px]">
              GW of unmet demand by 2035
            </p>
            <p className="text-text-muted text-sm mt-0.5">
              The grid can&apos;t close this gap. Dedicated power can.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
