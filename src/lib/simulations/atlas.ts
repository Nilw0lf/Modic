import type { ModelResult, Settings } from "./everyday";
import { seededRandom } from "./random";

const line = (name: string, ys: number[], start = 0, step = 1) => ({
  name,
  points: ys.map((y, i) => ({ x: start + i * step, y })),
});
const f = (n: number) => Number(n.toFixed(2)).toString();
const out = (
  series: ModelResult["series"],
  xLabel: string,
  yLabel: string,
  stats: [string, string][],
  notice: string,
): ModelResult => ({ series, xLabel, yLabel, stats, notice });
const range = (n: number, fn: (i: number) => number) =>
  Array.from({ length: n }, (_, i) => fn(i));
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function secretarySuccess(skip: number, n = 20) {
  if (skip === 0) return 1 / n;
  let p = 0;
  for (let j = skip + 1; j <= n; j++) p += skip / (n * (j - 1));
  return p;
}
export function entropy(p: number) {
  return p === 0 || p === 1
    ? 0
    : -p * Math.log2(p) - (1 - p) * Math.log2(1 - p);
}
export function braessTimes(demand: number) {
  const without = 45 + demand / 200;
  const withLink = demand <= 4500 ? demand / 50 : 90;
  return { without, withLink };
}
export function atlasModel(id: string, s: Settings, seed = 1): ModelResult {
  const rng = seededRandom(seed);
  switch (id) {
    case "secretary-problem": {
      const ys = range(20, (k) => secretarySuccess(k) * 100);
      const p = ys[s.skip];
      return out(
        [line("Chance of selecting the best", ys)],
        "Candidates observed",
        "Success (%)",
        [
          ["Success chance", `${f(p)}%`],
          ["Best threshold", String(ys.indexOf(Math.max(...ys)))],
        ],
        "The probability averages every random candidate order; the playable round uses one seeded order.",
      );
    }
    case "multi-armed-bandit": {
      const chances = [0.22, 0.48, 0.69],
        count = [0, 0, 0],
        win = [0, 0, 0];
      const agent = [0],
        oracle = [0];
      for (let t = 0; t < 60; t++) {
        let choice: number;
        if (t < 3) choice = t;
        else if (rng() < s.explore / 100) choice = Math.floor(rng() * 3);
        else
          choice = count
            .map((n, i) => (n ? win[i] / n : 0))
            .indexOf(Math.max(...count.map((n, i) => (n ? win[i] / n : 0))));
        const reward = Number(rng() < chances[choice]);
        count[choice]++;
        win[choice] += reward;
        agent.push(agent.at(-1)! + reward);
        oracle.push(oracle.at(-1)! + Number(rng() < chances[2]));
      }
      return out(
        [line("Learning agent", agent), line("Oracle", oracle)],
        "Play",
        "Wins",
        [
          ["Agent wins", String(agent.at(-1))],
          ["Oracle wins", String(oracle.at(-1))],
          ["Trials of best arm", String(count[2])],
        ],
        "The oracle knows the best machine; the learner sees only its own observed wins. One seed is one possible 60-play path.",
      );
    }
    case "coupon-collector": {
      let expected = 0,
        finish = 0;
      const seen = new Set<number>();
      const curve = [0],
        sample = [0];
      for (let k = 1; k <= s.types; k++) {
        expected += s.types / (s.types - k + 1);
        curve.push(expected);
      }
      for (let t = 1; t <= Math.ceil(expected * 3); t++) {
        seen.add(Math.floor(rng() * s.types));
        sample.push(seen.size);
        if (seen.size === s.types) {
          finish = t;
          break;
        }
      }
      const expectedUnique = range(sample.length, (t) =>
        range(s.types, () => 1 - Math.pow(1 - 1 / s.types, t)).reduce(
          (a, b) => a + b,
          0,
        ),
      );
      return out(
        [
          line("Unique in one run", sample),
          line("Expected unique", expectedUnique),
        ],
        "Draws",
        "Unique items",
        [
          ["Expected draws to finish", f(expected)],
          ["Sample finish", finish ? String(finish) : "Not yet"],
          ["Types", String(s.types)],
        ],
        "One run can finish sooner or later than the expectation; the last unseen type takes the longest on average.",
      );
    }
    case "gamblers-fallacy": {
      const prior = range(13, (i) => 100 / Math.pow(2, i));
      return out(
        [
          line("Chance of the entire streak", prior),
          line(
            "Chance of heads next",
            range(13, () => 50),
          ),
        ],
        "Earlier heads",
        "Probability (%)",
        [
          ["Next flip heads", "50%"],
          ["Whole streak chance", `${f(prior[s.streak])}%`],
        ],
        "A streak is unlikely before it happens. Once observed, it does not change an independent next flip.",
      );
    }
    case "inspection-paradox": {
      const long = s.long / 100,
        mean = 2 * (1 - long) + 10 * long;
      const seen = (4 * (1 - long) + 100 * long) / mean;
      const residual = seen / 2;
      const curve = range(76, (i) => {
        const p = (i + 5) / 100;
        return (4 * (1 - p) + 100 * p) / (2 * (2 * (1 - p) + 10 * p));
      });
      return out(
        [line("Random-arrival wait", curve, 5)],
        "Long-gap share (%)",
        "Minutes",
        [
          ["Expected random-arrival wait", f(residual)],
          ["Ordinary mean interval", f(mean)],
          ["Length-biased interval", f(seen)],
        ],
        "A random time falls into long intervals more often than the interval count suggests.",
      );
    }
    case "benfords-law": {
      const ys = range(9, (i) => 100 * Math.log10(1 + 1 / (i + 1)));
      return out(
        [line("First-digit share", ys, 1)],
        "First digit",
        "Probability (%)",
        [
          ["Chosen digit share", `${f(ys[s.digit - 1])}%`],
          ["Digit", String(s.digit)],
        ],
        "This is a theoretical leading-digit distribution for suitable scale-spanning quantities.",
      );
    }
    case "signal-detection": {
      const a = clamp(s.signal - 25, 0, 100),
        b = clamp(s.signal + 25, 0, 100);
      const hit = (t: number) => 100 * clamp((b - t) / (b - a), 0, 1);
      const falseAlarm = (t: number) => 100 - t;
      return out(
        [
          line("Hit rate", range(101, hit)),
          line("False alarms", range(101, falseAlarm)),
        ],
        "Threshold",
        "Flagged (%)",
        [
          ["Hit rate", `${f(hit(s.threshold))}%`],
          ["False-alarm rate", `${f(falseAlarm(s.threshold))}%`],
        ],
        "A stricter threshold flags fewer real signals and fewer noise cases. Try the sample decision above.",
      );
    }
    case "shannon-entropy": {
      const ys = range(101, (i) => entropy(i / 100));
      return out(
        [line("Binary entropy", ys)],
        "Heads chance (%)",
        "Bits",
        [
          ["Uncertainty", `${f(entropy(s.heads / 100))} bits`],
          ["Heads chance", `${s.heads}%`],
        ],
        "Entropy is the expected surprise before one binary observation.",
      );
    }
    case "noisy-channel": {
      const raw = range(46, (i) => i),
        repeat = range(
          46,
          (i) => 100 * (3 * (i / 100) ** 2 - 2 * (i / 100) ** 3),
        );
      const p = s.error / 100;
      return out(
        [line("One bit", raw), line("Three-bit majority", repeat)],
        "Bit error chance (%)",
        "Message error (%)",
        [
          ["Raw error", `${s.error}%`],
          ["Repeated error", `${f(100 * (3 * p * p - 2 * p * p * p))}%`],
        ],
        "Three independently corrupted copies can be decoded by majority vote, at triple the transmission cost.",
      );
    }
    case "braess-paradox": {
      const withLink = range(7, (i) => braessTimes(2000 + i * 500).withLink);
      const without = range(7, (i) => braessTimes(2000 + i * 500).without);
      const times = braessTimes(s.traffic);
      return out(
        [
          line("Shortcut open", withLink, 2000, 500),
          line("Shortcut closed", without, 2000, 500),
        ],
        "Cars",
        "Travel minutes",
        [
          ["With shortcut", f(times.withLink)],
          ["Without shortcut", f(times.without)],
          ["Shortcut effect", f(times.withLink - times.without)],
        ],
        "Compare equilibrium times, not merely the length of a newly available route.",
      );
    }
    case "amdahls-law": {
      const speed = (n: number) =>
        1 / (1 - s.parallel / 100 + s.parallel / 100 / n);
      return out(
        [
          line(
            "Speedup",
            range(32, (i) => speed(i + 1)),
            1,
          ),
        ],
        "Processors",
        "Speedup ×",
        [
          ["Speedup", `${f(speed(s.workers))}×`],
          ["Serial share", `${100 - s.parallel}%`],
        ],
        "Adding workers gives diminishing returns because the serial part remains.",
      );
    }
    case "littles-law": {
      const ys = range(100, (i) => (i + 1) / s.arrivals);
      return out(
        [line("Time in system", ys, 1)],
        "Items in system",
        "Hours",
        [
          ["Average time", `${f(s.work / s.arrivals)} hours`],
          ["Throughput", `${s.arrivals}/hour`],
        ],
        "This relationship applies to long-run averages of a stable process.",
      );
    }
    case "bullwhip-effect": {
      const demand = range(14, (i) => (i === 4 ? 20 + s.shock : 20));
      const upstream = (input: number[]) => {
        const orders = [input[0]];
        for (let i = 1; i < input.length; i++)
          orders.push(
            Math.max(
              0,
              input[i] + (s.reaction / 100) * (input[i] - input[i - 1]),
            ),
          );
        return orders;
      };
      // Each stage reacts to the latest change in the orders it observes.
      const retailer = upstream(demand),
        supplier = upstream(retailer);
      return out(
        [
          line("Customer demand", demand),
          line("Retail orders", retailer),
          line("Supplier orders", supplier),
        ],
        "Day",
        "Units",
        [
          ["Largest supplier order", f(Math.max(...supplier))],
          ["Largest customer demand", String(20 + s.shock)],
        ],
        "A short-lived demand shock can be amplified by order reactions across stages.",
      );
    }
    case "jevons-paradox": {
      const resourceUse = (e: number) =>
        100 * (1 - e) * (1 + (s.rebound / 100) * e);
      return out(
        [
          line(
            "Total resource use",
            range(81, (i) => resourceUse(i / 100)),
          ),
          line(
            "No rebound",
            range(81, (i) => 100 - i),
          ),
        ],
        "Efficiency gain (%)",
        "Resource units",
        [
          ["Total resource use", f(resourceUse(s.efficiency / 100))],
          ["Baseline", "100"],
        ],
        "Efficiency lowers use per task, but the response of task demand can offset it.",
      );
    }
    case "pareto-concentration": {
      const alpha = s.shape / 10;
      const ys = range(50, (i) => 100 * Math.pow((i + 1) / 100, 1 - 1 / alpha));
      return out(
        [line("Share held by top group", ys, 1)],
        "Top group (%)",
        "Total share (%)",
        [
          ["Top 20% share", `${f(100 * Math.pow(0.2, 1 - 1 / alpha))}%`],
          ["Tail exponent", f(alpha)],
        ],
        "A top-group share depends on the assumed distribution's tail shape.",
      );
    }
    case "zipfs-law": {
      const weights = range(20, (i) => Math.pow(i + 1, -s.exponent / 10));
      const total = weights.reduce((a, b) => a + b, 0);
      const ys = weights.map((x) => (x / total) * 100);
      return out(
        [line("Rank share", ys, 1)],
        "Rank",
        "Frequency (%)",
        [
          ["Top rank share", `${f(ys[0])}%`],
          ["Rank 10 share", `${f(ys[9])}%`],
        ],
        "Increasing the exponent makes the top few ranks take a larger share.",
      );
    }
    case "sir-epidemic": {
      let susceptible = 0.99,
        infected = 0.01,
        recovered = 0;
      const S = [susceptible * 100],
        I = [infected * 100],
        R = [0];
      for (let t = 0; t < 80; t++) {
        const next = clamp(
          (s.contact / 100) * susceptible * infected,
          0,
          susceptible,
        );
        const healed = clamp((s.recovery / 100) * infected, 0, infected);
        susceptible -= next;
        infected += next - healed;
        recovered += healed;
        S.push(susceptible * 100);
        I.push(infected * 100);
        R.push(recovered * 100);
      }
      return out(
        [line("Susceptible", S), line("Infectious", I), line("Removed", R)],
        "Day",
        "Population (%)",
        [
          ["Peak infectious", `${f(Math.max(...I))}%`],
          ["Ever infected", `${f(R.at(-1)! + I.at(-1)!)}%`],
        ],
        "A simple closed SIR model is useful for intuition, not for predicting a real outbreak.",
      );
    }
    case "logistic-growth": {
      let n = 5;
      const ys = [n];
      for (let t = 0; t < 50; t++) {
        n += (s.growth / 100) * n * (1 - n / s.capacity);
        ys.push(n);
      }
      return out(
        [
          line("Population", ys),
          line(
            "Capacity",
            range(51, () => s.capacity),
          ),
        ],
        "Period",
        "Individuals",
        [
          ["Population at period 50", f(n)],
          ["Periods to 90% capacity", String(ys.findIndex((value) => value >= s.capacity * 0.9))],
          ["Capacity", String(s.capacity)],
        ],
        "Growth slows as the population approaches its fixed capacity.",
      );
    }
    case "predator-prey": {
      let prey = 50,
        pred = s.predators;
      const X = [prey],
        Y = [pred];
      for (let t = 0; t < 100; t++) {
        const dx = (s.food / 100) * prey - 0.006 * prey * pred;
        const dy = 0.002 * prey * pred - 0.18 * pred;
        prey = clamp(prey + 0.2 * dx, 0, 10000);
        pred = clamp(pred + 0.2 * dy, 0, 10000);
        X.push(prey);
        Y.push(pred);
      }
      return out(
        [line("Prey", X), line("Predators", Y)],
        "Tick",
        "Individuals",
        [
          ["Final prey", f(prey)],
          ["Final predators", f(pred)],
        ],
        "The two populations interact; peaks can occur at different times.",
      );
    }
    case "allee-effect": {
      let n = s.start;
      const ys = [n];
      for (let t = 0; t < 60; t++) {
        n = clamp(n + 0.18 * n * (1 - n / 100) * (n / s.threshold - 1), 0, 100);
        ys.push(n);
      }
      return out(
        [
          line("Population", ys),
          line(
            "Critical threshold",
            range(61, () => s.threshold),
          ),
        ],
        "Period",
        "Individuals",
        [
          ["Final population", f(n)],
          ["Critical threshold", String(s.threshold)],
        ],
        "Below the selected critical population, per-capita growth becomes negative.",
      );
    }
    case "social-tipping": {
      let share = s.seed;
      const ys = [share];
      const thresholds = range(100, (i) =>
        clamp(s.threshold - 20 + (40 * i) / 99, 0, 100),
      );
      for (let t = 0; t < 20; t++) {
        const eligible = thresholds.filter((x) => x <= share).length;
        share = Math.max(share, s.seed, eligible);
        ys.push(share);
      }
      return out(
        [
          line("Adopted", ys),
          line(
            "Typical threshold",
            range(21, () => s.threshold),
          ),
        ],
        "Round",
        "People (%)",
        [
          ["Final adoption", `${f(share)}%`],
          ["Early adopters", `${s.seed}%`],
        ],
        "Each round uses the previous round's adoption share; early adopters do not reverse.",
      );
    }
    case "framing-effect": {
      const saved = s["at-risk"] / 3;
      return out(
        [
          line(
            "Expected saved",
            range(11, () => saved),
            0,
            10,
          ),
          line(
            "Safe plan",
            range(11, () => saved),
            0,
            10,
          ),
        ],
        "Description",
        "People",
        [
          ["Expected saved", f(saved)],
          ["Safe plan saves", f(saved)],
          ["Gamble saves if it wins", String(s["at-risk"])],
        ],
        "Gain and loss descriptions encode the same two options; neither alters the expected outcome.",
      );
    }
    case "endowment-effect": {
      const net = range(91, (i) => s.value - (i + 10));
      return out(
        [line("Value minus price", net, 10)],
        "Market price",
        "Net value",
        [
          ["Value minus price", f(s.value - s.price)],
          ["Your value", String(s.value)],
          ["Price", String(s.price)],
        ],
        "The neutral benchmark depends on value versus price. The game asks whether ownership changes your choices.",
      );
    }
    case "decoy-effect": {
      const quality = 70 + (20 * s.decoy) / 100;
      return out(
        [
          line("A quality", [70, 70]),
          line("B quality", [90, 90]),
          line("Decoy quality", [quality, quality]),
        ],
        "Choice set step",
        "Quality",
        [
          ["Decoy quality", f(quality)],
          ["B quality", "90"],
          ["Decoy price", "70"],
        ],
        "B and the decoy cost the same; B has higher quality. Compare your two choice sets.",
      );
    }
    case "peak-end-rule": {
      const a = [6, 6, 6, 6, s.ending],
        b = [4, 7, 7, 7, 6];
      const avg = (v: number[]) => v.reduce((x, y) => x + y, 0) / v.length;
      const prefix = (v: number[]) => v.map((_, i) => avg(v.slice(0, i + 1)));
      const peak = (v: number[]) => (Math.max(...v) + v.at(-1)!) / 2;
      return out(
        [
          line("Experience A average", prefix(a), 1),
          line("Experience B average", prefix(b), 1),
        ],
        "Moment",
        "Running average",
        [
          ["A peak–end score", f(peak(a))],
          ["A full average", f(avg(a))],
          ["B peak–end score", f(peak(b))],
          ["B full average", f(avg(b))],
        ],
        "The peak–end summary and average can rank sequences differently. Neither is a universal memory formula.",
      );
    }
    case "planning-fallacy": {
      const completions = range(100, () => s.estimate + Math.floor(rng() * 13));
      const budget = s.estimate * (1 + s.buffer / 100);
      const onTime = completions.filter((x) => x <= budget).length;
      const hist = range(
        13,
        (i) => completions.filter((x) => x === s.estimate + i).length,
      );
      return out(
        [line("Projects finishing on this day", hist, s.estimate)],
        "Day",
        "Projects",
        [
          ["Finished within budget", `${onTime}%`],
          ["Budgeted days", f(budget)],
          ["Sample median", String(completions.sort((a, b) => a - b)[49])],
        ],
        "This imaginary reference class adds a uniform 0–12-day delay. Try a buffer before revealing a project.",
      );
    }
    case "bass-diffusion": {
      let adopted = 0;
      const cumulative = [0],
        newUsers = [0];
      for (let t = 0; t < 30; t++) {
        const delta =
          (s.innovation / 100 + (s.imitation / 100) * adopted) * (1 - adopted);
        adopted = clamp(adopted + delta, 0, 1);
        cumulative.push(adopted * 100);
        newUsers.push(delta * 100);
      }
      return out(
        [
          line("Cumulative adopted", cumulative),
          line("New adopters", newUsers),
        ],
        "Period",
        "Share (%)",
        [
          ["Adopted after 30 periods", `${f(adopted * 100)}%`],
          ["Largest adoption wave", `${f(Math.max(...newUsers))}%`],
        ],
        "Independent discovery starts adoption; imitation can accelerate it before the remaining pool shrinks.",
      );
    }
    case "median-voter": {
      const share = (you: number) => {
        let votes = 0;
        for (let i = 0; i <= 100; i++) {
          const a = Math.abs(i - you),
            b = Math.abs(i - s.rival);
          votes += a < b ? 1 : a === b ? 0.5 : 0;
        }
        return (votes / 101) * 100;
      };
      return out(
        [line("Your vote share", range(101, share))],
        "Your position",
        "Vote share (%)",
        [
          ["Your votes", `${f(share(s.you))}%`],
          ["Rival votes", `${f(100 - share(s.you))}%`],
        ],
        "Voters choose whichever of the two platforms is closer; exact ties split.",
      );
    }
    case "el-farol-bar": {
      const goChance = 1 - s.expect / 100;
      let sample = 0;
      for (let i = 0; i < 99; i++) sample += Number(rng() < goChance);
      const attendance = range(101, (i) => 99 * (1 - i / 100) + 1);
      return out(
        [line("Expected attendance if you go", attendance)],
        "Public crowd forecast (%)",
        "People",
        [
          ["Sampled others", String(sample)],
          ["Comfort limit", String(s.capacity)],
          ["Expected others", f(99 * goChance)],
        ],
        "A high public expectation makes the fixed-policy agents more likely to stay home. Play one night above.",
      );
    }
    case "tullock-contest": {
      const chance = (effort: number) => effort / (effort + s.rival);
      const payoff = (effort: number) => 100 * chance(effort) - effort;
      return out(
        [line("Expected net payoff", range(101, payoff))],
        "Your effort",
        "Payoff units",
        [
          ["Expected net payoff", f(payoff(s.effort))],
          ["Win chance", `${f(chance(s.effort) * 100)}%`],
          ["Total effort", String(s.effort + s.rival)],
        ],
        "Both contestants pay their effort whether they win or lose. Increasing effort raises your chance but costs more.",
      );
    }
    default:
      throw new Error(`Unknown atlas model: ${id}`);
  }
}
