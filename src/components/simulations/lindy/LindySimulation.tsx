"use client";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RotateCcw, Shuffle } from "lucide-react";
import {
  defaultLindyInput,
  simulateLindy,
  type LindyInput,
} from "@/lib/simulations/lindy";
import { SimulationShell } from "@/components/simulation/SimulationShell";
import { SimulationStat } from "@/components/simulation/SimulationStat";
import { LindyChart } from "./LindyChart";
import { LindyControls } from "./LindyControls";
import { LindyExplanation } from "./LindyExplanation";
const format = (value: number) => Math.round(value).toLocaleString("en-US");
export default function LindySimulation() {
  const [input, setInput] = useState<LindyInput>(defaultLindyInput);
  const result = useMemo(() => simulateLindy(input), [input]);
  const reducedMotion = useReducedMotion();
  const update = (patch: Partial<LindyInput>) =>
    setInput((current) => ({ ...current, ...patch }));
  return (
    <>
      <SimulationShell
        actions={
          <>
            <button onClick={() => setInput({ ...defaultLindyInput })}>
              <RotateCcw size={14} /> Reset
            </button>
            <button onClick={() => update({ seed: (input.seed + 1) >>> 0 })}>
              <Shuffle size={14} /> Resample
            </button>
          </>
        }
      >
        <div className="simulation-intro">
          <div>
            <h2>
              The past is known.
              <br />
              <span>The future is a distribution.</span>
            </h2>
            <p>Adjust the assumptions. Watch the possibilities change.</p>
          </div>
          <span className="model-tag">ILLUSTRATIVE MODEL</span>
        </div>
        <LindyControls input={input} onChange={update} />
        <motion.div
          key={input.seed}
          initial={reducedMotion ? false : { opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <LindyChart input={input} result={result} />
        </motion.div>
        <dl className="simulation-stats" aria-live="polite" aria-atomic="true">
          <SimulationStat label="Observed age" value={format(input.age)} />
          <SimulationStat
            label="Median simulated remaining life"
            value={format(result.median)}
          />
          <SimulationStat
            label="25–75% interval"
            value={`${format(result.q25)}–${format(result.q75)}`}
          />
        </dl>
        <p className="simulation-disclaimer">
          Model outputs are illustrative simulation values, not forecasts for
          real things.
        </p>
      </SimulationShell>
      <LindyExplanation input={input} result={result} />
      <section className="try-section">
        <span className="eyebrow">TRY THIS</span>
        <div className="try-grid">
          <button
            onClick={() =>
              update({ age: input.age === 10 ? 100 : 10, strength: 1 })
            }
          >
            <span>01</span>
            <strong>A decade or a century?</strong>
            <p>Switch between ages 10 and 100 at strength 1.</p>
            <span className="try-link">
              Set age to {input.age === 10 ? 100 : 10} years ↗
            </span>
          </button>
          <button onClick={() => update({ strength: 0 })}>
            <span>02</span>
            <strong>Take age out of the equation.</strong>
            <p>Set strength to zero, then move the age slider.</p>
            <span className="try-link">Remove the age effect ↗</span>
          </button>
          <button
            onClick={() =>
              update({
                uncertainty: input.uncertainty === "high" ? "low" : "high",
              })
            }
          >
            <span>03</span>
            <strong>Make room for surprises.</strong>
            <p>Compare a narrow range with a long, uncertain tail.</p>
            <span className="try-link">
              Set {input.uncertainty === "high" ? "low" : "high"} uncertainty ↗
            </span>
          </button>
        </div>
      </section>
    </>
  );
}
