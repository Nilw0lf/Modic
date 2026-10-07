"use client";
import { useState } from "react";
import {
  contagionStep,
  deployedDemand,
  fairnessCounts,
  laplaceNoise,
  routingCost,
} from "@/lib/simulations/frontier";
import { seededRandom } from "@/lib/simulations/random";
import { Slider, Stats } from "../foundations/Shared";

const fixed = (n: number) => Number(n.toFixed(2)).toLocaleString("en-US");
const pct = (n: number | null) =>
  n === null ? "Undefined: no selections" : `${(100 * n).toFixed(1)}%`;

function Trajectory({
  values,
  baseline,
}: {
  values: number[];
  baseline: number;
}) {
  return (
    <figure className="frontier-trajectory">
      <svg
        viewBox="0 0 600 220"
        role="img"
        aria-label={`Demand by deployment: ${values.map(fixed).join(", ")}. Baseline ${baseline}.`}
      >
        {[0, 20, 40, 60, 80, 100].map((n) => (
          <g key={n}>
            <line
              x1="45"
              x2="565"
              y1={185 - n * 1.5}
              y2={185 - n * 1.5}
              stroke="var(--border)"
            />
            <text
              x="35"
              y={190 - n * 1.5}
              textAnchor="end"
              fill="var(--muted)"
              fontSize="10"
            >
              {n}
            </text>
          </g>
        ))}
        <line
          x1="45"
          x2="565"
          y1={185 - baseline * 1.5}
          y2={185 - baseline * 1.5}
          stroke="var(--muted)"
          strokeDasharray="5 5"
        />
        <polyline
          points={values
            .map(
              (n, i) =>
                `${45 + (i * 520) / Math.max(1, values.length - 1)},${185 - n * 1.5}`,
            )
            .join(" ")}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
        />
        {values.map((n, i) => (
          <circle
            key={i}
            cx={45 + (i * 520) / Math.max(1, values.length - 1)}
            cy={185 - n * 1.5}
            r="3"
            fill="var(--accent)"
          />
        ))}
        <text x="45" y="18" fill="var(--muted)" fontSize="11">
          Demand / prediction units
        </text>
        <text
          x="300"
          y="214"
          textAnchor="middle"
          fill="var(--muted)"
          fontSize="11"
        >
          Deployment cycle (0 to {values.length - 1})
        </text>
      </svg>
      <figcaption>
        Blue: retrained forecast · Dashed: frozen baseline forecast of 20
      </figcaption>
    </figure>
  );
}

export function RoutingBoard() {
  const [traffic, setTraffic] = useState(60);
  const cost = routingCost(traffic);
  return (
    <>
      <Slider
        id="routing-variable"
        label="Traffic on variable-delay road"
        min={0}
        max={100}
        value={traffic}
        onChange={setTraffic}
      />
      <div className="frontier-roads">
        <div>
          <span>Variable road</span>
          <strong>
            {traffic} traffic units → {traffic} min each
          </strong>
          <i style={{ width: `${traffic}%` }} />
        </div>
        <div>
          <span>Fixed-delay road</span>
          <strong>{100 - traffic} traffic units → 60 min each</strong>
          <i style={{ width: `${100 - traffic}%` }} />
        </div>
      </div>
      <div className="play-actions">
        <button onClick={() => setTraffic(60)}>Selfish equilibrium</button>
        <button onClick={() => setTraffic(30)}>System optimum</button>
      </div>
      <Stats
        items={[
          ["Your total delay", `${fixed(cost)} unit-min`],
          ["System minimum", "5,100 unit-min"],
          ["Equilibrium / optimum", "1.18×"],
        ]}
      />
      <p role="status" className="play-feedback">
        {traffic === 60
          ? "Both roads take 60 minutes. No infinitesimal driver can improve by switching. Total delay is 6,000."
          : traffic === 30
            ? "Total delay is minimal at 5,100. Fixed-road users would prefer the 30-minute road, so this allocation needs coordination."
            : `Your total is ${fixed(cost)}. ${traffic < 60 ? "Fixed-road users have an incentive to switch to the faster variable road." : "Variable-road users have an incentive to switch to the 60-minute road."}`}
      </p>
      <p className="frontier-note">
        Traffic is divisible; users are infinitesimal. The ratio describes the
        equilibrium, not every slider setting. These are invented roads and
        delay units.
      </p>
    </>
  );
}

