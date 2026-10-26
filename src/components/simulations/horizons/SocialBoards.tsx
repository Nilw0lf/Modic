"use client";
import { useState } from "react";
import { rng } from "@/lib/simulations/horizons";
import { Actions, Ledger, Slider, Stats, fmt, pct } from "../depth/Shared";
function Glyph({ id }: { id: number }) {
  const r = rng(id * 131 + 72);
  return (
    <svg
      viewBox="0 0 100 100"
      className="horizon-glyph"
      role="img"
      aria-label={`Original pattern ${id + 1}`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <line
          key={i}
          x1={15 + 70 * r()}
          y1={15 + 70 * r()}
          x2={15 + 70 * r()}
          y2={15 + 70 * r()}
          stroke="currentColor"
          strokeWidth="4"
        />
      ))}
    </svg>
  );
}
export function Facilitation({ seed }: { seed: number }) {
  const [strength, setStrength] = useState(1),
    [audience, setAudience] = useState(1),
    [reverse, setReverse] = useState(false),
    [run, setRun] = useState(false);
  const p = 1 / (1 + Math.exp(-strength)),
    a = 1 / (1 + Math.exp(-strength - audience)),
    correct = (v: number) => (reverse ? 1 - v : v);
  const random = rng(seed);
  let alone = 0,
    watched = 0;
  for (let i = 0; i < 100; i++) {
    const u = random();
    if (reverse ? u >= p : u < p) alone++;
    if (reverse ? u >= a : u < a) watched++;
  }
  return (
    <>
      <p className="depth-callout">
        Habit: choose A.{" "}
        {reverse
          ? "Today’s instruction requires B; the habitual response is wrong."
          : "Today’s instruction requires A; the habitual response is correct."}
      </p>
      <Slider
        id="habit"
        label="Habit strength (authored log-odds)"
        value={strength}
        min={0.2}
        max={3}
        step={0.2}
        onChange={(v) => {
          setStrength(v);
          setRun(false);
        }}
      />
      <Slider
        id="audience"
        label="Audience boost to the habitual response"
        value={audience}
        min={0}
        max={2}
        step={0.2}
        onChange={(v) => {
          setAudience(v);
          setRun(false);
        }}
      />
      <Actions>
        <button
          aria-pressed={reverse}
          onClick={() => {
            setReverse((v) => !v);
            setRun(false);
          }}
        >
          Reverse task instruction
        </button>
        <button onClick={() => setRun(true)}>Simulate 100 attempts</button>
      </Actions>
      <Stats
        items={[
          ["Expected accuracy alone", pct(correct(p))],
          ["Expected accuracy with audience", pct(correct(a))],
        ]}
      />
      {run && (
        <Stats
          items={[
            ["Correct alone", `${alone}/100`],
            ["Correct with audience", `${watched}/100`],
          ]}
        />
      )}
      <p>
        Zajonc’s dominant-response account predicts different directions
        depending on whether the dominant response is appropriate. The logistic
        boost is Modic’s teaching assumption, not a fitted psychological effect
        size or a prediction of your performance.
      </p>
    </>
  );
}
export function Priming() {
  const [step, setStep] = useState(0),
    [rating, setRating] = useState(3),
    [records, setRecords] = useState<{ prime: string; rating: number }[]>([]);
  const primes = [
      "DELIGHT",
      "DREAD",
      "NEUTRAL",
      "NEUTRAL",
      "DELIGHT",
      "DREAD",
      "DREAD",
      "NEUTRAL",
      "DELIGHT",
    ],
    prime = primes[Math.min(step, 8)];
  return (
    <>
      <p>
        A visible context word appears before an original symbol. Rate the
        symbol’s pleasantness; there is no correct preference.
      </p>
      {step < 9 ? (
        <>
          <div className="horizon-prime">{prime}</div>
          <Glyph id={step % 3} />
          <Slider
            id="pleasantness"
            label="Your pleasantness rating"
            value={rating}
            min={1}
            max={5}
            onChange={setRating}
          />
          <Actions>
            <button
              onClick={() => {
                setRecords((v) => [...v, { prime, rating }]);
                setStep((v) => v + 1);
                setRating(3);
              }}
            >
              Save rating & continue
            </button>
          </Actions>
          <p>Trial {step + 1}/9 · 1 unpleasant, 5 pleasant</p>
        </>
      ) : (
        <Ledger
          label="Your recorded ratings"
          headers={["Visible context", "Ratings", "Mean"]}
          rows={["DELIGHT", "DREAD", "NEUTRAL"].map((word) => {
            const values = records
              .filter((r) => r.prime === word)
              .map((r) => r.rating);
            return [
              word,
              values.join(", "),
              fmt(values.reduce((a, b) => a + b, 0) / values.length),
            ];
          })}
        />
      )}
      <p>
        These are visible words, repeated symbols and self-reports. This
        activity is not a subliminal replication of Murphy and Zajonc, and
        neither a difference nor no difference establishes an unconscious
        priming effect.
      </p>
    </>
  );
}
export function Recognition({ seed }: { seed: number }) {
  const [exposure, setExposure] = useState(0),
    [trial, setTrial] = useState(0),
    [liked, setLiked] = useState<number | null>(null),
    [remembered, setRemembered] = useState<number | null>(null),
    [scores, setScores] = useState<[number, number][]>([]);
  const old = trial % 4,
    newId = 4 + trial,
    leftOld = rng(seed + trial)() < 0.5,
    ids = leftOld ? [old, newId] : [newId, old];
  return (
    <>
      {exposure < 8 ? (
        <>
          <p>
            Study card {exposure + 1}/8. Inspect the pattern, then advance at
            your own pace.
          </p>
          <Glyph id={exposure % 4} />
          <Actions>
            <button onClick={() => setExposure((v) => v + 1)}>
              Next study card
            </button>
          </Actions>
        </>
      ) : trial < 8 ? (
        <>
          <p>
            Pair {trial + 1}/8. Make two separate judgments about the same pair.
          </p>
          <div className="horizon-pair">
            {ids.map((id, i) => (
              <div key={id}>
                <b>{i ? "Right" : "Left"}</b>
                <Glyph id={id} />
              </div>
            ))}
          </div>
          <Actions>
            {["Left", "Right"].map((side, i) => (
              <button
                key={side}
                aria-pressed={liked === i}
                onClick={() => setLiked(i)}
              >
                Prefer {side.toLowerCase()}
              </button>
            ))}
          </Actions>
          <Actions>
            {["Left", "Right"].map((side, i) => (
              <button
                key={side}
                aria-pressed={remembered === i}
                onClick={() => setRemembered(i)}
              >
                Saw {side.toLowerCase()} before
              </button>
            ))}
          </Actions>
          <Actions>
            <button
              disabled={liked === null || remembered === null}
              onClick={() => {
                setScores((v) => [
                  ...v,
                  [
                    ids[liked!] === old ? 1 : 0,
                    ids[remembered!] === old ? 1 : 0,
                  ],
                ]);
                setTrial((v) => v + 1);
                setLiked(null);
                setRemembered(null);
              }}
            >
              Record both judgments
            </button>
          </Actions>
        </>
      ) : (
        <Stats
          items={[
            [
              "Preferred the studied pattern",
              `${scores.reduce((s, v) => s + v[0], 0)}/8`,
            ],
            [
              "Recognised the studied pattern",
              `${scores.reduce((s, v) => s + v[1], 0)}/8`,
            ],
          ]}
        />
      )}
      <p>
        Liking and old–new recognition are different responses. Ordinary
        visible, untimed exposures do not reproduce the degraded exposures in
        Kunst-Wilson and Zajonc’s research. Eight unblinded pairs cannot
        establish a dissociation statistically.
      </p>
    </>
  );
}
export function Ignorance() {
  const [estimate, setEstimate] = useState(80),
    [revealed, setRevealed] = useState(false);
  return (
    <>
      <p>
        Eight fictional teammates all attend optional late meetings. Before
        seeing their private votes, estimate how many prefer keeping the late
        meeting.
      </p>
      <Slider
        id="norm-estimate"
        label="Your estimate of support"
        value={estimate}
        min={0}
        max={100}
        step={10}
        suffix="%"
        onChange={setEstimate}
      />
      <div className="horizon-people">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i}>
            <span aria-hidden>●</span>
            <b>Member {i + 1}</b>
            <small>
              {revealed
                ? i < 6
                  ? "Prefer earlier"
                  : "Prefer late"
                : "Attends late"}
            </small>
          </div>
        ))}
      </div>
      <Actions>
        <button disabled={revealed} onClick={() => setRevealed(true)}>
          Publish anonymous preference poll
        </button>
      </Actions>
      {revealed && (
        <Stats
          items={[
            ["Your estimated support", `${estimate}%`],
            ["Actual stipulated support", "25%"],
            ["Each member’s prior belief", "Others mostly prefer late"],
          ]}
        />
      )}
      <p>
        Attendance is visible; private preference is not. The six-to-two split
        and shared mistaken belief are authored, not survey findings. A
        preference poll supplies information but does not by itself resolve
        scheduling constraints.
      </p>
    </>
  );
}
export function Abilene() {
  const [choice, setChoice] = useState<string | null>(null),
    [reveal, setReveal] = useState(false);
  return (
    <>
      <p className="depth-callout">
        A team proposes an unnecessary overnight trip. Each colleague says “fine
        by me.” You privately prefer staying and think everyone else wants to
        go.
      </p>
      <Actions>
        <button
          disabled={reveal}
          aria-pressed={choice === "yes"}
          onClick={() => setChoice("yes")}
        >
          Agree to the trip
        </button>
        <button
          disabled={reveal}
          aria-pressed={choice === "poll"}
          onClick={() => setChoice("poll")}
        >
          Ask for private preferences first
        </button>
        <button disabled={!choice || reveal} onClick={() => setReveal(true)}>
          Run the meeting
        </button>
      </Actions>
      {reveal && (
        <>
          <Ledger
            label="Private preferences behind public agreement"
            headers={["Person", "Private preference", "Reason for public yes"]}
            rows={[
              ["You", "Stay", "Thought others wanted to go"],
              ["Ari", "Stay", "Avoid disappointing Bea"],
              ["Bea", "Stay", "Thought Chen proposed it enthusiastically"],
              ["Chen", "Stay", "Thought the group expected a trip"],
            ]}
          />
          <p className="depth-callout">
            {choice === "yes"
              ? "The trip is booked despite unanimous private opposition."
              : "The private poll reveals that everyone prefers staying. The team cancels the trip."}
          </p>
        </>
      )}
      <p>
        This is an authored all-opposed scenario illustrating Harvey’s
        management-of-agreement problem. Real agreement can be sincere, and
        asking privately may reveal constraints or disagreement rather than a
        neat consensus.
      </p>
    </>
  );
}
