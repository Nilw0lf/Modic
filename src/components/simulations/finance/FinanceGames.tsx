"use client";
import { useState } from "react";
import {
  competenceCards,
  financing,
  marginState,
  skillBriefs,
  skillCards,
  skillFit,
  studio,
} from "@/lib/simulations/finance";
import { seededRandom } from "@/lib/simulations/random";
import { Slider, Stats } from "../foundations/Shared";
import { fmt } from "./FinanceModels";

const marginShocks = [-0.1, 0.15, -0.25, 0.1];
export function Margin() {
  const [leverage, setLeverage] = useState(2),
    [started, setStarted] = useState(false),
    [account, setAccount] = useState({
      assets: 200,
      debt: 100,
      round: 0,
      deposits: 0,
    }),
    [message, setMessage] = useState("Choose leverage, then open the account.");
  const r = marginState(account.assets, account.debt),
    insolvent = r.equity <= 0;
  function next() {
    const shock = marginShocks[account.round];
    const assets = account.assets * (1 + shock);
    setAccount((a) => ({ ...a, assets, round: a.round + 1 }));
    setMessage(
      `Round ${account.round + 1}: asset move ${fmt(shock * 100)}%. ${marginState(assets, account.debt).call ? "Maintenance breached; repair the account before continuing." : "Maintenance met; inspect equity before advancing."}`,
    );
  }
  return (
    <>
      <Slider
        id="margin-leverage"
        label="Initial gross leverage"
        min={1}
        max={4}
        step={0.5}
        suffix="×"
        value={leverage}
        onChange={(v) => {
          setLeverage(v);
          setStarted(false);
          setAccount({
            assets: 100 * v,
            debt: 100 * (v - 1),
            round: 0,
            deposits: 0,
          });
          setMessage("Changed setup. Open a fresh account to play.");
        }}
      />
      <div className="money-balance-sheet">
        <div>
          <span>Assets</span>
          <strong>{fmt(account.assets)}</strong>
        </div>
        <div>
          <span>Debt</span>
          <strong>{fmt(account.debt)}</strong>
        </div>
        <div>
          <span>Equity</span>
          <strong className={r.equity < 0 ? "money-loss" : ""}>
            {fmt(r.equity)}
          </strong>
        </div>
      </div>
      <div className="money-maintenance">
        <span>Maintenance floor: 30% equity / assets</span>
        <meter
          min={0}
          max={1}
          low={0.3}
          optimum={1}
          value={Math.max(0, r.ratio)}
          aria-label="Equity fraction"
        />
        <strong>{fmt(r.ratio * 100)}%</strong>
      </div>
      <div className="play-actions">
        {!started ? (
          <button
            onClick={() => {
              setStarted(true);
              setMessage(
                r.call
                  ? "The initial leverage already breaches the teaching maintenance rule. Repair it before advancing."
                  : "Account opened. Advance to reveal the next move.",
              );
            }}
          >
            Open margin account
          </button>
        ) : (
          <button
            disabled={r.call || account.round === 4 || insolvent}
            onClick={next}
          >
            Reveal market move
          </button>
        )}
        <button
          disabled={!started || !r.call || insolvent}
          onClick={() => {
            const deposit = r.deposit + 1e-6;
            setAccount((a) => ({
              ...a,
              assets: a.assets + deposit,
              deposits: a.deposits + deposit,
            }));
            setMessage(
              `Deposited ${fmt(deposit)} outside tokens. The deposit repairs the ratio; it is additional capital, not profit.`,
            );
          }}
        >
          Deposit required cash
        </button>
        <button
          disabled={!started || !r.call || insolvent}
          onClick={() => {
            const sale = r.sale + 1e-6;
            setAccount((a) => ({
              ...a,
              assets: a.assets - sale,
              debt: a.debt - sale,
            }));
            setMessage(
              `Sold ${fmt(sale)} of assets and repaid the same debt. Equity is unchanged, but the exposure is smaller.`,
            );
          }}
        >
          Sell assets to repay debt
        </button>
      </div>
      <Stats
        items={[
          ["Outside cash deposited", fmt(account.deposits)],
          [
            "Net gain after contributions",
            fmt(r.equity - 100 - account.deposits),
          ],
          ["Cash needed for maintenance", fmt(r.deposit)],
        ]}
      />
      <p role="status" className="play-feedback">
        {insolvent
          ? "Equity is nonpositive. The game stops; outstanding debt is not erased."
          : message}
      </p>
      <p className="frontier-note">
        Four teaching moves: −10%, +15%, −25%, +10%. No interest charged. Real
        maintenance policies and forced sales differ.
      </p>
    </>
  );
}

