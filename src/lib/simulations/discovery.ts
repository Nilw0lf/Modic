import { seededRandom } from "./random";
import type { Settings, Series } from "./everyday";
export const dice = [
  [2, 2, 4, 4, 9, 9],
  [1, 1, 6, 6, 8, 8],
  [3, 3, 5, 5, 7, 7],
];
export const dieChance = (a: number, b: number) =>
  dice[a].reduce((sum, x) => sum + dice[b].filter((y) => x > y).length, 0) / 36;
export const travelerPayoff = (a: number, b: number, bonus: number) =>
  a === b ? [a, b] : a < b ? [a + bonus, a - bonus] : [b - bonus, b + bonus];
export const nimSum = (piles: number[]) => piles.reduce((a, b) => a ^ b, 0);
export function nimBot(piles: number[]) {
  const xor = nimSum(piles);
  for (let i = 0; i < piles.length; i++) {
    const target = piles[i] ^ xor;
    if (target < piles[i]) return piles.map((n, j) => (j === i ? target : n));
  }
  const index = piles.findIndex((n) => n > 0);
  return piles.map((n, i) => (i === index ? n - 1 : n));
}
export const penneyCounter = (pattern: string) =>
  (pattern[1] === "H" ? "T" : "H") + pattern.slice(0, 2);
export function penneyRace(pattern: string, seed: number) {
  const bot = penneyCounter(pattern),
    rng = seededRandom(seed);
  let flips = "";
  for (let i = 0; i < 200; i++) {
    flips += rng() < 0.5 ? "H" : "T";
    if (flips.endsWith(pattern) || flips.endsWith(bot))
      return {
        bot,
        flips,
        winner: flips.endsWith(pattern) ? "you" : "opponent",
      };
  }
  return { bot, flips, winner: "unfinished" };
}
export function hamilton(populations: number[], seats: number) {
  const total = populations.reduce((a, b) => a + b, 0),
    quotas = populations.map((p) => (p / total) * seats),
    allocation = quotas.map(Math.floor);
  const order = quotas
    .map((q, i) => ({ i, remainder: q - allocation[i] }))
    .sort((a, b) => b.remainder - a.remainder || a.i - b.i);
  let left = seats - allocation.reduce((a, b) => a + b, 0);
  for (const { i } of order) {
    if (left-- <= 0) break;
    allocation[i]++;
  }
  return { quotas, allocation };
}
export function gini(values: number[]) {
  const sum = values.reduce((a, b) => a + b, 0);
  return sum
    ? values.reduce(
        (s, a) => s + values.reduce((t, b) => t + Math.abs(a - b), 0),
        0,
      ) /
        (2 * values.length * sum)
    : 0;
}
export function diffuse(steps: number) {
  let values: number[] = Array.from({ length: 21 }, (_, i) =>
    i === 10 ? 100 : 0,
  );
  for (let t = 0; t < steps; t++) {
    const next = Array(21).fill(0);
    values.forEach((v, i) => {
      next[i] += v * 0.6;
      if (i > 0) next[i - 1] += v * 0.2;
      else next[i] += v * 0.2;
      if (i < 20) next[i + 1] += v * 0.2;
      else next[i] += v * 0.2;
    });
    values = next;
  }
  return values;
}
export function percolate(open: number, seed: number) {
  const rng = seededRandom(seed),
    cells = Array.from({ length: 100 }, () => rng() < open),
    wet = new Set<number>(),
    queue: number[] = [];
  for (let i = 0; i < 10; i++)
    if (cells[i]) {
      wet.add(i);
      queue.push(i);
    }
  for (let at = 0; at < queue.length; at++) {
    const i = queue[at];
    for (const j of [
      i - 10,
      i + 10,
      ...(i % 10 ? [i - 1] : []),
      ...(i % 10 < 9 ? [i + 1] : []),
    ])
      if (j >= 0 && j < 100 && cells[j] && !wet.has(j)) {
        wet.add(j);
        queue.push(j);
      }
  }
  return { cells, wet, spans: [...wet].some((i) => i >= 90) };
}
export function ringNetwork(shortcuts: number, seed: number) {
  const adjacency = Array.from({ length: 20 }, () => new Set<number>()),
    edges: [number, number][] = [];
  const add = (a: number, b: number) => {
    if (a === b || adjacency[a].has(b)) return false;
    adjacency[a].add(b);
    adjacency[b].add(a);
    edges.push([a, b]);
    return true;
  };
  for (let i = 0; i < 20; i++) {
    add(i, (i + 1) % 20);
    add(i, (i + 2) % 20);
  }
  const rng = seededRandom(seed);
  let count = 0;
  for (let tries = 0; count < shortcuts && tries < 10000; tries++)
    if (add(Math.floor(rng() * 20), Math.floor(rng() * 20))) count++;
  const distances = adjacency.map((_, start) => {
    const d = Array(20).fill(Infinity),
      queue = [start];
    d[start] = 0;
    for (let at = 0; at < queue.length; at++)
      for (const next of adjacency[queue[at]])
        if (!Number.isFinite(d[next])) {
          d[next] = d[queue[at]] + 1;
          queue.push(next);
        }
    return d;
  });
  return {
    edges,
    mean: distances.flat().reduce((a, b) => a + b, 0) / 380,
    across: distances[0][10],
  };
}
export function bayesUpdate(prior: number, blue: boolean) {
  const a = blue ? 0.7 : 0.3,
    b = blue ? 0.3 : 0.7;
  return (prior * a) / (prior * a + (1 - prior) * b);
}
export const relay = (previous: boolean, signal: number) =>
  signal >= 60 ? true : signal <= 40 ? false : previous;
