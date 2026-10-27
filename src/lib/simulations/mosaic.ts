import { rng } from "./horizons";
export { rng };
export function normal(random: () => number) {
  return Math.sqrt(-2 * Math.log(random())) * Math.cos(2 * Math.PI * random());
}
export function cdf(z: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z)),
    d = 0.3989422804014327 * Math.exp((-z * z) / 2),
    tail =
      d *
      t *
      (0.31938153 +
        t *
          (-0.356563782 +
            t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z >= 0 ? 1 - tail : tail;
}
export function intervalBatch(n: number, seed: number, count = 40) {
  const r = rng(seed);
  return Array.from({ length: count }, () => {
    const mean = normal(r) / Math.sqrt(n),
      half = 1.96 / Math.sqrt(n);
    return {
      mean,
      lo: mean - half,
      hi: mean + half,
      covers: Math.abs(mean) <= half,
    };
  });
}
export function testPower(n: number, effect: number) {
  const shift = effect * Math.sqrt(n);
  return 1 - cdf(1.96 - shift) + cdf(-1.96 - shift);
}
export const bootstrapSample = [1, 2, 2, 4, 7, 9];
export function bootstrap(seed: number, count = 200, data = bootstrapSample) {
  const r = rng(seed);
  return Array.from({ length: count }, () => {
    const sample = Array.from(
      { length: data.length },
      () => data[Math.floor(r() * data.length)],
    );
    return { sample, mean: sample.reduce((a, b) => a + b, 0) / sample.length };
  });
}
export const quartetX = [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5];
export const quartetY = [
  [8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68],
  [9.14, 8.14, 8.74, 8.77, 9.26, 8.1, 6.13, 3.1, 9.13, 7.26, 4.74],
  [7.46, 6.77, 12.74, 7.11, 7.81, 8.84, 6.08, 5.39, 8.15, 6.42, 5.73],
  [6.58, 5.76, 7.71, 8.84, 8.47, 7.04, 5.25, 12.5, 5.56, 7.91, 6.89],
];
export function quartet(index: number) {
  return quartetY[index].map(
    (y, i) =>
      [index === 3 ? (i === 7 ? 19 : 8) : quartetX[i], y] as [number, number],
  );
}
export function regression(points: [number, number][]) {
  const n = points.length,
    mx = points.reduce((s, p) => s + p[0], 0) / n,
    my = points.reduce((s, p) => s + p[1], 0) / n,
    xx = points.reduce((s, p) => s + (p[0] - mx) ** 2, 0),
    yy = points.reduce((s, p) => s + (p[1] - my) ** 2, 0),
    xy = points.reduce((s, p) => s + (p[0] - mx) * (p[1] - my), 0);
  return {
    mx,
    my,
    slope: xx ? xy / xx : null,
    corr: xx && yy ? xy / Math.sqrt(xx * yy) : null,
  };
}
export function payment(principal: number, annual: number, months: number) {
  const r = annual / 1200;
  return r ? (principal * r) / (1 - (1 + r) ** -months) : principal / months;
}
export function amortise(
  principal: number,
  annual: number,
  months: number,
  extra = 0,
) {
  let balance = principal,
    totalInterest = 0;
  const pay = payment(principal, annual, months) + extra,
    rows: {
      month: number;
      interest: number;
      principal: number;
      balance: number;
    }[] = [];
  for (let i = 1; i <= 600 && balance > 1e-7; i++) {
    const interest = (balance * annual) / 1200,
      paid = Math.min(pay, balance + interest),
      repaid = paid - interest;
    balance = Math.max(0, balance - repaid);
    totalInterest += interest;
    rows.push({ month: i, interest, principal: repaid, balance });
  }
  return { rows, pay, totalInterest };
}
export function debtPlan(strategy: "snowball" | "avalanche", budget = 300) {
  let balances = [800, 2000, 5000],
    interest = 0;
  const rates = [0.18, 0.08, 0.24],
    history = [balances.reduce((a, b) => a + b, 0)],
    milestones: { loan: number; month: number }[] = [];
  for (let month = 1; month <= 240 && history.at(-1)! > 1e-7; month++) {
    balances = balances.map((b, i) => {
      interest += (b * rates[i]) / 12;
      return b * (1 + rates[i] / 12);
    });
    let cash = budget;
    for (let i = 0; i < 3; i++) {
      const p = Math.min(25, balances[i], cash);
      balances[i] -= p;
      cash -= p;
    }
    const priority = [0, 1, 2]
      .filter((i) => balances[i] > 1e-7)
      .sort((a, b) =>
        strategy === "snowball"
          ? balances[a] - balances[b]
          : rates[b] - rates[a],
      );
    for (const i of priority) {
      const p = Math.min(cash, balances[i]);
      balances[i] -= p;
      cash -= p;
    }
    for (let i = 0; i < 3; i++)
      if (balances[i] <= 1e-7 && !milestones.some((m) => m.loan === i))
        milestones.push({ loan: i, month });
    history.push(balances.reduce((a, b) => a + b, 0));
  }
  return { history, interest, balances, milestones };
}
export function bond(yieldRate: number, years = 10) {
  let price = 0,
    first = 0,
    second = 0;
  for (let t = 1; t <= years; t++) {
    const cf = 5 + (t === years ? 100 : 0);
    price += cf / (1 + yieldRate) ** t;
    first -= (t * cf) / (1 + yieldRate) ** (t + 1);
    second += (t * (t + 1) * cf) / (1 + yieldRate) ** (t + 2);
  }
  return { price, first, second };
}
export function portfolio(w: number, rho: number) {
  return {
    ret: 5 * (1 - w) + 9 * w,
    risk: Math.sqrt(100 * (1 - w) ** 2 + 400 * w * w + 400 * rho * w * (1 - w)),
  };
}
export function minVariance(rho: number) {
  return Math.max(0, Math.min(1, (100 - 200 * rho) / (500 - 400 * rho)));
}
export function knowsBlue(worlds: number[], world: number, person: number) {
  const others = 7 ^ (1 << person),
    compatible = worlds.filter((w) => (w & others) === (world & others));
  return (
    compatible.length > 0 && compatible.every((w) => (w & (1 << person)) !== 0)
  );
}
export function silentWorlds(worlds: number[]) {
  return worlds.filter((w) => [0, 1, 2].every((i) => !knowsBlue(worlds, w, i)));
}
export function contractChoice(v: number, low: number, high: number) {
  return [
    { q: 0, p: 0 },
    { q: 1, p: low },
    { q: 2, p: high },
  ].sort((a, b) => v * b.q - b.p - (v * a.q - a.p) || b.q - a.q)[0];
}
export function equilibrium(a: number, b: number, k: number) {
  const total = a + b;
  return { a: total / (1 + k), b: (total * k) / (1 + k) };
}
export function albedoPath(
  solar: number,
  warm: boolean,
  feedback: boolean,
  steps: number,
) {
  const path = [warm ? 290 : 260];
  for (let i = 0; i < steps; i++) {
    const t = path.at(-1)!,
      a = feedback ? 0.3 + 0.3 / (1 + Math.exp((t - 273) / 4)) : 0.3,
      net = (solar * (1 - a)) / 4 - 0.6 * 5.67e-8 * t ** 4;
    path.push(t + 0.02 * net);
  }
  return path;
}
export function oscillator(k: number, steps: number) {
  let a = 0,
    b = 1;
  const path = [b - a];
  for (let i = 0; i < steps; i++) {
    const da = 1 + k * Math.sin(b - a),
      db = 1.4 + k * Math.sin(a - b);
    a += 0.05 * da;
    b += 0.05 * db;
    path.push(Math.atan2(Math.sin(b - a), Math.cos(b - a)));
  }
  return { a, b, path };
}
export function enrichment(capacity: number, time: number) {
  let n = 0.7,
    p = 0.3;
  const prey = [n],
    predator = [p],
    f = (a: number, b: number): [number, number] => [
      a * (1 - a / capacity) - (a * b) / (1 + a),
      (0.5 * a * b) / (1 + a) - 0.2 * b,
    ];
  for (let i = 0; i < time * 50; i++) {
    const h = 0.02,
      k1 = f(n, p),
      k2 = f(n + (h * k1[0]) / 2, p + (h * k1[1]) / 2),
      k3 = f(n + (h * k2[0]) / 2, p + (h * k2[1]) / 2),
      k4 = f(n + h * k3[0], p + h * k3[1]);
    n += (h * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0])) / 6;
    p += (h * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])) / 6;
    if (i % 10 === 9) {
      prey.push(n);
      predator.push(p);
    }
  }
  return { prey, predator };
}
export const graphEdges: [number, number, number][] = [
  [0, 1, 2],
  [0, 2, 5],
  [1, 2, 1],
  [1, 3, 4],
  [2, 3, 1],
  [3, 4, 3],
  [2, 4, 7],
];
export function dijkstraStep(distance: number[], closed: number[]) {
  const candidates = distance
    .map((d, i) => ({ d, i }))
    .filter((v) => !closed.includes(v.i) && Number.isFinite(v.d))
    .sort((a, b) => a.d - b.d);
  if (!candidates.length) return null;
  const current = candidates[0].i,
    next = [...distance];
  for (const [a, b, w] of graphEdges) {
    const dest = a === current ? b : b === current ? a : null;
    if (dest !== null && !closed.includes(dest))
      next[dest] = Math.min(next[dest], distance[current] + w);
  }
  return { distance: next, closed: [...closed, current], current };
}
export type SearchState = {
  open: number[];
  closed: number[];
  g: Record<number, number>;
  parent: Record<number, number>;
  path: number[];
  done: boolean;
};
export function searchStart(): SearchState {
  return {
    open: [0],
    closed: [],
    g: { 0: 0 },
    parent: {},
    path: [],
    done: false,
  };
}
export function aStarStep(
  old: SearchState,
  blocked: number[],
  weight: number,
): SearchState {
  if (old.done || !old.open.length) return { ...old, done: true };
  const goal = 47,
    h = (v: number) => 7 - (v % 8) + 5 - Math.floor(v / 8),
    current = [...old.open].sort(
      (a, b) => old.g[a] + weight * h(a) - (old.g[b] + weight * h(b)) || a - b,
    )[0],
    state = {
      ...old,
      open: old.open.filter((v) => v !== current),
      closed: [...old.closed, current],
      g: { ...old.g },
      parent: { ...old.parent },
    };
  if (current === goal) {
    const path = [current];
    while (path[0] !== 0) path.unshift(state.parent[path[0]]);
    return { ...state, path, done: true };
  }
  const x = current % 8,
    y = Math.floor(current / 8),
    neighbours = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ]
      .filter(([a, b]) => a >= 0 && a < 8 && b >= 0 && b < 6)
      .map(([a, b]) => 8 * b + a);
  for (const v of neighbours)
    if (!blocked.includes(v) && !state.closed.includes(v)) {
      const g = state.g[current] + 1;
      if (state.g[v] === undefined || g < state.g[v]) {
        state.g[v] = g;
        state.parent[v] = current;
        if (!state.open.includes(v)) state.open.push(v);
      }
    }
  return state;
}
export const pageRequests = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];
export function cacheTrace(
  capacity: number,
  policy: "FIFO" | "LRU",
  count = 12,
) {
  const cache: number[] = [],
    rows: { page: number; hit: boolean; cache: number[] }[] = [];
  let faults = 0;
  for (const page of pageRequests.slice(0, count)) {
    const hit = cache.includes(page);
    if (!hit) {
      faults++;
      if (cache.length === capacity) cache.shift();
      cache.push(page);
    } else if (policy === "LRU") {
      cache.splice(cache.indexOf(page), 1);
      cache.push(page);
    }
    rows.push({ page, hit, cache: [...cache] });
  }
  return { rows, faults };
}
export function objectiveFunctions(monotone: boolean) {
  return Array.from({ length: 16 }, (_, mask) =>
    Array.from({ length: 4 }, (_, i) => (mask >> i) & 1),
  ).filter((f) => !monotone || f.every((v, i) => i === 0 || v >= f[i - 1]));
}
export function queryCost(f: number[], reverse: boolean) {
  const values = reverse ? [...f].reverse() : f,
    index = values.indexOf(1);
  return index < 0 ? 4 : index + 1;
}
export const districtVotes = [
  1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0,
];
export function districtTotals(votes: number[], columns: boolean) {
  return Array.from({ length: 5 }, (_, d) =>
    votes.reduce(
      (s, v, i) => s + ((columns ? i % 5 : Math.floor(i / 5)) === d ? v : 0),
      0,
    ),
  );
}
