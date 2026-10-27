"use client";
import { useState } from "react";
import { Actions, Slider, Stats, Ledger } from "./Shared";
import {
  rng,
  knowsBlue,
  silentWorlds,
  contractChoice,
} from "@/lib/simulations/mosaic";
export function Dutch() {
  const [price, setPrice] = useState(100),
    [result, setResult] = useState("");
  function lower() {
    const p = price - 5;
    setPrice(p);
    if (p <= 50) setResult("A scripted rival accepts at 50. Your profit: 0.");
  }
  return (
    <>
      <p>
        Your private value is 80. The clock falls in five-unit ticks. Two rivals
        have hidden, fixed acceptance thresholds; they act when a tick reaches
        their threshold.
      </p>
      <Stats
        items={[
          ["Current price", price],
          ["Your value", 80],
        ]}
      />
      <Actions>
        <button
          disabled={!!result}
          onClick={() =>
            setResult(
              `You buy at ${price}. Your profit: ${80 - price}. Rival thresholds were 45 and 50.`,
            )
          }
        >
          Accept price
        </button>
        <button disabled={!!result} onClick={lower}>
          Lower clock by 5
        </button>
      </Actions>
      <p aria-live="polite">
        {result || "Accept now or risk losing the item at the next tick."}
      </p>
      {result && (
        <p>
          The highest rival threshold was 50, so 55 was the cheapest winning
          tick. These scripted thresholds are not an equilibrium strategy.
        </p>
      )}
    </>
  );
}
export function AllPay({ seed }: { seed: number }) {
  const [bid, setBid] = useState(4),
    [done, setDone] = useState(false);
  const rival = 1 + Math.floor(rng(seed)() * 10),
    prize = bid > rival ? 12 : bid === rival ? 6 : 0;
  const expected =
    Array.from(
      { length: 10 },
      (_, i) => (bid > i + 1 ? 12 : bid === i + 1 ? 6 : 0) - bid,
    ).reduce((a, b) => a + b, 0) / 10;
  return (
    <>
      <p>
        Prize value: 12. Your rival bids uniformly from integers 1–10. Highest
        bid wins; a tie splits the prize. Everyone pays their bid, including the
        loser.
      </p>
      <Slider
        id="your-bid"
        label="Your bid"
        min={0}
        max={15}
        value={bid}
        onChange={setBid}
        disabled={done}
      />
      <Actions>
        <button disabled={done} onClick={() => setDone(true)}>
          Submit all-pay bid
        </button>
      </Actions>
      {done && (
        <>
          <Stats
            items={[
              ["Rival bid", rival],
              ["Your prize share", prize],
              ["Your net payoff", prize - bid],
            ]}
          />
          <p>
            Across the ten equally likely rival bids, this bid has expected net
            payoff {expected.toFixed(1)}. This is an exact average against the
            stated bot, not an equilibrium claim.
          </p>
        </>
      )}
    </>
  );
}
export function CommonKnowledge() {
  const [blue, setBlue] = useState(3),
    [publicFact, setPublic] = useState(true),
    [worlds, setWorlds] = useState<number[] | null>(null),
    [round, setRound] = useState(0),
    [answer, setAnswer] = useState("");
  const actual = (1 << blue) - 1;
  function step() {
    const w =
        worlds ??
        Array.from({ length: 8 }, (_, i) => i).filter(
          (i) => !publicFact || i > 0,
        ),
      knowers = [0, 1, 2].filter(
        (i) => actual & (1 << i) && knowsBlue(w, actual, i),
      );
    setRound(round + 1);
    if (knowers.length) {
      setAnswer(
        `Round ${round + 1}: ${knowers.map((i) => "ABC"[i]).join(", ")} can deduce their own hat is blue.`,
      );
      setWorlds(w);
    } else setWorlds(silentWorlds(w));
  }
  return (
    <>
      <p>
        Three perfect logicians see the other hats, never their own. At each
        simultaneous round they announce only if certain their own hat is blue.
        Everyone hears every announcement and silence.
      </p>
      <Slider
        id="blue-hats-in-the-actual-world"
        label="Blue hats in the actual world"
        min={1}
        max={3}
        value={blue}
        onChange={setBlue}
        disabled={round > 0}
      />
      <Actions>
        <button
          disabled={round > 0}
          aria-pressed={publicFact}
          onClick={() => setPublic(!publicFact)}
        >
          Public announcement: {publicFact ? "at least one blue" : "none"}
        </button>
        <button disabled={!!answer || round >= 6} onClick={step}>
          Hear next round
        </button>
      </Actions>
      <div className="mosaic-hats">
        {[0, 1, 2].map((i) => (
          <span key={i}>
            {"ABC"[i]}: {actual & (1 << i) ? "Blue" : "White"}
          </span>
        ))}
      </div>
      <Stats
        items={[
          ["Rounds heard", round],
          ["Possible public worlds", worlds?.length ?? (publicFact ? 7 : 8)],
        ]}
      />
      <p aria-live="polite">
        {answer ||
          (round
            ? "Nobody announces blue. Eliminate worlds in which someone would have known."
            : "The audience sees all hats; each logician sees only the other two.")}
      </p>
      <p>
        Without a public announcement, the all-white world remains possible and
        silence never starts the chain of deductions.
      </p>
    </>
  );
}
export function Screening() {
  const [low, setLow] = useState(4),
    [high, setHigh] = useState(12);
  const choices = [4, 8].map((v) => contractChoice(v, low, high)),
    profit = choices.reduce((s, c) => s + c.p - c.q * c.q, 0);
  return (
    <>
      <p>
        Two customers privately value each quality unit at 4 and 8. Offer
        quality 1 or 2; production costs are 1 and 4. Each chooses the highest
        utility, or the outside option of zero. Ties favour higher quality.
      </p>
      <Slider
        id="quality-1-price"
        label="Quality 1 price"
        min={2}
        max={6}
        value={low}
        onChange={setLow}
      />
      <Slider
        id="quality-2-price"
        label="Quality 2 price"
        min={8}
        max={18}
        value={high}
        onChange={setHigh}
      />
      <Ledger
        label="Customers select their own contracts"
        headers={[
          "Value per quality",
          "Low utility",
          "High utility",
          "Chosen quality",
          "Seller profit",
        ]}
        rows={[4, 8].map((v, i) => [
          v,
          v - low,
          2 * v - high,
          choices[i].q,
          choices[i].p - choices[i].q ** 2,
        ])}
      />
      <Stats
        items={[
          ["Total seller profit", profit],
          [
            "Different contracts chosen",
            choices[0].q !== choices[1].q ? "Yes" : "No",
          ],
        ]}
      />
      <p>
        Raise the high-quality price from 12 to 14. A customer can switch down
        rather than reveal willingness to pay through a survey. This fixed
        two-type menu is not a complete market model.
      </p>
    </>
  );
}
export function Tiebout() {
  const [park, setPark] = useState(["P1", "Q1"]),
    [quiet, setQuiet] = useState(["P2", "Q2"]),
    [a, setA] = useState(0),
    [b, setB] = useState(0),
    [cost, setCost] = useState(0),
    [moves, setMoves] = useState(0);
  const benefit = (p: string, town: string) =>
    (p[0] === "P" ? (town === "Park" ? 10 : 3) : town === "Park" ? 4 : 8) - 2;
  const gross =
    park.reduce((s, p) => s + benefit(p, "Park"), 0) +
    quiet.reduce((s, p) => s + benefit(p, "Quiet"), 0);
  function swap() {
    const p = [...park],
      q = [...quiet];
    [p[a], q[b]] = [q[b], p[a]];
    setPark(p);
    setQuiet(q);
    setMoves(moves + 2);
  }
  return (
    <>
      <p>
        Each town has two homes and a tax of 2 per household. Park lovers P
        value Park at 10 and Quiet at 3; quiet lovers Q value them at 4 and 8.
        Town services and taxes stay fixed.
      </p>
      <Slider
        id="cost-per-household-move"
        label="Cost per household move"
        min={0}
        max={8}
        value={cost}
        onChange={setCost}
        disabled={moves > 0}
      />
      <div className="mosaic-choice-grid">
        {[
          ["Park", park, a, setA],
          ["Quiet", quiet, b, setB],
        ].map(([town, people, selected, select]) => (
          <fieldset key={town as string}>
            <legend>{town as string}</legend>
            {(people as string[]).map((p, i) => (
              <button
                key={p}
                aria-pressed={selected === i}
                onClick={() => (select as (n: number) => void)(i)}
              >
                {p} · benefit after tax {benefit(p, town as string)}
              </button>
            ))}
          </fieldset>
        ))}
      </div>
      <Actions>
        <button onClick={swap}>Swap selected households</button>
      </Actions>
      <Stats
        items={[
          ["Benefits after taxes", gross],
          ["Moving costs paid", moves * cost],
          ["Net after moves", gross - moves * cost],
        ]}
      />
      <p>
        Both communities remain full. The initial benefits total 17; matching
        both P households to Park and both Q households to Quiet gives 28 before
        moving costs. Sorting is not a fairness measure.
      </p>
    </>
  );
}
