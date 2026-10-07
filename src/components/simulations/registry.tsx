import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { newExperiments } from "@/data/expansion";
import { simpleEntries } from "@/data/simple-expansion";
import { discoveryEntries } from "@/data/discovery-expansion";
import { frontierEntries } from "@/data/frontier-expansion";
const FrontierExperiment = dynamic(
  () => import("./frontier/FrontierExperiment"),
  {
    loading: () => (
      <div className="simulation-loading">Preparing the experiment…</div>
    ),
  },
);
const DiscoveryExperiment = dynamic(
  () => import("./discovery/DiscoveryExperiment"),
  {
    loading: () => (
      <div className="simulation-loading">Preparing the experiment…</div>
    ),
  },
);
const SimpleExperiment = dynamic(() => import("./simple/SimpleExperiment"), {
  loading: () => (
    <div className="simulation-loading">Preparing the experiment…</div>
  ),
});
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
    frontierEntries.map((entry) => [
      entry.id,
      function FrontierConceptExperiment() {
        return <FrontierExperiment id={entry.id} />;
      },
    ]),
  ),
  ...Object.fromEntries(
    discoveryEntries.map((entry) => [
      entry.id,
      function DiscoveryConceptExperiment() {
        return <DiscoveryExperiment id={entry.id} />;
      },
    ]),
  ),
  ...Object.fromEntries(
    simpleEntries.map((entry) => [
      entry.id,
      function SimpleConceptExperiment() {
        return <SimpleExperiment id={entry.id} />;
      },
    ]),
  ),
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
