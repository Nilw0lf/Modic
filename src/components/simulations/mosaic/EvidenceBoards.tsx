"use client";
import { useState } from "react";
import {
  intervalBatch,
  testPower,
  normal,
  rng,
  bootstrap,
  bootstrapSample,
  quartet,
  regression,
} from "@/lib/simulations/mosaic";
import { Actions, Slider, Stats, fmt, pct } from "../depth/Shared";
export function Intervals({ seed }: { seed: number }) {
  const [n, setN] = useState(25),
    [reveal, setReveal] = useState(false),
    rows = intervalBatch(n, seed);
  return (
    <>
      <Slider
        id="ci-size"
        label="Observations per study"
        value={n}
        min={10}
        max={100}
        step={5}
        onChange={(v) => {
          setN(v);
          setReveal(false);
        }}
      />
      <svg
        className="mosaic-intervals"
        viewBox="0 0 600 370"
        role="img"
        aria-label="Forty confidence intervals from repeated synthetic studies"
      >
        {reveal && (
          <line
            x1="300"
            x2="300"
            y1="12"
            y2="350"
            stroke="var(--foreground)"
            strokeDasharray="5 4"
          />
        )}
        {rows.map((r, i) => (
          <g
            key={i}
            stroke={reveal && !r.covers ? "var(--negative)" : "var(--accent)"}
            strokeWidth="3"
          >
            <line
              x1={300 + 150 * r.lo}
              x2={300 + 150 * r.hi}
              y1={20 + i * 8}
              y2={20 + i * 8}
            />
            <circle cx={300 + 150 * r.mean} cy={20 + i * 8} r="3" />
          </g>
        ))}
        {[-1, 0, 1].map((value) => (
          <text key={value} x={300 + 150 * value} y="365" textAnchor="middle">
            {value}
          </text>
        ))}
      </svg>
      <Actions>
        <button onClick={() => setReveal(true)}>Reveal fixed parameter</button>
      </Actions>
      <p className="mosaic-caption">
        Horizontal scale: estimated mean. Each row is one interval; dots mark
        sample means.
      </p>
      <Stats
        items={[
          ["Fixed true mean", reveal ? "0.00" : "Hidden"],
          [
            "Intervals containing the mean",
            reveal ? `${rows.filter((r) => r.covers).length}/40` : "Hidden",
          ],
          ["Interval width", fmt(3.92 / Math.sqrt(n))],
        ]}
      />
      <p>
        Each study’s exact Normal sample mean has variance 1/n, with known
        observation variance one. The procedure uses mean ± 1.96/√n. About 95%
        coverage concerns repeated intervals under the model, not a 95%
        probability assigned to this fixed parameter after observing one
        interval.
      </p>
    </>
  );
}
export function Power({ seed }: { seed: number }) {
  const [n, setN] = useState(20),
    [effect, setEffect] = useState(0.3),
    random = rng(seed),
    studies = Array.from(
      { length: 100 },
      () => Math.abs(normal(random) + effect * Math.sqrt(n)) > 1.96,
    );
  return (
    <>
      <Slider
        id="power-size"
        label="Sample size per study"
        value={n}
        min={5}
        max={100}
        step={5}
        onChange={setN}
      />
      <Slider
        id="true-effect"
        label="True mean difference in the simulator"
        value={effect}
        min={0}
        max={1}
        step={0.1}
        onChange={setEffect}
      />
      <div
        className="mosaic-study-dots"
        aria-label={`${studies.filter(Boolean).length} of 100 studies reject the null`}
      >
        {studies.map((v, i) => (
          <span key={i} className={v ? "selected" : ""}>
            {v ? "●" : "○"}
          </span>
        ))}
      </div>
      <Stats
        items={[
          ["Expected rejection probability", pct(testPower(n, effect))],
          ["Realised rejections", `${studies.filter(Boolean).length}/100`],
          ["Null and threshold", "μ=0; |Z| > 1.96"],
        ]}
      />
      <p>
        Independent Normal observations have known standard deviation one. This
        is a two-sided z test with an approximately 5% null rejection rate.
        Power is rejection probability at a specified nonzero effect; at effect
        zero the displayed probability is type-I error instead. No study’s
        significance establishes practical importance.
      </p>
    </>
  );
}
export function Sequential({ seed }: { seed: number }) {
  const [h1, setH1] = useState(true),
    [flips, setFlips] = useState<boolean[]>([]),
    bound = Math.log(9),
    logLR = flips.reduce(
      (s, h) => s + (h ? Math.log(1.5) : Math.log(2 / 3)),
      0,
    ),
    decided = Math.abs(logLR) >= bound;
  const advance = (count: number) => {
    const r = rng(seed);
    for (let i = 0; i < flips.length; i++) r();
    let ll = logLR;
    const next = [...flips];
    for (let i = 0; i < count && !decided && next.length < 200; i++) {
      if (Math.abs(ll) >= bound) break;
      const head = r() < (h1 ? 0.6 : 0.4);
      next.push(head);
      ll += head ? Math.log(1.5) : Math.log(2 / 3);
    }
    setFlips(next);
  };
  return (
    <>
      <p>
        Compare only two coin models: H₀ has heads probability 0.4 and H₁ has
        0.6. The likelihood ratio is updated after every flip, with
        pre-specified boundaries 1/9 and 9.
      </p>
      <Actions>
        <button
          disabled={flips.length > 0}
          aria-pressed={h1}
          onClick={() => setH1((v) => !v)}
        >
          Generating model: {h1 ? "H₁ (0.6)" : "H₀ (0.4)"}
        </button>
        <button
          disabled={decided || flips.length >= 200}
          onClick={() => advance(1)}
        >
          Observe one flip
        </button>
        <button
          disabled={decided || flips.length >= 200}
          onClick={() => advance(10)}
        >
          Observe up to ten flips
        </button>
      </Actions>
      <div className="mosaic-coins">
        {flips.map((h, i) => (
          <span key={i}>{h ? "H" : "T"}</span>
        ))}
      </div>
      <Stats
        items={[
          ["Observed flips", String(flips.length)],
          ["Log likelihood ratio", fmt(logLR, 3)],
          ["Likelihood ratio", fmt(Math.exp(logLR), 3)],
          [
            "Decision",
            decided
              ? logLR > 0
                ? "Choose H₁"
                : "Choose H₀"
              : flips.length >= 200
                ? "Stopped at display cap; no boundary decision"
                : "Continue sampling",
          ],
        ]}
      />
      <p>
        This Wald-style sequential probability ratio test uses nominal α=β=0.1
        boundaries; actual error probabilities depend on overshoot and the
        specified simple hypotheses. It is not permission to repeatedly apply an
        unchanged fixed-sample p-value threshold. The 200-flip display cap is an
        inconclusive stop.
      </p>
    </>
  );
}
export function Bootstrap({ seed }: { seed: number }) {
  const [index, setIndex] = useState(0),
    [omit, setOmit] = useState(false),
    data = omit ? bootstrapSample.slice(0, -1) : bootstrapSample,
    batch = bootstrap(seed, 200, data),
    sorted = batch.map((b) => b.mean).sort((a, b) => a - b),
    bins = Array(20).fill(0) as number[];
  batch.forEach((b) => bins[Math.min(19, Math.floor(b.mean * 2))]++);
  return (
    <>
      <p>
        Observed sample: {data.join(", ")}. Resample the same number of
        observations with replacement from this empirical sample.
      </p>
      <Actions>
        <button onClick={() => setIndex((v) => (v + 1) % 200)}>
          Inspect next resample
        </button>
        <button
          aria-pressed={omit}
          onClick={() => {
            setOmit((v) => !v);
            setIndex(0);
          }}
        >
          Omit the largest observed value
        </button>
      </Actions>
      <div className="mosaic-coins">
        {batch[index].sample.map((v, i) => (
          <span key={i}>{v}</span>
        ))}
      </div>
      <div
        className="depth-histogram"
        role="img"
        aria-label="Histogram of two hundred bootstrap means, from zero to ten"
      >
        {bins.map((v, i) => (
          <span
            key={i}
            style={{ height: `${Math.max(1, (100 * v) / Math.max(...bins))}%` }}
          />
        ))}
      </div>
      <Stats
        items={[
          [
            "Observed sample mean",
            fmt(data.reduce((a, b) => a + b, 0) / data.length),
          ],
          ["This resample’s mean", fmt(batch[index].mean)],
          [
            "Bootstrap percentile interval",
            `${fmt(sorted[4])} to ${fmt(sorted[194])}`,
          ],
        ]}
      />
      <p>
        The displayed interval takes the 5th and 195th ordered means from 200
        replicates. It is a finite Monte Carlo percentile summary conditional on
        the observed sample, not proof of 95% population coverage. Missing or
        unrepresentative observations remain missing under resampling.
      </p>
    </>
  );
}
export function Quartet() {
  const [which, setWhich] = useState(0),
    [omitted, setOmitted] = useState<number | null>(null),
    points = quartet(which),
    included = points.filter((_, i) => i !== omitted),
    s = regression(included);
  return (
    <>
      <Actions>
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            aria-pressed={which === i}
            onClick={() => {
              setWhich(i);
              setOmitted(null);
            }}
          >
            Dataset {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setOmitted(
              points.reduce(
                (best, p, i) => (p[0] > points[best][0] ? i : best),
                0,
              ),
            )
          }
        >
          Omit the point with largest x
        </button>
        <button disabled={omitted === null} onClick={() => setOmitted(null)}>
          Restore all points
        </button>
      </Actions>
      <svg
        className="mosaic-scatter"
        viewBox="0 0 600 330"
        role="group"
        aria-label="Anscombe dataset scatter plot; click a point to omit it"
      >
        <line x1="55" x2="575" y1="280" y2="280" stroke="var(--border)" />
        {[0, 5, 10, 15].map((v) => (
          <g key={v}>
            <line
              x1="55"
              x2="575"
              y1={280 - (v / 15) * 250}
              y2={280 - (v / 15) * 250}
              stroke="var(--border)"
            />
            <text x="40" y={285 - (v / 15) * 250} textAnchor="end">
              {v}
            </text>
          </g>
        ))}
        {[0, 5, 10, 15, 20].map((v) => (
          <text key={v} x={55 + (v / 20) * 510} y="302" textAnchor="middle">
            {v}
          </text>
        ))}
        {points.map(([x, y], i) => (
          <circle
            key={i}
            cx={55 + (x / 20) * 510}
            cy={280 - (y / 15) * 250}
            r="7"
            fill={i === omitted ? "var(--muted)" : "var(--accent)"}
            opacity={i === omitted ? 0.3 : 1}
            role="button"
            tabIndex={0}
            aria-label={`Toggle point ${i + 1}: x ${x}, y ${y}`}
            onClick={() => setOmitted((v) => (v === i ? null : i))}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOmitted((v) => (v === i ? null : i));
              }
            }}
          />
        ))}
        <text x="55" y="315">
          x: 0 → 20; y: 0 → 15
        </text>
      </svg>
      <Stats
        items={[
          ["Included observations", String(included.length)],
          ["Mean x / mean y", `${fmt(s.mx)} / ${fmt(s.my)}`],
          [
            "OLS slope",
            s.slope === null ? "Undefined: no x variation" : fmt(s.slope, 3),
          ],
          ["Correlation", s.corr === null ? "Undefined" : fmt(s.corr, 3)],
        ]}
      />
      <p>
        Anscombe’s four published datasets have closely matched summaries but
        visibly different structures. Omitting a point changes the dataset;
        undefined slope is reported when the remaining x values are identical.
        This is a diagnostic demonstration, not a rule to discard inconvenient
        observations.
      </p>
    </>
  );
}
