import { quantileSorted } from "d3-array";
import { z } from "zod";
import { seededRandom } from "./random";
export const lindyInputSchema = z.object({
  age: z.number().min(5).max(500),
  strength: z.number().min(0).max(2),
  uncertainty: z.enum(["low", "medium", "high"]),
  count: z.number().int().min(100).max(5000),
  seed: z.number().int().min(0).max(4294967295).default(42),
});
export type LindyInput = z.infer<typeof lindyInputSchema>;
export type LindyOutput = {
  samples: number[];
  median: number;
  q25: number;
  q75: number;
  q95: number;
  modelMedian: number;
};
export const defaultLindyInput: LindyInput = {
  age: 100,
  strength: 1,
  uncertainty: "medium",
  count: 1000,
  seed: 42,
};
/** Illustrative scale model, not a fitted conditional-survival model.
 * median = 50 * (age / 50)^strength. Strength 0 removes age dependence;
 * strength 1 makes median remaining life equal observed age.
 * Lognormal scatter changes dispersion without changing the population median.
 * This imposes the Lindy intuition; it is not empirical evidence for it.
 */
export function simulateLindy(raw: LindyInput): LindyOutput {
  const input = lindyInputSchema.parse(raw);
  const random = seededRandom(input.seed);
  const modelMedian = 50 * Math.pow(input.age / 50, input.strength);
  const sigma = { low: 0.3, medium: 0.7, high: 1.2 }[input.uncertainty];
  const samples = Array.from({ length: input.count }, () => {
    const normal =
      Math.sqrt(-2 * Math.log(random())) * Math.cos(2 * Math.PI * random());
    return modelMedian * Math.exp(sigma * normal);
  }).sort((a, b) => a - b);
  return {
    samples,
    modelMedian,
    median: quantileSorted(samples, 0.5)!,
    q25: quantileSorted(samples, 0.25)!,
    q75: quantileSorted(samples, 0.75)!,
    q95: quantileSorted(samples, 0.95)!,
  };
}
