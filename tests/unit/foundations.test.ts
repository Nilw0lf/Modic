import { describe, it, expect } from "vitest";
import {
  baseRate,
  regression,
  powerLaw,
  network,
} from "@/lib/simulations/foundations";
import { learningPath, glossary } from "@/data/learning";
import { effects } from "@/lib/catalog";
describe("foundation models", () => {
  it("computes Bayes probability with the correct denominator", () => {
    expect(baseRate(0.01, 0.9, 0.05, 42).expected).toBeCloseTo(
      0.009 / 0.0585,
      10,
    );
    expect(baseRate(0.5, 0.9, 0.05, 42).expected).toBeGreaterThan(
      baseRate(0.01, 0.9, 0.05, 42).expected!,
    );
    expect(baseRate(0, 0.9, 0, 42).expected).toBeNull();
    expect(baseRate(0, 0.9, 0, 42).observed).toBeNull();
    const perfect = baseRate(0.5, 1, 0, 42);
    expect(perfect.falseFlags).toBe(0);
    expect(perfect.trueFlags).toBe(
      perfect.population.filter((p) => p.target).length,
    );
  });
  it("reproduces samples and rejects invalid inputs", () => {
    expect(baseRate(0.1, 0.9, 0.05, 42)).toEqual(baseRate(0.1, 0.9, 0.05, 42));
    expect(regression(15, 10, 42)).toEqual(regression(15, 10, 42));
    expect(powerLaw(1.2, 50, 42)).toEqual(powerLaw(1.2, 50, 42));
    expect(network(12, 0.3, 42)).toEqual(network(12, 0.3, 42));
    expect(() => baseRate(2, 0.9, 0, 42)).toThrow();
    expect(() => regression(-1, 10, 42)).toThrow();
    expect(() => powerLaw(1, 0, 42)).toThrow();
    expect(() => network(31, 0.5, 42)).toThrow();
  });
  it("preserves every ability and both scores without measurement noise", () => {
    const r = regression(0, 10, 42);
    expect(r.selected).toHaveLength(20);
    expect(
      r.people.every((p) => p.first === p.second && p.second === p.ability),
    ).toBe(true);
    expect(r.first).toBe(r.second);
    expect(r.correlation).toBe(1);
  });
  it("regresses selected group averages across repeated samples, without changing ability", () => {
    let first = 0,
      second = 0,
      ability = 0;
    for (let seed = 0; seed < 100; seed++) {
      const r = regression(20, 10, seed);
      first += r.first;
      second += r.second;
      ability += r.ability;
    }
    expect(first - second).toBeGreaterThan(2000);
    expect(Math.abs(second - ability) / 100).toBeLessThan(2);
  });
  it("conserves visits, normalizes shares, and increases concentration", () => {
    for (const exponent of [0, 1, 2])
      for (const n of [10, 50, 100]) {
        const r = powerLaw(exponent, n, 42);
        expect(r.draws.reduce((a, b) => a + b, 0)).toBe(1000);
        expect(r.shares.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 12);
        expect(r.draws.every((x) => Number.isInteger(x) && x >= 0)).toBe(true);
      }
    expect(powerLaw(0, 50, 42).expectedTop).toBeCloseTo(0.1);
    expect(powerLaw(2, 50, 42).expectedTop).toBeGreaterThan(
      powerLaw(1, 50, 42).expectedTop,
    );
  });
  it("respects graph boundaries and the handshake identity", () => {
    expect(network(30, 0, 42).isolated).toBe(30);
    const all = network(30, 1, 42);
    expect(all.edges).toHaveLength(435);
    expect(all.degree.every((d) => d === 29)).toBe(true);
    const r = network(20, 0.3, 42);
    expect(r.degree.reduce((a, b) => a + b, 0)).toBe(r.edges.length * 2);
    expect(new Set(r.edges.map(([a, b]) => a + "-" + b)).size).toBe(
      r.edges.length,
    );
    expect(r.edges.every(([a, b]) => a < b && a >= 0 && b < 20)).toBe(true);
  });
  it("links every learning step to a live experiment and all glossary terms to real pages", () => {
    expect(new Set(learningPath.map((s) => s.slug)).size).toBe(6);
    expect(
      learningPath.every((s) =>
        effects.some((e) => e.slug === s.slug && e.status === "live"),
      ),
    ).toBe(true);
    expect(glossary.every((t) => effects.some((e) => e.slug === t.slug))).toBe(
      true,
    );
  });
});
