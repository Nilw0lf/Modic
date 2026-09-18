import type { LindyInput } from "@/lib/simulations/lindy";
type Props = {
  input: LindyInput;
  onChange: (patch: Partial<LindyInput>) => void;
};
export function LindyControls({ input, onChange }: Props) {
  return (
    <div className="simulation-controls">
      <div className="control">
        <label htmlFor="current-age">
          Current age{" "}
          <output htmlFor="current-age">
            {input.age} <span>years</span>
          </output>
        </label>
        <input
          id="current-age"
          type="range"
          min="5"
          max="500"
          step="5"
          value={input.age}
          onChange={(event) => onChange({ age: Number(event.target.value) })}
        />
        <div className="range-labels">
          <span>5 years</span>
          <span>500 years</span>
        </div>
      </div>
      <div className="control">
        <label htmlFor="lindy-strength">
          Lindy strength{" "}
          <output htmlFor="lindy-strength">{input.strength.toFixed(1)}</output>
        </label>
        <input
          id="lindy-strength"
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={input.strength}
          onChange={(event) =>
            onChange({ strength: Number(event.target.value) })
          }
        />
        <div className="range-labels">
          <span>No age effect</span>
          <span>Stronger</span>
        </div>
      </div>
      <fieldset className="control">
        <legend>Uncertainty</legend>
        <div className="segmented-control">
          {(["low", "medium", "high"] as const).map((level) => (
            <button
              key={level}
              aria-pressed={input.uncertainty === level}
              onClick={() => onChange({ uncertainty: level })}
            >
              {level}
            </button>
          ))}
        </div>
        <p className="control-hint">Spread of possible futures</p>
      </fieldset>
      <div className="control">
        <label htmlFor="future-count">
          Simulated futures{" "}
          <output htmlFor="future-count">
            {input.count.toLocaleString("en-US")}
          </output>
        </label>
        <input
          id="future-count"
          type="range"
          min="100"
          max="5000"
          step="100"
          value={input.count}
          onChange={(event) => onChange({ count: Number(event.target.value) })}
        />
        <div className="range-labels">
          <span>100</span>
          <span>5,000</span>
        </div>
      </div>
    </div>
  );
}
