"use client";
import { useMemo, useState } from "react";
import { baseRate } from "@/lib/simulations/foundations";
import { Experiment, Slider, Stats, Notice, percent } from "./Shared";
const initial = { prevalence: 1, sensitivity: 90, falsePositive: 5, seed: 42 };
export default function BaseRate() {
  const [input, set] = useState(initial);
  const update = (patch: Partial<typeof initial>) =>
    set((v) => ({ ...v, ...patch }));
  const result = useMemo(
    () =>
      baseRate(
        input.prevalence / 100,
        input.sensitivity / 100,
        input.falsePositive / 100,
        input.seed,
      ),
    [input],
  );
  return (
    <Experiment
      title="A flag is not the whole story."
      description="Screen 1,000 fictional messages for spam. How many flags are right?"
      number="003"
      reset={() => set(initial)}
      resample={() => update({ seed: input.seed + 1 })}
    >
      <div className="foundation-controls">
        <Slider
          id="prevalence"
          label="Spam base rate"
          value={input.prevalence}
          min={1}
          max={50}
          suffix="%"
          onChange={(prevalence) => update({ prevalence })}
        />
        <Slider
          id="sensitivity"
          label="Spam detection rate"
          value={input.sensitivity}
          min={50}
          max={100}
          suffix="%"
          onChange={(sensitivity) => update({ sensitivity })}
        />
        <Slider
          id="false-positive"
          label="False alarm rate"
          value={input.falsePositive}
          min={0}
          max={30}
          suffix="%"
          onChange={(falsePositive) => update({ falsePositive })}
        />
      </div>
      <div className="foundation-chart">
        <svg
          viewBox="0 0 620 280"
          role="img"
          aria-label="One thousand messages, colored by spam screening outcome"
        >
          {result.population.map((p, i) => (
            <rect
              key={i}
              x={10 + (i % 50) * 12}
              y={10 + Math.floor(i / 50) * 12}
              width="8"
              height="8"
              rx="1"
              fill={
                p.flagged
                  ? p.target
                    ? "var(--accent)"
                    : "var(--negative)"
                  : "var(--muted)"
              }
              opacity={p.flagged ? 1 : 0.2}
            />
          ))}
          <text x="10" y="270">
            Each square = one message
          </text>
        </svg>
      </div>
      <div className="chart-key">
        <span>
          <i style={{ background: "var(--accent)" }} />
          Correct flag
        </span>
        <span>
          <i style={{ background: "var(--negative)" }} />
          False alarm
        </span>
        <span>
          <i style={{ background: "var(--muted)", opacity: 0.3 }} />
          Not flagged
        </span>
      </div>
      <Stats
        items={[
          [
            "Correct / false flags",
            result.trueFlags + " / " + result.falseFlags,
          ],
          ["Spam among flags · sample", percent(result.observed)],
          ["Spam among flags · model", percent(result.expected)],
        ]}
      />
      <Notice>
        <strong>Start with how rare it is.</strong> The detection rate answers
        “How often is spam caught?” The model result answers a different
        question: “Given a flag, how likely is spam?” Resampling changes the
        sample, not that model probability.
      </Notice>
      <button
        className="foundation-prompt"
        onClick={() => update({ prevalence: 50 })}
      >
        Try this: make half the messages spam ↗
      </button>
      <p className="simulation-disclaimer">
        Independent fictional messages; fixed detection and false alarm rates.
        No real spam classifier is being evaluated.
      </p>
    </Experiment>
  );
}
