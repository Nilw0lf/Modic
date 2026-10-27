"use client";
import { useState } from "react";
import { Actions, Slider, Stats, Ledger } from "./Shared";
import { rng } from "@/lib/simulations/mosaic";
export function Buridan({ seed }: { seed: number }) {
  const [wait, setWait] = useState(0),
    [choice, setChoice] = useState("");
  const value = Math.max(0, 10 - wait);
  return (
    <>
      <p>
        Two equally valuable routes each start worth 10 tokens. Each turn spent
        waiting costs one token from either route. There is no hidden better
        option in this stipulated game.
      </p>
      <div className="mosaic-choice-grid">
        {["Left", "Right"].map((v) => (
          <button key={v} disabled={!!choice} onClick={() => setChoice(v)}>
            {v} route · {value} tokens
          </button>
        ))}
      </div>
      <Actions>
        <button
          disabled={!!choice || wait === 10}
          onClick={() => setWait(wait + 1)}
        >
          Wait one turn
        </button>
        <button
          disabled={!!choice}
          onClick={() => setChoice(rng(seed)() < 0.5 ? "Left" : "Right")}
        >
          Use a fair tie-breaker
        </button>
      </Actions>
      <Stats
        items={[
          ["Turns waiting", wait],
          ["Reward available", value],
          ["Selected route", choice || "Undecided"],
        ]}
      />
      <p aria-live="polite">
        {choice
          ? `You take ${choice.toLowerCase()} for ${value} tokens; waiting cost ${wait} tokens.`
          : "A tie-breaker resolves the choice without discovering a difference in value."}
      </p>
      <p>
        The familiar dilemma is historically associated with Buridan. This game
        adds an explicit waiting cost; real decisions can contain uncertainty
        that makes further investigation worthwhile.
      </p>
    </>
  );
}
export function Mary() {
  const [before, setBefore] = useState(""),
    [reveal, setReveal] = useState(false),
    [after, setAfter] = useState("");
  const options = [
    "New propositional fact",
    "New ability or acquaintance",
    "No new knowledge",
    "Withhold judgment",
  ];
  return (
    <>
      <p>
        Mary has lived in a monochrome environment. Stipulate that she knows
        every physical fact about colour vision. Predict what, if anything, her
        first experience of red adds.
      </p>
      <div className={`mosaic-mary ${reveal ? "revealed" : ""}`}>
        <span>
          {reveal ? "A red experience" : "Physical facts stipulated complete"}
        </span>
      </div>
      <fieldset>
        <legend>Your prediction before the reveal</legend>
        <Actions>
          {options.map((o) => (
            <button
              key={o}
              disabled={reveal}
              aria-pressed={before === o}
              onClick={() => setBefore(o)}
            >
              {o}
            </button>
          ))}
        </Actions>
      </fieldset>
      <Actions>
        <button disabled={!before || reveal} onClick={() => setReveal(true)}>
          Let Mary see red
        </button>
      </Actions>
      {reveal && (
        <>
          <fieldset>
            <legend>Your interpretation after considering the case</legend>
            <Actions>
              {options.map((o) => (
                <button
                  key={o}
                  aria-pressed={after === o}
                  onClick={() => setAfter(o)}
                >
                  {o}
                </button>
              ))}
            </Actions>
          </fieldset>
          <p aria-live="polite">
            Prediction: {before}. Current interpretation:{" "}
            {after || "Choose an interpretation"}.
          </p>
          <p>
            Learning a new fact could challenge physicalism; learning a new
            ability or mode of acquaintance need not have that implication. The
            screen reveal illustrates the question and cannot decide between
            these arguments.
          </p>
        </>
      )}
    </>
  );
}
export function Gettier() {
  const [judgment, setJudgment] = useState(""),
    [reveal, setReveal] = useState(false),
    [luck, setLuck] = useState(true),
    [after, setAfter] = useState("");
  return (
    <>
      <p>
        A reliable warehouse label says a sealed parcel contains gold. You
        believe it, and the parcel does contain gold. Does this justified true
        belief amount to knowledge?
      </p>
      <Actions>
        <button
          disabled={reveal}
          aria-pressed={luck}
          onClick={() => setLuck(!luck)}
        >
          History to inspect: {luck ? "Accidental truth" : "Ordinary tracking"}
        </button>
        {["Knowledge", "Not knowledge", "Unsure"].map((o) => (
          <button
            key={o}
            disabled={reveal}
            aria-pressed={judgment === o}
            onClick={() => setJudgment(o)}
          >
            {o}
          </button>
        ))}
        <button disabled={!judgment || reveal} onClick={() => setReveal(true)}>
          Inspect the label history
        </button>
      </Actions>
      {reveal && (
        <>
          <p className="mosaic-panel">
            {luck
              ? "The label was accidentally swapped from another parcel. By an independent coincidence, this parcel also contains gold. The justification did not track why this belief was true."
              : "The label was correctly attached after a dependable inspection of this very parcel. No relevant accident has been stipulated."}
          </p>
          <fieldset>
            <legend>Your judgment after the history</legend>
            <Actions>
              {["Knowledge", "Not knowledge", "Unsure"].map((o) => (
                <button
                  key={o}
                  aria-pressed={after === o}
                  onClick={() => setAfter(o)}
                >
                  {o}
                </button>
              ))}
            </Actions>
          </fieldset>
          <Ledger
            label="Separate the conditions"
            headers={[
              "Truth",
              "Initial justification",
              "Accidental connection",
            ]}
            rows={[
              ["Stipulated true", "Stipulated reasonable", luck ? "Yes" : "No"],
            ]}
          />
          <p aria-live="polite">
            Before: {judgment}. After: {after || "Choose a judgment"}.
            Philosophers debate which additional conditions exclude epistemic
            luck.
          </p>
        </>
      )}
    </>
  );
}
export function Chinese() {
  const rules = [
      ["◇", "△"],
      ["○", "□"],
      ["△", "○"],
      ["□", "◇"],
    ],
    [trial, setTrial] = useState(0),
    [score, setScore] = useState(0),
    [result, setResult] = useState(""),
    [view, setView] = useState("");
  const inputs = [0, 2, 1];
  function answer(o: string) {
    const ok = o === rules[inputs[trial]][1];
    setScore(score + Number(ok));
    setResult(
      ok
        ? "Rule followed correctly."
        : `Rule output was ${rules[inputs[trial]][1]}.`,
    );
    setTrial(trial + 1);
  }
  return (
    <>
      <p>
        Operate a symbol room using the lookup book. You receive no meanings for
        these symbols. Produce the specified output, then distinguish successful
        rule following from a claim about understanding.
      </p>
      <Ledger
        label="Symbol rulebook"
        headers={["Input", "Output"]}
        rows={rules}
      />
      {trial < 3 ? (
        <>
          <p>
            Incoming symbol:{" "}
            <strong className="mosaic-symbol">{rules[inputs[trial]][0]}</strong>
          </p>
          <Actions>
            {["◇", "△", "○", "□"].map((o) => (
              <button key={o} onClick={() => answer(o)}>
                Output {o}
              </button>
            ))}
          </Actions>
        </>
      ) : (
        <fieldset>
          <legend>What does accurate rule following establish?</legend>
          <Actions>
            {[
              "Operator understands",
              "Whole system may understand",
              "Behaviour alone does not settle it",
            ].map((o) => (
              <button
                key={o}
                aria-pressed={view === o}
                onClick={() => setView(o)}
              >
                {o}
              </button>
            ))}
          </Actions>
        </fieldset>
      )}
      <Stats
        items={[
          ["Messages processed", trial],
          ["Correct rule outputs", score],
        ]}
      />
      <p aria-live="polite">
        {result} {view && `Interpretation recorded: ${view}.`}
      </p>
      <p>
        This tiny lookup game does not reproduce natural language. Searle’s
        argument and the systems reply are disputed; correct answers here prove
        neither consciousness nor its absence.
      </p>
    </>
  );
}
export function Repugnant() {
  const [n, setN] = useState(100),
    [quality, setQuality] = useState(10),
    [criterion, setCriterion] = useState("Total"),
    [choice, setChoice] = useState("");
  return (
    <>
      <p>
        World A has 100 people, each at well-being 10. Create World B with
        positive well-being, then compare aggregate and average evaluations. The
        invented units have no empirical calibration.
      </p>
      <Slider
        id="people-in-world-b"
        label="People in World B"
        min={100}
        max={10000}
        step={100}
        value={n}
        onChange={(v) => {
          setN(v);
          setChoice("");
        }}
      />
      <Slider
        id="well-being-per-person-in-b"
        label="Well-being per person in B"
        min={0.1}
        max={10}
        step={0.1}
        value={quality}
        onChange={(v) => {
          setQuality(v);
          setChoice("");
        }}
      />
      <Actions>
        {["Total", "Average"].map((o) => (
          <button
            key={o}
            aria-pressed={criterion === o}
            onClick={() => setCriterion(o)}
          >
            {o} evaluation
          </button>
        ))}
      </Actions>
      <Ledger
        label="Population ethics comparison"
        headers={["World", "Population", "Each person", "Total", "Average"]}
        rows={[
          ["A", 100, 10, 1000, 10],
          ["B", n, quality, (n * quality).toFixed(1), quality],
        ]}
      />
      <p>
        {criterion} evaluation:{" "}
        {criterion === "Total"
          ? n * quality > 1000
            ? "B ranks above A"
            : n * quality === 1000
              ? "A and B tie"
              : "A ranks above B"
          : quality === 10
            ? "A and B tie"
            : "A ranks above B"}
        .
      </p>
      <Actions>
        {["Prefer A", "Prefer B", "Neither ranking settles it"].map((o) => (
          <button
            key={o}
            aria-pressed={choice === o}
            onClick={() => setChoice(o)}
          >
            {o}
          </button>
        ))}
      </Actions>
      <p aria-live="polite">
        {choice
          ? `Your judgment: ${choice}.`
          : "Try 10,000 people at 0.2. Total well-being doubles while every person is much worse off than in A."}
      </p>
      <p>
        Parfit’s repugnant conclusion concerns comparisons across different
        population sizes. This board omits inequality, rights, uncertainty and
        feasible policy choices; your judgment is not scored.
      </p>
    </>
  );
}
