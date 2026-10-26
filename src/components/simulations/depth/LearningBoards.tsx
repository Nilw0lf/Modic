"use client";
import { useState } from "react";
import { rng } from "@/lib/simulations/depth";
import { Actions, Chart, Slider, Stats, fmt } from "./Shared";
export function Interleaving() {
  const [mixed, setMixed] = useState(true),
    [step, setStep] = useState(0),
    [answer, setAnswer] = useState(""),
    [submitted, setSubmitted] = useState(false),
    [score, setScore] = useState(0);
  const practice = mixed ? [0, 3, 1, 4, 2, 5] : [0, 1, 2, 3, 4, 5],
    tasks = [...practice, 6, 7, 8, 9, 10, 11],
    index = tasks[Math.min(step, 11)],
    area = index < 3 || index === 6 || index === 8 || index === 11,
    w = 3 + (index % 3),
    h = 2 + (index % 4),
    correct = area ? w * h : 2 * (w + h),
    test = step >= 6;
  return (
    <>
      <Actions>
        <button
          disabled={step > 0 || submitted}
          aria-pressed={mixed}
          onClick={() => setMixed(true)}
        >
          Interleaved practice
        </button>
        <button
          disabled={step > 0 || submitted}
          aria-pressed={!mixed}
          onClick={() => setMixed(false)}
        >
          Blocked practice
        </button>
      </Actions>
      {step < 12 ? (
        <>
          <p className="depth-callout">
            {test ? "Mixed test" : "Practice"} {(step % 6) + 1}/6 · Rectangle{" "}
            {w} × {h}. Find its <b>{area ? "area" : "perimeter"}</b>.
          </p>
          {!test && (
            <p>Area = width × height. Perimeter = 2 × (width + height).</p>
          )}
          <label htmlFor="math-answer">Your answer</label>
          <input
            id="math-answer"
            type="number"
            value={answer}
            disabled={submitted}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <Actions>
            <button
              disabled={submitted || answer.trim() === ""}
              onClick={() => {
                setSubmitted(true);
                if (test && Number(answer) === correct) setScore((v) => v + 1);
              }}
            >
              Check answer
            </button>
            {submitted && (
              <button
                onClick={() => {
                  setStep((v) => v + 1);
                  setAnswer("");
                  setSubmitted(false);
                }}
              >
                Next problem
              </button>
            )}
          </Actions>
          {submitted && (
            <p role="status">
              {Number(answer) === correct
                ? "Correct."
                : `The answer is ${correct}.`}{" "}
              {area ? `${w} × ${h}` : `2 × (${w} + ${h})`}
            </p>
          )}
        </>
      ) : (
        <p className="depth-callout">Mixed test complete: {score}/6 correct.</p>
      )}
      <p>
        The practice conditions contain the same six questions in different
        orders. This short activity illustrates switching between procedures; it
        does not establish a learning benefit or replace a delayed controlled
        test.
      </p>
    </>
  );
}
const pairs = [
  ["moon", "night"],
  ["bee", "honey"],
  ["tree", "leaf"],
  ["fire", "heat"],
];
export function Generation() {
  const [generate, setGenerate] = useState(true),
    [step, setStep] = useState(0),
    [study, setStudy] = useState(""),
    [feedback, setFeedback] = useState(false),
    [recall, setRecall] = useState(["", "", "", ""]),
    [done, setDone] = useState(false);
  return (
    <>
      <Actions>
        <button
          disabled={step > 0 || feedback}
          aria-pressed={generate}
          onClick={() => setGenerate(true)}
        >
          Generate from a fragment
        </button>
        <button
          disabled={step > 0 || feedback}
          aria-pressed={!generate}
          onClick={() => setGenerate(false)}
        >
          Read the complete pair
        </button>
      </Actions>
      {step < 4 ? (
        <>
          <p className="depth-callout">
            {pairs[step][0]} →{" "}
            {generate
              ? pairs[step][1][0] + "_".repeat(pairs[step][1].length - 1)
              : pairs[step][1]}
          </p>
          {generate && (
            <>
              <label htmlFor="generated-word">
                Complete the associated word
              </label>
              <input
                id="generated-word"
                value={study}
                disabled={feedback}
                onChange={(e) => setStudy(e.target.value)}
              />
            </>
          )}
          <Actions>
            {!feedback ? (
              <button
                disabled={generate && !study.trim()}
                onClick={() => setFeedback(true)}
              >
                Reveal the pair
              </button>
            ) : (
              <button
                onClick={() => {
                  setStep((v) => v + 1);
                  setStudy("");
                  setFeedback(false);
                }}
              >
                Next pair
              </button>
            )}
          </Actions>
          {feedback && (
            <p role="status">
              The study pair is {pairs[step].join(" → ")}.{" "}
              {generate && study.trim().toLowerCase() !== pairs[step][1]
                ? "Other associations are possible; this task recalls the displayed target."
                : ""}
            </p>
          )}
        </>
      ) : (
        <>
          <p>
            Recall the four target words. Exact words are checked without case
            sensitivity.
          </p>
          <div className="depth-cards">
            {pairs.map(([cue], i) => (
              <label key={cue}>
                {cue} →
                <input
                  aria-label={`Recall ${cue}`}
                  value={recall[i]}
                  disabled={done}
                  onChange={(e) =>
                    setRecall((v) =>
                      v.map((s, j) => (j === i ? e.target.value : s)),
                    )
                  }
                />
                {done && <small>Target: {pairs[i][1]}</small>}
              </label>
            ))}
          </div>
          <Actions>
            <button disabled={done} onClick={() => setDone(true)}>
              Check recalled words
            </button>
          </Actions>
          {done && (
            <Stats
              items={[
                [
                  "Exact target matches",
                  `${recall.filter((v, i) => v.trim().toLowerCase() === pairs[i][1]).length}/4`,
                ],
              ]}
            />
          )}
        </>
      )}
      <p>
        Generating an answer can change encoding. This immediate, four-pair
        demonstration has no delayed control group; repeating it introduces
        prior exposure and cannot measure an individual generation effect.
      </p>
    </>
  );
}
export function Load({ seed }: { seed: number }) {
  const [length, setLength] = useState(5),
    [extra, setExtra] = useState(false),
    [hidden, setHidden] = useState(false),
    [math, setMath] = useState(""),
    [chosen, setChosen] = useState<number[]>([]);
  const random = rng(seed),
    tiles = Array.from({ length: 9 }, (_, i) => i + 1);
  for (let i = 8; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  const sequence = tiles.slice(0, length),
    ready = hidden && (!extra || math === "15"),
    done = chosen.length === length;
  return (
    <>
      <Slider
        id="load-length"
        label="Sequence length"
        value={length}
        min={3}
        max={7}
        onChange={(v) => {
          setLength(v);
          setHidden(false);
          setChosen([]);
          setMath("");
        }}
      />
      <Actions>
        <button
          disabled={hidden}
          aria-pressed={extra}
          onClick={() => setExtra((v) => !v)}
        >
          Arithmetic interference: {extra ? "on" : "off"}
        </button>
        <button disabled={hidden} onClick={() => setHidden(true)}>
          Hide sequence & recall
        </button>
      </Actions>
      <p className="depth-callout">
        {hidden ? "Sequence hidden" : sequence.join(" → ")}
      </p>
      {hidden && extra && (
        <label>
          Before recalling, what is 7 + 8?
          <input
            aria-label="Arithmetic answer"
            type="number"
            value={math}
            onChange={(e) => setMath(e.target.value)}
          />
        </label>
      )}
      <div className="depth-keypad">
        {Array.from({ length: 9 }, (_, i) => (
          <button
            key={i}
            disabled={!ready || done}
            onClick={() => setChosen((v) => [...v, i + 1])}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <p role="status">
        {chosen.length
          ? `Your sequence: ${chosen.join(" → ")}`
          : "Memorise the order, then hide it and tap the numbered tiles."}
      </p>
      {done && (
        <p>
          {chosen.every((v, i) => v === sequence[i])
            ? "Exact match."
            : `Target sequence: ${sequence.join(" → ")}.`}{" "}
          This is a task result, not an intelligence or health assessment.
        </p>
      )}
      <p>
        There is no timer. Comparing two conditions after seeing the same
        sequence is confounded by practice; use a new round for a new sequence.
      </p>
    </>
  );
}
export function Satisficing({ seed }: { seed: number }) {
  const [threshold, setThreshold] = useState(70),
    [seen, setSeen] = useState(0),
    [accepted, setAccepted] = useState(false);
  const random = rng(seed),
    offers = Array.from({ length: 12 }, () => Math.floor(random() * 101)),
    current = offers[Math.max(0, seen - 1)];
  return (
    <>
      <Slider
        id="aspiration"
        label="Aspiration level"
        value={threshold}
        min={0}
        max={100}
        onChange={setThreshold}
      />
      <p className="depth-callout">
        {seen
          ? `Current offer: ${current} · ${current >= threshold ? "meets" : "below"} aspiration`
          : "Twelve offers wait behind the curtain. Each inspection costs two units. Past offers expire."}
      </p>
      <Actions>
        <button
          disabled={accepted || seen === 12}
          onClick={() => setSeen((v) => v + 1)}
        >
          {seen ? "Pay 2 & inspect next" : "Pay 2 & inspect first"}
        </button>
        <button disabled={!seen || accepted} onClick={() => setAccepted(true)}>
          Accept current offer
        </button>
      </Actions>
      <Stats
        items={[
          ["Inspections", `${seen}/12`],
          ["Search cost", String(2 * seen)],
          [
            "Net payoff",
            accepted ? String(current - 2 * seen) : "Not accepted",
          ],
        ]}
      />
      <p>
        Expired offers:{" "}
        {offers.slice(0, Math.max(0, seen - 1)).join(", ") || "none"}.{" "}
        {accepted
          ? "Decision locked. Reset to compare another aspiration rule."
          : seen === 12
            ? "No offers remain to inspect. You may accept the last offer."
            : "Only the current offer can be accepted."}
      </p>
      <p>
        Satisficing stops at an acceptable option rather than exhaustively
        finding the maximum. The threshold is a heuristic; this game does not
        claim it is the optimal stopping rule.
      </p>
    </>
  );
}
export function PeakShift() {
  const [width, setWidth] = useState(20),
    [inhibition, setInhibition] = useState(0.7);
  const response = Array.from({ length: 101 }, (_, x) =>
    Math.max(
      0,
      Math.exp(-((x - 60) ** 2) / (2 * width ** 2)) -
        inhibition * Math.exp(-((x - 40) ** 2) / (2 * width ** 2)),
    ),
  );
  const peak = response.indexOf(Math.max(...response));
  return (
    <>
      <Slider
        id="gradient"
        label="Generalisation width"
        value={width}
        min={10}
        max={30}
        onChange={setWidth}
      />
      <Slider
        id="inhibition"
        label="Inhibitory gradient strength"
        value={inhibition}
        min={0}
        max={1}
        step={0.1}
        onChange={setInhibition}
      />
      <Chart
        label="Authored gradient-interaction model"
        xLabel="Stimulus dimension 0 → 100; nonrewarded 40, rewarded 60"
        lines={[
          { name: "Net response", values: response },
          {
            name: "Excitatory gradient",
            values: Array.from({ length: 101 }, (_, x) =>
              Math.exp(-((x - 60) ** 2) / (2 * width ** 2)),
            ),
          },
        ]}
      />
      <Stats
        items={[
          ["Rewarded stimulus", "60"],
          ["Response peak", String(peak)],
          ["Shift from rewarded stimulus", fmt(peak - 60, 0)],
        ]}
      />
      <p>
        Subtracting a nearby inhibitory generalisation gradient can move the
        peak beyond the rewarded stimulus. These teaching curves are not animal
        measurements or a universal account of preference.
      </p>
    </>
  );
}
