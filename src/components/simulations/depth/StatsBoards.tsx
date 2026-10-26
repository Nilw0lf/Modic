"use client";
import { useState } from "react";
import { rng, slope, precision, brier } from "@/lib/simulations/depth";
import { Actions, Chart, Ledger, Slider, Stats, fmt, pct } from "./Shared";
export function CentralLimit({ seed }: { seed: number }) {
  const [n, setN] = useState(1),
    [exp, setExp] = useState(true),
    [count, setCount] = useState(200);
  const random = rng(seed),
    means: number[] = [];
  for (let i = 0; i < count; i++) {
    let sum = 0;
    for (let j = 0; j < 30; j++) {
      const u = random();
      if (j < n) sum += exp ? -Math.log(u) : 1 + Math.floor(6 * u);
    }
    means.push(sum / n);
  }
  const upper = exp ? 5 : 7,
    bins = Array(20).fill(0) as number[];
  means.forEach((v) => bins[Math.min(19, Math.floor((v / upper) * 20))]++);
  const average = means.reduce((a, b) => a + b, 0) / count,
    sd = Math.sqrt(
      means.reduce((s, v) => s + (v - average) ** 2, 0) / (count - 1),
    );
  return (
    <>
      <Slider
        id="sample-size"
        label="Observations per sample mean"
        value={n}
        min={1}
        max={30}
        onChange={setN}
      />
      <Actions>
        <button aria-pressed={exp} onClick={() => setExp((v) => !v)}>
          {exp ? "Exponential observations" : "Fair die observations"}
        </button>
        <button
          disabled={count >= 1000}
          onClick={() => setCount((v) => v + 200)}
        >
          Collect 200 more means
        </button>
      </Actions>
      <div
        className="depth-histogram"
        role="img"
        aria-label={`Histogram of ${count} sample means from zero to ${upper}; last bin includes overflow`}
      >
        {bins.map((v, i) => (
          <span
            key={i}
            style={{ height: `${Math.max(1, (100 * v) / Math.max(...bins))}%` }}
            title={`${(i * upper) / 20}–${((i + 1) * upper) / 20}: ${v}`}
          />
        ))}
      </div>
      <p>
        Horizontal axis: 0 → {upper}; last bin includes overflow. Vertical
        height: number of sample means.
      </p>
      <Stats
        items={[
          ["Sample means", String(count)],
          ["Mean of means", fmt(average)],
          ["Observed SD of means", fmt(sd)],
          ["Theoretical SD", fmt(Math.sqrt((exp ? 1 : 35 / 12) / n))],
        ]}
      />
      <p>
        Averages become less dispersed as n grows; their standardised
        distribution approaches a normal shape under these independent
        finite-variance models. The original observations do not become normal.
      </p>
    </>
  );
}
export function SmallNumbers({ seed }: { seed: number }) {
  const [pred, setPred] = useState("small"),
    [reveal, setReveal] = useState(false);
  const random = rng(seed);
  const groups = [5, 100].map((n) =>
    Array.from({ length: 20 }, () => {
      let heads = 0;
      for (let i = 0; i < n; i++) if (random() < 0.5) heads++;
      return heads / n;
    }),
  );
  return (
    <>
      <p>
        Twenty groups flip five fair coins each. Another twenty flip 100 each.
        Which set is likelier to include a heads fraction at or below 20%, or at
        or above 80%?
      </p>
      <Actions>
        <button
          aria-pressed={pred === "small"}
          onClick={() => setPred("small")}
        >
          Five flips
        </button>
        <button
          aria-pressed={pred === "large"}
          onClick={() => setPred("large")}
        >
          100 flips
        </button>
        <button onClick={() => setReveal(true)}>Run the groups</button>
      </Actions>
      {reveal && (
        <>
          <Chart
            label="Heads fraction in 20 independent groups"
            xLabel="Group 1 → 20"
            points
            lines={[
              { name: "Five flips", values: groups[0] },
              { name: "100 flips", values: groups[1] },
            ]}
          />
          <Stats
            items={groups.map((g, i) => [
              i ? "Extreme 100-flip groups" : "Extreme 5-flip groups",
              String(g.filter((p) => p <= 0.2 || p >= 0.8).length),
            ])}
          />
          <p>
            Smaller samples have greater proportional variability. A particular
            batch need not show every expected pattern. Your prediction was{" "}
            {pred === "small" ? "five" : "100"} flips; this is not a test of
            statistical ability.
          </p>
        </>
      )}
    </>
  );
}
export function Dilution({ seed }: { seed: number }) {
  const [error, setError] = useState(0);
  const random = rng(seed),
    points = Array.from(
      { length: 21 },
      (_, i) =>
        [i - 10 + error * (2 * random() - 1), 20 + 2 * (i - 10)] as [
          number,
          number,
        ],
    );
  const b = slope(points);
  return (
    <>
      <Slider
        id="error"
        label="Predictor measurement error half-width"
        value={error}
        min={0}
        max={15}
        onChange={setError}
      />
      <svg
        className="depth-scatter"
        viewBox="0 0 600 270"
        role="img"
        aria-label="Outcome versus noisy measured predictor"
      >
        <line x1="60" x2="575" y1="220" y2="220" className="depth-gridline" />
        {points.map(([x, y], i) => (
          <circle
            key={i}
            cx={60 + ((x + 25) / 50) * 500}
            cy={220 - (y / 40) * 190}
            r="5"
            className="depth-primary"
          />
        ))}
        <text x="60" y="255">
          Measured predictor −25 → 25; outcome 0 → 40
        </text>
      </svg>
      <Stats
        items={[
          ["Fitted slope", fmt(b)],
          ["True slope", "2.00"],
          [
            "Population variance benchmark",
            fmt((2 * (110 / 3)) / (110 / 3 + error ** 2 / 3)),
          ],
        ]}
      />
      <p>
        Outcome follows 20 + 2 × true x for x = −10 … 10. Independent uniform
        error is added only to x. The attenuation formula describes an
        expectation benchmark, not an exact or monotonic guarantee for this
        finite dataset.
      </p>
    </>
  );
}
export function Retrieval() {
  const [k, setK] = useState(5),
    [reveal, setReveal] = useState(false);
  const r = precision(k);
  return (
    <>
      <p>
        Retrieve a prefix of a ranked list. Challenge: include at least five of
        the six relevant documents while opening as few documents as possible.
      </p>
      <Slider
        id="retrieved"
        label="Top results opened"
        value={k}
        min={0}
        max={20}
        onChange={setK}
      />
      <Actions>
        <button onClick={() => setReveal(true)}>Reveal relevance labels</button>
      </Actions>
      <div className="depth-mosaic">
        {Array.from({ length: 20 }, (_, i) => (
          <div className={i < k ? "marked" : ""} key={i}>
            <b>Result {i + 1}</b>
            <small>
              {reveal
                ? [0, 2, 3, 6, 9, 14].includes(i)
                  ? "Relevant"
                  : "Irrelevant"
                : "Label hidden"}
            </small>
          </div>
        ))}
      </div>
      <Stats
        items={[
          [
            "Precision",
            reveal
              ? r.precision === null
                ? "Undefined"
                : pct(r.precision)
              : "Hidden",
          ],
          ["Recall", reveal ? pct(r.recall) : "Hidden"],
          ["F1", reveal ? fmt(r.f1) : "Hidden"],
        ]}
      />
      <p>
        Precision asks how much retrieved material is relevant; recall asks how
        much relevant material was retrieved. Empty retrieval has undefined
        precision and F1 defined as zero here. Real relevance judgments can be
        graded and disputed.
      </p>
    </>
  );
}
const model = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.5];
export function Calibration({ seed }: { seed: number }) {
  const [q, setQ] = useState(model.map(() => 50)),
    [revealed, setRevealed] = useState(false);
  const random = rng(seed),
    y = model.map((p) => (random() < p ? 1 : 0));
  return (
    <>
      <p>
        Ten independent synthetic events have known generating probabilities.
        Set a forecast for each, then reveal outcomes. Lower Brier score is
        better.
      </p>
      <Actions>
        <button
          disabled={revealed}
          onClick={() => setQ(model.map((p) => 100 * p))}
        >
          Use generating probabilities
        </button>
        <button disabled={revealed} onClick={() => setRevealed(true)}>
          Commit forecasts & reveal
        </button>
      </Actions>
      <div className="depth-cards depth-forecasts">
        {model.map((p, i) => (
          <div key={i}>
            <label htmlFor={`forecast-${i}`}>
              Event {i + 1} · generator {pct(p)}
            </label>
            <input
              id={`forecast-${i}`}
              type="range"
              min={0}
              max={100}
              value={q[i]}
              disabled={revealed}
              onChange={(e) =>
                setQ((v) =>
                  v.map((n, j) => (j === i ? Number(e.target.value) : n)),
                )
              }
            />
            <output htmlFor={`forecast-${i}`}>
              {q[i]}%{revealed ? ` · outcome ${y[i]}` : ""}
            </output>
          </div>
        ))}
      </div>
      {revealed && (
        <>
          <Stats
            items={[
              [
                "Your Brier score",
                fmt(
                  brier(
                    q.map((p) => p / 100),
                    y,
                  ),
                  3,
                ),
              ],
              ["Generator's realised score", fmt(brier(model, y), 3)],
              [
                "Expected score for your forecasts",
                fmt(
                  model.reduce(
                    (s, p, i) => s + p * (1 - p) + (q[i] / 100 - p) ** 2,
                    0,
                  ) / 10,
                  3,
                ),
              ],
            ]}
          />
          <Ledger
            label="Small-sample calibration bins"
            headers={["Forecast bin", "Cases", "Observed event rate"]}
            rows={[
              [0, 33],
              [34, 66],
              [67, 100],
            ].map(([lo, hi]) => {
              const ids = q.flatMap((p, i) => (p >= lo && p <= hi ? [i] : []));
              return [
                `${lo}–${hi}%`,
                ids.length,
                ids.length
                  ? pct(ids.reduce((s, i) => s + y[i], 0) / ids.length)
                  : "No cases",
              ];
            })}
          />
        </>
      )}
      <p>
        Ten outcomes are too few to establish reliable calibration. A truthful
        probability minimises expected squared error, yet another forecast can
        win one realised batch by luck.
      </p>
    </>
  );
}
