import { describe, it, expect } from "vitest";
import {
  matrixGame,
  pureEquilibria,
  strategyModel as model,
} from "@/lib/simulations/strategy";
describe("strategy and uncertainty models", () => {
  it("finds best-response equilibria and the zero-sum mixed boundary", () => {
    expect(pureEquilibria(matrixGame("stag-hunt", { reward: 8 })!)).toEqual([
      [0, 0],
      [1, 1],
    ]);
    expect(pureEquilibria(matrixGame("chicken-game", { damage: 20 })!)).toEqual(
      [
        [0, 1],
        [1, 0],
      ],
    );
    expect(
      pureEquilibria(matrixGame("matching-pennies", { stake: 1 })!),
    ).toEqual([]);
    const r = model("matching-pennies", { stake: 10, opponent: 50 });
    expect(r.stats.map((x) => x[1])).toEqual(["0", "0", "Either (tie)"]);
  });
  it("gives the same mean with zero shocks and gains/losses with spread", () => {
    expect(
      model("antifragility", { spread: 0, curvature: 2 }).stats.map(
        (x) => x[1],
      ),
    ).toEqual(["100", "100", "100"]);
    expect(
      model("antifragility", { spread: 20, curvature: 2 }).stats.map(
        (x) => x[1],
      ),
    ).toEqual(["108", "92", "100"]);
  });
  it("bounds barbell downside and option loss", () => {
    expect(
      model("barbell-strategy", { allocation: 10, return: -100 }).stats[0][1],
    ).toBe("90");
    const r = model("optionality", { value: 0, cost: 10, exercise: 80 });
    expect(r.stats.map((x) => x[1])).toEqual(["-10", "-80", "Walk away"]);
    expect(r.series[0].points.every((p) => p.y >= -10)).toBe(true);
  });
  it("liability transfers losses without changing total risky value", () => {
    for (const liability of [0, 25, 100]) {
      const r = model("skin-in-the-game", {
        liability,
        failure: 20,
        loss: 100,
      });
      const a = r.series[0].points[liability].y,
        b = r.series[1].points[liability].y;
      expect(a + b).toBeCloseTo(12);
      expect(r.stats[0][1]).toBe(
        liability < 30 ? "Risky project" : "Safe project",
      );
    }
  });
  it("does not leak the turkey break into observed history", () => {
    const before = model("turkey-problem", { day: 99, breakday: 100 }),
      after = model("turkey-problem", { day: 100, breakday: 100 });
    expect(before.series[0].points.every((p) => p.y === 1)).toBe(true);
    expect(after.series[0].points.at(-1)?.y).toBe(-100);
    expect(after.stats[2][1]).toBe("-1");
  });
  it("accounts for all public-good units", () => {
    const r = model("public-goods", {
      contribution: 20,
      others: 10,
      multiplier: 2,
    });
    expect(r.stats.map((x) => x[1])).toEqual(["25", "35", "130"]);
  });
  it("honors acceptance and disagreement boundaries", () => {
    expect(
      model("ultimatum-game", { offer: 24, threshold: 25 }).stats.map(
        (x) => x[1],
      ),
    ).toEqual(["Rejected", "0", "0"]);
    expect(
      model("ultimatum-game", { offer: 25, threshold: 25 }).stats.map(
        (x) => x[1],
      ),
    ).toEqual(["Accepted", "75", "25"]);
    expect(
      model("nash-bargaining", { fallbackA: 20, fallbackB: 10 }).stats.map(
        (x) => x[1],
      ),
    ).toEqual(["Agreement", "55", "45"]);
    expect(
      model("nash-bargaining", { fallbackA: 70, fallbackB: 60 }).stats.map(
        (x) => x[1],
      ),
    ).toEqual(["No feasible deal", "70", "60"]);
  });
  it("truthful second-price bids weakly dominate every alternative against fixed rivals", () => {
    for (const value of [0, 20, 60, 100])
      for (const rival of [0, 30, 60, 100]) {
        const r = model("vickrey-auction", { bid: value, value, rival }),
          truth = r.series[0].points[value].y;
        expect(r.series[0].points.every((p) => p.y <= truth)).toBe(true);
      }
  });
  it("has no winner curse with perfect estimates and exposes optimistic selection", () => {
    expect(
      model("winners-curse", { bidders: 10, noise: 0, discount: 0 }).stats.map(
        (x) => x[1],
      ),
    ).toEqual(["100", "0", "0%"]);
    expect(
      Number(
        model("winners-curse", { bidders: 30, noise: 30, discount: 0 })
          .stats[1][1],
      ),
    ).toBeLessThan(-25);
  });
  it("keeps all sellers when buyer valuation supports the whole pool", () => {
    expect(
      model("market-for-lemons", { premium: 2, rounds: 15 }).stats[0][1],
    ).toBe("100 / 100");
    expect(
      model("market-for-lemons", { premium: 1.5, rounds: 15 }).stats[0][1],
    ).toBe("3 / 100");
  });
});