const f = (value: number) => Number(value.toFixed(2)).toLocaleString("en-US");
const line = (name: string, ys: number[]): Series => ({
  name,
  points: ys.map((y, x) => ({ x, y })),
});
export type DiscoveryOutput = {
  stats: [string, string][];
  notice: string;
  series?: Series[];
  xLabel?: string;
  yLabel?: string;
  bars?: { label: string; value: number }[];
  grid?: { cells: boolean[]; wet: Set<number>; spans: boolean };
  network?: ReturnType<typeof ringNetwork>;
  evidence?: string;
};
export function discoveryModel(
  id: string,
  s: Settings,
  seed = 73,
): DiscoveryOutput | null {
  const rng = seededRandom(seed);
  switch (id) {
    case "st-petersburg-paradox": {
      const payouts = Array.from({ length: 200 }, () => {
          let k = 1;
          while (k < s.cap && rng() >= 0.5) k++;
          return 2 ** k;
        }),
        sorted = [...payouts].sort((a, b) => a - b);
      return {
        stats: [
          ["Exact capped expected payout", f(s.cap + 1)],
          [
            "Sample mean (200 games)",
            f(payouts.reduce((a, b) => a + b, 0) / 200),
          ],
          ["Sample median", f((sorted[99] + sorted[100]) / 2)],
        ],
        bars: Array.from({ length: s.cap }, (_, i) => ({
          label: String(2 ** (i + 1)),
          value: payouts.filter((p) => p === 2 ** (i + 1)).length,
        })),
        notice:
          "The cap pays the final prize even if no heads has appeared. Rare large prizes can make the mean unstable.",
      };
    }
    case "hawk-dove": {
      const h = (p: number) => (p * (10 - s.cost)) / 2 + (1 - p) * 10,
        d = (p: number) => (1 - p) * 5;
      return {
        series: [
          line(
            "Hawk payoff",
            Array.from({ length: 101 }, (_, i) => h(i / 100)),
          ),
          line(
            "Dove payoff",
            Array.from({ length: 101 }, (_, i) => d(i / 100)),
          ),
        ],
        xLabel: "Hawks among opponents (%)",
        yLabel: "Expected tokens",
        stats: [
          ["Hawk", f(h(s.hawks / 100))],
          ["Dove", f(d(s.hawks / 100))],
          ["Equal-payoff hawk share", `${f(1000 / s.cost)}%`],
        ],
        notice:
          "Equal payoffs occur at resource value / fighting cost. These are expected payoffs against a fixed mix, not a population trajectory.",
      };
    }
    case "condorcet-cycle": {
      const a = s.voters,
        comparisons = [
          { label: "A over B", value: a + 3 },
          { label: "B over C", value: a + 3 },
          { label: "C over A", value: 6 },
        ];
      return {
        bars: comparisons,
        stats: [
          ["Total voters", String(a + 6)],
          ["A versus B", `${a + 3} : 3`],
          ["B versus C", `${a + 3} : 3`],
          ["C versus A", `6 : ${a}`],
        ],
        notice:
          a < 6
            ? "No candidate beats both rivals: the majority relation cycles."
            : a === 6
              ? "A ties C; no candidate strictly beats both rivals."
              : "A defeats both rivals and is the Condorcet winner.",
      };
    }
    case "alabama-paradox": {
      const result = hamilton([5, 3, 1], s.seats);
      return {
        bars: result.allocation.map((value, i) => ({
          label: ["A (pop. 5)", "B (pop. 3)", "C (pop. 1)"][i],
          value,
        })),
        stats: result.allocation.map(
          (n, i) => [`Group ${"ABC"[i]} seats`, String(n)] as [string, string],
        ),
        notice: `Quotas: ${result.quotas.map(f).join(" · ")}. At 4 seats C gets 1; at 5 it gets 0. Populations stay unchanged.`,
      };
    }
    case "gini-coefficient": {
      const values = [...Array(4).fill((100 - s.top) / 4), s.top],
        sorted = [...values].sort((a, b) => a - b),
        cumulative = [0];
      sorted.forEach((v) => cumulative.push(cumulative.at(-1)! + v));
      return {
        series: [
          {
            name: "Lorenz curve",
            points: cumulative.map((y, i) => ({ x: i * 20, y })),
          },
          {
            name: "Equal shares",
            points: [
              { x: 0, y: 0 },
              { x: 100, y: 100 },
            ],
          },
        ],
        xLabel: "Cumulative people (%)",
        yLabel: "Cumulative tokens (%)",
        stats: [
          ["Population Gini (0–1)", f(gini(values))],
          ["Top holder", String(s.top)],
          ["Each other holder", f((100 - s.top) / 4)],
        ],
        notice:
          "The total stays at 100. With five holders the uncorrected maximum Gini is 0.8, not 1.",
      };
    }
    case "polya-urn": {
      const series = Array.from({ length: 3 }, (_, run) => {
        let blue = 1,
          orange = 1;
        const shares = [50];
        for (let t = 0; t < s.draws; t++) {
          if (rng() < blue / (blue + orange)) blue += s.reinforce;
          else orange += s.reinforce;
          shares.push((100 * blue) / (blue + orange));
        }
        return line(`History ${run + 1}`, shares);
      });
      return {
        series,
        xLabel: "Draws",
        yLabel: "Blue share (%)",
        stats: series.map((p) => [p.name, `${f(p.points.at(-1)!.y)}%`]),
        notice:
          "All histories start 1:1. Reinforcement changes the next draw’s probability; chance still matters.",
      };
    }
    case "galton-board": {
      const counts = Array(s.rows + 1).fill(0);
      for (let trial = 0; trial < 200; trial++) {
        let rights = 0;
        for (let i = 0; i < s.rows; i++) rights += Number(rng() < 0.5);
        counts[rights]++;
      }
      let coefficient = 1;
      const expected = counts.map((_, i) => {
        if (i) coefficient = (coefficient * (s.rows - i + 1)) / i;
        return (200 * coefficient) / 2 ** s.rows;
      });
      return {
        series: [
          line("Observed balls", counts),
          line("Exact expected counts", expected),
        ],
        bars: counts.map((value, i) => ({ label: String(i), value })),
        xLabel: "Right turns / bin",
        yLabel: "Balls",
        stats: [
          ["Balls dropped", "200"],
          ["Expected central position", f(s.rows / 2)],
          ["Step-count standard deviation", f(Math.sqrt(s.rows) / 2)],
        ],
        notice:
          "Each ball uses independent fair steps. Observed bins fluctuate; the exact comparison is binomial, not a fitted normal curve.",
      };
    }
    case "percolation": {
      const grid = percolate(s.open / 100, seed);
      return {
        grid,
        stats: [
          ["Open tiles", String(grid.cells.filter(Boolean).length)],
          ["Reached tiles", String(grid.wet.size)],
          ["Crosses top to bottom", grid.spans ? "Yes" : "No"],
        ],
        notice:
          "Blue tiles connect to the top by edge neighbors. Rose tiles are open but not reached; diagonals do not connect.",
      };
    }
    case "diffusion": {
      const values = diffuse(s.time);
      return {
        bars: values.map((value, i) => ({ label: String(i + 1), value })),
        series: [line("Concentration", values)],
        xLabel: "Cell (0–20)",
        yLabel: "Dye units",
        stats: [
          ["Total dye", f(values.reduce((a, b) => a + b, 0))],
          ["Central cell", f(values[10])],
          ["Mixing steps", String(s.time)],
        ],
        notice:
          "The boundaries are closed. Dye spreads between neighboring cells without disappearing.",
      };
    }
    case "cobweb-model": {
      const values = [1];
      for (let i = 0; i < 20; i++)
        values.push((-s.response / 100) * values.at(-1)!);
      return {
        series: [line("Price deviation", values)],
        xLabel: "Market periods",
        yLabel: "Deviation from equilibrium",
        stats: [
          ["Response ratio", f(s.response / 100)],
          ["Final deviation", f(values.at(-1)!)],
          [
            "Pattern",
            s.response < 100
              ? "Damping"
              : s.response === 100
                ? "Repeating"
                : "Amplifying",
          ],
        ],
        notice:
          "Negative values mean below equilibrium, not negative prices. Changing the response changes the stability of this linear model.",
      };
    }
    case "series-parallel-reliability": {
      const p = s.reliability / 100;
      return {
        bars: [
          { label: "Series", value: 100 * p ** s.components },
          { label: "Parallel", value: 100 * (1 - (1 - p) ** s.components) },
        ],
        stats: [
          ["Series works", `${f(100 * p ** s.components)}%`],
          ["Parallel works", `${f(100 * (1 - (1 - p) ** s.components))}%`],
        ],
        notice:
          "Independence is essential. More series dependencies hurt reliability; more independent parallel backups help.",
      };
    }
    case "small-world-shortcuts": {
      const network = ringNetwork(s.shortcuts, seed);
      return {
        network,
        stats: [
          ["Mean shortest path", f(network.mean)],
          ["Node 1 to node 11", String(network.across)],
          ["Edges", String(network.edges.length)],
        ],
        notice:
          "The original local links remain. Extra edges can never lengthen a shortest route in this model.",
      };
    }
    case "bayesian-updating": {
      const hiddenA = rng() < s.prior / 100,
        values = [s.prior],
        observations: string[] = [];
      let posterior = s.prior / 100;
      for (let i = 0; i < s.draws; i++) {
        const blue = rng() < (hiddenA ? 0.7 : 0.3);
        observations.push(blue ? "Blue" : "Orange");
        posterior = bayesUpdate(posterior, blue);
        values.push(posterior * 100);
      }
      return {
        series: [line("Probability of A", values)],
        xLabel: "Draws observed",
        yLabel: "Probability (%)",
        evidence: observations.join(" · ") || "No observations yet",
        stats: [
          ["Initial probability", `${s.prior}%`],
          ["Updated probability of A", `${f(posterior * 100)}%`],
        ],
        notice:
          "Draws are with replacement. The sequence is evidence; the hidden urn remains unrevealed. Conditional independence is assumed.",
      };
    }
    default:
      return null;
  }
}
