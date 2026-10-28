export { rng, normal, regression } from "./mosaic";
import { rng, normal, regression } from "./mosaic";
export function snell(angle: number, n1: number, n2: number) {
  const s = (n1 / n2) * Math.sin((angle * Math.PI) / 180);
  return s > 1 ? null : (Math.asin(s) * 180) / Math.PI;
}
export function collide(m1: number, m2: number, u = 4) {
  return { v1: ((m1 - m2) / (m1 + m2)) * u, v2: ((2 * m1) / (m1 + m2)) * u };
}
export function bridge(r4: number, closed = true) {
  const g = closed ? 0.1 : 0,
    a = 0.1 + 0.05 + g,
    b = 1 / 15 + 1 / r4 + g,
    det = a * b - g * g,
    left = (1.2 * b + g * 0.8) / det,
    right = (a * 0.8 + g * 1.2) / det;
  return {
    left,
    right,
    cross: g * (left - right),
    input: (12 - left) / 10 + (12 - right) / 15,
    output: left / 20 + right / r4,
  };
}
export function island(i: number, e: number, steps: number) {
  let n = 50;
  const path = [n];
  for (let t = 0; t < steps; t++) {
    n += 0.2 * (i * (1 - n / 100) - (e * n) / 100);
    path.push(n);
  }
  return path;
}
export function metapopulation(c: number, e: number, steps: number) {
  let p = 0.3;
  const path = [p];
  for (let t = 0; t < steps; t++) {
    p += 0.1 * (c * p * (1 - p) - e * p);
    path.push(p);
  }
  return path;
}
export function cascade(top: boolean, steps: number) {
  let p = 60,
    h = 15,
    c = top ? 5 : 0;
  const plants = [p],
    herbivores = [h],
    predators = [c];
  for (let t = 0; t < steps * 50; t++) {
    const dp = p * (1 - p / 100) - 0.02 * p * h,
      dh = 0.01 * p * h - 0.15 * h - 0.015 * h * c,
      dc = 0.008 * h * c - 0.15 * c;
    p = Math.max(0, p + 0.02 * dp);
    h = Math.max(0, h + 0.02 * dh);
    c = Math.max(0, c + 0.02 * dc);
    if (t % 50 === 49) {
      plants.push(p);
      herbivores.push(h);
      predators.push(c);
    }
  }
  return { plants, herbivores, predators };
}
export function frequency(p: number, positive: boolean, steps: number) {
  const path = [p];
  for (let t = 0; t < steps; t++) {
    const a = 1 + (positive ? p : 1 - p),
      b = 1 + (positive ? 1 - p : p);
    p = (p * a) / (p * a + (1 - p) * b);
    path.push(p);
  }
  return path;
}
export function hashWord(word: string, seed = 17) {
  let h = seed >>> 0;
  for (const char of word) h = (Math.imul(h, 31) + char.charCodeAt(0)) >>> 0;
  return h;
}
export function huffman(weights: number[]) {
  type Node = { weight: number; id: number; left?: Node; right?: Node };
  let next = weights.length;
  const nodes: Node[] = weights.map((weight, id) => ({ weight, id }));
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.weight - b.weight || a.id - b.id);
    const a = nodes.shift()!,
      b = nodes.shift()!;
    nodes.push({ weight: a.weight + b.weight, id: next++, left: a, right: b });
  }
  const codes: string[] = [];
  function walk(n: Node, s: string) {
    if (!n.left) codes[n.id] = s || "0";
    else {
      walk(n.left, s + "0");
      walk(n.right!, s + "1");
    }
  }
  walk(nodes[0], "");
  return codes;
}
export const sortValues = [7, 2, 9, 1, 5, 3];
export function sortTrace(kind: "Insertion" | "Selection") {
  const a = [...sortValues],
    rows: {
      values: number[];
      comparisons: number;
      writes: number;
      note: string;
    }[] = [];
  let comparisons = 0,
    writes = 0;
  if (kind === "Insertion") {
    for (let i = 1; i < a.length; i++) {
      const v = a[i];
      let j = i - 1;
      while (j >= 0) {
        comparisons++;
        if (a[j] <= v) break;
        a[j + 1] = a[j];
        writes++;
        j--;
      }
      a[j + 1] = v;
      writes++;
      rows.push({
        values: [...a],
        comparisons,
        writes,
        note: `Insert original position ${i + 1}`,
      });
    }
  } else
    for (let i = 0; i < a.length - 1; i++) {
      let best = i;
      for (let j = i + 1; j < a.length; j++) {
        comparisons++;
        if (a[j] < a[best]) best = j;
      }
      if (best !== i) {
        [a[i], a[best]] = [a[best], a[i]];
        writes += 2;
      }
      rows.push({
        values: [...a],
        comparisons,
        writes,
        note: `Select minimum for position ${i + 1}`,
      });
    }
  return rows;
}
export const ringServers = [10, 35, 60, 85];
export function ringOwner(key: number, servers: number[]) {
  const sorted = [...servers].sort((a, b) => a - b);
  return sorted.find((s) => s >= key) ?? sorted[0];
}
export function population(seed: number, count = 200) {
  const r = rng(seed);
  return Array.from({ length: count }, () => {
    const x = normal(r),
      y = 0.7 * x + Math.sqrt(1 - 0.49) * normal(r);
    return [x, y] as [number, number];
  });
}
export function mean(a: number[]) {
  return a.reduce((s, v) => s + v, 0) / a.length;
}
export function median(a: number[]) {
  const s = [...a].sort((a, b) => a - b),
    i = Math.floor(s.length / 2);
  return s.length % 2 ? s[i] : (s[i - 1] + s[i]) / 2;
}
export function publication(seed: number, count = 100) {
  const r = rng(seed);
  return Array.from({ length: count }, () => {
    const estimate = normal(r) / Math.sqrt(25);
    return { estimate, significant: Math.abs(estimate) * 5 > 1.96 };
  });
}
export function poissonEvents(rate: number, seed: number, horizon = 10) {
  const r = rng(seed),
    events: number[] = [];
  let t = 0;
  while (t < horizon) {
    t += -Math.log(Math.max(Number.EPSILON, r())) / rate;
    if (t <= horizon) events.push(t);
  }
  return events;
}
export function arcsineBatch(seed: number, count = 200, steps = 100) {
  const r = rng(seed);
  return Array.from({ length: count }, () => {
    let x = 0,
      above = 0;
    for (let t = 0; t < steps; t++) {
      const old = x;
      x += r() < 0.5 ? -1 : 1;
      if (x > 0 || (x === 0 && old > 0)) above++;
    }
    return above / steps;
  });
}
export function chord(seed: number, kind: string) {
  const r = rng(seed),
    theta = 2 * Math.PI * r();
  let d: number;
  if (kind === "Random endpoints") {
    const gap = Math.PI * r();
    d = Math.abs(Math.cos(gap));
  } else if (kind === "Uniform radius") d = r();
  else d = Math.sqrt(r());
  return { d, theta, length: 2 * Math.sqrt(1 - d * d) };
}
export function persuasion(badSignal: number) {
  const positive = 0.3 + 0.7 * badSignal,
    posterior = 0.3 / positive;
  return {
    positive,
    posterior,
    invest: posterior >= 0.5 - 1e-9 ? positive : 0,
  };
}
export const ttcPreferences = [
  [1, 0, 2],
  [2, 1, 0],
  [0, 2, 1],
];
export function ttcRound(remaining: number[], preferences = ttcPreferences) {
  const next = new Map(
    remaining.map((i) => [
      i,
      preferences[i].find((h) => remaining.includes(h))!,
    ]),
  );
  const seen: number[] = [];
  let n = remaining[0];
  while (!seen.includes(n)) {
    seen.push(n);
    n = next.get(n)!;
  }
  return seen
    .slice(seen.indexOf(n))
    .map((person) => ({ person, house: next.get(person)! }));
}
export function solow(s: number, steps: number) {
  let k = 1;
  const path = [k];
  for (let t = 0; t < steps; t++) {
    k += s * Math.sqrt(k) - 0.1 * k;
    path.push(k);
  }
  return path;
}
export function taxMarket(tax: number) {
  const q = (100 - tax) / 3,
    buyer = 100 - q,
    seller = buyer - tax;
  return {
    q,
    buyer,
    seller,
    consumerBurden: buyer - 200 / 3,
    producerBurden: 200 / 3 - seller,
    revenue: tax * q,
    loss: 0.5 * tax * (100 / 3 - q),
  };
}
export function monopsony(n: number) {
  return {
    wage: 10 + n,
    revenuePerWorker: 100 - n,
    marginalCost: 10 + 2 * n,
    profit: 100 * n - 0.5 * n * n - (10 + n) * n,
  };
}
export function drawdown(returns: number[]) {
  const wealth = [100];
  for (const r of returns) wealth.push(wealth.at(-1)! * (1 + r / 100));
  let peak = 100,
    max = 0;
  const declines = wealth.map((v) => {
    peak = Math.max(peak, v);
    const d = 1 - v / peak;
    max = Math.max(max, d);
    return d;
  });
  return { wealth, declines, max };
}
export function newsvendor(q: number) {
  const demand = [20, 40, 60, 80, 100],
    prob = [0.1, 0.2, 0.4, 0.2, 0.1];
  return {
    demand,
    prob,
    profit: demand.map(
      (d) => 10 * Math.min(q, d) + 2 * Math.max(0, q - d) - 6 * q,
    ),
    expected: demand.reduce(
      (s, d, i) =>
        s + prob[i] * (10 * Math.min(q, d) + 2 * Math.max(0, q - d) - 6 * q),
      0,
    ),
  };
}
export function schedule(order: number[]) {
  const durations = [8, 2, 6, 1, 3];
  let clock = 0;
  return order.map((id) => {
    const start = clock;
    clock += durations[id];
    return { id, start, finish: clock, wait: start };
  });
}
export const socialEdges: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 2],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 5],
];
export function reachable(edges: [number, number][], start = 0) {
  const found = new Set([start]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const [a, b] of edges) {
      if (found.has(a) && !found.has(b)) {
        found.add(b);
        changed = true;
      }
      if (found.has(b) && !found.has(a)) {
        found.add(a);
        changed = true;
      }
    }
  }
  return [...found];
}
export function confidenceOpinions(epsilon: number, steps: number) {
  let x = [0.05, 0.15, 0.25, 0.45, 0.55, 0.75, 0.85, 0.95];
  const paths = [x];
  for (let t = 0; t < steps; t++) {
    x = x.map((v) => mean(x.filter((u) => Math.abs(u - v) <= epsilon + 1e-9)));
    paths.push(x);
  }
  return paths;
}
export function voter(seed: number, steps: number) {
  const r = rng(seed),
    state = [0, 0, 0, 0, 1, 1, 1, 1],
    history = [state.reduce((a, b) => a + b, 0)];
  for (let t = 0; t < steps; t++) {
    const i = Math.floor(r() * 8),
      j = (i + (r() < 0.5 ? 1 : 7)) % 8;
    state[i] = state[j];
    history.push(state.reduce((a, b) => a + b, 0));
  }
  return { state, history };
}
export function degroot(stubborn: boolean, steps: number) {
  let x = [0, 0.4, 1];
  const history = [x];
  for (let i = 0; i < steps; i++) {
    x = stubborn
      ? [x[0], 0.5 * x[0] + 0.5 * x[1], 0.5 * x[1] + 0.5 * x[2]]
      : [
          0.5 * x[0] + 0.5 * x[1],
          0.25 * x[0] + 0.5 * x[1] + 0.25 * x[2],
          0.5 * x[1] + 0.5 * x[2],
        ];
    history.push(x);
  }
  return history;
}
export function homophily(seed: number, bias: number) {
  const r = rng(seed),
    edges: [number, number][] = [];
  for (let i = 0; i < 12; i++)
    for (let j = i + 1; j < 12; j++) {
      const same = i < 6 === j < 6;
      if (r() < (same ? 0.15 + 0.65 * bias : 0.8 - 0.65 * bias))
        edges.push([i, j]);
    }
  return edges;
}
export { regression as fit };
