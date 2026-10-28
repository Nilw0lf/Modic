"use client";
import type { ComponentType } from "react";
import { useState } from "react";
import { Actions, Slider, Stats, Chart, Plot, Ledger, fixed } from "./Shared";
import {
  socialEdges,
  reachable,
  confidenceOpinions,
  voter,
  degroot,
  homophily,
} from "@/lib/simulations/prism";
function Graph({ count, edges }: { count: number; edges: [number, number][] }) {
  const point = (i: number) => [
    200 + 125 * Math.cos((2 * Math.PI * i) / count),
    155 + 125 * Math.sin((2 * Math.PI * i) / count),
  ];
  return (
    <svg
      viewBox="0 0 400 310"
      role="img"
      aria-label={`${count} nodes and ${edges.length} undirected edges`}
    >
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={point(a)[0]}
          y1={point(a)[1]}
          x2={point(b)[0]}
          y2={point(b)[1]}
          stroke="var(--border)"
          strokeWidth="2"
        />
      ))}
      {Array.from({ length: count }, (_, i) => (
        <g key={i}>
          <circle
            cx={point(i)[0]}
            cy={point(i)[1]}
            r="15"
            fill={i < count / 2 ? "var(--accent)" : "var(--foreground)"}
          />
          <text
            x={point(i)[0]}
            y={point(i)[1] + 5}
            textAnchor="middle"
            style={{ fill: "var(--background)" }}
          >
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}
export function WeakTies() {
  const [removed, setRemoved] = useState("None"),
    edges = socialEdges.filter(([a, b]) =>
      removed === "Bridge"
        ? !(a === 2 && b === 3)
        : removed === "Local"
          ? !(a === 0 && b === 1)
          : true,
    );
  return (
    <>
      <p>
        Two three-person friendship triangles are joined by one stipulated weak
        bridge, edge 3–4. Every within-triangle edge is stipulated strong. Test
        reachability from person 1 after losing a connection.
      </p>
      <Graph count={6} edges={edges} />
      <Actions>
        <button onClick={() => setRemoved("Bridge")}>
          Remove weak bridge 3–4
        </button>
        <button onClick={() => setRemoved("Local")}>
          Remove strong local edge 1–2
        </button>
        <button onClick={() => setRemoved("None")}>
          Restore all connections
        </button>
      </Actions>
      <Stats
        items={[
          ["People reachable from person 1", reachable(edges).length],
          ["Edges remaining", edges.length],
        ]}
      />
      <p>
        A bridge can expose another local circle to information. Real weak ties
        are not all bridges, and strength cannot be inferred just from a network
        drawing; this graph isolates one structural possibility.
      </p>
    </>
  );
}
export function Bounded() {
  const [epsilon, setEpsilon] = useState(0.2),
    [steps, setSteps] = useState(0),
    history = confidenceOpinions(epsilon, steps),
    last = history.at(-1)!,
    sorted = [...last].sort((a, b) => a - b),
    components =
      1 +
      sorted.slice(1).filter((v, i) => v - sorted[i] > epsilon + 1e-8).length;
  return (
    <>
      <p>
        Eight opinions lie between zero and one. At each synchronous round, a
        person averages all current opinions within distance ε, including their
        own.
      </p>
      <Slider
        label="Confidence bound ε"
        min={0.05}
        max={1}
        step={0.05}
        value={epsilon}
        onChange={(v) => {
          setEpsilon(v);
          setSteps(0);
        }}
      />
      <Actions>
        <button
          disabled={steps >= 30}
          onClick={() => setSteps(Math.min(30, steps + 5))}
        >
          Average for five rounds
        </button>
      </Actions>
      <Plot
        series={last.map((_, i) => ({
          name: `Person ${i + 1}`,
          points: history.map((row, t) => [t, row[i]]),
        }))}
        maxX={Math.max(1, steps)}
        xLabel="Round"
        yLabel="Opinion"
      />
      <Ledger
        label="Current opinions"
        headers={["Person", "Opinion"]}
        rows={last.map((value, i) => [i + 1, fixed(value, 3)])}
      />
      <Stats
        items={[
          ["Rounds", steps],
          ["Confidence components now", components],
          ["Opinion range", fixed(Math.max(...last) - Math.min(...last), 3)],
        ]}
      />
      <p>
        Wide confidence bounds connect everyone; narrow bounds can preserve
        separate groups. A component count is not a diagnostic of real
        polarisation, and this model has no evidence quality, institutions or
        changing trust.
      </p>
    </>
  );
}
export function Voter({ seed }: { seed: number }) {
  const [steps, setSteps] = useState(0),
    m = voter(seed, steps),
    consensus = m.state.every((v) => v === m.state[0]);
  return (
    <>
      <p>
        Eight people occupy a ring. Each asynchronous update selects a random
        person and copies one random neighbour’s binary opinion. There is no
        preference advantage or truth signal.
      </p>
      <div className="prism-cards">
        {m.state.map((v, i) => (
          <span key={i}>
            Person {i + 1}
            <b>{v ? "B" : "A"}</b>
          </span>
        ))}
      </div>
      <Actions>
        <button
          disabled={consensus || steps >= 500}
          onClick={() => setSteps(steps + 1)}
        >
          Copy one neighbour
        </button>
        <button
          disabled={consensus || steps >= 500}
          onClick={() => setSteps(Math.min(500, steps + 20))}
        >
          Run 20 copying updates
        </button>
      </Actions>
      <Chart
        lines={[{ name: "People holding B", values: m.history }]}
        min={0}
        max={8}
        label="Voter-model opinion count"
        xLabel="Asynchronous updates"
      />
      <Stats
        items={[
          ["Updates", steps],
          ["B count", m.state.reduce((a, b) => a + b, 0)],
          ["Consensus", consensus ? "Reached; absorbing" : "Not yet"],
        ]}
      />
      <p>
        Finite connected voter models can reach consensus through copying alone.
        Consensus is not evidence of truth, independent agreement or a superior
        opinion. A 20-update button can include updates after consensus, which
        leave the state unchanged.
      </p>
    </>
  );
}
export function DeGroot() {
  const [stubborn, setStubborn] = useState(false),
    [steps, setSteps] = useState(0),
    history = degroot(stubborn, steps),
    last = history.at(-1)!;
  return (
    <>
      <p>
        Three agents begin at beliefs 0, 0.4 and 1. A averages itself and B; B
        uses weights 0.25, 0.5, 0.25; C averages B and itself. Optionally make A
        keep its original belief forever.
      </p>
      <Actions>
        <button
          aria-pressed={stubborn}
          onClick={() => {
            setStubborn(!stubborn);
            setSteps(0);
          }}
        >
          Agent A: {stubborn ? "Stubborn" : "Averaging"}
        </button>
        <button
          disabled={steps >= 30}
          onClick={() => setSteps(Math.min(30, steps + 5))}
        >
          Exchange beliefs for five rounds
        </button>
      </Actions>
      <Plot
        series={last.map((_, i) => ({
          name: `Agent ${"ABC"[i]}`,
          points: history.map((row, t) => [t, row[i]]),
        }))}
        maxX={Math.max(1, steps)}
        xLabel="Round"
        yLabel="Belief"
      />
      <Stats
        items={[
          ["A belief", fixed(last[0], 3)],
          ["B belief", fixed(last[1], 3)],
          ["C belief", fixed(last[2], 3)],
          ["Averaging-network consensus limit", stubborn ? "0.000" : "0.450"],
        ]}
      />
      <p>
        The ordinary network weights initial beliefs by influence (0.25, 0.5,
        0.25). Repeated averaging can converge without new evidence; it is not
        Bayesian updating or a guarantee of accuracy.
      </p>
    </>
  );
}
export function Homophily({ seed }: { seed: number }) {
  const [bias, setBias] = useState(0.5),
    edges = homophily(seed, bias),
    same = edges.filter(([a, b]) => a < 6 === b < 6).length;
  return (
    <>
      <p>
        Twelve nodes belong to two groups of six. Increase a same-group linking
        preference while holding the random draws fixed. Within- and cross-group
        connection probabilities change, so total edge count can change too.
      </p>
      <Slider
        label="Same-group preference"
        min={0}
        max={1}
        step={0.1}
        value={bias}
        onChange={setBias}
      />
      <Graph count={12} edges={edges} />
      <Stats
        items={[
          ["Within-group connection probability", fixed(0.15 + 0.65 * bias)],
          ["Cross-group connection probability", fixed(0.8 - 0.65 * bias)],
          ["Actual within-group edges", same],
          ["Actual cross-group edges", edges.length - same],
        ]}
      />
      <p>
        Homophily describes similarity among connected people. This authored
        link rule supplies a preference mechanism, but an observed network can
        also reflect opportunities, institutions or shared geography; the
        drawing cannot identify the cause by itself.
      </p>
    </>
  );
}

export default function GroupBoard({
  index,
  seed,
}: {
  index: number;
  seed: number;
}) {
  const B = [WeakTies, Bounded, Voter, DeGroot, Homophily][
    index
  ] as ComponentType<{ seed: number }>;
  return <B seed={seed} />;
}
