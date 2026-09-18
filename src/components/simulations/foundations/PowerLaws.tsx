"use client";
import { useMemo, useState } from "react";
import { powerLaw } from "@/lib/simulations/foundations";
import { Experiment, Slider, Stats, Notice, percent } from "./Shared";
const initial = { exponent: 1.2, count: 50, seed: 42 };
export default function PowerLaws() {
  const [input, set] = useState(initial);
  const update = (p: Partial<typeof initial>) => set((v) => ({ ...v, ...p }));
  const r = useMemo(
    () => powerLaw(input.exponent, input.count, input.seed),
    [input],
  );
  const max = Math.max(...r.draws, 1),
    width = 510 / input.count;
  return (
    <Experiment
      title="A few take a large share."
      description="Allocate 1,000 visits among ranked pages. Change how strongly rank attracts attention."
      number="005"
      reset={() => set(initial)}
      resample={() => update({ seed: input.seed + 1 })}
    >
      <div className="foundation-controls">
        <Slider
          id="rank-exponent"
          label="Rank exponent"
          value={input.exponent}
          min={0}
          max={2}
          step={0.1}
          onChange={(exponent) => update({ exponent })}
        />
        <Slider
          id="page-count"
          label="Number of pages"
          value={input.count}
          min={10}
          max={100}
          step={10}
          onChange={(count) => update({ count })}
        />
      </div>
      <div className="foundation-chart">
        <svg
          viewBox="0 0 600 300"
          role="img"
          aria-label="Visits per page in fixed rank order, with the top tenth highlighted"
        >
          {[0, 0.5, 1].map((t) => (
            <g key={t}>
              <line
                x1="55"
                x2="565"
                y1={245 - t * 200}
                y2={245 - t * 200}
                stroke="var(--border)"
              />
              <text x="45" y={249 - t * 200} textAnchor="end">
                {Math.round(t * max)}
              </text>
            </g>
          ))}
          {r.draws.map((n, i) => (
            <rect
              key={i}
              x={55 + i * width}
              y={245 - (n / max) * 200}
              width={Math.max(1, width - 2)}
              height={(n / max) * 200}
              fill={i < r.top ? "var(--accent)" : "var(--muted)"}
              opacity={i < r.top ? 1 : 0.45}
            />
          ))}
          <text x="55" y="20">
            Visits
          </text>
          <text x="55" y="270">
            Rank 1
          </text>
          <text x="565" y="270" textAnchor="end">
            Rank {input.count}
          </text>
          <text x="300" y="295" textAnchor="middle">
            Fixed popularity rank →
          </text>
        </svg>
      </div>
      <Stats
        items={[
          ["Top 10% · sampled share", percent(r.observedTop)],
          ["Top 10% · expected share", percent(r.expectedTop)],
          ["Most popular page · visits", String(r.draws[0])],
        ]}
      />
      <Notice>
        <strong>
          {input.exponent === 0
            ? "Equal chances do not give identical counts."
            : "Concentration comes from the rule."}
        </strong>{" "}
        Each page’s probability is proportional to rank raised to −
        {input.exponent.toFixed(1)}. The blue bars are the top {r.top} ranks.
        Resample to see how 1,000 random visits differ from their expected
        shares.
      </Notice>
      <button
        className="foundation-prompt"
        onClick={() => update({ exponent: input.exponent === 0 ? 2 : 0 })}
      >
        Try this:{" "}
        {input.exponent === 0
          ? "concentrate the attention"
          : "give every page an equal chance"}{" "}
        ↗
      </button>
      <p className="simulation-disclaimer">
        A finite, imposed rank power law (Zipf-style), not evidence that real
        traffic follows it. Rank stays fixed; the vertical scale adapts to the
        largest count.
      </p>
    </Experiment>
  );
}
