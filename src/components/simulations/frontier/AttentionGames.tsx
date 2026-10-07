"use client";
import { useState } from "react";
import {
  attentionCards,
  changeScene,
  exposureSequence,
} from "@/lib/simulations/frontier";

export function AttentionGame({ seed }: { seed: number }) {
  const cards = attentionCards(seed),
    [card, setCard] = useState(0),
    [guess, setGuess] = useState(""),
    [done, setDone] = useState(false);
  const target = cards.reduce((n, c) => n + c.blue, 0);
  return (
    <>
      <p className="simple-prompt">
        Count blue circles across all eight cards.
      </p>
      <div
        className="frontier-attention-scene"
        role="img"
        aria-label={`Card ${card + 1}: ${cards[card].blue} blue circles, three amber diamonds${cards[card].star ? ", and one star" : ""}.`}
      >
        {Array.from({ length: cards[card].blue }, (_, i) => (
          <span className="blue" key={`b${i}`} aria-hidden="true">
            ●
          </span>
        ))}
        {[0, 1, 2].map((i) => (
          <span className="amber" key={`a${i}`} aria-hidden="true">
            ◆
          </span>
        ))}
        {cards[card].star && (
          <span className="frontier-surprise" aria-hidden="true">
            ☆
          </span>
        )}
      </div>
      <p className="frontier-note">
        Card {card + 1} of 8. Self-paced; nothing flashes or moves
        automatically.
      </p>
      {card < 7 && !done && (
        <button onClick={() => setCard((c) => c + 1)}>
          Next counting card
        </button>
      )}
      {card === 7 && !done && (
        <form
          className="frontier-answer"
          onSubmit={(event) => {
            event.preventDefault();
            setDone(true);
          }}
        >
          <label htmlFor="attention-count">
            How many blue circles did you count?
          </label>
          <input
            id="attention-count"
            type="number"
            min="0"
            max="32"
            required
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button type="submit">Check count and review</button>
        </form>
      )}
      {done && (
        <>
          <p role="status" className="play-feedback">
            You reported {guess}; the total is {target}. Did you also notice the
            star on card 4? A correct count and noticing the additional event
            are separate questions.
          </p>
          <div className="play-actions">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setCard(i)}
                aria-pressed={card === i}
              >
                Review card {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
      <p className="frontier-note">
        Screen-reader descriptions include every symbol. This makes the task
        accessible but changes the surprise. There is no attention score or
        diagnostic interpretation.
      </p>
    </>
  );
}

export function ChangeGame({ seed }: { seed: number }) {
  const scene = changeScene(seed),
    [view, setView] = useState(0),
    [gap, setGap] = useState(true),
    [feedback, setFeedback] = useState(""),
    [revealed, setRevealed] = useState(false);
  const blank = gap && view % 2 === 1,
    second = gap ? view % 4 === 2 : view % 2 === 1;
  return (
    <>
      <div className="play-actions">
        <button
          aria-pressed={gap}
          onClick={() => {
            setGap((g) => !g);
            setView(0);
            setFeedback("");
          }}
        >
          Blank gap: {gap ? "on" : "off"}
        </button>
        <button onClick={() => setView((v) => v + 1)}>Next view</button>
        <button onClick={() => setRevealed(true)}>Reveal change</button>
      </div>
      <p className="frontier-note">
        {blank
          ? "Blank interval: advance to the next scene."
          : `Scene ${second ? "B" : "A"}: one shape differs between scenes.`}
      </p>
      <div
        className={`frontier-change-grid ${blank ? "blank" : ""}`}
        role="group"
        aria-label="Twelve numbered scene tiles"
      >
        {scene.shapes.map((shape, i) => (
          <button
            key={i}
            disabled={blank}
            aria-label={
              blank
                ? `Tile ${i + 1}, blank`
                : `Tile ${i + 1}, ${second && i === scene.changed ? (shape === "●" ? "diamond" : "circle") : shape === "●" ? "circle" : "diamond"}`
            }
            className={revealed && i === scene.changed ? "revealed" : ""}
            onClick={() => {
              setFeedback(
                i === scene.changed
                  ? `Correct: tile ${i + 1} changes shape.`
                  : `Tile ${i + 1} does not change. Compare the same location in A and B.`,
              );
              if (i === scene.changed) setRevealed(true);
            }}
          >
            <small>{i + 1}</small>
            <span aria-hidden="true">
              {blank
                ? ""
                : second && i === scene.changed
                  ? shape === "●"
                    ? "◆"
                    : "●"
                  : shape}
            </span>
          </button>
        ))}
      </div>
      {revealed && (
        <p className="frontier-comparison">
          Tile {scene.changed + 1}: scene A {scene.shapes[scene.changed]} →
          scene B {scene.shapes[scene.changed] === "●" ? "◆" : "●"}
        </p>
      )}
      <p role="status" className="play-feedback">
        {feedback ||
          "Find the changed tile. You can toggle the gap and compare at your own pace."}
      </p>
      <p className="frontier-note">
        Shape and numbered location both identify the change; colour is not
        required. Seeing it quickly is not a vision or attention score.
      </p>
    </>
  );
}

function Pattern({ variant }: { variant: number }) {
  return (
    <svg
      className="frontier-pattern"
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Original pattern ${variant === 0 ? "A: overlapping circles" : "B: overlapping diamonds"}`}
    >
      {variant === 0 ? (
        <>
          <circle cx="42" cy="50" r="25" />
          <circle cx="58" cy="50" r="25" />
          <circle cx="50" cy="50" r="9" />
        </>
      ) : (
        <>
          <path d="M50 14L86 50L50 86L14 50Z" />
          <path d="M50 29L71 50L50 71L29 50Z" />
          <path d="M50 42L58 50L50 58L42 50Z" />
        </>
      )}
    </svg>
  );
}
export function ExposureGame({ seed }: { seed: number }) {
  const [before, setBefore] = useState<(number | null)[]>([null, null]),
    [after, setAfter] = useState<(number | null)[]>([null, null]),
    [stage, setStage] = useState<"before" | "exposure" | "after" | "done">(
      "before",
    ),
    [index, setIndex] = useState(0);
  const sequence = exposureSequence(seed);
  const rating = (
    values: (number | null)[],
    set: (v: (number | null)[]) => void,
  ) => (
    <div className="frontier-pattern-rating">
      {[0, 1].map((variant) => (
        <div key={variant}>
          <h3>Pattern {variant === 0 ? "A" : "B"}</h3>
          <Pattern variant={variant} />
          <div
            className="play-actions"
            role="group"
            aria-label={`Rate pattern ${variant ? "B" : "A"}`}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                aria-pressed={values[variant] === n}
                onClick={() =>
                  set(values.map((v, i) => (i === variant ? n : v)))
                }
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <>
      {(stage === "before" || stage === "after") && (
        <>
          <p className="simple-prompt">
            {stage === "before" ? "Before exposure" : "After exposure"}: rate
            liking from 1 (low) to 5 (high).
          </p>
          {stage === "before"
            ? rating(before, setBefore)
            : rating(after, setAfter)}
          <button
            disabled={(stage === "before" ? before : after).some(
              (v) => v === null,
            )}
            onClick={() => setStage(stage === "before" ? "exposure" : "done")}
          >
            {stage === "before"
              ? "Save ratings and start exposure"
              : "Compare my ratings"}
          </button>
        </>
      )}
      {stage === "exposure" && (
        <>
          <div className="frontier-exposure-card">
            <Pattern variant={sequence[index]} />
            <p>Exposure {index + 1} of 12</p>
          </div>
          <button
            onClick={() => {
              if (index === 11) setStage("after");
              else setIndex((i) => i + 1);
            }}
          >
            {index === 11
              ? "Finish exposure and rate again"
              : "Next exposure card"}
          </button>
        </>
      )}
      {stage === "done" && (
        <>
          <div className="frontier-table-wrap">
            <table className="simple-history">
              <caption>Your own ratings, not simulated preferences</caption>
              <thead>
                <tr>
                  <th>Pattern</th>
                  <th>Exposures</th>
                  <th>Before</th>
                  <th>After</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1].map((v) => (
                  <tr key={v}>
                    <th>{v ? "B" : "A"}</th>
                    <td>{sequence.filter((n) => n === v).length}</td>
                    <td>{before[v]}</td>
                    <td>{after[v]}</td>
                    <td>{after[v]! - before[v]!}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p role="status" className="play-feedback">
            One symbol appeared nine times and the other three. Did liking
            increase, decrease, or stay the same? Every result is a valid
            self-report; one attempt cannot establish causation.
          </p>
        </>
      )}
      <p className="frontier-note">
        Self-paced exposure, no automatic flashing. The patterns are original
        artwork. Familiarity, boredom, and expectations may all influence a
        rating.
      </p>
    </>
  );
}
