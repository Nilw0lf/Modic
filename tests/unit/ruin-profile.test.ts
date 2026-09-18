import { it, expect } from "vitest";
import {
  manyLivesSteps,
  defaultGamblerInput,
} from "@/lib/simulations/gamblers-ruin";
it("profiles maximum workload and keeps retained paths bounded", () => {
  const start = performance.now();
  let longest = 0;
  const steps = manyLivesSteps({
    ...defaultGamblerInput,
    lives: 5000,
    win: 0.6,
    risk: 0.1,
  });
  let before = performance.now();
  let next = steps.next();
  longest = performance.now() - before;
  while (!next.done) {
    before = performance.now();
    next = steps.next();
    longest = Math.max(longest, performance.now() - before);
  }
  console.info(
    `Ruin profile: ${(performance.now() - start).toFixed(1)}ms total; largest generator step ${longest.toFixed(1)}ms; 5,000 lives × 500 rounds.`,
  );
  expect(next.value.sampledPaths).toHaveLength(24);
  expect(next.value.bands.length).toBeLessThanOrEqual(101);
  expect(next.value.count).toBe(5000);
});
