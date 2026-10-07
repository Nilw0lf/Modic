import { seededRandom } from "./random";

export type Preferences = { applicants: number[][]; teams: number[][] };
export type MatchingState = {
  matches: number[];
  next: number[];
  log: string[];
};
export const initialMatching = (): MatchingState => ({
  matches: [-1, -1, -1],
  next: [0, 0, 0],
  log: [],
});
export function matchingPreferences(seed: number): Preferences {
  const rng = seededRandom(seed);
  const order = () => {
    const values = [0, 1, 2];
    for (let i = 2; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    return values;
  };
  return {
    applicants: [order(), order(), order()],
    teams: [order(), order(), order()],
  };
}
export function propose(
  state: MatchingState,
  prefs: Preferences,
  applicant: number,
): MatchingState {
  if (state.matches.includes(applicant) || state.next[applicant] >= 3)
    return state;
  const matches = [...state.matches],
    next = [...state.next];
  const team = prefs.applicants[applicant][next[applicant]++],
    incumbent = matches[team];
  const accepted =
    incumbent < 0 ||
    prefs.teams[team].indexOf(applicant) < prefs.teams[team].indexOf(incumbent);
  if (accepted) matches[team] = applicant;
  return {
    matches,
    next,
    log: [
      ...state.log,
      `${["Ari", "Bo", "Cy"][applicant]} proposes to ${["Maple", "Pine", "Oak"][team]}: ${accepted ? (incumbent < 0 ? "tentatively accepted" : `accepted; ${["Ari", "Bo", "Cy"][incumbent]} is released`) : "rejected"}.`,
    ],
  };
}
export function blockingPairs(matches: number[], prefs: Preferences) {
  const pairs: [number, number][] = [];
  for (let a = 0; a < 3; a++)
    for (let t = 0; t < 3; t++) {
      if (matches[t] === a) continue;
      const assigned = matches.indexOf(a),
        incumbent = matches[t];
      if (
        (assigned < 0 ||
          prefs.applicants[a].indexOf(t) <
            prefs.applicants[a].indexOf(assigned)) &&
        (incumbent < 0 ||
          prefs.teams[t].indexOf(a) < prefs.teams[t].indexOf(incumbent))
      )
        pairs.push([a, t]);
    }
  return pairs;
}
export function quantityPayoffs(own: number, rival: number) {
  const price = Math.max(0, 100 - own - rival);
  return { price, own: own * (price - 20), rival: rival * (price - 20) };
}
export const bestQuantity = (rival: number) => Math.max(0, (80 - rival) / 2);
export function pricePayoffs(own: number, rival: number) {
  const demand = Math.max(0, 100 - Math.min(own, rival));
  const units = own < rival ? demand : own === rival ? demand / 2 : 0;
  return {
    units,
    demand,
    profit: units * (own - 20),
    rivalUnits: demand - units,
  };
}
export function blottoAllocation(seed: number) {
  const rng = seededRandom(seed),
    allocation = [0, 0, 0];
  for (let i = 0; i < 10; i++) allocation[Math.floor(rng() * 3)]++;
  return allocation;
}
export function blottoScore(own: number[], rival: number[]) {
  const fields = own.map((n, i) =>
    n > rival[i] ? 1 : n === rival[i] ? 0.5 : 0,
  );
  return {
    fields,
    own: fields.reduce<number>((a, b) => a + b, 0),
    rival: 3 - fields.reduce<number>((a, b) => a + b, 0),
  };
}
export const routingCost = (x: number) => x * x + 60 * (100 - x);
export function contagionStep(active: number[], threshold: number) {
  const previous = new Set(active),
    next = new Set(active);
  for (let n = 0; n < 20; n++) {
    const count = [-2, -1, 1, 2].filter((offset) =>
      previous.has((n + offset + 20) % 20),
    ).length;
    if (count >= threshold) next.add(n);
  }
  return [...next].sort((a, b) => a - b);
}
export const deployedDemand = (prediction: number, response: number) =>
  Math.max(0, Math.min(100, 20 + response * prediction));
export function fairnessCounts(positives: number, threshold: number) {
  let tp = 0,
    fp = 0;
  for (let i = 0; i < 100; i++) {
    const positive = i < positives;
    const rank = positive ? i : i - positives;
    const size = positive ? positives : 100 - positives;
    const score = (positive ? 35 : 5) + (60 * rank) / (size - 1);
    if (score >= threshold) {
      if (positive) tp++;
      else fp++;
    }
  }
  return {
    tp,
    fp,
    fn: positives - tp,
    tn: 100 - positives - fp,
    tpr: tp / positives,
    fpr: fp / (100 - positives),
    ppv: tp + fp ? tp / (tp + fp) : null,
    selected: tp + fp,
  };
}
export function laplaceNoise(epsilon: number, random: () => number) {
  if (!(epsilon > 0)) throw new Error("Epsilon must be positive");
  const u = random() - 0.5;
  return (-Math.sign(u) * Math.log(1 - 2 * Math.abs(u))) / epsilon;
}
export function attentionCards(seed: number) {
  const rng = seededRandom(seed);
  return Array.from({ length: 8 }, (_, index) => ({
    blue: 1 + Math.floor(rng() * 4),
    star: index === 3,
  }));
}
export function changeScene(seed: number) {
  const rng = seededRandom(seed);
  return {
    shapes: Array.from({ length: 12 }, () => (rng() < 0.5 ? "●" : "◆")),
    changed: Math.floor(rng() * 12),
  };
}
export function exposureSequence(seed: number) {
  const rng = seededRandom(seed),
    frequent = rng() < 0.5 ? 0 : 1;
  const sequence = [
    ...Array(9).fill(frequent),
    ...Array(3).fill(1 - frequent),
  ] as number[];
  for (let i = 11; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
  }
  return sequence;
}
