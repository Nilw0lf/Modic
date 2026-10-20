import { describe, expect, it } from "vitest";
import {
  adaptation,
  capabilityAccess,
  controlOutcome,
  distribution,
  factoryBadges,
  lotteryRole,
  promiseWorld,
  ratingDifference,
  ruleValue,
  shipState,
  socialPolicies,
  squaredError,
  utilityAllocation,
  zenoStep,
} from "@/lib/simulations/philosophy";
import {
  philosophyEntries,
  philosophyThinkers,
} from "@/data/philosophy-expansion";
describe("philosophy teaching models", () => {
  it("holds preparation fixed when an external outcome changes", () => {
    expect(controlOutcome([3, 3, 0, 0], -4)).toEqual({
      preparation: 15,
      outcome: 11,
      spent: 6,
    });
    expect(controlOutcome([3, 3, 0, 0], 4).preparation).toBe(15);
    expect(controlOutcome([0, 0, 3, 3], 4)).toEqual({
      preparation: 0,
      outcome: 4,
      spent: 6,
    });
  });
  it("reports distributional criteria without selecting a moral winner", () => {
    expect(distribution(socialPolicies[0].values)).toEqual({
      total: 24,
      minimum: 6,
      mean: 6,
    });
    expect(distribution(socialPolicies[1].values)).toEqual({
      total: 32,
      minimum: 1,
      mean: 8,
    });
    for (let s = 0; s < 100; s++) {
      expect(lotteryRole(s)).toBeGreaterThanOrEqual(0);
      expect(lotteryRole(s)).toBeLessThan(4);
    }
    expect(lotteryRole(509)).toBe(lotteryRole(509));
  });
  it("conserves original ship material under replacement", () => {
    for (let n = 0; n <= 8; n++) {
      const state = shipState(Array.from({ length: n }, (_, i) => i));
      expect(state.aboard + state.stored).toBe(8);
      expect(state.replacement).toBe(state.stored);
    }
    expect(shipState([0, 0, 1]).stored).toBe(2);
  });
  it("distinguishes assumed adaptation, persistent response, and an added boost", () => {
    expect(adaptation(10, 0.5)).toBe(5);
    expect(adaptation(5, 0.5)).toBe(2.5);
    expect(adaptation(10, 1)).toBe(10);
    expect(adaptation(10, 0)).toBe(0);
    expect(adaptation(10, 0.5, 10)).toBe(15);
  });
  it("fits both candidate rules in sample but separates their next predictions", () => {
    for (const x of [1, 2, 3])
      expect(ruleValue(x, true)).toBe(ruleValue(x, false));
    expect(ruleValue(4, false)).toBe(8);
    expect(ruleValue(4, true)).toBe(14);
    expect(squaredError(8, 14)).toBe(36);
    expect(squaredError(14, 14)).toBe(0);
    expect(factoryBadges.filter((c) => c === "amber")).toHaveLength(1);
  });
  it("makes the promise-practice threshold an explicit operational assumption", () => {
    expect(promiseWorld(1)).toEqual({ reliable: 9, loans: 10 });
    expect(promiseWorld(4).loans).toBe(10);
    expect(promiseWorld(5).loans).toBe(0);
    expect(promiseWorld(10)).toEqual({ reliable: 0, loans: 0 });
  });
  it("does not collapse a distributive difference into a shared total", () => {
    expect(utilityAllocation(2)).toEqual({
      a: 14,
      b: 15,
      total: 29,
      minimum: 14,
    });
    expect(utilityAllocation(3)).toEqual({
      a: 18,
      b: 11,
      total: 29,
      minimum: 11,
    });
    expect(utilityAllocation(0).a).toBe(0);
    expect(utilityAllocation(5).b).toBe(0);
  });
  it("separates personal resources from available access conditions", () => {
    expect(capabilityAccess([])).toEqual({ spent: 0, central: 3, remote: 0 });
    expect(capabilityAccess([0])).toEqual({ spent: 2, central: 3, remote: 1 });
    expect(capabilityAccess([0, 1, 2])).toEqual({
      spent: 6,
      central: 3,
      remote: 3,
    });
  });
  it("keeps a positive finite remainder distinct from the series limit", () => {
    expect(zenoStep(3, true)).toEqual({
      distance: 0.875,
      remaining: 0.125,
      time: 0.875,
    });
    expect(zenoStep(3, false).time).toBe(3);
    expect(zenoStep(16, true).distance).toBeLessThan(1);
    expect(zenoStep(16, true).remaining).toBeGreaterThan(0);
  });
  it("reports actual self-ratings without manufacturing a philosophical score", () => {
    const before = [3, 3],
      after = [5, 1];
    expect(ratingDifference(before, after)).toEqual([2, -2]);
    expect(before).toEqual([3, 3]);
    expect(philosophyEntries).toHaveLength(15);
    expect(new Set(philosophyEntries.map((e) => e.id)).size).toBe(15);
    expect(philosophyThinkers).toHaveLength(18);
  });
});
