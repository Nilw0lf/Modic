"use client";
import { useState } from "react";
import { financeEntries } from "@/data/finance-expansion";
import { SimulationShell } from "@/components/simulation/SimulationShell";
import {
  Averaging,
  Duration,
  Fees,
  Inflation,
  Rebalancing,
  Sequence,
  Valuation,
  Volatility,
} from "./FinanceModels";
import {
  Competence,
  Disposition,
  HouseMoney,
  Leverage,
  Margin,
  SpecificKnowledge,
  Treasury,
} from "./FinanceGames";
function Board({ id, seed }: { id: string; seed: number }) {
  switch (id) {
    case "volatility-drag":
      return <Volatility />;
    case "sequence-of-returns":
      return <Sequence />;
    case "fee-drag":
      return <Fees />;
    case "real-return":
      return <Inflation />;
    case "bond-duration":
      return <Duration />;
    case "discounted-cash-flow":
      return <Valuation />;
    case "margin-calls":
      return <Margin />;
    case "portfolio-rebalancing":
      return <Rebalancing />;
    case "dollar-cost-averaging":
      return <Averaging />;
    case "disposition-effect":
      return <Disposition />;
    case "house-money-effect":
      return <HouseMoney seed={seed} />;
    case "minsky-financing":
      return <Treasury />;
    case "permissionless-leverage":
      return <Leverage />;
    case "specific-knowledge":
      return <SpecificKnowledge />;
    case "circle-of-competence":
      return <Competence seed={seed} />;
    default:
      throw new Error("Unknown finance experiment: " + id);
  }
}
export default function FinanceExperiment({ id }: { id: string }) {
  const e = financeEntries.find((e) => e.id === id)!,
    [seed, setSeed] = useState(241),
    [revision, setRevision] = useState(0);
  return (
    <SimulationShell
      label={e.name}
      number={`M${String(financeEntries.indexOf(e) + 1).padStart(2, "0")}`}
      actions={
        <>
          <button
            onClick={() => {
              setSeed(241);
              setRevision((v) => v + 1);
            }}
          >
            Reset
          </button>
          {["house-money-effect", "circle-of-competence"].includes(id) && (
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
          <h2>{e.name}</h2>
          <p>{e.question}</p>
        </div>
        <span className="model-tag">
          {e.format === "game" ? "PLAY & LEARN" : "ILLUSTRATIVE MODEL"}
        </span>
      </div>
      <section
        className="simple-board frontier-board money-board"
        aria-label={`Explore ${e.name}`}
      >
        <Board key={`${id}-${seed}-${revision}`} id={id} seed={seed} />
      </section>
      <p className="simulation-disclaimer">{e.limitation}</p>
    </SimulationShell>
  );
}
