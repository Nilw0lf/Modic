"use client";
import { useState } from "react";
import { adaptation, ratingDifference } from "@/lib/simulations/philosophy";
import { seededRandom } from "@/lib/simulations/random";
import { Slider, Stats } from "../foundations/Shared";

const reasons = [
  "Consequences",
  "Duties or rights",
  "Intention or use as a means",
  "Reality or authenticity",
  "The assumptions need examination",
];
export function TrolleyBoard() {
  const [choices, setChoices] = useState<{ action: string; reason: string }[]>(
      [],
    ),
    [reason, setReason] = useState(reasons[0]),
    index = choices.length;
  return (
    <>
      <p className="philo-note">
        An abstract discussion of fatal harm; no graphic imagery. Withhold
        judgment is always available.
      </p>
      {index < 2 ? (
        <>
          <div className="philo-dilemma">
            <span>Case {index + 1} of 2</span>
            <h3>{index === 0 ? "A track switch" : "A person on the bridge"}</h3>
            <div
              className="philo-track-choice"
              aria-label="Five people versus one person"
            >
              <span>
                ◉ ◉ ◉ ◉ ◉<small>Five threatened</small>
              </span>
              <b>↔</b>
              <span>
                ◉<small>One would die</small>
              </span>
            </div>
            <p>
              {index === 0
                ? "A runaway trolley threatens five. Switching it onto the other track is stipulated to kill one instead."
                : "Pushing a person from a bridge is stipulated to stop the trolley, killing that person and saving five. No other option is supplied in this artificial case."}
            </p>
          </div>
          <label className="philo-select">
            Reason to record
            <select value={reason} onChange={(e) => setReason(e.target.value)}>
              {reasons.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <div className="play-actions">
            {["Intervene", "Do not intervene", "Withhold judgment"].map(
              (action) => (
                <button
                  key={action}
                  onClick={() => setChoices((v) => [...v, { action, reason }])}
                >
                  {action}
                </button>
              ),
            )}
          </div>
        </>
      ) : (
        <p role="status" className="play-feedback">
          Both choices recorded. Compare the act, intention, and selected
          reason; equal headcounts alone do not establish a moral verdict.
        </p>
      )}
      <ol className="philo-ledger">
        {choices.map((c, i) => (
          <li key={i}>
            <strong>
              {i === 0 ? "Switch" : "Bridge"}: {c.action}
            </strong>{" "}
            · Reason: {c.reason}.{" "}
            {c.action === "Withhold judgment"
              ? "No verdict recorded."
              : c.action === "Intervene"
                ? "Stipulated result: one dies, five survive."
                : "Stipulated result: five die, one survives."}
          </li>
        ))}
      </ol>
    </>
  );
}
const experiencePairs = [
  {
    theme: "Achievement",
    a: "Experience finishing a beautiful novel in a machine; no novel is actually written.",
    b: "Actually write the novel. Pleasantness is stipulated equal to the machine.",
    attribute: "Actual achievement",
  },
  {
    theme: "Connection",
    a: "Experience warm simulated friendships with no other conscious person involved.",
    b: "Relate to actual people. Pleasantness is stipulated equal to the simulation.",
    attribute: "Real relationships",
  },
  {
    theme: "Agency",
    a: "Have equally pleasant experiences chosen for you without informed control.",
    b: "Retain informed control over equally pleasant experiences and their connection to reality.",
    attribute: "Informed agency",
  },
];
export function ExperienceBoard() {
  const [choices, setChoices] = useState<{ choice: string; reason: string }[]>(
      [],
    ),
    [reason, setReason] = useState("Reality or authenticity"),
    pair = experiencePairs[choices.length];
  return (
    <>
      {pair ? (
        <>
          <p className="philo-mission">
            Card {choices.length + 1}/3 · {pair.theme}
          </p>
          <div className="philo-pair">
            {[pair.a, pair.b].map((text, i) => (
              <div key={text}>
                <span>Option {i ? "B" : "A"}</span>
                <p>{text}</p>
                <button
                  onClick={() =>
                    setChoices((v) => [...v, { choice: i ? "B" : "A", reason }])
                  }
                >
                  Choose option {i ? "B" : "A"}
                </button>
              </div>
            ))}
          </div>
          <label className="philo-select">
            Reason for the next choice
            <select value={reason} onChange={(e) => setReason(e.target.value)}>
              {reasons.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
        </>
      ) : (
        <p role="status" className="play-feedback">
          Three choices recorded. You chose B in{" "}
          {choices.filter((c) => c.choice === "B").length} cases. This is a
          preference record, not a happiness score or a proof that virtual
          activities lack value.
        </p>
      )}
      <ol className="philo-ledger">
        {choices.map((c, i) => (
          <li key={i}>
            {experiencePairs[i].theme}: option {c.choice} · {c.reason}
          </li>
        ))}
      </ol>
      <p className="philo-note">
        Pleasantness is deliberately held equal within each fictional pair. Real
        technologies and experiences rarely divide into such clean categories.
      </p>
    </>
  );
}
export function AdaptationBoard() {
  const [retention, setRetention] = useState(0.5),
    [s, setS] = useState({
      value: 0,
      persistent: 0,
      credits: 4,
      steps: 0,
      history: [0],
      comparison: [0],
    });
  const max = Math.max(10, ...s.comparison);
  return (
    <>
      <Slider
        id="adaptation-retention"
        label="Response retained after a time step"
        min={0}
        max={1}
        step={0.1}
        value={retention}
        onChange={(v) => {
          setRetention(v);
          setS({
            value: 0,
            persistent: 0,
            credits: 4,
            steps: 0,
            history: [0],
            comparison: [0],
          });
        }}
      />
      <div className="philo-upgrade-track">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} className={i < 4 - s.credits ? "spent" : ""}>
            {i < 4 - s.credits ? "Used" : "Upgrade"}
          </span>
        ))}
      </div>
      <div className="play-actions">
        <button
          disabled={s.credits === 0 || s.steps === 8}
          onClick={() =>
            setS((v) => ({
              ...v,
              value: v.value + 10,
              persistent: v.persistent + 10,
              credits: v.credits - 1,
              history: [...v.history, v.value + 10],
              comparison: [...v.comparison, v.persistent + 10],
            }))
          }
        >
          Spend one upgrade (+10)
        </button>
        <button
          disabled={s.steps === 8}
          onClick={() =>
            setS((v) => {
              const value = adaptation(v.value, retention);
              return {
                ...v,
                value,
                steps: v.steps + 1,
                history: [...v.history, value],
                comparison: [...v.comparison, v.persistent],
              };
            })
          }
        >
          Let one period pass
        </button>
      </div>
      <figure className="philo-response">
        <svg
          viewBox="0 0 600 220"
          role="img"
          aria-label={`Adapting response: ${s.history.join(", ")}; persistent counterfactual: ${s.comparison.join(", ")}`}
        >
          <line x1="60" y1="180" x2="580" y2="180" stroke="var(--border)" />
          {[s.history, s.comparison].map((points, i) => (
            <polyline
              key={i}
              points={points
                .map(
                  (n, j) =>
                    `${60 + (j * 520) / Math.max(1, points.length - 1)},${180 - (n / max) * 150}`,
                )
                .join(" ")}
              stroke={i ? "var(--positive)" : "var(--accent)"}
              strokeDasharray={i ? "6 4" : undefined}
              fill="none"
              strokeWidth="3"
            />
          ))}
          <text x="60" y="20" fill="var(--muted)" fontSize="14">
            Illustrative response units
          </text>
        </svg>
        <figcaption>
          Solid: adapting response · Dashed: same upgrades without decay. One
          point per action, not equal time intervals.
        </figcaption>
      </figure>
      <Stats
        items={[
          ["Current response", s.value.toFixed(2)],
          ["Persistent counterfactual", s.persistent.toFixed(2)],
          ["Time steps", `${s.steps}/8`],
        ]}
      />
      <p role="status" className="play-feedback">
        {s.credits} upgrade credits remain. A time step retains{" "}
        {(retention * 100).toFixed(0)}% of the prior response. This parameter is
        an assumption, not a measured rate of human happiness.
      </p>
    </>
  );
}
function Ratings({
  values,
  set,
  labels,
}: {
  values: (number | null)[];
  set: (v: (number | null)[]) => void;
  labels: string[];
}) {
  return (
    <div className="philo-ratings">
      {labels.map((label, i) => (
        <div key={i}>
          <h3>{label}</h3>
          <div
            role="group"
            aria-label={`Rate ${i === 0 ? "A" : "B"}`}
            className="philo-rating-buttons"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                aria-pressed={values[i] === n}
                onClick={() => set(values.map((v, j) => (i === j ? n : v)))}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
function Comparison({
  before,
  after,
  caption,
}: {
  before: number[];
  after: number[];
  caption: string;
}) {
  const differences = ratingDifference(before, after);
  return (
    <div className="philo-table-wrap" tabIndex={0}>
      <table className="simple-history">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th>Person</th>
            <th>Before</th>
            <th>After</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {[0, 1].map((i) => (
            <tr key={i}>
              <th>{i ? "B" : "A"}</th>
              <td>{before[i]}</td>
              <td>{after[i]}</td>
              <td>{differences[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function LuckBoard({ seed }: { seed: number }) {
  const [before, setBefore] = useState<(number | null)[]>([null, null]),
    [after, setAfter] = useState<(number | null)[]>([null, null]),
    [stage, setStage] = useState(0),
    damaged = seededRandom(seed)() < 0.5 ? 0 : 1;
  return (
    <>
      <div className="philo-claim">
        <h3>Same conduct, same stipulated risk</h3>
        <p>
          Couriers A and B each knowingly skip the same protective packaging
          check. Their packages have identical risk. Rate responsibility from 1
          (low) to 5 (high).
        </p>
      </div>
      {stage < 2 ? (
        <>
          <Ratings
            values={stage === 0 ? before : after}
            set={stage === 0 ? setBefore : setAfter}
            labels={
              stage === 0
                ? [
                    "Courier A before the outcome",
                    "Courier B before the outcome",
                  ]
                : [
                    `Courier A: ${damaged === 0 ? "artwork damaged" : "artwork intact"}`,
                    `Courier B: ${damaged === 1 ? "artwork damaged" : "artwork intact"}`,
                  ]
            }
          />
          <button
            disabled={(stage === 0 ? before : after).some((n) => n === null)}
            onClick={() => setStage((v) => v + 1)}
          >
            {stage === 0
              ? "Save conduct ratings and reveal deliveries"
              : "Compare responsibility ratings"}
          </button>
        </>
      ) : (
        <>
          <Comparison
            before={before as number[]}
            after={after as number[]}
            caption="Your responsibility judgments before and after outcome disclosure"
          />
          <p role="status" className="play-feedback">
            The conduct and stated risk were identical. The damage differed by a
            controlled chance assignment. Your ratings changed by{" "}
            {ratingDifference(before as number[], after as number[]).join(
              " / ",
            )}
            . No legal or moral grade is inferred.
          </p>
        </>
      )}
      <p className="philo-note">
        One damaged and one intact package are paired by design. This does not
        estimate independent damage probabilities; it isolates the contrast in
        known outcomes.
      </p>
    </>
  );
}
export function CredibilityBoard() {
  const [before, setBefore] = useState<(number | null)[]>([null, null]),
    [after, setAfter] = useState<(number | null)[]>([null, null]),
    [stage, setStage] = useState(0);
  return (
    <>
      <div className="philo-claim">
        <h3>The identical maintenance report</h3>
        <p>
          Both witnesses directly observed a leak at valve 3 at 10:00. Each
          passed the same technical check, 10/10. Rate credibility from 1 (low)
          to 5 (high). All stated evidence and expertise are equal.
        </p>
      </div>
      {stage < 2 ? (
        <>
          <Ratings
            values={stage === 0 ? before : after}
            set={stage === 0 ? setBefore : setAfter}
            labels={
              stage === 0
                ? ["Anonymous witness A", "Anonymous witness B"]
                : ["A: established manager", "B: new apprentice"]
            }
          />
          <button
            disabled={(stage === 0 ? before : after).some((n) => n === null)}
            onClick={() => setStage((v) => v + 1)}
          >
            {stage === 0
              ? "Save anonymous ratings and reveal roles"
              : "Compare credibility ratings"}
          </button>
        </>
      ) : (
        <>
          <Comparison
            before={before as number[]}
            after={after as number[]}
            caption="Same report and stipulated expertise, different visible role labels"
          />
          <p role="status" className="play-feedback">
            Rating changes:{" "}
            {ratingDifference(before as number[], after as number[]).join(
              " / ",
            )}
            . Ask what relevant evidence changed when the role labels appeared.
            A rating difference alone does not establish identity prejudice.
          </p>
        </>
      )}
      <p className="philo-note">
        Fricker&apos;s concept concerns wronging someone as a knower, including
        identity-based credibility deficits. The activity is an original prompt
        for reflection, not a diagnosis or the full social theory.
      </p>
    </>
  );
}
