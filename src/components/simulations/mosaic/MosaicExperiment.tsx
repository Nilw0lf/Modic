"use client";
import { useState } from "react";
import type { ComponentType } from "react";
import { mosaicEntries } from "@/data/mosaic-expansion";
import { SimulationShell } from "@/components/simulation/SimulationShell";
import {
  Flanker,
  Ebbinghaus,
  Muller,
  Contrast,
  FigureGround,
} from "./PerceptionBoards";
import {
  Misinformation,
  Consensus,
  Attribution,
  Transactive,
  Intentions,
} from "./MindBoards";
import {
  Intervals,
  Power,
  Sequential,
  Bootstrap,
  Quartet,
} from "./EvidenceBoards";
import {
  Amortization,
  Debt,
  Convexity,
  Dividend,
  Frontier,
} from "./FinanceBoards";
import {
  Dutch,
  AllPay,
  CommonKnowledge,
  Screening,
  Tiebout,
} from "./GameBoards";
import {
  LeChatelier,
  Minimum,
  Albedo,
  Synchronization,
  Enrichment,
} from "./SystemBoards";
import {
  Dijkstra,
  AStar,
  Belady,
  NoFreeLunch,
  Districts,
} from "./AlgorithmBoards";
import { Buridan, Mary, Gettier, Chinese, Repugnant } from "./PhilosophyBoards";
const boards: ComponentType<{ seed: number }>[] = [
  Flanker,
  Ebbinghaus,
  Muller,
  Contrast,
  FigureGround,
  Misinformation,
  Consensus,
  Attribution,
  Transactive,
  Intentions,
  Intervals,
  Power,
  Sequential,
  Bootstrap,
  Quartet,
  Amortization,
  Debt,
  Convexity,
  Dividend,
  Frontier,
  Dutch,
  AllPay,
  CommonKnowledge,
  Screening,
  Tiebout,
  LeChatelier,
  Minimum,
  Albedo,
  Synchronization,
  Enrichment,
  Dijkstra,
  AStar,
  Belady,
  NoFreeLunch,
  Districts,
  Buridan,
  Mary,
  Gettier,
  Chinese,
  Repugnant,
];
const seeded = [0, 10, 11, 12, 13, 21, 33, 35];
export default function MosaicExperiment({ id }: { id: string }) {
  const index = mosaicEntries.findIndex((e) => e.id === id),
    entry = mosaicEntries[index],
    Board = boards[index],
    [seed, setSeed] = useState(941),
    [revision, setRevision] = useState(0);
  return (
    <SimulationShell
      label={entry.name}
      number={`M${String(index + 1).padStart(2, "0")}`}
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
          {seeded.includes(index) && (
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
        className="simple-board frontier-board depth-board mosaic-board"
        aria-label={`Explore ${entry.name}`}
      >
        <Board key={`${id}-${seed}-${revision}`} seed={seed} />
      </section>
      <p className="simulation-disclaimer">{entry.limitation}</p>
    </SimulationShell>
  );
}
