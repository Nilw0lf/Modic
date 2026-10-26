import { describe, it, expect } from "vitest";
import { horizonEntries, horizonThinkers } from "@/data/horizons-expansion";
import { getEffect, effects, validateCatalog } from "@/lib/catalog";
import {
  shapley,
  marginal,
  orders,
  banzhaf,
  vcg,
  moralHazard,
  pigou,
  pagerank,
  growNetwork,
  majority,
  hamming,
  decodeHamming,
  parrondoDrift,
  parrondoProbability,
  patchOptimum,
  patchReward,
  regretScores,
  realOptions,
  annealAccept,
  pour,
  rng,
} from "@/lib/simulations/horizons";
describe("thirty horizons experiments", () => {
  it("publishes distinct entries with direct Zajonc research connections", () => {
    expect(validateCatalog()).toBe(true);
    expect(horizonEntries).toHaveLength(30);
    expect(horizonThinkers).toHaveLength(25);
    expect(
      horizonEntries.filter((e) => e.thinker === "zajonc").map((e) => e.id),
    ).toEqual([
      "social-facilitation",
      "affective-priming",
      "liking-and-recognition",
    ]);
    for (const e of horizonEntries) {
      expect(getEffect(e.id)?.status).toBe("live");
      expect(
        e.related?.every(
          (id) => effects.find((effect) => effect.id === id)?.status === "live",
        ),
      ).toBe(true);
    }
  });
  it("conserves total coalition value in every order and in the Shapley allocation", () => {
    for (const o of orders)
      expect(marginal(o).reduce((a, b) => a + b, 0)).toBe(90);
    shapley().forEach((v, i) => expect(v).toBeCloseTo([30, 40, 20][i]));
  });
  it("distinguishes voting weight from critical power and changes with quota", () => {
    expect(banzhaf([4, 3, 2], 6)).toEqual({
      swings: [3, 1, 1],
      power: [0.6, 0.2, 0.2],
    });
    expect(banzhaf([4, 3, 2], 9).power).toEqual([1 / 3, 1 / 3, 1 / 3]);
  });
  it("shows VCG truthfulness incentives without inventing budget balance", () => {
    expect(vcg([45, 35, 10], 60)).toEqual({
      build: true,
      payments: [15, 5, 0],
    });
    expect(vcg([5, 35, 10], 60).build).toBe(false);
    expect(vcg([15, 35, 10], 60).payments[0]).toBe(15);
  });
  it("changes prevention incentives while distinguishing private cost from social cost", () => {
    expect(moralHazard(0)).toMatchObject({ maintain: true, system: 5 });
    expect(moralHazard(0.75)).toMatchObject({
      careful: 3.5,
      careless: 2,
      maintain: false,
      system: 8,
    });
  });
  it("maximises the stated welfare at a tax equal to marginal external cost", () => {
    const optimum = pigou(20);
    expect(optimum).toMatchObject({ q: 60, welfare: 1800 });
    expect(pigou(0).welfare).toBeLessThan(optimum.welfare);
    expect(pigou(40).welfare).toBeLessThan(optimum.welfare);
  });
  it("conserves PageRank with dangling nodes and gives uniform ranks at zero damping", () => {
    const graph = [[1], [], [0], [2]];
    expect(pagerank(graph, 0.85).reduce((a, b) => a + b, 0)).toBeCloseTo(1, 12);
    expect(pagerank(graph, 0)).toEqual([0.25, 0.25, 0.25, 0.25]);
  });
  it("grows a connected tree with a consistent seeded prefix", () => {
    const a = growNetwork(12, true, 41),
      b = growNetwork(20, true, 41);
    expect(a.edges).toEqual(b.edges.slice(0, 11));
    expect(b.edges).toHaveLength(19);
    expect(b.degrees.reduce((a, b) => a + b, 0)).toBe(38);
  });
  it("gives the independent jury benchmark without assuming below-chance voters improve", () => {
    expect(majority(1, 0.6)).toBeCloseTo(0.6);
    expect(majority(9, 0.6)).toBeGreaterThan(0.6);
    expect(majority(9, 0.4)).toBeLessThan(0.4);
    expect(majority(21, 0.5)).toBeCloseTo(0.5);
  });
  it("repairs every single-bit corruption for every four-bit message", () => {
    for (let value = 0; value < 16; value++) {
      const data = Array.from({ length: 4 }, (_, i) => (value >> i) & 1),
        encoded = hamming(data);
      expect(decodeHamming(encoded).syndrome).toBe(0);
      for (let i = 0; i < 7; i++)
        expect(
          decodeHamming(encoded.map((b, j) => (i === j ? b ^ 1 : b))).data,
        ).toEqual(data);
    }
  });
  it("exposes a two-error miscorrection instead of claiming double-error repair", () => {
    const data = [1, 0, 1, 1],
      received = hamming(data).map((b, i) => (i < 2 ? b ^ 1 : b));
    expect(decodeHamming(received).syndrome).toBe(3);
    expect(decodeHamming(received).data).not.toEqual(data);
  });
  it("has negative standalone drift but positive mixed drift under the exact Parrondo rules", () => {
    expect(parrondoProbability(-3, "B")).toBe(0.095);
    expect(parrondoProbability(-2, "B")).toBe(0.745);
    expect(parrondoDrift(1)).toBeCloseTo(-0.01);
    expect(parrondoDrift(0)).toBeLessThan(0);
    expect(parrondoDrift(0.5)).toBeGreaterThan(0);
  });
  it("includes travel in patch optimisation and stays longer when travel rises", () => {
    expect(patchOptimum(10)).toBeGreaterThan(patchOptimum(1));
    expect(patchReward(2) - patchReward(1)).toBeLessThan(patchReward(1));
  });
  it("distinguishes minimax regret from the maximin payoff choice", () => {
    expect(regretScores()).toEqual([6, 4, 3]);
  });
  it("charges explicitly for preserving the real option", () => {
    expect(realOptions(0.5, 5).now).toBeCloseTo(4.54545, 4);
    expect(realOptions(0.5, 5).wait).toBeCloseTo(17.72727, 4);
    expect(realOptions(0.5, 20).wait).toBeLessThan(realOptions(0.5, 20).now);
  });
  it("rejects uphill proposals at zero temperature while accepting improvements", () => {
    expect(annealAccept(2, 0, 0.01)).toBe(false);
    expect(annealAccept(-1, 0, 0.99)).toBe(true);
    expect(annealAccept(2, 10, 0.1)).toBe(true);
  });
  it("conserves jug contents during pouring and prevents overfilling", () => {
    expect(pour([14, 0, 0], [14, 32, 4], 0, 2)).toEqual([10, 0, 4]);
    expect(pour([10, 0, 4], [14, 32, 4], 0, 2)).toEqual([10, 0, 4]);
  });
  it("is reproducible but decorrelates adjacent round seeds", () => {
    expect(rng(941)()).toBe(rng(941)());
    expect(rng(941)()).not.toBe(rng(942)());
  });
});
