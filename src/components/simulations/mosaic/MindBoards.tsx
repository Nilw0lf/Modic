"use client";
import { useState } from "react";
import { Actions, Ledger, Slider, Stats } from "../depth/Shared";
export function Misinformation() {
  const [stage, setStage] = useState(0),
    [colour, setColour] = useState(""),
    [count, setCount] = useState(""),
    [done, setDone] = useState(false);
  return (
    <>
      {stage === 0 ? (
        <>
          <p>
            Inspect the depot scene, then hide it before answering later
            questions.
          </p>
          <svg
            className="mosaic-scene"
            viewBox="0 0 500 200"
            role="img"
            aria-label="Depot scene: three blue vans and two green crates"
          >
            <rect x="10" y="150" width="480" height="5" fill="var(--border)" />
            {[50, 190, 330].map((x) => (
              <g key={x}>
                <rect
                  x={x}
                  y="70"
                  width="90"
                  height="65"
                  rx="8"
                  fill="#315aca"
                />
                <circle cx={x + 20} cy="140" r="12" fill="var(--foreground)" />
                <circle cx={x + 70} cy="140" r="12" fill="var(--foreground)" />
              </g>
            ))}
            <rect x="160" y="20" width="35" height="35" fill="#237458" />
            <rect x="210" y="20" width="35" height="35" fill="#237458" />
          </svg>
          <Actions>
            <button onClick={() => setStage(1)}>Hide the depot scene</button>
          </Actions>
        </>
      ) : stage === 1 ? (
        <>
          <p className="depth-callout">
            Later question: “Was the red van parked next to the crates?” This
            wording introduces a detail that may not match the scene.
          </p>
          <Actions>
            <button onClick={() => setStage(2)}>Continue to recall</button>
          </Actions>
        </>
      ) : (
        <>
          <label>
            What colour were the vans?
            <select
              aria-label="Van colour recall"
              disabled={done}
              value={colour}
              onChange={(e) => setColour(e.target.value)}
            >
              <option value="">Choose a colour</option>
              {["Blue", "Red", "Green", "Unsure"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            How many vans?
            <input
              aria-label="Van count recall"
              type="number"
              disabled={done}
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </label>
          <Actions>
            <button
              disabled={!colour || !count || done}
              onClick={() => setDone(true)}
            >
              Compare with original scene
            </button>
          </Actions>
          {done && (
            <>
              <Stats
                items={[
                  ["Original scene", "3 blue vans"],
                  ["Your report", `${count} ${colour.toLowerCase()} vans`],
                  [
                    "Exact match",
                    colour === "Blue" && Number(count) === 3 ? "Yes" : "No",
                  ],
                ]}
              />
              <p>
                The later question introduced red. Your report is preserved; an
                error or a correct response in this single warned activity does
                not establish a misinformation effect.
              </p>
            </>
          )}
        </>
      )}
      <p>
        Loftus’s research concerns how post-event information can affect memory
        reports under controlled conditions. This visible, untimed, explicitly
        warned task is not a witness assessment or a laboratory replication.
      </p>
    </>
  );
}
export function Consensus() {
  const [own, setOwn] = useState("Quiet"),
    [estimate, setEstimate] = useState(70),
    [show, setShow] = useState(false);
  return (
    <>
      <p>
        Choose a preferred work setting, then estimate how many people in a
        fictional twelve-person panel share your preference.
      </p>
      <Actions>
        {["Quiet", "Collaborative"].map((v) => (
          <button
            key={v}
            disabled={show}
            aria-pressed={own === v}
            onClick={() => setOwn(v)}
          >
            {v}
          </button>
        ))}
      </Actions>
      <Slider
        id="consensus-estimate"
        label="Estimated share matching your preference"
        value={estimate}
        min={0}
        max={100}
        step={5}
        suffix="%"
        disabled={show}
        onChange={setEstimate}
      />
      <Actions>
        <button disabled={show} onClick={() => setShow(true)}>
          Reveal the fictional panel
        </button>
      </Actions>
      {show && (
        <>
          <div className="mosaic-panel">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i}>{i < 4 ? "Quiet" : "Collaborative"}</span>
            ))}
          </div>
          <Stats
            items={[
              ["Your estimate", `${estimate}%`],
              [
                "Panel sharing your preference",
                own === "Quiet" ? "4/12 (33.3%)" : "8/12 (66.7%)",
              ],
            ]}
          />
        </>
      )}
      <p>
        The false-consensus effect concerns overestimating how widely one’s
        judgments are shared. This panel is an authored comparison, not
        population data; one estimate cannot establish that effect in you.
      </p>
    </>
  );
}
export function Attribution() {
  const [role, setRole] = useState(false),
    [first, setFirst] = useState(3),
    [second, setSecond] = useState(3),
    [done, setDone] = useState(false);
  return (
    <>
      <p className="depth-callout">
        A quizmaster asks questions about a private symbol system and gets all
        answers right. A contestant, who was not given the system, gets two of
        six right.
      </p>
      {!role ? (
        <>
          <Slider
            id="initial-ability"
            label="Quizmaster ability rating before role details"
            value={first}
            min={1}
            max={5}
            onChange={setFirst}
          />
          <Actions>
            <button onClick={() => setRole(true)}>
              Reveal role assignment
            </button>
          </Actions>
        </>
      ) : (
        <>
          <p>
            Roles were assigned at random. The quizmaster selected questions
            from a rule sheet they alone could read; the contestant had no
            access to it.
          </p>
          <Slider
            id="revised-ability"
            label="Quizmaster ability rating after role details"
            value={second}
            min={1}
            max={5}
            disabled={done}
            onChange={setSecond}
          />
          <Actions>
            <button disabled={done} onClick={() => setDone(true)}>
              Record rating comparison
            </button>
          </Actions>
          {done && (
            <Stats
              items={[
                ["Before role information", `${first}/5`],
                ["After role information", `${second}/5`],
                ["Rating change", String(second - first)],
              ]}
            />
          )}
        </>
      )}
      <p>
        Fundamental-attribution-error research asks how situational constraints
        are considered when judging people. These fictional quiz results and
        reader ratings do not measure intelligence, prejudice or an attribution
        bias.
      </p>
    </>
  );
}
const facts = [
  ["Compass", "Ari"],
  ["Map", "Ari"],
  ["Wrench", "Bea"],
  ["Clamp", "Bea"],
  ["Lantern", "Chen"],
  ["Battery", "Chen"],
];
export function Transactive() {
  const [study, setStudy] = useState(true),
    [step, setStep] = useState(0),
    [answers, setAnswers] = useState<string[]>([]);
  return (
    <>
      {study ? (
        <>
          <p>
            Learn who holds each part of the team’s information. You will later
            route questions to the relevant person without the roster.
          </p>
          <Ledger
            label="Team knowledge directory"
            headers={["Item", "Person who knows its location"]}
            rows={facts}
          />
          <Actions>
            <button onClick={() => setStudy(false)}>
              Hide directory & route questions
            </button>
          </Actions>
        </>
      ) : step < 6 ? (
        <>
          <p className="depth-callout">
            Who should you ask about the {facts[step][0].toLowerCase()}?
          </p>
          <Actions>
            {["Ari", "Bea", "Chen"].map((name) => (
              <button
                key={name}
                onClick={() => {
                  setAnswers((v) => [...v, name]);
                  setStep((v) => v + 1);
                }}
              >
                {name}
              </button>
            ))}
          </Actions>
        </>
      ) : (
        <>
          <Stats
            items={[
              [
                "Questions routed to the listed expert",
                `${answers.filter((a, i) => a === facts[i][1]).length}/6`,
              ],
            ]}
          />
          <Ledger
            label="Your routing record"
            headers={["Item", "Your choice", "Directory expert"]}
            rows={facts.map(([item, expert], i) => [item, answers[i], expert])}
          />
        </>
      )}
      <p>
        Transactive memory concerns coordinated knowledge about who knows what.
        This authored directory task measures only the routes you chose; it does
        not simulate a team’s total memory capacity or prove a
        collaborative-learning benefit.
      </p>
    </>
  );
}
export function Intentions() {
  const [rules, setRules] = useState(["Open task list", "Take a break"]),
    [run, setRun] = useState(false);
  const cues = ["New message", "Work block begins"],
    events = [1, 0, 0, 1, 0, 1];
  return (
    <>
      <p>
        Build two explicit if–then plans for a fictional work session. Run the
        event cards to inspect which actions the rules actually trigger.
      </p>
      <div className="mosaic-choice-grid">
        {cues.map((cue, i) => (
          <label key={cue}>
            If: {cue}
            <select
              aria-label={`Action for ${cue}`}
              value={rules[i]}
              disabled={run}
              onChange={(e) =>
                setRules((v) => v.map((r, j) => (i === j ? e.target.value : r)))
              }
            >
              {[
                "Open task list",
                "Batch message for later",
                "Reply immediately",
                "Take a break",
              ].map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <Actions>
        <button disabled={run} onClick={() => setRun(true)}>
          Run the six event cards
        </button>
      </Actions>
      {run && (
        <Ledger
          label="Rule execution ledger"
          headers={["Event", "Cue", "Triggered action"]}
          rows={events.map((v, i) => [i + 1, cues[v], rules[v]])}
        />
      )}
      <p>
        Gollwitzer’s implementation intentions specify a cue and response. This
        deterministic rule runner illustrates plan specificity; it does not
        assign productivity points, predict follow-through or establish that a
        particular plan suits a real person’s needs.
      </p>
    </>
  );
}
