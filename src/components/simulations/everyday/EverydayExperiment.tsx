"use client";

import { useMemo, useState } from "react";
import { newExperiments } from "@/data/expansion";
import {
  model,
  montyGame,
  payoff,
  playStrategies,
  strategyMove,
  type Series,
  type Strategy,
} from "@/lib/simulations/everyday";
import { seededRandom } from "@/lib/simulations/random";
import { SimulationShell } from "@/components/simulation/SimulationShell";
import { Slider, Stats, Notice } from "../foundations/Shared";
import { StrategyBoard } from "./StrategyBoard";

const colors = ["var(--accent)", "var(--negative)", "var(--positive)"];
const format = (n: number) =>
  Math.abs(n) >= 10000
    ? `${(n / 1000).toFixed(0)}k`
    : Number(n.toFixed(2)).toLocaleString("en-US");

export function Plot({
  series,
  xLabel,
  yLabel,
  selectedX,
}: {
  series: Series[];
  xLabel: string;
  yLabel: string;
  selectedX?: number;
}) {
  const all = series.flatMap((s) => s.points);
  const xmin = Math.min(...all.map((p) => p.x)),
    xmax = Math.max(xmin + 1, ...all.map((p) => p.x));
  const ymin = Math.min(0, ...all.map((p) => p.y)),
    ymax = Math.max(ymin + 1, ...all.map((p) => p.y));
  const x = (v: number) => 68 + ((v - xmin) / (xmax - xmin)) * 610;
  const y = (v: number) => 260 - ((v - ymin) / (ymax - ymin)) * 220;
  return (
    <figure className="everyday-figure">
      <svg
        viewBox="0 0 720 320"
        role="img"
        aria-label={`${yLabel} against ${xLabel}: ${series.map((s) => s.name).join(", ")}`}
      >
        <text x="68" y="20" className="chart-label">
          {yLabel}
        </text>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t}>
            <line
              x1="68"
              x2="678"
              y1={260 - 220 * t}
              y2={260 - 220 * t}
              stroke="var(--border)"
              strokeDasharray="3 5"
            />
            <text
              x="57"
              y={264 - 220 * t}
              textAnchor="end"
              className="chart-tick"
            >
              {format(ymin + t * (ymax - ymin))}
            </text>
            <text
              x={68 + 610 * t}
              y="282"
              textAnchor="middle"
              className="chart-tick"
            >
              {format(xmin + t * (xmax - xmin))}
            </text>
          </g>
        ))}
        <line
          x1="68"
          x2="678"
          y1={y(0)}
          y2={y(0)}
          stroke="var(--muted)"
          opacity=".5"
        />
        {series.map((s, i) => (
          <g key={s.name}>
            <polyline
              points={s.points.map((p) => `${x(p.x)},${y(p.y)}`).join(" ")}
              fill="none"
              stroke={colors[i % 3]}
              strokeWidth="2.4"
              strokeDasharray={i === 1 ? "7 4" : undefined}
            />
            {s.points.length === 1 && (
              <circle
                cx={x(s.points[0].x)}
                cy={y(s.points[0].y)}
                r="4"
                fill={colors[i % 3]}
              />
            )}
          </g>
        ))}
        {selectedX !== undefined && (
          <g>
            <line
              x1={x(selectedX)}
              x2={x(selectedX)}
              y1="40"
              y2="260"
              stroke="var(--foreground)"
              strokeDasharray="2 4"
              opacity=".55"
            />
            {series.map((s, i) => {
              const point = s.points.reduce((a, b) =>
                Math.abs(a.x - selectedX) < Math.abs(b.x - selectedX) ? a : b,
              );
              return (
                <circle
                  key={s.name}
                  cx={x(point.x)}
                  cy={y(point.y)}
                  r="4.5"
                  fill={colors[i % 3]}
                  stroke="var(--background)"
                  strokeWidth="1.5"
                />
              );
            })}
            <text x="678" y="20" textAnchor="end" className="chart-label">
              Selected: {format(selectedX)}
            </text>
          </g>
        )}
        <text x="373" y="310" textAnchor="middle" className="chart-label">
          {xLabel} →
        </text>
      </svg>
      <figcaption>
        {series.map((s, i) => (
          <span key={s.name}>
            <i style={{ background: colors[i % 3] }} />
            {s.name}
            {i === 1 ? " · dashed" : ""}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

function MontyDoors({ seed }: { seed: number }) {
  const [game, setGame] = useState<ReturnType<typeof montyGame> | null>(null);
  const [choice, setChoice] = useState<number | null>(null);
  const [final, setFinal] = useState<number | null>(null);
  const [round, setRound] = useState(0);
  return (
    <div className="concept-play">
      <h3>Try one game yourself</h3>
      <div className="monty-doors">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            disabled={choice !== null}
            onClick={() => {
              setChoice(i);
              setGame(montyGame(seededRandom(seed + round * 7919), i));
            }}
            className={choice === i ? "chosen" : ""}
          >
            <span>Door {i + 1}</span>
            <strong>
              {final !== null
                ? game?.prize === i
                  ? "Prize"
                  : "Goat"
                : game?.opened === i
                  ? "Goat"
                  : "?"}
            </strong>
            <small>
              {choice === i
                ? "Your first choice"
                : game?.opened === i
                  ? "Host opened"
                  : ""}
            </small>
          </button>
        ))}
      </div>
      <div className="concept-actions">
        <button
          disabled={choice === null || final !== null}
          onClick={() => setFinal(choice)}
        >
          Stay
        </button>
        <button
          disabled={!game || final !== null}
          onClick={() => setFinal(game!.switched)}
        >
          Switch
        </button>
        <button
          onClick={() => {
            setChoice(null);
            setGame(null);
            setFinal(null);
            setRound((r) => r + 1);
          }}
        >
          New game
        </button>
      </div>
      <p role="status">
        {final !== null
          ? `${final === game?.prize ? "You won the prize!" : "You got a goat."} Your final door was ${final + 1}.`
          : game
            ? `The host opened door ${game.opened + 1}. Stay with your first choice, or switch?`
            : "Pick one of the three doors. The host knows where the prize is."}
      </p>
    </div>
  );
}

