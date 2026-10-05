import { describe, it, expect } from "vitest";
import {
  discoveryEntries,
  discoveryThinkers,
} from "@/data/discovery-expansion";
import {
  discoveryModel,
  hamilton,
  gini,
  diffuse,
  percolate,
  ringNetwork,
  bayesUpdate,
  relay,
  nimBot,
  nimSum,
  travelerPayoff,
  dieChance,
  penneyCounter,
  penneyRace,
} from "@/lib/simulations/discovery";
import { getArticle } from "@/lib/content";
describe("thirty new discovery experiments", () => {
  it("covers all thirty live lessons with specific guides and valid models at control boundaries", () => {
    expect(discoveryEntries).toHaveLength(30);
    expect(discoveryThinkers).toHaveLength(20);
    expect(discoveryEntries.filter((e) => e.format === "game")).toHaveLength(
      16,
    );
    for (const entry of discoveryEntries) {
      const defaults = Object.fromEntries(
        entry.controls.map((c) => [c.key, c.value]),
      );
      expect(
        getArticle(entry.id).readerGuide.definition.length,
      ).toBeGreaterThan(50);
      for (const s of [
        defaults,
        ...entry.controls.flatMap((c) =>
          [c.min, c.max].map((v) => ({ ...defaults, [c.key]: v })),
        ),
      ]) {
        const out = discoveryModel(entry.id, s);
        if (out) {
          expect(JSON.stringify(out)).not.toMatch(/NaN|Infinity/);
          for (const curve of out.series ?? [])
            for (const p of curve.points)
              expect(Number.isFinite(p.y)).toBe(true);
        } else
          expect(entry.format === "game" || entry.id === "hysteresis").toBe(
            true,
          );
      }
    }
  });
  it("verifies the exact seat-loss example and conserves seats", () => {
    expect(hamilton([5, 3, 1], 4).allocation).toEqual([2, 1, 1]);
    expect(hamilton([5, 3, 1], 5).allocation).toEqual([3, 2, 0]);
    for (let seats = 1; seats < 100; seats++)
      expect(
        hamilton([5, 3, 1], seats).allocation.reduce((a, b) => a + b, 0),
      ).toBe(seats);
  });
  it("conserves dye and reduces its concentration without negative quantities", () => {
    for (const steps of [0, 1, 10, 60]) {
      const v = diffuse(steps);
      expect(v.reduce((a, b) => a + b, 0)).toBeCloseTo(100, 10);
      expect(v.every((x) => x >= 0)).toBe(true);
    }
    expect(diffuse(1).slice(9, 12)).toEqual([20, 60, 20]);
    expect(diffuse(60)[10]).toBeLessThan(diffuse(10)[10]);
  });
  it("uses opponent-dependent dice probabilities and legal optimal Nim replies", () => {
    expect(dieChance(0, 1)).toBeCloseTo(5 / 9);
    expect(dieChance(1, 2)).toBeCloseTo(5 / 9);
    expect(dieChance(2, 0)).toBeCloseTo(5 / 9);
    for (let a = 0; a <= 6; a++)
      for (let b = 0; b <= 6; b++)
        for (let c = 0; c <= 6; c++) {
          const piles = [a, b, c];
          if (piles.every((v) => v === 0)) continue;
          const next = nimBot(piles);
          expect(next.filter((v, i) => v !== piles[i])).toHaveLength(1);
          expect(next.every((v, i) => v >= 0 && v <= piles[i])).toBe(true);
          if (nimSum(piles) !== 0) expect(nimSum(next)).toBe(0);
        }
  });
  it("evaluates claims and pattern races with the actual stated rules", () => {
    expect(travelerPayoff(18, 18, 2)).toEqual([18, 18]);
    expect(travelerPayoff(17, 18, 2)).toEqual([19, 15]);
    expect(travelerPayoff(19, 18, 2)).toEqual([16, 20]);
    for (const pattern of [
      "HHH",
      "HHT",
      "HTH",
      "HTT",
      "THH",
      "THT",
      "TTH",
      "TTT",
    ]) {
      expect(penneyCounter(pattern)).not.toBe(pattern);
      for (let seed = 1; seed < 30; seed++) {
        const race = penneyRace(pattern, seed);
        if (race.winner !== "unfinished")
          expect(
            race.flips.endsWith(race.winner === "you" ? pattern : race.bot),
          ).toBe(true);
      }
    }
  });
  it("preserves crossing paths as a fixed board opens and shortens routes as links are added", () => {
    expect(percolate(0, 73).spans).toBe(false);
    expect(percolate(1, 73).wet.size).toBe(100);
    let crossed = false;
    for (let p = 0; p <= 100; p++) {
      const next = percolate(p / 100, 73).spans;
      if (crossed) expect(next).toBe(true);
      crossed = next;
    }
    expect(ringNetwork(0, 73).across).toBe(5);
    let previous = Infinity;
    for (let n = 0; n <= 12; n++) {
      const net = ringNetwork(n, 73);
      expect(net.mean).toBeLessThanOrEqual(previous);
      expect(net.edges).toHaveLength(40 + n);
      previous = net.mean;
    }
  });
  it("distinguishes Bayesian evidence, finite-population inequality and hysteresis history", () => {
    expect(bayesUpdate(0.5, true)).toBeCloseTo(0.7);
    expect(bayesUpdate(bayesUpdate(0.5, true), false)).toBeCloseTo(0.5);
    expect(gini([20, 20, 20, 20, 20])).toBe(0);
    expect(gini([0, 0, 0, 0, 100])).toBe(0.8);
    expect(gini([10, 10, 10, 10, 60])).toBe(0.4);
    expect(relay(relay(false, 70), 50)).toBe(true);
    expect(relay(relay(true, 30), 50)).toBe(false);
  });
  it("keeps the coin lottery expectation, payoff crossing and binomial total exact", () => {
    for (let cap = 2; cap <= 15; cap++)
      expect(
        discoveryModel("st-petersburg-paradox", { cap })!.stats[0][1],
      ).toBe(String(cap + 1));
    const hawk = discoveryModel("hawk-dove", { cost: 20, hawks: 50 })!;
    expect(hawk.stats.slice(0, 2).map((v) => v[1])).toEqual(["2.5", "2.5"]);
    const board = discoveryModel("galton-board", { rows: 8 })!;
    expect(board.bars!.reduce((a, b) => a + b.value, 0)).toBe(200);
    expect(board.series![1].points.reduce((a, b) => a + b.y, 0)).toBeCloseTo(
      200,
    );
  });
});
