"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SimulationShell } from "@/components/simulation/SimulationShell";
import {
  defaultGamblerInput,
  gamblerRuinInputSchema,
  simulateOneLife,
  type GamblerRuinInput,
} from "@/lib/simulations/gamblers-ruin";
import {
  parseRuinParams,
  serializeRuinParams,
} from "@/lib/simulations/ruin-url";
import { runRuinCooperatively } from "@/lib/simulations/run-ruin";
import { RuinControls, toDraft, type RuinDraft } from "./RuinControls";
import { RuinChart, type RuinRun } from "./RuinChart";
import { RuinResults } from "./RuinResults";

function RuinExperiment({
  initial,
  warning,
}: {
  initial: GamblerRuinInput;
  warning: string | null;
}) {
  const [draft, setDraft] = useState<RuinDraft>(() => toDraft(initial));
  const [mode, setMode] = useState<"one" | "many">("one");
  const [run, setRun] = useState<RuinRun>(() => ({
    mode: "one",
    input: initial,
    seed: 42,
    result: simulateOneLife(initial, 42),
  }));
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(warning || "");
  const [fallbackLink, setFallbackLink] = useState("");
  const seed = useRef(42);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => abort.current?.abort(), []);
  const parsed = gamblerRuinInputSchema.safeParse(
    Object.fromEntries(
      Object.entries(draft).map(([key, value]) => [
        key,
        value.trim() === "" ? NaN : Number(value),
      ]),
    ),
  );
  const error = parsed.success ? null : parsed.error.issues[0].message;
  const changed =
    !parsed.success ||
    serializeRuinParams(parsed.data) !== serializeRuinParams(run.input);
  const current = run.mode === mode;
  const update = (patch: Partial<GamblerRuinInput>) => {
    setDraft((previous) => ({
      ...previous,
      ...Object.fromEntries(
        Object.entries(patch).map(([key, value]) => [key, String(value)]),
      ),
    }));
    setMessage("");
    setFallbackLink("");
  };
  async function execute(nextMode = mode) {
    if (!parsed.success || busy) return;
    const input = parsed.data;
    const nextSeed = (seed.current + 1) >>> 0;
    seed.current = nextSeed;
    setMode(nextMode);
    setMessage("");
    setBusy(true);
    setProgress(0);
    const controller = new AbortController();
    abort.current = controller;
    try {
      if (nextMode === "one")
        setRun({
          mode: "one",
          input,
          seed: nextSeed,
          result: simulateOneLife(input, nextSeed),
        });
      else {
        // Allow the running state to paint before starting cooperative work.
        await new Promise<void>((resolve) => setTimeout(resolve, 0));
        const result = await runRuinCooperatively(
          input,
          nextSeed,
          controller.signal,
          setProgress,
        );
        setRun({ mode: "many", input, seed: nextSeed, result });
      }
      if (!controller.signal.aborted)
        setMessage(
          nextMode === "one"
            ? "One life complete."
            : `${input.lives.toLocaleString("en-US")} lives complete.`,
        );
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError")
        setMessage("Run cancelled. Previous results are unchanged.");
      else
        setMessage(
          "The run could not complete. Check the settings and try again.",
        );
    } finally {
      setBusy(false);
      abort.current = null;
    }
  }
  async function copyLink() {
    if (!parsed.success) return;
    const link = `${window.location.origin}/effects/gamblers-ruin?${serializeRuinParams(parsed.data)}`;
    try {
      await navigator.clipboard.writeText(link);
      setMessage(
        "Experiment link copied. The link shares settings, not this random run.",
      );
      setFallbackLink("");
    } catch {
      setFallbackLink(link);
      setMessage("Copy the experiment link from the field below.");
    }
  }
  function reset() {
    setDraft(toDraft(defaultGamblerInput));
    seed.current = 42;
    setMode("one");
    setRun({
      mode: "one",
      input: { ...defaultGamblerInput },
      seed: 42,
      result: simulateOneLife(defaultGamblerInput, 42),
    });
    setMessage("Defaults restored.");
    setFallbackLink("");
  }
  return (
    <>
      <SimulationShell
        label="Interactive Gambler’s Ruin experiment"
        number="002"
        actions={
          <>
            <button disabled={busy} onClick={reset}>
              Reset
            </button>
            <button disabled={!parsed.success || busy} onClick={copyLink}>
              Copy experiment link ↗
            </button>
          </>
        }
      >
        <div className="simulation-intro">
          <div>
            <h2>
              A good bet.
              <br />
              <span>A different story when repeated.</span>
            </h2>
            <p>Risk a fraction of what remains. See who can keep going.</p>
          </div>
          <span className="model-tag">ILLUSTRATIVE MODEL</span>
        </div>
        <RuinControls
          draft={draft}
          disabled={busy}
          onChange={(key, value) => {
            setDraft((previous) => ({ ...previous, [key]: value }));
            setMessage("");
            setFallbackLink("");
          }}
        />
        {error && (
          <p className="ruin-input-error" role="alert">
            {error}
          </p>
        )}
        <div className="ruin-run-bar">
          <div className="ruin-modes" role="group" aria-label="Experiment mode">
            <button
              aria-pressed={mode === "one"}
              disabled={busy}
              onClick={() => setMode("one")}
            >
              One life
            </button>
            <button
              aria-pressed={mode === "many"}
              disabled={busy}
              onClick={() => setMode("many")}
            >
              Many lives
            </button>
          </div>
          <div className="ruin-run-actions">
            {busy ? (
              <>
                <span role="status">
                  Running… {Math.round(progress * 100)}%
                </span>
                <button
                  className="text-button"
                  onClick={() => abort.current?.abort()}
                >
                  Cancel run
                </button>
              </>
            ) : (
              <button
                className="run-button"
                disabled={!parsed.success}
                onClick={() => void execute()}
              >
                {mode === "many"
                  ? `Run ${parsed.success ? parsed.data.lives.toLocaleString("en-US") : "many"} lives`
                  : current
                    ? "Run again"
                    : "Run one life"}
                <span aria-hidden="true">↗</span>
              </button>
            )}
          </div>
        </div>
        <p className="run-context">
          {current
            ? changed
              ? "Settings changed. Results below use the previous settings; run again to apply changes."
              : `Showing ${mode === "one" ? "one life" : "many lives"} under the current settings.`
            : mode === "many"
              ? "Same assumptions. A wider view. Run many lives to compare typical outcomes with the average."
              : "Follow one sequence of outcomes. Run one life to reveal its trajectory."}
        </p>
        <div className="run-announcement" role="status">
          {message}
        </div>
        {fallbackLink && (
          <div className="share-fallback">
            <label htmlFor="share-experiment">Experiment link</label>
            <input
              id="share-experiment"
              readOnly
              value={fallbackLink}
              onFocus={(event) => event.target.select()}
            />
          </div>
        )}
        {current ? (
          <>
            <RuinChart run={run} />
            <RuinResults run={run} />
          </>
        ) : (
          <div className="ruin-empty">
            <span className="eyebrow">
              {mode === "many"
                ? "FROM ONE PATH TO A DISTRIBUTION"
                : "ONE SEQUENCE OF OUTCOMES"}
            </span>
            <p>
              {mode === "many"
                ? "How often does the same strategy survive?"
                : "What happens along one path?"}
            </p>
            <span className="small-note">
              {mode === "many"
                ? "Run the lives above to reveal the median, spread, and chance of ruin."
                : "Run one life above to see its peaks, drawdowns, and stopping point."}
            </span>
          </div>
        )}
        <p className="simulation-disclaimer">
          Independent rounds · No fees or leverage · Ruin is absorbing ·
          Illustrative outcomes, not forecasts.
        </p>
      </SimulationShell>
      <section className="try-section">
        <span className="eyebrow">TRY THIS</span>
        <div className="try-grid">
          <button
            disabled={
              busy ||
              !parsed.success ||
              parsed.data.risk === 1 ||
              parsed.data.risk === 0
            }
            onClick={() =>
              parsed.success &&
              update({ risk: Math.min(1, parsed.data.risk * 2) })
            }
          >
            <span>01</span>
            <strong>Double the exposure.</strong>
            <p>
              Keep win probability fixed and double risk per round, up to 100%.
            </p>
            <span className="try-link">Change risk, then run again ↗</span>
          </button>
          <button
            disabled={busy || !parsed.success}
            onClick={() => void execute("many")}
          >
            <span>02</span>
            <strong>Average isn’t typical.</strong>
            <p>Compare mean ending wealth with median ending wealth.</p>
            <span className="try-link">Run many lives ↗</span>
          </button>
          <button
            disabled={busy || !parsed.success || parsed.data.risk === 0}
            onClick={() =>
              parsed.success &&
              update({
                risk: Math.round((parsed.data.risk / 2) * 10000) / 10000,
              })
            }
          >
            <span>03</span>
            <strong>Leave room to survive.</strong>
            <p>Lower risk, then check whether ruin becomes less common.</p>
            <span className="try-link">Halve risk per round ↗</span>
          </button>
        </div>
      </section>
    </>
  );
}
function RuinFromUrl() {
  const params = useSearchParams();
  const initial = parseRuinParams(new URLSearchParams(params.toString()));
  return (
    <RuinExperiment
      key={params.toString()}
      initial={initial.input}
      warning={initial.warning}
    />
  );
}
export default function GamblerRuinSimulation() {
  return (
    <Suspense
      fallback={
        <div className="simulation-loading">Preparing the experiment…</div>
      }
    >
      <RuinFromUrl />
    </Suspense>
  );
}
