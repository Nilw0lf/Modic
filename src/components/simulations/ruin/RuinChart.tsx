"use client";
import { useSyncExternalStore } from "react";
import { scaleLinear, scaleSymlog } from "d3-scale";
import { quantileSorted } from "d3-array";
import type {
  GamblerRuinInput,
  SingleLifeResult,
  ManyLivesResult,
} from "@/lib/simulations/gamblers-ruin";
import { wealthFormat } from "./format";
const subscribe = (notify: () => void) => {
  const media = window.matchMedia("(max-width:760px)");
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const compact = () => window.matchMedia("(max-width:760px)").matches;
export type RuinRun = { input: GamblerRuinInput; seed: number } & (
  | { mode: "one"; result: SingleLifeResult }
  | { mode: "many"; result: ManyLivesResult }
);
export function RuinChart({ run }: { run: RuinRun }) {
  const mobile = useSyncExternalStore(subscribe, compact, () => false);
  const width = mobile ? 430 : 950,
    left = mobile ? 66 : 78,
    right = width - 24,
    top = 25,
    bottom = 285;
  const { input } = run;
  const upper =
    run.mode === "one"
      ? Math.max(input.wealth, run.result.maximumWealth) * 1.15
      : Math.max(
          input.wealth * 1.2,
          quantileSorted(run.result.endingWealth, 0.95)!,
          ...run.result.bands.map((b) => b.q75),
        ) * 1.15;
  const x = scaleLinear().domain([0, input.rounds]).range([left, right]);
  // Symmetric log keeps zero representable; above the threshold this behaves
  // like a logarithmic scale, so extraordinary winners do not flatten the rest.
  const y = scaleSymlog()
    .constant(Math.max(1, input.threshold * 0.1))
    .domain([0, upper])
    .range([bottom, top]);
  const path = (values: number[]) =>
    values
      .map(
        (value, i) =>
          `${i ? "L" : "M"}${x(i).toFixed(2)},${y(value).toFixed(2)}`,
      )
      .join(" ");
  const ticks = Array.from({ length: 5 }, (_, i) =>
    y.invert(bottom - (i * (bottom - top)) / 4),
  );
  const description =
    run.mode === "one"
      ? `One life ends at ${wealthFormat(run.result.finalWealth)} wealth units.${run.result.ruinRound === null ? " The threshold was not reached." : ` Ruin occurred in round ${run.result.ruinRound}.`}`
      : `${run.result.count} lives; ${(run.result.ruinProbability * 100).toFixed(1)}% reached ruin. The median ends at ${wealthFormat(run.result.medianEndingWealth)}. Blue shading is the cross-sectional 25–75% range, not an individual path.`;
  return (
    <div className="ruin-chart-wrap">
      <svg
        className="ruin-chart"
        viewBox={`0 0 ${width} 335`}
        role="img"
        aria-labelledby="ruin-chart-title ruin-chart-desc"
      >
        <title id="ruin-chart-title">
          {run.mode === "one"
            ? "One life, round by round"
            : "Many lives, many possible endings"}
        </title>
        <desc id="ruin-chart-desc">
          {description} Wealth uses a symmetric logarithmic scale. Ruined lives
          stop at their remaining wealth. Outlying paths above the displayed
          range are clipped; all outcomes enter the statistics.
        </desc>
        <defs>
          <clipPath id="ruin-plot-clip">
            <rect x={left} y={top} width={right - left} height={bottom - top} />
          </clipPath>
        </defs>
        {ticks.map((tick, i) => (
          <g key={i}>
            <line
              x1={left}
              x2={right}
              y1={y(tick)}
              y2={y(tick)}
              stroke="var(--border)"
              opacity=".6"
            />
            <text
              x={left - 10}
              y={y(tick) + 4}
              textAnchor="end"
              className="chart-tick"
            >
              {tick === 0
                ? "0"
                : tick >= 1e6
                  ? tick.toExponential(0)
                  : wealthFormat(tick)}
            </text>
          </g>
        ))}
        {x.ticks(mobile ? 3 : 5).map((tick) => (
          <text
            key={tick}
            x={x(tick)}
            y="309"
            textAnchor="middle"
            className="chart-tick"
          >
            {tick}
          </text>
        ))}
        <g clipPath="url(#ruin-plot-clip)">
          {run.mode === "many" ? (
            <>
              <path
                className="ruin-band"
                d={`${run.result.bands.map((b, i) => `${i ? "L" : "M"}${x(b.round)},${y(b.q75)}`).join(" ")} ${[
                  ...run.result.bands,
                ]
                  .reverse()
                  .map((b) => `L${x(b.round)},${y(b.q25)}`)
                  .join(" ")}Z`}
                fill="var(--accent)"
                opacity=".12"
              />
              {run.result.sampledPaths.map((life, i) => (
                <path
                  key={i}
                  d={path(life.path)}
                  fill="none"
                  stroke={
                    life.ruinRound !== null
                      ? "var(--negative)"
                      : "var(--accent)"
                  }
                  opacity=".13"
                  strokeWidth="1"
                />
              ))}
              <path
                d={run.result.bands
                  .map((b, i) => `${i ? "L" : "M"}${x(b.round)},${y(b.median)}`)
                  .join(" ")}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.3"
              />
            </>
          ) : (
            <path
              d={path(run.result.path)}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />
          )}
          <line
            x1={left}
            x2={right}
            y1={y(input.threshold)}
            y2={y(input.threshold)}
            stroke="var(--negative)"
            strokeDasharray="4 4"
          />
          {run.mode === "one" && run.result.ruinRound !== null && (
            <circle
              cx={x(run.result.ruinRound)}
              cy={y(run.result.finalWealth)}
              r="5"
              fill="var(--negative)"
            />
          )}
        </g>
        <text
          x={right}
          y={Math.max(top + 13, y(input.threshold) - 8)}
          textAnchor="end"
          className="ruin-threshold-label"
        >
          Ruin ≤ {wealthFormat(input.threshold)}
        </text>
        <text x={left} y="14" className="chart-label">
          WEALTH · SYMLOG SCALE
        </text>
        <text x={right} y="330" textAnchor="end" className="chart-tick">
          Rounds →
        </text>
      </svg>
      <div className="chart-caption">
        <span>
          {run.mode === "many"
            ? "Blue line: median · Band: middle 50% · Up to 24 sampled lives"
            : "Blue line: wealth · Red point: first ruin crossing"}
        </span>
        <span>
          {run.mode === "many"
            ? "Extreme paths may be clipped; statistics include every life."
            : "After ruin, the remaining wealth is held constant."}
        </span>
      </div>
    </div>
  );
}
