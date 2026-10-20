"use client";
import { useState } from "react";
import { philosophyEntries } from "@/data/philosophy-expansion";
import { SimulationShell } from "@/components/simulation/SimulationShell";
import {
  CapabilityBoard,
  ControlBoard,
  PromiseBoard,
  UtilityBoard,
  VeilBoard,
} from "./AgencyBoards";
import {
  FalsifyBoard,
  RazorBoard,
  ShipBoard,
  SoritesBoard,
  ZenoBoard,
} from "./PuzzleBoards";
import {
  AdaptationBoard,
  CredibilityBoard,
  ExperienceBoard,
  LuckBoard,
  TrolleyBoard,
} from "./ReflectionBoards";
function Board({ id, seed }: { id: string; seed: number }) {
  switch (id) {
    case "dichotomy-of-control":
      return <ControlBoard />;
    case "veil-of-ignorance":
      return <VeilBoard seed={seed} />;
    case "trolley-problem":
      return <TrolleyBoard />;
    case "experience-machine":
      return <ExperienceBoard />;
    case "ship-of-theseus":
      return <ShipBoard />;
    case "sorites-paradox":
      return <SoritesBoard />;
    case "hedonic-adaptation":
      return <AdaptationBoard />;
    case "occams-razor":
      return <RazorBoard />;
    case "falsifiability":
      return <FalsifyBoard />;
    case "categorical-imperative":
      return <PromiseBoard />;
    case "utilitarianism":
      return <UtilityBoard />;
    case "moral-luck":
      return <LuckBoard seed={seed} />;
    case "epistemic-injustice":
      return <CredibilityBoard />;
    case "capability-approach":
      return <CapabilityBoard />;
    case "zenos-paradox":
      return <ZenoBoard />;
    default:
      throw new Error("Unknown philosophy experiment " + id);
  }
}
export default function PhilosophyExperiment({ id }: { id: string }) {
  const entry = philosophyEntries.find((e) => e.id === id)!,
    [seed, setSeed] = useState(509),
    [revision, setRevision] = useState(0);
  return (
    <SimulationShell
      label={entry.name}
      number={`P${String(philosophyEntries.indexOf(entry) + 1).padStart(2, "0")}`}
      actions={
        <>
          <button
            onClick={() => {
              setSeed(509);
              setRevision((v) => v + 1);
            }}
          >
            Reset
          </button>
          {["veil-of-ignorance", "moral-luck"].includes(id) && (
            <button
              onClick={() => {
                setSeed((s) => s + 1);
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
            ? "PLAY & QUESTION"
            : "EXPLORE THE ASSUMPTION"}
        </span>
      </div>
      <section
        className="simple-board frontier-board philo-board"
        aria-label={`Explore ${entry.name}`}
      >
        <Board key={`${id}-${seed}-${revision}`} id={id} seed={seed} />
      </section>
      <p className="simulation-disclaimer">{entry.limitation}</p>
    </SimulationShell>
  );
}
