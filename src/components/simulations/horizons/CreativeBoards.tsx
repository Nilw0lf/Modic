"use client";
import { useState } from "react";
import { pour, rng } from "@/lib/simulations/horizons";
import { Actions, Slider, Stats, pct } from "../depth/Shared";
export function Einstellung() {
  const [practice, setPractice] = useState(0),
    [amount, setAmount] = useState([0, 0, 0]),
    [moves, setMoves] = useState(0);
  const cap = [14, 32, 4],
    names = ["A", "B", "C"],
    won = amount.includes(10);
  const update = (a: number[]) => {
    setAmount(a);
    setMoves((v) => v + 1);
  };
  return (
    <>
      {practice < 3 ? (
        <>
          <p>Rehearse a rule that works: B − A − 2C.</p>
          <p className="depth-callout">
            {
              ["18 − 3 − 2×2 = 11", "25 − 4 − 2×3 = 15", "30 − 7 − 2×4 = 15"][
                practice
              ]
            }
          </p>
          <Actions>
            <button onClick={() => setPractice((v) => v + 1)}>
              Rehearse familiar rule
            </button>
          </Actions>
        </>
      ) : (
        <>
          <p>
            Now measure exactly ten units in any jug. You can fill, empty or
            pour until either the source is empty or the destination full. Look
            for a shorter route than the familiar recipe.
          </p>
          <div className="horizon-jugs">
            {cap.map((c, i) => (
              <div key={i}>
                <b>Jug {names[i]}</b>
                <div
                  className="horizon-jug-water"
                  role="img"
                  aria-label={`Jug ${names[i]}: ${amount[i]} of ${c} units`}
                >
                  <span style={{ height: `${(100 * amount[i]) / c}%` }} />
                </div>
                <strong>
                  {amount[i]}/{c}
                </strong>
                <button
                  disabled={won || amount[i] === c}
                  onClick={() =>
                    update(amount.map((v, j) => (i === j ? c : v)))
                  }
                >
                  Fill {names[i]}
                </button>
                <button
                  disabled={won || !amount[i]}
                  onClick={() =>
                    update(amount.map((v, j) => (i === j ? 0 : v)))
                  }
                >
                  Empty {names[i]}
                </button>
              </div>
            ))}
          </div>
          <Actions>
            {cap.flatMap((_, i) =>
              cap.map((_, j) =>
                i === j ? null : (
                  <button
                    key={`${i}${j}`}
                    disabled={won || !amount[i] || amount[j] === cap[j]}
                    onClick={() => update(pour(amount, cap, i, j))}
                  >
                    Pour {names[i]} → {names[j]}
                  </button>
                ),
              ),
            )}
          </Actions>
          <Stats
            items={[
              ["Moves", String(moves)],
              ["Goal", won ? "Ten units measured" : "Find ten units"],
            ]}
          />
          {won && (
            <p role="status">
              Solved. A direct route is Fill A, then Pour A → C: 14 − 4 = 10 in
              two moves. The familiar B − A − 2C route also works but takes more
              actions.
            </p>
          )}
        </>
      )}
      <p>
        These are original puzzle numbers inspired by Luchins’s mental-set work.
        Seeing a rehearsal card is not the same as a laboratory training
        condition, and the game does not classify you as inflexible.
      </p>
    </>
  );
}
export function Fixedness() {
  const [empty, setEmpty] = useState(false),
    [mounted, setMounted] = useState(false),
    [beacon, setBeacon] = useState(false),
    [message, setMessage] = useState("");
  return (
    <>
      <p>
        Mount a battery beacon above a fragile floor. Tacks cannot pierce its
        hard case. Your kit contains a beacon and a small rigid box holding
        tacks.
      </p>
      <div className="horizon-workshop">
        <div className="horizon-wall">
          WALL
          {mounted && (
            <div className="horizon-shelf">
              {beacon ? "◉ BEACON" : "EMPTY BOX SHELF"}
            </div>
          )}
        </div>
        <div className="horizon-kit">
          {mounted
            ? "Loose tacks · box mounted as shelf"
            : empty
              ? "Loose tacks · empty box available"
              : "Box containing tacks"}
          {!beacon && " · beacon"}
        </div>
      </div>
      <Actions>
        <button
          disabled={mounted || empty}
          onClick={() => {
            setEmpty(true);
            setMessage(
              "The box is now an available object, separate from the tacks.",
            );
          }}
        >
          Empty the box
        </button>
        <button
          disabled={beacon}
          onClick={() =>
            setMessage(
              "The beacon’s hard case cannot be pierced. What could support it instead?",
            )
          }
        >
          Tack beacon directly
        </button>
        <button
          disabled={mounted}
          onClick={() => {
            if (!empty)
              setMessage(
                "Empty the box before fastening its base to the wall.",
              );
            else {
              setMounted(true);
              setMessage(
                "The box now serves as a shelf, rather than a container.",
              );
            }
          }}
        >
          Fasten box as shelf
        </button>
        <button
          disabled={beacon}
          onClick={() => {
            if (!mounted)
              setMessage("The beacon needs a support above the floor.");
            else {
              setBeacon(true);
              setMessage("Solved: the former container supports the beacon.");
            }
          }}
        >
          Place beacon on support
        </button>
      </Actions>
      <p role="status">
        {message ||
          "Try the materials and inspect their physical possibilities."}
      </p>
      <p>
        This original digital puzzle adapts the object-repurposing idea
        associated with Duncker. No actual equipment handling or validated
        creativity assessment is involved.
      </p>
    </>
  );
}
export function Closure({ seed }: { seed: number }) {
  const [gap, setGap] = useState(45),
    [guess, setGuess] = useState(""),
    [revealed, setRevealed] = useState(false);
  const shapes = ["Triangle", "Square", "Hexagon"],
    index = Math.floor(rng(seed)() * 3),
    vertices = [
      "180,30 290,220 70,220",
      "80,40 280,40 280,240 80,240",
      "180,25 275,80 275,190 180,245 85,190 85,80",
    ];
  return (
    <>
      <Slider
        id="outline-gap"
        label="Hidden share of the outline"
        value={gap}
        min={0}
        max={85}
        step={5}
        onChange={setGap}
      />
      <svg
        className="horizon-scene"
        viewBox="0 0 360 270"
        role="img"
        aria-label={
          revealed
            ? `Complete ${shapes[index].toLowerCase()} outline`
            : "Incomplete geometric outline"
        }
      >
        <polygon
          points={vertices[index]}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          pathLength="100"
          strokeDasharray={revealed ? undefined : `${100 - gap} ${gap}`}
        />
      </svg>
      <Actions>
        {shapes.map((s) => (
          <button
            key={s}
            aria-pressed={guess === s}
            disabled={revealed}
            onClick={() => setGuess(s)}
          >
            {s}
          </button>
        ))}
        <button disabled={!guess || revealed} onClick={() => setRevealed(true)}>
          Reveal complete outline
        </button>
      </Actions>
      {revealed && (
        <p role="status">
          Your guess: {guess}. The generated outline: {shapes[index]}. Reducing
          the gap or prior familiarity can make identification easier.
        </p>
      )}
      <p>
        Closure describes organising incomplete input into a perceived whole.
        The drawing is authored; correctly guessing a familiar shape does not
        isolate closure from other cues or measure a perceptual ability.
      </p>
    </>
  );
}
export function Weber() {
  const [base, setBase] = useState(20),
    [extra, setExtra] = useState(0),
    [record, setRecord] = useState<{ base: number; extra: number }[]>([]);
  return (
    <>
      <p>
        Increase the right disk until you choose to report a noticeable size
        difference. Record your judgment, then compare a larger reference.
      </p>
      <Slider
        id="extra-area"
        label="Added area units on the right"
        value={extra}
        min={0}
        max={20}
        onChange={setExtra}
      />
      <svg
        className="horizon-scene"
        viewBox="0 0 360 170"
        role="img"
        aria-label="Two disks whose areas differ by the chosen amount"
      >
        <circle cx="90" cy="80" r={6 * Math.sqrt(base)} fill="currentColor" />
        <circle
          cx="270"
          cy="80"
          r={6 * Math.sqrt(base + extra)}
          fill="currentColor"
        />
      </svg>
      <Actions>
        <button onClick={() => setRecord((v) => [...v, { base, extra }])}>
          Record noticeable difference
        </button>
        <button
          onClick={() => {
            setBase((v) => (v === 20 ? 80 : 20));
            setExtra(0);
          }}
        >
          Reference: {base === 20 ? "small" : "large"}
        </button>
      </Actions>
      <Stats
        items={[
          ["Reference area", String(base)],
          ["Added / reference", pct(extra / base)],
        ]}
      />
      {record.length > 0 && (
        <p role="status">
          Your reports:{" "}
          {record
            .map(
              (r, i) =>
                `${i + 1}: ${r.extra}/${r.base} = ${pct(r.extra / r.base)}`,
            )
            .join("; ")}
        </p>
      )}
      <p>
        Weber’s law relates just-noticeable differences to reference intensity
        under particular conditions. This unblinded, manually adjusted area
        comparison does not estimate a validated threshold or assume that its
        ratios must match.
      </p>
    </>
  );
}
export function Proximity() {
  const [h, setH] = useState(24),
    [v, setV] = useState(0),
    [judgment, setJudgment] = useState("");
  return (
    <>
      <Slider
        id="horizontal-gaps"
        label="Extra gap between column pairs"
        value={h}
        min={0}
        max={24}
        onChange={setH}
      />
      <Slider
        id="vertical-gaps"
        label="Extra gap between row pairs"
        value={v}
        min={0}
        max={24}
        onChange={setV}
      />
      <svg
        className="horizon-scene"
        viewBox="0 0 330 330"
        role="img"
        aria-label="Thirty-six identical dots with adjustable group spacing"
      >
        {Array.from({ length: 36 }, (_, i) => (
          <circle
            key={i}
            cx={40 + (i % 6) * 35 + Math.floor((i % 6) / 2) * h}
            cy={
              40 +
              Math.floor(i / 6) * 35 +
              Math.floor(Math.floor(i / 6) / 2) * v
            }
            r="7"
            fill="currentColor"
          />
        ))}
      </svg>
      <Actions>
        {["Column pairs", "Row pairs", "No clear grouping"].map((j) => (
          <button
            key={j}
            aria-pressed={judgment === j}
            onClick={() => setJudgment(j)}
          >
            {j}
          </button>
        ))}
      </Actions>
      <p role="status">
        {judgment
          ? `You reported: ${judgment}.`
          : "Which grouping stands out to you?"}{" "}
        There are always 36 dots.
      </p>
      <p>
        Only spacing changes; dot count, shape and colour remain fixed.
        Proximity can influence grouping, but this activity does not force a
        response or isolate every visual cue in a controlled perceptual
        experiment.
      </p>
    </>
  );
}
