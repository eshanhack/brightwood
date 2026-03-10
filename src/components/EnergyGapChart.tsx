"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/*
 * Pitch-deck style chart: NEM Demand, Grid Reliable Supply, DC Demand
 *
 * Based on AEMO ESOO 2025 Step Change, CEFC/Baringa Dec 2025:
 *   - Grid reliable supply declining as 11 GW coal retires by 2035
 *   - NEM base demand growing slowly (population, EVs, electrification)
 *   - Data centre demand growing ~25% CAGR from ~0.5 GW
 *   - Total demand = NEM base + DC demand
 *   - Shortfall = total demand − reliable supply (where positive)
 *
 * Units: GW
 */

const YEARS = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];

// Grid reliable supply (GW) — declining as coal retires
const reliableSupply = [33.0, 32.5, 32.0, 31.0, 30.0, 29.5, 29.0, 28.5, 28.0, 27.5, 27.0, 26.0];

// NEM base demand excluding DCs (GW) — slow organic growth
const nemBase = [32.0, 32.3, 32.6, 33.0, 33.3, 33.6, 34.0, 34.3, 34.7, 35.0, 35.4, 35.8];

// Data centre demand (GW) — ~25% CAGR
const dcDemand = [0.5, 0.7, 0.9, 1.1, 1.4, 1.8, 2.3, 2.9, 3.6, 4.2, 5.0, 6.0];

// Derived: total demand = NEM base + DC
const totalDemand = nemBase.map((n, i) => n + dcDemand[i]);

const FONT = "Inter, system-ui, sans-serif";

