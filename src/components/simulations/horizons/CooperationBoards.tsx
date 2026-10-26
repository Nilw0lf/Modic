"use client";
import { useState } from "react";
import {
  orders,
  marginal,
  shapley,
  coalitionValues,
  banzhaf,
  vcg,
  moralHazard,
  rng,
} from "@/lib/simulations/horizons";
import { Actions, Ledger, Slider, Stats, fmt, pct } from "../depth/Shared";
export function Shapley() {
  const [order, setOrder] = useState(0),
    [reveal, setReveal] = useState(false);
  const gains = marginal(orders[order]),
    values = shapley();
  return (
    <>
      <p>
        Three collaborators create 90 units together. Alone each creates zero;
        AB creates 60, AC 20 and BC 40. Who gets the surplus?
      </p>
      <div className="depth-options">
        {orders.map((o, i) => (
          <button
            key={i}
            aria-pressed={order === i}
            onClick={() => setOrder(i)}
          >
            {o.map((n) => "ABC"[n]).join(" → ")}
          </button>
        ))}
      </div>
      <Ledger
        label="Marginal contributions in the chosen joining order"
        headers={[
          "Contributor",
          "Contribution this order",
          "Average across all six orders",
        ]}
        rows={gains.map((g, i) => [
          "ABC"[i],
          g,
          reveal ? fmt(values[i]) : "Not averaged yet",
        ])}
      />
      <Actions>
        <button onClick={() => setReveal(true)}>
          Average all joining orders
        </button>
      </Actions>
      <Stats
        items={[
          ["Grand-coalition value", String(coalitionValues[7])],
          ["Assigned by this order", String(gains.reduce((a, b) => a + b, 0))],
        ]}
      />
      <p>
        The Shapley value averages marginal contributions over all orders. It is
        a principled allocation for a specified cooperative game, not proof that
        its authored coalition values measure actual effort or deserved income.
      </p>
    </>
  );
}
export function Power() {
  const [quota, setQuota] = useState(6),
    [coalition, setCoalition] = useState([true, false, false]);
  const weights = [4, 3, 2],
    result = banzhaf(weights, quota),
    total = weights.reduce((s, w, i) => s + (coalition[i] ? w : 0), 0);
  return (
    <>
      <Slider
        id="quota"
        label="Votes needed to pass"
        value={quota}
        min={1}
        max={9}
        onChange={setQuota}
      />
      <Actions>
        {weights.map((w, i) => (
          <button
            key={i}
            aria-pressed={coalition[i]}
            onClick={() =>
              setCoalition((v) => v.map((b, j) => (i === j ? !b : b)))
            }
          >
            {"ABC"[i]}: {w} votes
          </button>
        ))}
      </Actions>
      <Stats
        items={[
          ["Coalition weight", String(total)],
          ["Decision", total >= quota ? "Passes" : "Fails"],
        ]}
      />
      <Ledger
        label="Power across all possible coalitions"
        headers={[
          "Voter",
          "Share of vote weight",
          "Critical coalitions",
          "Normalised Banzhaf power",
        ]}
        rows={weights.map((w, i) => [
          "ABC"[i],
          pct(w / 9),
          result.swings[i],
          pct(result.power[i]),
        ])}
      />
      <p>
        A swing is a losing coalition that becomes winning when a voter joins.
        Every coalition is treated equally in this index; actual coalition
        probabilities, alliances and agenda control are not represented.
      </p>
    </>
  );
}
export function Commitment() {
  const [binding, setBinding] = useState(false),
    [run, setRun] = useState(false);
  return (
    <>
      <p>
        You operate an incumbent service. A rival can enter. After entry,
        accommodating gives you 2; fighting gives −2. Keeping the market to
        yourself gives 6.
      </p>
      <Actions>
        <button
          disabled={run}
          aria-pressed={!binding}
          onClick={() => setBinding(false)}
        >
          Announcement only
        </button>
        <button
          disabled={run}
          aria-pressed={binding}
          onClick={() => setBinding(true)}
        >
          Install binding penalty
        </button>
        <button disabled={run} onClick={() => setRun(true)}>
          Let the entrant decide
        </button>
      </Actions>
      <Ledger
        label="Incumbent incentives after entry, before initial setup cost"
        headers={["Response", "Announcement only", "Binding penalty"]}
        rows={[
          ["Accommodate", 2, -4],
          ["Fight", -2, -2],
        ]}
      />
      {run && (
        <>
          <Stats
            items={[
              ["Entrant’s predicted action", binding ? "Stay out" : "Enter"],
              ["Your final payoff", binding ? "3" : "2"],
              ["Entrant payoff", binding ? "0" : "3"],
            ]}
          />
          <p role="status">
            {binding
              ? "A setup cost of 3 installs an enforceable 6-unit accommodation penalty. The rival anticipates fighting and stays out. You receive 6 − 3 = 3."
              : "A threat without changed incentives is not credible here. After entry you prefer accommodation; the rival anticipates this and enters."}
          </p>
        </>
      )}
      <p>
        The entrant receives 3 if accommodated, −1 if fought, and zero outside.
        Payoffs, observability and enforceability are stipulated. Credible
        commitment can be costly or harmful in other games; this is not advice
        to escalate a real conflict.
      </p>
    </>
  );
}
export function Hazard({ seed }: { seed: number }) {
  const [coverage, setCoverage] = useState(75),
    [choice, setChoice] = useState<boolean | null>(null);
  const c = coverage / 100,
    r = moralHazard(c),
    u = rng(seed)(),
    loss = choice !== null && u < (choice ? 0.1 : 0.4);
  return (
    <>
      <p>
        A workshop can spend 3 maintenance units to reduce a 20-unit
        equipment-loss probability from 40% to 10%. Warranty coverage reimburses
        a chosen share of any loss.
      </p>
      <Slider
        id="coverage"
        label="Warranty coverage"
        value={coverage}
        min={0}
        max={100}
        step={5}
        suffix="%"
        disabled={choice !== null}
        onChange={setCoverage}
      />
      <Ledger
        label="Expected costs before the outcome"
        headers={[
          "Choice",
          "Private expected cost",
          "Total maintenance + loss cost",
        ]}
        rows={[
          ["Maintain", fmt(r.careful), "5.00"],
          ["Skip maintenance", fmt(r.careless), "8.00"],
        ]}
      />
      <Actions>
        <button disabled={choice !== null} onClick={() => setChoice(true)}>
          Pay 3 for maintenance
        </button>
        <button disabled={choice !== null} onClick={() => setChoice(false)}>
          Skip maintenance
        </button>
      </Actions>
      {choice !== null && (
        <Stats
          items={[
            ["Realised loss", loss ? "20" : "0"],
            [
              "Your realised cost",
              fmt((choice ? 3 : 0) + (loss ? 20 * (1 - c) : 0)),
            ],
            ["Warranty reimbursement", fmt(loss ? 20 * c : 0)],
          ]}
        />
      )}
      <p>
        The private cost-minimising choice in this model is{" "}
        {r.maintain ? "maintenance" : "skipping maintenance"}. Moral hazard
        concerns changed incentives after risk sharing; it does not imply
        dishonest intent. Premiums, monitoring, contract exclusions and
        heterogeneity are omitted.
      </p>
    </>
  );
}
export function PublicProject() {
  const [value, setValue] = useState(45),
    [bid, setBid] = useState(45),
    [reveal, setReveal] = useState(false);
  const r = vcg([bid, 35, 10], 60),
    total = r.payments.reduce((a, b) => a + b, 0);
  return (
    <>
      <p>
        A shared project costs 60. Your true benefit is adjustable; the other
        two report benefits 35 and 10. The Clarke pivot rule charges each
        participant the externality their participation creates.
      </p>
      <Slider
        id="true-benefit"
        label="Your true benefit"
        value={value}
        min={5}
        max={60}
        onChange={(v) => {
          setValue(v);
          setReveal(false);
        }}
      />
      <Slider
        id="reported-benefit"
        label="Your reported benefit"
        value={bid}
        min={0}
        max={100}
        onChange={(v) => {
          setBid(v);
          setReveal(false);
        }}
      />
      <Actions>
        <button
          onClick={() => {
            setBid(value);
            setReveal(false);
          }}
        >
          Report truthfully
        </button>
        <button onClick={() => setReveal(true)}>
          Run public-project mechanism
        </button>
      </Actions>
      {reveal && (
        <>
          <Stats
            items={[
              ["Project", r.build ? "Build" : "Do not build"],
              ["Your pivot payment", fmt(r.payments[0])],
              ["Your true utility", fmt(r.build ? value - r.payments[0] : 0)],
              ["Budget shortfall", fmt(r.build ? 60 - total : 0)],
            ]}
          />
          <Ledger
            label="Pivot payments"
            headers={["Person", "Reported benefit", "Payment"]}
            rows={r.payments.map((p, i) => [
              "ABC"[i],
              [bid, 35, 10][i],
              fmt(p),
            ])}
          />
        </>
      )}
      <p>
        With quasi-linear utility and nonnegative values, truthful reporting is
        weakly dominant in this stylised VCG mechanism. Collected payments need
        not cover project cost. The display assumes an outside budget covers any
        shortfall, rather than claiming the mechanism is self-financing.
      </p>
    </>
  );
}
