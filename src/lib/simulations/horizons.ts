import { rng as seededRng } from "./depth";
export function rng(seed: number) {
  let n = Math.imul(seed ^ (seed >>> 16), 0x45d9f3b);
  n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
  return seededRng((n ^ (n >>> 16)) >>> 0);
}
export const orders = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 2],
  [1, 2, 0],
  [2, 0, 1],
  [2, 1, 0],
];
export const coalitionValues = [0, 0, 0, 60, 0, 20, 40, 90];
export function marginal(order: number[], values = coalitionValues) {
  let mask = 0;
  const gain = [0, 0, 0];
  for (const i of order) {
    const next = mask | (1 << i);
    gain[i] = values[next] - values[mask];
    mask = next;
  }
  return gain;
}
export function shapley(values = coalitionValues) {
  return orders
    .map((o) => marginal(o, values))
    .reduce((sum, g) => sum.map((v, i) => v + g[i] / 6), [0, 0, 0]);
}
export function banzhaf(weights: number[], quota: number) {
  const swings = weights.map((w, i) => {
    let n = 0;
    for (let mask = 0; mask < 1 << weights.length; mask++) {
      if (mask & (1 << i)) continue;
      const total = weights.reduce(
        (s, v, j) => s + (mask & (1 << j) ? v : 0),
        0,
      );
      if (total < quota && total + w >= quota) n++;
    }
    return n;
  });
  const sum = swings.reduce((a, b) => a + b, 0);
  return { swings, power: swings.map((v) => (sum ? v / sum : 0)) };
}
export function vcg(bids: number[], cost: number) {
  const build = bids.reduce((a, b) => a + b, 0) >= cost;
  return {
    build,
    payments: bids.map((_, i) =>
      build
        ? Math.max(0, cost - bids.reduce((s, v, j) => (i === j ? s : s + v), 0))
        : 0,
    ),
  };
}
export function moralHazard(coverage: number) {
  const careful = 3 + 0.1 * 20 * (1 - coverage),
    careless = 0.4 * 20 * (1 - coverage);
  return {
    careful,
    careless,
    maintain: careful <= careless,
    system: careful <= careless ? 5 : 8,
  };
}
export function pigou(tax: number) {
  const q = Math.max(0, 80 - tax);
  return {
    q,
    welfare: 60 * q - (q * q) / 2,
    external: 20 * q,
    revenue: tax * q,
  };
}
export function pagerank(edges: number[][], d: number, steps = 100) {
  const n = edges.length;
  let rank = edges.map(() => 1 / n);
  for (let k = 0; k < steps; k++) {
    const next = edges.map(() => (1 - d) / n);
    edges.forEach((links, i) => {
      if (links.length)
        links.forEach((j) => (next[j] += (d * rank[i]) / links.length));
      else next.forEach((_, j) => (next[j] += (d * rank[i]) / n));
    });
    rank = next;
  }
  return rank;
}
export function growNetwork(
  count: number,
  preferential: boolean,
  seed: number,
) {
  const random = rng(seed),
    edges: [number, number][] = [[0, 1]],
    degrees = [1, 1];
  for (let i = 2; i < count; i++) {
    const sum = degrees.reduce((a, b) => a + b, 0);
    let r = random() * (preferential ? sum : i),
      target = i - 1;
    for (let j = 0; j < i; j++) {
      r -= preferential ? degrees[j] : 1;
      if (r < 0) {
        target = j;
        break;
      }
    }
    edges.push([i, target]);
    degrees[target]++;
    degrees.push(1);
  }
  return { edges, degrees };
}
export function majority(n: number, p: number) {
  let sum = 0;
  for (let k = Math.floor(n / 2) + 1; k <= n; k++) {
    let choose = 1;
    for (let j = 1; j <= k; j++) choose = (choose * (n - j + 1)) / j;
    sum += choose * p ** k * (1 - p) ** (n - k);
  }
  return sum;
}
export function hamming(data: number[]) {
  const b = [0, 0, data[0], 0, data[1], data[2], data[3]];
  b[0] = b[2] ^ b[4] ^ b[6];
  b[1] = b[2] ^ b[5] ^ b[6];
  b[3] = b[4] ^ b[5] ^ b[6];
  return b;
}
export function decodeHamming(bits: number[]) {
  const syndrome = bits.reduce((s, b, i) => (b ? s ^ (i + 1) : s), 0),
    corrected = bits.map((b, i) => (i === syndrome - 1 ? b ^ 1 : b));
  return {
    syndrome,
    corrected,
    data: [corrected[2], corrected[4], corrected[5], corrected[6]],
  };
}
export function parrondoProbability(capital: number, game: "A" | "B") {
  return game === "A" ? 0.495 : ((capital % 3) + 3) % 3 === 0 ? 0.095 : 0.745;
}
export function parrondoDrift(mix: number) {
  const probs = [0, 1, 2].map(
    (i) => mix * 0.495 + (1 - mix) * (i === 0 ? 0.095 : 0.745),
  );
  let pi = [1 / 3, 1 / 3, 1 / 3];
  for (let k = 0; k < 1000; k++) {
    const next = [0, 0, 0];
    for (let j = 0; j < 3; j++) {
      next[(j + 1) % 3] += pi[j] * probs[j];
      next[(j + 2) % 3] += pi[j] * (1 - probs[j]);
    }
    pi = next;
  }
  return pi.reduce((s, p, i) => s + p * (2 * probs[i] - 1), 0);
}
export function parrondoPath(
  policy: "A" | "B" | "mix",
  seed: number,
  steps = 300,
) {
  const random = rng(seed),
    path = [0];
  for (let i = 0; i < steps; i++) {
    const c = path.at(-1)!,
      game = policy === "mix" ? (random() < 0.5 ? "A" : "B") : policy;
    path.push(c + (random() < parrondoProbability(c, game) ? 1 : -1));
  }
  return path;
}
export function patchReward(t: number) {
  return 20 * (1 - Math.exp(-t / 5));
}
export function patchOptimum(travel: number) {
  return Array.from({ length: 30 }, (_, i) => i + 1).reduce(
    (best, t) =>
      patchReward(t) / (t + travel) > patchReward(best) / (best + travel)
        ? t
        : best,
    1,
  );
}
export const payoffs = [
  [4, 4],
  [10, 0],
  [7, 3],
];
export function regretScores() {
  const best = [10, 4];
  return payoffs.map((row) => Math.max(...row.map((v, i) => best[i] - v)));
}
export function realOptions(p: number, fee: number, rate = 0.1) {
  return {
    now: (p * 100 + (1 - p) * 20) / (1 + rate) - 50,
    wait: (p * 50) / (1 + rate) - fee,
  };
}
export function energy(x: number) {
  return Math.min((x - 4) ** 2 + 4, (x - 16) ** 2);
}
export function annealAccept(delta: number, temperature: number, u: number) {
  return delta <= 0 || (temperature > 0 && u < Math.exp(-delta / temperature));
}
export function pour(
  amount: number[],
  capacity: number[],
  from: number,
  to: number,
) {
  const moved = Math.min(amount[from], capacity[to] - amount[to]);
  return amount.map((v, i) =>
    i === from ? v - moved : i === to ? v + moved : v,
  );
}
