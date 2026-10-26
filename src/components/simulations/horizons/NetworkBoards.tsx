"use client";
import { useState } from "react";
import {
  pagerank,
  growNetwork,
  majority,
  hamming,
  decodeHamming,
  parrondoPath,
  parrondoDrift,
  rng,
} from "@/lib/simulations/horizons";
import {
  Actions,
  Chart,
  Ledger,
  Slider,
  Stats,
  fmt,
  pct,
} from "../depth/Shared";
export function Parrondo({ seed }: { seed: number }) {
  const [policy, setPolicy] = useState<"A" | "B" | "mix">("A"),
    [run, setRun] = useState(false),
    path = parrondoPath(policy, seed),
    batch = Array.from({ length: 100 }, (_, i) =>
      parrondoPath(policy, seed + i * 7919).at(-1)!,
    ),
    mix = policy === "A" ? 1 : policy === "B" ? 0 : 0.5;
  return (
    <>
      <p>
        Game A wins with probability 0.495. Game B wins with 0.095 when capital
        is divisible by three, otherwise 0.745. Win adds one; loss subtracts
        one.
      </p>
      <Actions>
        {(["A", "B", "mix"] as const).map((p) => (
          <button
            key={p}
            aria-pressed={policy === p}
            onClick={() => {
              setPolicy(p);
              setRun(false);
            }}
          >
            {p === "mix" ? "Mix A/B at random" : "Only " + p}
          </button>
        ))}
        <button onClick={() => setRun(true)}>Run 300 rounds</button>
      </Actions>
      {run && (
        <>
          <Chart
            label="One realised capital path"
            min={Math.min(-20, ...path)}
            max={Math.max(20, ...path)}
            lines={[{ name: policy, values: path }]}
          />
          <Stats
            items={[
              ["This path’s final capital", String(path.at(-1)!)],
              [
                "100-path mean final capital",
                fmt(batch.reduce((a, b) => a + b, 0) / 100),
              ],
              [
                "Stationary expected drift per round",
                fmt(parrondoDrift(mix), 4),
              ],
            ]}
          />
        </>
      )}
      <p>
        The mixture changes how often capital visits each remainder class.
        Neither positive drift nor one winning path guarantees profit. These
        fictional dependent games do not provide a casino or investment
        strategy.
      </p>
    </>
  );
}
function RankGraph({ edges, rank }: { edges: number[][]; rank: number[] }) {
  const p = [
      [80, 65],
      [280, 65],
      [280, 230],
      [80, 230],
    ],
    radius = rank.map((r) => 16 + 24 * Math.sqrt(r));
  return (
    <figure className="horizon-rank-map">
      <svg
        className="horizon-scene"
        viewBox="0 0 360 310"
        role="img"
        aria-label="Directed link graph; larger nodes have higher PageRank"
      >
        <defs>
          <marker
            id="horizon-rank-arrow"
            viewBox="0 0 6 6"
            refX="6"
            refY="3"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0 L6 3 L0 6 Z" fill="var(--positive)" />
          </marker>
        </defs>
        {edges.flatMap((links, i) =>
          links.map((j) => {
            const dx = p[j][0] - p[i][0],
              dy = p[j][1] - p[i][1],
              length = Math.hypot(dx, dy),
              vx = dx / length,
              vy = dy / length;
            return (
              <path
                key={`${i}-${j}`}
                d={`M${p[i][0] + vx * radius[i]},${p[i][1] + vy * radius[i]} Q${(p[i][0] + p[j][0]) / 2 - vy * 18},${(p[i][1] + p[j][1]) / 2 + vx * 18} ${p[j][0] - vx * (radius[j] + 4)},${p[j][1] - vy * (radius[j] + 4)}`}
                fill="none"
                stroke="var(--positive)"
                strokeWidth="2"
                markerEnd="url(#horizon-rank-arrow)"
              />
            );
          }),
        )}
        {p.map(([x, y], i) => (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r={radius[i]}
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <text
              x={x}
              y={y + 6}
              textAnchor="middle"
              style={{ fontSize: 20, fontWeight: 600 }}
            >
              {"ABCD"[i]}
            </text>
            <text
              x={x}
              y={y + radius[i] + 22}
              textAnchor="middle"
              style={{ fontSize: 17 }}
            >
              {pct(rank[i])}
            </text>
          </g>
        ))}
      </svg>
      <figcaption>
        Arrows follow links. Node size increases with rank.
      </figcaption>
    </figure>
  );
}
export function PageRank() {
  const [edges, setEdges] = useState([[1, 2], [2], [0], [2]]),
    [d, setD] = useState(0.85);
  const rank = pagerank(edges, d);
  return (
    <>
      <p>
        A random surfer follows an outgoing link with probability d and
        otherwise jumps uniformly. A node with no outgoing links distributes its
        link-following mass uniformly.
      </p>
      <Slider
        id="damping"
        label="Link-following probability"
        value={d}
        min={0}
        max={0.95}
        step={0.05}
        onChange={setD}
      />
      <div className="horizon-rank-layout">
        <RankGraph edges={edges} rank={rank} />
        <div className="horizon-link-grid">
          {edges.flatMap((links, i) =>
            edges.map((_, j) =>
              i === j ? null : (
                <button
                  key={`${i}${j}`}
                  aria-pressed={links.includes(j)}
                  onClick={() =>
                    setEdges((e) =>
                      e.map((v, k) =>
                        k === i
                          ? v.includes(j)
                            ? v.filter((n) => n !== j)
                            : [...v, j]
                          : v,
                      ),
                    )
                  }
                >
                  {"ABCD"[i]} → {"ABCD"[j]}
                </button>
              ),
            ),
          )}
        </div>
      </div>
      <Ledger
        label="Ranks after 100 power iterations"
        headers={["Node", "Outgoing links", "Rank"]}
        rows={rank.map((r, i) => [
          "ABCD"[i],
          edges[i].map((j) => "ABCD"[j]).join(", ") ||
            "None — distribute uniformly",
          pct(r),
        ])}
      />
      <Stats
        items={[
          [
            "Total rank",
            fmt(
              rank.reduce((a, b) => a + b, 0),
              3,
            ),
          ],
        ]}
      />
      <p>
        This small link-only model demonstrates PageRank mass flow. It does not
        reproduce modern search ranking or imply that more links alone guarantee
        search traffic.
      </p>
    </>
  );
}
export function Attachment({ seed }: { seed: number }) {
  const [count, setCount] = useState(12),
    [prefer, setPrefer] = useState(true),
    network = growNetwork(count, prefer, seed),
    hub = network.degrees.indexOf(Math.max(...network.degrees));
  const pos = (i: number) => [
    180 + 125 * Math.cos((2 * Math.PI * i) / count),
    180 + 125 * Math.sin((2 * Math.PI * i) / count),
  ];
  return (
    <>
      <Slider
        id="network-size"
        label="Nodes in the growing network"
        value={count}
        min={2}
        max={40}
        onChange={setCount}
      />
      <Actions>
        <button aria-pressed={prefer} onClick={() => setPrefer(true)}>
          Prefer existing degree
        </button>
        <button aria-pressed={!prefer} onClick={() => setPrefer(false)}>
          Choose uniformly
        </button>
      </Actions>
      <svg
        className="horizon-scene"
        viewBox="0 0 360 360"
        role="img"
        aria-label={`${count}-node growing network; node ${hub + 1} has the highest degree`}
      >
        {network.edges.map(([a, b], i) => (
          <line
            key={i}
            x1={pos(a)[0]}
            y1={pos(a)[1]}
            x2={pos(b)[0]}
            y2={pos(b)[1]}
            stroke="var(--border)"
            strokeWidth="2"
          />
        ))}
        {network.degrees.map((degree, i) => (
          <g key={i}>
            <circle
              cx={pos(i)[0]}
              cy={pos(i)[1]}
              r={4 + Math.sqrt(degree) * 3}
              fill={i === hub ? "var(--accent)" : "var(--positive)"}
            />
            {count <= 16 && (
              <text x={pos(i)[0]} y={pos(i)[1] - 13} textAnchor="middle">
                {i + 1}
              </text>
            )}
          </g>
        ))}
      </svg>
      <Stats
        items={[
          ["Highest degree", String(network.degrees[hub])],
          ["Hub node", String(hub + 1)],
          ["Edges", String(network.edges.length)],
        ]}
      />
      <p>
        Each new node adds one undirected edge. Preferential mode chooses a
        neighbour in proportion to existing degree; uniform mode ignores degree.
        A forty-node drawing does not establish a power-law fit or explain every
        real network.
      </p>
    </>
  );
}
export function Jury({ seed }: { seed: number }) {
  const [n, setN] = useState(9),
    [p, setP] = useState(60),
    [common, setCommon] = useState(0),
    [show, setShow] = useState(false),
    random = rng(seed),
    shared = random() < common / 100,
    sharedVote = random() < p / 100,
    votes = Array.from({ length: n }, () =>
      shared ? sharedVote : random() < p / 100,
    ),
    correct = votes.filter(Boolean).length,
    accuracy =
      ((common / 100) * p) / 100 + (1 - common / 100) * majority(n, p / 100);
  return (
    <>
      <Slider
        id="jurors"
        label="Odd-sized jury"
        value={n}
        min={1}
        max={21}
        step={2}
        onChange={(v) => {
          setN(v);
          setShow(false);
        }}
      />
      <Slider
        id="competence"
        label="Each voter’s correctness probability"
        value={p}
        min={10}
        max={90}
        step={5}
        suffix="%"
        onChange={(v) => {
          setP(v);
          setShow(false);
        }}
      />
      <Slider
        id="shared-error"
        label="Chance all voters use one shared signal"
        value={common}
        min={0}
        max={100}
        step={10}
        suffix="%"
        onChange={(v) => {
          setCommon(v);
          setShow(false);
        }}
      />
      <Stats
        items={[
          ["Majority correctness probability", pct(accuracy)],
          ["Individual correctness", `${p}%`],
        ]}
      />
      <Actions>
        <button onClick={() => setShow(true)}>Reveal one jury vote</button>
      </Actions>
      {show && (
        <>
          <div className="horizon-votes">
            {votes.map((v, i) => (
              <span key={i}>{v ? "✓" : "×"}</span>
            ))}
          </div>
          <p role="status">
            {correct}/{n} correct votes. Majority{" "}
            {correct > n / 2 ? "correct" : "incorrect"}. This round used{" "}
            {shared ? "one shared signal" : "independent signals"}.
          </p>
        </>
      )}
      <p>
        Condorcet’s familiar result depends on competence and independence. The
        common-signal mixture is an authored dependence model, not a universal
        correlation adjustment or a claim that voting determines factual truth.
      </p>
    </>
  );
}
export function Hamming() {
  const [data, setData] = useState([1, 0, 1, 1]),
    [errors, setErrors] = useState<number[]>([]),
    [done, setDone] = useState(false),
    encoded = hamming(data),
    received = encoded.map((b, i) => (errors.includes(i) ? b ^ 1 : b)),
    decoded = decodeHamming(received);
  return (
    <>
      <p>
        Encode four data bits into seven bits with even parity. Flip
        transmission bits, then run a decoder that assumes at most one error.
      </p>
      <Actions>
        {data.map((b, i) => (
          <button
            key={i}
            aria-label={`Toggle data bit ${i + 1}`}
            onClick={() => {
              setData((v) => v.map((n, j) => (i === j ? n ^ 1 : n)));
              setErrors([]);
              setDone(false);
            }}
          >
            Data {i + 1}: {b}
          </button>
        ))}
      </Actions>
      <div className="horizon-code">
        {received.map((b, i) => (
          <button
            key={i}
            aria-label={`Flip transmission bit ${i + 1}`}
            aria-pressed={errors.includes(i)}
            onClick={() => {
              setErrors((v) =>
                v.includes(i) ? v.filter((n) => n !== i) : [...v, i],
              );
              setDone(false);
            }}
          >
            <small>
              {[0, 1, 3].includes(i) ? "Parity" : "Data"} · {i + 1}
            </small>
            <strong>{b}</strong>
          </button>
        ))}
      </div>
      <Actions>
        <button onClick={() => setDone(true)}>Decode received bits</button>
      </Actions>
      {done && (
        <Stats
          items={[
            ["Injected errors (simulator knows)", String(errors.length)],
            ["Syndrome", String(decoded.syndrome)],
            ["Decoded data", decoded.data.join("")],
            ["Original data", data.join("")],
            ["Match", decoded.data.join("") === data.join("") ? "Yes" : "No"],
          ]}
        />
      )}
      <p>
        Hamming(7,4) repairs any one-bit error. With two errors, this
        single-error decoder can flip a third bit and return wrong data. The
        simulator’s error count is not information available to the decoder;
        extended SECDED codes add another parity bit.
      </p>
    </>
  );
}
