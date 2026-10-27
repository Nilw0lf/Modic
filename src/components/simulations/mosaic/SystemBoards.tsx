"use client";
import { useState } from "react";
import { Actions, Slider, Stats, Chart } from "./Shared";
import {
  equilibrium,
  albedoPath,
  oscillator,
  enrichment,
} from "@/lib/simulations/mosaic";
export function LeChatelier() {
  const [a, setA] = useState(50),
    [b, setB] = useState(50),
    [k, setK] = useState(1);
  const q = b / a;
  function settle() {
    const e = equilibrium(a, b, k);
    setA(e.a);
    setB(e.b);
  }
  return (
    <>
      <p>
        A ⇌ B in a fixed-volume vessel. K = B/A at equilibrium. Add material,
        compare the reaction quotient Q with K, then let the mixture
        equilibrate.
      </p>
      <Slider
        id="equilibrium-constant-k"
        label="Equilibrium constant K"
        min={0.25}
        max={4}
        step={0.25}
        value={k}
        onChange={setK}
      />
      <div className="mosaic-vessel">
        <div style={{ flex: a }}>
          A<br />
          {a.toFixed(1)}
        </div>
        <div style={{ flex: b }}>
          B<br />
          {b.toFixed(1)}
        </div>
      </div>
      <Actions>
        <button onClick={() => setA(a + 10)}>Add 10 A</button>
        <button onClick={() => setB(b + 10)}>Add 10 B</button>
        <button onClick={settle}>Equilibrate mixture</button>
      </Actions>
      <Stats
        items={[
          ["Total A + B", (a + b).toFixed(1)],
          ["Q = B/A", q.toFixed(2)],
          [
            "Net direction",
            Math.abs(q - k) < 1e-9
              ? "At equilibrium"
              : q < k
                ? "A → B"
                : "B → A",
          ],
        ]}
      />
      <p>
        Only a one-to-one reaction and fixed-volume concentrations are
        represented. The button computes the equilibrium endpoint; it does not
        model reaction speed.
      </p>
    </>
  );
}
export function Minimum() {
  const [resources, setResources] = useState([30, 60, 80]),
    [tokens, setTokens] = useState(6);
  const names = ["Nitrogen", "Phosphorus", "Light"],
    yieldIndex = Math.min(...resources);
  return (
    <>
      <p>
        Grow a fictional plant to yield index 70 with six resource tokens. Each
        token adds ten units to one resource. Yield equals the smallest of the
        three indices.
      </p>
      <div className="mosaic-resources">
        {resources.map((v, i) => (
          <div key={i}>
            <span>
              {names[i]} · {v}
            </span>
            <meter min={0} max={100} value={v} />
            <button
              disabled={!tokens || v >= 100}
              onClick={() => {
                setResources(resources.map((x, j) => (i === j ? x + 10 : x)));
                setTokens(tokens - 1);
              }}
            >
              Add {names[i]}
            </button>
          </div>
        ))}
      </div>
      <Stats
        items={[
          ["Yield index", yieldIndex],
          ["Tokens left", tokens],
          ["Target", yieldIndex >= 70 ? "Reached!" : "70"],
        ]}
      />
      <p aria-live="polite">
        {names.filter((_, i) => resources[i] === yieldIndex).join(" and ")}{" "}
        currently limit growth. Adding a non-limiting resource leaves this
        minimum unchanged.
      </p>
      <p>
        These are normalised teaching indices, not fertilizer doses or a crop
        forecast. Real resources can interact and substitute.
      </p>
    </>
  );
}
export function Albedo() {
  const [solar, setSolar] = useState(1360),
    [warm, setWarm] = useState(false),
    [feedback, setFeedback] = useState(true),
    [steps, setSteps] = useState(0);
  const path = albedoPath(solar, warm, feedback, steps),
    t = path.at(-1)!,
    a = feedback ? 0.3 + 0.3 / (1 + Math.exp((t - 273) / 4)) : 0.3;
  function restart(fn: () => void) {
    fn();
    setSteps(0);
  }
  return (
    <>
      <p>
        A toy planet absorbs sunlight and emits heat. Colder temperatures raise
        reflectivity when ice feedback is enabled. One thermal step has no
        assigned duration.
      </p>
      <Slider
        id="incoming-sunlight-w-m-"
        label="Incoming sunlight (W/m²)"
        min={1000}
        max={1600}
        step={20}
        value={solar}
        onChange={(v) => restart(() => setSolar(v))}
      />
      <Actions>
        <button
          aria-pressed={warm}
          onClick={() => restart(() => setWarm(!warm))}
        >
          Initial state: {warm ? "Warm" : "Cold"}
        </button>
        <button
          aria-pressed={feedback}
          onClick={() => restart(() => setFeedback(!feedback))}
        >
          Ice feedback: {feedback ? "On" : "Off"}
        </button>
        <button
          disabled={steps >= 200}
          onClick={() => setSteps(Math.min(200, steps + 50))}
        >
          Advance 50 thermal steps
        </button>
      </Actions>
      <Chart
        lines={[
          { name: "Temperature °C", values: path.map((v) => v - 273.15) },
        ]}
        min={-70}
        max={60}
        label="Toy radiative-balance trajectory"
        xLabel={`${steps} thermal steps`}
      />
      <Stats
        items={[
          ["Temperature °C", (t - 273.15).toFixed(1)],
          ["Reflected fraction", a.toFixed(2)],
          ["Steps", steps],
        ]}
      />
      <p>
        Emissivity is fixed at 0.6. There are no oceans, clouds, carbon cycle or
        calibrated time scale. Compare initial states under identical sunlight;
        this is not a climate prediction.
      </p>
    </>
  );
}
export function Synchronization() {
  const [k, setK] = useState(0),
    [steps, setSteps] = useState(0),
    model = oscillator(k, steps);
  return (
    <>
      <p>
        Two oscillators have natural speeds 1 and 1.4 radians per time unit.
        Positive coupling pulls their phases together. Frequency locking can
        retain a nonzero phase gap.
      </p>
      <Slider
        id="coupling-strength-k"
        label="Coupling strength K"
        min={0}
        max={1}
        step={0.05}
        value={k}
        onChange={(v) => {
          setK(v);
          setSteps(0);
        }}
      />
      <svg
        className="mosaic-oscillators"
        viewBox="0 0 500 160"
        role="img"
        aria-label="Two oscillator phases"
      >
        {[model.a, model.b].map((phase, i) => (
          <g key={i} transform={`translate(${140 + i * 220},80)`}>
            <circle r="58" fill="none" stroke="currentColor" />
            <line
              x2={50 * Math.cos(phase)}
              y2={50 * Math.sin(phase)}
              stroke="var(--accent)"
              strokeWidth="4"
            />
            <circle
              cx={50 * Math.cos(phase)}
              cy={50 * Math.sin(phase)}
              r="8"
              fill="var(--accent)"
            />
          </g>
        ))}
      </svg>
      <Actions>
        <button
          disabled={steps >= 400}
          onClick={() => setSteps(Math.min(400, steps + 20))}
        >
          Advance one time unit
        </button>
      </Actions>
      <Stats
        items={[
          ["Time", (steps * 0.05).toFixed(1)],
          ["Wrapped phase gap", model.path.at(-1)!.toFixed(2) + " rad"],
          [
            "Locking possible",
            k > 0.2 ? "Yes, asymptotically" : "No stable lock",
          ],
        ]}
      />
      <Chart
        lines={[{ name: "Wrapped phase gap", values: model.path }]}
        min={-Math.PI}
        max={Math.PI}
        label="Phase difference over time"
        xLabel="Integration steps (0.05 time units)"
      />
      <p>
        The two-node Kuramoto equations use equal positive coupling. A vertical
        wrap at ±π is a plotting boundary, not a sudden physical jump.
      </p>
    </>
  );
}
export function Enrichment() {
  const [k, setK] = useState(1.5),
    [time, setTime] = useState(0),
    p = enrichment(k, time),
    tail = p.prey.slice(Math.floor(p.prey.length * 0.75));
  return (
    <>
      <p>
        A predator consumes prey at a saturating rate. Increase prey carrying
        capacity and watch both populations. More available resources can
        destabilise coexistence in this model.
      </p>
      <Slider
        id="prey-carrying-capacity-k"
        label="Prey carrying capacity K"
        min={1}
        max={6}
        step={0.5}
        value={k}
        onChange={(v) => {
          setK(v);
          setTime(0);
        }}
      />
      <Actions>
        <button
          disabled={time >= 200}
          onClick={() => setTime(Math.min(200, time + 50))}
        >
          Run 50 time units
        </button>
      </Actions>
      <Chart
        lines={[
          { name: "Prey", values: p.prey },
          { name: "Predator", values: p.predator },
        ]}
        min={0}
        max={Math.max(2, k, ...p.predator)}
        label="Rosenzweig–MacArthur population indices"
        xLabel={`${time} model time units`}
      />
      <Stats
        items={[
          ["Time simulated", time],
          ["Last-quarter prey minimum", Math.min(...tail).toFixed(3)],
          ["Last-quarter prey maximum", Math.max(...tail).toFixed(3)],
        ]}
      />
      <p>
        Prey growth rate is 1, handling constant 1, predator conversion 0.5 and
        mortality 0.2. The coexistence equilibrium loses local stability above K
        = 7/3. There is no extinction threshold or real species calibration.
      </p>
    </>
  );
}
