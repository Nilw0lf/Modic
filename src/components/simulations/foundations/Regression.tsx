"use client";
import { useMemo, useState } from "react";
import { regression } from "@/lib/simulations/foundations";
import { Experiment, Slider, Stats, Notice } from "./Shared";
const initial = { noise: 15, selection: 10, seed: 42 };
export default function Regression() {
  const [input, set] = useState(initial);
  const update = (p: Partial<typeof initial>) => set((v) => ({ ...v, ...p }));
  const r = useMemo(
    () => regression(input.noise, input.selection, input.seed),
    [input],
  );
  const low =
    Math.floor(
      Math.min(0, ...r.people.flatMap((p) => [p.first, p.second])) / 10,
    ) * 10;
  const high =
    Math.ceil(
      Math.max(100, ...r.people.flatMap((p) => [p.first, p.second])) / 10,
    ) * 10;
  const x = (v: number) =>
      Number((55 + ((v - low) / (high - low)) * 470).toFixed(3)),
    y = (v: number) =>
      Number((275 - ((v - low) / (high - low)) * 240).toFixed(3));
  const ids = new Set(r.selected.map((p) => p.id));
  return (
    <Experiment
      title="Can a great result repeat?"
      description="Measure the same 200 people twice. Their underlying ability never changes."
      number="004"
      reset={() => set(initial)}
      resample={() => update({ seed: input.seed + 1 })}
    >
      <div className="foundation-controls">
        <Slider
          id="measurement-noise"
          label="Measurement noise"
          value={input.noise}
          min={0}
          max={30}
          onChange={(noise) => update({ noise })}
        />
        <Slider
          id="selected-group"
          label="Select the top"
          value={input.selection}
          min={5}
          max={50}
          step={5}
          suffix="%"
          onChange={(selection) => update({ selection })}
        />
      </div>
      <div className="foundation-chart">
        <svg
          viewBox="0 0 590 330"
          role="img"
          aria-label="First versus second scores; the highest first scores are highlighted"
        >
          <line
            x1="55"
            y1="275"
            x2="525"
            y2="35"
            stroke="var(--muted)"
            strokeDasharray="5 5"
            opacity=".5"
          />
          {[low, (low + high) / 2, high].map((v) => (
            <g key={v}>
              <text x={x(v)} y="297" textAnchor="middle">
                {v}
              </text>
              <text x="45" y={y(v) + 4} textAnchor="end">
                {v}
              </text>
            </g>
          ))}
          <path d="M55 35V275H525" fill="none" stroke="var(--border)" />
          {r.people.map((p) => (
            <circle
              key={p.id}
              cx={x(p.first)}
              cy={y(p.second)}
              r={ids.has(p.id) ? 4 : 2.5}
              fill={ids.has(p.id) ? "var(--accent)" : "var(--muted)"}
              opacity={ids.has(p.id) ? 1 : 0.25}
            />
          ))}
          <text x="290" y="324" textAnchor="middle">
            First score →
          </text>
          <text x="55" y="18">
            Second score ↑
          </text>
        </svg>
      </div>
      <div className="chart-key">
        <span>
          <i style={{ background: "var(--accent)" }} />
          Selected top {input.selection}%
        </span>
        <span>Dashed line: identical scores</span>
      </div>
      <Stats
        items={[
          ["Selected group · first", r.first.toFixed(1)],
          ["Same group · second", r.second.toFixed(1)],
          ["Underlying ability · mean", r.ability.toFixed(1)],
        ]}
      />
      <Notice>
        <strong>
          {input.noise === 0
            ? "Without noise, nothing regresses."
            : "Selection also selects good luck."}
        </strong>{" "}
        {input.noise === 0
          ? "The two scores match exactly."
          : "The top first scores combine ability and favorable noise. Fresh noise on the second measurement usually brings their average closer to the population mean of 50. A single sample can differ."}
      </Notice>
      <button
        className="foundation-prompt"
        onClick={() => update({ noise: 0 })}
      >
        Try this: remove the noise ↗
      </button>
      <p className="simulation-disclaimer">
        Ability is Normal(50, 10²); each measurement adds independent Normal(0,
        noise²) error. Scores are unbounded units, not exam percentages. Axes
        adapt to include every score.
      </p>
    </Experiment>
  );
}
