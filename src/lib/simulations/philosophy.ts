import { seededRandom } from "./random";
export const controlActions = [
  { name: "Check equipment", kind: "action", effect: 3 },
  { name: "Practise the route", kind: "action", effect: 2 },
  { name: "Demand calm weather", kind: "external", effect: 0 },
  { name: "Seek universal applause", kind: "external", effect: 0 },
] as const;
export function controlOutcome(allocation: number[], weather: number) {
  const preparation = allocation[0] * 3 + allocation[1] * 2;
  return {
    preparation,
    outcome: preparation + weather,
    spent: allocation.reduce((s, n) => s + n, 0),
  };
}
export const socialPolicies = [
  { name: "Equal shares", values: [6, 6, 6, 6] },
  { name: "High total, low floor", values: [1, 5, 9, 17] },
  { name: "Protected floor", values: [5, 6, 8, 9] },
];
export function distribution(values: number[]) {
  return {
    total: values.reduce((s, v) => s + v, 0),
    minimum: Math.min(...values),
    mean: values.reduce((s, v) => s + v, 0) / values.length,
  };
}
export const lotteryRole = (seed: number) =>
  Math.floor(seededRandom(seed)() * 4);
export function adaptation(excess: number, retention: number, boost = 0) {
  return excess * retention + boost;
}
export const ruleValue = (x: number, curve: boolean) =>
  2 * x + (curve ? (x - 1) * (x - 2) * (x - 3) : 0);
export const squaredError = (prediction: number, actual: number) =>
  (prediction - actual) ** 2;
export const factoryBadges = ["blue", "blue", "blue", "amber", "blue"];
export function promiseWorld(falsePromises: number) {
  const reliable = 10 - falsePromises;
  return { reliable, loans: reliable >= 6 ? 10 : 0 };
}
export function utilityAllocation(a: number) {
  const gainsA = [0, 8, 14, 18, 20, 21],
    gainsB = [0, 6, 11, 15, 18, 20];
  return {
    a: gainsA[a],
    b: gainsB[5 - a],
    total: gainsA[a] + gainsB[5 - a],
    minimum: Math.min(gainsA[a], gainsB[5 - a]),
  };
}
export const capabilityProjects = [
  { name: "Accessible bus", cost: 2, opens: "Training" },
  { name: "Local clinic", cost: 2, opens: "Healthcare" },
  { name: "Public internet hub", cost: 2, opens: "Remote work" },
];
export function capabilityAccess(projects: number[]) {
  return {
    spent: projects.reduce((s, i) => s + capabilityProjects[i].cost, 0),
    central: 3,
    remote: projects.length,
  };
}
export function zenoStep(steps: number, shrinkingTime: boolean) {
  const distance = 1 - 2 ** -steps,
    time = shrinkingTime ? 1 - 2 ** -steps : steps;
  return { distance, remaining: 2 ** -steps, time };
}
export function shipState(replaced: number[]) {
  const originals = 8 - new Set(replaced).size;
  return {
    aboard: originals,
    stored: 8 - originals,
    replacement: 8 - originals,
  };
}
export function ratingDifference(before: number[], after: number[]) {
  return before.map((n, i) => after[i] - n);
}
