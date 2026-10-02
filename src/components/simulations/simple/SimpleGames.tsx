"use client";
import { useState } from "react";
import type { Settings } from "@/lib/simulations/everyday";
import { seededRandom } from "@/lib/simulations/random";
import {
  informationValues,
  minorityRound,
  pointingDifficulty,
  rpsBot,
  rpsPayoff,
} from "@/lib/simulations/simple";
const n = (value: number) => Number(value.toFixed(1));
const colors = ["Red", "Blue", "Green"];
const inks = ["#bf3b4d", "#407dcc", "#23886e"];

function StroopGame({ seed }: { seed: number }) {
  const [trial, setTrial] = useState(0),
    [started, setStarted] = useState<number | null>(null),
    [times, setTimes] = useState<{ matching: boolean; ms: number }[]>([]),
    [errors, setErrors] = useState(0),
    [message, setMessage] = useState("");
  const rng = seededRandom(seed + trial * 991),
    ink = Math.floor(rng() * 3),
    matching = trial % 2 === 0,
    word = matching ? ink : (ink + 1 + Math.floor(rng() * 2)) % 3;
  const mean = (condition: boolean) => {
    const chosen = times.filter((t) => t.matching === condition);
    return chosen.length
      ? `${Math.round(chosen.reduce((sum, t) => sum + t.ms, 0) / chosen.length)} ms`
      : "Not yet";
  };
  return (
    <>
      <h3>Name the ink</h3>
      <p>
        Eight trials. Read the color of the letters, rather than the word.
        Matching and conflicting trials alternate.
      </p>
      {trial < 8 ? (
        <>
          {started === null ? (
            <button
              onClick={() => {
                setStarted(performance.now());
                setMessage("");
              }}
            >
              Start trial {trial + 1}
            </button>
          ) : (
            <>
              <div
                className="stroop-word"
                role="img"
                style={{ color: inks[ink] }}
                aria-label={`Word ${colors[word]} printed in ${colors[ink]} ink`}
              >
                {colors[word].toUpperCase()}
              </div>
              <div className="play-actions">
                {colors.map((color, i) => (
                  <button
                    key={color}
                    onClick={() => {
                      if (i !== ink) {
                        setErrors((e) => e + 1);
                        setMessage("That is not the ink color. Try again.");
                        return;
                      }
                      const ms = performance.now() - started;
                      setTimes((t) => [...t, { matching, ms }]);
                      setTrial((t) => t + 1);
                      setStarted(null);
                      setMessage(
                        `Correct. ${matching ? "Matching" : "Conflicting"} trial: ${Math.round(ms)} ms.`,
                      );
                    }}
                  >
                    {color} ink
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <p>
          Round complete. Compare the two small samples; either order is
          possible.
        </p>
      )}
      <div className="simple-score">
        <span>Matching: {mean(true)}</span>
        <span>Conflicting: {mean(false)}</span>
        <span>Wrong answers: {errors}</span>
      </div>
      <p className="play-feedback" role="status">
        {message || "Press Start when you are ready."}
      </p>
      <p className="small-note">
        Device and practice affect timing. Screen readers announce both cues;
        these times are not a visual-task comparison.
      </p>
    </>
  );
}
function PointingGame({ settings: s }: { settings: Settings }) {
  const [start, setStart] = useState<{
      time: number;
      width: number;
      distance: number;
    } | null>(null),
    [history, setHistory] = useState<
      { ms: number; width: number; distance: number }[]
    >([]);
  const target = start ?? s;
  return (
    <>
      <h3>Hit the target</h3>
      <p>
        Press Start, then select Target. Try different sizes and distances.
        Keyboard selection remains available, but does not measure pointing
        movement.
      </p>
      <div className="pointing-arena">
        <button
          className="pointing-start"
          disabled={start !== null}
          onClick={() =>
            setStart({
              time: performance.now(),
              width: s.width,
              distance: s.distance,
            })
          }
        >
          Start
        </button>
        <button
          className="pointing-target"
          style={{
            left: `${10 + target.distance}%`,
            width: `${target.width}%`,
          }}
          disabled={start === null}
          onClick={() => {
            setHistory((h) =>
              [
                ...h,
                {
                  ms: performance.now() - start!.time,
                  width: start!.width,
                  distance: start!.distance,
                },
              ].slice(-6),
            );
            setStart(null);
          }}
        >
          Target
        </button>
      </div>
      <div className="simple-score">
        <span>
          Difficulty index:{" "}
          {n(pointingDifficulty(target.distance, target.width))} bits
        </span>
        <span>Recent attempts: {history.length}</span>
      </div>
      <p className="play-feedback" role="status">
        {history.length
          ? `Last selection: ${Math.round(history.at(-1)!.ms)} ms. Compare attempts with their target settings below.`
          : "Start from the same position each time. The index is theoretical; your times are measured."}
      </p>
      {Boolean(history.length) && (
        <table className="simple-history">
          <caption>Last six selections</caption>
          <thead>
            <tr>
              <th scope="col">Width</th>
              <th scope="col">Distance</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((result, i) => (
              <tr key={i}>
                <td>{result.width}%</td>
                <td>{result.distance}%</td>
                <td>{Math.round(result.ms)} ms</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
function ChoiceTimeGame({
  settings: s,
  seed,
}: {
  settings: Settings;
  seed: number;
}) {
  const [round, setRound] = useState(0),
    [start, setStart] = useState<{ time: number; choices: number } | null>(
      null,
    ),
    [times, setTimes] = useState<{ ms: number; choices: number }[]>([]),
    [message, setMessage] = useState("");
  const count = start?.choices ?? s.choices;
  const rng = seededRandom(seed + round * 127),
    target = Math.floor(rng() * count);
  const items = Array.from({ length: count }, (_, i) => ({
    i,
    key: rng(),
  })).sort((a, b) => a.key - b.key);
  return (
    <>
      <h3>Find the requested item</h3>
      <p>
        Each menu item has the same chance of being requested. Increase the menu
        size and try several rounds.
      </p>
      {start === null ? (
        <button
          onClick={() => {
            setStart({ time: performance.now(), choices: s.choices });
            setMessage("");
          }}
        >
          Start search
        </button>
      ) : (
        <>
          <p className="simple-prompt">
            Find item {String.fromCharCode(65 + target)}
          </p>
          <div className="choice-grid">
            {items.map(({ i }) => (
              <button
                key={i}
                onClick={() => {
                  if (i !== target) {
                    setMessage("That is a different item. Keep looking.");
                    return;
                  }
                  const elapsed = performance.now() - start.time;
                  setTimes((t) =>
                    [...t, { ms: elapsed, choices: start.choices }].slice(-6),
                  );
                  setStart(null);
                  setRound((r) => r + 1);
                  setMessage(
                    `Found item ${String.fromCharCode(65 + target)} in ${Math.round(elapsed)} ms.`,
                  );
                }}
              >
                Item {String.fromCharCode(65 + i)}
              </button>
            ))}
          </div>
        </>
      )}
      <div className="simple-score">
        <span>Choice uncertainty: {n(Math.log2(count))} bits</span>
        <span>Recent rounds: {times.length}</span>
      </div>
      <p className="play-feedback" role="status">
        {message || "Timing starts when the requested item appears."}
      </p>
      {Boolean(times.length) && (
        <table className="simple-history">
          <caption>Last six searches</caption>
          <thead>
            <tr>
              <th scope="col">Menu items</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {times.map((result, i) => (
              <tr key={i}>
                <td>{result.choices}</td>
                <td>{Math.round(result.ms)} ms</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
export const calibrationQuestions = [
  {
    prompt:
      "A fair independent coin lands heads four times. Chance of heads next?",
    answers: ["50%", "Less than 50%"],
    correct: 0,
    why: "An independent fair toss has no memory of the streak.",
  },
  {
    prompt: "Which can have the greater probability?",
    answers: ["A happens", "A and B both happen"],
    correct: 0,
    why: "The conjunction is contained inside A. It cannot be more probable than A.",
  },
  {
    prompt: "100 increases by 20%, then falls by 20%. What remains?",
    answers: ["100", "96"],
    correct: 1,
    why: "100 × 1.2 × 0.8 = 96. Equal percentage gains and losses do not cancel.",
  },
  {
    prompt: "What is the median of 1, 2 and 100?",
    answers: ["2", "About 34.3"],
    correct: 0,
    why: "The median is the middle ordered value, 2. The mean is about 34.3.",
  },
  {
    prompt:
      "At equal cost and severity, which prevents more expected incidents?",
    answers: ["Eliminate a source of 5", "Reduce a source by 15"],
    correct: 1,
    why: "Preventing 15 reduces the total more than preventing 5, under these stated assumptions.",
  },
];
function CalibrationGame() {
  const [index, setIndex] = useState(0),
    [confidence, setConfidence] = useState(70),
    [answer, setAnswer] = useState<number | null>(null),
    [results, setResults] = useState<
      { confidence: number; correct: boolean }[]
    >([]);
  const q = calibrationQuestions[index],
    finished = index >= calibrationQuestions.length;
  const accuracy = results.length
      ? (100 * results.filter((r) => r.correct).length) / results.length
      : 0,
    average = results.length
      ? results.reduce((sum, r) => sum + r.confidence, 0) / results.length
      : 0;
  return (
    <>
      <h3>Confidence before feedback</h3>
      <p>
        This is a five-question calibration exercise, not a measure of overall
        intelligence or expertise.
      </p>
      {!finished ? (
        <>
          <p className="simple-prompt">
            {index + 1}/5 · {q.prompt}
          </p>
          <label className="confidence-control" htmlFor="quiz-confidence">
            Confidence in your answer: <strong>{confidence}%</strong>
            <input
              id="quiz-confidence"
              type="range"
              min="50"
              max="100"
              step="10"
              value={confidence}
              disabled={answer !== null}
              onChange={(e) => setConfidence(Number(e.target.value))}
            />
          </label>
          <div className="play-actions">
            {q.answers.map((text, i) => (
              <button
                key={text}
                disabled={answer !== null}
                onClick={() => {
                  setAnswer(i);
                  setResults((r) => [
                    ...r,
                    { confidence, correct: i === q.correct },
                  ]);
                }}
              >
                {text}
              </button>
            ))}
          </div>
          {answer !== null && (
            <>
              <p className="play-feedback" role="status">
                {answer === q.correct
                  ? "Correct. "
                  : "Different from the correct answer. "}
                {q.why}
              </p>
              <button
                onClick={() => {
                  setIndex((i) => i + 1);
                  setAnswer(null);
                  setConfidence(70);
                }}
              >
                {index === 4 ? "See calibration summary" : "Next question"}
              </button>
            </>
          )}
        </>
      ) : (
        <div className="play-feedback" role="status">
          <strong>Round complete</strong>
          <p>
            Accuracy: {n(accuracy)}%. Average confidence: {n(average)}%.
            Confidence minus accuracy: {n(average - accuracy)} percentage
            points.
          </p>
          <p>
            Five answers are too few for a reliable calibration judgment. Keep
            recording comparable predictions over time.
          </p>
        </div>
      )}
    </>
  );
}
export function SimpleGames({
  id,
  settings: s,
  seed,
}: {
  id: string;
  settings: Settings;
  seed: number;
}) {
  const [first, setFirst] = useState<string | null>(null),
    [second, setSecond] = useState<string | null>(null),
    [revealed, setRevealed] = useState(false),
    [message, setMessage] = useState(""),
    [round, setRound] = useState(0),
    [score, setScore] = useState(0),
    [plan, setPlan] = useState("plus"),
    [defaultPlan, setDefaultPlan] = useState("plus");
  if (id === "stroop-effect") return <StroopGame seed={seed} />;
  if (id === "fitts-law") return <PointingGame settings={s} />;
  if (id === "hicks-law") return <ChoiceTimeGame settings={s} seed={seed} />;
  if (id === "dunning-kruger-effect") return <CalibrationGame />;
  const feedback = (
    <p className="play-feedback" role="status" aria-live="polite">
      {message}
    </p>
  );
  if (id === "conjunction-fallacy")
    return (
      <>
        <h3>Which statement is more probable?</h3>
        <p>
          Alex loves quiet reading and volunteers for environmental campaigns.
          The first statement includes librarians who also volunteer.
        </p>
        <div className="play-actions">
          <button
            onClick={() =>
              setMessage(
                "The broad statement is at least as probable. Every wildlife-volunteering librarian is also a librarian; no independence assumption is needed.",
              )
            }
          >
            Alex is a librarian
          </button>
          <button
            onClick={() =>
              setMessage(
                "The conjunction can feel like a better story, but it is a subset: every wildlife-volunteering librarian is also a librarian. The narrower statement cannot be more probable.",
              )
            }
          >
            Alex is a librarian and volunteers for wildlife protection
          </button>
        </div>
        {feedback}
      </>
    );
  if (id === "availability-heuristic")
    return (
      <>
        <h3>Predict from the feed</h3>
        <ul className="headline-feed">
          <li>A spectacular failure shuts a system down</li>
          <li>Another dramatic failure gets attention</li>
          <li>Routine delay reported</li>
          <li>A third failure makes the headlines</li>
          <li>Fourth failure sparks discussion</li>
        </ul>
        <p>
          Which kind is more common in the complete fictional incident record?
        </p>
        <div className="play-actions">
          <button
            onClick={() =>
              setMessage(
                "Full record: 80 routine delays and 20 spectacular failures. The five-story feed overrepresents failures; prominence and frequency differ.",
              )
            }
          >
            Routine delays
          </button>
          <button
            onClick={() =>
              setMessage(
                "Full record: 80 routine delays and 20 spectacular failures. Four failure headlines made the rarer category more visible. Severity is a separate question.",
              )
            }
          >
            Spectacular failures
          </button>
        </div>
        {feedback}
      </>
    );
  if (id === "halo-effect")
    return (
      <>
        <h3>Choose for work-sample performance</h3>
        <div className="simple-cards">
          <div>
            <span className="eyebrow">CANDIDATE A</span>
            <h4>Polished presentation</h4>
            <p>Confident delivery and a memorable introduction.</p>
            {revealed && <strong>Work sample: 62/100</strong>}
          </div>
          <div>
            <span className="eyebrow">CANDIDATE B</span>
            <h4>Quiet presentation</h4>
            <p>Brief answers and an understated introduction.</p>
            {revealed && <strong>Work sample: 88/100</strong>}
          </div>
        </div>
        <div className="play-actions">
          {["A", "B"].map((candidate) => (
            <button
              key={candidate}
              onClick={() => {
                setFirst(candidate);
                setMessage(
                  revealed
                    ? `You chose ${candidate} after seeing the scores. B has the higher score on the defined task. Presentation need not predict work quality.`
                    : `Initial choice: ${candidate}. Reveal the relevant work evidence before deciding again.`,
                );
              }}
            >
              Choose {candidate}
            </button>
          ))}
          <button
            disabled={!first || revealed}
            onClick={() => {
              setRevealed(true);
              setMessage(
                "Work samples revealed. Choose again using the defined objective; these invented candidates do not measure your bias.",
              );
            }}
          >
            Reveal work samples
          </button>
        </div>
        {feedback}
      </>
    );
  if (id === "mental-accounting")
    return (
      <>
        <h3>Two losses, one remaining budget</h3>
        <div className="simple-cards">
          <div>
            <h4>You lost a ticket</h4>
            <p>
              Start with 100, spend 20 on a non-refundable ticket, then lose it.
            </p>
            <button onClick={() => setFirst("buy")}>
              Replace the lost ticket
            </button>
            <button onClick={() => setFirst("skip")}>Skip replacement</button>
            <p>Your choice: {first ?? "Not yet"}</p>
          </div>
          <div>
            <h4>You lost some cash</h4>
            <p>
              Start with 100, lose 20 cash, then consider the same 20-unit
              ticket.
            </p>
            <button onClick={() => setSecond("buy")}>
              Buy after losing cash
            </button>
            <button onClick={() => setSecond("skip")}>
              Skip after losing cash
            </button>
            <p>Your choice: {second ?? "Not yet"}</p>
          </div>
        </div>
        {first && second && (
          <p className="play-feedback" role="status">
            Buying in either case leaves 60 spendable units and one ticket.
            Skipping leaves 80 and no ticket.{" "}
            {first === second
              ? "You treated both situations consistently."
              : "Your choices differ despite the same forward budget; the account label may have mattered."}
          </p>
        )}
      </>
    );
  if (id === "zero-risk-bias")
    return (
      <>
        <h3>Where would you spend the safety budget?</h3>
        <p>
          Source A: 5 expected incidents. Source B: 50. Equal cost, equal
          severity, no interactions.
        </p>
        <div className="play-actions">
          <button
            onClick={() =>
              setMessage(
                "Eliminating A leaves 50 expected incidents: 5 prevented. It removes one source completely, but the other option prevents more comparable incidents.",
              )
            }
          >
            Eliminate all 5 from A
          </button>
          <button
            onClick={() =>
              setMessage(
                "Reducing B by 15 leaves 5 + 35 = 40 expected incidents: 15 prevented. Neither source reaches zero, but the total reduction is larger.",
              )
            }
          >
            Prevent 15 from B
          </button>
        </div>
        {feedback}
      </>
    );
  if (id === "default-effect")
    return (
      <>
        <h3>Confirm a plan</h3>
        <p>
          Both plans include the same core service. Plus adds an optional
          feature. The starting selection is not a recommendation.
        </p>
        <fieldset className="simple-plans">
          <legend>Choose your plan</legend>
          {["basic", "plus"].map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="practice-plan"
                checked={plan === value}
                onChange={() => setPlan(value)}
              />
              {value === "basic"
                ? "Basic · 10 units"
                : "Plus · 16 units, optional extra"}
            </label>
          ))}
        </fieldset>
        <div className="play-actions">
          <button
            onClick={() =>
              setMessage(
                `Confirmed ${plan}. Default was ${defaultPlan}; price and features stay the same when the default changes.`,
              )
            }
          >
            Confirm plan
          </button>
          <button
            onClick={() => {
              const next = defaultPlan === "plus" ? "basic" : "plus";
              setDefaultPlan(next);
              setPlan(next);
              setMessage(
                `The starting selection is now ${next}. Only the default changed; compare the same offers again.`,
              );
            }}
          >
            Switch the default
          </button>
        </div>
        {feedback}
      </>
    );
  if (id === "value-of-information")
    return (
      <>
        <h3>Make the project decision</h3>
        <p>
          Launch pays +80 if successful and −40 otherwise. Skip pays zero. The
          paid clue reveals the outcome perfectly before you act.
        </p>
        <div className="play-actions">
          {["Launch now", "Skip project", "Buy perfect information"].map(
            (action, i) => (
              <button
                key={action}
                onClick={() => {
                  const success =
                    seededRandom(seed + round * 991)() < s.success / 100;
                  const result =
                    i === 0
                      ? success
                        ? 80
                        : -40
                      : i === 1
                        ? 0
                        : (success ? 80 : 0) - s.cost;
                  const values = informationValues(s.success / 100, s.cost);
                  setRound((r) => r + 1);
                  setMessage(
                    `${action}: realized payoff ${result}. ${i === 2 ? `The clue revealed ${success ? "success, so you launched" : "failure, so you skipped"}.` : ""} Expected payoffs: launch ${n(values.launch)}, skip 0, buy clue ${n(values.net)}. One outcome does not rank the policies.`,
                  );
                }}
              >
                {action}
              </button>
            ),
          )}
        </div>
        {feedback}
      </>
    );
  if (id === "tragedy-of-the-anticommons")
    return (
      <>
        <h3>Assemble the permissions?</h3>
        <p>
          Project value: 60. Required permissions: {s.owners}. Each fee: {s.fee}
          . All holders must agree to the paid license.
        </p>
        <div
          className="permission-strip"
          aria-label={`${s.owners} required permissions`}
        >
          {Array.from({ length: s.owners }, (_, i) => (
            <span key={i}>
              #{i + 1}
              <strong>{s.fee}</strong>
            </span>
          ))}
        </div>
        <div className="play-actions">
          <button
            onClick={() =>
              setMessage(
                `Proceeding pays 60 − ${s.owners} × ${s.fee} = ${60 - s.owners * s.fee}. ${60 > s.owners * s.fee ? "The project clears the fee barrier." : "Fees meet or exceed the value. Abstaining pays zero."}`,
              )
            }
          >
            Proceed with project
          </button>
          <button
            onClick={() =>
              setMessage(
                `Abstaining pays 0. Proceeding would pay ${60 - s.owners * s.fee}. Lowering combined fees can change viability without changing the resource itself.`,
              )
            }
          >
            Abstain
          </button>
        </div>
        {feedback}
      </>
    );
  if (id === "minority-game" || id === "rock-paper-scissors") {
    const choices =
      id === "minority-game"
        ? ["Choose side A", "Choose side B"]
        : ["Rock", "Paper", "Scissors"];
    return (
      <>
        <h3>
          {id === "minority-game"
            ? "Find the smaller crowd"
            : "Can you use the bot's bias?"}
        </h3>
        <p>
          {id === "minority-game"
            ? "There are 100 bots plus you. The smaller side scores one point."
            : "Win +1, draw 0, lose −1. The bot uses the displayed probability and does not react to your current move."}
        </p>
        <div className="play-actions">
          {choices.map((choice, i) => (
            <button
              key={choice}
              onClick={() => {
                const rng = seededRandom(seed + round * 997);
                if (id === "minority-game") {
                  const result = minorityRound(s.aChance / 100, i === 0, rng);
                  setScore((v) => v + Number(result.won));
                  setMessage(
                    `A: ${result.a}; B: ${result.b}. You ${result.won ? "joined the minority and scored 1" : "joined the majority and scored 0"}. Your choice is included.`,
                  );
                } else {
                  const bot = rpsBot(s.rock / 100, rng),
                    payoff = rpsPayoff(i, bot);
                  setScore((v) => v + payoff);
                  setMessage(
                    `You: ${choice}. Bot: ${choices[bot]}. ${payoff === 1 ? "You win +1." : payoff === 0 ? "A draw, 0." : "You lose −1."}`,
                  );
                }
                setRound((v) => v + 1);
              }}
            >
              {choice}
            </button>
          ))}
        </div>
        <div className="simple-score">
          <span>Rounds: {round}</span>
          <span>Total score: {score}</span>
        </div>
        {feedback}
      </>
    );
  }
  return null;
}
