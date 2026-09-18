"use client";
import { useSyncExternalStore } from "react";
import { scaleLinear } from "d3-scale";
import type { LindyInput, LindyOutput } from "@/lib/simulations/lindy";

const subscribeToViewport = (notify: () => void) => {
  const query = window.matchMedia("(max-width: 760px)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const getMobile = () => window.matchMedia("(max-width: 760px)").matches;
const getServerMobile = () => false;
const tickLabel = (value: number) =>
  value >= 10000
    ? `${Math.round(value / 1000)}k`
    : Math.round(value).toLocaleString("en-US");

export function LindyChart({
  input,
  result,
}: {
  input: LindyInput;
  result: LindyOutput;
}) {
  const mobile = useSyncExternalStore(
    subscribeToViewport,
    getMobile,
    getServerMobile,
  );
  const width = mobile ? 420 : 900;
  const left = mobile ? 16 : 44;
  const now = mobile ? 95 : 225;
  const right = width - (mobile ? 22 : 50);
  const horizon = Math.max(500, Math.ceil((result.q95 * 1.06) / 250) * 250);
  const x = scaleLinear().domain([0, horizon]).range([now, right]);
  // Representative ordered quantiles preserve the distribution's shape.
  // Keep a 500-year reference window, expanding in 250-year increments
  // when needed to include at least 95% of the samples.
  const rows = Array.from(
    { length: 38 },
    (_, i) =>
      result.samples[Math.floor((i * (result.samples.length - 1)) / 37)],
  );
  const ticks = x.ticks(mobile ? 3 : 5).filter((value) => value > 0);
  return (
    <div className="chart-wrap">
      <svg
        className={`lindy-chart ${mobile ? "mobile-chart" : ""}`}
        viewBox={`0 0 ${width} 335`}
        role="img"
        aria-labelledby="lindy-chart-title lindy-chart-desc"
      >
        <title id="lindy-chart-title">Possible remaining lifetimes</title>
        <desc id="lindy-chart-desc">
          Observed age {input.age} years. Median simulated remaining life{" "}
          {Math.round(result.median)} years. The middle half ranges from{" "}
          {Math.round(result.q25)} to {Math.round(result.q75)} years. Past and
          future use separate scales. Futures beyond {horizon} years have arrow
          markers. Thirty-eight representative paths are displayed.
        </desc>
        <defs>
          <clipPath id="future-clip">
            <rect x={now} y="40" width={right - now} height="227" />
          </clipPath>
        </defs>
        <rect
          x={now}
          y="42"
          width={right - now}
          height="225"
          fill="var(--chart-surface)"
        />
        <text x={left} y="24" className="chart-label">
          {mobile ? "PAST" : "OBSERVED LIFETIME"}
        </text>
        <text x={now + 16} y="24" className="chart-label" fill="var(--accent)">
          POSSIBLE FUTURES
        </text>
        {!mobile && (
          <text x={right} y="24" textAnchor="end" className="chart-label">
            38 representative paths
          </text>
        )}
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={x(tick)}
              x2={x(tick)}
              y1="43"
              y2="267"
              stroke="var(--border)"
              strokeDasharray="2 5"
            />
            <text
              x={x(tick)}
              y="294"
              textAnchor="middle"
              className="chart-tick"
            >
              +{tickLabel(tick)}
            </text>
          </g>
        ))}
        <rect
          x={x(result.q25)}
          y="43"
          width={x(result.q75) - x(result.q25)}
          height="224"
          fill="var(--accent)"
          opacity=".055"
        />
        {rows.map((value, i) => {
          const y = 52 + i * 5.45;
          return (
            <g key={i}>
              <line
                x1={left}
                x2={now}
                y1={y}
                y2={y}
                stroke="var(--foreground)"
                opacity=".15"
              />
              <line
                clipPath="url(#future-clip)"
                x1={now}
                x2={x(value)}
                y1={y}
                y2={y}
                stroke="var(--accent)"
                opacity={0.18 + i * 0.014}
              />
              {x(value) <= right ? (
                <circle
                  cx={x(value)}
                  cy={y}
                  r="1.6"
                  fill="var(--accent)"
                  opacity=".65"
                />
              ) : (
                <path
                  d={`M${right - 6} ${y - 2} L${right - 1} ${y} L${right - 6} ${y + 2}`}
                  fill="none"
                  stroke="var(--accent)"
                />
              )}
            </g>
          );
        })}
        <line
          x1={now}
          x2={now}
          y1="38"
          y2="273"
          stroke="var(--foreground)"
          strokeWidth="1.2"
        />
        <line
          x1={x(result.median)}
          x2={x(result.median)}
          y1="40"
          y2="266"
          stroke="var(--accent)"
          strokeDasharray="3 4"
        />
        <text x={left} y="294" className="chart-tick">
          −{input.age}
        </text>
        <text
          x={now}
          y="294"
          textAnchor="middle"
          className="chart-tick present-label"
        >
          Now
        </text>
        <text x={right} y="320" textAnchor="end" className="chart-tick">
          Remaining years →
        </text>
      </svg>
      <div className="chart-caption">
        <span>
          <i /> Shaded: middle 50% · Dashed blue: median
        </span>
        <span>Separate time scales · Arrows: beyond the horizon</span>
      </div>
    </div>
  );
}
