"use client";
import type { ComponentType } from "react";
import { useState } from "react";
import {
  Actions,
  Slider,
  Stats,
  Choices,
  Ledger,
  Bars,
  fixed,
} from "./Shared";
import {
  poissonEvents,
  rng,
  arcsineBatch,
  chord,
  mean,
} from "@/lib/simulations/prism";
export function Poisson({ seed }: { seed: number }) {
  const [rate, setRate] = useState(2),
    [time, setTime] = useState(0),
    events = poissonEvents(rate, seed),
    visible = events.filter((t) => t <= time);
  return (
    <>
      <p>
        A homogeneous Poisson process has independent increments and a constant
        arrival rate. Reveal events over ten model minutes; random gaps can be
        long even at a fixed rate.
      </p>
      <Slider
        label="Arrivals per minute"
        min={0.5}
        max={5}
        step={0.5}
        value={rate}
        onChange={(v) => {
          setRate(v);
          setTime(0);
        }}
      />
      <Actions>
        <button disabled={time === 10} onClick={() => setTime(time + 1)}>
          Reveal next minute
        </button>
      </Actions>
      <svg
        viewBox="0 0 600 120"
        role="img"
        aria-label="Arrival times on a ten-minute timeline"
      >
        <line x1="30" x2="570" y1="60" y2="60" stroke="var(--border)" />
        {visible.map((v, i) => (
          <line
            key={i}
            x1={30 + v * 54}
            x2={30 + v * 54}
            y1="35"
            y2="85"
            stroke="var(--accent)"
            strokeWidth="3"
          />
        ))}
        <text x="30" y="110">
          0
        </text>
        <text x="550" y="110">
          10 min
        </text>
      </svg>
      <Stats
        items={[
          ["Minutes revealed", time],
          ["Arrivals observed", visible.length],
          ["Expected arrivals in this duration", fixed(rate * time, 1)],
          ["Expected waiting time (minutes)", fixed(1 / rate)],
        ]}
      />
      <p>
        Arrivals are generated through independent exponential gaps. Rush hours,
        dependence and changing rates invalidate this homogeneous model.
      </p>
    </>
  );
}
export function Memoryless() {
  const [wait, setWait] = useState(0),
    [ahead, setAhead] = useState(3),
    p = 0.2;
  return (
    <>
      <p>
        A fresh independent attempt succeeds with probability 0.2 each turn.
        Condition on having failed every attempt so far. Does a long wait make
        the next three turns more promising?
      </p>
      <Slider
        label="Failed attempts already observed"
        min={0}
        max={30}
        value={wait}
        onChange={setWait}
      />
      <Slider
        label="Future attempts to consider"
        min={1}
        max={10}
        value={ahead}
        onChange={setAhead}
      />
      <Stats
        items={[
          ["Chance of success next attempt", "20.0%"],
          [
            "Chance of at least one success in future window",
            fixed(100 * (1 - (1 - p) ** ahead), 1) + "%",
          ],
          [
            "Chance of reaching this wait initially",
            fixed(100 * (1 - p) ** wait, 3) + "%",
          ],
        ]}
      />
      <Ledger
        label="Conditional probability identity"
        headers={[
          "Joint failures through wait + future",
          "Failures through wait",
          "Conditional future failure",
        ]}
        rows={[
          [
            fixed((1 - p) ** (wait + ahead), 5),
            fixed((1 - p) ** wait, 5),
            fixed((1 - p) ** ahead, 5),
          ],
        ]}
      />
      <p>
        The geometric waiting time is memoryless under independent
        constant-probability attempts. Real equipment ageing, queues and
        scheduled arrivals need not have this property.
      </p>
    </>
  );
}
export function RandomResponse({ seed }: { seed: number }) {
  const [truth, setTruth] = useState(40),
    [n, setN] = useState(100),
    [show, setShow] = useState(false),
    r = rng(seed),
    reports = Array.from({ length: n }, (_, i) => {
      const sensitive = i < (truth * n) / 100;
      return r() < 0.5 ? r() < 0.5 : sensitive;
    }),
    yes = reports.filter(Boolean).length,
    estimate = 2 * (yes / n) - 0.5;
  return (
    <>
      <p>
        A respondent privately flips a coin: heads means answer a second fair
        coin, tails means answer truthfully. This teaching population’s
        sensitive-trait prevalence is supplied, not discovered from real people.
      </p>
      <Slider
        label="True teaching prevalence (%)"
        min={0}
        max={100}
        step={10}
        value={truth}
        onChange={(v) => {
          setTruth(v);
          setShow(false);
        }}
      />
      <Slider
        label="Respondents"
        min={20}
        max={500}
        step={20}
        value={n}
        onChange={(v) => {
          setN(v);
          setShow(false);
        }}
      />
      <Actions>
        <button onClick={() => setShow(true)}>Collect anonymous reports</button>
      </Actions>
      {show && (
        <Stats
          items={[
            ["Yes reports", `${yes}/${n}`],
            ["Expected yes fraction", fixed(0.25 + (0.5 * truth) / 100, 3)],
            ["Unclipped prevalence estimate", fixed(100 * estimate, 1) + "%"],
          ]}
        />
      )}
      <p>
        The estimator is 2 × yes fraction − 0.5. Sampling noise can put it
        outside 0–100%; the raw value is intentionally not clipped. This
        illustrates Warner-style randomised response, not a production privacy
        guarantee.
      </p>
    </>
  );
}
export function Arcsine({ seed }: { seed: number }) {
  const [count, setCount] = useState(20),
    batch = arcsineBatch(seed, count),
    bins = Array.from(
      { length: 10 },
      (_, i) =>
        batch.filter((v) => Math.min(9, Math.floor(v * 10)) === i).length,
    );
  return (
    <>
      <p>
        Each fair random walk has 100 steps. Count the fraction of step
        intervals spent positive, assigning a return-to-zero interval to the
        side it came from.
      </p>
      <Slider
        label="Walks in the batch"
        min={20}
        max={400}
        step={20}
        value={count}
        onChange={setCount}
      />
      <Bars
        label="Positive-occupation fraction bins"
        max={count}
        items={bins.map((v, i) => [`${i / 10}–${(i + 1) / 10}`, v])}
      />
      <Stats
        items={[
          ["Average positive occupation", fixed(mean(batch), 3)],
          [
            "Walks below 0.2 or above 0.8",
            batch.filter((v) => v < 0.2 || v > 0.8).length,
          ],
        ]}
      />
      <p>
        Symmetry centres the average near one-half, yet individual walks can
        spend most of the horizon on one side. The continuous arcsine law is a
        limiting reference, not an exact density claim for this finite discrete
        histogram.
      </p>
    </>
  );
}
export function Bertrand({ seed }: { seed: number }) {
  const [kind, setKind] = useState("Random endpoints"),
    [n, setN] = useState(0),
    cases = Array.from({ length: n }, (_, i) => chord(seed + i, kind)),
    last = cases.at(-1),
    wins = cases.filter((c) => c.length > Math.sqrt(3)).length;
  return (
    <>
      <p>
        Choose a sampling protocol for a chord of a unit circle. The question is
        whether its length exceeds the side of an inscribed equilateral
        triangle, √3.
      </p>
      <Choices
        label="Chord sampling protocol"
        options={[
          "Random endpoints",
          "Uniform radius",
          "Uniform midpoint area",
        ]}
        value={kind}
        onChange={(v) => {
          setKind(v);
          setN(0);
        }}
      />
      <Actions>
        <button
          disabled={n >= 500}
          onClick={() => setN(Math.min(500, n + 100))}
        >
          Draw 100 chords
        </button>
      </Actions>
      <svg
        viewBox="0 0 400 300"
        role="img"
        aria-label="Most recently sampled chord"
      >
        <circle
          cx="200"
          cy="150"
          r="120"
          fill="none"
          stroke="var(--foreground)"
        />
        {last && (
          <g transform={`rotate(${(last.theta * 180) / Math.PI},200,150)`}>
            <line
              x1={200 - last.length * 60}
              x2={200 + last.length * 60}
              y1={150 - last.d * 120}
              y2={150 - last.d * 120}
              stroke="var(--accent)"
              strokeWidth="4"
            />
          </g>
        )}
      </svg>
      <Stats
        items={[
          ["Chords drawn", n],
          ["Longer than √3", n ? fixed(wins / n, 3) : "—"],
          [
            "Protocol probability",
            kind === "Random endpoints"
              ? "1/3"
              : kind === "Uniform radius"
                ? "1/2"
                : "1/4",
          ],
        ]}
      />
      <p>
        Different meanings of “random chord” produce different distributions.
        The midpoint-area method uses radius √U; uniform radius uses U. No
        protocol is silently treated as the uniquely correct question.
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
  const B = [Poisson, Memoryless, RandomResponse, Arcsine, Bertrand][
    index
  ] as ComponentType<{ seed: number }>;
  return <B seed={seed} />;
}
