"use client";
import type { ComponentType } from "react";
import { useState } from "react";
import { Actions, Choices, Stats, Slider, Ledger, fixed } from "./Shared";
import { rng, persuasion, ttcRound } from "@/lib/simulations/prism";
export function Correlated({ seed }: { seed: number }) {
  const [policy, setPolicy] = useState("Follow recommendation"),
    [n, setN] = useState(0),
    r = rng(seed),
    rows = Array.from({ length: n }, () => {
      const rec = r() < 0.5,
        other = !rec,
        act =
          policy === "Always go"
            ? true
            : policy === "Always wait"
              ? false
              : rec,
        pay = act ? (other ? -5 : 3) : other ? 0 : 1;
      return { rec, other, act, pay };
    });
  return (
    <>
      <p>
        Two players choose Go or Wait. Go/Go gives −5 each; Go/Wait gives 3 and
        0; Wait/Wait gives 1 each. A public device privately recommends opposite
        actions with equal probability, and the other player obeys.
      </p>
      <Choices
        label="Your policy"
        options={["Follow recommendation", "Always go", "Always wait"]}
        value={policy}
        onChange={(v) => {
          setPolicy(v);
          setN(0);
        }}
      />
      <Actions>
        <button disabled={n >= 20} onClick={() => setN(n + 1)}>
          Play next recommendation
        </button>
      </Actions>
      <Ledger
        label="Recommendation and action history"
        headers={[
          "Your recommendation",
          "Other action",
          "Your action",
          "Your payoff",
        ]}
        rows={rows.map((r) => [
          r.rec ? "Go" : "Wait",
          r.other ? "Go" : "Wait",
          r.act ? "Go" : "Wait",
          r.pay,
        ])}
      />
      <Stats
        items={[
          ["Rounds", n],
          ["Your total payoff", rows.reduce((s, r) => s + r.pay, 0)],
          [
            "Expected payoff under this policy",
            policy === "Follow recommendation"
              ? "1.5"
              : policy === "Always go"
                ? "−1"
                : "0.5",
          ],
          [
            "Collision probability if both independently go half the time",
            "25%",
          ],
        ]}
      />
      <p>
        Given a Go recommendation, obeying yields 3 instead of 1. Given Wait,
        obeying yields 0 instead of −5. Those conditional incentives support
        this correlated equilibrium; the device does not improve every game.
      </p>
    </>
  );
}
export function Persuasion() {
  const [q, setQ] = useState(0.4),
    m = persuasion(q);
  return (
    <>
      <p>
        A project is good with prior probability 0.3. Investing pays the
        receiver +1 if good and −1 if bad, so the receiver invests at posterior
        at least 0.5, including ties. The sender wants investment in either
        state and commits publicly to a signal rule.
      </p>
      <Slider
        label="Percent of bad states given a positive signal (rounded)"
        min={0}
        max={100}
        value={Math.round(100 * q)}
        onChange={(v) => setQ(v / 100)}
      />
      <Actions>
        <button onClick={() => setQ(3 / 7)}>Set exact boundary: 3/7</button>
      </Actions>
      <Ledger
        label="Committed signal policy"
        headers={["State", "Prior", "Chance of positive signal"]}
        rows={[
          ["Good", 0.3, "100%"],
          ["Bad", 0.7, fixed(q * 100, 2) + "%"],
        ]}
      />
      <Stats
        items={[
          ["Positive-signal probability", fixed(m.positive, 3)],
          ["Posterior good given positive", fixed(m.posterior, 3)],
          ["Overall investment probability", fixed(m.invest, 3)],
        ]}
      />
      <p>
        Pooling some bad states can raise investment from 0.3 under full
        revelation to 0.6 at the boundary. More pooling then destroys
        credibility. The receiver knows the policy and updates by Bayes; this is
        not advice to deceive a real audience.
      </p>
    </>
  );
}
export function CheapTalk({ seed }: { seed: number }) {
  const [profile, setProfile] = useState("Aligned truthful bot"),
    [step, setStep] = useState(0),
    [answers, setAnswers] = useState<boolean[]>([]),
    states = Array.from({ length: 6 }, (_, i) => rng(seed + i)() < 0.5),
    state = states[Math.min(step, 5)],
    message = profile === "Aligned truthful bot" ? state : true;
  return (
    <>
      <p>
        An informed sender sends a costless message about a hidden high or low
        state. Your receiver payoff is 1 for matching the state, 0 otherwise.
        Compare two fully disclosed scripted messaging policies; neither is
        computed as an equilibrium.
      </p>
      <Choices
        label="Sender policy"
        options={["Aligned truthful bot", "Biased always-high bot"]}
        value={profile}
        onChange={setProfile}
        disabled={step > 0}
      />
      {step < 6 ? (
        <>
          <p className="prism-panel">
            Sender says: {message ? "High" : "Low"}. Round {step + 1}/6.
          </p>
          <Actions>
            {[true, false].map((v) => (
              <button
                key={String(v)}
                onClick={() => {
                  setAnswers([...answers, v]);
                  setStep(step + 1);
                }}
              >
                Choose {v ? "high" : "low"}
              </button>
            ))}
          </Actions>
        </>
      ) : (
        <Ledger
          label="Hidden states and receiver outcomes"
          headers={["Round", "State", "Your action", "Payoff"]}
          rows={states.map((s, i) => [
            i + 1,
            s ? "High" : "Low",
            answers[i] ? "High" : "Low",
            s === answers[i] ? 1 : 0,
          ])}
        />
      )}
      <p>
        Cheap talk can be informative when incentives and beliefs support it.
        Misaligned preferences do not imply that every equilibrium is completely
        uninformative; the always-high bot illustrates only one policy.
      </p>
    </>
  );
}
export function Trading() {
  const [preset, setPreset] = useState("Three-way cycle"),
    [remaining, setRemaining] = useState([0, 1, 2]),
    [alloc, setAlloc] = useState<{ person: number; house: number }[]>([]),
    prefs =
      preset === "Three-way cycle"
        ? [
            [1, 0, 2],
            [2, 1, 0],
            [0, 2, 1],
          ]
        : [
            [0, 1, 2],
            [1, 2, 0],
            [2, 0, 1],
          ];
  function step() {
    const trades = ttcRound(remaining, prefs);
    setAlloc([...alloc, ...trades]);
    setRemaining(remaining.filter((p) => !trades.some((t) => t.person === p)));
  }
  return (
    <>
      <p>
        Three people initially own houses A, B and C. Each points to the owner
        of their favourite available house. Execute a directed cycle and remove
        its people and houses.
      </p>
      <Choices
        label="Preference profile"
        options={["Three-way cycle", "Keep own house first"]}
        value={preset}
        onChange={setPreset}
        disabled={alloc.length > 0}
      />
      <Ledger
        label="Strict preference rankings, best first"
        headers={["Person / own house", "Ranking"]}
        rows={prefs.map((p, i) => [
          "ABC"[i],
          p.map((v) => "ABC"[v]).join(" > "),
        ])}
      />
      <Actions>
        <button disabled={!remaining.length} onClick={step}>
          Execute next top-trading cycle
        </button>
      </Actions>
      <Ledger
        label="Finalised allocations"
        headers={["Person", "Receives house"]}
        rows={alloc.map((t) => ["ABC"[t.person], "ABC"[t.house]])}
      />
      <Stats
        items={[
          ["People still active", remaining.length],
          ["Finalised trades", alloc.length],
        ]}
      />
      <p>
        For strict preferences and one owned house per person, top trading
        cycles has strong incentive and allocation properties. This toy omits
        prices, housing quality uncertainty and constraints on real exchanges.
      </p>
    </>
  );
}
const payoffs = [
  [
    [3, 3],
    [2, 1],
    [4, 2],
  ],
  [
    [1, 2],
    [1, 0],
    [2, 1],
  ],
  [
    [2, 4],
    [3, 2],
    [5, 3],
  ],
];
export function Dominance() {
  const [rows, setRows] = useState([0, 1, 2]),
    [cols, setCols] = useState([0, 1, 2]),
    [note, setNote] = useState(
      "Remove a strictly dominated strategy, one at a time.",
    );
  function remove(row: boolean, k: number) {
    const choices = row ? rows : cols,
      other = row ? cols : rows,
      better = choices.find(
        (j) =>
          j !== k &&
          other.every(
            (o) =>
              (row ? payoffs[j][o][0] : payoffs[o][j][1]) >
              (row ? payoffs[k][o][0] : payoffs[o][k][1]),
          ),
      );
    if (better === undefined) {
      setNote(
        "No remaining strategy is strictly better against every active opponent action. Keep this strategy for now.",
      );
      return;
    }
    if (row) setRows(rows.filter((i) => i !== k));
    else setCols(cols.filter((i) => i !== k));
    setNote(
      `Removed ${row ? "row " + "ABC"[k] : "column " + "LMR"[k]}; another active strategy was strictly better at every remaining response.`,
    );
  }
  return (
    <>
      <p>
        Each cell lists row-player payoff first, column-player payoff second.
        Strict dominance requires a better alternative against every currently
        possible opponent action.
      </p>
      <Ledger
        label="Active payoff matrix"
        headers={["Row", ...cols.map((i) => "LMR"[i])]}
        rows={rows.map((i) => [
          "ABC"[i],
          ...cols.map((j) => payoffs[i][j].join(", ")),
        ])}
      />
      <Actions>
        {rows.length > 1 &&
          rows.map((i) => (
            <button key={"r" + i} onClick={() => remove(true, i)}>
              Remove row {"ABC"[i]}
            </button>
          ))}
        {cols.length > 1 &&
          cols.map((i) => (
            <button key={"c" + i} onClick={() => remove(false, i)}>
              Remove column {"LMR"[i]}
            </button>
          ))}
      </Actions>
      <p aria-live="polite">
        {rows.length === 1 && cols.length === 1
          ? `Surviving profile: ${"ABC"[rows[0]]}, ${"LMR"[cols[0]]}.`
          : note}
      </p>
      <p>
        Strictly dominated strategies cannot be best responses in this finite
        game. Weak dominance has additional subtleties; this activity does not
        apply its removal rule to weak ties.
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
  const B = [Correlated, Persuasion, CheapTalk, Trading, Dominance][
    index
  ] as ComponentType<{ seed: number }>;
  return <B seed={seed} />;
}
