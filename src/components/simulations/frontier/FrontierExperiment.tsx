"use client";
import { useState } from "react";
import { frontierEntries } from "@/data/frontier-expansion";
import { SimulationShell } from "@/components/simulation/SimulationShell";
import {
  MatchingGame,
  VenueGame,
  QuantityGame,
  PricingGame,
  AttritionGame,
  BlottoGame,
} from "./StrategicGames";
import {
  RoutingBoard,
  ContagionBoard,
  PerformativeBoard,
  FairnessBoard,
  PrivacyBoard,
} from "./AlgorithmBoards";
import { AttentionGame, ChangeGame, ExposureGame } from "./AttentionGames";

function Board({ id, seed }: { id: string; seed: number }) {
  switch (id) {
    case "stable-matching":
      return <MatchingGame seed={seed} />;
    case "battle-of-the-sexes":
      return <VenueGame seed={seed} />;
    case "cournot-competition":
      return <QuantityGame />;
    case "stackelberg-competition":
      return <QuantityGame leader />;
    case "bertrand-competition":
      return <PricingGame />;
    case "war-of-attrition":
      return <AttritionGame />;
    case "colonel-blotto":
      return <BlottoGame seed={seed} />;
    case "price-of-anarchy":
      return <RoutingBoard />;
    case "complex-contagion":
      return <ContagionBoard />;
    case "performative-prediction":
      return <PerformativeBoard />;
    case "algorithmic-fairness":
      return <FairnessBoard />;
    case "differential-privacy":
      return <PrivacyBoard seed={seed} />;
    case "inattentional-blindness":
      return <AttentionGame seed={seed} />;
    case "change-blindness":
      return <ChangeGame seed={seed} />;
    case "mere-exposure-effect":
      return <ExposureGame seed={seed} />;
    default:
      throw new Error(`Unregistered frontier experiment: ${id}`);
  }
}
const seeded = new Set([
  "stable-matching",
  "battle-of-the-sexes",
  "colonel-blotto",
  "differential-privacy",
  "inattentional-blindness",
  "change-blindness",
  "mere-exposure-effect",
]);
export default function FrontierExperiment({ id }: { id: string }) {
  const entry = frontierEntries.find((e) => e.id === id)!;
  const [seed, setSeed] = useState(137),
    [revision, setRevision] = useState(0);
  return (
    <SimulationShell
      label={entry.name}
      number={`F${String(frontierEntries.indexOf(entry) + 1).padStart(2, "0")}`}
      actions={
        <>
          <button
            onClick={() => {
              setSeed(137);
              setRevision((v) => v + 1);
            }}
          >
            Reset
          </button>
          {seeded.has(id) && (
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
          {entry.format === "game" ? "PLAY & NOTICE" : "ILLUSTRATIVE MODEL"}
        </span>
      </div>
      <section
        className="simple-board frontier-board"
        aria-label={`Explore ${entry.name}`}
      >
        <Board key={`${id}-${seed}-${revision}`} id={id} seed={seed} />
      </section>
      <p className="simulation-disclaimer">{entry.limitation}</p>
    </SimulationShell>
  );
}
