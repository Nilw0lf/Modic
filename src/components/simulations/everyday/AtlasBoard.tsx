"use client";

import { useMemo, useState } from "react";
import { atlasEntries, atlasIds } from "@/data/atlas-expansion";
import { atlasModel, braessTimes } from "@/lib/simulations/atlas";
import { seededRandom } from "@/lib/simulations/random";
import type { Settings } from "@/lib/simulations/everyday";

type Props = { id: string; settings: Settings; seed: number };
const fmt = (n: number) => Number(n.toFixed(1));
export function AtlasBoard({ id, settings: s, seed }: Props) {
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [plays, setPlays] = useState<number[]>([]);
  const [round, setRound] = useState(0);
  const entry = atlasEntries.find((x) => x.id === id);
  const candidates = useMemo(() => {
    const a = Array.from({ length: 20 }, (_, i) => i + 1),
      rng = seededRandom(seed + round * 7919 + 3);
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, [seed, round]);
  if (!atlasIds.has(id) || !entry) return null;
  const rng = seededRandom(seed + round * 7919 + step * 101);
  const finish = (text: string, answer = "done") => {
    setChoice(answer);
    setMessage(text);
  };
  const replay = () => {
    setChoice(null);
    setMessage("");
    setStep(0);
    setPlays([]);
    setRound((r) => r + 1);
  };
  const button = (label: string, action: () => void, disabled = false) => (
    <button type="button" onClick={action} disabled={disabled}>
      {label}
    </button>
  );
  let play;
  switch (id) {
    case "secretary-problem": {
      const score = candidates[step];
      play = (
        <>
          <h3>Interview {step + 1} of 20</h3>
          <p className="atlas-big">Candidate score: {score}</p>
          <p>
            Observe the first {s.skip}, then consider each later candidate. The
            reference rule hires the next new record. You can make your own
            choice after observing.
          </p>
          {step > 0 && (
            <p>
              Best score seen before this interview: {Math.max(...candidates.slice(0, step))}.
            </p>
          )}
          <div className="play-actions">
            {step === 0 &&
              s.skip > 0 &&
              button(
                `Observe first ${s.skip}`,
                () => setStep(s.skip),
                choice !== null,
              )}
            {button(
              "Keep searching",
              () => {
                if (step === 19)
                  finish(
                    `The last candidate was your only remaining option and scored ${score}. The best score was 20; ${score === 20 ? "you found it" : "try another order"}.`,
                  );
                else setStep((x) => x + 1);
              },
              choice !== null,
            )}
            {choice && button("Try a new order", replay)}
            {button(
              "Hire this candidate",
              () =>
                finish(
                  `You hired score ${score}. The best possible score was 20. ${score === 20 ? "Perfect pick!" : "A higher-scoring candidate was in the sequence."}`,
                ),
              choice !== null || step < s.skip,
            )}
          </div>
        </>
      );
      break;
    }
    case "multi-armed-bandit": {
      const wins = plays.filter((x) => x >= 3).length;
      play = (
        <>
          <h3>Three mystery machines</h3>
          <p>
            Pick a machine. Learn its odds from results.
            {plays.length >= 10 && " The hidden chances were 22%, 48% and 69%."}
          </p>
          <p className="atlas-big">
            {wins} wins in {plays.length} plays
          </p>
          <div className="play-actions">
            {[0, 1, 2].map((i) =>
              button(
                `Machine ${i + 1} · ${plays.filter((x) => x % 3 === i).length} tries`,
                () => {
                  const won = rng() < [0.22, 0.48, 0.69][i];
                  setPlays((v) => [...v, i + (won ? 3 : 0)]);
                  setStep((v) => v + 1);
                  setMessage(
                    `Machine ${i + 1}: ${won ? "win" : "no win"}. ${i === 2 ? "You tried the highest-odds machine." : "Try another to learn its rate."}`,
                  );
                },
              ),
            )}
          </div>
        </>
      );
      break;
    }
    case "gamblers-fallacy":
    case "shannon-entropy": {
      const p = id === "gamblers-fallacy" ? 0.5 : s.heads / 100;
      play = (
        <>
          <h3>
            {id === "gamblers-fallacy"
              ? `After ${s.streak} heads, pick the next side`
              : "Predict this coin toss"}
          </h3>
          <p>The next toss has a {fmt(p * 100)}% chance of heads.</p>
          <div className="play-actions">
            {["Heads", "Tails"].map((side) =>
              button(
                side,
                () => {
                  const actual = rng() < p ? "Heads" : "Tails";
                  finish(
                    `It landed ${actual}. ${side === actual ? "Your guess won this toss." : "Your guess missed this toss."} The next independent toss keeps the same odds.`,
                    side,
                  );
                },
                choice !== null,
              ),
            )}
            {choice && button("Flip again", replay)}
          </div>
        </>
      );
      break;
    }
    case "benfords-law": {
      play = (
        <>
          <h3>Guess the next leading digit</h3>
          <p>
            You picked digit {s.digit}. Draw one from the theoretical Benford
            distribution.
          </p>
          <div className="play-actions">
            {button("Draw a digit", () => {
              let q = rng(),
                actual = 9;
              for (let d = 1; d <= 9; d++) {
                q -= Math.log10(1 + 1 / d);
                if (q <= 0) {
                  actual = d;
                  break;
                }
              }
              finish(
                `Digit ${actual} appeared. ${actual === s.digit ? "You guessed it!" : "Try another digit."} A single draw cannot validate a distribution.`,
              );
            })}
          </div>
        </>
      );
      break;
    }
    case "signal-detection": {
      const real = rng() < 0.5;
      const low = Math.max(0, s.signal - 25),
        high = Math.min(100, s.signal + 25);
      const score = real ? low + (high - low) * rng() : 100 * rng();
      play = (
        <>
          <h3>Flag the mystery score</h3>
          <p className="atlas-big">Observed score {fmt(score)}</p>
          <p>
            Your threshold is {s.threshold}. Choose before revealing whether
            this case contains a signal.
          </p>
          <div className="play-actions">
            {["Flag it", "Let it pass"].map((label) =>
              button(
                label,
                () =>
                  finish(
                    `${real ? "A signal was present" : "It was noise"}. Score ${fmt(score)}. ${(label === "Flag it") === real ? "This decision matched the hidden case." : "This decision missed the hidden case."}`,
                  ),
                choice !== null,
              ),
            )}
            {choice && button("New case", replay)}
          </div>
        </>
      );
      break;
    }
    case "braess-paradox": {
      const time = braessTimes(s.traffic);
      play = (
        <>
          <h3>Open the new road?</h3>
          <p>
            At {s.traffic.toLocaleString()} cars, predict whether the zero-time
            shortcut helps everyone at selfish equilibrium.
          </p>
          <div className="play-actions">
            {button(
              "Open the shortcut",
              () =>
                finish(
                  `Open: ${fmt(time.withLink)} minutes. Closed: ${fmt(time.without)} minutes. ${time.withLink > time.without ? "The shortcut makes the equilibrium slower." : "The shortcut helps at this demand."}`,
                ),
              choice !== null,
            )}
            {button(
              "Keep it closed",
              () =>
                finish(
                  `Closed: ${fmt(time.without)} minutes. Open: ${fmt(time.withLink)} minutes. ${time.withLink > time.without ? "Keeping it closed avoids the slowdown." : "At this demand, opening helps."}`,
                ),
              choice !== null,
            )}
          </div>
        </>
      );
      break;
    }
    case "framing-effect": {
      const n = s["at-risk"],
        save = fmt(n / 3);
      play = (
        <>
          <h3>Two descriptions, one decision</h3>
          <p>
            Gain frame: save {save} people for sure, or a 1-in-3 chance to save
            all {n}.
          </p>
          <div className="play-actions">
            {["Safe in gains", "Gamble in gains"].map((x) =>
              button(
                x,
                () => {
                  setChoice(x);
                  setStep(1);
                  setMessage(
                    "Now read the same outcomes in the loss frame below.",
                  );
                },
                step > 0,
              ),
            )}
          </div>
          {step === 1 && (
            <>
              <p>
                Loss frame: {fmt((n * 2) / 3)} die for sure, or a 1-in-3 chance
                nobody dies and a 2-in-3 chance all die.
              </p>
              <div className="play-actions">
                {["Safe in losses", "Gamble in losses"].map((x) =>
                  button(x, () => {
                    finish(
                      `You chose ${choice} and ${x}. The two safe descriptions are identical, as are the two gambles. Compare how the framing felt.`,
                      x,
                    );
                    setStep(2);
                  }),
                )}
              </div>
            </>
          )}
          {step === 2 && (
            <div className="play-actions">
              {button("Try both frames again", replay)}
            </div>
          )}
        </>
      );
      break;
    }
    case "endowment-effect": {
      play = (
        <>
          <h3>Same item, two roles</h3>
          <p>
            Your value is {s.value}; the offered price is {s.price}. First
            imagine you do not own it.
          </p>
          <div className="play-actions">
            {["Buy", "Pass"].map((x) =>
              button(
                x,
                () => {
                  setChoice(x);
                  setStep(1);
                  setMessage(
                    `As a buyer you chose ${x}. Now imagine you own the item.`,
                  );
                },
                step > 0,
              ),
            )}
          </div>
          {step === 1 && (
            <div className="play-actions">
              {["Sell", "Keep"].map((x) =>
                button(x, () => {
                  finish(
                    `Buyer: ${choice}. Owner: ${x}. The neutral value-minus-price benchmark is ${s.value - s.price}. Did ownership change your answer?`,
                    x,
                  );
                  setStep(2);
                }),
              )}
            </div>
          )}
          {step === 2 && (
            <div className="play-actions">
              {button("Try both roles again", replay)}
            </div>
          )}
        </>
      );
      break;
    }
    case "decoy-effect": {
      play = (
        <>
          <h3>Choose a plan twice</h3>
          <p>
            A: quality 70, price 40. B: quality 90, price 70. Pick one before
            seeing another option.
          </p>
          <div className="play-actions">
            {["A", "B"].map((x) =>
              button(
                x,
                () => {
                  setChoice(x);
                  setStep(1);
                  setMessage(`First choice: ${x}. Now the decoy appears.`);
                },
                step > 0,
              ),
            )}
          </div>
          {step === 1 && (
            <>
              <p>
                Decoy: quality {fmt(70 + (20 * s.decoy) / 100)}, price 70. B is
                at least as good and no more expensive.
              </p>
              <div className="play-actions">
                {["A", "B", "Decoy"].map((x) =>
                  button(x, () => {
                    finish(
                      `You chose ${choice} before and ${x} after the decoy. ${choice === x ? "Your choice stayed the same." : "The choice set changed your decision."}`,
                      x,
                    );
                    setStep(2);
                  }),
                )}
              </div>
            </>
          )}
          {step === 2 && (
            <div className="play-actions">
              {button("Try the choices again", replay)}
            </div>
          )}
        </>
      );
      break;
    }
    case "peak-end-rule": {
      const a = [6, 6, 6, 6, s.ending],
        b = [4, 7, 7, 7, 6];
      play = (
        <>
          <h3>Which sequence would you repeat?</h3>
          <p>
            A: {a.join(" · ")}. B: {b.join(" · ")}. Think about the whole
            sequence and its ending.
          </p>
          <div className="play-actions">
            {["A", "B"].map((x) =>
              button(
                `Repeat ${x}`,
                () => {
                  const avg = (v: number[]) =>
                    fmt(v.reduce((p, q) => p + q, 0) / v.length);
                  finish(
                    `You picked ${x}. A averages ${avg(a)} and has peak–end ${fmt((Math.max(...a) + s.ending) / 2)}; B averages ${avg(b)} and has peak–end 6.5. Which summary matched your intuition?`,
                  );
                },
                choice !== null,
              ),
            )}
          </div>
        </>
      );
      break;
    }
    case "planning-fallacy": {
      const days = s.estimate + Math.floor(rng() * 13);
      const budget = fmt(s.estimate * (1 + s.buffer / 100));
      play = (
        <>
          <h3>Will the project meet your deadline?</h3>
          <p>
            You estimated {s.estimate} days and budgeted {budget} with your
            buffer.
          </p>
          <div className="play-actions">
            {button("Reveal completion", () =>
              finish(
                `This sample project took ${days} days. ${days <= Number(budget) ? "It met the budget." : "It ran late."} Look at the 100-project distribution below for a better sense of the risk.`,
              ),
            )}
          </div>
        </>
      );
      break;
    }
    case "median-voter": {
      const votes = atlasModel(id, s, seed).stats[0][1];
      play = (
        <>
          <h3>Run the election</h3>
          <p>
            Your position: {s.you}. Rival: {s.rival}. Voters select the nearer
            position.
          </p>
          <div className="play-actions">
            {button("Count the votes", () =>
              finish(
                `Your platform received ${votes} of the vote. Try moving and see which voters switch sides.`,
              ),
            )}
          </div>
        </>
      );
      break;
    }
    case "el-farol-bar": {
      const sample = Number(atlasModel(id, s, seed + round * 7919).stats[0][1]);
      play = (
        <>
          <h3>Go to the bar tonight?</h3>
          <p>
            Comfort limit: {s.capacity} people. The crowd shares an expectation
            of {s.expect}% attendance.
          </p>
          <div className="play-actions">
            {button(
              "Go",
              () =>
                finish(
                  `${sample} others went. Total with you: ${sample + 1}. ${sample + 1 <= s.capacity ? "You found a comfortable night (+1)." : "It was too crowded (−1)."}`,
                ),
              choice !== null,
            )}
            {button(
              "Stay home",
              () =>
                finish(
                  `${sample} others went. You stayed home (0). ${sample + 1 <= s.capacity ? "You could have enjoyed a comfortable night." : "You avoided the crowd."}`,
                ),
              choice !== null,
            )}
            {choice && button("Try another night", replay)}
          </div>
        </>
      );
      break;
    }
    case "tullock-contest": {
      const chance = s.effort / (s.effort + s.rival);
      play = (
        <>
          <h3>Enter the contest</h3>
          <p>
            You spend {s.effort}; your rival spends {s.rival}. The winner gets
            100, but both pay their effort.
          </p>
          <div className="play-actions">
            {button("Draw a winner", () => {
              const won = rng() < chance;
              finish(
                `${won ? "You won" : "Your rival won"}. Your net payoff is ${won ? 100 - s.effort : -s.effort}. Your win chance was ${fmt(chance * 100)}%.`,
              );
            })}
          </div>
        </>
      );
      break;
    }
    default: {
      const base = Object.fromEntries(
        entry.controls.map((x) => [x.key, x.value]),
      );
      const before = atlasModel(id, base, seed),
        after = atlasModel(id, s, seed);
      const first = after.stats[0][0];
      const a = parseFloat(before.stats[0][1]),
        b = parseFloat(after.stats[0][1]);
      const changed = entry.controls.some((x) => s[x.key] !== x.value);
      play = (
        <>
          <h3>Make a prediction</h3>
          <p>
            Move a control above. Compared with the starting setup, will{" "}
            <strong>{first.toLowerCase()}</strong> rise, fall or stay the same?
          </p>
          <div className="play-actions">
            {["Rise", "Fall", "Stay the same"].map((x) =>
              button(x, () => {
                if (!changed) {
                  setMessage(
                    "First move a control above, then make a prediction.",
                  );
                  return;
                }
                const answer =
                  b > a + 1e-6
                    ? "Rise"
                    : b < a - 1e-6
                      ? "Fall"
                      : "Stay the same";
                finish(
                  `${x === answer ? "Good call!" : "A useful surprise."} ${first}: ${before.stats[0][1]} → ${after.stats[0][1]}. The result ${answer.toLowerCase()}.`,
                  x,
                );
              }),
            )}
          </div>
        </>
      );
    }
  }
  return (
    <section
      className="play-board atlas-board"
      aria-label={`Play ${entry.name}`}
    >
      <div className="atlas-board-heading">
        <span>PLAY THE IDEA</span>
        <span>
          {id === "multi-armed-bandit" ? "Try several rounds" : "Make a choice"}
        </span>
      </div>
      {play}
      <p className="play-feedback" role="status" aria-live="polite">
        {message || "Choose a move to see what happens."}
      </p>
    </section>
  );
}
