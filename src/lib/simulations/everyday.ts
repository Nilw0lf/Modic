import { seededRandom } from "./random";

export type Point = { x: number; y: number };
export type Series = { name: string; points: Point[] };
export type ModelResult = {
  series: Series[];
  xLabel: string;
  yLabel: string;
  stats: [string, string][];
  notice: string;
  dots?: number[];
  grid?: number[];
};
export type Settings = Record<string, number>;
const points = (n: number, fn: (i: number) => number) =>
  Array.from({ length: n }, (_, x) => ({ x, y: fn(x) }));
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;
const fixed = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 1 });

export function birthdayProbability(n: number) {
  let distinct = 1;
  for (let i = 0; i < n; i++) distinct *= Math.max(0, 365 - i) / 365;
  return 1 - distinct;
}

export function montyGame(random: () => number, choice: number) {
  const prize = Math.floor(random() * 3);
  const goats = [0, 1, 2].filter((i) => i !== prize && i !== choice);
  const opened = goats[Math.floor(random() * goats.length)];
  return {
    prize,
    opened,
    switched: [0, 1, 2].find((i) => i !== choice && i !== opened)!,
  };
}

export type Strategy = "cooperate" | "defect" | "tit-for-tat";
export function strategyMove(
  strategy: Strategy,
  previous: boolean | undefined,
) {
  return (
    strategy === "cooperate" ||
    (strategy === "tit-for-tat" && (previous ?? true))
  );
}
export function payoff(a: boolean, b: boolean): [number, number] {
  return a ? (b ? [3, 3] : [0, 5]) : b ? [5, 0] : [1, 1];
}
export function playStrategies(
  a: Strategy,
  b: Strategy,
  rounds: number,
  noise: number,
  seed: number,
) {
  const random = seededRandom(seed);
  let lastA: boolean | undefined, lastB: boolean | undefined;
  let scoreA = 0,
    scoreB = 0,
    cooperation = 0;
  const first: Point[] = [{ x: 0, y: 0 }],
    second: Point[] = [{ x: 0, y: 0 }];
  for (let t = 1; t <= rounds; t++) {
    let moveA = strategyMove(a, lastB),
      moveB = strategyMove(b, lastA);
    if (random() < noise) moveA = !moveA;
    if (random() < noise) moveB = !moveB;
    const scores = payoff(moveA, moveB);
    scoreA += scores[0];
    scoreB += scores[1];
    cooperation += Number(moveA) + Number(moveB);
    first.push({ x: t, y: scoreA });
    second.push({ x: t, y: scoreB });
    lastA = moveA;
    lastB = moveB;
  }
  return {
    first,
    second,
    scoreA,
    scoreB,
    cooperation: cooperation / (2 * rounds),
  };
}

