"use client";
import type { ComponentType } from "react";
import { useState } from "react";
import { Actions, Choices, Stats, Slider, Ledger, fixed } from "./Shared";
export function Vat() {
  const [clues, setClues] = useState(0),
    [judgment, setJudgment] = useState("");
  const cluesText = [
    "A clock appears to read 06:30.",
    "A red cup appears on a table.",
    "A familiar voice says good morning.",
  ];
  return (
    <>
      <p>
        Compare an ordinary environment with a stipulated perfect simulation
        supplying the same experiences. The scenario grants indistinguishable
        observations; it does not claim such a simulation exists.
      </p>
      <Actions>
        <button disabled={clues === 3} onClick={() => setClues(clues + 1)}>
          Inspect another experience
        </button>
      </Actions>
      <Ledger
        label="Evidence available inside each scenario"
        headers={["Ordinary world", "Perfect simulation"]}
        rows={cluesText.slice(0, clues).map((c) => [c, c])}
      />
      <Choices
        label="What do these observations establish?"
        options={[
          "Ordinary world",
          "Simulation",
          "These stipulated clues do not distinguish them",
        ]}
        value={judgment}
        onChange={setJudgment}
      />
      <p aria-live="polite">
        {judgment
          ? `Your interpretation: ${judgment}.`
          : "Inspect what evidence each scenario predicts."}
      </p>
      <p>
        Brain-in-a-vat scepticism asks about knowledge under radically
        indistinguishable alternatives. Different epistemological replies
        address justification, reference and the scope of doubt; a few matching
        text clues do not resolve the debate.
      </p>
    </>
  );
}
export function TwinEarth() {
  const [revealed, setRevealed] = useState(false),
    [view, setView] = useState("");
  return (
    <>
      <p>
        Imagine Earth and Twin Earth before chemistry distinguishes their
        liquids. Two internally identical speakers call the clear drinkable
        liquid “water.” On Earth its composition is H₂O; on Twin Earth the
        scenario stipulates XYZ with the same ordinary appearance.
      </p>
      <div className="prism-twins">
        <div>
          <b>Earth</b>
          <span>💧 “water”</span>
          <p>
            {revealed ? "Composition: H₂O" : "Clear, drinkable, fills lakes"}
          </p>
        </div>
        <div>
          <b>Twin Earth</b>
          <span>💧 “water”</span>
          <p>
            {revealed
              ? "Composition: XYZ (stipulated)"
              : "Clear, drinkable, fills lakes"}
          </p>
        </div>
      </div>
      <Actions>
        <button onClick={() => setRevealed(!revealed)}>
          {revealed ? "Hide chemistry" : "Inspect stipulated chemistry"}
        </button>
      </Actions>
      <Choices
        label="Interpret the reference of the word"
        options={[
          "Environment helps fix reference",
          "Internal state alone fixes meaning",
          "Distinction needs further argument",
        ]}
        value={view}
        onChange={setView}
      />
      <p aria-live="polite">
        {view
          ? `Position recorded: ${view}.`
          : "Which facts would your account of meaning include?"}
      </p>
      <p>
        Putnam’s Twin Earth case motivates semantic externalism. XYZ is a
        philosophical stipulation, not a chemical discovery; the interface
        records a position without scoring a theory of meaning as experimentally
        proven.
      </p>
    </>
  );
}
export function Nonidentity() {
  const [same, setSame] = useState(false),
    [choice, setChoice] = useState("");
  return (
    <>
      <p>
        Two fictional policies change a future life. A fast polluting policy
        yields a positive well-being index of 40; a delayed clean policy yields
        80. Ask whether the same person exists under both policies.
      </p>
      <Actions>
        <button
          aria-pressed={same}
          onClick={() => {
            setSame(!same);
            setChoice("");
          }}
        >
          Identity comparison:{" "}
          {same ? "Same future person" : "Different future people"}
        </button>
      </Actions>
      <Ledger
        label="Policy-dependent identities and outcomes"
        headers={["Policy", "Future individual", "Well-being index"]}
        rows={[
          ["Fast / polluting", "A", 40],
          ["Delayed / clean", same ? "A" : "B", 80],
        ]}
      />
      <Choices
        label="Your policy judgment"
        options={[
          "Prefer fast",
          "Prefer clean",
          "Need more ethical information",
        ]}
        value={choice}
        onChange={setChoice}
      />
      <p>
        {same
          ? "With the same person in both rows, the table supplies a straightforward person-level welfare comparison."
          : "With different individuals, A is not depicted as having an alternative life at 80. That complicates a simple worse-off comparison without establishing that the fast policy is permissible."}
      </p>
      <p>
        These invented positive indices omit rights, distribution and effects on
        existing people. The non-identity problem does not imply that any life
        worth living justifies every policy creating it.
      </p>
    </>
  );
}
export function Monster() {
  const [m, setM] = useState(5),
    [cap, setCap] = useState(false),
    [view, setView] = useState("");
  return (
    <>
      <p>
        Distribute ten divisible tokens between ten ordinary people and one
        “utility monster.” Each ordinary token creates two utility units; each
        monster token creates ten. Interpersonal comparability and constant
        marginal gains are stipulated.
      </p>
      <Slider
        label="Tokens allocated to monster"
        min={0}
        max={cap ? 3 : 10}
        step={0.5}
        value={m}
        onChange={setM}
      />
      <Actions>
        <button
          aria-pressed={cap}
          onClick={() => {
            setCap(!cap);
            if (!cap && m > 3) setM(3);
          }}
        >
          Allocation cap: {cap ? "3 tokens" : "None"}
        </button>
      </Actions>
      <Stats
        items={[
          ["Monster utility", 10 * m],
          ["Ordinary group total utility", 2 * (10 - m)],
          ["Total utility", 20 + 8 * m],
          ["Utility per ordinary person", fixed((2 * (10 - m)) / 10)],
        ]}
      />
      <Choices
        label="What should govern allocation?"
        options={[
          "Maximise supplied total",
          "Protect a distributional constraint",
          "Question the utility comparison",
        ]}
        value={view}
        onChange={setView}
      />
      <p aria-live="polite">
        {view
          ? `Principle recorded: ${view}.`
          : "Explore what total maximisation permits under these assumptions."}
      </p>
      <p>
        Nozick’s utility-monster objection challenges an implication of
        unrestricted aggregation. The numerical utilities and optional cap are
        authored examples, not measurements or a complete theory of fair
        allocation.
      </p>
    </>
  );
}
export function Goodman() {
  const [observed, setObserved] = useState(0),
    [past, setPast] = useState(false),
    [choice, setChoice] = useState("");
  return (
    <>
      <p>
        Compare “all emeralds are green” with “all emeralds are grue,” where
        grue means green if first observed before cutoff T and blue otherwise.
        Every emerald observed so far was seen before T and was green.
      </p>
      <Actions>
        <button
          disabled={past || observed === 6}
          onClick={() => setObserved(observed + 1)}
        >
          Observe another emerald before T
        </button>
        <button disabled={!observed} onClick={() => setPast(true)}>
          Consider first observation after T
        </button>
      </Actions>
      <div className="prism-cards">
        {Array.from({ length: observed }, (_, i) => (
          <span key={i}>Before T: green ◆</span>
        ))}
      </div>
      <Ledger
        label="Same past fit, different future projection"
        headers={[
          "Rule",
          "Fits observed green emeralds",
          "Prediction for a newly observed emerald",
        ]}
        rows={[
          ["Green", "Yes", past ? "Green" : "Before T: green"],
          ["Grue", "Yes", past ? "Blue" : "Before T: green"],
        ]}
      />
      <Choices
        label="Which projection is justified?"
        options={[
          "Project green",
          "Project grue",
          "Explain a projectibility principle first",
        ]}
        value={choice}
        onChange={setChoice}
      />
      <p>
        The new riddle of induction asks what distinguishes projectible
        predicates when past observations fit rival descriptions. The board does
        not reveal a scientifically discovered blue emerald or prove that
        arbitrary hypotheses are equally useful.
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
  const B = [Vat, TwinEarth, Nonidentity, Monster, Goodman][
    index
  ] as ComponentType<{ seed: number }>;
  return <B seed={seed} />;
}
