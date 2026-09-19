import type { ModelResult, Settings, Series } from "./everyday";
import { seededRandom } from "./random";

export type MatrixGame = {
  actions: [string, string];
  cells: [number, number][][];
};
export function matrixGame(id: string, s: Settings): MatrixGame | null {
  switch (id) {
    case "stag-hunt":
      return {
        actions: ["Joint hunt", "Solo task"],
        cells: [
          [
            [s.reward, s.reward],
            [0, 3],
          ],
          [
            [3, 0],
            [3, 3],
          ],
        ],
      };
    case "chicken-game":
      return {
        actions: ["Hold firm", "Yield"],
        cells: [
          [
            [-s.damage, -s.damage],
            [5, 0],
          ],
          [
            [0, 5],
            [2, 2],
          ],
        ],
      };
    case "matching-pennies":
      return {
        actions: ["Heads", "Tails"],
        cells: [
          [
            [s.stake, -s.stake],
            [-s.stake, s.stake],
          ],
          [
            [-s.stake, s.stake],
            [s.stake, -s.stake],
          ],
        ],
      };
    case "coordination-game":
      return {
        actions: ["Station", "Park"],
        cells: [
          [
            [s.reward, s.reward],
            [0, 0],
          ],
          [
            [0, 0],
            [s.reward, s.reward],
          ],
        ],
      };
    default:
      return null;
  }
}
export function pureEquilibria(game: MatrixGame) {
  const result: [number, number][] = [];
  for (let a = 0; a < 2; a++)
    for (let b = 0; b < 2; b++) {
      if (
        game.cells[a][b][0] >= game.cells[1 - a][b][0] &&
        game.cells[a][b][1] >= game.cells[a][1 - b][1]
      )
        result.push([a, b]);
    }
  return result;
}
const f = (x: number) =>
  x.toLocaleString("en-US", { maximumFractionDigits: 2 });
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
export function strategyModel(id: string, s: Settings, seed = 41): ModelResult {
  const game = matrixGame(id, s);
  if (game) {
    const expected = (a: number, p: number) =>
      (p / 100) * game.cells[a][0][0] + (1 - p / 100) * game.cells[a][1][0];
    const a = expected(0, s.opponent),
      b = expected(1, s.opponent);
    return {
      series: game.actions.map((name, i) =>
        curve(name, 0, 100, (p) => expected(i, p)),
      ),
      xLabel: `Opponent chooses ${game.actions[0]} (%)`,
      yLabel: "Your expected points",
      stats: [
        [`${game.actions[0]} · expected`, f(a)],
        [`${game.actions[1]} · expected`, f(b)],
        [
          "Best response",
          Math.abs(a - b) < 1e-9 ? "Either (tie)" : game.actions[a > b ? 0 : 1],
        ],
      ],
      notice:
        "The chart shows expectations. Use the payoff table to sample an actual outcome. A highlighted cell is a pure Nash equilibrium: neither player improves by changing alone.",
    };
  }
  switch (id) {
    case "antifragility": {
      const d = (s.curvature * s.spread * s.spread) / 100;
      return {
        series: [
          curve("Convex", 0, 40, (x) => 100 + (s.curvature * x * x) / 100),
          curve("Fragile", 0, 40, (x) => 100 - (s.curvature * x * x) / 100),
          curve("Robust", 0, 40, () => 100),
        ],
        xLabel: "Shock size",
        yLabel: "Mean payoff",
        stats: [
          ["Convex mean", f(100 + d)],
          ["Fragile mean", f(100 - d)],
          ["Robust mean", "100"],
        ],
        notice:
          "Mean shock stays zero. Only its spread changes. These are averages over two equally likely outcomes, not guaranteed results for every exposure.",
      };
    }
    case "barbell-strategy": {
      const value = 100 + (s.allocation * s.return) / 100;
      return {
        series: [
          curve(
            "Protected reserve + project",
            -100,
            500,
            (r) => 100 + (s.allocation * r) / 100,
          ),
          curve("All in the project", -100, 500, (r) => 100 + r),
        ],
        xLabel: "Project return (%)",
        yLabel: "Terminal units",
        stats: [
          ["Your terminal units", f(value)],
          ["Protected floor", f(100 - s.allocation)],
          ["All-risk terminal units", f(100 + s.return)],
        ],
        notice:
          "The floor is conditional on a truly protected reserve and no losses beyond the risky stake. More risky exposure increases both upside participation and possible loss.",
      };
    }
    case "optionality": {
      return {
        series: [
          curve(
            "Pilot then choose",
            0,
            200,
            (v) => Math.max(v - s.exercise, 0) - s.cost,
          ),
          curve("Commit upfront", 0, 200, (v) => v - s.exercise),
        ],
        xLabel: "Project value",
        yLabel: "Net payoff",
        stats: [
          ["Pilot payoff", f(Math.max(s.value - s.exercise, 0) - s.cost)],
          ["Commitment payoff", f(s.value - s.exercise)],
          [
            "After the pilot",
            s.value > s.exercise
              ? "Launch"
              : s.value === s.exercise
                ? "Indifferent"
                : "Walk away",
          ],
        ],
        notice:
          "Walking away limits the pilot's loss to its cost. When the project succeeds, the pilot cost still reduces the payoff.",
      };
    }
    case "skin-in-the-game": {
      const p = s.failure / 100,
        agent = (share: number) => (1 - p) * 10 - (p * s.loss * share) / 100,
        principal = (share: number) =>
          (1 - p) * 30 - p * s.loss * (1 - share / 100),
        risky = agent(s.liability) > 2;
      return {
        series: [
          curve("Agent · risky project", 0, 100, agent),
          curve("Principal · risky project", 0, 100, principal),
          curve("Agent · safe project", 0, 100, () => 2),
        ],
        xLabel: "Agent loss share (%)",
        yLabel: "Expected net payoff",
        stats: [
          ["Agent chooses", risky ? "Risky project" : "Safe project"],
          ["Agent · risky expectation", f(agent(s.liability))],
          ["Principal · chosen project", f(risky ? principal(s.liability) : 8)],
        ],
        notice:
          "Liability reallocates the same loss between parties. It can align incentives but does not magically improve the risky project's total expected payoff.",
      };
    }
    case "turkey-problem": {
      const positive = Math.min(s.day, s.breakday - 1),
        forecast = (positive + 1) / (s.day + 2);
      return {
        series: [
          curve("Observed daily outcome", 1, s.day, (d) =>
            d < s.breakday ? 1 : -100,
          ),
        ],
        xLabel: "Day revealed",
        yLabel: "Daily outcome",
        stats: [
          ["Naive P(next day positive)", `${f(forecast * 100)}%`],
          ["Positive days observed", String(positive)],
          ["Cumulative outcome", f(positive - 100 * (s.day - positive))],
        ],
        notice:
          s.day < s.breakday
            ? "No break is visible yet. The smooth record contains no evidence of the mechanism you have placed outside the observation window."
            : "The regime changed. More observations within the old regime did not make the stationary forecasting assumption correct.",
      };
    }
    case "public-goods": {
      const total = s.contribution + 3 * s.others,
        benefit = (s.multiplier * total) / 4;
      return {
        series: [
          curve(
            "Your payoff",
            0,
            20,
            (c) => 20 - c + (s.multiplier * (c + 3 * s.others)) / 4,
          ),
          curve(
            "Another member's payoff",
            0,
            20,
            (c) => 20 - s.others + (s.multiplier * (c + 3 * s.others)) / 4,
          ),
        ],
        xLabel: "Your contribution",
        yLabel: "Final units",
        stats: [
          ["Your payoff", f(20 - s.contribution + benefit)],
          ["Other member payoff", f(20 - s.others + benefit)],
          ["Group total", f(80 - total + s.multiplier * total)],
        ],
        notice: `Each unit contributed returns ${f(s.multiplier / 4)} privately and ${f(s.multiplier)} to the group. At multiplier 4 the contributor is privately indifferent; below 4 contributing reduces their own one-shot payoff.`,
      };
    }
    case "ultimatum-game": {
      const accepted = s.offer >= s.threshold;
      return {
        series: [
          curve("Proposer", 0, 100, (o) => (o >= s.threshold ? 100 - o : 0)),
          curve("Responder", 0, 100, (o) => (o >= s.threshold ? o : 0)),
        ],
        xLabel: "Offered to responder",
        yLabel: "Payoff",
        stats: [
          ["Response", accepted ? "Accepted" : "Rejected"],
          ["Proposer payoff", String(accepted ? 100 - s.offer : 0)],
          ["Responder payoff", String(accepted ? s.offer : 0)],
        ],
        notice:
          "Both get zero after a rejection. The threshold is an explicit simulated preference, not a measured average human response.",
      };
    }
    case "nash-bargaining": {
      const surplus = 100 - s.fallbackA - s.fallbackB,
        feasible = surplus >= 0,
        a = feasible ? s.fallbackA + surplus / 2 : s.fallbackA,
        b = feasible ? 100 - a : s.fallbackB;
      return {
        series: [
          curve("Product of nonnegative gains", 0, 100, (x) =>
            x >= s.fallbackA && 100 - x >= s.fallbackB
              ? (x - s.fallbackA) * (100 - x - s.fallbackB)
              : 0,
          ),
        ],
        xLabel: "Agreement units for A",
        yLabel: "Nash product",
        stats: [
          [
            "Outcome",
            feasible
              ? surplus === 0
                ? "No surplus"
                : "Agreement"
              : "No feasible deal",
          ],
          ["A receives", f(a)],
          ["B receives", f(b)],
        ],
        notice: feasible
          ? "Only splits that cover both outside options are individually rational. The equal-weight solution splits the additional surplus equally."
          : "Outside options exceed the available 100-unit pie. The displayed receipts are separate fallback payoffs, not a division of that pie. A flat zero curve means there is no feasible positive-gain bargain.",
      };
    }
    case "vickrey-auction": {
      const win = s.bid > s.rival;
      return {
        series: [
          curve("Second-price utility", 0, 100, (b) =>
            b > s.rival ? s.value - s.rival : 0,
          ),
          curve("First-price utility", 0, 100, (b) =>
            b > s.rival ? s.value - b : 0,
          ),
        ],
        xLabel: "Your bid",
        yLabel: "Your utility",
        stats: [
          ["Result", win ? "You win" : "Rival wins"],
          ["Second-price payment", f(win ? s.rival : 0)],
          ["Your second-price utility", f(win ? s.value - s.rival : 0)],
          ["Your bid", f(s.bid)],
        ],
        notice:
          "Ties go to the rival. A larger bid can turn a desirable loss into an undesirable win when your value is below the rival bid.",
      };
    }
    case "winners-curse": {
      const random = seededRandom(seed),
        points = [];
      let sum = 0,
        losses = 0;
      for (let t = 1; t <= 1000; t++) {
        let high = 0;
        for (let i = 0; i < s.bidders; i++)
          high = Math.max(
            high,
            Math.max(0, 100 + s.noise * (2 * random() - 1) - s.discount),
          );
        sum += high;
        if (high > 100) losses++;
        if (t === 1 || t % 5 === 0) points.push({ x: t, y: sum / t });
      }
      return {
        series: [
          { name: "Mean winning bid", points },
          curve("True value", 1, 1000, () => 100),
        ],
        xLabel: "Auctions sampled",
        yLabel: "Units",
        stats: [
          ["Mean winning bid", f(sum / 1000)],
          ["Mean winner profit", f(100 - sum / 1000)],
          ["Winners overpaying", `${f(losses / 10)}%`],
        ],
        notice:
          "All estimates are unbiased before selection. Selecting the maximum changes the distribution. Resample to see another reproducible batch.",
      };
    }
    case "market-for-lemons": {
      let pool = Array.from({ length: 100 }, (_, i) => i + 1),
        price = s.premium * 50.5;
      const prices = [{ x: 0, y: price }],
        quality = [{ x: 0, y: 50.5 }];
      for (let t = 1; t <= s.rounds; t++) {
        pool = pool.filter((q) => q <= price);
        const mean = pool.length
          ? pool.reduce((a, b) => a + b, 0) / pool.length
          : 0;
        price = s.premium * mean;
        prices.push({ x: t, y: price });
        quality.push({ x: t, y: mean });
      }
      return {
        series: [
          { name: "Buyer offer", points: prices },
          { name: "Mean quality remaining", points: quality },
        ],
        xLabel: "Market round",
        yLabel: "Quality / price units",
        stats: [
          ["Sellers remaining", `${pool.length} / 100`],
          ["Current buyer offer", f(price)],
          ["Mean remaining quality", f(quality.at(-1)!.y)],
        ],
        notice:
          "Each round's participation is based on the previous offer. The new offer can prompt more exits next round. A fixed point need not preserve the high-quality sellers.",
      };
    }
    default:
      throw new Error(`Unknown strategy model: ${id}`);
  }
}