export function neighbourhood(seed: number, threshold: number, rounds: number) {
  const random = seededRandom(seed),
    size = 16;
  const grid = Array.from({ length: size * size }, (_, i) =>
    i < 52 ? 0 : (i % 2) + 1,
  );
  function shuffle<T>(a: T[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  shuffle(grid);
  function similarity(index: number) {
    let occupied = 0,
      same = 0;
    const x = index % size,
      y = Math.floor(index / size);
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        if (
          (dx === 0 && dy === 0) ||
          x + dx < 0 ||
          x + dx >= size ||
          y + dy < 0 ||
          y + dy >= size
        )
          continue;
        const n = grid[(y + dy) * size + x + dx];
        if (n) {
          occupied++;
          if (n === grid[index]) same++;
        }
      }
    return occupied ? same / occupied : 1;
  }
  const history: Point[] = [];
  let moved = 0;
  function record(t: number) {
    const occupied = grid
      .map((v, i) => (v ? similarity(i) : null))
      .filter((v): v is number => v !== null);
    history.push({
      x: t,
      y: (100 * occupied.reduce((a, b) => a + b, 0)) / occupied.length,
    });
  }
  record(0);
  for (let t = 1; t <= rounds; t++) {
    // Snapshot identities so an agent moves at most once within a round.
    const order = shuffle(
      grid.map((v, i) => (v ? i : -1)).filter((i) => i >= 0),
    );
    for (const i of order) {
      if (grid[i] && similarity(i) < threshold) {
        const empty = grid
          .map((v, j) => (v === 0 ? j : -1))
          .filter((j) => j >= 0);
        const target = empty[Math.floor(random() * empty.length)];
        grid[target] = grid[i];
        grid[i] = 0;
        moved++;
      }
    }
    record(t);
  }
  const unhappy = grid.reduce(
    (total, v, i) => total + Number(v !== 0 && similarity(i) < threshold),
    0,
  );
  return { grid, history, moved, unhappy };
}

export function model(id: string, s: Settings, seed = 41): ModelResult {
  const random = seededRandom(seed);
  const base: ModelResult = {
    series: [],
    xLabel: "",
    yLabel: "",
    stats: [],
    notice: "",
  };
  switch (id) {
    case "monty-hall": {
      let stays = 0;
      const stay: Point[] = [],
        swap: Point[] = [];
      for (let i = 1; i <= s.trials; i++) {
        const g = montyGame(random, 0);
        stays += Number(g.prize === 0);
        if (
          i % Math.max(1, Math.floor(s.trials / 200)) === 0 ||
          i === s.trials
        ) {
          stay.push({ x: i, y: (stays / i) * 100 });
          swap.push({ x: i, y: ((i - stays) / i) * 100 });
        }
      }
      return {
        ...base,
        series: [
          { name: "Stay", points: stay },
          { name: "Switch", points: swap },
        ],
        xLabel: "Games played",
        yLabel: "Win rate (%)",
        stats: [
          ["Stay wins", `${stays} / ${s.trials}`],
          ["Switch wins", `${s.trials - stays} / ${s.trials}`],
          ["Switch · exact", "66.7%"],
        ],
        notice:
          "The host always knows where the prize is, always reveals a goat, and always offers a switch.",
      };
    }
    case "birthday-paradox": {
      let collisions = 0;
      let room: number[] = [];
      for (let j = 0; j < 1000; j++) {
        const days = Array.from(
          { length: s.people },
          () => Math.floor(random() * 365) + 1,
        );
        if (new Set(days).size < days.length) collisions++;
        if (j === 0) room = days;
      }
      return {
        ...base,
        series: [
          {
            name: "Exact chance of any match",
            points: points(81, (n) => birthdayProbability(n) * 100),
          },
        ],
        xLabel: "People",
        yLabel: "Chance (%)",
        dots: room,
        stats: [
          ["Exact probability", pct(birthdayProbability(s.people))],
          ["Rooms with a match", `${collisions} / 1,000`],
          ["Possible pairs", fixed((s.people * (s.people - 1)) / 2)],
        ],
        notice: `This displayed room has ${room.length - new Set(room).size} repeated birthday entries. Matching dates are highlighted; day numbers run from 1 to 365.`,
      };
    }
    case "law-of-large-numbers": {
      let heads = 0;
      const path: Point[] = [];
      for (let i = 1; i <= s.trials; i++) {
        heads += Number(random() < s.chance / 100);
        if (
          i < 100 ||
          i % Math.max(1, Math.floor(s.trials / 300)) === 0 ||
          i === s.trials
        )
          path.push({ x: i, y: (100 * heads) / i });
      }
      return {
        ...base,
        series: [
          { name: "Observed share", points: path },
          {
            name: "Underlying chance",
            points: [
              { x: 1, y: s.chance },
              { x: s.trials, y: s.chance },
            ],
          },
        ],
        xLabel: "Tosses",
        yLabel: "Heads (%)",
        stats: [
          ["Heads", `${heads} / ${s.trials}`],
          ["Observed share", pct(heads / s.trials)],
          [
            "Gap from probability",
            `${Math.abs((100 * heads) / s.trials - s.chance).toFixed(1)} pp`,
          ],
        ],
        notice:
          "Increasing the sample keeps the same sequence of tosses. Resample starts a different history. No toss is due to correct a streak.",
      };
    }
    case "compound-growth": {
      const nominal = (t: number) => 1000 * (1 + s.rate / 100) ** t;
      const real = (t: number) => nominal(t) / (1 + s.inflation / 100) ** t;
      return {
        ...base,
        series: [
          { name: "Reinvested", points: points(s.years + 1, nominal) },
          {
            name: "Simple interest",
            points: points(s.years + 1, (t) => 1000 * (1 + (s.rate / 100) * t)),
          },
          { name: "Purchasing power", points: points(s.years + 1, real) },
        ],
        xLabel: "Years",
        yLabel: "Value (units)",
        stats: [
          ["Final nominal value", fixed(nominal(s.years))],
          ["Today's purchasing power", fixed(real(s.years))],
          ["Reinvested gains", fixed(nominal(s.years) - 1000)],
        ],
        notice:
          "All scenarios start with 1,000 units. The purchasing-power line expresses the reinvested balance in today's units.",
      };
    }
    case "diminishing-returns": {
      const q = (n: number) => s.capacity * (1 - Math.exp(-n / 5));
      const profits = points(21, (n) => q(n) - s.wage * n);
      const best = profits.reduce((a, b) => (a.y > b.y ? a : b));
      return {
        ...base,
        series: [
          { name: "Output / revenue", points: points(21, q) },
          { name: "Labour cost", points: points(21, (n) => s.wage * n) },
        ],
        xLabel: "Workers",
        yLabel: "Units per shift",
        stats: [
          ["Output at selected staff", fixed(q(s.workers))],
          ["Next worker adds", fixed(q(s.workers + 1) - q(s.workers))],
          [
            "Profit at selected staff",
            fixed(q(s.workers) - s.wage * s.workers),
          ],
        ],
        notice: `At a price of one unit per meal, ${best.x} workers maximizes model profit among 0–20 workers. The next worker costs ${s.wage} units.`,
      };
    }
    case "opportunity-cost": {
      const knowledge = (h: number) => s.learning * Math.sqrt(8 - h);
      return {
        ...base,
        series: [
          {
            name: "Feasible day",
            points: Array.from({ length: 81 }, (_, i) => ({
              x: (s.pay * i) / 10,
              y: knowledge(i / 10),
            })),
          },
        ],
        xLabel: "Earnings (units)",
        yLabel: "Learning output",
        stats: [
          ["Work earnings", fixed(s.work * s.pay)],
          ["Learning output", fixed(knowledge(s.work))],
          ["Learning hours", fixed(8 - s.work)],
        ],
        notice:
          s.work < 8
            ? `One more hour of work adds ${s.pay} earnings units and gives up ${fixed(knowledge(s.work) - knowledge(s.work + 1))} learning units.`
            : "All eight hours go to work. Recovering an hour for learning gives up one hour of pay.",
      };
    }
    case "sunk-cost-fallacy": {
      const increment = (s.success / 100) * s.reward - s.cost;
      return {
        ...base,
        series: [
          {
            name: "Stop · lifetime net",
            points: [
              { x: 0, y: -s.sunk },
              { x: 100, y: -s.sunk },
            ],
          },
          {
            name: "Continue · expected lifetime net",
            points: points(101, (p) => (p / 100) * s.reward - s.cost - s.sunk),
          },
        ],
        xLabel: "Success probability (%)",
        yLabel: "Lifetime net (units)",
        stats: [
          ["Stop now", fixed(-s.sunk)],
          ["Continue · expected", fixed(increment - s.sunk)],
          ["Value of continuing", fixed(increment)],
        ],
        notice: `At ${s.success}% success, ${increment > 0 ? "continuing has higher expected value" : increment < 0 ? "stopping has higher expected value" : "both choices have the same expected value"}. Past spending lowers both totals equally.`,
      };
    }
    case "anchoring-bias": {
      const estimate = (a: number) => a + (s.adjust / 100) * (80 - a);
      return {
        ...base,
        series: [
          {
            name: "Adjusted estimate",
            points: points(181, (i) => estimate(i + 20)).map((p) => ({
              ...p,
              x: p.x + 20,
            })),
          },
          {
            name: "Comparable-sales evidence",
            points: [
              { x: 20, y: 80 },
              { x: 200, y: 80 },
            ],
          },
        ],
        xLabel: "Asking price (units)",
        yLabel: "Estimate (units)",
        stats: [
          ["Asking price", fixed(s.anchor)],
          ["Toy estimate", fixed(estimate(s.anchor))],
          ["Distance from evidence", fixed(Math.abs(estimate(s.anchor) - 80))],
        ],
        notice:
          "The evidence stays fixed at 80. At 100% adjustment, both lines coincide and the initial asking price stops affecting the estimate.",
      };
    }
    case "present-bias": {
      const value = (amount: number, days: number) =>
        amount * (days === 0 ? 1 : (s.beta / 100) * 0.99 ** days);
      const early = value(50, s.offset),
        later = value(s.later, s.offset + s.delay);
      return {
        ...base,
        series: [
          { name: "Early reward", points: points(31, (t) => value(50, t)) },
          {
            name: "Later reward",
            points: points(31, (t) => value(s.later, t + s.delay)),
          },
        ],
        xLabel: "Days until early reward",
        yLabel: "Subjective value (units)",
        stats: [
          ["Early · subjective value", fixed(early)],
          ["Later · subjective value", fixed(later)],
          [
            "Model preference",
            early > later ? "Earlier" : early < later ? "Later" : "Indifferent",
          ],
        ],
        notice: `The early option pays 50 on day ${s.offset}; the later option pays ${s.later} on day ${s.offset + s.delay}. The jump between today and tomorrow comes from the assumed present-bias weight.`,
      };
    }
    case "forgetting-curve": {
      let last = 0,
        strength = s.strength,
        reviews = 0;
      const reviewed: Point[] = [];
      for (let i = 0; i <= 300; i++) {
        const day = i / 10;
        if (i > 0 && i % (s.interval * 10) === 0 && day < 30) {
          reviewed.push({
            x: day,
            y: 100 * Math.exp(-(day - last) / strength),
          });
          last = day;
          strength *= 1 + s.boost / 100;
          reviews++;
        }
        reviewed.push({ x: day, y: 100 * Math.exp(-(day - last) / strength) });
      }
      return {
        ...base,
        series: [
          { name: "With reviews", points: reviewed },
          {
            name: "One study session",
            points: points(
              301,
              (i) => 100 * Math.exp(-i / 10 / s.strength),
            ).map((p) => ({ ...p, x: p.x / 10 })),
          },
        ],
        xLabel: "Days",
        yLabel: "Retention (%)",
        stats: [
          ["Day 30 · with review", pct(reviewed.at(-1)!.y / 100)],
          ["Day 30 · no review", pct(Math.exp(-30 / s.strength))],
          ["Reviews completed", String(reviews)],
        ],
        notice:
          "The vertical jumps are review sessions. Extra sessions require extra effort, and the assumed benefit does not constitute a personalized study schedule.",
      };
    }
    case "tragedy-of-the-commons": {
      function lake(compliance: number) {
        let stock = 80,
          total = 0;
        const path = [{ x: 0, y: stock }];
        for (let t = 1; t <= 40; t++) {
          const regrowth = (s.growth / 100) * stock * (1 - stock / 100);
          const demand =
            s.harvest * (1 - compliance) +
            Math.min(s.harvest, regrowth) * compliance;
          const catchAmount = Math.min(stock + regrowth, demand);
          stock = Math.max(0, stock + regrowth - catchAmount);
          total += catchAmount;
          path.push({ x: t, y: stock });
        }
        return { path, total, stock };
      }
      const chosen = lake(s.rule / 100),
        open = lake(0);
      return {
        ...base,
        series: [
          { name: "Selected compliance", points: chosen.path },
          { name: "No catch limit", points: open.path },
        ],
        xLabel: "Seasons",
        yLabel: "Fish stock (units)",
        stats: [
          ["Stock after 40 seasons", fixed(chosen.stock)],
          ["Total catch · selected", fixed(chosen.total)],
          ["Total catch · no limit", fixed(open.total)],
        ],
        notice:
          chosen.stock < 1
            ? "The model lake is depleted. Lower catches or stronger compliance can preserve the stock."
            : "The lake still has a stock. Compare total catches across the whole horizon, not just the first season.",
      };
    }
    case "schelling-segregation": {
      const n = neighbourhood(seed, s.threshold / 100, s.rounds);
      return {
        ...base,
        grid: n.grid,
        series: [{ name: "Mean similar-neighbour share", points: n.history }],
        xLabel: "Rounds",
        yLabel: "Similar neighbours (%)",
        stats: [
          ["Moves completed", String(n.moved)],
          ["Currently unsatisfied", String(n.unhappy)],
          ["Similar-neighbour share", pct(n.history.at(-1)!.y / 100)],
        ],
        notice:
          "Circles and squares are two abstract groups. Blank cells are vacancies. Move the rounds slider back to zero to compare with the same starting grid.",
      };
    }
    case "butterfly-effect": {
      let a = 0.4,
        b = 0.4 + s.epsilon / 1e6;
      const first: Point[] = [{ x: 0, y: a }],
        second: Point[] = [{ x: 0, y: b }];
      let diverged: number | null = null;
      for (let t = 1; t <= s.steps; t++) {
        a = s.rate * a * (1 - a);
        b = s.rate * b * (1 - b);
        first.push({ x: t, y: a });
        second.push({ x: t, y: b });
        if (diverged === null && Math.abs(a - b) > 0.1) diverged = t;
      }
      return {
        ...base,
        series: [
          { name: "Start at 0.4", points: first },
          { name: "Slightly different start", points: second },
        ],
        xLabel: "Generations",
        yLabel: "Normalized population",
        stats: [
          ["Initial difference", (s.epsilon / 1e6).toFixed(6)],
          ["Final difference", Math.abs(a - b).toFixed(6)],
          [
            "First gap above 0.1",
            diverged === null ? "Not reached" : `Step ${diverged}`,
          ],
        ],
        notice:
          "Identical starting values stay identical. At a stable parameter, differences shrink; in a chaotic regime they can grow dramatically.",
      };
    }
    default:
      throw new Error(`Unknown model: ${id}`);
  }
}
