import type { ModelResult, Settings, Series } from "./everyday";
import { seededRandom } from "./random";
import { atlasModel } from "./atlas";

const f = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 1 });
const curve = (
  name: string,
  lo: number,
  hi: number,
  fn: (x: number) => number,
): Series => ({
  name,
  points: Array.from({ length: hi - lo + 1 }, (_, i) => ({
    x: lo + i,
    y: fn(lo + i),
  })),
});
export function simpson(s: Settings) {
  const a = 30 + 0.6 * s.easyA,
    b = 20 + 0.6 * s.easyB;
  return { a, b, winner: a > b ? "A" : a < b ? "B" : "Tie" };
}
export type CascadeStep = {
  number: number;
  signal: "Red" | "Blue";
  action: "Red" | "Blue";
  cascade: boolean;
  belief: number;
};
export function cascade(seed: number, accuracy: number, count: number) {
  const random = seededRandom(seed),
    truth = random() < 0.5 ? "Red" : "Blue";
  const p = accuracy / 100,
    weight = Math.log(p / (1 - p));
  let logOdds = 0;
  const steps: CascadeStep[] = [];
  const choose = (prior: number, signal: "Red" | "Blue") => {
    const score = prior + (signal === "Red" ? weight : -weight);
    return score > 1e-10 ? "Red" : score < -1e-10 ? "Blue" : signal;
  };
  for (let i = 0; i < count; i++) {
    const signal = random() < p ? truth : truth === "Red" ? "Blue" : "Red";
    const redAction = choose(logOdds, "Red"),
      blueAction = choose(logOdds, "Blue");
    const action = choose(logOdds, signal);
    const chance = (state: "Red" | "Blue") => {
      const redSignal = state === "Red" ? p : 1 - p;
      return (
        (redAction === action ? redSignal : 0) +
        (blueAction === action ? 1 - redSignal : 0)
      );
    };
    const red = chance("Red"),
      blue = chance("Blue");
    logOdds = Math.max(-40, Math.min(40, logOdds + Math.log(red / blue)));
    steps.push({
      number: i + 1,
      signal,
      action,
      cascade: redAction === blueAction,
      belief: 1 / (1 + Math.exp(-logOdds)),
    });
  }
  return { truth, steps };
}
export function thresholdOutcomes(s: Settings) {
  const p = s.chance / 100,
    outcomes = [];
  for (let k = 0; k <= 3; k++) {
    const combinations = [1, 3, 3, 1][k],
      probability = combinations * p ** k * (1 - p) ** (3 - k);
    outcomes.push({
      otherHelpers: k,
      probability,
      funded: s.pledge + 10 * k >= s.target,
    });
  }
  return outcomes;
}
export function beautyBots(seed: number, depth: number) {
  const random = seededRandom(seed);
  return Array.from({ length: 9 }, () =>
    Math.max(0, Math.min(100, 50 * (2 / 3) ** depth + (random() - 0.5) * 10)),
  );
}
export function hotellingShare(you: number, rival: number) {
  if (you === rival) return 50;
  const boundary = (you + rival) / 2;
  return you < rival ? boundary : 100 - boundary;
}
export function lotteryPayoff(
  choice: "A" | "B" | "C" | "D",
  percentile: number,
  base: number,
) {
  switch (choice) {
    case "A":
      return base;
    case "B":
      return percentile < 1 ? 0 : percentile < 90 ? base : 5 * base;
    case "C":
      return percentile < 11 ? base : 0;
    case "D":
      return percentile < 10 ? 5 * base : 0;
  }
}
export function playModel(id: string, s: Settings, seed = 41): ModelResult {
  switch (id) {
    case "simpsons-paradox": {
      const { a, b, winner } = simpson(s);
      return {
        series: [
          curve("A overall", 0, 100, (e) => 30 + 0.6 * e),
          curve("B overall", 0, 100, () => b),
        ],
        xLabel: "A's easy-case share (%)",
        yLabel: "Overall success (%)",
        stats: [
          ["A · overall", `${f(a)}%`],
          ["B · overall", `${f(b)}%`],
          ["Headline winner", winner],
        ],
        notice:
          "A succeeds more often within easy cases and within hard cases. The aggregate can reverse because A and B face different mixes of cases.",
      };
    }
    case "ellsberg-urn": {
      const low = 50 - s.width / 2,
        high = 50 + s.width / 2;
      return {
        series: [
          curve("Known urn red chance", 0, 100, () => 50),
          curve("Unknown urn red chance", 0, 100, (x) => x),
        ],
        xLabel: "Unknown urn's possible red share (%)",
        yLabel: "Chance of red (%)",
        stats: [
          ["Known red chance", "50%"],
          ["Unknown range", `${f(low)}–${f(high)}%`],
          ["Payoff on red", "10 tokens"],
        ],
        notice:
          "The midpoint of the possible unknown range is 50%, but the actual composition remains hidden until you choose and draw. The range does not specify your beliefs about its probabilities.",
      };
    }
    case "allais-paradox": {
      const v = s.prize;
      return {
        series: [
          curve("A · certain", 0, 99, (x) => lotteryPayoff("A", x, v)),
          curve("B · gamble", 0, 99, (x) => lotteryPayoff("B", x, v)),
          curve("C · long shot", 0, 99, (x) => lotteryPayoff("C", x, v)),
          curve("D · bigger long shot", 0, 99, (x) => lotteryPayoff("D", x, v)),
        ],
        xLabel: "Random draw percentile",
        yLabel: "Payoff for that draw",
        stats: [
          ["Pair 1 · A / B expected", `${f(v)} / ${f(1.39 * v)}`],
          ["Pair 2 · C / D expected", `${f(0.11 * v)} / ${f(0.5 * v)}`],
          ["Base prize", f(v)],
        ],
        notice:
          "Each curve shows the actual payoff at that random draw. The expected values below average over all 100 equally likely draws; they are not a verdict on what you should choose.",
      };
    }
    case "information-cascade": {
      const run = cascade(seed, s.accuracy, s.people),
        steps = run.steps;
      return {
        series: [
          {
            name: "Public belief: red",
            points: [
              { x: 0, y: 50 },
              ...steps.map((t) => ({ x: t.number, y: t.belief * 100 })),
            ],
          },
        ],
        xLabel: "Observed decisions",
        yLabel: "Public chance of red (%)",
        stats: [
          ["Signal accuracy", `${s.accuracy}%`],
          ["Last public belief", `${f(steps.at(-1)!.belief * 100)}% red`],
          [
            "Clues ignored in a cascade",
            String(
              steps.filter((t) => t.cascade && t.action !== t.signal).length,
            ),
          ],
        ],
        notice:
          "A cascade is a decision made from observed actions even if the private clue points the other way. Reveal the private clues below to see when actions stop carrying new evidence.",
      };
    }
    case "threshold-public-good": {
      const p = s.chance / 100;
      const expected = (pledge: number) => {
        let prob = 0;
        for (let k = 0; k <= 3; k++)
          if (pledge + 10 * k >= s.target)
            prob += [1, 3, 3, 1][k] * p ** k * (1 - p) ** (3 - k);
        return 40 * prob - pledge;
      };
      return {
        series: [
          curve("Your expected net payoff", 0, 20, expected),
          curve("Wait and pay nothing", 0, 20, () => expected(0)),
        ],
        xLabel: "Your pledge",
        yLabel: "Expected payoff",
        stats: [
          ["Expected if you pledge", f(expected(s.pledge))],
          ["Expected if you wait", f(expected(0))],
          [
            "Funding chance",
            `${f(((expected(s.pledge) + s.pledge) / 40) * 100)}%`,
          ],
        ],
        notice:
          "A contribution can suddenly matter when it crosses the funding threshold. Your pledge is spent even if the project fails in this teaching game.",
      };
    }
    case "trust-game": {
      const sender = (x: number) => 10 - x + (3 * x * s.return) / 100,
        receiver = (x: number) => 3 * x * (1 - s.return / 100);
      return {
        series: [
          curve("Sender final tokens", 0, 10, sender),
          curve("Recipient final tokens", 0, 10, receiver),
        ],
        xLabel: "Tokens sent",
        yLabel: "Final tokens",
        stats: [
          ["Sender final", f(sender(s.send))],
          ["Recipient final", f(receiver(s.send))],
          ["Pie after transfer", f(10 + 2 * s.send)],
        ],
        notice:
          "The larger joint pie depends on sending. How it is divided depends on the recipient's return choice. Play both roles below to see the sequence.",
      };
    }
    case "centipede-game": {
      const pot = (turn: number) => 4 * 2 ** turn;
      return {
        series: [
          curve("Pot available", 0, s.turns, pot),
          curve("Take now · mover", 0, s.turns, (t) => 0.8 * pot(t)),
        ],
        xLabel: "Decision number",
        yLabel: "Tokens",
        stats: [
          ["Take now · your tokens", "3.2"],
          ["If you pass · next opponent takes", "1.6"],
          ["Partner pass chance", `${s.passes}%`],
        ],
        notice:
          "Passing doubles the shared pot but gives the other side the next choice. The partner is a fixed random policy; play a path below.",
      };
    }
    case "volunteers-dilemma": {
      const expected = (chance: number) =>
        30 * (1 - (1 - chance / 100) ** (s.group - 1));
      return {
        series: [
          curve("Wait · expected", 0, 100, expected),
          curve("Volunteer · certain", 0, 100, () => 30 - s.cost),
        ],
        xLabel: "Each other's volunteer chance (%)",
        yLabel: "Your expected payoff",
        stats: [
          ["Volunteer payoff", f(30 - s.cost)],
          ["Wait · expected", f(expected(s.chance))],
          [
            "Chance no one else acts",
            `${f((1 - s.chance / 100) ** (s.group - 1) * 100)}%`,
          ],
        ],
        notice:
          "Volunteering secures the benefit but costs you. Waiting can work if someone else steps forward; play a round to see who acts.",
      };
    }
    case "beauty-contest": {
      const bots = beautyBots(seed, s.depth),
        sum = bots.reduce((a, b) => a + b, 0),
        target = (guess: number) => ((2 / 3) * (sum + guess)) / 10,
        ideal = ((2 / 3) * sum) / (10 - 2 / 3);
      return {
        series: [
          curve("Distance from target", 0, 100, (g) => Math.abs(g - target(g))),
          curve("Target", 0, 100, target),
        ],
        xLabel: "Your guess",
        yLabel: "Distance / target",
        stats: [
          ["Target for your guess", f(target(s.guess))],
          ["Your distance", f(Math.abs(s.guess - target(s.guess)))],
          ["Best response to these bots", f(ideal)],
        ],
        notice:
          "The target includes your own guess, so changing your number moves the target slightly. The bots have a fixed reasoning rule and a reproducible small variation.",
      };
    }
    case "hotelling-location": {
      const share = hotellingShare(s.you, s.rival);
      return {
        series: [
          curve("Your customer share", 0, 100, (x) =>
            hotellingShare(x, s.rival),
          ),
          curve(
            "Rival customer share",
            0,
            100,
            (x) => 100 - hotellingShare(x, s.rival),
          ),
        ],
        xLabel: "Your shop location",
        yLabel: "Customers (%)",
        stats: [
          ["Your customers", `${f(share)}%`],
          ["Rival customers", `${f(100 - share)}%`],
          ["Midpoint", f((s.you + s.rival) / 2)],
        ],
        notice:
          "Customers visit the nearer shop. At exactly the same location, the two shops split demand 50/50. Prices and product quality are equal in this model.",
      };
    }
    default:
      return atlasModel(id, s, seed);
  }
}
