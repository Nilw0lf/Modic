"use client";
import { useState } from "react";
import { seededRandom } from "@/lib/simulations/random";
import {
  bestQuantity,
  blottoAllocation,
  blottoScore,
  blockingPairs,
  initialMatching,
  matchingPreferences,
  pricePayoffs,
  propose,
  quantityPayoffs,
} from "@/lib/simulations/frontier";
import { Slider, Stats } from "../foundations/Shared";

const number = (n: number) => Number(n.toFixed(2)).toLocaleString("en-US");
const applicants = ["Ari", "Bo", "Cy"],
  teams = ["Maple", "Pine", "Oak"];

export function MatchingGame({ seed }: { seed: number }) {
  const prefs = matchingPreferences(seed),
    [state, setState] = useState(initialMatching);
  const complete = state.matches.every((n) => n >= 0);
  return (
    <>
      <div className="frontier-preferences">
        <div>
          <h3>Applicants prefer</h3>
          {prefs.applicants.map((row, a) => (
            <p key={a}>
              <strong>{applicants[a]}</strong>:{" "}
              {row.map((t) => teams[t]).join(" → ")}
            </p>
          ))}
        </div>
        <div>
          <h3>Teams prefer</h3>
          {prefs.teams.map((row, t) => (
            <p key={t}>
              <strong>{teams[t]}</strong>:{" "}
              {row.map((a) => applicants[a]).join(" → ")}
            </p>
          ))}
        </div>
      </div>
      <div className="frontier-matches">
        {teams.map((team, t) => (
          <div key={team}>
            <span>{team}</span>
            <strong>
              {state.matches[t] < 0
                ? "Open place"
                : applicants[state.matches[t]]}
            </strong>
            <small>{complete ? "Final match" : "Tentative"}</small>
          </div>
        ))}
      </div>
      <div className="play-actions">
        {applicants.map((name, a) => (
          <button
            key={name}
            disabled={state.matches.includes(a) || state.next[a] >= 3}
            onClick={() => setState((s) => propose(s, prefs, a))}
          >
            {name}: propose next
          </button>
        ))}
      </div>
      <p className="play-feedback" role="status">
        {complete
          ? `Matching complete. ${blockingPairs(state.matches, prefs).length} blocking pairs remain.`
          : (state.log.at(-1) ??
            "Choose any free applicant. A held offer can still be replaced.")}
      </p>
      {!!state.log.length && (
        <details className="frontier-log">
          <summary>Proposal history ({state.log.length})</summary>
          <ol>
            {state.log.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ol>
        </details>
      )}
    </>
  );
}

export function VenueGame({ seed }: { seed: number }) {
  const [chance, setChance] = useState(50),
    [history, setHistory] = useState<
      { own: string; partner: string; pay: number; other: number }[]
    >([]);
  function choose(own: string) {
    const partner =
      seededRandom(seed + history.length * 7919)() < chance / 100
        ? "Music"
        : "Sport";
    setHistory((h) => [
      ...h,
      {
        own,
        partner,
        pay: own !== partner ? 0 : own === "Music" ? 3 : 2,
        other: own !== partner ? 0 : own === "Music" ? 2 : 3,
      },
    ]);
  }
  return (
    <>
      <Slider
        id="venue-probability"
        label="Bot chooses Music"
        min={0}
        max={100}
        value={chance}
        suffix="%"
        onChange={setChance}
      />
      <div className="frontier-payoff-grid">
        <span>You / Bot</span>
        <span>Music</span>
        <span>Sport</span>
        <span>Music</span>
        <strong>3 / 2</strong>
        <strong>0 / 0</strong>
        <span>Sport</span>
        <strong>0 / 0</strong>
        <strong>2 / 3</strong>
      </div>
      <div className="play-actions">
        <button onClick={() => choose("Music")}>Go to Music</button>
        <button onClick={() => choose("Sport")}>Go to Sport</button>
      </div>
      <Stats
        items={[
          ["Expected Music payoff", number((3 * chance) / 100)],
          ["Expected Sport payoff", number(2 * (1 - chance / 100))],
          ["Your total tokens", number(history.reduce((a, r) => a + r.pay, 0))],
        ]}
      />
      <p role="status" className="play-feedback">
        {history.length
          ? `You chose ${history.at(-1)!.own}; bot chose ${history.at(-1)!.partner}. Payoffs: you ${history.at(-1)!.pay}, bot ${history.at(-1)!.other}.`
          : "The bot's policy is visible. Coordination can benefit you both, while you disagree about where."}
      </p>
      <p className="frontier-note">
        Each choice is one independent round. The bot does not learn; changing
        its probability affects future rounds only.
      </p>
    </>
  );
}

export function QuantityGame({ leader = false }: { leader?: boolean }) {
  const [own, setOwn] = useState(20),
    [fixedRival, setRival] = useState(20),
    [submitted, setSubmitted] = useState(false);
  const rival = leader ? bestQuantity(own) : fixedRival;
  const payoff = quantityPayoffs(own, rival);
  return (
    <>
      {!leader && (
        <Slider
          id="cournot-rival"
          label="Rival quantity (held fixed)"
          min={0}
          max={70}
          value={fixedRival}
          onChange={(v) => {
            setRival(v);
            setSubmitted(false);
          }}
        />
      )}
      <Slider
        id={leader ? "leader-quantity" : "cournot-own"}
        label={leader ? "Your committed quantity" : "Your production quantity"}
        min={0}
        max={80}
        value={own}
        onChange={(v) => {
          setOwn(v);
          setSubmitted(false);
        }}
      />
      <div className="frontier-output-bars">
        <div>
          <span>Your output: {own}</span>
          <i style={{ width: `${own}%` }} />
        </div>
        <div>
          <span>
            {leader ? "Follower best response" : "Rival output"}:{" "}
            {number(rival)}
          </span>
          <i style={{ width: `${rival}%` }} />
        </div>
      </div>
      <button onClick={() => setSubmitted(true)}>
        {leader ? "Commit and let follower respond" : "Produce and sell"}
      </button>
      <Stats
        items={[
          ["Market price", number(payoff.price)],
          ["Your profit", number(payoff.own)],
          ["Rival profit", number(payoff.rival)],
        ]}
      />
      <p role="status" className="play-feedback">
        {submitted
          ? leader
            ? `Committed ${own}; follower produces ${number(rival)}. Your net profit is ${number(payoff.own)}. Leader optimum here: 40, followed by 20.`
            : `Your net profit is ${number(payoff.own)}. The best response to ${fixedRival} rival units is ${number(bestQuantity(fixedRival))} units.`
          : "Move a control to preview the outcome, then submit a decision."}
      </p>
      <p className="frontier-note">
        Price = max(0, 100 − total output); unit cost = 20.{" "}
        {leader
          ? "Simultaneous Cournot benchmark: 26.67 units each, profit about 711.11 each. Commitment is enforced."
          : "The rival's quantity is disclosed for learning. This is a best-response challenge rather than hidden simultaneous play."}
      </p>
    </>
  );
}

export function PricingGame() {
  const [price, setPrice] = useState(50),
    [rival, setRival] = useState(50),
    [submitted, setSubmitted] = useState(false);
  const result = pricePayoffs(price, rival);
  return (
    <>
      <Slider
        id="bertrand-rival"
        label="Rival price (held fixed)"
        min={20}
        max={90}
        value={rival}
        onChange={(v) => {
          setRival(v);
          setSubmitted(false);
        }}
      />
      <Slider
        id="bertrand-own"
        label="Your price"
        min={10}
        max={90}
        value={price}
        onChange={(v) => {
          setPrice(v);
          setSubmitted(false);
        }}
      />
      <div className="frontier-shopfront">
        <div>
          <span>Your shop</span>
          <strong>{price} tokens</strong>
          <p>{number(result.units)} units sold</p>
        </div>
        <div>
          <span>Rival shop</span>
          <strong>{rival} tokens</strong>
          <p>{number(result.rivalUnits)} units sold</p>
        </div>
      </div>
      <button onClick={() => setSubmitted(true)}>Post your price</button>
      <Stats
        items={[
          ["Demand at lowest price", number(result.demand)],
          ["Margin per unit", number(price - 20)],
          ["Your profit", number(result.profit)],
        ]}
      />
      <p role="status" className="play-feedback">
        {submitted
          ? `At ${price}, you serve ${number(result.units)} units and earn ${number(result.profit)} net tokens. ${price < 20 ? "Winning sales below cost makes a loss." : price === rival ? "A tie splits demand." : price < rival ? "Your lower price captures demand." : "Customers choose the cheaper identical product."}`
          : "Try matching, undercutting by one, and pricing below cost. Compare profit rather than sales alone."}
      </p>
      <p className="frontier-note">
        Identical products, no capacity limit, demand = 100 − lowest price, unit
        cost = 20. A fixed rival is not a market equilibrium.
      </p>
    </>
  );
}

export function AttritionGame() {
  const [patience, setPatience] = useState(4),
    [round, setRound] = useState(0),
    [result, setResult] = useState<string | null>(null);
  function wait() {
    const next = round + 1;
    setRound(next);
    if (next >= patience)
      setResult(
        `The bot exits. You win 12 − ${next * 2} = ${12 - next * 2} net tokens.`,
      );
  }
  return (
    <>
      <Slider
        id="attrition-patience"
        label="Disclosed bot patience (rounds)"
        min={1}
        max={8}
        value={patience}
        onChange={(v) => {
          setPatience(v);
          setRound(0);
          setResult(null);
        }}
      />
      <div className="frontier-contest">
        <span>Prize: 12 tokens</span>
        <strong>{round} rounds of waiting</strong>
        <div className="frontier-cost-track">
          {Array.from({ length: patience }, (_, i) => (
            <span key={i} className={i < round ? "spent" : ""}>
              {i < round ? "−2" : "·"}
            </span>
          ))}
        </div>
      </div>
      <div className="play-actions">
        <button disabled={result !== null} onClick={wait}>
          Continue (costs 2)
        </button>
        <button
          disabled={result !== null}
          onClick={() =>
            setResult(
              `You exit. Net payoff: ${-round * 2}. The bot gets the prize minus its accumulated cost.`,
            )
          }
        >
          Exit now
        </button>
      </div>
      <Stats
        items={[
          ["Cost already paid", String(round * 2)],
          ["Net if you outlast bot", String(12 - patience * 2)],
          ["Your net if you exit now", String(-round * 2)],
        ]}
      />
      <p role="status" className="play-feedback">
        {result ??
          "Each Continue charges both players 2. The bot exits when the round reaches its patience limit."}
      </p>
    </>
  );
}

export function BlottoGame({ seed }: { seed: number }) {
  const [allocation, setAllocation] = useState([3, 3, 4]),
    [submitted, setSubmitted] = useState(false);
  const opponent = blottoAllocation(seed),
    sum = allocation.reduce((a, b) => a + b, 0),
    score = blottoScore(allocation, opponent);
  function change(i: number, delta: number) {
    setAllocation((a) => a.map((n, j) => (i === j ? n + delta : n)));
    setSubmitted(false);
  }
  return (
    <>
      <p className="simple-prompt">
        Your budget: {sum}/10 allocated · {10 - sum} remaining
      </p>
      <div className="frontier-fields">
        {allocation.map((n, i) => (
          <div key={i}>
            <h3>Field {i + 1}</h3>
            <strong>{n}</strong>
            <div className="play-actions">
              <button
                aria-label={`Remove token from field ${i + 1}`}
                disabled={submitted || n <= 0}
                onClick={() => change(i, -1)}
              >
                −
              </button>
              <button
                aria-label={`Add token to field ${i + 1}`}
                disabled={submitted || sum >= 10}
                onClick={() => change(i, 1)}
              >
                +
              </button>
            </div>
            <span>
              {submitted
                ? `Bot: ${opponent[i]} · Your points: ${score.fields[i]}`
                : "Bot allocation hidden"}
            </span>
          </div>
        ))}
      </div>
      <button
        disabled={sum !== 10 || submitted}
        onClick={() => setSubmitted(true)}
      >
        Submit allocation
      </button>
      <p role="status" className="play-feedback">
        {submitted
          ? `Field score: you ${score.own}, bot ${score.rival}. ${score.own > score.rival ? "You win this round." : score.own === score.rival ? "This round is tied." : "The bot wins this round."} Inspect which tokens changed a field and which only widened a win.`
          : "Spend exactly ten. Higher allocation wins one point; ties split the point."}
      </p>
      <p className="frontier-note">
        The opponent places each of ten tokens on a random field. It is not an
        equilibrium strategy. Use New round to face a fresh hidden allocation.
      </p>
    </>
  );
}
