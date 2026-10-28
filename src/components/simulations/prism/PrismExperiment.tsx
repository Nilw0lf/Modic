"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { prismEntries } from "@/data/prism-expansion";
import { SimulationShell } from "@/components/simulation/SimulationShell";
const groups = [
  dynamic(() => import("./OpticsBoards")),
  dynamic(() => import("./EngineeringBoards")),
  dynamic(() => import("./EcologyBoards")),
  dynamic(() => import("./ComputingBoards")),
  dynamic(() => import("./ResearchBoards")),
  dynamic(() => import("./ProbabilityBoards")),
  dynamic(() => import("./LearningBoards")),
  dynamic(() => import("./BehaviourBoards")),
  dynamic(() => import("./StrategyBoards")),
  dynamic(() => import("./EconomicsBoards")),
  dynamic(() => import("./FinanceBoards")),
  dynamic(() => import("./OperationsBoards")),
  dynamic(() => import("./SocialBoards")),
  dynamic(() => import("./PhilosophyBoards")),
];
const seeded = [
  "binary-search",
  "publication-bias",
  "range-restriction",
  "poisson-process",
  "randomised-response",
  "arcsine-law",
  "bertrands-chord-paradox",
  "chunking",
  "correlated-equilibrium",
  "cheap-talk",
  "newsvendor-problem",
  "voter-model",
  "homophily",
];
export default function PrismExperiment({ id }: { id: string }) {
  const i = prismEntries.findIndex((e) => e.id === id),
    entry = prismEntries[i],
    Group = groups[Math.floor(i / 5)],
    [seed, setSeed] = useState(941),
    [revision, setRevision] = useState(0);
  return (
    <SimulationShell
      label={entry.name}
      number={`P${String(i + 1).padStart(2, "0")}`}
      actions={
        <>
          <button
            onClick={() => {
              setSeed(941);
              setRevision((v) => v + 1);
            }}
          >
            Reset
          </button>
          {seeded.includes(id) && (
            <button
              onClick={() => {
                setSeed((v) => v + 1);
                setRevision((v) => v + 1);
              }}
            >
              New round
            </button>
          )}
        </>
      }
    >
      <div className="simulation-intro">
        <div>
          <h2>{entry.name}</h2>
          <p>{entry.question}</p>
        </div>
        <span className="model-tag">
          {entry.format === "game"
            ? "PLAY & EXPLAIN"
            : entry.format === "thought-experiment"
              ? "CONSIDER & COMPARE"
              : "TEST THE MECHANISM"}
        </span>
      </div>
      <section
        className="simple-board frontier-board depth-board prism-board"
        aria-label={`Explore ${entry.name}`}
      >
        <Group key={`${id}-${seed}-${revision}`} index={i % 5} seed={seed} />
      </section>
      <p className="simulation-disclaimer">{entry.limitation}</p>
    </SimulationShell>
  );
}
