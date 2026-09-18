import type { GamblerRuinInput } from "@/lib/simulations/gamblers-ruin";
export const ruinControls = [
  {
    key: "wealth",
    label: "Starting wealth",
    min: 100,
    max: 1000000,
    step: 100,
    unit: "units",
  },
  {
    key: "risk",
    label: "Risk per round",
    min: 0,
    max: 1,
    step: 0.01,
    unit: "% of current wealth",
  },
  {
    key: "win",
    label: "Win probability",
    min: 0,
    max: 1,
    step: 0.01,
    unit: "%",
  },
  {
    key: "payoff",
    label: "Win payoff",
    min: 0,
    max: 3,
    step: 0.1,
    unit: "× stake, net profit",
  },
  {
    key: "rounds",
    label: "Number of rounds",
    min: 1,
    max: 500,
    step: 1,
    unit: "rounds",
  },
  {
    key: "lives",
    label: "Simulated lives",
    min: 1,
    max: 5000,
    step: 1,
    unit: "lives",
  },
  {
    key: "threshold",
    label: "Ruin threshold",
    min: 1,
    max: 999999,
    step: 1,
    unit: "wealth units",
  },
] as const;
export type RuinDraft = Record<keyof GamblerRuinInput, string>;
export function toDraft(input: GamblerRuinInput): RuinDraft {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, String(value)]),
  ) as RuinDraft;
}
export function RuinControls({
  draft,
  onChange,
  disabled,
}: {
  draft: RuinDraft;
  onChange: (key: keyof GamblerRuinInput, value: string) => void;
  disabled: boolean;
}) {
  return (
    <fieldset className="ruin-controls" disabled={disabled}>
      <legend className="sr-only">Experiment assumptions</legend>
      {ruinControls.map((control) => {
        const percent = control.key === "risk" || control.key === "win";
        const value = draft[control.key];
        return (
          <div className="ruin-control" key={control.key}>
            <label htmlFor={`ruin-${control.key}`}>{control.label}</label>
            <div className="ruin-number">
              <input
                id={`ruin-${control.key}`}
                type="number"
                inputMode="decimal"
                min={control.min * (percent ? 100 : 1)}
                max={control.max * (percent ? 100 : 1)}
                step={control.step * (percent ? 100 : 1)}
                value={
                  value === ""
                    ? ""
                    : Number(
                        (Number(value) * (percent ? 100 : 1)).toPrecision(12),
                      )
                }
                onChange={(event) =>
                  onChange(
                    control.key,
                    event.target.value === ""
                      ? ""
                      : String(
                          Number(event.target.value) / (percent ? 100 : 1),
                        ),
                  )
                }
                aria-describedby={`ruin-${control.key}-hint`}
              />
              <span id={`ruin-${control.key}-hint`}>{control.unit}</span>
            </div>
          </div>
        );
      })}
    </fieldset>
  );
}
