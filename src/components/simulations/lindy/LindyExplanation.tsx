import type { LindyInput, LindyOutput } from "@/lib/simulations/lindy";
export function LindyExplanation({
  input,
  result,
}: {
  input: LindyInput;
  result: LindyOutput;
}) {
  return (
    <div className="notice-panel">
      <span className="eyebrow">WHAT TO NOTICE</span>
      <p>
        {input.strength === 0 ? (
          "Age has stopped mattering. The model’s median stays at 50 years whether the observed age is 5 or 500 years."
        ) : (
          <>
            At strength {input.strength.toFixed(1)}, doubling the age multiplies
            the model’s median remaining life by{" "}
            {Math.pow(2, input.strength).toFixed(2)}. The current sample median
            is{" "}
            <strong>
              {Math.round(result.median).toLocaleString("en-US")} years
            </strong>
            .
          </>
        )}{" "}
        {input.uncertainty === "high"
          ? "High uncertainty stretches the tail: some futures last much longer than most."
          : "Change the uncertainty to spread the futures out without changing the model’s central assumption."}
      </p>
    </div>
  );
}