export function ContagionBoard() {
  const [seeds, setSeeds] = useState([0]),
    [active, setActive] = useState([0]),
    [threshold, setThreshold] = useState(2),
    [steps, setSteps] = useState(0);
  const next = contagionStep(active, threshold),
    stalled = next.length === active.length;
  function edit(nodes: number[]) {
    setSeeds(nodes);
    setActive(nodes);
    setSteps(0);
  }
  function resetSpread() {
    setActive(seeds);
    setSteps(0);
  }
  const point = (n: number) => ({
    x: 180 + 135 * Math.cos((n * Math.PI) / 10 - Math.PI / 2),
    y: 180 + 135 * Math.sin((n * Math.PI) / 10 - Math.PI / 2),
  });
  return (
    <>
      <div className="play-actions" role="group" aria-label="Adoption rule">
        <button
          aria-pressed={threshold === 1}
          onClick={() => {
            setThreshold(1);
            resetSpread();
          }}
        >
          One neighbour is enough
        </button>
        <button
          aria-pressed={threshold === 2}
          onClick={() => {
            setThreshold(2);
            resetSpread();
          }}
        >
          Needs two neighbours
        </button>
      </div>
      <figure className="frontier-network">
        <svg viewBox="0 0 360 360" aria-hidden="true">
          {Array.from({ length: 20 }, (_, n) =>
            [1, 2].map((offset) => {
              const a = point(n),
                b = point((n + offset) % 20);
              return (
                <line
                  key={`${n}-${offset}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="var(--border)"
                />
              );
            }),
          )}
          {Array.from({ length: 20 }, (_, n) => {
            const p = point(n);
            return (
              <g key={n}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="13"
                  fill={active.includes(n) ? "var(--accent)" : "var(--surface)"}
                  stroke={
                    seeds.includes(n)
                      ? "var(--insight-warm, #c8794f)"
                      : "var(--border)"
                  }
                  strokeWidth={seeds.includes(n) ? 3 : 1}
                />
                <text
                  x={p.x}
                  y={p.y + 3}
                  fill={
                    active.includes(n)
                      ? "var(--background)"
                      : "var(--foreground)"
                  }
                  fontSize="9"
                  textAnchor="middle"
                >
                  {n + 1}
                </text>
              </g>
            );
          })}
        </svg>
        <figcaption>
          Every node connects to two neighbours on each side. Blue = active;
          outlined = original seed.
        </figcaption>
      </figure>
      <div
        className="frontier-node-picker"
        role="group"
        aria-label="Select starting seeds"
      >
        {Array.from({ length: 20 }, (_, n) => (
          <button
            key={n}
            disabled={steps > 0}
            aria-pressed={seeds.includes(n)}
            aria-label={`Seed node ${n + 1}`}
            onClick={() =>
              edit(
                seeds.includes(n)
                  ? seeds.filter((i) => i !== n)
                  : [...seeds, n],
              )
            }
          >
            {n + 1}
          </button>
        ))}
      </div>
      <div className="play-actions">
        <button
          disabled={stalled}
          onClick={() => {
            setActive(next);
            setSteps((s) => s + 1);
          }}
        >
          Spread one step
        </button>
        <button onClick={() => edit([0, 1])}>Try adjacent seeds</button>
        <button onClick={resetSpread}>Edit seeds / restart spread</button>
      </div>
      <Stats
        items={[
          ["Starting seeds", String(seeds.length)],
          ["Active nodes", `${active.length}/20`],
          ["Synchronous steps", String(steps)],
        ]}
      />
      <p role="status" className="play-feedback">
        {stalled
          ? "No further nodes qualify under this rule. Try a seed cluster or change the reinforcement requirement."
          : `${next.length - active.length} more nodes qualify for the next step. Each step uses the previous state, not newly adopted neighbours.`}
      </p>
    </>
  );
}

export function PerformativeBoard() {
  const [response, setResponse] = useState(0.5),
    [values, setValues] = useState([20]);
  const prediction = values.at(-1)!,
    demand = deployedDemand(prediction, response);
  return (
    <>
      <Slider
        id="performative-response"
        label="Response to deployed forecast"
        min={-1.5}
        max={1.5}
        step={0.1}
        value={response}
        suffix="×"
        onChange={(v) => {
          setResponse(v);
          setValues([20]);
        }}
      />
      <Trajectory values={values} baseline={20} />
      <div className="play-actions">
        <button
          disabled={values.length >= 21}
          onClick={() =>
            setValues((v) => [...v, deployedDemand(v.at(-1)!, response)])
          }
        >
          Deploy and retrain once
        </button>
        <button
          onClick={() => {
            setResponse(-1.2);
            setValues([20]);
          }}
        >
          Try a strong negative response
        </button>
      </div>
      <Stats
        items={[
          ["Current prediction", fixed(prediction)],
          ["Demand if deployed now", fixed(demand)],
          ["Frozen-model demand", fixed(deployedDemand(20, response))],
        ]}
      />
      <p className="play-feedback" role="status">
        Cycle {values.length - 1}: the prediction {fixed(prediction)} would
        produce demand {fixed(demand)}. Retraining copies that result into the
        next prediction.{" "}
        {values.length >= 21
          ? "Twenty-cycle limit reached; reset or change the response to start again."
          : "Compare learning from deployment with leaving the initial prediction frozen."}
      </p>
      <p className="frontier-note">
        Invented response: demand = clamp(20 + response × prediction, 0, 100). A
        stable value in this model does not establish that it is socially
        desirable.
      </p>
    </>
  );
}

export function FairnessBoard() {
  const [a, setA] = useState(50),
    [b, setB] = useState(50);
  const groups = [fairnessCounts(20, a), fairnessCounts(60, b)];
  return (
    <>
      <div className="frontier-two-controls">
        <Slider
          id="fairness-a"
          label="Group A selection threshold"
          min={0}
          max={100}
          value={a}
          onChange={setA}
        />
        <Slider
          id="fairness-b"
          label="Group B selection threshold"
          min={0}
          max={100}
          value={b}
          onChange={setB}
        />
      </div>
      <p className="frontier-note">
        A: 20 actual positives / 100 · B: 60 actual positives / 100. Both groups
        use the same positive and negative score ranges; data are entirely
        synthetic.
      </p>
      <div className="frontier-metric-cards">
        {groups.map((g, i) => (
          <div key={i}>
            <h3>Group {i === 0 ? "A" : "B"}</h3>
            <dl>
              <dt>True-positive rate</dt>
              <dd>{pct(g.tpr)}</dd>
              <dt>False-positive rate</dt>
              <dd>{pct(g.fpr)}</dd>
              <dt>Positive predictive value</dt>
              <dd>{pct(g.ppv)}</dd>
              <dt>Selection rate</dt>
              <dd>{g.selected}%</dd>
            </dl>
          </div>
        ))}
      </div>
      <div className="frontier-table-wrap">
        <table className="simple-history">
          <caption>
            Exact counts: no demographic data or fitted predictions
          </caption>
          <thead>
            <tr>
              <th scope="col">Group</th>
              <th scope="col">True positives</th>
              <th scope="col">False positives</th>
              <th scope="col">False negatives</th>
              <th scope="col">True negatives</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g, i) => (
              <tr key={i}>
                <th scope="row">{i ? "B" : "A"}</th>
                <td>{g.tp}</td>
                <td>{g.fp}</td>
                <td>{g.fn}</td>
                <td>{g.tn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="play-actions">
        <button
          onClick={() => {
            setA(65);
            setB(65);
          }}
        >
          Try high shared thresholds
        </button>
        <button
          onClick={() => {
            setA(50);
            setB(35);
          }}
        >
          Try different thresholds
        </button>
      </div>
      <p role="status" className="play-feedback">
        Sensitivity gap: {Math.abs(groups[0].tpr - groups[1].tpr).toFixed(3)}.
        False-positive gap: {Math.abs(groups[0].fpr - groups[1].fpr).toFixed(3)}
        . Equalising one measure may change others.
      </p>
      <details className="frontier-log">
        <summary>What do these measures mean?</summary>
        <p>
          True-positive rate: selected positives / all actual positives.
          False-positive rate: selected negatives / all actual negatives.
          Positive predictive value: actual positives / all selected cases. No
          selections makes predictive value undefined.
        </p>
      </details>
      <p className="frontier-note">
        This is a threshold illustration, not a proof of a calibration theorem
        or a legal definition of fairness.
      </p>
    </>
  );
}

export function PrivacyBoard({ seed }: { seed: number }) {
  const [epsilon, setEpsilon] = useState(0.5),
    [releases, setReleases] = useState<{ value: number; epsilon: number }[]>(
      [],
    );
  const budget = releases.reduce((a, r) => a + r.epsilon, 0),
    mean = releases.length
      ? releases.reduce((a, r) => a + r.value, 0) / releases.length
      : null;
  function release() {
    setReleases((r) => [
      ...r,
      {
        value: 40 + laplaceNoise(epsilon, seededRandom(seed + 7919 * r.length)),
        epsilon,
      },
    ]);
  }
  return (
    <>
      <Slider
        id="privacy-epsilon"
        label="Epsilon for the next release"
        min={0.1}
        max={2}
        step={0.1}
        value={epsilon}
        onChange={setEpsilon}
      />
      <div className="frontier-privacy-count">
        <span>Synthetic true count: 40</span>
        <strong>{releases.length ? fixed(releases.at(-1)!.value) : "?"}</strong>
        <p>
          {releases.length
            ? "Latest noisy release"
            : "Release a protected teaching count"}
        </p>
      </div>
      <button disabled={releases.length >= 20} onClick={release}>
        Release another noisy count
      </button>
      <Stats
        items={[
          ["Noise scale next time", fixed(1 / epsilon)],
          ["Cumulative epsilon", fixed(budget)],
          ["Mean of releases", mean === null ? "No releases yet" : fixed(mean)],
        ]}
      />
      <p role="status" className="play-feedback">
        {releases.length
          ? `${releases.length} releases spent epsilon ${fixed(budget)} by basic composition. Averaging can reduce noise, but the releases consumed more privacy budget. Changing epsilon does not refund previous releases.`
          : "Lower epsilon adds more noise. The neighbouring dataset can differ by one person, so count sensitivity is one."}
      </p>
      {!!releases.length && (
        <details className="frontier-log">
          <summary>Inspect releases and budget</summary>
          <ol>
            {releases.map((r, i) => (
              <li key={i}>
                Release {i + 1}: {fixed(r.value)} · epsilon {fixed(r.epsilon)}
              </li>
            ))}
          </ol>
        </details>
      )}
      <p className="frontier-note">
        No personal data. Seeded randomness is for reproducibility, not
        production privacy. Releases are not clipped or rounded; the
        twenty-release cap is a teaching limit, not a safe privacy budget.
      </p>
    </>
  );
}
