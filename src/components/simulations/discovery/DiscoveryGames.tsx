"use client";
import { useState } from "react";
import type { Settings } from "@/lib/simulations/everyday";
import { seededRandom } from "@/lib/simulations/random";
import {
  dice,
  dieChance,
  nimBot,
  nimSum,
  penneyRace,
  travelerPayoff,
} from "@/lib/simulations/discovery";
const normalized = (s: string) => s.trim().toLowerCase();
function Buttons({
  options,
  onChoose,
  disabled = false,
}: {
  options: string[];
  onChoose: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="play-actions">
      {options.map((label) => (
        <button disabled={disabled} key={label} onClick={() => onChoose(label)}>
          {label}
        </button>
      ))}
    </div>
  );
}
function Logic({ id }: { id: string }) {
  const [selected, setSelected] = useState<string[]>([]),
    [result, setResult] = useState("");
  if (id === "cognitive-reflection")
    return (
      <>
        <Buttons
          options={["10 coins", "20 coins", "100 coins"]}
          onChoose={(v) =>
            setResult(
              v === "10 coins"
                ? "Correct: spoon 10, mug 110. Total 120, difference 100."
                : "Try substituting: spoon x, mug x + 100; 2x + 100 = 120, so x = 10.",
            )
          }
        />
        <p role="status" className="play-feedback">
          {result || "Check both the total and the difference."}
        </p>
      </>
    );
  return (
    <>
      <div className="discovery-tiles">
        {["A", "K", "4", "7"].map((v) => (
          <button
            key={v}
            aria-pressed={selected.includes(v)}
            onClick={() => {
              setSelected((s) =>
                s.includes(v) ? s.filter((x) => x !== v) : [...s, v],
              );
              setResult("");
            }}
          >
            {v}
          </button>
        ))}
      </div>
      <button
        onClick={() =>
          setResult(
            selected.length === 2 &&
              selected.includes("A") &&
              selected.includes("7")
              ? "Correct: A could hide an odd number; 7 could hide a vowel."
              : "Check A and 7. K cannot violate a rule about vowels. 4 may have either letter type: the rule does not say every even number must have a vowel.",
          )
        }
      >
        Check selected cards
      </button>
      <p role="status" className="play-feedback">
        {result ||
          "Each card has a letter on one side and a number on the other."}
      </p>
    </>
  );
}
function Nim() {
  const [piles, setPiles] = useState([3, 4, 5]),
    [message, setMessage] = useState(
      "Your turn. Take any positive number from one pile.",
    ),
    [ended, setEnded] = useState(false);
  function take(pile: number, count: number) {
    const next = piles.map((n, i) => (i === pile ? n - count : n));
    if (next.every((n) => n === 0)) {
      setPiles(next);
      setEnded(true);
      setMessage("You took the last stone. You win!");
      return;
    }
    const reply = nimBot(next);
    setPiles(reply);
    if (reply.every((n) => n === 0)) {
      setEnded(true);
      setMessage(
        "The bot took the last stone. Bot wins. Reset to try a different opening.",
      );
    } else
      setMessage(
        `Bot removed ${next.reduce((a, b) => a + b, 0) - reply.reduce((a, b) => a + b, 0)} stone(s). Your turn. Nim-sum now ${nimSum(reply)}.`,
      );
  }
  return (
    <>
      <div className="nim-piles">
        {piles.map((count, i) => (
          <div key={i}>
            <h3>
              Pile {i + 1} · {count} stones
            </h3>
            <p aria-hidden="true" className="stone-row">
              {"● ".repeat(count) || "Empty"}
            </p>
            <div className="play-actions">
              {Array.from({ length: count }, (_, j) => (
                <button disabled={ended} key={j} onClick={() => take(i, j + 1)}>
                  Pile {i + 1}: take {j + 1}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p role="status" className="play-feedback">
        {message}
      </p>
    </>
  );
}
function Auction() {
  const [mine, setMine] = useState(0),
    [bot, setBot] = useState(0),
    [ended, setEnded] = useState(false),
    [message, setMessage] = useState(
      "The bot will bid up to 26 tokens. Your first bid is 1.",
    );
  return (
    <>
      <div className="simple-score">
        <span>Your standing bid: {mine}</span>
        <span>Bot standing bid: {bot}</span>
        <span>Prize: 20</span>
      </div>
      <Buttons
        disabled={ended}
        options={["Bid one more", "Stop bidding"]}
        onChoose={(v) => {
          if (v === "Stop bidding") {
            setEnded(true);
            setMessage(
              `Auction finished. Your net payoff: ${-mine} tokens. A runner-up pays their standing bid.`,
            );
            return;
          }
          const next = bot + 1;
          setMine(next);
          if (next >= 27) {
            setEnded(true);
            setMessage(
              `Bot stops. You win 20 and pay ${next}. Net payoff: ${20 - next} tokens.`,
            );
          } else {
            setBot(next + 1);
            setMessage(
              `Bot bids ${next + 1}. Another bid could avoid paying ${next} as runner-up, but increases your exposure.`,
            );
          }
        }}
      />
      <p role="status" className="play-feedback">
        {message}
      </p>
    </>
  );
}
function Races({ id, seed }: { id: string; seed: number }) {
  const [choice, setChoice] = useState(id === "penneys-game" ? "HHT" : "A"),
    [round, setRound] = useState(0),
    [wins, setWins] = useState(0),
    [message, setMessage] = useState("Choose first, then play a round.");
  return (
    <>
      <label className="discovery-select">
        {id === "penneys-game" ? "Your pattern" : "Your die"}
        <select
          value={choice}
          onChange={(e) => {
            setChoice(e.target.value);
            setRound(0);
            setWins(0);
            setMessage("New matchup selected.");
          }}
        >
          {(id === "penneys-game"
            ? ["HHH", "HHT", "HTH", "HTT", "THH", "THT", "TTH", "TTT"]
            : ["A", "B", "C"]
          ).map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </label>
      {id === "nontransitive-dice" && (
        <div className="simple-cards">
          {dice.map((faces, i) => (
            <div key={i}>
              <h3>Die {"ABC"[i]}</h3>
              <p>{faces.join(" · ")}</p>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => {
          const run = round + 1;
          setRound(run);
          if (id === "penneys-game") {
            const result = penneyRace(choice, seed + run * 101);
            setWins((w) => w + Number(result.winner === "you"));
            setMessage(
              `Opponent: ${result.bot}. Flips: ${result.flips}. ${result.winner === "unfinished" ? "No winner within 200 flips." : result.winner === "you" ? "You win!" : "Opponent wins."}`,
            );
          } else {
            const a = "ABC".indexOf(choice),
              b = (a + 2) % 3,
              rng = seededRandom(seed + run * 101),
              y = dice[a][Math.floor(rng() * 6)],
              bot = dice[b][Math.floor(rng() * 6)];
            setWins((w) => w + Number(y > bot));
            setMessage(
              `You rolled ${y}; opponent ${"ABC"[b]} rolled ${bot}. ${y > bot ? "You win!" : "Opponent wins."} Your exact matchup chance is ${(100 * dieChance(a, b)).toFixed(1)}%.`,
            );
          }
        }}
      >
        {id === "penneys-game" ? "Race patterns" : "Roll dice"}
      </button>
      <p className="simple-score">
        Rounds: {round} · Your wins: {wins}
      </p>
      <p role="status" className="play-feedback discovery-wrap">
        {message}
      </p>
    </>
  );
}
function Memory({ id, seed }: { id: string; seed: number }) {
  const rng = seededRandom(seed),
    pool = [
      "lantern",
      "river",
      "button",
      "orchard",
      "velvet",
      "planet",
      "ribbon",
      "candle",
      "basket",
      "window",
      "feather",
      "compass",
    ],
    words = [...pool]
      .map((word) => ({ word, order: rng() }))
      .sort((a, b) => a.order - b.order)
      .slice(0, 8)
      .map((x) => x.word);
  const [position, setPosition] = useState(0),
    [stage, setStage] = useState("study"),
    [recall, setRecall] = useState(""),
    [result, setResult] = useState<string[]>([]),
    [answers, setAnswers] = useState(["", "", ""]);
  const pairs = [
    ["Dax", "river"],
    ["Mip", "lantern"],
    ["Zog", "orchard"],
  ];
  if (id === "testing-effect")
    return (
      <>
        <h3>
          {stage === "study" ? "Study the pairs" : "Retrieve the partners"}
        </h3>
        {stage === "study" ? (
          <>
            <div className="simple-cards">
              {pairs.map(([a, b]) => (
                <div key={a}>
                  {a} → {b}
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setStage("recall");
                setResult([]);
                setAnswers(["", "", ""]);
              }}
            >
              Hide and retrieve
            </button>
          </>
        ) : (
          <>
            <div className="retrieval-inputs">
              {pairs.map(([a], i) => (
                <label key={a}>
                  {a}
                  <input
                    value={answers[i]}
                    disabled={stage === "results"}
                    onChange={(e) =>
                      setAnswers((s) =>
                        s.map((v, j) => (j === i ? e.target.value : v)),
                      )
                    }
                  />
                </label>
              ))}
            </div>
            {stage === "recall" ? (
              <button
                onClick={() => {
                  setResult(
                    pairs.map(([, b], i) =>
                      normalized(answers[i]) === b ? "correct" : "missed",
                    ),
                  );
                  setStage("results");
                }}
              >
                Check recall
              </button>
            ) : (
              <>
                <p role="status" className="play-feedback">
                  You recalled {result.filter((v) => v === "correct").length} of
                  3.{" "}
                  {pairs
                    .map(([a, b], i) => `${a} → ${b} (${result[i]})`)
                    .join(" · ")}
                  .
                </p>
                <button onClick={() => setStage("study")}>Study again</button>
              </>
            )}
          </>
        )}
        <p className="small-note">
          Try recall again later. This immediate score does not measure delayed
          retention.
        </p>
      </>
    );
  return (
    <>
      {stage === "study" ? (
        <>
          <p>Word {position + 1} of 8</p>
          <div className="memory-word">{words[position]}</div>
          <button
            onClick={() =>
              position < 7 ? setPosition((i) => i + 1) : setStage("recall")
            }
          >
            {position < 7 ? "Next word" : "Hide list and recall"}
          </button>
        </>
      ) : stage === "recall" ? (
        <>
          <label className="retrieval-inputs">
            Words you remember, separated by commas
            <textarea
              value={recall}
              onChange={(e) => setRecall(e.target.value)}
            />
          </label>
          <button
            onClick={() => {
              setResult([
                ...new Set(recall.split(",").map(normalized).filter(Boolean)),
              ]);
              setStage("results");
            }}
          >
            Check recall
          </button>
        </>
      ) : (
        <>
          <p role="status" className="play-feedback">
            Recalled {words.filter((w) => result.includes(w)).length} of 8.
            Inspect actual positions below; no particular shape is required.
          </p>
          <ol className="memory-results">
            {words.map((w) => (
              <li key={w}>
                {w} — {result.includes(w) ? "recalled" : "missed"}
              </li>
            ))}
          </ol>
        </>
      )}
    </>
  );
}
function Ratings({ id }: { id: string }) {
  const [steps, setSteps] = useState(0),
    [stage, setStage] = useState(0),
    [rating, setRating] = useState(3),
    [first, setFirst] = useState(0);
  const text =
    id === "barnum-effect"
      ? "You appreciate recognition, yet sometimes prefer independence. You can be sociable, while also needing time to yourself."
      : id === "scope-insensitivity"
        ? `This fictional project saves ${stage === 0 ? 10 : 100} birds for the same cost with the same success rate.`
        : "Your assembled picture";
  return (
    <>
      {id === "ikea-effect" && (
        <>
          <div
            className="tile-picture"
            aria-label={`${steps} of 3 tiles assembled`}
          >
            {["◒", "◐", "◓"].map((v, i) => (
              <span key={v}>{i < steps ? v : "·"}</span>
            ))}
          </div>
          <button disabled={steps >= 3} onClick={() => setSteps((s) => s + 1)}>
            Place next tile
          </button>
        </>
      )}
      <p>{text}</p>
      <label className="discovery-rating">
        {id === "scope-insensitivity"
          ? "Project value"
          : id === "barnum-effect"
            ? "How well does this fit you?"
            : "How much do you value it?"}{" "}
        <output>{rating}/5</output>
        <input
          type="range"
          min="1"
          max="5"
          value={rating}
          disabled={stage >= 2 || (id === "ikea-effect" && steps < 3)}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </label>
      {stage < 2 && (
        <button
          disabled={id === "ikea-effect" && steps < 3}
          onClick={() => {
            if (stage === 0) setFirst(rating);
            if (id === "scope-insensitivity" && stage === 0) {
              setStage(1);
              setRating(3);
            } else setStage(2);
          }}
        >
          {id === "scope-insensitivity" && stage === 0
            ? "Save first rating"
            : "Reveal comparison"}
        </button>
      )}
      {stage === 2 && (
        <p role="status" className="play-feedback">
          {id === "barnum-effect"
            ? `Your rating: ${rating}/5. Everyone receives exactly this text. It was not inferred from any information about you.`
            : id === "scope-insensitivity"
              ? `First project: ${first}/5. Larger project: ${rating}/5. The benefit is ten times as large, but this bounded scale cannot express a tenfold value. What decision criterion would you use?`
              : `Your rating: ${rating}/5. Ready-made version: ◒ ◐ ◓ — exactly the same picture. We have not assigned a rating to that version. Would making it affect your preference?`}
        </p>
      )}
    </>
  );
}
function Evidence({ id }: { id: string }) {
  const [first, setFirst] = useState(""),
    [revealed, setRevealed] = useState(false),
    [second, setSecond] = useState("");
  const options =
    id === "recognition-heuristic"
      ? ["Familiar Market", "Qev Shop"]
      : ["Bright Horizon", "Storm Plan"];
  return (
    <>
      <div className="simple-cards">
        {options.map((v, i) => (
          <div key={v}>
            <h3>{v}</h3>
            <p>
              {revealed
                ? id === "recognition-heuristic"
                  ? `Invented monthly sales: ${i === 0 ? 40 : 70}`
                  : `Benefit: ${i === 0 ? 20 : 25}; cost: ${i === 0 ? 8 : 7}. Net: ${i === 0 ? 12 : 18}.`
                : "Evidence not revealed yet."}
            </p>
          </div>
        ))}
      </div>
      <Buttons
        options={options.map((v) => `Choose ${v}`)}
        onChoose={(v) => (revealed ? setSecond(v) : setFirst(v))}
      />
      {first && !revealed && (
        <button onClick={() => setRevealed(true)}>Reveal evidence</button>
      )}
      <p role="status" className="play-feedback">
        {second
          ? `Before evidence: ${first}. After evidence: ${second}. The stated criterion favors ${options[1]}, using invented values.`
          : first
            ? `Initial choice: ${first}. Compare the criterion before deciding again.`
            : "Choose based on your first impression, then inspect the evidence."}
      </p>
    </>
  );
}
function Control({ seed }: { seed: number }) {
  const [pad, setPad] = useState("Blue pad"),
    [round, setRound] = useState(0),
    [wins, setWins] = useState(0),
    [message, setMessage] = useState("Pads do not enter the coin calculation.");
  return (
    <>
      <label className="discovery-select">
        Launch pad
        <select value={pad} onChange={(e) => setPad(e.target.value)}>
          <option>Blue pad</option>
          <option>Orange pad</option>
          <option>Green pad</option>
        </select>
      </label>
      <Buttons
        options={["Predict heads", "Predict tails"]}
        onChoose={(v) => {
          const next = round + 1,
            outcome =
              seededRandom(seed + next * 37)() < 0.5 ? "heads" : "tails";
          setRound(next);
          setWins((w) => w + Number(v === `Predict ${outcome}`));
          setMessage(
            `${pad} launched ${outcome}. Your prediction ${v.endsWith(outcome) ? "matched" : "did not match"}. Choosing a pad does not change the 50% odds.`,
          );
        }}
      />
      <p className="simple-score">
        Predictions: {round} · Matches: {wins}
      </p>
      <p role="status" className="play-feedback">
        {message}
      </p>
    </>
  );
}
function Decision({
  id,
  settings: s,
  seed,
}: {
  id: string;
  settings: Settings;
  seed: number;
}) {
  const [message, setMessage] = useState("Compare the rule before committing."),
    [round, setRound] = useState(0);
  if (id === "travelers-dilemma")
    return (
      <>
        <p>Partner’s disclosed claim: 18</p>
        <button
          onClick={() => {
            const [you, partner] = travelerPayoff(s.claim, 18, s.bonus);
            setMessage(
              `Your claim ${s.claim}; partner claim 18. Your payoff: ${you}. Partner payoff: ${partner}.`,
            );
          }}
        >
          Submit claim
        </button>
        <p role="status" className="play-feedback">
          {message}
        </p>
      </>
    );
  const p = s.accuracy / 100;
  return (
    <>
      <div className="simple-cards">
        <div>
          <h3>Sealed box</h3>
          <p>1,000 or 0, based on the earlier prediction.</p>
        </div>
        <div>
          <h3>Open box</h3>
          <p>10 tokens.</p>
        </div>
      </div>
      <p>
        Conditional means under the stipulated predictor: one box{" "}
        {(p * 1000).toFixed(0)}, both boxes {((1 - p) * 1000 + 10).toFixed(0)}.
      </p>
      <Buttons
        options={["Take sealed box only", "Take both boxes"]}
        onChoose={(v) => {
          const one = v === "Take sealed box only",
            next = round + 1,
            correct = seededRandom(seed + next * 71)() < p,
            predictedOne = correct ? one : !one,
            payoff = (predictedOne ? 1000 : 0) + (one ? 0 : 10);
          setRound(next);
          setMessage(
            `Teaching outcome: ${payoff} tokens. Prediction was ${predictedOne ? "one box" : "both boxes"}. Conditional comparison favors ${p * 1000 > (1 - p) * 1000 + 10 ? "one box" : "both boxes"}; holding the already-filled contents fixed, adding the open box adds 10. These are different comparisons.`,
          );
        }}
      />
      <p role="status" className="play-feedback">
        {message}
      </p>
    </>
  );
}
export function DiscoveryGames({
  id,
  settings,
  seed,
}: {
  id: string;
  settings: Settings;
  seed: number;
}) {
  switch (id) {
    case "wason-selection":
    case "cognitive-reflection":
      return <Logic id={id} />;
    case "nim":
      return <Nim />;
    case "dollar-auction":
      return <Auction />;
    case "penneys-game":
    case "nontransitive-dice":
      return <Races id={id} seed={seed} />;
    case "serial-position-effect":
    case "testing-effect":
      return <Memory id={id} seed={seed} />;
    case "ikea-effect":
    case "barnum-effect":
    case "scope-insensitivity":
      return <Ratings id={id} />;
    case "recognition-heuristic":
    case "affect-heuristic":
      return <Evidence id={id} />;
    case "illusion-of-control":
      return <Control seed={seed} />;
    case "newcomb-problem":
    case "travelers-dilemma":
      return <Decision id={id} settings={settings} seed={seed} />;
    default:
      return null;
  }
}
