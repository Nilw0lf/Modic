import { describe, expect, it } from "vitest";
import {
  attentionCards,
  bestQuantity,
  blottoAllocation,
  blottoScore,
  blockingPairs,
  changeScene,
  contagionStep,
  deployedDemand,
  exposureSequence,
  fairnessCounts,
  initialMatching,
  laplaceNoise,
  matchingPreferences,
  pricePayoffs,
  propose,
  quantityPayoffs,
  routingCost,
} from "@/lib/simulations/frontier";
import { frontierEntries, frontierThinkers } from "@/data/frontier-expansion";

describe("frontier experiment models", () => {
  it("terminates deferred acceptance with distinct matches and no blocking pair across preference profiles", () => {
    for (let seed = 1; seed <= 100; seed++) {
      const prefs = matchingPreferences(seed);
      let state = initialMatching();
      while (state.matches.includes(-1)) {
        const free = state.next.findIndex(
          (next, a) => next < 3 && !state.matches.includes(a),
        );
        expect(free).toBeGreaterThanOrEqual(0);
        state = propose(state, prefs, free);
        expect(state.log.length).toBeLessThanOrEqual(9);
      }
      expect(new Set(state.matches).size).toBe(3);
      expect(blockingPairs(state.matches, prefs)).toEqual([]);
      expect(propose(state, prefs, 0)).toBe(state);
    }
  });
  it("separates best response, leader commitment, and price undercutting", () => {
    expect(bestQuantity(20)).toBe(30);
    expect(quantityPayoffs(30, 20)).toEqual({
      price: 50,
      own: 900,
      rival: 600,
    });
    expect(quantityPayoffs(40, bestQuantity(40))).toEqual({
      price: 40,
      own: 800,
      rival: 400,
    });
    for (const output of [39, 41])
      expect(quantityPayoffs(output, bestQuantity(output)).own).toBeLessThan(
        800,
      );
    expect(bestQuantity(90)).toBe(0);
    expect(pricePayoffs(50, 50).profit).toBe(750);
    expect(pricePayoffs(49, 50)).toEqual({
      units: 51,
      demand: 51,
      profit: 1479,
      rivalUnits: 0,
    });
    expect(pricePayoffs(51, 50).units).toBe(0);
    expect(pricePayoffs(10, 50).profit).toBe(-900);
  });
  it("conserves Blotto's token budget and field points", () => {
    for (let seed = 1; seed < 100; seed++) {
      const rival = blottoAllocation(seed);
      expect(rival.reduce((a, b) => a + b, 0)).toBe(10);
      expect(rival.every((n) => Number.isInteger(n) && n >= 0)).toBe(true);
      const score = blottoScore([3, 3, 4], rival);
      expect(score.own + score.rival).toBe(3);
    }
    expect(blottoScore([3, 3, 4], [3, 3, 4]).own).toBe(1.5);
  });
  it("distinguishes equilibrium from the minimum total delay", () => {
    expect(routingCost(60)).toBe(6000);
    expect(routingCost(30)).toBe(5100);
    expect(routingCost(29)).toBeGreaterThan(routingCost(30));
    expect(routingCost(31)).toBeGreaterThan(routingCost(30));
  });
  it("requires reinforcement and updates contagion synchronously", () => {
    expect(contagionStep([0], 2)).toEqual([0]);
    expect(contagionStep([0], 1)).toEqual([0, 1, 2, 18, 19]);
    let active = [0, 1];
    expect(contagionStep(active, 2)).toHaveLength(4);
    for (let step = 0; step < 20; step++) active = contagionStep(active, 2);
    expect(active).toHaveLength(20);
  });
  it("models converging and oscillating deployment feedback without leaving the bounds", () => {
    expect(deployedDemand(20, 0.5)).toBe(30);
    expect(deployedDemand(30, 0.5)).toBe(35);
    expect(deployedDemand(20, -1.2)).toBe(0);
    expect(deployedDemand(0, -1.2)).toBe(20);
    expect(deployedDemand(100, 1.5)).toBe(100);
    expect(deployedDemand(75, 0)).toBe(20);
  });
  it("conserves confusion-matrix cases and leaves undefined precision undefined", () => {
    for (const positives of [20, 60])
      for (const threshold of [0, 35, 50, 65, 100]) {
        const result = fairnessCounts(positives, threshold);
        expect(result.tp + result.fn).toBe(positives);
        expect(result.fp + result.tn).toBe(100 - positives);
        expect(result.selected).toBe(result.tp + result.fp);
      }
    expect(fairnessCounts(20, 100).ppv).toBeNull();
    expect(fairnessCounts(60, 0).ppv).toBe(0.6);
    expect(fairnessCounts(20, 0).ppv).toBe(0.2);
    expect(fairnessCounts(20, 65).selected).toBeLessThan(
      fairnessCounts(20, 50).selected,
    );
  });
  it("uses sensitivity-one Laplace noise with the correct epsilon scale", () => {
    expect(laplaceNoise(0.5, () => 0.5)).toBeCloseTo(0);
    expect(laplaceNoise(1, () => 0.75)).toBeCloseTo(Math.log(2));
    expect(laplaceNoise(1, () => 0.25)).toBeCloseTo(-Math.log(2));
    expect(laplaceNoise(0.5, () => 0.75)).toBeCloseTo(2 * Math.log(2));
    expect(() => laplaceNoise(0, () => 0.5)).toThrow();
  });
  it("provides reproducible attention tasks and unequal exposure rather than invented ratings", () => {
    const cards = attentionCards(137);
    expect(cards).toHaveLength(8);
    expect(cards.filter((c) => c.star)).toHaveLength(1);
    expect(cards[3].star).toBe(true);
    expect(cards.every((c) => c.blue >= 1 && c.blue <= 4)).toBe(true);
    expect(attentionCards(137)).toEqual(cards);
    const scene = changeScene(137);
    expect(scene.shapes).toHaveLength(12);
    expect(scene.changed).toBeGreaterThanOrEqual(0);
    expect(scene.changed).toBeLessThan(12);
    const sequence = exposureSequence(137);
    expect(sequence).toHaveLength(12);
    expect(
      [
        sequence.filter((n) => n === 0).length,
        sequence.filter((n) => n === 1).length,
      ].sort(),
    ).toEqual([3, 9]);
  });
  it("adds exactly fifteen distinct concepts and twenty-four distinct thinker profiles", () => {
    expect(frontierEntries).toHaveLength(15);
    expect(new Set(frontierEntries.map((e) => e.id)).size).toBe(15);
    expect(frontierThinkers).toHaveLength(24);
    expect(new Set(frontierThinkers.map((t) => t.slug)).size).toBe(24);
  });
});
