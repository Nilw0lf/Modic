"use client";
import { useMemo, useState } from "react";
import { network } from "@/lib/simulations/foundations";
import { Experiment, Slider, Stats, Notice } from "./Shared";
const initial = { count: 12, density: 30, seed: 42 };
export default function Network() {
  const [input, set] = useState(initial);
  const update = (p: Partial<typeof initial>) => set((v) => ({ ...v, ...p }));
  const r = useMemo(
    () => network(input.count, input.density / 100, input.seed),
    [input],
  );
  const nodes = Array.from({ length: input.count }, (_, i) => ({
    // Quantize display coordinates to avoid cross-runtime trig rounding differences.
    x: Number(
      (
        300 +
        125 * Math.cos((i / input.count) * 2 * Math.PI - Math.PI / 2)
      ).toFixed(3),
    ),
    y: Number(
      (
        155 +
        125 * Math.sin((i / input.count) * 2 * Math.PI - Math.PI / 2)
      ).toFixed(3),
    ),
  }));
  return (
    <Experiment
      title="More people. More possibilities."
      description="Grow a small communication network, then vary the chance that any pair connects."
      number="006"
      reset={() => set(initial)}
      resample={() => update({ seed: input.seed + 1 })}
    >
      <div className="foundation-controls">
        <Slider
          id="network-members"
          label="Members"
          value={input.count}
          min={2}
          max={30}
          onChange={(count) => update({ count })}
        />
        <Slider
          id="connection-chance"
          label="Connection chance"
          value={input.density}
          min={0}
          max={100}
          step={5}
          suffix="%"
          onChange={(density) => update({ density })}
        />
      </div>
      <div className="foundation-chart">
        <svg
          viewBox="0 0 600 315"
          role="img"
          aria-label="Simulated network of members and their direct connections"
        >
          {r.edges.map(([a, b]) => (
            <line
              key={a + "-" + b}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="var(--accent)"
              opacity=".2"
            />
          ))}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle
                cx={n.x}
                cy={n.y}
                r="9"
                fill={r.degree[i] ? "var(--accent)" : "var(--background)"}
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <title>{`Member ${i + 1}: ${r.degree[i]} connections`}</title>
            </g>
          ))}
        </svg>
      </div>
      <div className="chart-key">
        <span>
          <i style={{ background: "var(--accent)" }} />
          Connected member
        </span>
        <span>Hollow circle: isolated member</span>
      </div>
      <Stats
        items={[
          ["Possible pairs", String(r.potential)],
          ["Actual connections", String(r.edges.length)],
          ["Isolated members", String(r.isolated)],
        ]}
      />
      <Notice>
        <strong>Potential is not realized value.</strong> {input.count} members
        allow {r.potential} distinct pairs, but this sample has {r.edges.length}{" "}
        connections ({r.average.toFixed(1)} per member on average). More
        possible connections only help if people actually benefit from them.
      </Notice>
      <button
        className="foundation-prompt"
        onClick={() => update({ density: 100 })}
      >
        Try this: connect every pair ↗
      </button>
      <p className="simulation-disclaimer">
        Undirected independent links, with no self-links. Possible pairs = n(n −
        1)/2. This illustrates one mechanism of network effects; it does not
        price a network or model congestion, quality, or adoption.
      </p>
    </Experiment>
  );
}
