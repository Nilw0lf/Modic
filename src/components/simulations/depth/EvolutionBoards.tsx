"use client";
import { useState } from "react";
import { selection, drift, mutation, rng } from "@/lib/simulations/depth";
import { Actions, Chart, Slider, Stats, pct, fmt } from "./Shared";
export function Selection() {
  const [path, setPath] = useState([0.5]),
    [advantage, setAdvantage] = useState(true);
  const advance = (n: number) =>
    setPath((old) => {
      const p = [...old];
      for (let i = 0; i < n; i++)
        p.push(selection(p.at(-1)!, advantage ? 1.2 : 1, advantage ? 1 : 1.2));
      return p;
    });
  return (
    <>
      <Actions>
        <button onClick={() => advance(1)}>One generation</button>
        <button onClick={() => advance(10)}>Ten generations</button>
        <button
          aria-pressed={advantage}
          onClick={() => setAdvantage((v) => !v)}
        >
          Reverse environment
        </button>
      </Actions>
      <Chart label="Allele A frequency" lines={[{ name: "A", values: path }]} />
      <Stats
        items={[
          ["Generation", String(path.length - 1)],
          ["Allele A", pct(path.at(-1)!)],
          ["Relative fitness A : B", advantage ? "1.2 : 1" : "1 : 1.2"],
        ]}
      />
      <p>
        Inherited alternatives reproduce at different expected rates. Reversing
        the environment changes which one has an advantage; there is no
        universally superior allele in this model.
      </p>
    </>
  );
}
export function Drift({ seed }: { seed: number }) {
  const [copies, setCopies] = useState(30),
    [path, setPath] = useState([0.5]);
  const advance = () =>
    setPath((old) => [
      ...old,
      drift(old.at(-1)!, copies, rng(seed + old.length * 137)),
    ]);
  const p = path.at(-1)!;
  return (
    <>
      <Slider
        id="copies"
        label="Allele copies in each generation"
        value={copies}
        min={10}
        max={200}
        step={10}
        onChange={(n) => {
          setCopies(n);
          setPath([0.5]);
        }}
      />
      <Actions>
        <button onClick={advance} disabled={p === 0 || p === 1}>
          Sample next generation
        </button>
      </Actions>
      <div
        className="depth-genes"
        aria-label={`${Math.round(p * copies)} A copies out of ${copies}`}
      >
        {Array.from({ length: copies }, (_, i) => (
          <span key={i} className={i < Math.round(p * copies) ? "marked" : ""}>
            {i < Math.round(p * copies) ? "A" : "a"}
          </span>
        ))}
      </div>
      <Chart
        label="Neutral allele frequency"
        lines={[
          { name: "Sampled", values: path },
          { name: "No-drift reference", values: path.map(() => 0.5) },
        ]}
      />
      <Stats
        items={[
          ["Generation", String(path.length - 1)],
          ["Allele A", pct(p)],
          [
            "Status",
            p === 0 ? "A lost" : p === 1 ? "A fixed" : "Still segregating",
          ],
        ]}
      />
      <p>
        Each copy is sampled independently from the previous generation. Fitness
        is equal. Once an allele is lost it cannot return without mutation or
        migration, both excluded here.
      </p>
    </>
  );
}
export function Hardy() {
  const [p, setP] = useState(50),
    [random, setRandom] = useState(true),
    f = p / 100,
    q = 1 - f;
  const values = random ? [f * f, 2 * f * q, q * q] : [f, 0, q];
  return (
    <>
      <Slider
        id="allele"
        label="Allele A frequency"
        value={p}
        min={0}
        max={100}
        suffix="%"
        onChange={setP}
      />
      <Actions>
        <button aria-pressed={random} onClick={() => setRandom(true)}>
          Random-mating proportions
        </button>
        <button aria-pressed={!random} onClick={() => setRandom(false)}>
          All homozygotes
        </button>
      </Actions>
      <div className="depth-proportions">
        {values.map((v, i) => (
          <div key={i}>
            <b>{["AA", "Aa", "aa"][i]}</b>
            <meter
              aria-label={["AA", "Aa", "aa"][i]}
              value={v}
              min={0}
              max={1}
            />
            <strong>{pct(v)}</strong>
          </div>
        ))}
      </div>
      <Stats
        items={[
          ["Allele A from genotypes", pct(values[0] + values[1] / 2)],
          ["Heterozygotes", pct(values[1])],
        ]}
      />
      <p>
        Both constructions preserve the allele frequency. Only the random union
        of gametes yields p², 2pq, q². These are expected proportions, not exact
        counts in a finite sample.
      </p>
    </>
  );
}
export function Mutation() {
  const [mu, setMu] = useState(0.005),
    [s, setS] = useState(0.5),
    [steps, setSteps] = useState(0);
  const path = [0.5];
  for (let i = 0; i < steps; i++) path.push(mutation(path.at(-1)!, mu, s));
  return (
    <>
      <Slider
        id="mu"
        label="Forward mutation rate"
        value={mu}
        min={0.001}
        max={0.02}
        step={0.001}
        onChange={(v) => {
          setMu(v);
          setSteps(0);
        }}
      />
      <Slider
        id="selection"
        label="Fitness loss of aa"
        value={s}
        min={0.1}
        max={1}
        step={0.1}
        onChange={(v) => {
          setS(v);
          setSteps(0);
        }}
      />
      <Actions>
        <button
          disabled={steps >= 1000}
          onClick={() => setSteps((v) => Math.min(1000, v + 100))}
        >
          Run 100 generations
        </button>
      </Actions>
      <Chart
        label="Deleterious recessive allele q"
        lines={[
          { name: "Exact recurrence", values: path },
          {
            name: "Approximate balance",
            values: path.map(() => Math.sqrt(mu / s)),
          },
        ]}
      />
      <Stats
        items={[
          ["Generations", String(steps)],
          ["Current q", pct(path.at(-1)!)],
          ["Approximate √(μ/s)", pct(Math.sqrt(mu / s))],
        ]}
      />
      <p>
        Selection removes aa genotypes, then forward mutation replenishes the
        allele. The square-root approximation assumes a rare allele and weak
        mutation; it need not equal the finite-time result.
      </p>
    </>
  );
}
export function Competition() {
  const [a, setA] = useState(0.5),
    [b, setB] = useState(0.5),
    [steps, setSteps] = useState(0);
  const x = [40],
    y = [45];
  for (let i = 0; i < steps * 10; i++) {
    const u = x.at(-1)!,
      v = y.at(-1)!;
    x.push(Math.max(0, u + 0.02 * u * (1 - (u + a * v) / 100)));
    y.push(Math.max(0, v + 0.02 * v * (1 - (v + b * u) / 100)));
  }
  return (
    <>
      <Slider
        id="alpha"
        label="Effect of species B on A"
        value={a}
        min={0.2}
        max={1.5}
        step={0.1}
        onChange={(v) => {
          setA(v);
          setSteps(0);
        }}
      />
      <Slider
        id="beta"
        label="Effect of species A on B"
        value={b}
        min={0.2}
        max={1.5}
        step={0.1}
        onChange={(v) => {
          setB(v);
          setSteps(0);
        }}
      />
      <Actions>
        <button
          onClick={() => {
            setA(1.2);
            setB(0.8);
            setSteps(0);
          }}
        >
          Unequal competitors
        </button>
        <button disabled={steps >= 200} onClick={() => setSteps((v) => v + 20)}>
          Advance 20 time units
        </button>
      </Actions>
      <Chart
        label="Two populations sharing resources"
        min={0}
        max={110}
        lines={[
          { name: "A", values: x },
          { name: "B", values: y },
        ]}
      />
      <Stats
        items={[
          ["Time", String(steps)],
          ["Population A", fmt(x.at(-1)!)],
          ["Population B", fmt(y.at(-1)!)],
        ]}
      />
      <p>
        Euler steps of 0.1 approximate two-species competition with intrinsic
        growth 0.2 and carrying capacities 100. Weak cross-competition can
        support coexistence. Small finite populations on this chart are not
        proof of extinction.
      </p>
    </>
  );
}
