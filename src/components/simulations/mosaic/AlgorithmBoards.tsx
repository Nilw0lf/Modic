"use client";
import { useState } from "react";
import { Actions, Stats, Ledger } from "./Shared";
import {
  rng,
  graphEdges,
  dijkstraStep,
  aStarStep,
  searchStart,
  cacheTrace,
  pageRequests,
  objectiveFunctions,
  queryCost,
  districtVotes,
  districtTotals,
} from "@/lib/simulations/mosaic";
export function Dijkstra() {
  const [distance, setDistance] = useState([
      0,
      Infinity,
      Infinity,
      Infinity,
      Infinity,
    ]),
    [closed, setClosed] = useState<number[]>([]);
  const xy = [
    [55, 110],
    [190, 40],
    [260, 180],
    [390, 90],
    [545, 140],
  ];
  function step() {
    const s = dijkstraStep(distance, closed);
    if (s) {
      setDistance(s.distance);
      setClosed(s.closed);
    }
  }
  return (
    <>
      <p>
        Find the cheapest route from A to E. Each step settles the unvisited
        node with the smallest tentative distance, then relaxes its outgoing
        edges. All weights are nonnegative.
      </p>
      <svg
        className="mosaic-graph"
        viewBox="0 0 600 240"
        role="img"
        aria-label="Weighted graph A B C D E"
      >
        {graphEdges.map(([a, b, w]) => (
          <g key={`${a}-${b}`}>
            <line
              x1={xy[a][0]}
              y1={xy[a][1]}
              x2={xy[b][0]}
              y2={xy[b][1]}
              stroke="var(--border)"
              strokeWidth="3"
            />
            <text
              x={(xy[a][0] + xy[b][0]) / 2}
              y={(xy[a][1] + xy[b][1]) / 2 - 8}
            >
              {w}
            </text>
          </g>
        ))}
        {xy.map(([x, y], i) => (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r="23"
              fill={closed.includes(i) ? "var(--accent)" : "var(--surface)"}
              stroke="currentColor"
            />
            <text
              x={x}
              y={y + 5}
              textAnchor="middle"
              style={{
                fill: closed.includes(i)
                  ? "var(--background)"
                  : "var(--foreground)",
              }}
            >
              {"ABCDE"[i]}
            </text>
          </g>
        ))}
      </svg>
      <Actions>
        <button disabled={closed.length === 5} onClick={step}>
          Settle next node
        </button>
      </Actions>
      <Ledger
        label="Tentative route costs from A"
        headers={["Node", "Cost", "State"]}
        rows={distance.map((d, i) => [
          "ABCDE"[i],
          Number.isFinite(d) ? d : "∞",
          closed.includes(i) ? "Settled" : "Tentative",
        ])}
      />
      <p aria-live="polite">
        {closed.includes(4)
          ? "E is settled at cost 7: A → B → C → D → E."
          : "A tentative distance can still improve before its node is settled."}
      </p>
    </>
  );
}
export function AStar() {
  const [blocked, setBlocked] = useState([2, 10, 18, 26, 34, 37, 38, 39, 40]),
    [weight, setWeight] = useState(1),
    [s, setS] = useState(searchStart);
  function run(all: boolean) {
    let next = s;
    for (let i = 0; i < (all ? 300 : 1) && !next.done; i++)
      next = aStarStep(next, blocked, weight);
    setS(next);
  }
  return (
    <>
      <p>
        Navigate an eight-by-six grid from S to G. Every move costs 1. Edit
        walls, then compare search using g + w × Manhattan distance. Diagonal
        movement is unavailable.
      </p>
      <Actions>
        {[0, 1, 3].map((w) => (
          <button
            key={w}
            aria-pressed={weight === w}
            onClick={() => {
              setWeight(w);
              setS(searchStart());
            }}
          >
            Heuristic weight {w}
          </button>
        ))}
      </Actions>
      <div className="mosaic-search-grid" aria-label="Editable search grid">
        {Array.from({ length: 48 }, (_, i) => (
          <button
            key={i}
            disabled={i === 0 || i === 47}
            aria-label={`Cell ${i}${blocked.includes(i) ? ", wall" : ""}`}
            className={
              blocked.includes(i)
                ? "wall"
                : s.path.includes(i)
                  ? "path"
                  : s.closed.includes(i)
                    ? "closed"
                    : s.open.includes(i)
                      ? "open"
                      : ""
            }
            onClick={() => {
              setBlocked(
                blocked.includes(i)
                  ? blocked.filter((v) => v !== i)
                  : [...blocked, i],
              );
              setS(searchStart());
            }}
          >
            {i === 0
              ? "S"
              : i === 47
                ? "G"
                : blocked.includes(i)
                  ? "■"
                  : s.path.includes(i)
                    ? "●"
                    : "·"}
          </button>
        ))}
      </div>
      <Actions>
        <button disabled={s.done} onClick={() => run(false)}>
          Expand one cell
        </button>
        <button disabled={s.done} onClick={() => run(true)}>
          Find route
        </button>
      </Actions>
      <Stats
        items={[
          ["Expanded cells", s.closed.length],
          ["Path length", s.path.length ? s.path.length - 1 : "—"],
          [
            "Result",
            s.done ? (s.path.length ? "Goal found" : "No route") : "Searching",
          ],
        ]}
      />
      <p>
        Shaded cells are expanded; outlined cells await expansion; dots trace
        the returned route. Dark blocks are walls. Weight 0 is uniform-cost
        search. Weight 1 is admissible here; weight 3 can sacrifice
        shortest-path guarantees.
      </p>
    </>
  );
}
export function Belady() {
  const [policy, setPolicy] = useState<"FIFO" | "LRU">("FIFO"),
    [count, setCount] = useState(0);
  const a = cacheTrace(3, policy, count),
    b = cacheTrace(4, policy, count);
  return (
    <>
      <p>
        The same request stream feeds caches of three and four slots. FIFO
        evicts the oldest arrival; LRU evicts the least recently used page. Hits
        only refresh order under LRU.
      </p>
      <p className="mosaic-request-stream">
        {pageRequests.map((p, i) => (
          <span key={i} className={i < count ? "visited" : ""}>
            {p}
          </span>
        ))}
      </p>
      <Actions>
        <button
          aria-pressed={policy === "LRU"}
          onClick={() => {
            setPolicy(policy === "FIFO" ? "LRU" : "FIFO");
            setCount(0);
          }}
        >
          Policy: {policy}
        </button>
        <button disabled={count === 12} onClick={() => setCount(count + 1)}>
          Request next page
        </button>
        <button disabled={count === 12} onClick={() => setCount(12)}>
          Replay all requests
        </button>
      </Actions>
      <Stats
        items={[
          ["Requests processed", count],
          ["3-slot faults", a.faults],
          ["4-slot faults", b.faults],
        ]}
      />
      <Ledger
        label="Identical requests, different capacities"
        headers={["Request", "3 slots / result", "4 slots / result"]}
        rows={a.rows.map((r, i) => [
          r.page,
          `${r.cache.join(" · ")} / ${r.hit ? "hit" : "fault"}`,
          `${b.rows[i].cache.join(" · ")} / ${b.rows[i].hit ? "hit" : "fault"}`,
        ])}
      />
      <p>
        For this complete stream, FIFO faults increase from 9 to 10 when
        capacity rises. LRU has the stack property; this anomaly does not apply
        to it.
      </p>
    </>
  );
}
export function NoFreeLunch({ seed }: { seed: number }) {
  const [monotone, setMonotone] = useState(false),
    [reverse, setReverse] = useState(false),
    [count, setCount] = useState(0);
  const family = objectiveFunctions(monotone),
    f = family[Math.floor(rng(seed)() * family.length)],
    order = reverse ? [3, 2, 1, 0] : [0, 1, 2, 3],
    seen = order.slice(0, count),
    found = seen.some((i) => f[i] === 1),
    average = (rev: boolean) =>
      family.reduce((s, v) => s + queryCost(v, rev), 0) / family.length;
  return (
    <>
      <p>
        Four locations hide zeros and ones. Find the first 1, or exhaust all
        four. Each objective in the selected family is equally likely. The
        all-zero objective takes four probes and has no success.
      </p>
      <Actions>
        <button
          disabled={count > 0}
          aria-pressed={monotone}
          onClick={() => setMonotone(!monotone)}
        >
          Family: {monotone ? "Nondecreasing only" : "All 16 binary objectives"}
        </button>
        <button
          disabled={count > 0}
          aria-pressed={reverse}
          onClick={() => setReverse(!reverse)}
        >
          Search: {reverse ? "Right to left" : "Left to right"}
        </button>
        <button
          disabled={found || count === 4}
          onClick={() => setCount(count + 1)}
        >
          Probe next location
        </button>
      </Actions>
      <div className="mosaic-cards">
        {f.map((v, i) => (
          <span key={i}>
            Location {i + 1}
            <strong>{seen.includes(i) ? v : "?"}</strong>
          </span>
        ))}
      </div>
      <Stats
        items={[
          ["Probes used", count],
          [
            "Outcome",
            found ? "Found 1" : count === 4 ? "No 1 exists" : "Unresolved",
          ],
          ["Objectives in family", family.length],
        ]}
      />
      <Ledger
        label="Exact average probes across the entire selected family"
        headers={["Left to right", "Right to left"]}
        rows={[[average(false).toFixed(3), average(true).toFixed(3)]]}
      />
      <p>
        Equal averages require this uniform unrestricted family and these
        non-repeating searches. Restricting the family introduces useful
        structure; this is not a claim that all practical algorithms perform
        equally.
      </p>
    </>
  );
}
export function Districts() {
  const [votes, setVotes] = useState(districtVotes),
    [columns, setColumns] = useState(false);
  const rows = districtTotals(votes, false),
    cols = districtTotals(votes, true),
    totals = columns ? cols : rows;
  return (
    <>
      <p>
        Twenty-five equal-population cells form five contiguous districts of
        five. A and B each need three votes to win a district. Compare row and
        column maps without changing voters.
      </p>
      <Actions>
        <button aria-pressed={columns} onClick={() => setColumns(!columns)}>
          District map: {columns ? "Columns" : "Rows"}
        </button>
      </Actions>
      <div className={`mosaic-districts ${columns ? "columns" : "rows"}`}>
        {votes.map((v, i) => (
          <button
            key={i}
            aria-label={`Voter ${i + 1}: ${v ? "A" : "B"}`}
            data-party={v ? "A" : "B"}
            onClick={() => setVotes(votes.map((x, j) => (i === j ? 1 - x : x)))}
          >
            {v ? "A" : "B"}
          </button>
        ))}
      </div>
      <Stats
        items={[
          [
            "A vote share",
            ((votes.reduce((a, b) => a + b, 0) / 25) * 100).toFixed(0) + "%",
          ],
          ["A seats with rows", rows.filter((v) => v >= 3).length + " / 5"],
          ["A seats with columns", cols.filter((v) => v >= 3).length + " / 5"],
        ]}
      />
      <Ledger
        label="Selected map district totals"
        headers={["District", "A votes", "B votes", "Winner"]}
        rows={totals.map((v, i) => [i + 1, v, 5 - v, v >= 3 ? "A" : "B"])}
      />
      <p>
        Click a voter to explore another geography. The initial map has 52% A
        voters but either four or two A seats. Seat disparity alone establishes
        neither intent nor a legal conclusion.
      </p>
    </>
  );
}
