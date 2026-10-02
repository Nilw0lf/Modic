import { seededRandom } from "./random";
import type { Point, Series, Settings } from "./everyday";
export type SimpleOutput = {
  stats: [string, string][];
  notice: string;
  series?: Series[];
  xLabel?: string;
  yLabel?: string;
  dots?: Point[];
  degrees?: number[];
  guesses?: number[];
  level?: number;
};
const f = (n: number) => Number(n.toFixed(2)).toLocaleString("en-US");
const line = (name: string, n: number, fn: (i: number) => number): Series => ({
  name,
  points: Array.from({ length: n }, (_, x) => ({ x, y: fn(x) })),
});
export function correlation(points: Point[]) {
  const mx = points.reduce((sum, p) => sum + p.x, 0) / points.length,
    my = points.reduce((sum, p) => sum + p.y, 0) / points.length;
  let covariance = 0,
    vx = 0,
    vy = 0;
  for (const p of points) {
    covariance += (p.x - mx) * (p.y - my);
    vx += (p.x - mx) ** 2;
    vy += (p.y - my) ** 2;
  }
  return vx && vy ? covariance / Math.sqrt(vx * vy) : 0;
}
export function pointingDifficulty(distance: number, width: number) {
  return Math.log2(1 + distance / width);
}
export function portfolioSpread(weight: number, rho: number) {
  return (
    10 *
    Math.sqrt(
      Math.max(
        0,
        weight ** 2 + (1 - weight) ** 2 + 2 * rho * weight * (1 - weight),
      ),
    )
  );
}
export function informationValues(p: number, cost: number) {
  const launch = 80 * p - 40 * (1 - p),
    baseline = Math.max(0, launch),
    perfect = 80 * p;
  return {
    launch,
    baseline,
    perfect,
    gross: perfect - baseline,
    net: perfect - cost,
  };
}
export function minorityChance(p: number, chooseA: boolean) {
  if (p === 0) return Number(chooseA);
  if (p === 1) return Number(!chooseA);
  let chance = 0;
  for (let k = 0; k <= 100; k++) {
    let combinations = 1;
    for (let j = 1; j <= k; j++) combinations = (combinations * (101 - j)) / j;
    const probability = combinations * p ** k * (1 - p) ** (100 - k);
    if (chooseA ? k <= 49 : k >= 51) chance += probability;
  }
  return Math.min(1, Math.max(0, chance));
}
export function minorityRound(p: number, chooseA: boolean, rng: () => number) {
  let a = Number(chooseA);
  for (let i = 0; i < 100; i++) a += Number(rng() < p);
  const b = 101 - a;
  return { a, b, won: chooseA ? a < b : b < a };
}
export function rpsPayoff(you: number, bot: number) {
  return you === bot ? 0 : (you - bot + 3) % 3 === 1 ? 1 : -1;
}
export function rpsBot(rock: number, rng: () => number) {
  const draw = rng();
  return draw < rock ? 0 : draw < rock + (1 - rock) / 2 ? 1 : 2;
}
export function tank(inflow: number, outflow: number) {
  const levels = [40],
    overflow = [0];
  for (let t = 1; t <= 20; t++) {
    const available = levels[t - 1] + inflow,
      drained = Math.min(outflow, available),
      remaining = available - drained;
    levels.push(Math.min(100, remaining));
    overflow.push(overflow[t - 1] + Math.max(0, remaining - 100));
  }
  return { levels, overflow };
}
export function simpleModel(
  id: string,
  s: Settings,
  seed = 41,
): SimpleOutput | null {
  const rng = seededRandom(seed);
  switch (id) {
    case "berksons-paradox": {
      const all = Array.from({ length: 100 }, (_, i) => ({
        x: (i % 10) + 1,
        y: Math.floor(i / 10) + 1,
      }));
      const dots = s.selected ? all.filter((p) => p.x >= 8 || p.y >= 8) : all;
      return {
        dots,
        stats: [
          ["Applicants shown", String(dots.length)],
          ["Correlation", f(correlation(dots))],
        ],
        notice:
          "The shortlist is selected for either high writing OR high coding. Selection changes the association, not the original scores.",
      };
    }
    case "friendship-paradox": {
      const n = s.leaves,
        degrees = [n, ...Array(n).fill(1)];
      return {
        degrees,
        stats: [
          ["Mean connections per person", f((2 * n) / (n + 1))],
          ["Mean at an edge endpoint", f((n + 1) / 2)],
        ],
        notice:
          "The center appears in many friendship lists. Sampling through links gives it more weight than sampling people equally.",
      };
    }
    case "wisdom-of-crowds": {
      let personError = 0,
        crowdError = 0;
      const guesses: number[] = [];
      for (let round = 0; round < 200; round++) {
        let total = 0;
        for (let i = 0; i < s.people; i++) {
          const guess = 100 + s.bias + (rng() - 0.5) * 60;
          total += guess;
          if (i === 0) personError += Math.abs(guess - 100);
          if (round === 0) guesses.push(guess);
        }
        crowdError += Math.abs(total / s.people - 100);
      }
      return {
        guesses,
        series: [
          line(
            "Mean plus one noise standard error",
            100,
            (i) => 100 + s.bias + Math.sqrt(300 / (i + 1)),
          ),
          line(
            "Mean minus one noise standard error",
            100,
            (i) => 100 + s.bias - Math.sqrt(300 / (i + 1)),
          ),
          line("True quantity", 100, () => 100),
        ],
        xLabel: "Additional estimators beyond the first",
        yLabel: "Estimated quantity",
        stats: [
          ["One person's average absolute error", f(personError / 200)],
          ["Crowd mean's average absolute error", f(crowdError / 200)],
          ["Shared bias", f(s.bias)],
        ],
        notice:
          "Batch results average 200 teaching samples. Adding independent estimates reduces noise; shared bias stays in the mean.",
      };
    }
    case "diversification":
      return {
        series: [
          line("Combined standard deviation", 101, (i) =>
            portfolioSpread(i / 100, s.correlation / 100),
          ),
        ],
        xLabel: "Share in A (%)",
        yLabel: "Standard deviation (units)",
        stats: [
          [
            "Combined variability",
            f(portfolioSpread(s.weight / 100, s.correlation / 100)),
          ],
          ["Each exposure alone", "10"],
        ],
        notice:
          "Both exposures have the same variability. Correlation determines how much a split can cancel their fluctuations.",
      };
    case "random-walk": {
      const paths = Array.from({ length: 20 }, (_, i) => {
        let position = 0;
        const points = [{ x: 0, y: 0 }];
        for (let t = 1; t <= s.steps; t++) {
          position += rng() < 0.5 ? -1 : 1;
          points.push({ x: t, y: position });
        }
        return { name: `Walk ${i + 1}`, points };
      });
      const endings = paths.map((path) => path.points.at(-1)!.y);
      return {
        series: paths.slice(0, 5),
        xLabel: "Steps",
        yLabel: "Position",
        stats: [
          [
            "Mean final position (20 walks)",
            f(endings.reduce((a, b) => a + b, 0) / 20),
          ],
          [
            "Mean absolute distance (20 walks)",
            f(endings.reduce((a, b) => a + Math.abs(b), 0) / 20),
          ],
          ["Theoretical RMS distance", f(Math.sqrt(s.steps))],
        ],
        notice:
          "The chart shows five of twenty sampled walks. Zero expected position is compatible with substantial distance from home.",
      };
    }
    case "stocks-and-flows": {
      const t = tank(s.inflow, s.outflow),
        minute = s.minutes;
      return {
        level: t.levels[minute],
        series: [
          { name: "Stored amount", points: t.levels.map((y, x) => ({ x, y })) },
        ],
        xLabel: "Minutes",
        yLabel: "Stored units",
        stats: [
          ["Minute", String(minute)],
          ["Stored amount", f(t.levels[minute])],
          ["Total overflow", f(t.overflow[minute])],
        ],
        notice:
          "The water level is a stock. The taps are flows. Less inflow still fills the tank if it remains above actual outflow.",
      };
    }
    case "value-of-information": {
      const v = informationValues(s.success / 100, s.cost);
      return {
        stats: [
          ["Launch now: expected payoff", f(v.launch)],
          ["Buy information: expected payoff", f(v.net)],
          ["Gross value of perfect information", f(v.gross)],
        ],
        notice:
          "Compare all three options, including skipping for zero. Information is worthwhile here only if its cost is below the improvement it enables.",
      };
    }
    case "tragedy-of-the-anticommons":
      return {
        stats: [
          ["Combined permission fees", f(s.owners * s.fee)],
          ["Proceed: net project value", f(60 - s.owners * s.fee)],
          ["Abstain", "0"],
        ],
        notice:
          "All permissions are required. Several individually modest fees can exceed the project's value when added together.",
      };
    case "minority-game":
      return {
        stats: [
          [
            "Win chance choosing A",
            `${f(100 * minorityChance(s.aChance / 100, true))}%`,
          ],
          [
            "Win chance choosing B",
            `${f(100 * minorityChance(s.aChance / 100, false))}%`,
          ],
        ],
        notice:
          "Your own choice counts. Bots use independent fixed probabilities; they do not learn from previous rounds.",
      };
    case "rock-paper-scissors": {
      const p = s.rock / 100,
        q = (1 - p) / 2;
      return {
        stats: [
          ["Expected score: rock", "0"],
          ["Expected score: paper", f(p - q)],
          ["Expected score: scissors", f(q - p)],
          ["Expected score: uniform mix", "0"],
        ],
        notice:
          "A uniform one-third mix has zero expected score against this bot. A known bias can make a particular response more profitable.",
      };
    }
    default:
      return null;
  }
}
