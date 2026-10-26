"use client";
import { useState } from "react";
import { borda, rng } from "@/lib/simulations/depth";
import { Actions, Ledger, Slider, Stats, fmt, pct } from "./Shared";
export function Auctions({ seed }: { seed: number }) {
  const [round, setRound] = useState(0),
    [batch, setBatch] = useState(false);
  const random = rng(seed + round),
    values = Array.from({ length: 3 }, () => 100 * random()).sort(
      (a, b) => b - a,
    );
  const draw = rng(seed + 600);
  let first = 0,
    second = 0;
  for (let i = 0; i < 500; i++) {
    const v = Array.from({ length: 3 }, () => 100 * draw()).sort(
      (a, b) => b - a,
    );
    first += (2 * v[0]) / 3;
    second += v[1];
  }
  return (
    <>
      <div className="depth-cards">
        {values.map((v, i) => (
          <div key={i}>
            <small>
              Bidder {i + 1}
              {i === 0 ? " · winner" : ""}
            </small>
            <strong>Value {fmt(v)}</strong>
            <p>
              First-price bid {fmt((2 * v) / 3)}
              <br />
              Second-price bid {fmt(v)}
            </p>
          </div>
        ))}
      </div>
      <Actions>
        <button onClick={() => setRound((v) => v + 1)}>
          Draw another auction
        </button>
        <button onClick={() => setBatch(true)}>Compare 500 auctions</button>
      </Actions>
      <Stats
        items={[
          ["First-price revenue", fmt((2 * values[0]) / 3)],
          ["Second-price revenue", fmt(values[1])],
          ["Theoretical expected revenue", "50.00"],
        ]}
      />
      {batch && (
        <Stats
          items={[
            ["Batch first-price mean", fmt(first / 500)],
            ["Batch second-price mean", fmt(second / 500)],
          ]}
        />
      )}
      <p>
        Three independent uniform values from 0 to 100. Risk-neutral symmetric
        equilibrium first-price bids are 2v/3; second-price bids equal value.
        Expected revenues agree under these assumptions, but one auction’s
        payments can differ.
      </p>
    </>
  );
}
export function Voting() {
  const [ballot, setBallot] = useState("ABC"),
    [commit, setCommit] = useState(false);
  const result = borda(ballot);
  return (
    <>
      <p className="depth-callout">
        Your true preference: A ≻ B ≻ C.
        <br />
        Other voters: BCA, CBA, CBA. Borda awards 2, 1, 0 points. Ties favour C,
        then B, then A.
      </p>
      <div className="depth-options">
        {["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"].map((b) => (
          <button
            aria-pressed={b === ballot}
            key={b}
            onClick={() => {
              setBallot(b);
              setCommit(false);
            }}
          >
            {b.split("").join(" ≻ ")}
          </button>
        ))}
      </div>
      <Actions>
        <button onClick={() => setCommit(true)}>Count these ballots</button>
      </Actions>
      {commit && (
        <>
          <Ledger
            label="Election ledger"
            headers={["Candidate", "Points"]}
            rows={Object.entries(result.scores)}
          />
          <Stats
            items={[
              ["Your submitted ranking", ballot],
              ["Winner", result.winner],
              ["Honest ABC winner", "C"],
            ]}
          />
          <p>
            {result.winner === "B"
              ? "By ranking B above A, you replace your least preferred winner C with B. This is a profitable manipulation for the stipulated true preference."
              : "Try moving B above A. The useful question is whether your ballot can produce a winner you prefer to the honest outcome."}
          </p>
        </>
      )}
    </>
  );
}
export function Signaling() {
  const [e, setE] = useState(15);
  const high = 80 - e,
    low = 80 - 3 * e;
  return (
    <>
      <Slider
        id="education"
        label="Credential threshold (units)"
        value={e}
        min={0}
        max={30}
        onChange={setE}
      />
      <Ledger
        label="Education choice under a stipulated wage rule"
        headers={[
          "Type",
          "Cost per unit",
          "Net if qualified",
          "Outside wage",
          "Choice",
        ]}
        rows={[
          ["Lower cost", 1, high, 40, high >= 40 ? "Qualify" : "Outside"],
          ["Higher cost", 3, low, 40, low >= 40 ? "Qualify" : "Outside"],
        ]}
      />
      <Stats
        items={[
          ["Pattern", high >= 40 && low < 40 ? "Separating" : "Pooling"],
          ["High / low wage", "80 / 40"],
        ]}
      />
      <p>
        The credential does not raise productivity here. Its different costs can
        separate types when only the lower-cost type chooses it. Equal payoffs
        break toward qualifying. Wages are fixed by the teaching rule, not
        solved from employer beliefs.
      </p>
    </>
  );
}
export function HoldUp() {
  const [i, setI] = useState(5),
    [protectedContract, setProtected] = useState(false),
    [locked, setLocked] = useState(false);
  const theta = protectedContract ? 0.8 : 0.5;
  return (
    <>
      <Slider
        id="investment"
        disabled={locked}
        label="Investment units"
        value={i}
        min={0}
        max={10}
        onChange={(v) => {
          if (!locked) setI(v);
        }}
      />
      <Actions>
        <button
          disabled={locked}
          aria-pressed={protectedContract}
          onClick={() => setProtected((v) => !v)}
        >
          Protection: {protectedContract ? "80% retained" : "50% retained"}
        </button>
        <button disabled={locked} onClick={() => setLocked(true)}>
          Commit investment
        </button>
      </Actions>
      <Stats
        items={[
          ["Investment cost", String(10 * i)],
          ["Created surplus", String(15 * i)],
          ["Your net payoff", fmt(theta * 15 * i - 10 * i)],
          ["Joint net gain", String(5 * i)],
        ]}
      />
      {locked && (
        <p className="depth-callout">
          Committed. The partner receives {fmt((1 - theta) * 15 * i)}. Reset to
          compare the same investment under another contract.
        </p>
      )}
      <p>
        Investment creates 15 surplus units per 10 cost units. Under 50%
        retention, privately unprofitable investment can still create a joint
        gain. Contract protection changes anticipated returns; enforceability is
        assumed.
      </p>
    </>
  );
}
export function Bargaining() {
  const [discount, setDiscount] = useState(0.8),
    [ask, setAsk] = useState(60),
    [round, setRound] = useState(0),
    [botTurn, setBotTurn] = useState(false),
    [result, setResult] = useState<string | null>(null);
  const pie = 100 * discount ** round,
    threshold = discount / (1 + discount),
    benchmark = 1 / (1 + discount);
  return (
    <>
      <Slider
        id="patience"
        label="Pie retained after each delay"
        value={discount}
        min={0.5}
        max={0.95}
        step={0.05}
        onChange={(v) => {
          setDiscount(v);
          setRound(0);
          setResult(null);
          setBotTurn(false);
        }}
      />
      <Slider
        id="ask"
        label="Your requested share"
        value={ask}
        min={0}
        max={100}
        suffix="%"
        onChange={setAsk}
      />
      <Stats
        items={[
          ["Round", String(round)],
          ["Pie remaining", fmt(pie)],
          ["Bot minimum share", pct(threshold)],
          ["Stationary first-mover share", pct(benchmark)],
        ]}
      />
      <Actions>
        <button
          disabled={result !== null || botTurn}
          onClick={() => {
            if (1 - ask / 100 + 1e-9 >= threshold)
              setResult(`Accepted: you receive ${fmt((pie * ask) / 100)}.`);
            else {
              setRound((v) => v + 1);
              setBotTurn(true);
            }
          }}
        >
          Make offer
        </button>
        <button
          disabled={result !== null || !botTurn}
          onClick={() =>
            setResult(
              `You accept the bot's counteroffer: ${fmt(pie * threshold)} from the current pie.`,
            )
          }
        >
          Accept bot counteroffer
        </button>
        <button
          disabled={result !== null || !botTurn}
          onClick={() => {
            setRound((v) => v + 1);
            setBotTurn(false);
          }}
        >
          Reject & make next proposal
        </button>
      </Actions>
      <p role="status">
        {result ??
          (botTurn
            ? `Bot counteroffer: you receive ${fmt(pie * threshold)}. Accept, or reject and shrink the pie again before your next proposal.`
            : "Your turn. The bot rejects shares below its stationary reservation; rejection shrinks the pie and passes the proposal to the bot.")}
      </p>
      <p>
        This is a practice bot using infinite-horizon alternating-offer
        reservation shares with common discounting. It is not negotiation advice
        or a model of emotions, outside options, or unequal patience.
      </p>
    </>
  );
}
