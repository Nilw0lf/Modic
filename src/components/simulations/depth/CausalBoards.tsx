"use client";
import { useState } from "react";
import { bh, rng } from "@/lib/simulations/depth";
import { Actions, Chart, Ledger, Slider, Stats, fmt, pct } from "./Shared";
export function Confounding() {
  const [bias, setBias] = useState(70),
    [randomised, setRandomised] = useState(false);
  const treatedHigh = randomised ? 0.5 : bias / 100,
    controlHigh = 1 - treatedHigh;
  const treated = 30 + 40 * treatedHigh,
    control = 20 + 40 * controlHigh;
  return (
    <>
      <p className="depth-callout">
        Background advantage → treatment selection
        <br />
        Background advantage → outcome
        <br />
        Treatment → outcome (+10 units)
      </p>
      <Slider
        id="composition"
        label="Advantaged share of treated group"
        value={bias}
        min={50}
        max={95}
        suffix="%"
        onChange={(v) => {
          setBias(v);
          setRandomised(false);
        }}
      />
      <Actions>
        <button
          aria-pressed={randomised}
          onClick={() => setRandomised((v) => !v)}
        >
          {randomised ? "Restore selection" : "Randomise assignment"}
        </button>
      </Actions>
      <Ledger
        label="Synthetic outcome means"
        headers={[
          "Background",
          "Control",
          "Treated",
          "Within-group difference",
        ]}
        rows={[
          ["Less advantaged", 20, 30, 10],
          ["More advantaged", 60, 70, 10],
          ["Combined", fmt(control), fmt(treated), fmt(treated - control)],
        ]}
      />
      <Stats
        items={[
          ["Raw difference", fmt(treated - control)],
          ["Causal effect in model", "10.00"],
          [
            "Advantaged treated / control",
            `${pct(treatedHigh)} / ${pct(controlHigh)}`,
          ],
        ]}
      />
      <p>
        Group means mix the treatment effect with a composition difference.
        Randomisation is represented here by exactly balanced expected groups,
        without sampling noise.
      </p>
    </>
  );
}
export function Instrument() {
  const [stage, setStage] = useState(40),
    [direct, setDirect] = useState(0);
  const d = stage / 100,
    y = 2 * d + direct;
  return (
    <>
      <p className="depth-callout">
        Encouragement → uptake → outcome
        <br />
        Forbidden shortcut: encouragement → outcome
      </p>
      <Slider
        id="stage"
        label="Extra uptake from encouragement"
        value={stage}
        min={0}
        max={80}
        suffix="%"
        onChange={setStage}
      />
      <Slider
        id="direct"
        label="Direct encouragement bonus"
        value={direct}
        min={0}
        max={2}
        step={0.1}
        onChange={setDirect}
      />
      <Stats
        items={[
          ["First stage Δ uptake", fmt(d)],
          ["Reduced form Δ outcome", fmt(y)],
          ["Wald ratio ΔY / ΔD", d ? fmt(y / d) : "Undefined"],
          ["True constant effect", "2.00"],
        ]}
      />
      <p>
        {!d
          ? "No uptake difference: there is no denominator to identify the treatment effect."
          : direct
            ? "The shortcut violates exclusion. Dividing its effect by a weaker first stage amplifies the bias."
            : "With a valid shortcut-free instrument, the ratio recovers this model's constant effect."}
      </p>
    </>
  );
}
export function Discontinuity() {
  const [band, setBand] = useState(5),
    [other, setOther] = useState(false);
  const xs = Array.from({ length: 20 }, (_, i) => (i < 10 ? i - 10 : i - 9));
  return (
    <>
      <Slider
        id="bandwidth"
        label="Points included on each side"
        value={band}
        min={1}
        max={10}
        onChange={setBand}
      />
      <Actions>
        <button aria-pressed={other} onClick={() => setOther((v) => !v)}>
          Toggle another policy at cutoff
        </button>
      </Actions>
      <Chart
        label="Score relative to eligibility threshold; gap between −1 and +1"
        xLabel="Score −10 … −1 | +1 … +10 →"
        min={40}
        max={75}
        points
        lines={[
          {
            name: "Synthetic outcomes",
            values: xs.map(
              (x) => 50 + 0.5 * x + (x > 0 ? 10 + (other ? 5 : 0) : 0),
            ),
          },
        ]}
      />
      <Stats
        items={[
          ["Local mean contrast", fmt(10 + 0.5 * (band + 1) + (other ? 5 : 0))],
          ["Treatment jump", "10.00"],
          ["Other jump", other ? "5.00" : "0.00"],
        ]}
      />
      <p>
        A narrower window reduces the smooth score trend contribution. This is a
        raw window contrast, not a fitted regression discontinuity estimator.
        Even the narrowest window retains a one-unit trend difference because
        scores are discrete.
      </p>
    </>
  );
}
export function Differences() {
  const [trend, setTrend] = useState(0),
    [counter, setCounter] = useState(false);
  const c = [40, 45, 50, 55],
    t = [0, 1, 2, 3].map((i) => 50 + 5 * i + trend * i + (i >= 2 ? 8 : 0));
  return (
    <>
      <Slider
        id="trend"
        label="Extra treated-group trend per period"
        value={trend}
        min={0}
        max={6}
        onChange={setTrend}
      />
      <Actions>
        <button aria-pressed={counter} onClick={() => setCounter((v) => !v)}>
          Show no-policy counterfactual
        </button>
      </Actions>
      <Chart
        label="Policy begins at period 2"
        min={35}
        max={100}
        xLabel="Periods 0, 1 | policy | 2, 3 →"
        lines={[
          { name: "Treated", values: t },
          { name: "Comparison", values: c },
          ...(counter
            ? [
                {
                  name: "Treated without policy",
                  values: [0, 1, 2, 3].map((i) => 50 + 5 * i + trend * i),
                },
              ]
            : []),
        ]}
      />
      <Stats
        items={[
          ["Treated change 1 → 2", fmt(t[2] - t[1])],
          ["Comparison change", "5.00"],
          ["Difference in differences", fmt(8 + trend)],
          ["True policy effect", "8.00"],
        ]}
      />
      <p>
        Different starting levels are harmless here. Different untreated trends
        are not: the extra trend is counted as part of the policy effect.
      </p>
    </>
  );
}
export function MultipleTesting({ seed }: { seed: number }) {
  const [alpha, setAlpha] = useState(5),
    [method, setMethod] = useState(false),
    [reveal, setReveal] = useState(false);
  const random = rng(seed),
    p = Array.from({ length: 30 }, (_, i) => random() * (i < 5 ? 0.04 : 1));
  const flags = method ? bh(p, alpha / 100) : p.map((v) => v <= alpha / 100),
    r = flags.filter(Boolean).length,
    v = flags.filter((f, i) => f && i >= 5).length;
  return (
    <>
      <Slider
        id="alpha"
        label="Nominal level"
        value={alpha}
        min={1}
        max={20}
        suffix="%"
        onChange={setAlpha}
      />
      <Actions>
        <button aria-pressed={!method} onClick={() => setMethod(false)}>
          Unadjusted
        </button>
        <button aria-pressed={method} onClick={() => setMethod(true)}>
          Benjamini–Hochberg
        </button>
        <button onClick={() => setReveal(true)}>Reveal synthetic truth</button>
      </Actions>
      <div className="depth-mosaic">
        {p.map((n, i) => (
          <div className={flags[i] ? "marked" : ""} key={i}>
            <b>Test {i + 1}</b>
            <span>p={fmt(n, 3)}</span>
            <small>
              {reveal
                ? i < 5
                  ? "Signal"
                  : "Null"
                : flags[i]
                  ? "Flagged"
                  : "Not flagged"}
            </small>
          </div>
        ))}
      </div>
      <Stats
        items={[
          ["Discoveries", String(r)],
          ["False discoveries", reveal ? String(v) : "Hidden"],
          [
            "False discovery proportion",
            reveal ? pct(r ? v / r : 0) : "Hidden",
          ],
        ]}
      />
      <p>
        Twenty-five independent uniform null p-values and five authored signal
        p-values sampled from 0–0.04. FDR is an expectation over repeated
        batches, not a promise about this batch. With no discoveries, FDP is
        defined as zero.
      </p>
    </>
  );
}
