"use client";
import { useMemo, useState } from "react";
import { discoveryEntries } from "@/data/discovery-expansion";
import { discoveryModel, relay } from "@/lib/simulations/discovery";
import { SimulationShell } from "@/components/simulation/SimulationShell";
import { Slider, Stats, Notice } from "../foundations/Shared";
import { Plot } from "../everyday/EverydayExperiment";
import { DiscoveryGames } from "./DiscoveryGames";
const randomized = [
  "st-petersburg-paradox",
  "polya-urn",
  "galton-board",
  "percolation",
  "small-world-shortcuts",
  "bayesian-updating",
];
export default function DiscoveryExperiment({ id }: { id: string }) {
  const entry = discoveryEntries.find((e) => e.id === id)!,
    defaults = () =>
      Object.fromEntries(entry.controls.map((c) => [c.key, c.value]));
  const [settings, setSettings] = useState(defaults),
    [seed, setSeed] = useState(73),
    [revision, setRevision] = useState(0),
    [on, setOn] = useState(false);
  const output = useMemo(
    () => discoveryModel(id, settings, seed),
    [id, settings, seed],
  );
  function reset() {
    setSettings(defaults());
    setSeed(73);
    setRevision((r) => r + 1);
    setOn(false);
  }
  return (
    <SimulationShell
      label={entry.name}
      number={`D${String(discoveryEntries.indexOf(entry) + 1).padStart(2, "0")}`}
      actions={
        <>
          <button onClick={reset}>Reset</button>
          {(entry.format === "game" || randomized.includes(id)) && (
            <button
              onClick={() => {
                setSeed((s) => s + 1);
                setRevision((r) => r + 1);
              }}
            >
              {" "}
              {entry.format === "game" ? "New round" : "Resample"}
            </button>
          )}
        </>
      }
    >
      <div className="simulation-intro">
        <div>
          <h2>{entry.name}</h2>
          <p>{entry.question}</p>
        </div>
        <span className="model-tag">
          {entry.format === "game" ? "PLAY & NOTICE" : "ILLUSTRATIVE MODEL"}
        </span>
      </div>
      {!!entry.controls.length && (
        <div className="everyday-controls">
          {entry.controls.map((c) => (
            <Slider
              key={c.key}
              id={`${id}-${c.key}`}
              label={c.label}
              min={c.min}
              max={c.max}
              step={c.step}
              suffix={c.suffix}
              value={settings[c.key]}
              onChange={(value) => {
                setSettings((s) => ({ ...s, [c.key]: value }));
                if (id === "hysteresis")
                  setOn((previous) => relay(previous, value));
              }}
            />
          ))}
        </div>
      )}
      {entry.format === "game" && (
        <section
          className="simple-board discovery-board"
          aria-label={`Play ${entry.name}`}
        >
          <DiscoveryGames
            key={`${id}-${revision}-${seed}`}
            id={id}
            settings={settings}
            seed={seed}
          />
        </section>
      )}
      {output?.evidence && (
        <p className="discovery-evidence">Observed draws: {output.evidence}</p>
      )}
      {output?.bars && (
        <figure
          className="discovery-bars"
          role="img"
          aria-label={`${entry.name}: ${output.bars.map((b) => `${b.label}: ${Number(b.value.toFixed(2))}`).join(", ")}`}
        >
          <figcaption>
            {id === "st-petersburg-paradox"
              ? "Sampled payout counts"
              : id === "condorcet-cycle"
                ? "Voters preferring the named option"
                : id === "galton-board"
                  ? "Balls in each bin"
                  : id === "diffusion"
                    ? "Dye in each cell"
                    : "Compare the amounts"}
          </figcaption>
          {output.bars.map((b, i) => (
            <div key={`${b.label}-${i}`}>
              <span>{b.label}</span>
              <div className="discovery-bar-track">
                <div
                  style={{
                    width: `${(100 * b.value) / Math.max(1, ...output.bars!.map((b) => b.value))}%`,
                  }}
                />
              </div>
              <output>{Number(b.value.toFixed(2))}</output>
            </div>
          ))}
        </figure>
      )}
      {output?.grid && (
        <figure className="discovery-grid-figure">
          <div
            className="percolation-grid"
            role="img"
            aria-label={`10 by 10 percolation grid. ${output.grid.wet.size} reached tiles. ${output.grid.spans ? "A path crosses the board." : "No crossing path."}`}
          >
            {output.grid.cells.map((open, i) => (
              <span
                key={i}
                className={output.grid!.wet.has(i) ? "wet" : open ? "open" : ""}
              />
            ))}
          </div>
          <figcaption>
            Blue: reached from the top · Rose: open but unreached · Neutral:
            blocked
          </figcaption>
        </figure>
      )}
      {output?.network && (
        <figure className="discovery-network">
          <svg
            viewBox="0 0 420 320"
            role="img"
            aria-label={`Twenty-node network with ${settings.shortcuts} added shortcuts; mean shortest path ${output.network.mean.toFixed(2)}`}
          >
            <g>
              {output.network.edges.map(([a, b], i) => {
                const point = (n: number) => ({
                    x: 210 + 125 * Math.cos((n * Math.PI) / 10),
                    y: 160 + 125 * Math.sin((n * Math.PI) / 10),
                  }),
                  p = point(a),
                  q = point(b);
                return (
                  <line
                    key={i}
                    x1={p.x}
                    y1={p.y}
                    x2={q.x}
                    y2={q.y}
                    stroke={i < 40 ? "var(--border)" : "var(--accent)"}
                    strokeWidth={i < 40 ? 1 : 2}
                  />
                );
              })}
              {Array.from({ length: 20 }, (_, n) => {
                const x = 210 + 125 * Math.cos((n * Math.PI) / 10),
                  y = 160 + 125 * Math.sin((n * Math.PI) / 10);
                return (
                  <g key={n}>
                    <circle
                      cx={x}
                      cy={y}
                      r="11"
                      fill="var(--background)"
                      stroke="var(--accent)"
                    />
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      fill="var(--foreground)"
                      fontSize="10"
                    >
                      {n + 1}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
          <figcaption>
            Local links remain; blue bridges are added shortcuts.
          </figcaption>
        </figure>
      )}
      {id === "hysteresis" && (
        <div className="relay-board">
          <div
            className={`relay-light ${on ? "is-on" : ""}`}
            role="img"
            aria-label={`Memory switch ${on ? "on" : "off"}`}
          >
            {on ? "ON" : "OFF"}
          </div>
          <div>
            <h3>Separate switching thresholds</h3>
            <p>Turn ON at 60 · Turn OFF at 40 · Retain state between them.</p>
            <p role="status">
              Signal {settings.signal}: memory switch {on ? "ON" : "OFF"},
              single-threshold switch {settings.signal >= 50 ? "ON" : "OFF"}.
            </p>
            <p>
              Try 70 → 50, then 30 → 50. At 50, the memory switch can be in
              either state.
            </p>
          </div>
        </div>
      )}
      {output?.series && (
        <Plot
          series={output.series}
          xLabel={output.xLabel!}
          yLabel={output.yLabel!}
          selectedX={id === "hawk-dove" ? settings.hawks : undefined}
        />
      )}
      {output && (
        <>
          <Stats items={output.stats} />
          <Notice>{output.notice}</Notice>
        </>
      )}
      <p className="everyday-assumption">
        {entry.format === "game"
          ? "Try a choice, read the feedback, and connect it to the field notes below."
          : "Change one setting at a time. Read the result alongside its assumptions below."}
      </p>
    </SimulationShell>
  );
}
