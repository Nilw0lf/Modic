"use client";
import { useState } from "react";
import { horizonEntries } from "@/data/horizons-expansion";
import { SimulationShell } from "@/components/simulation/SimulationShell";
import {
  Facilitation,
  Priming,
  Recognition,
  Ignorance,
  Abilene,
} from "./SocialBoards";
import {
  Einstellung,
  Fixedness,
  Closure,
  Weber,
  Proximity,
} from "./CreativeBoards";
import {
  Shapley,
  Power,
  Commitment,
  Hazard,
  PublicProject,
} from "./CooperationBoards";
import { Trade, Tax, Coase, Hotelling, CostDisease } from "./EconomicBoards";
import { Parrondo, PageRank, Attachment, Jury, Hamming } from "./NetworkBoards";
import { Foraging, Regret, Options, Jensen, Annealing } from "./DecisionBoards";
function Board({ id, seed }: { id: string; seed: number }) {
  switch (id) {
    case "social-facilitation":
      return <Facilitation seed={seed} />;
    case "affective-priming":
      return <Priming />;
    case "liking-and-recognition":
      return <Recognition seed={seed} />;
    case "pluralistic-ignorance":
      return <Ignorance />;
    case "abilene-paradox":
      return <Abilene />;
    case "einstellung-effect":
      return <Einstellung />;
    case "functional-fixedness":
      return <Fixedness />;
    case "gestalt-closure":
      return <Closure seed={seed} />;
    case "webers-law":
      return <Weber />;
    case "gestalt-proximity":
      return <Proximity />;
    case "shapley-value":
      return <Shapley />;
    case "banzhaf-power-index":
      return <Power />;
    case "credible-commitment":
      return <Commitment />;
    case "moral-hazard":
      return <Hazard seed={seed} />;
    case "vcg-public-project":
      return <PublicProject />;
    case "comparative-advantage":
      return <Trade />;
    case "pigouvian-tax":
      return <Tax />;
    case "coase-bargaining":
      return <Coase />;
    case "hotelling-rule":
      return <Hotelling />;
    case "baumol-cost-disease":
      return <CostDisease />;
    case "parrondos-paradox":
      return <Parrondo seed={seed} />;
    case "pagerank":
      return <PageRank />;
    case "preferential-attachment":
      return <Attachment seed={seed} />;
    case "condorcet-jury-theorem":
      return <Jury seed={seed} />;
    case "hamming-code":
      return <Hamming />;
    case "marginal-value-theorem":
      return <Foraging />;
    case "minimax-regret":
      return <Regret />;
    case "real-options":
      return <Options seed={seed} />;
    case "jensens-inequality":
      return <Jensen />;
    case "simulated-annealing":
      return <Annealing seed={seed} />;
    default:
      throw new Error("Unknown horizons experiment " + id);
  }
}
const seeded = [
  "social-facilitation",
  "liking-and-recognition",
  "gestalt-closure",
  "moral-hazard",
  "parrondos-paradox",
  "preferential-attachment",
  "condorcet-jury-theorem",
  "real-options",
  "simulated-annealing",
];
export default function HorizonsExperiment({ id }: { id: string }) {
  const entry = horizonEntries.find((e) => e.id === id)!,
    [seed, setSeed] = useState(941),
    [revision, setRevision] = useState(0);
  return (
    <SimulationShell
      label={entry.name}
      number={`H${String(horizonEntries.indexOf(entry) + 1).padStart(2, "0")}`}
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
          {entry.format === "game" ? "PLAY & EXPLAIN" : "TEST THE MECHANISM"}
        </span>
      </div>
      <section
        className="simple-board frontier-board depth-board horizons-board"
        aria-label={`Explore ${entry.name}`}
      >
        <Board key={`${id}-${seed}-${revision}`} id={id} seed={seed} />
      </section>
      <p className="simulation-disclaimer">{entry.limitation}</p>
    </SimulationShell>
  );
}
