import { describe, expect, it } from "vitest";
import {
  defaultLindyInput,
  lindyInputSchema,
  simulateLindy,
} from "@/lib/simulations/lindy";
import { seededRandom } from "@/lib/simulations/random";
describe("seeded randomness", () => {
  it("is deterministic and inside the open unit interval", () => {
    const a = seededRandom(42),
      b = seededRandom(42);
    for (let i = 0; i < 10000; i++) {
      const x = a();
      expect(x).toBe(b());
      expect(x).toBeGreaterThan(0);
      expect(x).toBeLessThan(1);
    }
  });
});
describe("Lindy model", () => {
  it("returns positive sorted samples and ordered quantiles", () => {
    const r = simulateLindy(defaultLindyInput);
    expect(r.samples).toHaveLength(1000);
    expect(
      r.samples.every(
        (x, i, a) => Number.isFinite(x) && x > 0 && (i === 0 || a[i - 1] <= x),
      ),
    ).toBe(true);
    expect(r.q25).toBeLessThan(r.median);
    expect(r.median).toBeLessThan(r.q75);
    expect(r.q75).toBeLessThan(r.q95);
  });
  it("is deterministic, while a new seed changes the sample", () => {
    expect(simulateLindy(defaultLindyInput)).toEqual(
      simulateLindy(defaultLindyInput),
    );
    expect(
      simulateLindy({ ...defaultLindyInput, seed: 43 }).samples,
    ).not.toEqual(simulateLindy(defaultLindyInput).samples);
  });
  it("removes age dependence at zero strength", () => {
    expect(
      simulateLindy({ ...defaultLindyInput, age: 5, strength: 0 }),
    ).toEqual(simulateLindy({ ...defaultLindyInput, age: 500, strength: 0 }));
  });
  it("scales all quantiles linearly at strength one", () => {
    const a = simulateLindy({ ...defaultLindyInput, age: 10 });
    const b = simulateLindy({ ...defaultLindyInput, age: 100 });
    expect(b.median / a.median).toBeCloseTo(10, 10);
    expect(b.q75 / a.q75).toBeCloseTo(10, 10);
    expect(b.modelMedian).toBe(100);
  });
  it("squares the age ratio at strength two", () => {
    const a = simulateLindy({ ...defaultLindyInput, age: 50, strength: 2 });
    const b = simulateLindy({ ...defaultLindyInput, age: 100, strength: 2 });
    expect(b.median / a.median).toBeCloseTo(4, 10);
  });
  it("increases dispersion without changing population median", () => {
    const a = simulateLindy({ ...defaultLindyInput, uncertainty: "low" });
    const b = simulateLindy({ ...defaultLindyInput, uncertainty: "high" });
    expect(a.modelMedian).toBe(b.modelMedian);
    expect(b.q75 - b.q25).toBeGreaterThan(a.q75 - a.q25);
  });
  it("accepts inclusive bounds", () => {
    for (const age of [5, 500])
      for (const strength of [0, 2])
        for (const count of [100, 5000])
          expect(
            simulateLindy({ ...defaultLindyInput, age, strength, count })
              .samples,
          ).toHaveLength(count);
  });
  it.each([
    { age: 4 },
    { age: 501 },
    { age: NaN },
    { age: Infinity },
    { strength: -0.1 },
    { strength: 2.1 },
    { count: 99 },
    { count: 5001 },
    { count: 100.5 },
    { seed: -1 },
    { uncertainty: "extreme" },
  ])("rejects out-of-bounds input %j", (patch) => {
    expect(
      lindyInputSchema.safeParse({ ...defaultLindyInput, ...patch }).success,
    ).toBe(false);
  });
});
