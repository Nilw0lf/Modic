"use client";
import type { ComponentType } from "react";
import { useState } from "react";
import { Actions, Choices, Stats, Slider, Ledger, fixed } from "./Shared";
import {
  rng,
  huffman,
  hashWord,
  ringServers,
  ringOwner,
  sortValues,
  sortTrace,
} from "@/lib/simulations/prism";
export function Binary({ seed }: { seed: number }) {
  const [target] = useState(() => 1 + Math.floor(rng(seed)() * 32)),
    [lo, setLo] = useState(1),
    [hi, setHi] = useState(32),
    [history, setHistory] = useState<number[]>([]),
    [done, setDone] = useState(false);
  function guess(n: number) {
    setHistory([...history, n]);
    if (n === target) setDone(true);
    else if (n < target) setLo(Math.max(lo, n + 1));
    else setHi(Math.min(hi, n - 1));
  }
  return (
    <>
      <p>
        Find a hidden integer from 1 to 32. Each guess reveals whether it is
        lower or higher. Try dividing the remaining range rather than testing
        every number.
      </p>
      <div className="prism-number-grid">
        {Array.from({ length: 32 }, (_, i) => (
          <button
            key={i}
            disabled={done || i + 1 < lo || i + 1 > hi}
            onClick={() => guess(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <Actions>
        <button
          disabled={done}
          onClick={() => guess(Math.floor((lo + hi) / 2))}
        >
          Guess midpoint
        </button>
      </Actions>
      <Stats
        items={[
          ["Guesses", history.length],
          ["Remaining range", done ? `Found ${target}` : `${lo}–${hi}`],
          ["Midpoint worst-case bound", "6 guesses"],
        ]}
      />
      <p>
        The bound includes identifying one of 32 integers with an equality
        check. Binary search needs ordered candidates and reliable comparisons;
        it does not apply to arbitrary unordered data without preparation.
      </p>
    </>
  );
}
export function Sorting() {
  const [kind, setKind] = useState<"Insertion" | "Selection">("Insertion"),
    [step, setStep] = useState(0),
    trace = sortTrace(kind),
    current = step ? trace[step - 1] : null,
    values = current?.values ?? sortValues;
  return (
    <>
      <p>
        Sort the same six values under two algorithms. One step completes an
        outer pass. Compare key comparisons and array writes, rather than
        assuming the shortest animation is fastest.
      </p>
      <Choices
        label="Sorting algorithm"
        options={["Insertion", "Selection"]}
        value={kind}
        onChange={(s) => {
          setKind(s as typeof kind);
          setStep(0);
        }}
      />
      <div className="prism-cards">
        {values.map((v, i) => (
          <span key={i}>{v}</span>
        ))}
      </div>
      <Actions>
        <button
          disabled={step === trace.length}
          onClick={() => setStep(step + 1)}
        >
          Perform next pass
        </button>
      </Actions>
      <Stats
        items={[
          ["Completed passes", step],
          ["Key comparisons", current?.comparisons ?? 0],
          ["Array writes", current?.writes ?? 0],
        ]}
      />
      <p aria-live="polite">
        {current?.note ?? "Initial order: 7, 2, 9, 1, 5, 3."}
      </p>
      <p>
        Counts follow the displayed implementation: insertion writes a held key
        even if it stays in place; selection avoids self-swaps. This is one
        workload, not a runtime benchmark.
      </p>
    </>
  );
}
export function Huffman() {
  const [w, setW] = useState(50),
    weights = [w, 25, 15, 10],
    codes = huffman(weights),
    total = weights.reduce((a, b) => a + b, 0),
    average = weights.reduce((s, v, i) => s + v * codes[i].length, 0) / total,
    [message, setMessage] = useState("ABACAB");
  return (
    <>
      <p>
        Build a binary prefix code for four symbols. Change A’s frequency and
        see how the tree assigns short codewords to frequent symbols.
      </p>
      <Slider
        label="Weight of symbol A"
        min={5}
        max={90}
        step={5}
        value={w}
        onChange={setW}
      />
      <Ledger
        label="Huffman codebook"
        headers={["Symbol", "Weight", "Code", "Length"]}
        rows={weights.map((v, i) => ["ABCD"[i], v, codes[i], codes[i].length])}
      />
      <label>
        Message using A–D
        <input
          aria-label="Message using A to D"
          value={message}
          maxLength={20}
          onChange={(e) =>
            setMessage(e.target.value.toUpperCase().replace(/[^ABCD]/g, ""))
          }
        />
      </label>
      <p className="prism-code">
        {[...message].map((c) => codes["ABCD".indexOf(c)]).join(" · ") ||
          "Empty message"}
      </p>
      <Stats
        items={[
          ["Weighted average bits / symbol", fixed(average, 3)],
          [
            "Message bits",
            [...message].reduce(
              (s, c) => s + codes["ABCD".indexOf(c)].length,
              0,
            ),
          ],
          ["Fixed-width message bits", message.length * 2],
        ]}
      />
      <p>
        The codebook itself costs space to transmit, and a particular short
        message can expand. Huffman coding optimises expected code length among
        binary prefix codes for the supplied weights, not every compression
        scheme.
      </p>
    </>
  );
}
export function Consistent() {
  const [extra, setExtra] = useState(false),
    keys = Array.from({ length: 20 }, (_, i) => (i * 7 + 3) % 100),
    servers = extra ? [...ringServers, 50] : ringServers,
    changed = keys.filter(
      (k) => ringOwner(k, servers) !== ringOwner(k, ringServers),
    ).length;
  return (
    <>
      <p>
        Place keys and servers on a clockwise ring from 0 to 99. Each key
        belongs to the first server at or after its position, wrapping at 99.
      </p>
      <Actions>
        <button aria-pressed={extra} onClick={() => setExtra(!extra)}>
          {extra ? "Remove server 50" : "Add server 50"}
        </button>
      </Actions>
      <svg viewBox="0 0 400 320" role="img" aria-label="Clockwise hash ring">
        <circle cx="200" cy="160" r="120" fill="none" stroke="var(--border)" />
        {servers.map((s) => (
          <g key={s}>
            <circle
              cx={200 + 120 * Math.sin((s / 100) * 2 * Math.PI)}
              cy={160 - 120 * Math.cos((s / 100) * 2 * Math.PI)}
              r="10"
              fill="var(--accent)"
            />
            <text
              x={200 + 145 * Math.sin((s / 100) * 2 * Math.PI)}
              y={165 - 145 * Math.cos((s / 100) * 2 * Math.PI)}
              textAnchor="middle"
            >
              {s}
            </text>
          </g>
        ))}
      </svg>
      <Stats
        items={[
          ["Servers", servers.length],
          ["Keys moved from original ownership", changed],
          ["Keys tested", 20],
        ]}
      />
      <Ledger
        label="Key assignments"
        headers={["Key position", "Original server", "Current server"]}
        rows={keys.map((k) => [
          k,
          ringOwner(k, ringServers),
          ringOwner(k, servers),
        ])}
      />
      <p>
        Only keys in the new server’s preceding interval move. The toy ring has
        no virtual nodes, replication, real hash distribution or load
        guarantees.
      </p>
    </>
  );
}
export function Bloom() {
  const [words, setWords] = useState<string[]>([]),
    [input, setInput] = useState("apple"),
    [query, setQuery] = useState("pear"),
    [result, setResult] = useState("");
  const indices = (w: string) => [hashWord(w, 17) % 24, hashWord(w, 73) % 24],
    bits = Array.from({ length: 24 }, (_, i) =>
      words.some((w) => indices(w).includes(i)),
    );
  return (
    <>
      <p>
        A tiny Bloom filter stores 24 bits and sets two deterministic hash
        positions for each word. Positive matches can be false; unset bits prove
        absence under this insertion-only implementation.
      </p>
      <label>
        Word to insert
        <input
          aria-label="Word to insert"
          value={input}
          maxLength={20}
          onChange={(e) => setInput(e.target.value.toLowerCase().trim())}
        />
      </label>
      <Actions>
        <button
          disabled={!input || words.includes(input) || words.length >= 20}
          onClick={() => {
            setWords([...words, input]);
            setResult("");
          }}
        >
          Insert word
        </button>
        <button
          onClick={() => {
            let found = "";
            for (let i = 0; i < 1000; i++) {
              const w = "candidate" + i;
              if (!words.includes(w) && indices(w).every((i) => bits[i])) {
                found = w;
                break;
              }
            }
            setQuery(found || "pear");
            setResult(
              found
                ? "Found a nonmember whose two hash bits are set."
                : "No collision found in the searched candidates yet. Insert more words.",
            );
          }}
        >
          Look for a false positive
        </button>
      </Actions>
      <div className="prism-bit-grid">
        {bits.map((v, i) => (
          <span key={i} data-on={v}>
            {i}: {v ? 1 : 0}
          </span>
        ))}
      </div>
      <label>
        Query word
        <input
          aria-label="Query word"
          value={query}
          maxLength={30}
          onChange={(e) => {
            setQuery(e.target.value.toLowerCase().trim());
            setResult("");
          }}
        />
      </label>
      <Actions>
        <button
          disabled={!query}
          onClick={() =>
            setResult(
              `${indices(query).every((i) => bits[i]) ? "Possibly present" : "Definitely absent"}; exact teaching ledger: ${words.includes(query) ? "inserted" : "not inserted"}.`,
            )
          }
        >
          Query membership
        </button>
      </Actions>
      <p aria-live="polite">{result || "No query yet."}</p>
      <p>
        The exact ledger is retained solely to reveal errors. Real compact
        filters do not store it. These simple hashes are pedagogical, not
        cryptographic, independent-uniform or suitable for hostile input.
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
  const B = [Binary, Sorting, Huffman, Consistent, Bloom][
    index
  ] as ComponentType<{ seed: number }>;
  return <B seed={seed} />;
}
