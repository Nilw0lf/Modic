import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { newExperiments } from "@/data/expansion";
const EverydayExperiment = dynamic(
  () => import("./everyday/EverydayExperiment"),
  {
    loading: () => (
      <div className="simulation-loading">Preparing the experiment…</div>
    ),
  },
);
export const simulations: Record<string, ComponentType> = {
  ...Object.fromEntries(
    newExperiments.map((entry) => [
      entry.id,
      function ConceptExperiment() {
        return <EverydayExperiment id={entry.id} />;
      },
    ]),
  ),
  "base-rate": dynamic(() => import("./foundations/BaseRate")),
  regression: dynamic(() => import("./foundations/Regression")),
  "power-laws": dynamic(() => import("./foundations/PowerLaws")),
  network: dynamic(() => import("./foundations/Network")),
  "gamblers-ruin": dynamic(() => import("./ruin/GamblerRuinSimulation"), {
    loading: () => (
      <div className="simulation-loading">Preparing the experiment…</div>
    ),
  }),
  lindy: dynamic(() => import("./lindy/LindySimulation"), {
    loading: () => (
      <div className="simulation-loading">Preparing the experiment…</div>
    ),
  }),
};
