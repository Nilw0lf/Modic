export function rng(seed: number) {
  let n = seed >>> 0;
  return () =>
    ((n = (Math.imul(n, 1664525) + 1013904223) >>> 0) + 0.5) / 4294967296;
}
export function selection(p: number, a: number, b: number) {
  return (p * a) / (p * a + (1 - p) * b);
}
export function drift(p: number, copies: number, random: () => number) {
  let count = 0;
  for (let i = 0; i < copies; i++) if (random() < p) count++;
  return count / copies;
}
export function mutation(q: number, mu: number, s: number) {
  const selected = (q * (1 - s * q)) / (1 - s * q * q);
  return selected + mu * (1 - selected);
}
export function bh(p: number[], alpha: number) {
  const sorted = [...p].sort((a, b) => a - b);
  let cutoff = -1;
  sorted.forEach((v, i) => {
    if (v <= ((i + 1) * alpha) / p.length) cutoff = v;
  });
  return p.map((v) => v <= cutoff);
}
export function slope(points: [number, number][]) {
  const x = points.reduce((s, p) => s + p[0], 0) / points.length;
  const y = points.reduce((s, p) => s + p[1], 0) / points.length;
  return (
    points.reduce((s, p) => s + (p[0] - x) * (p[1] - y), 0) /
    points.reduce((s, p) => s + (p[0] - x) ** 2, 0)
  );
}
export const taskNames = [
  "A: Design",
  "B: Permit",
  "C: Copy",
  "D: Build",
  "E: Delivery",
  "F: Launch",
];
export const dependencies = [[], [], [0], [0], [1], [2, 3, 4]];
export function criticalPath(d: number[]) {
  const finish: number[] = [];
  dependencies.forEach((parents, i) =>
    finish.push(d[i] + Math.max(0, ...parents.map((j) => finish[j]))),
  );
  const total = finish[5],
    latest = Array(6).fill(total) as number[];
  for (let i = 5; i >= 0; i--) {
    const children = dependencies.flatMap((parents, j) =>
      parents.includes(i) ? [j] : [],
    );
    latest[i] = children.length
      ? Math.min(...children.map((j) => latest[j] - d[j]))
      : total;
  }
  return { total, finish, slack: finish.map((v, i) => latest[i] - v) };
}
export function resonance(w: number, c: number) {
  return 1 / Math.sqrt((1 - w * w) ** 2 + (c * w) ** 2);
}
export function precision(k: number) {
  const relevant = [0, 2, 3, 6, 9, 14];
  const tp = relevant.filter((i) => i < k).length;
  return {
    tp,
    precision: k ? tp / k : null,
    recall: tp / 6,
    f1: k + 6 ? (2 * tp) / (k + 6) : 0,
  };
}
export function borda(ballot: string) {
  const scores: Record<string, number> = { A: 0, B: 0, C: 0 };
  ["BCA", "CBA", "CBA", ballot].forEach((b) =>
    [...b].forEach((c, i) => (scores[c] += 2 - i)),
  );
  const winner = ["C", "B", "A"].sort((a, b) => scores[b] - scores[a])[0];
  return { scores, winner };
}
export function brier(q: number[], y: number[]) {
  return q.reduce((s, p, i) => s + (p - y[i]) ** 2, 0) / q.length;
}
