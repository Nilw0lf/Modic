"use client";
import type { ComponentType } from "react";
import { useState } from "react";
import { Actions, Choices, Stats, Ledger } from "./Shared";
import { rng } from "@/lib/simulations/prism";
export function Chunking({ seed }: { seed: number }) {
  const [group, setGroup] = useState("Grouped"),
    [study, setStudy] = useState(true),
    [answer, setAnswer] = useState(""),
    [done, setDone] = useState(false),
    r = rng(seed),
    digits = Array.from({ length: 8 }, () => Math.floor(r() * 10)).join("");
  return (
    <>
      <p>
        Inspect eight digits in one of two layouts, then recall the sequence.
        Grouping changes presentation, not the information or number of digits.
      </p>
      <Choices
        label="Study layout"
        options={["Grouped", "Ungrouped"]}
        value={group}
        onChange={setGroup}
        disabled={!study}
      />
      {study ? (
        <>
          <div className="prism-code">
            {group === "Grouped"
              ? digits.slice(0, 4) + " · " + digits.slice(4)
              : digits}
          </div>
          <Actions>
            <button onClick={() => setStudy(false)}>
              Hide digits and recall
            </button>
          </Actions>
        </>
      ) : (
        <>
          <label>
            Recalled sequence
            <input
              aria-label="Recalled sequence"
              inputMode="numeric"
              value={answer}
              maxLength={8}
              disabled={done}
              onChange={(e) => setAnswer(e.target.value.replace(/\D/g, ""))}
            />
          </label>
          <Actions>
            <button
              disabled={answer.length !== 8 || done}
              onClick={() => setDone(true)}
            >
              Check sequence
            </button>
          </Actions>
          {done && (
            <Stats
              items={[
                ["Original sequence", digits],
                [
                  "Positions correct",
                  [...answer].filter((c, i) => c === digits[i]).length + " / 8",
                ],
              ]}
            />
          )}
        </>
      )}
      <p>
        Chunking can use learned meaningful groups. Two arbitrary four-digit
        blocks are only a layout cue; this untimed single attempt does not
        estimate memory capacity or a grouping benefit.
      </p>
    </>
  );
}
const words = [
  "harbour",
  "candle",
  "mirror",
  "forest",
  "button",
  "planet",
  "ribbon",
  "window",
];
export function Isolation() {
  const [study, setStudy] = useState(true),
    [answer, setAnswer] = useState(""),
    [done, setDone] = useState(false);
  return (
    <>
      <p>
        Study eight words, one with a visibly different style. Afterwards list
        recalled words separated by commas. All words remain ordinary readable
        text.
      </p>
      {study ? (
        <>
          <div className="prism-word-list">
            {words.map((w, i) => (
              <span key={w} className={i === 3 ? "isolated" : ""}>
                {w}
              </span>
            ))}
          </div>
          <Actions>
            <button onClick={() => setStudy(false)}>
              Hide list and recall words
            </button>
          </Actions>
        </>
      ) : (
        <>
          <label>
            Your recalled words
            <textarea
              aria-label="Recalled words"
              value={answer}
              maxLength={200}
              disabled={done}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </label>
          <Actions>
            <button disabled={!answer || done} onClick={() => setDone(true)}>
              Compare recall with list
            </button>
          </Actions>
          {done && (
            <>
              <Ledger
                label="Your recall record"
                headers={["Original word", "Recalled", "Distinctive style"]}
                rows={words.map((w) => [
                  w,
                  answer
                    .toLowerCase()
                    .split(/[^a-z]+/)
                    .includes(w)
                    ? "Yes"
                    : "No",
                  w === "forest" ? "Yes" : "No",
                ])}
              />
              <p>
                The isolated item was forest. A recalled or missed word is your
                actual response; no isolation benefit is imposed.
              </p>
            </>
          )}
        </>
      )}
      <p>
        The von Restorff effect concerns distinctive items in context. A
        self-paced warned list without matched control conditions cannot
        establish an individual effect.
      </p>
    </>
  );
}
const pairs = [
  ["A17", "harbour", "⚓"],
  ["B28", "forest", "♧"],
  ["C39", "candle", "♨"],
  ["D40", "window", "▣"],
];
export function DualCoding() {
  const [mode, setMode] = useState("Text + visual cue"),
    [study, setStudy] = useState(true),
    [step, setStep] = useState(0),
    [answers, setAnswers] = useState<string[]>([]);
  return (
    <>
      <p>
        Learn four arbitrary code-to-word pairs. A second representation can
        provide a retrieval cue, but this exercise does not assume a guaranteed
        learning gain.
      </p>
      <Choices
        label="Study representation"
        options={["Text only", "Text + visual cue"]}
        value={mode}
        onChange={setMode}
        disabled={!study}
      />
      {study ? (
        <>
          <div className="prism-cards">
            {pairs.map(([code, word, icon]) => (
              <span key={code}>
                {mode !== "Text only" && <b aria-hidden="true">{icon}</b>}
                {code} → {word}
              </span>
            ))}
          </div>
          <Actions>
            <button onClick={() => setStudy(false)}>
              Hide pairs and start recall
            </button>
          </Actions>
        </>
      ) : step < 4 ? (
        <>
          <p>Which word was paired with {pairs[step][0]}?</p>
          <Actions>
            {pairs.map(([, word]) => (
              <button
                key={word}
                onClick={() => {
                  setAnswers([...answers, word]);
                  setStep(step + 1);
                }}
              >
                {word}
              </button>
            ))}
          </Actions>
        </>
      ) : (
        <Stats
          items={[
            [
              "Pairs recalled correctly",
              answers.filter((a, i) => a === pairs[i][1]).length + " / 4",
            ],
          ]}
        />
      )}
      <p>
        These authored icons, visible exposure and fixed order are not a
        controlled test of Paivio’s dual-coding theory. Repetition, prior
        familiarity and self-selected study time can affect recall.
      </p>
    </>
  );
}
export function Spacing() {
  const [mode, setMode] = useState("Interleaved exposures"),
    [card, setCard] = useState(0),
    [step, setStep] = useState(0),
    [answers, setAnswers] = useState<string[]>([]),
    order =
      mode === "Blocked exposures"
        ? [0, 0, 1, 1, 2, 2, 3, 3]
        : [0, 1, 2, 3, 0, 1, 2, 3];
  return (
    <>
      <p>
        Study each code pair twice. Blocked presentation puts repeats together;
        the alternative separates repeats with other items. Advancement is
        manual, with no assigned delay in seconds.
      </p>
      <Choices
        label="Exposure schedule"
        options={["Blocked exposures", "Interleaved exposures"]}
        value={mode}
        onChange={setMode}
        disabled={card > 0}
      />
      {card < 8 ? (
        <>
          <div className="prism-code">
            {pairs[order[card]][0]} → {pairs[order[card]][1]}
          </div>
          <p>Study card {card + 1} of 8</p>
          <Actions>
            <button onClick={() => setCard(card + 1)}>Next study card</button>
          </Actions>
        </>
      ) : step < 4 ? (
        <>
          <p>Recall the word paired with {pairs[step][0]}.</p>
          <Actions>
            {pairs.map(([, word]) => (
              <button
                key={word}
                onClick={() => {
                  setAnswers([...answers, word]);
                  setStep(step + 1);
                }}
              >
                {word}
              </button>
            ))}
          </Actions>
        </>
      ) : (
        <Stats
          items={[
            [
              "Correct code pairs",
              answers.filter((a, i) => a === pairs[i][1]).length + " / 4",
            ],
          ]}
        />
      )}
      <p>
        This demonstrates an item-spacing schedule and records immediate recall.
        It does not measure long-term retention, isolate spacing from contextual
        interference or prescribe a universal review interval.
      </p>
    </>
  );
}
const prospectiveNumbers = [3, 8, 2, 7, 4, 1, 6, 9];
export function Prospective() {
  const [start, setStart] = useState(false),
    [step, setStep] = useState(0),
    [flag, setFlag] = useState(false),
    [primary, setPrimary] = useState(0),
    [hits, setHits] = useState(0),
    [falseAlarms, setFalse] = useState(0);
  const star = step === 2 || step === 6;
  function answer(even: boolean) {
    setPrimary(primary + Number(even === (prospectiveNumbers[step] % 2 === 0)));
    if (star && flag) setHits(hits + 1);
    if (!star && flag) setFalse(falseAlarms + 1);
    setFlag(false);
    setStep(step + 1);
  }
  return (
    <>
      {!start ? (
        <>
          <p>
            Remember this intention: when a ★ appears beside a number, press
            “Deliver parcel” before answering odd or even. There will be eight
            cards. The symbol is always visibly available when relevant.
          </p>
          <Actions>
            <button onClick={() => setStart(true)}>Begin the card task</button>
          </Actions>
        </>
      ) : step < 8 ? (
        <>
          <p className="prism-code">
            {prospectiveNumbers[step]} {star ? "★" : "○"}
          </p>
          <Actions>
            <button
              aria-pressed={flag}
              disabled={flag}
              onClick={() => setFlag(true)}
            >
              Deliver parcel
            </button>
            <button onClick={() => answer(false)}>Odd</button>
            <button onClick={() => answer(true)}>Even</button>
          </Actions>
        </>
      ) : (
        <Ledger
          label="Separate primary and prospective task results"
          headers={[
            "Parity correct",
            "Cue actions completed",
            "Actions on non-cue cards",
          ]}
          rows={[[`${primary}/8`, `${hits}/2`, falseAlarms]]}
        />
      )}
      <p>
        Prospective memory concerns remembering to perform a future intention
        while another task is underway. This untimed visible-cue game is neither
        a clinical memory test nor a measure of everyday reliability.
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
  const B = [Chunking, Isolation, DualCoding, Spacing, Prospective][
    index
  ] as ComponentType<{ seed: number }>;
  return <B seed={seed} />;
}
