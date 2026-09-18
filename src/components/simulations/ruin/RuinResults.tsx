import {
  expectedRoundReturn,
  ruinObservations,
} from "@/lib/simulations/gamblers-ruin";
import type { RuinRun } from "./RuinChart";
import { wealthFormat, percentFormat } from "./format";
export function RuinResults({ run }: { run: RuinRun }) {
  const stats =
    run.mode === "many"
      ? [
          ["Ruin probability", percentFormat(run.result.ruinProbability)],
          ["Median ending wealth", wealthFormat(run.result.medianEndingWealth)],
          ["Mean ending wealth", wealthFormat(run.result.meanEndingWealth)],
          ["25th percentile", wealthFormat(run.result.q25)],
          ["75th percentile", wealthFormat(run.result.q75)],
          [
            "Finished above start",
            percentFormat(run.result.fractionAboveStart),
          ],
        ]
      : [
          ["Starting wealth", wealthFormat(run.result.startingWealth)],
          ["Final wealth", wealthFormat(run.result.finalWealth)],
          ["Maximum wealth", wealthFormat(run.result.maximumWealth)],
          ["Maximum drawdown", percentFormat(run.result.maximumDrawdown)],
          [
            "Ruin point",
            run.result.ruinRound === null
              ? "Not reached"
              : `Round ${run.result.ruinRound}`,
          ],
        ];
  const notes =
    run.mode === "many"
      ? ruinObservations(run.input, run.result)
      : [
          run.result.ruinRound === null
            ? "This life stayed above the threshold. One survivor cannot establish how often a strategy survives; run many lives to see the range."
            : `This life stopped in round ${run.result.ruinRound}. Crossing the threshold is absorbing: later wins cannot restore participation.`,
          ...(expectedRoundReturn(run.input) > 0 &&
          run.result.ruinRound !== null
            ? [
                "This happened despite a positive expected return per round under the chosen assumptions.",
              ]
            : []),
        ];
  return (
    <>
      <section
        className={`ruin-results ${run.mode}`}
        aria-label="What happened"
      >
        <div className="ruin-results-heading">
          <h3 className="eyebrow">WHAT HAPPENED</h3>
          <span className="small-note">
            {run.mode === "many"
              ? `${run.result.count.toLocaleString("en-US")} lives`
              : "1 life"}{" "}
            · {run.input.rounds} rounds · {run.input.risk * 100}% risk
          </span>
        </div>
        <dl className="ruin-stat-grid">
          {stats.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="small-note">
          Wealth is in illustrative units.{" "}
          {run.mode === "many"
            ? "Ruin probability is a sample estimate, not an exact probability."
            : "Drawdown is the largest percentage fall from an earlier peak."}
        </p>
      </section>
      <section className="notice-panel ruin-notice">
        <h3 className="eyebrow">WHAT TO NOTICE</h3>
        <div>
          {notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </section>
    </>
  );
}
