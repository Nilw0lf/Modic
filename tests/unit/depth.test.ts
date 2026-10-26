import { describe, it, expect } from "vitest";
import {
  bh,
  borda,
  brier,
  criticalPath,
  drift,
  mutation,
  precision,
  resonance,
  rng,
  selection,
  slope,
} from "@/lib/simulations/depth";
import { depthEntries, depthThinkers } from "@/data/depth-expansion";
import { getEffect, validateCatalog } from "@/lib/catalog";
import { readerGuides } from "@/content/effects/guides";
describe("thirty deeper interactive models", () => {
  it("publishes thirty distinct live models and individually authored notes", () => {
    expect(validateCatalog()).toBe(true);
    expect(depthEntries).toHaveLength(30);
    expect(depthThinkers).toHaveLength(28);
    for (const e of depthEntries) {
      expect(getEffect(e.id)?.status).toBe("live");
      expect(readerGuides[e.id]).toBeDefined();
      expect(e.limitation.length).toBeGreaterThan(100);
    }
  });
  it("uses BH's largest passing rank rather than stopping at the first failure", () => {
    expect(bh([0.02, 0.025, 0.9], 0.05)).toEqual([true, true, false]);
    expect(bh([0.2, 0.4, 0.9], 0.05)).toEqual([false, false, false]);
    expect(bh([0, 0, 1], 0.05)).toEqual([true, true, false]);
  });
  it("preserves neutral selection and reverses relative advantage", () => {
    expect(selection(0.3, 1, 1)).toBeCloseTo(0.3);
    expect(selection(0.5, 1.2, 1)).toBeGreaterThan(0.5);
    expect(selection(0.5, 1, 1.2)).toBeLessThan(0.5);
  });
  it("makes genetic fixation and loss absorbing without mutation", () => {
    expect(drift(0, 20, rng(4))).toBe(0);
    expect(drift(1, 20, rng(4))).toBe(1);
    expect(drift(0.5, 30, rng(9))).toBe(drift(0.5, 30, rng(9)));
  });
  it("replenishes a missing recessive allele through forward mutation", () => {
    expect(mutation(0, 0.005, 0.5)).toBe(0.005);
    expect(mutation(0.5, 0, 0.5)).toBeLessThan(0.5);
    let q = 0.5;
    for (let i = 0; i < 2000; i++) q = mutation(q, 0.001, 0.5);
    expect(q).toBeCloseTo(Math.sqrt(0.001 / 0.5), 2);
  });
  it("distinguishes a local task saving from a project saving and detects multiple critical paths", () => {
    const a = criticalPath([3, 4, 2, 5, 3, 2]);
    expect(a.total).toBe(10);
    expect(a.slack).toEqual([0, 1, 3, 0, 1, 0]);
    expect(criticalPath([3, 4, 1, 5, 3, 2]).total).toBe(10);
    const b = criticalPath([3, 4, 2, 4, 3, 2]);
    expect(b.total).toBe(9);
    expect(b.slack.filter((x) => x === 0)).toHaveLength(5);
  });
  it("shows an explicit profitable Borda manipulation with a declared tie rule", () => {
    expect(borda("ABC").winner).toBe("C");
    expect(borda("BAC").winner).toBe("B");
    expect(borda("ABC").scores).toEqual({ A: 2, B: 5, C: 5 });
  });
  it("treats empty retrieval explicitly and identifies the smallest five-hit prefix", () => {
    expect(precision(0)).toMatchObject({ precision: null, recall: 0, f1: 0 });
    expect(precision(9).tp).toBe(4);
    expect(precision(10)).toMatchObject({
      tp: 5,
      precision: 0.5,
      recall: 5 / 6,
    });
    expect(precision(20).recall).toBe(1);
  });
  it("scores probability forecasts on the binary convention", () => {
    expect(brier([0.8], [1])).toBeCloseTo(0.04);
    expect(brier([0.8], [0])).toBeCloseTo(0.64);
    expect(brier([1, 0], [1, 0])).toBe(0);
    expect(0.8 * brier([0.8], [1]) + 0.2 * brier([0.8], [0])).toBeCloseTo(0.16);
  });
  it("recovers an error-free slope without assuming a finite noisy estimate equals its benchmark", () => {
    expect(
      slope([
        [-1, 18],
        [0, 20],
        [1, 22],
      ]),
    ).toBe(2);
  });
  it("limits resonant amplification through damping", () => {
    expect(resonance(1, 0.1)).toBeCloseTo(10);
    expect(resonance(1, 1)).toBeCloseTo(1);
    expect(resonance(0.2, 0.3)).toBeLessThan(resonance(1, 0.3));
  });
});
