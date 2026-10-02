"use client";
import { useMemo, useState } from "react";
import { simpleEntries } from "@/data/simple-expansion";
import { simpleModel } from "@/lib/simulations/simple";
import { SimulationShell } from "@/components/simulation/SimulationShell";
import { Slider, Stats, Notice } from "../foundations/Shared";
import { Plot } from "../everyday/EverydayExperiment";
import { SimpleGames } from "./SimpleGames";

export default function SimpleExperiment({ id }: { id: string }) {
  const entry = simpleEntries.find((entry) => entry.id === id)!;
  const defaults = () =>
    Object.fromEntries(
      entry.controls.map((control) => [control.key, control.value]),
    );
  const [settings, setSettings] = useState(defaults),
    [seed, setSeed] = useState(41),
    [revision, setRevision] = useState(0);
  const output = useMemo(
    () => simpleModel(id, settings, seed),
    [id, settings, seed],
  );
  const isGame = entry.format === "game",
    stochastic = ["wisdom-of-crowds", "random-walk"].includes(id);
  function reset() {
    setSettings(defaults());
    setSeed(41);
    setRevision((r) => r + 1);
  }
  return (
    <SimulationShell
      label={entry.name}
      number={`S${String(simpleEntries.indexOf(entry) + 1).padStart(2, "0")}`}
      actions={
        <>
          <button onClick={reset}>Reset</button>
          {(isGame || stochastic) && (
            <button
              onClick={() => {
                setSeed((s) => s + 1);
                setRevision((r) => r + 1);
              }}
            >
              {isGame ? "New round" : "Resample"}
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
          {isGame ? "PLAY & NOTICE" : "ILLUSTRATIVE MODEL"}
        </span>
      </div>
      {!!entry.controls.length && (
        <div className="everyday-controls">
          {entry.controls.map((control) =>
            control.key === "selected" ? (
              <label className="simple-switch" key={control.key}>
                <input
                  type="checkbox"
                  checked={Boolean(settings.selected)}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      selected: Number(e.target.checked),
                    }))
                  }
                />
                Show only the shortlist
              </label>
            ) : (
              <Slider
                key={control.key}
                id={`${id}-${control.key}`}
                label={control.label}
                min={control.min}
                max={control.max}
                step={control.step}
                suffix={control.suffix}
                value={settings[control.key]}
                onChange={(value) =>
                  setSettings((s) => ({ ...s, [control.key]: value }))
                }
              />
            ),
          )}
        </div>
      )}
      {isGame && (
        <section
          className="play-board simple-board"
          aria-label={`Play ${entry.name}`}
        >
          <SimpleGames
            key={`${revision}-${seed}-${["fitts-law", "hicks-law"].includes(id) ? "keep-comparisons" : JSON.stringify(settings)}`}
            id={id}
            settings={settings}
            seed={seed}
          />
        </section>
      )}
      {output?.dots && (
        <figure className="simple-scatter">
          <svg
            viewBox="0 0 420 340"
            role="img"
            aria-label={`${settings.selected ? "Shortlisted" : "All"} applicants: writing and coding scores`}
          >
            <text x="50" y="24" className="chart-label">
              Coding score
            </text>
            <line x1="50" y1="285" x2="350" y2="285" stroke="var(--muted)" />
            <line x1="50" y1="40" x2="50" y2="285" stroke="var(--muted)" />
            {[1, 5, 10].map((value) => (
              <g key={value}>
                <text
                  x={50 + (value - 1) * 30}
                  y="308"
                  textAnchor="middle"
                  className="chart-tick"
                >
                  {value}
                </text>
                <text
                  x="38"
                  y={289 - (value - 1) * 25}
                  textAnchor="end"
                  className="chart-tick"
                >
                  {value}
                </text>
              </g>
            ))}
            {output.dots.map((point) => (
              <circle
                key={`${point.x}-${point.y}`}
                cx={50 + (point.x - 1) * 30}
                cy={285 - (point.y - 1) * 25}
                r="5"
                fill="var(--accent)"
                opacity=".75"
              />
            ))}
            <text x="200" y="333" textAnchor="middle" className="chart-label">
              Writing score →
            </text>
          </svg>
          <figcaption>
            One dot per applicant. Admission requires writing ≥ 8 OR coding ≥ 8.
          </figcaption>
        </figure>
      )}
      {output?.degrees && (
        <figure className="simple-network">
          <svg
            viewBox="0 0 440 280"
            role="img"
            aria-label={`Star network: center has ${settings.leaves} connections; each outer person has one`}
          >
            {output.degrees.slice(1).map((_, i) => {
              const angle = (2 * Math.PI * i) / settings.leaves,
                x = 220 + 105 * Math.cos(angle),
                y = 140 + 105 * Math.sin(angle);
              return (
                <g key={i}>
                  <line
                    x1="220"
                    y1="140"
                    x2={x}
                    y2={y}
                    stroke="var(--border)"
                    strokeWidth="2"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="16"
                    fill="var(--surface)"
                    stroke="var(--accent)"
                  />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    fill="var(--foreground)"
                    fontSize="12"
                  >
                    1
                  </text>
                </g>
              );
            })}
            <circle cx="220" cy="140" r="26" fill="var(--accent)" />
            <text
              x="220"
              y="145"
              textAnchor="middle"
              fill="var(--background)"
              fontSize="16"
            >
              {settings.leaves}
            </text>
          </svg>
          <figcaption>Numbers show each person’s connections.</figcaption>
        </figure>
      )}
      {output?.guesses && (
        <div className="simple-guesses">
          <span className="eyebrow">ONE SAMPLED CROWD · TRUE QUANTITY 100</span>
          <p>
            {output.guesses
              .slice(0, 12)
              .map((guess) => Math.round(guess))
              .join(" · ")}
            {output.guesses.length > 12
              ? ` · plus ${output.guesses.length - 12} more`
              : ""}
          </p>
        </div>
      )}
      {output?.level !== undefined && (
        <div className="tank-play">
          <div
            className="simple-tank"
            role="img"
            aria-label={`Tank holds ${output.level} of 100 units`}
          >
            <div style={{ height: `${output.level}%` }} />
            <strong>{output.level}/100</strong>
          </div>
          <div>
            <h3>Minute {settings.minutes}</h3>
            <p>
              Inflow {settings.inflow} · Drain capacity {settings.outflow}{" "}
              units/minute
            </p>
            <button
              disabled={settings.minutes >= 20}
              onClick={() =>
                setSettings((s) => ({
                  ...s,
                  minutes: Math.min(20, s.minutes + 5),
                }))
              }
            >
              Run 5 minutes
            </button>
          </div>
        </div>
      )}
      {output?.series && (
        <Plot
          series={output.series}
          xLabel={output.xLabel!}
          yLabel={output.yLabel!}
          selectedX={
            id === "diversification"
              ? settings.weight
              : id === "stocks-and-flows"
                ? settings.minutes
                : undefined
          }
        />
      )}
      {output && (
        <>
          <Stats items={output.stats} />
          <Notice>{output.notice}</Notice>
        </>
      )}
      {!!Object.keys(entry.preset).length && (
        <div className="concept-challenge">
          <button
            className="text-link"
            onClick={() => setSettings((s) => ({ ...s, ...entry.preset }))}
          >
            {entry.challenge} ↗
          </button>
        </div>
      )}
      <p className="everyday-assumption">
        Change one thing, observe what happens, then use the field notes below
        to interpret it.
      </p>
    </SimulationShell>
  );
}