// Chart dims
const W = 820;
const H = 380;
const PAD = { top: 20, right: 60, bottom: 50, left: 55 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const MIN_Y = 22;
const MAX_Y = 44;
const Y_RANGE = MAX_Y - MIN_Y;

function xPos(i: number) {
  return PAD.left + (i / (YEARS.length - 1)) * PLOT_W;
}
function yPos(v: number) {
  return PAD.top + PLOT_H - ((v - MIN_Y) / Y_RANGE) * PLOT_H;
}

function toLinePath(data: number[], count: number) {
  return data
    .slice(0, count)
    .map((v, i) => `${i === 0 ? "M" : "L"}${xPos(i).toFixed(1)},${yPos(v).toFixed(1)}`)
    .join(" ");
}

function toAreaPath(topData: number[], bottomData: number[], count: number) {
  const top = topData
    .slice(0, count)
    .map((v, i) => `${i === 0 ? "M" : "L"}${xPos(i).toFixed(1)},${yPos(v).toFixed(1)}`)
    .join(" ");
  const bottom = bottomData
    .slice(0, count)
    .reverse()
    .map(
      (v, j) =>
        `L${xPos(count - 1 - j).toFixed(1)},${yPos(v).toFixed(1)}`
    )
    .join(" ");
  return `${top} ${bottom} Z`;
}

interface TooltipData {
  year: number;
  supply: number;
  nemBase: number;
  dc: number;
  total: number;
  shortfall: number;
  x: number;
}

export default function EnergyGapChart({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [progress, setProgress] = useState(0);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const hasAnimated = useRef(false);

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
    const duration = 2000;

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView]);

  const visibleCount = Math.max(2, Math.round(progress * YEARS.length));

  // Shortfall area: where total demand > reliable supply
  const shortfallTop = totalDemand.slice(0, visibleCount);
  const shortfallBottom = shortfallTop.map((td, i) =>
    Math.max(td, reliableSupply[i]) === td ? reliableSupply[i] : td
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * W;
      const relX = mouseX - PAD.left;
      const idx = Math.round((relX / PLOT_W) * (YEARS.length - 1));
      const clamped = Math.max(0, Math.min(idx, YEARS.length - 1));

      if (clamped < visibleCount) {
        const total = totalDemand[clamped];
        const supply = reliableSupply[clamped];
        setTooltip({
          year: YEARS[clamped],
          supply,
          nemBase: nemBase[clamped],
          dc: dcDemand[clamped],
          total,
          shortfall: Math.max(0, total - supply),
          x: xPos(clamped),
        });
      }
    },
    [visibleCount]
  );

  const finalShortfall = totalDemand[11] - reliableSupply[11];
  const lastIdx = YEARS.length - 1;

  return (
    <div ref={containerRef} className={className}>
      <div className="bg-white rounded-xl border border-divider p-4 sm:p-6 lg:p-8">
        {/* Legend */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6 text-[13px]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-0.5 bg-olive rounded" />
            <span className="text-text-secondary">Grid reliable supply</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-0.5 bg-text-muted rounded" />
            <span className="text-text-secondary">NEM demand (excl. DCs)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-3 rounded-sm bg-red/20 border border-red/30" />
            <span className="text-text-secondary">Data centre demand</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-3 rounded-sm bg-red/10 border border-red/20" style={{
              background: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(205,65,43,0.15) 2px, rgba(205,65,43,0.15) 4px)"
            }} />
            <span className="text-text-secondary">Shortfall</span>
          </div>
        </div>

        {/* SVG Chart */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full cursor-crosshair select-none"
          role="img"
          aria-label="Chart showing NEM demand, data centre demand growth, and declining grid reliable supply from 2024 to 2035"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltip(null)}
        >
          <title>Australia&apos;s Energy Gap: Supply vs Demand 2024–2035</title>

          {/* Y-axis grid lines */}
          {[24, 26, 28, 30, 32, 34, 36, 38, 40, 42].map((v) => (
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
                fontSize="10"
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
              fontSize="10"
              fontFamily={FONT}
            >
              {year}
            </text>
          ))}

          {/* DC demand area (stacked on NEM base) */}
          {visibleCount > 1 && (
            <path
              d={toAreaPath(
                totalDemand.slice(0, visibleCount),
                nemBase.slice(0, visibleCount),
                visibleCount
              )}
              fill="#CD412B"
              opacity="0.18"
            />
          )}

          {/* Shortfall area (hatched — where total > supply) */}
          {visibleCount > 1 && (
            <>
              <defs>
                <pattern
                  id="shortfall-hatch"
                  patternUnits="userSpaceOnUse"
                  width="6"
                  height="6"
                  patternTransform="rotate(45)"
                >
                  <line x1="0" y1="0" x2="0" y2="6" stroke="#CD412B" strokeWidth="1.5" opacity="0.25" />
                </pattern>
              </defs>
              <path
                d={toAreaPath(shortfallTop, shortfallBottom, visibleCount)}
                fill="url(#shortfall-hatch)"
              />
              <path
                d={toAreaPath(shortfallTop, shortfallBottom, visibleCount)}
                fill="#CD412B"
                opacity="0.06"
              />
            </>
          )}

          {/* Reliable supply line (olive, thick) */}
          {visibleCount > 1 && (
            <path
              d={toLinePath(reliableSupply, visibleCount)}
              fill="none"
              stroke="#5C6F2D"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* NEM base demand line (grey) */}
          {visibleCount > 1 && (
            <path
              d={toLinePath(nemBase, visibleCount)}
              fill="none"
              stroke="#857F78"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="6,4"
            />
          )}

          {/* Total demand line (NEM + DC, red, bold) */}
          {visibleCount > 1 && (
            <path
              d={toLinePath(totalDemand, visibleCount)}
              fill="none"
              stroke="#CD412B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* End-of-line labels (once fully drawn) */}
          {progress > 0.92 && (
            <>
              <text
                x={xPos(lastIdx) + 8}
                y={yPos(reliableSupply[lastIdx]) + 4}
                fill="#5C6F2D"
                fontSize="10"
                fontWeight="600"
                fontFamily={FONT}
              >
                Supply
              </text>
              <text
                x={xPos(lastIdx) + 8}
                y={yPos(totalDemand[lastIdx]) + 4}
                fill="#CD412B"
                fontSize="10"
                fontWeight="600"
                fontFamily={FONT}
              >
                Demand
              </text>
            </>
          )}

          {/* Shortfall bracket at 2035 */}
          {progress > 0.95 && (
            <>
              <line
                x1={xPos(lastIdx) - 8}
                y1={yPos(totalDemand[lastIdx])}
                x2={xPos(lastIdx) - 8}
                y2={yPos(reliableSupply[lastIdx])}
                stroke="#CD412B"
                strokeWidth="2"
              />
              {/* Top tick */}
              <line
                x1={xPos(lastIdx) - 13}
                y1={yPos(totalDemand[lastIdx])}
                x2={xPos(lastIdx) - 3}
                y2={yPos(totalDemand[lastIdx])}
                stroke="#CD412B"
                strokeWidth="2"
              />
              {/* Bottom tick */}
              <line
                x1={xPos(lastIdx) - 13}
                y1={yPos(reliableSupply[lastIdx])}
                x2={xPos(lastIdx) - 3}
                y2={yPos(reliableSupply[lastIdx])}
                stroke="#CD412B"
                strokeWidth="2"
              />
              {/* Label */}
              <text
                x={xPos(lastIdx) - 16}
                y={(yPos(totalDemand[lastIdx]) + yPos(reliableSupply[lastIdx])) / 2 + 4}
                textAnchor="end"
                fill="#CD412B"
                fontSize="12"
                fontWeight="700"
                fontFamily={FONT}
              >
                {finalShortfall.toFixed(0)} GW
              </text>
              <text
                x={xPos(lastIdx) - 16}
                y={(yPos(totalDemand[lastIdx]) + yPos(reliableSupply[lastIdx])) / 2 + 17}
                textAnchor="end"
                fill="#CD412B"
                fontSize="10"
                fontFamily={FONT}
              >
                shortfall
              </text>
            </>
          )}

          {/* Tooltip hover */}
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
              {/* Highlight dots */}
              <circle cx={tooltip.x} cy={yPos(tooltip.supply)} r="5" fill="#5C6F2D" stroke="#FAF9F6" strokeWidth="2" />
              <circle cx={tooltip.x} cy={yPos(tooltip.total)} r="5" fill="#CD412B" stroke="#FAF9F6" strokeWidth="2" />
              <circle cx={tooltip.x} cy={yPos(tooltip.nemBase)} r="4" fill="#857F78" stroke="#FAF9F6" strokeWidth="2" />

              {/* Tooltip box */}
              {(() => {
                const boxW = 175;
                const boxH = 100;
                const bx = tooltip.x > W / 2 ? tooltip.x - boxW - 14 : tooltip.x + 14;
                const by = PAD.top + 8;
                return (
                  <>
                    <rect x={bx} y={by} width={boxW} height={boxH} rx="6" fill="#3D3B38" opacity="0.94" />
                    <text x={bx + boxW / 2} y={by + 18} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700" fontFamily={FONT}>
                      {tooltip.year}
                    </text>
                    <text x={bx + 12} y={by + 38} fill="#8BA04A" fontSize="11" fontFamily={FONT}>
                      Reliable supply: {tooltip.supply.toFixed(1)} GW
                    </text>
                    <text x={bx + 12} y={by + 55} fill="#C0BDB8" fontSize="11" fontFamily={FONT}>
                      NEM demand: {tooltip.nemBase.toFixed(1)} GW
                    </text>
                    <text x={bx + 12} y={by + 72} fill="#E87070" fontSize="11" fontFamily={FONT}>
                      + DC demand: {tooltip.dc.toFixed(1)} GW
                    </text>
                    {tooltip.shortfall > 0 && (
                      <text x={bx + 12} y={by + 91} fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily={FONT}>
                        Shortfall: {tooltip.shortfall.toFixed(1)} GW
                      </text>
                    )}
                  </>
                );
              })()}
            </>
          )}
        </svg>

        {/* Caption */}
        <p className="mt-3 text-xs text-text-muted/60 text-center">
          Illustrative projection based on AEMO ESOO 2025, CEFC/Baringa Dec 2025, Oxford Economics Nov 2025. Hover for detail.
        </p>
      </div>

      {/* Callout stat */}
      {progress > 0.92 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-5 bg-red-tint rounded-lg border border-red/20 flex items-center gap-4 max-w-2xl"
        >
          <div className="shrink-0 w-14 h-14 rounded-full bg-red/10 flex items-center justify-center">
            <span className="font-serif text-xl text-red">
              {finalShortfall.toFixed(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-text-primary text-[15px]">
              GW shortfall by 2035 — and data centres are driving most of it
            </p>
            <p className="text-text-muted text-sm mt-0.5">
              Coal is retiring. Demand is surging. The grid can&apos;t close this gap. Dedicated power can.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
