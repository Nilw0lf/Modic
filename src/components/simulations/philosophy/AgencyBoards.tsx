"use client";
import { useState } from "react";
import {
  capabilityAccess,
  capabilityProjects,
  controlActions,
  controlOutcome,
  distribution,
  lotteryRole,
  promiseWorld,
  socialPolicies,
  utilityAllocation,
} from "@/lib/simulations/philosophy";
import { Slider, Stats } from "../foundations/Shared";

export function ControlBoard() {
  const [allocation, setAllocation] = useState([0, 0, 0, 0]),
    [committed, setCommitted] = useState(false),
    [weather, setWeather] = useState(0),
    sum = allocation.reduce((s, n) => s + n, 0),
    r = controlOutcome(allocation, [-4, 0, 4][weather]);
  return (
    <>
      <p className="philo-mission">
        Prepare a ferry crossing · {6 - sum} effort tokens remaining
      </p>
      <div className="philo-action-grid">
        {controlActions.map((a, i) => (
          <div key={a.name}>
            <span>{a.kind === "action" ? "Your action" : "External wish"}</span>
            <h3>{a.name}</h3>
            <strong>{allocation[i]}</strong>
            <div className="play-actions">
              <button
                aria-label={`Remove effort: ${a.name}`}
                disabled={committed || allocation[i] === 0}
                onClick={() =>
                  setAllocation((v) => v.map((n, j) => (i === j ? n - 1 : n)))
                }
              >
                −
              </button>
              <button
                aria-label={`Add effort: ${a.name}`}
                disabled={committed || sum === 6}
                onClick={() =>
                  setAllocation((v) => v.map((n, j) => (i === j ? n + 1 : n)))
                }
              >
                +
              </button>
            </div>
            <small>Preparation contribution: {a.effect} per token</small>
          </div>
        ))}
      </div>
      <div className="play-actions">
        <button
          disabled={sum !== 6 || committed}
          onClick={() => setCommitted(true)}
        >
          Commit my preparation
        </button>
        <button
          disabled={!committed}
          onClick={() => setWeather((w) => (w + 1) % 3)}
        >
          Replay under different weather
        </button>
      </div>
      <Stats
        items={[
          ["Preparation you chose", String(r.preparation)],
          [
            "Weather contribution",
            committed ? String([-4, 0, 4][weather]) : "Not revealed",
          ],
          [
            "Operational result",
            committed ? String(r.outcome) : "Awaiting commitment",
          ],
        ]}
      />
      <p role="status" className="play-feedback">
        {committed
          ? `Preparation ${r.preparation}; weather ${[-4, 0, 4][weather]}; result ${r.outcome}. Weather changes the result, not the quality of the allocation you committed.`
          : "Spend exactly six tokens. Compare actions you can take with outcomes you can only wish for."}
      </p>
      <p className="philo-note">
        The operational units are invented. Better preparation is not a score
        for virtue, wellbeing, or a real crossing&apos;s safety.
      </p>
    </>
  );
}
export function VeilBoard({ seed }: { seed: number }) {
  const [choice, setChoice] = useState<number | null>(null),
    [revealed, setRevealed] = useState(false),
    role = lotteryRole(seed);
  return (
    <>
      <div className="philo-veil">
        <span>{revealed ? "Role revealed" : "Behind the veil"}</span>
        <strong>
          {revealed ? `Position ${role + 1}` : "Your position is unknown"}
        </strong>
        <p>
          Compare rules before a stipulated equal-chance role draw. This lottery
          is a teaching device, not Rawls&apos;s full original position.
        </p>
      </div>
      <div className="philo-policy-grid">
        {socialPolicies.map((p, i) => {
          const s = distribution(p.values);
          return (
            <button
              key={p.name}
              className="philo-policy"
              aria-pressed={choice === i}
              disabled={revealed}
              onClick={() => setChoice(i)}
            >
              <h3>{p.name}</h3>
              <div className="philo-share-bars">
                {p.values.map((v, j) => (
                  <span key={j} style={{ height: 18 + v * 3 }}>
                    {v}
                  </span>
                ))}
              </div>
              <small>
                Floor {s.minimum} · Total {s.total} · Mean {s.mean}
              </small>
            </button>
          );
        })}
      </div>
      <button
        disabled={choice === null || revealed}
        onClick={() => setRevealed(true)}
      >
        Commit policy and lift the veil
      </button>
      <p role="status" className="play-feedback">
        {revealed && choice !== null
          ? `You occupy position ${role + 1} and receive ${socialPolicies[choice].values[role]} under ${socialPolicies[choice].name}. Would your justification still address someone in the least-advantaged position?`
          : "Select a policy. Your eventual receipt is not the same question as whether the rule is justifiable to everyone."}
      </p>
    </>
  );
}
export function PromiseBoard() {
  const [falseCount, setFalseCount] = useState(1),
    r = promiseWorld(falseCount);
  return (
    <>
      <p className="philo-mission">
        Town maxim: promise repayment even when you intend not to repay.
      </p>
      <Slider
        id="promise-count"
        label="Borrowers using the false-promise maxim"
        min={0}
        max={10}
        value={falseCount}
        onChange={setFalseCount}
      />
      <div className="philo-citizens">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className={i < falseCount ? "exception" : ""}>
            <span aria-hidden="true">◉</span>
            <small>
              {i < falseCount ? "False promise" : "Reliable promise"}
            </small>
          </div>
        ))}
      </div>
      <div className="play-actions">
        <button onClick={() => setFalseCount(1)}>One exception</button>
        <button onClick={() => setFalseCount(10)}>Everyone adopts it</button>
      </div>
      <Stats
        items={[
          ["Reliable promises", String(r.reliable)],
          ["Loans under the toy rule", String(r.loans)],
          ["Reliability floor", "6 of 10"],
        ]}
      />
      <p role="status" className="play-feedback">
        {r.loans
          ? "The practice still operates because enough others remain reliable. Does the exception depend on that background?"
          : "The stipulated lender no longer extends loans. The desired borrowing action relies on a practice the generalised maxim undermines."}
      </p>
      <p className="philo-note">
        Kant&apos;s universalisation is not simply a rule to maximise these loan
        counts. The threshold illustrates dependence on a practice; it does not
        prove a moral theorem.
      </p>
    </>
  );
}
export function UtilityBoard() {
  const [a, setA] = useState(2),
    [table, setTable] = useState(false),
    r = utilityAllocation(a);
  return (
    <>
      <p className="philo-mission">
        Allocate five aid tokens · A gets {a} · B gets {5 - a}
      </p>
      <Slider
        id="utility-a"
        label="Tokens allocated to group A"
        min={0}
        max={5}
        value={a}
        onChange={setA}
      />
      <div className="philo-benefits">
        <div>
          <h3>Group A</h3>
          <strong>{r.a}</strong>
          <span>Illustrative benefit units</span>
        </div>
        <div>
          <h3>Group B</h3>
          <strong>{r.b}</strong>
          <span>Illustrative benefit units</span>
        </div>
      </div>
      <Stats
        items={[
          ["Total benefit", String(r.total)],
          ["Smaller group benefit", String(r.minimum)],
          ["Budget used", "5 / 5"],
        ]}
      />
      <button aria-expanded={table} onClick={() => setTable((v) => !v)}>
        Compare every split
      </button>
      {table && (
        <div className="philo-table-wrap" tabIndex={0}>
          <table className="simple-history">
            <caption>
              Invented comparable benefits; not measured wellbeing
            </caption>
            <thead>
              <tr>
                <th>Tokens A/B</th>
                <th>Benefit A/B</th>
                <th>Total</th>
                <th>Minimum</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }, (_, i) => {
                const x = utilityAllocation(i);
                return (
                  <tr key={i}>
                    <th>
                      {i}/{5 - i}
                    </th>
                    <td>
                      {x.a}/{x.b}
                    </td>
                    <td>{x.total}</td>
                    <td>{x.minimum}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <p role="status" className="play-feedback">
        This split produces total {r.total} and minimum {r.minimum}. Moving a
        token can change both; selecting a criterion is a separate ethical
        choice.
      </p>
    </>
  );
}
export function CapabilityBoard() {
  const [projects, setProjects] = useState<number[]>([]),
    r = capabilityAccess(projects);
  return (
    <>
      <p className="philo-mission">
        Public access budget · {6 - r.spent}/6 tokens remaining
      </p>
      <div className="philo-neighbourhoods">
        <div>
          <h3>Central</h3>
          <p>Personal resources: 4 tokens</p>
          <ul>
            {capabilityProjects.map((p) => (
              <li key={p.name}>✓ {p.opens} available</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Remote</h3>
          <p>Personal resources: 4 tokens</p>
          <ul>
            {capabilityProjects.map((p, i) => (
              <li key={p.name}>
                {projects.includes(i) ? "✓" : "○"} {p.opens}{" "}
                {projects.includes(i) ? "available" : "blocked by access"}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="philo-projects">
        {capabilityProjects.map((p, i) => (
          <button
            key={p.name}
            aria-pressed={projects.includes(i)}
            onClick={() =>
              setProjects((v) =>
                v.includes(i) ? v.filter((n) => n !== i) : [...v, i],
              )
            }
          >
            <strong>
              {projects.includes(i) ? "Funded: " : "Fund "}
              {p.name}
            </strong>
            <small>Cost 2 · Opens {p.opens}</small>
          </button>
        ))}
      </div>
      <Stats
        items={[
          ["Central available options", `${r.central}/3`],
          ["Remote available options", `${r.remote}/3`],
          ["Public resources spent", String(r.spent)],
        ]}
      />
      <p role="status" className="play-feedback">
        Equal personal tokens coexist with {r.central} versus {r.remote}{" "}
        available options. Opening an opportunity does not force anyone to use
        it.
      </p>
      <p className="philo-note">
        Undo a project to compare the counterfactual. The map measures only
        these three stipulated access conditions, not a neighbourhood&apos;s
        wellbeing.
      </p>
    </>
  );
}
