import { manyLivesSteps, type GamblerRuinInput } from "./gamblers-ruin";
/** Yield after an ~8ms work budget, including percentile calculation. No worker
 * is needed for the profiled 5,000 × 500-round maximum. */
export async function runRuinCooperatively(
  input: GamblerRuinInput,
  seed: number,
  signal: AbortSignal,
  onProgress: (progress: number) => void,
) {
  const steps = manyLivesSteps(input, seed);
  let sliceStart = performance.now();
  let next = steps.next();
  while (!next.done) {
    if (signal.aborted) throw new DOMException("Run cancelled", "AbortError");
    if (performance.now() - sliceStart >= 8) {
      onProgress(next.value);
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      sliceStart = performance.now();
    }
    next = steps.next();
  }
  if (signal.aborted) throw new DOMException("Run cancelled", "AbortError");
  return next.value;
}