function ConfirmationGame() {
  const [values, setValues] = useState(["8", "10", "12"]);
  const [tests, setTests] = useState<{ values: number[]; matches: boolean }[]>(
    [],
  );
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState("");
  function submit() {
    const numbers = values.map(Number);
    if (
      values.some((v) => v.trim() === "") ||
      numbers.some((n) => !Number.isFinite(n) || Math.abs(n) > 1000000)
    ) {
      setError("Enter three finite numbers between −1,000,000 and 1,000,000.");
      return;
    }
    setError("");
    setTests((t) => [
      ...t,
      {
        values: numbers,
        matches: numbers[0] < numbers[1] && numbers[1] < numbers[2],
      },
    ]);
  }
  return (
    <div className="concept-play">
      <div className="rule-example">
        <span>A sequence that fits</span>
        <strong>2 · 4 · 6</strong>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="triple-inputs">
          {values.map((v, i) => (
            <label key={i}>
              Number {i + 1}
              <input
                type="number"
                step="any"
                min="-1000000"
                max="1000000"
                value={v}
                onChange={(e) =>
                  setValues((old) =>
                    old.map((n, j) => (j === i ? e.target.value : n)),
                  )
                }
              />
            </label>
          ))}
        </div>
        <div className="concept-actions">
          <button type="submit">Test this sequence</button>
          <button type="button" onClick={() => setValues(["1", "2", "9"])}>
            Try unequal gaps
          </button>
          <button type="button" onClick={() => setValues(["6", "4", "2"])}>
            Try descending numbers
          </button>
        </div>
      </form>
      {error && <p role="alert">{error}</p>}
      <Stats
        items={[
          ["Tests submitted", String(tests.length)],
          ["Accepted", String(tests.filter((t) => t.matches).length)],
          ["Rejected", String(tests.filter((t) => !t.matches).length)],
        ]}
      />
      <div role="status" className="rule-feedback">
        {tests.length
          ? `${tests.at(-1)!.values.join(", ")}: ${tests.at(-1)!.matches ? "fits the rule" : "does not fit the rule"}.`
          : "Try a sequence that your current theory would reject."}
      </div>
      {tests.length > 0 && (
        <ol className="test-history">
          {tests.map((t, i) => (
            <li key={i}>
              <span>{t.values.join(" · ")}</span>
              <strong>{t.matches ? "Fits" : "Does not fit"}</strong>
            </li>
          ))}
        </ol>
      )}
      <div className="concept-actions">
        <button onClick={() => setRevealed(true)}>Reveal the rule</button>
      </div>
      {revealed && (
        <Notice>
          <strong>Any three strictly increasing numbers.</strong> Equal gaps and
          even numbers are not required. A “yes” to 8, 10, 12 cannot distinguish
          those narrower theories from the actual rule.
        </Notice>
      )}
    </div>
  );
}

