"use client";
import { useState } from "react";
import {
  factoryBadges,
  ruleValue,
  shipState,
  squaredError,
  zenoStep,
} from "@/lib/simulations/philosophy";
export function ShipBoard() {
  const [replaced, setReplaced] = useState<number[]>([]),
    [rebuilt, setRebuilt] = useState<number[]>([]),
    [answer, setAnswer] = useState(""),
    s = shipState(replaced);
  return (
    <>
      <div className="philo-ships">
        <div>
          <h3>Maintained ship</h3>
          <p>Click an original plank to replace it.</p>
          <div className="philo-hull">
            {Array.from({ length: 8 }, (_, i) => (
              <button
                key={i}
                disabled={replaced.includes(i)}
                className={replaced.includes(i) ? "new-plank" : ""}
                aria-label={`Replace plank ${i + 1}`}
                onClick={() => setReplaced((v) => [...v, i])}
              >
                {replaced.includes(i) ? "New" : "Original"} {i + 1}
              </button>
            ))}
          </div>
          <p>{s.aboard}/8 original planks still aboard</p>
        </div>
        <div>
          <h3>Reconstructed ship</h3>
          <p>Move stored originals into a second hull.</p>
          <div className="philo-hull">
            {Array.from({ length: 8 }, (_, i) => (
              <button
                key={i}
                disabled={!replaced.includes(i) || rebuilt.includes(i)}
                className={rebuilt.includes(i) ? "old-plank" : ""}
                aria-label={`Reassemble original plank ${i + 1}`}
                onClick={() => setRebuilt((v) => [...v, i])}
              >
                {rebuilt.includes(i)
                  ? "Original"
                  : replaced.includes(i)
                    ? "Stored"
                    : "Awaiting"}{" "}
                {i + 1}
              </button>
            ))}
          </div>
          <p>
            {rebuilt.length}/8 originals reassembled ·{" "}
            {replaced.length - rebuilt.length} in storage
          </p>
        </div>
      </div>
      <div className="play-actions">
        <button onClick={() => setReplaced([0, 1, 2, 3, 4, 5, 6, 7])}>
          Replace all remaining planks
        </button>
        <button
          disabled={replaced.length === rebuilt.length}
          onClick={() => setRebuilt([...replaced])}
        >
          Reassemble stored originals
        </button>
      </div>
      <fieldset className="philo-reasons">
        <legend>Which is the original ship under your criterion?</legend>
        {[
          "Maintained ship",
          "Reconstructed ship",
          "Neither",
          "The criterion needs clarification",
        ].map((v) => (
          <button
            key={v}
            aria-pressed={answer === v}
            onClick={() => setAnswer(v)}
          >
            {v}
          </button>
        ))}
      </fieldset>
      <p role="status" className="play-feedback">
        {answer
          ? `You chose: ${answer}. Maintained history and original material now point toward different candidates; plank counts alone do not settle identity.`
          : "Track where every original goes, then explain which kind of continuity matters to your answer."}
      </p>
    </>
  );
}
export function SoritesBoard() {
  const [grains, setGrains] = useState(1),
    [records, setRecords] = useState<{ count: number; label: string }[]>([]);
  const sorted = [...records].sort((a, b) => a.count - b.count),
    boundaries = sorted
      .slice(1)
      .filter(
        (r, i) =>
          r.count - sorted[i].count === 1 && r.label !== sorted[i].label,
      );
  function record(label: string) {
    setRecords((v) => [
      ...v.filter((r) => r.count !== grains),
      { count: grains, label },
    ]);
  }
  return (
    <>
      <div
        className="philo-pile"
        role="img"
        aria-label={`${grains} grains in a small pile`}
      >
        {Array.from({ length: grains }, (_, i) => (
          <i key={i} style={{ transform: `rotate(${(i * 37) % 90}deg)` }} />
        ))}
      </div>
      <p className="philo-mission">
        {grains} grains · What would you call this?
      </p>
      <div className="play-actions">
        {[-10, -1, 1, 10].map((delta) => (
          <button
            key={delta}
            disabled={grains + delta < 1 || grains + delta > 60}
            onClick={() => setGrains((g) => g + delta)}
          >
            {delta > 0 ? "+" : ""}
            {delta} grain{Math.abs(delta) === 1 ? "" : "s"}
          </button>
        ))}
      </div>
      <div className="play-actions">
        {["Not a heap", "Borderline", "Heap"].map((label) => (
          <button
            key={label}
            aria-pressed={
              records.find((r) => r.count === grains)?.label === label
            }
            onClick={() => record(label)}
          >
            {label}
          </button>
        ))}
      </div>
      <p role="status" className="play-feedback">
        {boundaries.length
          ? `${boundaries.length} adjacent recorded pair(s) have different labels. Is that an operational decision boundary, a semantic fact, or a place to remain unsure?`
          : "Classify several neighbouring counts. A small change can feel negligible even when repeated changes reach a clearly different case."}
      </p>
      <ol className="philo-ledger">
        {sorted.map((r) => (
          <li key={r.count}>
            {r.count} grains: {r.label}
          </li>
        ))}
      </ol>
      <p className="philo-note">
        No correct grain threshold is built into this activity.
      </p>
    </>
  );
}
export function RazorBoard() {
  const [curve, setCurve] = useState(false),
    [choice, setChoice] = useState<boolean | null>(null),
    [revealed, setRevealed] = useState(false);
  return (
    <>
      <div className="philo-observations">
        {[1, 2, 3].map((x) => (
          <div key={x}>
            <span>x = {x}</span>
            <strong>Observed {2 * x}</strong>
          </div>
        ))}
      </div>
      <div className="philo-rule-grid">
        {[false, true].map((c) => (
          <button
            key={String(c)}
            className="philo-policy"
            disabled={revealed}
            aria-pressed={choice === c}
            onClick={() => setChoice(c)}
          >
            <h3>{c ? "Elaborate rule" : "Short rule"}</h3>
            <p>{c ? "2x + (x−1)(x−2)(x−3)" : "2x"}</p>
            <strong>Predicts {ruleValue(4, c)} at x=4</strong>
            <small>Training error: 0</small>
          </button>
        ))}
      </div>
      <div className="play-actions">
        <button
          disabled={choice === null || revealed}
          onClick={() => setRevealed(true)}
        >
          Commit prediction and reveal x=4
        </button>
        <button
          onClick={() => {
            setCurve((c) => !c);
            setChoice(null);
            setRevealed(false);
          }}
        >
          Switch teaching world
        </button>
      </div>
      <p className="philo-note">
        Selected world: {curve ? "Curved" : "Straight"}. Its held-out value
        stays hidden until commitment. Selecting a world is a counterfactual
        comparison, not a blinded prediction contest.
      </p>
      <p role="status" className="play-feedback">
        {revealed && choice !== null
          ? `Held-out observation: ${ruleValue(4, curve)}. Your squared prediction error: ${squaredError(ruleValue(4, choice), ruleValue(4, curve))}. ${choice === curve ? "This rule predicted this case correctly." : "A perfect training fit did not ensure a correct next prediction."} Try the other world before treating simplicity as a guarantee.`
          : "Both rules fit all three observations. Choose a prediction; fitting a small sample does not establish either rule as true."}
      </p>
    </>
  );
}
export function FalsifyBoard() {
  const [seen, setSeen] = useState<number[]>([]),
    [evasive, setEvasive] = useState(false),
    counter = seen.some((i) => factoryBadges[i] === "amber");
  return (
    <>
      <div className="philo-claim">
        <span>{evasive ? "Evasive rule" : "Testable rule"}</span>
        <h3>
          {evasive
            ? "Any unexpected badge will be explained as an exception after inspection."
            : "Every badge this factory produces is blue."}
        </h3>
        <p>
          {evasive
            ? "No colour is allowed to count against the rule."
            : "An authentic non-blue badge would contradict this universal colour claim."}
        </p>
      </div>
      <div className="philo-badges">
        {factoryBadges.map((colour, i) => (
          <button
            key={i}
            disabled={seen.includes(i)}
            aria-label={`Inspect badge ${i + 1}`}
            onClick={() => setSeen((v) => [...v, i])}
          >
            <span className={seen.includes(i) ? colour : ""} aria-hidden="true">
              {seen.includes(i) ? "◆" : "?"}
            </span>
            <small>{seen.includes(i) ? colour : `Badge ${i + 1}`}</small>
          </button>
        ))}
      </div>
      <button aria-pressed={evasive} onClick={() => setEvasive((v) => !v)}>
        Toggle evasive explanation
      </button>
      <p role="status" className="play-feedback">
        {evasive
          ? `Inspected ${seen.length}/5. This explanation protects itself from every result; it offers no genuine failure condition.`
          : counter
            ? "An amber badge is a counterexample to the stipulated universal claim. In real science, verify the observation and relevant background assumptions."
            : `Inspected ${seen.length}/5 without a counterexample. These blue badges do not prove the factory's universal output claim.`}
      </p>
    </>
  );
}
export function ZenoBoard() {
  const [steps, setSteps] = useState(0),
    [shrinking, setShrinking] = useState(true),
    r = zenoStep(steps, shrinking);
  return (
    <>
      <p className="philo-mission">
        Half the remaining distance per step · Unit track
      </p>
      <div className="philo-track">
        <span style={{ left: `${r.distance * 100}%` }} aria-hidden="true">
          ◉
        </span>
        <i style={{ width: `${r.distance * 100}%` }} />
        <b>Finish</b>
      </div>
      <div className="play-actions">
        <button disabled={steps === 16} onClick={() => setSteps((s) => s + 1)}>
          Travel half the remaining distance
        </button>
        <button
          aria-pressed={shrinking}
          onClick={() => setShrinking((v) => !v)}
        >
          {shrinking
            ? "Use fixed time per step"
            : "Use shrinking time per step"}
        </button>
      </div>
      <dl className="philo-number-list">
        <div>
          <dt>Finite steps taken</dt>
          <dd>{steps}</dd>
        </div>
        <div>
          <dt>Distance travelled</dt>
          <dd>{r.distance.toFixed(6)}</dd>
        </div>
        <div>
          <dt>Distance remaining</dt>
          <dd>1 / {2 ** steps}</dd>
        </div>
        <div>
          <dt>Accumulated time</dt>
          <dd>{r.time.toFixed(6)}</dd>
        </div>
      </dl>
      <p role="status" className="play-feedback">
        {shrinking
          ? "Shrinking-time partial sums approach one time unit. No finite displayed step is labelled arrival."
          : "One time unit per step makes total time grow with the number of steps, even though distance has the same bounded partial sums."}
      </p>
      <p className="philo-note">
        The limit in shrinking-time mode is distance 1 and time 1. A limit is
        not an extra finite step or proof that a person executes infinitely many
        commands.
      </p>
    </>
  );
}
