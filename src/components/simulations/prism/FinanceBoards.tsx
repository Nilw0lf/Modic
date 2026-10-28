"use client";
import type { ComponentType } from "react";
import { useState } from "react";
import {
  Actions,
  Slider,
  Stats,
  Choices,
  Chart,
  Ledger,
  fixed,
} from "./Shared";
import { drawdown } from "@/lib/simulations/prism";
export function PutCall() {
  const [terminal, setTerminal] = useState(100),
    [quotes, setQuotes] = useState("Matched quotes"),
    pv = 100 / 1.05,
    put = 8 + (quotes === "Put too expensive" ? 3 : 0),
    call = 8 + 100 - pv + (quotes === "Call too expensive" ? 3 : 0),
    a = call + pv,
    b = put + 100,
    payA = Math.max(terminal - 100, 0) + 100,
    payB = Math.max(100 - terminal, 0) + terminal;
  return (
    <>
      <p>
        Compare a European call plus a bond paying strike 100 with a European
        put plus one share. Initial stock is 100, maturity one year and
        risk-free annual rate 5%; dividends and frictions are absent.
      </p>
      <Choices
        label="Teaching market quotes"
        options={["Matched quotes", "Call too expensive", "Put too expensive"]}
        value={quotes}
        onChange={setQuotes}
      />
      <Slider
        label="Terminal stock price"
        min={0}
        max={200}
        step={5}
        value={terminal}
        onChange={setTerminal}
      />
      <Ledger
        label="Replicating portfolios"
        headers={["Portfolio", "Initial cost", "Terminal payoff"]}
        rows={[
          ["Call + strike bond", fixed(a), fixed(payA)],
          ["Put + share", fixed(b), fixed(payB)],
        ]}
      />
      <Stats
        items={[
          ["Initial cost difference A − B", fixed(a - b)],
          ["Terminal payoff difference A − B", fixed(payA - payB)],
          [
            "Put–call parity",
            Math.abs(a - b) < 1e-8
              ? "Satisfied"
              : "Violated under ideal assumptions",
          ],
        ]}
      />
      <p>
        Changing the terminal stock price preserves equal payoffs. A cost
        mismatch suggests an ideal buy-cheaper/sell-dearer replication argument,
        not an executable trade after borrowing constraints, spreads or option
        exercise differences.
      </p>
    </>
  );
}
export function InterestParity() {
  const [basis, setBasis] = useState(0),
    [spot, setSpot] = useState(2),
    [hedged, setHedged] = useState(true),
    fair = (2 * 1.05) / 1.02,
    forward = fair * (1 + basis / 100),
    foreign = 50 * 1.02 * (hedged ? forward : spot);
  return (
    <>
      <p>
        Invest 100 domestic units for one year at 5%, or convert at spot 2
        domestic per foreign unit and invest abroad at 2%. A forward hedge fixes
        the eventual conversion rate.
      </p>
      <Slider
        label="Forward deviation from ideal parity (%)"
        min={-5}
        max={5}
        step={0.5}
        value={basis}
        onChange={setBasis}
      />
      <Slider
        label="Realised future spot (domestic / foreign)"
        min={1.5}
        max={2.5}
        step={0.05}
        value={spot}
        onChange={setSpot}
      />
      <Actions>
        <button aria-pressed={hedged} onClick={() => setHedged(!hedged)}>
          Forward hedge: {hedged ? "On" : "Off"}
        </button>
      </Actions>
      <Stats
        items={[
          ["Ideal parity forward rate", fixed(fair, 4)],
          ["Selected forward rate", fixed(forward, 4)],
          ["Domestic investment terminal value", "105.00"],
          ["Foreign route terminal domestic value", fixed(foreign)],
        ]}
      />
      <p>
        Covered interest parity equates the hedged routes in frictionless
        markets. Future spot affects only the unhedged route. Actual
        cross-currency bases can reflect funding, balance-sheet and transaction
        constraints; the display is not a currency forecast.
      </p>
    </>
  );
}
export function Deductible() {
  const [d, setD] = useState(20),
    [load, setLoad] = useState(0),
    premium = 0.25 * (40 - d) * (1 + load / 100),
    good = 100 - premium,
    bad = good - d,
    ew = 0.75 * good + 0.25 * bad,
    ce = Math.exp(0.75 * Math.log(good) + 0.25 * Math.log(bad));
  return (
    <>
      <p>
        A fictional household starts with wealth 100 and has a 25% chance of a
        loss of 40. Choose a deductible; insurance covers loss above it. The
        premium is expected claim cost plus a selected loading.
      </p>
      <Slider
        label="Deductible"
        min={0}
        max={40}
        step={5}
        value={d}
        onChange={setD}
      />
      <Slider
        label="Premium loading (%)"
        min={0}
        max={50}
        step={5}
        value={load}
        onChange={setLoad}
      />
      <Ledger
        label="Two-state wealth after premium"
        headers={["State", "Probability", "Remaining wealth"]}
        rows={[
          ["No loss", 0.75, fixed(good)],
          ["Loss", 0.25, fixed(bad)],
        ]}
      />
      <Stats
        items={[
          ["Premium", fixed(premium)],
          ["Expected final wealth", fixed(ew)],
          ["Certainty equivalent under log utility", fixed(ce)],
        ]}
      />
      <p>
        At fair pricing, expected wealth remains 90 while a risk-averse
        log-utility benchmark values reduced variability. Log utility, fixed
        risk and enforceable claims are assumptions, not a description of your
        preferences or an insurance recommendation.
      </p>
    </>
  );
}
export function BankRun() {
  const [reserve, setReserve] = useState(10),
    [requests, setRequests] = useState(10),
    [settled, setSettled] = useState(false),
    investment = 50 - reserve,
    liquidated = Math.min(investment, Math.max(0, requests - reserve) / 0.5),
    available = reserve + 0.5 * liquidated,
    paid = Math.min(requests, available),
    cash = Math.max(0, reserve - paid),
    later = cash + 1.5 * (investment - liquidated),
    claims = 50 - paid;
  return (
    <>
      <p>
        Fifty deposits of one fund cash reserves and a long asset. Each invested
        unit pays 1.5 at maturity but only 0.5 if liquidated early. Choose total
        early withdrawal requests and inspect the balance sheet.
      </p>
      <Slider
        label="Cash reserves out of 50"
        min={0}
        max={50}
        step={5}
        value={reserve}
        onChange={(v) => {
          setReserve(v);
          setSettled(false);
        }}
      />
      <Slider
        label="Early withdrawal requests"
        min={0}
        max={50}
        value={requests}
        onChange={(v) => {
          setRequests(v);
          setSettled(false);
        }}
      />
      <Actions>
        <button onClick={() => setSettled(true)}>
          Settle withdrawals and maturity
        </button>
      </Actions>
      {settled && (
        <Stats
          items={[
            ["Early claims paid", fixed(paid)],
            ["Early claims unpaid", fixed(requests - paid)],
            ["Long assets liquidated at a discount", fixed(liquidated)],
            ["Assets remaining at maturity", fixed(later)],
            [
              "Maturity assets per remaining claim",
              claims ? fixed(later / claims) : "No remaining claims",
            ],
          ]}
        />
      )}
      <p>
        More early withdrawals can destroy value through liquidation. This
        balance-sheet scenario omits strategic beliefs, deposit insurance,
        central-bank support, credit losses and real institutions; it is not a
        bank solvency assessment.
      </p>
    </>
  );
}
export function Drawdown() {
  const [returns, setReturns] = useState<number[]>([]),
    p = drawdown(returns),
    current = p.wealth.at(-1)!,
    peak = Math.max(...p.wealth),
    decline = 1 - current / peak;
  return (
    <>
      <p>
        Build an eight-period return path. A drawdown measures loss from an
        earlier peak; a recovery gain uses the smaller current base.
      </p>
      <Actions>
        {[10, -10, 50, -50].map((r) => (
          <button
            key={r}
            disabled={returns.length === 8}
            onClick={() => setReturns([...returns, r])}
          >
            {r > 0 ? "Gain" : "Lose"} {Math.abs(r)}%
          </button>
        ))}
      </Actions>
      <Chart
        lines={[{ name: "Wealth index", values: p.wealth }]}
        min={0}
        max={Math.max(110, ...p.wealth)}
        label="Selected return path"
        xLabel="Periods"
      />
      <Stats
        items={[
          ["Current wealth", fixed(current)],
          ["Current drawdown", fixed(100 * decline, 1) + "%"],
          ["Maximum historical drawdown", fixed(100 * p.max, 1) + "%"],
          [
            "Gain needed to regain peak",
            fixed(100 * (peak / current - 1), 1) + "%",
          ],
        ]}
      />
      <p>
        A 50% loss needs a 100% gain to recover, not 50%. Maximum drawdown does
        not reset when wealth recovers. This authored path excludes income, fees
        and trading constraints and makes no return forecast.
      </p>
    </>
  );
}

export default function GroupBoard({
  index,
  seed,
}: {
  index: number;
  seed: number;
}) {
  const B = [PutCall, InterestParity, Deductible, BankRun, Drawdown][
    index
  ] as ComponentType<{ seed: number }>;
  return <B seed={seed} />;
}