export function Disposition() {
  const [choices, setChoices] = useState<string[]>([]),
    index = choices.length,
    finished = index === 4,
    group = Math.floor(index / 2),
    better = group === 0 ? "A" : "B",
    bases = index % 2 === 0 ? [60, 140] : [140, 60];
  function choose(sold: string) {
    setChoices((c) => [...c, sold]);
  }
  return (
    <>
      <p className="simple-prompt">
        Sell one asset; hold the other. Both currently sell for 100. Future
        values are stipulated for this puzzle.
      </p>
      {!finished ? (
        <>
          <div className="money-offers">
            {["A", "B"].map((name, i) => (
              <div key={name}>
                <span>Asset {name}</span>
                <strong>Current: 100</strong>
                <p>
                  Purchase basis: {bases[i]} ·{" "}
                  {bases[i] < 100 ? "Unrealised gain" : "Unrealised loss"}{" "}
                  {Math.abs(100 - bases[i])}
                </p>
                <p>
                  Next-period value: <b>{name === better ? 120 : 80}</b>
                </p>
                <button onClick={() => choose(name)}>Sell asset {name}</button>
              </div>
            ))}
          </div>
          <p>
            Card {index + 1} of 4 · The sale returns 100 cash, plus the
            next-period value of the asset you keep.
          </p>
        </>
      ) : (
        <p role="status" className="play-feedback">
          Four decisions recorded. In cards 1/2, keeping A produces 220 total;
          in cards 3/4, keeping B produces 220. Changed purchase labels do not
          change those forward payoffs.
        </p>
      )}
      <ol className="money-ledger">
        {choices.map((sold, i) => {
          const best = i < 2 ? "A" : "B",
            basis = (i % 2 === 0 ? [60, 140] : [140, 60])[sold === "A" ? 0 : 1];
          return (
            <li key={i}>
              Card {i + 1}: sold {sold} ({basis < 100 ? "gain" : "loss"} label),
              kept {sold === "A" ? "B" : "A"}; final cash plus holding{" "}
              {sold === best ? 180 : 220}.
            </li>
          );
        })}
      </ol>
      <p className="frontier-note">
        Compare paired decisions, not a personality score. A real tax bill or
        liquidity requirement could justify selling an otherwise attractive
        asset.
      </p>
    </>
  );
}
export function HouseMoney({ seed }: { seed: number }) {
  const [choices, setChoices] = useState<string[]>([]),
    done = choices.length === 2,
    draw = seededRandom(seed)() < 0.5 ? 90 : 130;
  return (
    <>
      <div className="money-frame">
        <span>Current wealth in both cases</span>
        <strong>100 tokens</strong>
        <p>
          {choices.length === 0
            ? "Frame 1: these 100 tokens came from your savings."
            : choices.length === 1
              ? "Frame 2: you began with 80 and just gained 20. You now own the same 100."
              : "Both origin frames now have a recorded choice."}
        </p>
      </div>
      <div className="money-offers">
        <div>
          <h3>Sure outcome</h3>
          <strong>110</strong>
          <p>No random draw; final wealth 110.</p>
          <button
            disabled={done}
            onClick={() => setChoices((c) => [...c, "Sure"])}
          >
            Choose sure 110
          </button>
        </div>
        <div>
          <h3>Risky outcome</h3>
          <strong>90 or 130</strong>
          <p>50% each · Expected final wealth 110.</p>
          <button
            disabled={done}
            onClick={() => setChoices((c) => [...c, "Risky"])}
          >
            Choose the 50/50 draw
          </button>
        </div>
      </div>
      {done && (
        <p role="status" className="play-feedback">
          Savings frame: {choices[0]}; windfall frame: {choices[1]}.{" "}
          {choices[0] === choices[1]
            ? "Your choice stayed the same."
            : "Your choice changed with the origin story."}{" "}
          Shared risky draw: {draw}. Realised wealth:{" "}
          {choices.map((c) => (c === "Sure" ? 110 : draw)).join(" / ")}. Neither
          preference is a diagnosis.
        </p>
      )}
      <p className="frontier-note">
        The shared draw makes both frames comparable. Read both payoffs before
        choosing; no money is actually won or lost.
      </p>
    </>
  );
}
export function Treasury() {
  const [s, setS] = useState({
      debt: 200,
      reserve: 40,
      income: 30,
      rate: 5,
      quarter: 0,
      projects: 0,
      borrowed: 0,
    }),
    [history, setHistory] = useState<string[]>([]),
    r = financing(s.income, s.debt, s.rate, Math.min(20, s.debt));
  function settle() {
    const principal = Math.min(20, s.debt),
      interest = (s.debt * s.rate) / 100,
      available = s.reserve + s.income,
      borrow = Math.max(0, principal + interest - available),
      quarter = s.quarter + 1;
    setS({
      ...s,
      debt: s.debt - principal + borrow,
      reserve: Math.max(0, available - principal - interest),
      quarter,
      borrowed: s.borrowed + borrow,
      rate: quarter === 3 ? 12 : s.rate,
      income: quarter === 3 ? Math.max(0, s.income - 15) : s.income,
    });
    setHistory((h) => [
      ...h,
      `Quarter ${quarter}: paid ${fmt(interest)} interest and ${fmt(principal)} principal; borrowed ${fmt(borrow)} to cover the gap.${quarter === 3 ? " Stress arrives: interest becomes 12% and income falls by 15." : ""}`,
    ]);
  }
  return (
    <>
      <div className="money-regime">
        <span>Operating-income financing classification</span>
        <strong>{r.regime}</strong>
        <p>
          Income {fmt(s.income)} · Interest {fmt(r.interest)} · Principal due{" "}
          {fmt(Math.min(20, s.debt))}
        </p>
      </div>
      <div className="money-balance-sheet">
        <div>
          <span>Debt</span>
          <strong>{fmt(s.debt)}</strong>
        </div>
        <div>
          <span>Cash reserve</span>
          <strong>{fmt(s.reserve)}</strong>
        </div>
        <div>
          <span>Quarter</span>
          <strong>{s.quarter}/6</strong>
        </div>
      </div>
      <div className="play-actions">
        <button disabled={s.quarter === 6} onClick={settle}>
          Settle next quarter
        </button>
        <button
          disabled={s.projects === 3 || s.quarter === 6}
          onClick={() => {
            setS({
              ...s,
              debt: s.debt + 100,
              income: s.income + 5,
              projects: s.projects + 1,
            });
            setHistory((h) => [
              ...h,
              "Added a project: +100 debt, +5 income; loan proceeds purchased the project rather than entering the cash reserve.",
            ]);
          }}
        >
          Add debt-funded project
        </button>
      </div>
      <Stats
        items={[
          ["Quarterly interest rate", s.rate + "%"],
          ["New borrowing for debt service", fmt(s.borrowed)],
          ["Flow funding gap", fmt(r.gap)],
        ]}
      />
      <p role="status" className="play-feedback">
        {history.at(-1) ??
          "Settle six quarters. Before quarter four, a disclosed stress raises interest and reduces operating income. See whether projects improve or weaken coverage."}
      </p>
      <details>
        <summary>Treasury transaction history</summary>
        <ol className="money-ledger">
          {history.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ol>
      </details>
      <p className="frontier-note">
        Regimes describe income versus debt service, not a moral label. Reserves
        can mask a flow gap temporarily. Refinancing is unlimited in this
        teaching game.
      </p>
    </>
  );
}
export function Leverage() {
  const [hours, setHours] = useState(8),
    [users, setUsers] = useState(20),
    [launches, setLaunches] = useState(0),
    r = studio(hours, users),
    total =
      launches * r.service +
      launches * (r.revenue - r.delivery) -
      (launches ? r.buildCost : 0);
  return (
    <>
      <div className="money-controls">
        <Slider
          id="studio-hours"
          label="Build hours out of a 12-hour first week"
          min={0}
          max={12}
          value={hours}
          onChange={(v) => {
            setHours(v);
            setLaunches(0);
          }}
        />
        <Slider
          id="studio-users"
          label="Supplied audience per launch"
          min={0}
          max={200}
          step={10}
          value={users}
          onChange={(v) => {
            setUsers(v);
            setLaunches(0);
          }}
        />
      </div>
      <div className="money-studio">
        <div>
          <span>Service desk</span>
          <strong>{12 - hours} hours</strong>
          <p>Earns {fmt(r.service)} each launch week</p>
        </div>
        <div>
          <span>Reusable product</span>
          <strong>{fmt(r.quality * 100)}% quality</strong>
          <p>
            Build cost {fmt(r.buildCost)} once · Revenue {fmt(r.revenue)} per
            launch · Delivery {fmt(r.delivery)}
          </p>
        </div>
      </div>
      <div className="play-actions">
        <button
          disabled={launches === 6}
          onClick={() => setLaunches((n) => n + 1)}
        >
          {launches ? "Distribute product again" : "Build and launch once"}
        </button>
        <button
          onClick={() => {
            setUsers(10);
            setLaunches(0);
          }}
        >
          Test a tiny audience
        </button>
        <button
          onClick={() => {
            setUsers(200);
            setLaunches(0);
          }}
        >
          Test a larger audience
        </button>
      </div>
      <Stats
        items={[
          ["Launches completed", String(launches)],
          ["Combined net income", fmt(total)],
          ["All-service comparison", fmt(launches * 120)],
        ]}
      />
      <p role="status" className="play-feedback">
        {launches
          ? `${launches} launches earned ${fmt(total)} combined net tokens after building and delivery. Each repeat reuses the original product; service still requires ${12 - hours} hours. For comparison, an all-service week earns 120.`
          : "Build choices have a cost. A small audience may not pay it back; repeat distribution can change that tradeoff."}
      </p>
      <p className="frontier-note">
        Audience size is stipulated. Repeat weeks retain the same service
        allocation; maintenance and new build time are omitted. These are
        authored numbers, not Naval&apos;s income formula.
      </p>
    </>
  );
}
export function SpecificKnowledge() {
  const [selected, setSelected] = useState<number[]>([]),
    [brief, setBrief] = useState(0),
    [tested, setTested] = useState(false),
    fit = skillFit(selected, brief);
  return (
    <>
      <div className="money-brief">
        <span>Customer brief</span>
        <h3>{skillBriefs[brief].name}</h3>
        <p>
          Needs:{" "}
          {skillBriefs[brief].needed.map((n) => skillCards[n]).join(" + ")}
        </p>
      </div>
      <div className="money-skill-cards">
        {skillCards.map((skill, i) => (
          <button
            key={skill}
            aria-pressed={selected.includes(i)}
            disabled={!selected.includes(i) && selected.length === 3}
            onClick={() => {
              setSelected((s) =>
                s.includes(i) ? s.filter((n) => n !== i) : [...s, i],
              );
              setTested(false);
            }}
          >
            {skill}
            <small>
              {selected.includes(i) ? "Selected" : "Add to your mix"}
            </small>
          </button>
        ))}
      </div>
      <div className="play-actions">
        <button
          disabled={selected.length !== 3}
          onClick={() => setTested(true)}
        >
          Test my skill mix
        </button>
        <button
          onClick={() => {
            setBrief((b) => (b + 1) % 3);
            setTested(false);
          }}
        >
          Switch customer brief
        </button>
      </div>
      <p role="status" className="play-feedback">
        {tested
          ? `Your combination covers ${fit.covered}/3 needs and earns ${fit.score} illustrative fit points. ${fit.covered === 3 ? "The complementary mix earns a 20-point bonus." : "Identify the missing problem-specific skill before adding more unrelated knowledge."}`
          : `Choose exactly three skills (${selected.length}/3 selected). The brief is visible; this is a composition puzzle, not a hidden talent test.`}
      </p>
      <p className="frontier-note">
        The points are an invented checklist. Use the puzzle to consider real
        evidence of usefulness: a customer conversation, a prototype, or a
        completed project.
      </p>
    </>
  );
}
export function Competence({ seed }: { seed: number }) {
  const cards = competenceCards(seed),
    [decisions, setDecisions] = useState<boolean[]>([]),
    current = cards[decisions.length],
    gain = decisions.reduce(
      (sum, buy, i) => sum + (buy ? cards[i].value - cards[i].ask : 0),
      0,
    );
  return (
    <>
      {current ? (
        <>
          <div className="money-deal">
            <span>
              Deal {decisions.length + 1}/6 ·{" "}
              {current.familiar ? "Familiar" : "Unfamiliar"} model
            </span>
            <h3>
              Value range {current.low}–{current.high}
            </h3>
            <p>
              Uniform integer outcomes in this range. Your ask:{" "}
              <strong>{current.ask}</strong>
            </p>
            <p>
              Expected value: {(current.low + current.high) / 2} · Worst-case
              net: {current.low - current.ask}
            </p>
          </div>
          <div className="play-actions">
            <button onClick={() => setDecisions((d) => [...d, true])}>
              Buy one unit
            </button>
            <button onClick={() => setDecisions((d) => [...d, false])}>
              Pass this offer
            </button>
          </div>
        </>
      ) : (
        <p>
          All six offers reviewed. Replay with New round to inspect a new seeded
          deal sequence.
        </p>
      )}
      <Stats
        items={[
          ["Decisions made", String(decisions.length)],
          ["Realised net gain", fmt(gain)],
          ["Offers purchased", String(decisions.filter(Boolean).length)],
        ]}
      />
      <p role="status" className="play-feedback">
        {decisions.length
          ? `Last offer realised value ${cards[decisions.length - 1].value}; you ${decisions.at(-1) ? "bought" : "passed"}. Total realised net gain ${fmt(gain)}. The range described uncertainty; it did not guarantee a profitable purchase.`
          : "A familiar model has a narrower stated range, not an automatic promise of a gain. Passing preserves your option to make another decision."}
      </p>
      <ol className="money-ledger">
        {decisions.map((buy, i) => (
          <li key={i}>
            Offer {i + 1}: {buy ? "bought" : "passed"}, ask {cards[i].ask},
            realised value {cards[i].value}, net{" "}
            {buy ? cards[i].value - cards[i].ask : 0}.
          </li>
        ))}
      </ol>
    </>
  );
}
