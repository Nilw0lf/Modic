"use client";
import { useState } from "react";
import { rng } from "@/lib/simulations/mosaic";
import { Actions, Slider, Stats } from "../depth/Shared";
export function Flanker({ seed }: { seed: number }) {
  const [trial, setTrial] = useState(0),
    [response, setResponse] = useState<boolean | null>(null),
    [scores, setScores] = useState<{ congruent: boolean; correct: boolean }[]>(
      [],
    ),
    target = rng(seed + trial)() < 0.5,
    congruent = trial % 2 === 0,
    flank = congruent ? target : !target;
  return (
    <>
      {trial < 10 ? (
        <>
          <p>
            Respond to the middle arrow only. Ignore the two arrows on either
            side. This version is untimed.
          </p>
          <div
            className="mosaic-arrows"
            aria-label={`Side arrows ${flank ? "right" : "left"}; middle arrow ${target ? "right" : "left"}`}
          >
            <span>{flank ? "→ →" : "← ←"}</span>
            <b>{target ? "→" : "←"}</b>
            <span>{flank ? "→ →" : "← ←"}</span>
          </div>
          <Actions>
            <button
              disabled={response !== null}
              onClick={() => setResponse(false)}
            >
              Middle points left
            </button>
            <button
              disabled={response !== null}
              onClick={() => setResponse(true)}
            >
              Middle points right
            </button>
            {response !== null && (
              <button
                onClick={() => {
                  setScores((v) => [
                    ...v,
                    { congruent, correct: response === target },
                  ]);
                  setTrial((v) => v + 1);
                  setResponse(null);
                }}
              >
                Next arrow card
              </button>
            )}
          </Actions>
          <p role="status">
            {response === null
              ? `Card ${trial + 1}/10`
              : response === target
                ? "Correct middle-arrow response."
                : "The middle arrow pointed the other way."}
          </p>
        </>
      ) : (
        <Stats
          items={[true, false].map((c) => {
            const rows = scores.filter((s) => s.congruent === c);
            return [
              c ? "Matching flankers" : "Conflicting flankers",
              `${rows.filter((s) => s.correct).length}/${rows.length} correct`,
            ];
          })}
        />
      )}
      <p>
        Flanker research studies interference from irrelevant neighbouring
        stimuli, often using response time as well as accuracy. Ten untimed
        cards cannot establish an individual effect or reproduce a laboratory
        timing result.
      </p>
    </>
  );
}
export function Ebbinghaus() {
  const [r, setR] = useState(20),
    [reveal, setReveal] = useState(false);
  return (
    <>
      <p>
        Adjust the right central circle until the centres look equal, then
        remove their surrounds. Your chosen match is preserved.
      </p>
      <Slider
        id="central-radius"
        label="Right central radius (drawing units)"
        value={r}
        min={12}
        max={28}
        onChange={(v) => {
          setR(v);
          setReveal(false);
        }}
      />
      <svg
        className="mosaic-illusion"
        viewBox="0 0 520 250"
        role="img"
        aria-label="Two central circles with different surrounding circle sizes"
      >
        {!reveal &&
          [130, 390].flatMap((cx, j) =>
            Array.from({ length: 6 }, (_, i) => (
              <circle
                key={`${j}${i}`}
                cx={cx + 65 * Math.cos((i * Math.PI) / 3)}
                cy={125 + 65 * Math.sin((i * Math.PI) / 3)}
                r={j ? 24 : 8}
                fill="var(--muted)"
              />
            )),
          )}
        <circle cx="130" cy="125" r="20" fill="var(--accent)" />
        <circle cx="390" cy="125" r={r} fill="var(--accent)" />
      </svg>
      <Actions>
        <button onClick={() => setReveal((v) => !v)}>
          {reveal ? "Restore surrounds" : "Record match & remove surrounds"}
        </button>
      </Actions>
      {reveal && (
        <Stats
          items={[
            ["Left central radius", "20"],
            ["Your right central radius", String(r)],
            ["Physical radius difference", String(r - 20)],
          ]}
        />
      )}
      <p>
        The display reports physical drawing dimensions and your adjustment. It
        does not force an illusory response, calibrate your screen or measure a
        visual ability. Looking at the numeric slider also supplies a nonvisual
        cue.
      </p>
    </>
  );
}
export function Muller() {
  const [length, setLength] = useState(240),
    [plain, setPlain] = useState(false),
    a = 260 - length / 2,
    b = 260 + length / 2;
  return (
    <>
      <p>
        Match the lower shaft to the upper one, then inspect their endpoints
        without fins.
      </p>
      <Slider
        id="shaft-length"
        label="Lower shaft length"
        value={length}
        min={180}
        max={300}
        step={5}
        onChange={(v) => {
          setLength(v);
          setPlain(false);
        }}
      />
      <svg
        className="mosaic-illusion"
        viewBox="0 0 520 240"
        role="img"
        aria-label="Two horizontal shafts with opposing fin arrangements"
      >
        <g stroke="var(--foreground)" strokeWidth="4" fill="none">
          <path d={`M140 65H380 M${a} 170H${b}`} />
          {!plain && (
            <path
              d={`M120 45L140 65L120 85 M400 45L380 65L400 85 M${a + 20} 150L${a} 170L${a + 20} 190 M${b - 20} 150L${b} 170L${b - 20} 190`}
            />
          )}
        </g>
      </svg>
      <Actions>
        <button onClick={() => setPlain((v) => !v)}>
          {plain ? "Restore fins" : "Record match & hide fins"}
        </button>
      </Actions>
      {plain && (
        <Stats
          items={[
            ["Upper shaft", "240 units"],
            ["Lower shaft", `${length} units`],
            ["Physical difference", `${length - 240} units`],
          ]}
        />
      )}
      <p>
        The Müller–Lyer illusion concerns context-dependent apparent length.
        This self-adjustment has no controlled exposure time or validated
        perceptual measurement, and the numerical control can influence the
        match.
      </p>
    </>
  );
}
export function Contrast() {
  const [value, setValue] = useState(128),
    [plain, setPlain] = useState(false);
  return (
    <>
      <p>
        Match the right inner square to the left, then replace both surrounds
        with the same grey.
      </p>
      <Slider
        id="grey-level"
        label="Right square RGB channel value"
        value={value}
        min={64}
        max={192}
        onChange={(v) => {
          setValue(v);
          setPlain(false);
        }}
      />
      <svg
        className="mosaic-illusion"
        viewBox="0 0 520 240"
        role="img"
        aria-label="Grey patches on different brightness surrounds"
      >
        <rect
          x="20"
          y="20"
          width="230"
          height="200"
          fill={plain ? "#888" : "#222"}
        />
        <rect
          x="270"
          y="20"
          width="230"
          height="200"
          fill={plain ? "#888" : "#ddd"}
        />
        <rect x="95" y="85" width="80" height="70" fill="rgb(128,128,128)" />
        <rect
          x="345"
          y="85"
          width="80"
          height="70"
          fill={`rgb(${value},${value},${value})`}
        />
      </svg>
      <Actions>
        <button onClick={() => setPlain((v) => !v)}>
          {plain
            ? "Restore different surrounds"
            : "Record match & equalise surrounds"}
        </button>
      </Actions>
      {plain && (
        <Stats
          items={[
            ["Left patch RGB", "128 / 128 / 128"],
            ["Right patch RGB", `${value} / ${value} / ${value}`],
            ["Channel difference", String(value - 128)],
          ]}
        />
      )}
      <p>
        Screen RGB values specify the drawing, not calibrated luminance.
        Surround context can affect apparent brightness, but this activity does
        not establish a universal match or a display-independent effect size.
      </p>
    </>
  );
}
export function FigureGround() {
  const [focus, setFocus] = useState("Neutral");
  return (
    <>
      <p>
        The same boundary can organise a central vessel or two facing profiles.
        Choose a cue; no response is scored.
      </p>
      <svg
        className="mosaic-illusion"
        viewBox="0 0 400 270"
        role="img"
        aria-label="An authored reversible vase and face-profile figure"
      >
        <rect
          width="400"
          height="270"
          fill={focus === "Faces" ? "#f4f4f4" : "#202020"}
        />
        <path
          d="M160 20 C165 50 145 60 145 75 L165 86 L138 103 L150 120 Q170 136 162 162 Q150 187 125 232 L275 232 Q250 187 238 162 Q230 136 250 120 L262 103 L235 86 L255 75 C255 60 235 50 240 20 Z"
          fill={focus === "Faces" ? "#202020" : "#f4f4f4"}
          stroke={focus === "Neutral" ? "none" : "var(--accent)"}
          strokeWidth="3"
        />
      </svg>
      <Actions>
        {["Neutral", "Vase", "Faces"].map((f) => (
          <button
            key={f}
            aria-pressed={focus === f}
            onClick={() => setFocus(f)}
          >
            {f}
          </button>
        ))}
      </Actions>
      <p role="status">
        {focus === "Vase"
          ? "Cue: follow the central enclosed vessel."
          : focus === "Faces"
            ? "Cue: follow the two opposing profiles beside the boundary."
            : "Inspect which organisation stands out to you."}
      </p>
      <p>
        This authored figure illustrates Rubin-style figure–ground organisation.
        A cue changes the drawing contrast as well as directing attention; it
        does not prove an involuntary perceptual switch or diagnose perception.
      </p>
    </>
  );
}
