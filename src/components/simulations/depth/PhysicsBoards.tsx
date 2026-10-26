"use client";
import { useState } from "react";
import { criticalPath, taskNames, resonance } from "@/lib/simulations/depth";
import { Actions, Chart, Ledger, Slider, Stats, fmt, pct } from "./Shared";
export function Resonance() {
  const [w, setW] = useState(1),
    [c, setC] = useState(0.3),
    [motion, setMotion] = useState(false);
  const amp = resonance(w, c),
    phase = Math.atan2(c * w, 1 - w * w);
  return (
    <>
      <Slider
        id="frequency"
        label="Drive frequency / natural frequency"
        value={w}
        min={0.2}
        max={2}
        step={0.05}
        onChange={setW}
      />
      <Slider
        id="damping"
        label="Damping coefficient"
        value={c}
        min={0.1}
        max={2}
        step={0.1}
        onChange={setC}
      />
      <Actions>
        <button aria-pressed={motion} onClick={() => setMotion((v) => !v)}>
          {motion ? "Frequency response" : "Inspect steady oscillation"}
        </button>
      </Actions>
      {motion ? (
        <Chart
          label="Steady displacement over 12 time units"
          min={-11}
          max={11}
          xLabel="Time 0 → 12"
          lines={[
            {
              name: "Displacement",
              values: Array.from(
                { length: 121 },
                (_, i) => amp * Math.cos((w * i) / 10 - phase),
              ),
            },
          ]}
        />
      ) : (
        <Chart
          label="Steady amplitude across drive frequencies"
          min={0}
          max={11}
          xLabel="Frequency ratio 0.2 → 2"
          lines={[
            {
              name: "Amplitude",
              values: Array.from({ length: 73 }, (_, i) =>
                resonance(0.2 + i * 0.025, c),
              ),
            },
          ]}
        />
      )}
      <Stats
        items={[
          ["Amplitude at chosen frequency", fmt(amp)],
          ["Phase lag (radians)", fmt(phase)],
        ]}
      />
      <p>
        Unit mass, stiffness and driving force. The response is the steady state
        after transients die away. Damping both limits and shifts the resonance
        peak.
      </p>
    </>
  );
}
export function Feedback() {
  const [gain, setGain] = useState(0.8),
    [delay, setDelay] = useState(2),
    [path, setPath] = useState([50]);
  const stopped = Math.abs(path.at(-1)!) > 1000;
  const advance = () =>
    setPath((old) => {
      const p = [...old];
      for (let i = 0; i < 5; i++) {
        if (Math.abs(p.at(-1)!) > 1000) break;
        const t = p.length - 1;
        p.push(p[t] + gain * (100 - p[Math.max(0, t - delay)]));
      }
      return p;
    });
  return (
    <>
      <Slider
        id="gain"
        label="Correction gain"
        value={gain}
        min={0.1}
        max={1.6}
        step={0.1}
        onChange={(v) => {
          setGain(v);
          setPath([50]);
        }}
      />
      <Slider
        id="delay"
        label="Measurement delay (steps)"
        value={delay}
        min={0}
        max={5}
        onChange={(v) => {
          setDelay(v);
          setPath([50]);
        }}
      />
      <Actions>
        <button disabled={stopped || path.length > 100} onClick={advance}>
          Advance five steps
        </button>
        <button
          disabled={stopped}
          onClick={() => setPath((p) => [...p.slice(0, -1), p.at(-1)! - 20])}
        >
          Apply −20 disturbance
        </button>
      </Actions>
      <Chart
        label="Controlled state versus target 100"
        min={Math.min(0, ...path)}
        max={Math.max(150, ...path)}
        lines={[
          { name: "State", values: path },
          { name: "Target", values: path.map(() => 100) },
        ]}
      />
      <Stats
        items={[
          ["Current state", fmt(path.at(-1)!)],
          ["Updates", String(path.length - 1)],
          ["Status", stopped ? "Numerical guard reached" : "Running"],
        ]}
      />
      <p>
        Each update adds gain × (100 − delayed state). Old measurements can
        drive repeated overcorrection. The run stops beyond magnitude 1,000 to
        keep the chart readable; this guard is not a physical saturation model.
      </p>
    </>
  );
}
export function Critical() {
  const [d, setD] = useState([3, 4, 2, 5, 3, 2]),
    [tokens, setTokens] = useState(3);
  const r = criticalPath(d);
  return (
    <>
      <p className="depth-callout">
        A → C and D · B → E · C, D and E → F.
        <br />
        Spend three acceleration tokens. Each removes one day from one task.
      </p>
      <div className="depth-cards depth-project">
        {d.map((n, i) => (
          <div key={i} className={r.slack[i] === 0 ? "marked" : ""}>
            <b>{taskNames[i]}</b>
            <p>
              {n} days · slack {r.slack[i]}
            </p>
            <button
              disabled={!tokens || n <= 1}
              onClick={() => {
                setD((v) => v.map((x, j) => (j === i ? x - 1 : x)));
                setTokens((v) => v - 1);
              }}
            >
              Shorten task {String.fromCharCode(65 + i)}
            </button>
          </div>
        ))}
      </div>
      <Stats
        items={[
          ["Project duration", `${r.total} days`],
          ["Tokens left", String(tokens)],
        ]}
      />
      <Ledger
        label="Dependency schedule"
        headers={["Task", "Earliest finish", "Slack"]}
        rows={d.map((_, i) => [taskNames[i], r.finish[i], r.slack[i]])}
      />
      <p>
        Zero-slack tasks sit on a critical path. Shortening a noncritical task
        may not bring launch forward; after a change, another path can become
        critical.
      </p>
    </>
  );
}
export function Brachistochrone() {
  const [g, setG] = useState(9.8),
    [r, setR] = useState(1),
    [time, setTime] = useState(0);
  const tc = Math.PI * Math.sqrt(r / g),
    tl = Math.sqrt(Math.PI ** 2 + 4) * Math.sqrt(r / g),
    theta = Math.min(Math.PI, time * Math.sqrt(g / r)),
    f = Math.min(1, (time / tl) ** 2);
  const x = (a: number) => 65 + (a / (Math.PI * r)) * 460,
    y = (a: number) => 35 + (a / (2 * r)) * 155;
  const path = Array.from({ length: 61 }, (_, i) => {
    const t = (i * Math.PI) / 60;
    return `${x(r * (t - Math.sin(t)))},${y(r * (1 - Math.cos(t)))}`;
  }).join(" ");
  return (
    <>
      <Slider
        id="gravity"
        label="Gravity (m/s²)"
        value={g}
        min={1.6}
        max={10}
        step={0.1}
        onChange={(v) => {
          setG(v);
          setTime(0);
        }}
      />
      <svg
        className="depth-race"
        viewBox="0 0 600 250"
        role="img"
        aria-label="Race between a straight ramp and a cycloid"
      >
        <path
          d="M65 35 L525 190"
          fill="none"
          className="depth-secondary"
          strokeWidth="3"
        />
        <polyline
          points={path}
          className="depth-primary"
          fill="none"
          strokeWidth="3"
        />
        <circle
          cx={x(r * (theta - Math.sin(theta)))}
          cy={y(r * (1 - Math.cos(theta)))}
          r="9"
          className="depth-primary"
        />
        <circle
          cx={x(Math.PI * r * f)}
          cy={y(2 * r * f)}
          r="7"
          className="depth-secondary"
        />
      </svg>
      <p className="depth-race-caption">
        Same start, same finish. Blue curve: cycloid. Green ramp: straight.
      </p>
      <Actions>
        <button
          disabled={time >= tl}
          onClick={() => setTime((v) => Math.min(tl, v + 0.1))}
        >
          Advance 0.1 second
        </button>
        <button
          onClick={() => {
            setR((v) => (v === 1 ? 2 : 1));
            setTime(0);
          }}
        >
          Drop height: {2 * r} m
        </button>
      </Actions>
      <Stats
        items={[
          ["Elapsed", fmt(time) + " s"],
          ["Cycloid arrival", fmt(tc) + " s"],
          ["Straight arrival", fmt(tl) + " s"],
          [
            "Lengths cycloid / straight",
            `${fmt(4 * r)} / ${fmt(r * Math.sqrt(Math.PI ** 2 + 4))} m`,
          ],
        ]}
      />
      <p>
        Frictionless point particles start at rest. For these endpoints, the
        deeper initial descent gains speed early. A longer route can take less
        time.
      </p>
    </>
  );
}
export function Carnot() {
  const [hot, setHot] = useState(600),
    [cold, setCold] = useState(300),
    [work, setWork] = useState(40),
    [runs, setRuns] = useState(0),
    [message, setMessage] = useState("");
  const limit = 1 - cold / hot,
    entropy = (100 - work) / cold - 100 / hot;
  return (
    <>
      <Slider
        id="hot"
        label="Hot reservoir (K)"
        value={hot}
        min={400}
        max={900}
        step={10}
        onChange={(v) => {
          setHot(v);
          setRuns(0);
          setMessage("");
        }}
      />
      <Slider
        id="cold"
        label="Cold reservoir (K)"
        value={cold}
        min={250}
        max={350}
        step={10}
        onChange={(v) => {
          setCold(v);
          setRuns(0);
          setMessage("");
        }}
      />
      <Slider
        id="work"
        label="Proposed work from 100 heat units"
        value={work}
        min={0}
        max={100}
        onChange={setWork}
      />
      <Actions>
        <button
          onClick={() => {
            if (work > 100 * limit + 1e-8)
              setMessage(
                "Rejected: this proposal would reduce total reservoir entropy.",
              );
            else {
              setRuns((v) => v + 1);
              setMessage(
                `Admissible cycle: ${work} work units, ${100 - work} heat units rejected.`,
              );
            }
          }}
        >
          Test proposed cycle
        </button>
      </Actions>
      <Stats
        items={[
          ["Carnot efficiency limit", pct(limit)],
          ["Proposed efficiency", `${work}%`],
          ["Reservoir entropy change", fmt(entropy, 4)],
          ["Admissible cycles", String(runs)],
        ]}
      />
      <p role="status">
        {message ||
          "Choose a work output, then test it against the second law."}
      </p>
      <p>
        A nonnegative reservoir entropy change passes this necessary
        thermodynamic check. It does not supply an engineering design or prove
        that a proposed engine can be built.
      </p>
    </>
  );
}
