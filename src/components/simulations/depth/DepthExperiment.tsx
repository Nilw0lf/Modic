"use client";
import { useState } from "react";
import { depthEntries } from "@/data/depth-expansion";
import { SimulationShell } from "@/components/simulation/SimulationShell";
import {
  Confounding,
  Instrument,
  Discontinuity,
  Differences,
  MultipleTesting,
} from "./CausalBoards";
import {
  Selection,
  Drift,
  Hardy,
  Mutation,
  Competition,
} from "./EvolutionBoards";
import { Auctions, Voting, Signaling, HoldUp, Bargaining } from "./GameBoards";
import {
  Resonance,
  Feedback,
  Critical,
  Brachistochrone,
  Carnot,
} from "./PhysicsBoards";
import {
  CentralLimit,
  SmallNumbers,
  Dilution,
  Retrieval,
  Calibration,
} from "./StatsBoards";
import {
  Interleaving,
  Generation,
  Load,
  Satisficing,
  PeakShift,
} from "./LearningBoards";
function Board({ id, seed }: { id: string; seed: number }) {
  switch (id) {
    case "confounding":
      return <Confounding />;
    case "instrumental-variables":
      return <Instrument />;
    case "regression-discontinuity":
      return <Discontinuity />;
    case "difference-in-differences":
      return <Differences />;
    case "false-discovery-rate":
      return <MultipleTesting seed={seed} />;
    case "natural-selection":
      return <Selection />;
    case "genetic-drift":
      return <Drift seed={seed} />;
    case "hardy-weinberg":
      return <Hardy />;
    case "mutation-selection-balance":
      return <Mutation />;
    case "competitive-exclusion":
      return <Competition />;
    case "revenue-equivalence":
      return <Auctions seed={seed} />;
    case "strategic-voting":
      return <Voting />;
    case "costly-signaling":
      return <Signaling />;
    case "hold-up-problem":
      return <HoldUp />;
    case "alternating-offer-bargaining":
      return <Bargaining />;
    case "resonance":
      return <Resonance />;
    case "feedback-delay":
      return <Feedback />;
    case "critical-path":
      return <Critical />;
    case "brachistochrone":
      return <Brachistochrone />;
    case "carnot-limit":
      return <Carnot />;
    case "central-limit-theorem":
      return <CentralLimit seed={seed} />;
    case "law-of-small-numbers":
      return <SmallNumbers seed={seed} />;
    case "regression-dilution":
      return <Dilution seed={seed} />;
    case "precision-recall":
      return <Retrieval />;
    case "brier-score":
      return <Calibration seed={seed} />;
    case "interleaving":
      return <Interleaving />;
    case "generation-effect":
      return <Generation />;
    case "cognitive-load":
      return <Load seed={seed} />;
    case "satisficing":
      return <Satisficing seed={seed} />;
    case "peak-shift":
      return <PeakShift />;
    default:
      throw new Error("Unknown experiment " + id);
  }
}
export default function DepthExperiment({ id }: { id: string }) {
  const entry = depthEntries.find((e) => e.id === id)!,
    [seed, setSeed] = useState(827),
    [revision, setRevision] = useState(0);
  return (
    <SimulationShell
      label={entry.name}
      number={`D${String(depthEntries.indexOf(entry) + 1).padStart(2, "0")}`}
      actions={
        <>
          <button
            onClick={() => {
              setSeed(827);
              setRevision((v) => v + 1);
            }}
          >
            Reset
          </button>
          {[
            "false-discovery-rate",
            "genetic-drift",
            "revenue-equivalence",
            "central-limit-theorem",
            "law-of-small-numbers",
            "regression-dilution",
            "brier-score",
            "cognitive-load",
            "satisficing",
          ].includes(id) && (
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
            ? "PLAY & INVESTIGATE"
            : "CHANGE AN ASSUMPTION"}
        </span>
      </div>
      <section
        className="simple-board frontier-board depth-board"
        aria-label={`Explore ${entry.name}`}
      >
        <Board key={`${id}-${seed}-${revision}`} id={id} seed={seed} />
      </section>
      <p className="simulation-disclaimer">{entry.limitation}</p>
    </SimulationShell>
  );
}
