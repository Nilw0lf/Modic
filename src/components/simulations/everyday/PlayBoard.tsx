"use client";
import { useState, type ReactNode } from "react";
import type { Settings } from "@/lib/simulations/everyday";
import { seededRandom } from "@/lib/simulations/random";
import {
  beautyBots,
  cascade,
  hotellingShare,
  lotteryPayoff,
  simpson,
} from "@/lib/simulations/play";

const playIds = new Set([
  "simpsons-paradox",
  "ellsberg-urn",
  "allais-paradox",
  "information-cascade",
  "threshold-public-good",
  "trust-game",
  "centipede-game",
  "volunteers-dilemma",
  "beauty-contest",
  "hotelling-location",
]);
const num = (value: number) => Number(value.toFixed(1));
type Props = { id: string; settings: Settings; seed: number };
function Action({
  children,
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
export function PlayBoard({ id, settings: s, seed }: Props) {
  const [round, setRound] = useState(0),
    [message, setMessage] = useState(""),
    [guess, setGuess] = useState<string | null>(null),
    [pair1, setPair1] = useState<"A" | "B" | null>(null),
    [pair2, setPair2] = useState<"C" | "D" | null>(null),
    [draw, setDraw] = useState<[number, number] | null>(null),
    [shown, setShown] = useState(0),
    [showClues, setShowClues] = useState(false),
    [stage, setStage] = useState(0),
    [sent, setSent] = useState(0),
    [turn, setTurn] = useState(0),
    [pot, setPot] = useState(4),
    [finished, setFinished] = useState(false);
  if (!playIds.has(id)) return null;
  const random = () => seededRandom(seed + round * 997);
  function again() {
    setRound((r) => r + 1);
    setMessage("");
    setGuess(null);
    setPair1(null);
    setPair2(null);
    setDraw(null);
    setShown(0);
    setShowClues(false);
    setStage(0);
    setSent(0);
    setTurn(0);
    setPot(4);
    setFinished(false);
  }
  const status = (
    <p className="play-feedback" role="status" aria-live="polite">
      {message}
    </p>
  );
  if (id === "simpsons-paradox") {
    const data = simpson(s);
    return (
      <section className="play-board" aria-label="Predict the pooled result">
        <h3>Make a prediction</h3>
        <p>
          Program A succeeds more often in each difficulty group. Which program
          wins when all cases are combined?
        </p>
        <div className="play-actions">
          <Action onClick={() => setGuess("A")}>Predict A</Action>
          <Action onClick={() => setGuess("B")}>Predict B</Action>
          <Action onClick={() => setGuess("Tie")}>Predict a tie</Action>
        </div>
        {guess && (
          <>
            <div className="play-result">
              <strong>
                {guess === data.winner
                  ? "Your prediction matches the pooled result."
                  : `The pooled result favors ${data.winner}.`}
              </strong>
              <p>
                A: {num(data.a)}% overall · B: {num(data.b)}% overall.
              </p>
              <table>
                <caption>Within-group success rates</caption>
                <thead>
                  <tr>
                    <th>Case difficulty</th>
                    <th>A</th>
                    <th>B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Easy</th>
                    <td>90%</td>
                    <td>80%</td>
                  </tr>
                  <tr>
                    <th>Hard</th>
                    <td>30%</td>
                    <td>20%</td>
                  </tr>
                </tbody>
              </table>
              <p>
                A has {s.easyA}% easy cases. B has {s.easyB}% easy cases. Change
                the mix and try again.
              </p>
            </div>
            {status}
          </>
        )}
      </section>
    );
  }
  if (id === "ellsberg-urn") {
    function choose(which: "Known" | "Unknown") {
      const rng = random(),
        composition = 50 - s.width / 2 + rng() * s.width,
        red = rng() < (which === "Known" ? 0.5 : composition / 100);
      setMessage(
        `You chose the ${which.toLowerCase()} urn. The draw was ${red ? "red" : "blue"}: ${red ? "you earn 10 tokens" : "you earn 0 tokens"}. The unknown urn contained ${num(composition)}% red balls this round.`,
      );
    }
    return (
      <section className="play-board" aria-label="Choose an urn">
        <h3>Which urn would you draw from?</h3>
        <div className="play-choice-grid">
          <div>
            <strong>Known urn</strong>
            <p>Exactly 50% red · 50% blue</p>
          </div>
          <div>
            <strong>Unknown urn</strong>
            <p>
              Red share somewhere between {num(50 - s.width / 2)}% and{" "}
              {num(50 + s.width / 2)}%
            </p>
          </div>
        </div>
        <p>
          Red pays 10 tokens. Blue pays nothing. The unknown urn’s composition
          is fixed for this round but hidden until after your choice.
        </p>
        <div className="play-actions">
          <Action onClick={() => choose("Known")}>Draw from known</Action>
          <Action onClick={() => choose("Unknown")}>Draw from unknown</Action>
          {message && <Action onClick={again}>New urns</Action>}
        </div>
        {status}
      </section>
    );
  }
  if (id === "allais-paradox") {
    function reveal() {
      if (!pair1 || !pair2) return;
      const rng = random(),
        a = Math.floor(rng() * 100),
        b = Math.floor(rng() * 100);
      setDraw([a, b]);
      setMessage(
        `Pair 1: ${pair1} paid ${lotteryPayoff(pair1, a, s.prize)}. Pair 2: ${pair2} paid ${lotteryPayoff(pair2, b, s.prize)}. These are sampled outcomes; each pair had a separate draw.`,
      );
    }
    return (
      <section className="play-board" aria-label="Choose between lotteries">
        <h3>Two linked choices</h3>
        <p>
          Pair 1: A gives {s.prize} for sure. B gives {5 * s.prize} with 10%,{" "}
          {s.prize} with 89%, and zero with 1%.
        </p>
        <div className="play-actions">
          <Action onClick={() => setPair1("A")}>Choose A · certain</Action>
          <Action onClick={() => setPair1("B")}>Choose B · gamble</Action>
        </div>
        <p className="play-selection">Pair 1 choice: {pair1 ?? "choose one"}</p>
        <p>
          Pair 2: C gives {s.prize} with 11%. D gives {5 * s.prize} with 10%.
          Otherwise each gives zero.
        </p>
        <div className="play-actions">
          <Action onClick={() => setPair2("C")}>Choose C · 11%</Action>
          <Action onClick={() => setPair2("D")}>Choose D · 10%</Action>
        </div>
        <p className="play-selection">Pair 2 choice: {pair2 ?? "choose one"}</p>
        <div className="play-actions">
          <Action disabled={!pair1 || !pair2} onClick={reveal}>
            Draw both outcomes
          </Action>
          {draw && <Action onClick={again}>Choose again</Action>}
        </div>
        {draw && (
          <p className="play-note">
            {pair1 === "A" && pair2 === "D"
              ? "A with D is the classic pattern that conflicts with the expected-utility independence axiom."
              : "Compare what changed between the pairs. A single choice pattern does not diagnose how a person values risk."}
          </p>
        )}
        {status}
      </section>
    );
  }
  if (id === "information-cascade") {
    const run = cascade(seed, s.accuracy, s.people);
    return (
      <section className="play-board" aria-label="Reveal a decision cascade">
        <h3>Follow the decisions</h3>
        <p>
          The state is red or blue. Each person has a private clue and sees
          earlier actions, but not their clues.
        </p>
        <ol className="cascade-steps">
          {run.steps.slice(0, shown).map((step) => (
            <li key={step.number}>
              <span>Person {step.number}</span>
              <strong>{step.action}</strong>
              <small>
                {showClues
                  ? `Clue: ${step.signal}${step.cascade ? " · action did not depend on clue" : ""}`
                  : "Private clue hidden"}
              </small>
            </li>
          ))}
        </ol>
        <div className="play-actions">
          <Action
            disabled={shown >= s.people}
            onClick={() => setShown((n) => n + 1)}
          >
            Reveal next decision
          </Action>
          <Action
            disabled={shown === 0 || showClues}
            onClick={() => {
              setShowClues(true);
              setMessage(
                `The hidden state was ${run.truth}. Look for people who chose the same action no matter which clue they received.`,
              );
            }}
          >
            Reveal clues and state
          </Action>
          <Action disabled={shown === 0} onClick={again}>
            Start over
          </Action>
        </div>
        <p className="play-progress">
          {shown} of {s.people} decisions revealed
        </p>
        {status}
      </section>
    );
  }
  if (id === "threshold-public-good") {
    function fund() {
      const rng = random();
      let helpers = 0;
      for (let i = 0; i < 3; i++) helpers += Number(rng() < s.chance / 100);
      const total = s.pledge + 10 * helpers,
        success = total >= s.target;
      setMessage(
        `${helpers} of the three others pledged 10. Total: ${total} / ${s.target}. The project ${success ? "funded" : "failed"}; your net payoff was ${success ? 40 - s.pledge : -s.pledge}.`,
      );
      setRound((r) => r + 1);
    }
    return (
      <section className="play-board" aria-label="Fund a shared project">
        <h3>Run a funding round</h3>
        <div
          className="funding-track"
          role="img"
          aria-label={`Your pledge ${s.pledge} toward a target of ${s.target}`}
        >
          <span
            style={{ width: `${Math.min(100, (s.pledge / s.target) * 100)}%` }}
          />
        </div>
        <p>
          You pledge {s.pledge}; three others may add 10 each. Funding creates a
          benefit of 40 for each person. Your pledge is spent even if the
          project falls short.
        </p>
        <div className="play-actions">
          <Action onClick={fund}>Run funding round</Action>
        </div>
        {status}
      </section>
    );
  }
  if (id === "trust-game") {
    return (
      <section className="play-board" aria-label="Play the trust game">
        <h3>Take both roles, one at a time</h3>
        <div className="play-choice-grid">
          <div>
            <strong>Sender</strong>
            <p>Starts with 10 · proposes a transfer</p>
          </div>
          <div>
            <strong>Recipient</strong>
            <p>Gets triple the transfer · can return some</p>
          </div>
        </div>
        {stage === 0 ? (
          <div className="play-actions">
            <Action
              onClick={() => {
                setSent(s.send);
                setStage(1);
                setMessage(
                  `You sent ${s.send}. The recipient received ${3 * s.send} and can now decide what to return.`,
                );
              }}
            >
              Send {s.send} tokens
            </Action>
          </div>
        ) : stage === 1 ? (
          <div className="play-actions">
            <Action
              onClick={() => {
                const back = (3 * sent * s.return) / 100;
                setStage(2);
                setMessage(
                  `The recipient returned ${num(back)}. Sender ends with ${num(10 - sent + back)}; recipient ends with ${num(3 * sent - back)}. The combined pie grew from 10 to ${10 + 2 * sent}.`,
                );
              }}
            >
              Return {s.return}% of the tripled transfer
            </Action>
          </div>
        ) : (
          <div className="play-actions">
            <Action onClick={again}>Play another transfer</Action>
          </div>
        )}
        {status}
      </section>
    );
  }
  if (id === "centipede-game") {
    function take() {
      setFinished(true);
      setMessage(
        `You took at decision ${turn + 1}. Pot: ${pot}. You received ${num(pot * 0.8)}; the partner received ${num(pot * 0.2)}.`,
      );
    }
    function pass() {
      const next = turn + 1,
        nextPot = pot * 2,
        rng = seededRandom(seed + round * 997 + turn * 7919);
      if (next >= s.turns) {
        setTurn(next);
        setPot(nextPot);
        setFinished(true);
        setMessage(
          `You passed. The final partner decision took a pot of ${nextPot}: partner ${num(nextPot * 0.8)}, you ${num(nextPot * 0.2)}.`,
        );
        return;
      }
      const partnerPass = rng() < s.passes / 100;
      if (!partnerPass) {
        setTurn(next);
        setPot(nextPot);
        setFinished(true);
        setMessage(
          `You passed. The partner took the larger pot of ${nextPot}: partner ${num(nextPot * 0.8)}, you ${num(nextPot * 0.2)}.`,
        );
      } else {
        const after = next + 1,
          afterPot = nextPot * 2;
        setTurn(after);
        setPot(afterPot);
        if (after >= s.turns) {
          setFinished(true);
          setMessage(
            `Both passed. At the final decision you took ${num(afterPot * 0.8)} of ${afterPot}; the partner received ${num(afterPot * 0.2)}.`,
          );
        } else
          setMessage(
            `Both passed. The pot grew to ${afterPot}; it is your turn again.`,
          );
      }
    }
    return (
      <section className="play-board" aria-label="Play the centipede game">
        <h3>The growing pot</h3>
        <div className="pot-display">
          <span>
            Decision {Math.min(turn + 1, s.turns)} of {s.turns}
          </span>
          <strong>{pot} tokens</strong>
        </div>
        <p>
          Taking now gives you 80% of the current pot. Passing doubles it and
          gives the partner a chance to take. The final player always takes.
        </p>
        <div className="play-actions">
          {finished ? (
            <Action onClick={again}>Play again</Action>
          ) : (
            <>
              <Action onClick={take}>Take now</Action>
              <Action onClick={pass}>Pass and grow the pot</Action>
            </>
          )}
        </div>
        {status}
      </section>
    );
  }
  if (id === "volunteers-dilemma") {
    function decide(volunteer: boolean) {
      const rng = random();
      let others = 0;
      for (let i = 1; i < s.group; i++)
        others += Number(rng() < s.chance / 100);
      const succeeds = volunteer || others > 0;
      setMessage(
        `You ${volunteer ? "volunteered" : "waited"}; ${others} other${others === 1 ? "" : "s"} volunteered. ${succeeds ? "The shared task was done" : "Nobody did the task"}. Your payoff: ${succeeds ? 30 - (volunteer ? s.cost : 0) : 0}.`,
      );
      setRound((r) => r + 1);
    }
    return (
      <section className="play-board" aria-label="Play the volunteer dilemma">
        <h3>Act or wait?</h3>
        <p>
          One volunteer is enough for everyone to gain 30. Acting costs you{" "}
          {s.cost}. The other {s.group - 1} people decide independently.
        </p>
        <div className="play-actions">
          <Action onClick={() => decide(true)}>Volunteer</Action>
          <Action onClick={() => decide(false)}>Wait for someone else</Action>
        </div>
        {status}
      </section>
    );
  }
  if (id === "beauty-contest") {
    const bots = beautyBots(seed, s.depth);
    function submit() {
      const target =
        ((2 / 3) * (bots.reduce((a, b) => a + b, 0) + s.guess)) / 10;
      setMessage(
        `Your guess: ${s.guess}. Nine bot guesses: ${bots.map(num).join(", ")}. Two-thirds of the group average: ${num(target)}. Your distance: ${num(Math.abs(s.guess - target))}.`,
      );
    }
    return (
      <section className="play-board" aria-label="Enter the beauty contest">
        <h3>Guess the group’s target</h3>
        <p>
          Choose your number above before revealing nine bot guesses. The target
          is two-thirds of the average of all ten numbers.
        </p>
        <div className="play-actions">
          <Action onClick={submit}>Submit guess {s.guess}</Action>
        </div>
        {status}
      </section>
    );
  }
  const share = hotellingShare(s.you, s.rival);
  return (
    <section className="play-board" aria-label="Open the street">
      <h3>Two shops, one street</h3>
      <p>
        Every customer visits the nearer shop at the same price. Move either
        shop above, then reveal which parts of the street each serves.
      </p>
      <div
        className="street-map"
        role="img"
        aria-label={`Your shop at ${s.you}, rival shop at ${s.rival}. Equidistant customers split evenly.`}
      >
        <span className="shop yours" style={{ left: `${s.you}%` }}>
          You
        </span>
        <span className="shop rival" style={{ left: `${s.rival}%` }}>
          Rival
        </span>
        {Array.from({ length: 21 }, (_, i) => (
          <i
            key={i}
            className={
              Math.abs(i * 5 - s.you) === Math.abs(i * 5 - s.rival)
                ? "shared-customer"
                : Math.abs(i * 5 - s.you) < Math.abs(i * 5 - s.rival)
                  ? "your-customer"
                  : "rival-customer"
            }
            style={{ left: `${i * 5}%` }}
          />
        ))}
      </div>
      <div className="play-actions">
        <Action
          onClick={() =>
            setMessage(
              `Your shop at ${s.you} serves ${num(share)}% of uniformly spread customers. The rival at ${s.rival} serves ${num(100 - share)}%. ${s.you === s.rival ? "With both shops together, customers split evenly." : `The boundary is at ${num((s.you + s.rival) / 2)}.`}`,
            )
          }
        >
          Compare customer territories
        </Action>
      </div>
      {status}
    </section>
  );
}
