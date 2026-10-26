"use client";
import { useState } from "react";
import {
  patchReward,
  patchOptimum,
  payoffs,
  regretScores,
  realOptions,
  energy,
  annealAccept,
  rng,
} from "@/lib/simulations/horizons";
import { Actions, Chart, Ledger, Slider, Stats, fmt } from "../depth/Shared";
export function Foraging() {
  const [travel, setTravel] = useState(3),
    [t, setT] = useState(0),
    [bank, setBank] = useState(0),
    [elapsed, setElapsed] = useState(0),
    [patches, setPatches] = useState(0);
  const optimum = patchOptimum(travel);
  return (
    <>
      <p>
        A fresh berry patch yields quickly at first, then slowly. Moving to a
        new identical patch costs time. Try different leaving times to improve
        your completed-cycle harvest rate.
      </p>
      <Slider
        id="travel"
        label="Travel time between patches"
        value={travel}
        min={1}
        max={10}
        onChange={(v) => {
          setTravel(v);
          setT(0);
          setBank(0);
          setElapsed(0);
          setPatches(0);
        }}
      />
      <div
        className="horizon-berries"
        aria-label={`${fmt(patchReward(t))} reward units in this patch`}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <span
            key={i}
            className={i < Math.floor(patchReward(t)) ? "picked" : ""}
          >
            ●
          </span>
        ))}
      </div>
      <Actions>
        <button disabled={t >= 30} onClick={() => setT((v) => v + 1)}>
          Harvest for one time unit
        </button>
        <button
          disabled={!t}
          onClick={() => {
            setBank((v) => v + patchReward(t));
            setElapsed((v) => v + t + travel);
            setPatches((v) => v + 1);
            setT(0);
          }}
        >
          Leave patch & travel
        </button>
      </Actions>
      <Stats
        items={[
          ["Current patch time", String(t)],
          ["Current patch reward", fmt(patchReward(t))],
          ["Next unit adds", fmt(patchReward(t + 1) - patchReward(t))],
          [
            "Completed-cycle reward / time",
            elapsed ? fmt(bank / elapsed) : "No completed cycle",
          ],
          ["Completed patches", String(patches)],
          ["Best integer stay in model", String(optimum)],
        ]}
      />
      <p>
        Reward is R(t)=20(1−exp(−t/5)). Each completed cycle includes its travel
        cost; the benchmark maximises R(t)/(t+travel) over integer stays 1–30.
        Real foraging also involves uncertainty, different patches and costs
        absent here.
      </p>
    </>
  );
}
export function Regret() {
  const [rule, setRule] = useState(false),
    [choice, setChoice] = useState<number | null>(null),
    [locked, setLocked] = useState(false),
    [state, setState] = useState<number | null>(null);
  const names = ["Café", "Park", "Hall"],
    regrets = regretScores();
  return (
    <>
      <p>
        Choose a venue without assigning probabilities to sun and rain. Maximin
        protects the worst payoff; minimax regret limits the largest shortfall
        relative to the best action in hindsight.
      </p>
      <Actions>
        <button
          disabled={locked}
          aria-pressed={!rule}
          onClick={() => setRule(false)}
        >
          Maximin payoff
        </button>
        <button
          disabled={locked}
          aria-pressed={rule}
          onClick={() => setRule(true)}
        >
          Minimax regret
        </button>
      </Actions>
      <Ledger
        label="Stipulated payoffs and decision criteria"
        headers={["Venue", "Sun", "Rain", "Worst payoff", "Worst regret"]}
        rows={payoffs.map((p, i) => [
          names[i],
          ...p,
          Math.min(...p),
          regrets[i],
        ])}
      />
      <Actions>
        {names.map((n, i) => (
          <button
            key={n}
            disabled={locked}
            aria-pressed={choice === i}
            onClick={() => setChoice(i)}
          >
            Choose {n}
          </button>
        ))}
        <button
          disabled={choice === null || locked}
          onClick={() => setLocked(true)}
        >
          Commit venue
        </button>
      </Actions>
      {locked && (
        <>
          <Actions>
            <button onClick={() => setState(0)}>Inspect sun outcome</button>
            <button onClick={() => setState(1)}>Inspect rain outcome</button>
          </Actions>
          <p>
            The chosen rule recommends{" "}
            {rule ? "Hall (maximum regret 3)" : "Café (minimum payoff 4)"}. This
            is a rule comparison, not a universal correct preference.
          </p>
          {state !== null && (
            <Stats
              items={[
                ["Your payoff", String(payoffs[choice!][state])],
                [
                  "Hindsight regret",
                  String([10, 4][state] - payoffs[choice!][state]),
                ],
              ]}
            />
          )}
        </>
      )}
      <p>
        Regret here is an opportunity-loss calculation, not an emotional or
        mental-health measure. Different criteria can recommend different
        choices when state probabilities are not specified.
      </p>
    </>
  );
}
export function Options({ seed }: { seed: number }) {
  const [p, setP] = useState(50),
    [fee, setFee] = useState(5),
    [choice, setChoice] = useState<string | null>(null),
    [reveal, setReveal] = useState(false),
    high = rng(seed)() < p / 100,
    r = realOptions(p / 100, fee);
  const result =
    choice === "now"
      ? (high ? 100 : 20) / 1.1 - 50
      : high
        ? 50 / 1.1 - fee
        : -fee;
  return (
    <>
      <p>
        Build now for 50, receiving 100 or 20 next period. Alternatively, pay a
        waiting fee now; next period observe demand and build only when net
        immediate benefit is positive. Discount rate is 10%.
      </p>
      <Slider
        id="high-demand"
        label="High-demand probability"
        value={p}
        min={10}
        max={90}
        step={10}
        suffix="%"
        disabled={reveal}
        onChange={setP}
      />
      <Slider
        id="waiting-fee"
        label="Fee to preserve the option"
        value={fee}
        min={0}
        max={20}
        disabled={reveal}
        onChange={setFee}
      />
      <Stats
        items={[
          ["Expected NPV: build now", fmt(r.now)],
          ["Expected NPV: wait", fmt(r.wait)],
        ]}
      />
      <Actions>
        <button
          disabled={reveal}
          aria-pressed={choice === "now"}
          onClick={() => setChoice("now")}
        >
          Build now
        </button>
        <button
          disabled={reveal}
          aria-pressed={choice === "wait"}
          onClick={() => setChoice("wait")}
        >
          Pay to wait
        </button>
        <button disabled={!choice || reveal} onClick={() => setReveal(true)}>
          Commit & reveal demand
        </button>
      </Actions>
      {reveal && (
        <Stats
          items={[
            ["Demand", high ? "High" : "Low"],
            ["Realised discounted payoff", fmt(result)],
            [
              "Action after waiting",
              choice === "wait"
                ? high
                  ? "Build at time 1"
                  : "Decline project"
                : "Already built",
            ],
          ]}
        />
      )}
      <p>
        The waiting branch assumes construction and its payoff can both occur
        instantly at time 1 after information arrives. Values are invented, no
        competitor takes the opportunity, and this two-period example is not a
        company valuation or investment recommendation.
      </p>
    </>
  );
}
export function Jensen() {
  const [spread, setSpread] = useState(3),
    [curve, setCurve] = useState("square"),
    f = (x: number) =>
      curve === "square" ? x * x : curve === "root" ? Math.sqrt(x) : x,
    mean = f(5),
    average = (f(5 - spread) + f(5 + spread)) / 2;
  return (
    <>
      <p>
        Two equally likely inputs lie either side of five. Their mean stays five
        while you change their spread. Does applying a function before averaging
        change the result?
      </p>
      <Slider
        id="spread"
        label="Distance of each input from five"
        value={spread}
        min={0}
        max={4}
        step={0.5}
        onChange={setSpread}
      />
      <Actions>
        <button
          aria-pressed={curve === "square"}
          onClick={() => setCurve("square")}
        >
          Convex: x²
        </button>
        <button
          aria-pressed={curve === "root"}
          onClick={() => setCurve("root")}
        >
          Concave: √x
        </button>
        <button
          aria-pressed={curve === "linear"}
          onClick={() => setCurve("linear")}
        >
          Linear: x
        </button>
      </Actions>
      <Ledger
        label="Transform then average, or average then transform"
        headers={["Input", "Function value"]}
        rows={[
          [5 - spread, fmt(f(5 - spread))],
          [5 + spread, fmt(f(5 + spread))],
        ]}
      />
      <Stats
        items={[
          ["Function of mean input", fmt(mean)],
          ["Mean of function values", fmt(average)],
          ["Difference", fmt(average - mean)],
        ]}
      />
      <p>
        Jensen’s inequality compares these quantities for convex or concave
        functions. The direction follows curvature and the input distribution;
        an average input alone need not determine an average outcome.
      </p>
    </>
  );
}
export function Annealing({ seed }: { seed: number }) {
  const [x, setX] = useState(4),
    [temp, setTemp] = useState(0),
    [cool, setCool] = useState(true),
    [steps, setSteps] = useState(0),
    [best, setBest] = useState(4),
    [message, setMessage] = useState("");
  const move = (delta: number) => {
    const target = Math.max(0, Math.min(20, x + delta)),
      change = energy(target) - energy(x),
      accept = annealAccept(change, temp, rng(seed + steps * 131)());
    if (accept) {
      setX(target);
      setBest((b) => (energy(target) < energy(b) ? target : b));
    }
    setSteps((v) => v + 1);
    if (cool) setTemp((t) => t * 0.95);
    setMessage(
      `${accept ? "Accepted" : "Rejected"}: ${x} → ${target}; energy change ${fmt(change)}.`,
    );
  };
  return (
    <>
      <Slider
        id="temperature"
        label="Temperature for uphill proposals"
        value={Number(temp.toFixed(2))}
        min={0}
        max={20}
        step={0.01}
        onChange={setTemp}
      />
      <Actions>
        <button aria-pressed={cool} onClick={() => setCool((v) => !v)}>
          Cooling: {cool ? "on" : "off"}
        </button>
        <button disabled={x === 0} onClick={() => move(-1)}>
          Propose left step
        </button>
        <button disabled={x === 20} onClick={() => move(1)}>
          Propose right step
        </button>
      </Actions>
      <Chart
        label="Energy landscape; seek lower values"
        marker={{ index: x, value: energy(x), label: "Current position" }}
        min={0}
        max={40}
        xLabel="Position 0 → 20"
        lines={[
          {
            name: "Energy",
            values: Array.from({ length: 21 }, (_, i) => energy(i)),
          },
        ]}
      />
      <Stats
        items={[
          ["Current position", String(x)],
          ["Current energy", fmt(energy(x))],
          ["Best position found", String(best)],
          ["Best energy", fmt(energy(best))],
          ["Proposals", String(steps)],
        ]}
      />
      <p role="status">
        {message ||
          "Start at a local minimum, position four. At zero temperature an uphill proposal is always rejected."}
      </p>
      <p>
        The global minimum is at sixteen. Uphill moves are accepted with
        probability exp(−energy increase / temperature), and optional cooling
        multiplies temperature by 0.95 after each proposal. This manual finite
        run has no guarantee of reaching the global minimum.
      </p>
    </>
  );
}
