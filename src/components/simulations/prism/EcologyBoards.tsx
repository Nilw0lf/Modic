"use client";
import type { ComponentType } from "react";
import { useState } from "react";
import {
  Actions,
  Slider,
  Stats,
  Choices,
  Chart,
  Ledger,
  fixed,
} from "./Shared";
import {
  island,
  metapopulation,
  cascade,
  frequency,
} from "@/lib/simulations/prism";
export function Island() {
  const [i, setI] = useState(6),
    [e, setE] = useState(3),
    [steps, setSteps] = useState(0),
    path = island(i, e, steps);
  return (
    <>
      <p>
        A mainland pool contains 100 possible species. Immigration declines as
        the island fills; extinction rises with richness. Rates are teaching
        assumptions per model time unit.
      </p>
      <Slider
        label="Maximum immigration rate"
        min={0}
        max={10}
        value={i}
        onChange={(n) => {
          setI(n);
          setSteps(0);
        }}
      />
      <Slider
        label="Maximum extinction rate"
        min={0}
        max={10}
        value={e}
        onChange={(n) => {
          setE(n);
          setSteps(0);
        }}
      />
      <Actions>
        <button
          disabled={steps >= 500}
          onClick={() => setSteps(Math.min(500, steps + 100))}
        >
          Run 20 model time units
        </button>
      </Actions>
      <Chart
        lines={[{ name: "Species richness", values: path }]}
        min={0}
        max={100}
        label="Immigration–extinction richness balance"
        xLabel={`${fixed(steps * 0.2, 0)} model time units`}
      />
      <Stats
        items={[
          ["Current richness index", fixed(path.at(-1)!)],
          [
            "Equilibrium richness",
            i + e ? fixed((100 * i) / (i + e)) : "Any initial richness",
          ],
          ["Turnover at equilibrium", i + e ? fixed((i * e) / (i + e)) : "0"],
        ]}
      />
      <p>
        Stable richness does not imply unchanged species identities. The model
        tracks expected richness, not particular species, area effects,
        speciation or an actual island forecast.
      </p>
    </>
  );
}
export function Metapop() {
  const [c, setC] = useState(0.5),
    [e, setE] = useState(0.2),
    [steps, setSteps] = useState(0),
    path = metapopulation(c, e, steps);
  return (
    <>
      <p>
        Habitat patches can be occupied or empty. In the Levins mean-field
        model, occupied patches colonise empty ones at rate c and local
        populations disappear at rate e.
      </p>
      <Slider
        label="Colonisation coefficient c"
        min={0.1}
        max={1}
        step={0.05}
        value={c}
        onChange={(n) => {
          setC(n);
          setSteps(0);
        }}
      />
      <Slider
        label="Local extinction coefficient e"
        min={0.05}
        max={0.8}
        step={0.05}
        value={e}
        onChange={(n) => {
          setE(n);
          setSteps(0);
        }}
      />
      <Actions>
        <button
          disabled={steps >= 1000}
          onClick={() => setSteps(Math.min(1000, steps + 200))}
        >
          Advance 20 model time units
        </button>
      </Actions>
      <Chart
        lines={[{ name: "Occupied fraction", values: path }]}
        label="Regional persistence despite local losses"
        xLabel={`${fixed(steps * 0.1, 0)} model time units`}
      />
      <Stats
        items={[
          ["Current occupied fraction", fixed(path.at(-1)!, 3)],
          ["Positive equilibrium", c > e ? fixed(1 - e / c, 3) : "None"],
        ]}
      />
      <p>
        The equation is dp/dt = cp(1−p)−ep. All patches are treated equally and
        continuously; spatial isolation, patch quality and finite-population
        chance are absent.
      </p>
    </>
  );
}
export function Trophic() {
  const [top, setTop] = useState(true),
    [time, setTime] = useState(0),
    p = cascade(top, time);
  return (
    <>
      <p>
        Plants feed herbivores, which feed a top predator. Compare the same
        initial plants (60) and herbivores (15), with either zero or five top
        predators.
      </p>
      <Actions>
        <button
          aria-pressed={top}
          onClick={() => {
            setTop(!top);
            setTime(0);
          }}
        >
          Top predator: {top ? "Present" : "Absent"}
        </button>
        <button
          disabled={time >= 100}
          onClick={() => setTime(Math.min(100, time + 20))}
        >
          Run 20 time units
        </button>
      </Actions>
      <Chart
        lines={[
          { name: "Plants", values: p.plants },
          { name: "Herbivores", values: p.herbivores },
          { name: "Predators", values: p.predators },
        ]}
        min={0}
        max={Math.max(100, ...p.herbivores, ...p.predators)}
        label="Three-level consumer–resource model"
        xLabel={`${time} model time units`}
      />
      <Stats
        items={[
          ["Plant index", fixed(p.plants.at(-1)!)],
          ["Herbivore index", fixed(p.herbivores.at(-1)!)],
          ["Predator index", fixed(p.predators.at(-1)!)],
        ]}
      />
      <p>
        Top predators can indirectly release plants from grazing. Fixed
        illustrative rates and deterministic equations omit alternative food,
        behaviour, migration and real species data; not every food web has this
        response.
      </p>
    </>
  );
}
const kinCards = [
  [0.5, 3, 1],
  [0.125, 4, 1],
  [0.25, 8, 1],
  [0.5, 1, 1],
  [1, 2, 1],
];
export function Kin() {
  const [step, setStep] = useState(0),
    [answers, setAnswers] = useState<boolean[]>([]);
  const card = kinCards[Math.min(step, 4)],
    [r, b, c] = card;
  return (
    <>
      <p>
        Five hypothetical acts change reproductive success by benefit B to a
        recipient and cost C to an actor. Compare rB with C under a simple
        marginal Hamilton-rule model. This is a biological fitness condition,
        not an ethical instruction.
      </p>
      {step < 5 ? (
        <>
          <Ledger
            label={`Act ${step + 1} assumptions`}
            headers={["Relatedness r", "Recipient benefit B", "Actor cost C"]}
            rows={[[r, b, c]]}
          />
          <Actions>
            {[true, false].map((v) => (
              <button
                key={String(v)}
                onClick={() => {
                  setAnswers([...answers, v]);
                  setStep(step + 1);
                }}
              >
                {v
                  ? "Condition favours helping"
                  : "Condition does not favour helping"}
              </button>
            ))}
          </Actions>
        </>
      ) : (
        <Ledger
          label="Your predictions and marginal fitness differences"
          headers={[
            "Act",
            "rB − C",
            "Your prediction",
            "Matches model condition",
          ]}
          rows={kinCards.map(([r, b, c], i) => [
            i + 1,
            fixed(r * b - c),
            answers[i] ? "Favours helping" : "Does not favour",
            answers[i] === r * b > c ? "Yes" : "No",
          ])}
        />
      )}
      <Stats
        items={[
          ["Acts classified", step],
          [
            "Correct under stated condition",
            answers.filter(
              (a, i) => a === kinCards[i][0] * kinCards[i][1] > kinCards[i][2],
            ).length,
          ],
        ]}
      />
      <p>
        The exercise stipulates comparable marginal reproductive effects and
        relatedness. Complex population structure and nonadditive interactions
        can require a more careful formulation.
      </p>
    </>
  );
}
export function Frequency() {
  const [start, setStart] = useState(20),
    [positive, setPositive] = useState(false),
    [steps, setSteps] = useState(0),
    p = frequency(start / 100, positive, steps);
  return (
    <>
      <p>
        Two haploid types reproduce proportionally to frequency-dependent
        fitness. Negative dependence favours rarity; positive dependence favours
        the currently common type.
      </p>
      <Slider
        label="Initial A frequency (%)"
        min={5}
        max={95}
        step={5}
        value={start}
        onChange={(v) => {
          setStart(v);
          setSteps(0);
        }}
      />
      <Choices
        label="Frequency dependence"
        options={["Rare type advantage", "Common type advantage"]}
        value={positive ? "Common type advantage" : "Rare type advantage"}
        onChange={(v) => {
          setPositive(v === "Common type advantage");
          setSteps(0);
        }}
      />
      <Actions>
        <button
          disabled={steps >= 100}
          onClick={() => setSteps(Math.min(100, steps + 10))}
        >
          Advance 10 generations
        </button>
      </Actions>
      <Chart
        lines={[{ name: "A frequency", values: p }]}
        label="Selection changes as a type becomes common"
        xLabel={`${steps} generations`}
      />
      <Stats
        items={[
          ["Current A frequency", fixed(p.at(-1)!, 3)],
          ["Fitness rule", positive ? "wA=1+p; wB=2−p" : "wA=2−p; wB=1+p"],
        ]}
      />
      <p>
        Rarity is advantageous only under the chosen rule. Mutation, drift,
        diploidy and changing environments are omitted; these coefficients are
        not measured selection estimates.
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
  const B = [Island, Metapop, Trophic, Kin, Frequency][index] as ComponentType<{
    seed: number;
  }>;
  return <B seed={seed} />;
}