const strategyLabels: Record<Strategy, string> = {
  cooperate: "Always cooperate",
  defect: "Always defect",
  "tit-for-tat": "Tit for tat",
};
function DilemmaGame({
  rounds,
  noise,
  seed,
}: {
  rounds: number;
  noise: number;
  seed: number;
}) {
  const [a, setA] = useState<Strategy>("tit-for-tat"),
    [b, setB] = useState<Strategy>("tit-for-tat");
  const [history, setHistory] = useState<
    { a: boolean; b: boolean; score: [number, number] }[]
  >([]);
  const result = useMemo(
    () => playStrategies(a, b, rounds, noise / 100, seed),
    [a, b, rounds, noise, seed],
  );
  function move(intended: boolean) {
    const random = seededRandom(seed + history.length * 7919);
    let mine = intended,
      theirs = strategyMove(b, history.at(-1)?.a);
    if (random() < noise / 100) mine = !mine;
    if (random() < noise / 100) theirs = !theirs;
    setHistory((h) => [
      ...h,
      { a: mine, b: theirs, score: payoff(mine, theirs) },
    ]);
  }
  return (
    <>
      <div className="concept-play">
        <div className="strategy-selects">
          {(["A", "B"] as const).map((label, i) => (
            <label key={label}>
              Player {label} strategy
              <select
                value={i ? b : a}
                onChange={(e) => {
                  (i ? setB : setA)(e.target.value as Strategy);
                  setHistory([]);
                }}
              >
                {Object.entries(strategyLabels).map(([value, name]) => (
                  <option value={value} key={value}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
        <table className="payoff-table">
          <caption>Payoffs (A, B)</caption>
          <thead>
            <tr>
              <th scope="col">A / B</th>
              <th scope="col">Cooperate</th>
              <th scope="col">Defect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Cooperate</th>
              <td>3, 3</td>
              <td>0, 5</td>
            </tr>
            <tr>
              <th scope="row">Defect</th>
              <td>5, 0</td>
              <td>1, 1</td>
            </tr>
          </tbody>
        </table>
        <h3>Play as A against B</h3>
        <p>
          Your manual choices replace A’s strategy here. The batch below uses
          both selected strategies.
        </p>
        <div className="concept-actions">
          <button onClick={() => move(true)}>Cooperate this round</button>
          <button onClick={() => move(false)}>Defect this round</button>
          <button onClick={() => setHistory([])}>Restart match</button>
        </div>
        <p role="status">
          {history.length
            ? `Round ${history.length}: you ${history.at(-1)!.a ? "cooperated" : "defected"}, B ${history.at(-1)!.b ? "cooperated" : "defected"}. Score: ${history.reduce((sum, h) => sum + h.score[0], 0)} to ${history.reduce((sum, h) => sum + h.score[1], 0)}.`
            : "Start a match. With noise enabled, intended moves can be flipped."}
        </p>
      </div>
      <Plot
        series={[
          { name: `A · ${strategyLabels[a]}`, points: result.first },
          { name: `B · ${strategyLabels[b]}`, points: result.second },
        ]}
        xLabel="Batch rounds"
        yLabel="Cumulative score"
      />
      <Stats
        items={[
          ["A · batch score", String(result.scoreA)],
          ["B · batch score", String(result.scoreB)],
          ["Cooperative moves", `${(result.cooperation * 100).toFixed(1)}%`],
        ]}
      />
      <Notice>
        Mutual cooperation pays more than mutual defection, but defecting
        against a cooperator pays most in a single round. Try Always defect
        against Tit for tat, then introduce mistakes.
      </Notice>
    </>
  );
}

export default function EverydayExperiment({ id }: { id: string }) {
  const entry = newExperiments.find((e) => e.id === id)!;
  const initial = () =>
    Object.fromEntries(entry.controls.map((c) => [c.key, c.value]));
  const [settings, setSettings] = useState(initial),
    [seed, setSeed] = useState(41),
    [resetKey, setResetKey] = useState(0);
  const isGame = id === "confirmation-bias" || id === "prisoners-dilemma";
  const output = useMemo(
    () => (isGame ? null : model(id, settings, seed)),
    [id, isGame, settings, seed],
  );
  const stochastic = [
    "monty-hall",
    "birthday-paradox",
    "law-of-large-numbers",
    "schelling-segregation",
    "prisoners-dilemma",
    "winners-curse",
  ].includes(id);
  function reset() {
    setSettings(initial());
    setSeed(41);
    setResetKey((k) => k + 1);
  }
  return (
    <SimulationShell
      label={entry.title}
      number={String(7 + newExperiments.indexOf(entry)).padStart(3, "0")}
      actions={
        <>
          <button onClick={reset}>Reset</button>
          {stochastic && (
            <button
              onClick={() => {
                setSeed((s) => s + 1);
                setResetKey((k) => k + 1);
              }}
            >
              Resample
            </button>
          )}
        </>
      }
    >
      <div className="simulation-intro">
        <div>
          <h2>{entry.title}</h2>
          <p>{entry.question}</p>
        </div>
        <span className="model-tag">
          {entry.format === "game" ? "PLAY & COMPARE" : "ILLUSTRATIVE MODEL"}
        </span>
      </div>
      {entry.controls.length > 0 && (
        <div className="everyday-controls">
          {entry.controls.map((c) => (
            <Slider
              key={c.key}
              id={`${id}-${c.key}`}
              label={c.label}
              min={c.min}
              max={c.max}
              step={c.step}
              suffix={c.suffix}
              value={settings[c.key]}
              onChange={(value) =>
                setSettings((s) => ({ ...s, [c.key]: value }))
              }
            />
          ))}
        </div>
      )}
      {id === "monty-hall" && <MontyDoors key={resetKey} seed={seed} />}
      <StrategyBoard
        key={`${resetKey}-${JSON.stringify(settings)}`}
        id={id}
        settings={settings}
        seed={seed}
      />
      {id === "confirmation-bias" && <ConfirmationGame key={resetKey} />}
      {id === "prisoners-dilemma" && (
        <DilemmaGame
          key={resetKey}
          rounds={settings.rounds}
          noise={settings.noise}
          seed={seed}
        />
      )}
      {output?.dots && (
        <div
          className="birthday-room"
          aria-label="Birthdays in the sampled room"
        >
          {output.dots.map((day, i) => (
            <span
              key={i}
              className={
                output.dots!.filter((d) => d === day).length > 1
                  ? "matching"
                  : ""
              }
              title={`Person ${i + 1}, day ${day}`}
            >
              {day}
            </span>
          ))}
        </div>
      )}
      {output?.grid && (
        <div className="neighbourhood-wrap">
          <svg
            className="neighbourhood-grid"
            viewBox="0 0 320 320"
            role="img"
            aria-label="Neighbourhood: circles, squares, and vacant cells"
          >
            {output.grid.map((group, i) => {
              const x = (i % 16) * 20,
                y = Math.floor(i / 16) * 20;
              return group === 1 ? (
                <circle
                  key={i}
                  cx={x + 10}
                  cy={y + 10}
                  r="7"
                  fill="var(--accent)"
                />
              ) : group === 2 ? (
                <rect
                  key={i}
                  x={x + 3}
                  y={y + 3}
                  width="14"
                  height="14"
                  rx="2"
                  fill="var(--negative)"
                />
              ) : (
                <rect
                  key={i}
                  x={x + 3}
                  y={y + 3}
                  width="14"
                  height="14"
                  fill="none"
                  stroke="var(--border)"
                />
              );
            })}
          </svg>
          <p>● Group A · ■ Group B · outline = vacancy</p>
        </div>
      )}
      {output && (
        <>
          <Plot
            series={output.series}
            xLabel={output.xLabel}
            yLabel={output.yLabel}
            selectedX={
              {
                "birthday-paradox": settings.people,
                "diminishing-returns": settings.workers,
                "opportunity-cost": settings.work * settings.pay,
                "sunk-cost-fallacy": settings.success,
                "anchoring-bias": settings.anchor,
                "present-bias": settings.offset,
                antifragility: settings.spread,
                "barbell-strategy": settings.return,
                optionality: settings.value,
                "skin-in-the-game": settings.liability,
                "stag-hunt": settings.opponent,
                "chicken-game": settings.opponent,
                "matching-pennies": settings.opponent,
                "coordination-game": settings.opponent,
                "public-goods": settings.contribution,
                "ultimatum-game": settings.offer,
                "vickrey-auction": settings.bid,
              }[id]
            }
          />
          <Stats items={output.stats} />
          <Notice>{output.notice}</Notice>
        </>
      )}
      {entry.controls.length > 0 && (
        <div className="concept-actions concept-challenge">
          <button
            onClick={() => setSettings((s) => ({ ...s, ...entry.preset }))}
          >
            Try this: {entry.challenge} ↗
          </button>
        </div>
      )}
      <p className="everyday-assumption">{entry.limitation}</p>
    </SimulationShell>
  );
}
