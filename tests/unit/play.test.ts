import { describe, it, expect } from "vitest";
import { model } from "@/lib/simulations/everyday";
import {
  beautyBots,
  cascade,
  hotellingShare,
  lotteryPayoff,
  simpson,
  thresholdOutcomes,
} from "@/lib/simulations/play";
import { playEntries } from "@/data/play-expansion";

describe("ten playable teaching models", () => {
  it("reverses the pooled winner while A wins in both groups", () => {
    expect(simpson({ easyA: 10, easyB: 90 })).toEqual({
      a: 36,
      b: 74,
      winner: "B",
    });
    expect(simpson({ easyA: 50, easyB: 50 })).toEqual({
      a: 60,
      b: 50,
      winner: "A",
    });
  });
  it("preserves the Allais lottery probabilities and expected values", () => {
    const base = 100;
    const averages = (choice: "A" | "B" | "C" | "D") =>
      Array.from({ length: 100 }, (_, i) =>
        lotteryPayoff(choice, i, base),
      ).reduce((a, b) => a + b, 0) / 100;
    expect([
      averages("A"),
      averages("B"),
      averages("C"),
      averages("D"),
    ]).toEqual([100, 139, 11, 50]);
  });
  it("updates cascade beliefs only from informative actions", () => {
    const run = cascade(41, 70, 16);
    for (let i = 1; i < run.steps.length; i++)
      if (run.steps[i].cascade)
        expect(run.steps[i].belief).toBeCloseTo(run.steps[i - 1].belief, 10);
    expect(run.steps.every((t) => t.belief >= 0 && t.belief <= 1)).toBe(true);
    expect(cascade(41, 70, 16)).toEqual(run);
  });
  it("enumerates every support pattern and a pivotal threshold", () => {
    const outcomes = thresholdOutcomes({ pledge: 10, target: 30, chance: 50 });
    expect(outcomes.reduce((a, b) => a + b.probability, 0)).toBe(1);
    expect(outcomes.filter((o) => o.funded).map((o) => o.otherHelpers)).toEqual(
      [2, 3],
    );
    expect(
      model("threshold-public-good", { pledge: 10, target: 30, chance: 50 })
        .stats[0][1],
    ).toBe("10");
  });
  it("accounts for trust transfers and the growing pot", () => {
    const trust = model("trust-game", { send: 5, return: 50 });
    expect(trust.stats.map((x) => x[1])).toEqual(["12.5", "7.5", "20"]);
    const centipede = model("centipede-game", { passes: 65, turns: 6 });
    expect(centipede.series[0].points.map((x) => x.y)).toEqual([
      4, 8, 16, 32, 64, 128, 256,
    ]);
  });
  it("keeps shop shares complementary including co-location", () => {
    for (const you of [0, 25, 50, 75, 100])
      for (const rival of [0, 25, 50, 75, 100]) {
        const share = hotellingShare(you, rival);
        expect(share).toBeGreaterThanOrEqual(0);
        expect(share).toBeLessThanOrEqual(100);
        expect(share + hotellingShare(rival, you)).toBe(100);
      }
    expect(hotellingShare(50, 50)).toBe(50);
  });
  it("computes beauty-contest targets using the same seeded opponents", () => {
    expect(beautyBots(41, 2)).toEqual(beautyBots(41, 2));
    const r = model("beauty-contest", { guess: 33, depth: 2 }, 41);
    const target =
      ((2 / 3) * (beautyBots(41, 2).reduce((a, b) => a + b, 0) + 33)) / 10;
    expect(Number(r.stats[0][1])).toBeCloseTo(target, 0);
  });
  it("keeps all new model outputs finite and each seed reproducible", () => {
    expect(playEntries).toHaveLength(10);
    for (const entry of playEntries) {
      const settings = Object.fromEntries(
        entry.controls.map((c) => [c.key, c.value]),
      );
      expect(model(entry.id, settings, 17)).toEqual(
        model(entry.id, settings, 17),
      );
      for (const control of entry.controls)
        for (const value of [control.min, control.max]) {
          const result = model(
            entry.id,
            { ...settings, [control.key]: value },
            17,
          );
          expect(result.stats.length).toBeGreaterThan(0);
          for (const series of result.series)
            for (const point of series.points) {
              expect(Number.isFinite(point.x)).toBe(true);
              expect(Number.isFinite(point.y)).toBe(true);
            }
          expect(JSON.stringify(result)).not.toMatch(/NaN|Infinity/);
        }
    }
  });
});
