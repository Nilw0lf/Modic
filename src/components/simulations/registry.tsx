import dynamic from "next/dynamic";
import type { ComponentType } from "react";
export const simulations: Record<string, ComponentType> = {
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
