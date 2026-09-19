import { describe, it, expect } from "vitest";
import {
  birthdayProbability,
  model,
  montyGame,
  neighbourhood,
  payoff,
  playStrategies,
} from "@/lib/simulations/everyday";
import { seededRandom } from "@/lib/simulations/random";
import { newExperiments } from "@/data/expansion";

describe("everyday experiment models", () => {
  it("uses the informed-host rule and complementary Monty outcomes", () => {
    const random = seededRandom(123);
    let switchedWins = 0;
    for (let i = 0; i < 10000; i++) {
      const choice = i % 3;
      const g = montyGame(random, choice);
      expect(g.opened).not.toBe(choice);
      expect(g.opened).not.toBe(g.prize);
      expect(g.switched).not.toBe(choice);
      expect(g.switched).not.toBe(g.opened);
      switchedWins += Number(g.switched === g.prize);
    }
    expect(switchedWins / 10000).toBeCloseTo(2 / 3, 1);
  });
  it("calculates birthday collisions at known boundaries", () => {
    expect(birthdayProbability(1)).toBe(0);
    expect(birthdayProbability(2)).toBeCloseTo(1 / 365, 12);
    expect(birthdayProbability(23)).toBeCloseTo(0.5072972343, 9);
    expect(birthdayProbability(366)).toBe(1);
  });
  it("has no coin uncertainty at zero and one probability", () => {
    for (const chance of [0, 100]) {
      const r = model("law-of-large-numbers", { chance, trials: 1000 });
      expect(r.series[0].points.every((p) => p.y === chance)).toBe(true);
    }
  });
  it("preserves the sunk-cost decision difference", () => {
    const a = model("sunk-cost-fallacy", {
      sunk: 0,
      cost: 40,
      reward: 100,
      success: 50,
    });
    const b = model("sunk-cost-fallacy", {
      sunk: 100,
      cost: 40,
      reward: 100,
      success: 50,
    });
    expect(a.stats[2][1]).toBe("10");
    expect(b.stats[2][1]).toBe(a.stats[2][1]);
  });
  it("removes anchoring at full adjustment and reverses a present-biased preference", () => {
    const a = model("anchoring-bias", { anchor: 200, adjust: 100 });
    expect(a.stats[1][1]).toBe("80");
    const now = model("present-bias", {
      later: 80,
      delay: 7,
      beta: 60,
      offset: 0,
    });
    const future = model("present-bias", {
      later: 80,
      delay: 7,
      beta: 60,
      offset: 7,
    });
    expect(now.stats[2][1]).toBe("Earlier");
    expect(future.stats[2][1]).toBe("Later");
  });
  it("conserves groups and vacancies, and zero preference prevents relocation", () => {
    const a = neighbourhood(41, 0, 0),
      b = neighbourhood(41, 0, 30),
      c = neighbourhood(41, 0.5, 20);
    expect(a.grid).toEqual(b.grid);
    expect(b.moved).toBe(0);
    for (const group of [0, 1, 2])
      expect(c.grid.filter((v) => v === group)).toHaveLength(
        a.grid.filter((v) => v === group).length,
      );
  });
  it("keeps identical logistic paths identical and stable differences small", () => {
    const same = model("butterfly-effect", {
      rate: 3.9,
      epsilon: 0,
      steps: 100,
    });
    expect(same.series[0].points).toEqual(same.series[1].points);
    const stable = model("butterfly-effect", {
      rate: 2.8,
      epsilon: 1,
      steps: 100,
    });
    expect(Number(stable.stats[1][1])).toBeLessThan(0.000001);
  });
  it("keeps a compliant fishery stocked and accounts for catch", () => {
    const sustainable = model("tragedy-of-the-commons", {
      harvest: 40,
      growth: 40,
      rule: 100,
    });
    expect(
      sustainable.series[0].points.every((p) => Math.abs(p.y - 80) < 1e-8),
    ).toBe(true);
    expect(sustainable.stats[1][1]).toBe("256");
    const open = model("tragedy-of-the-commons", {
      harvest: 40,
      growth: 40,
      rule: 0,
    });
    expect(open.series[0].points.at(-1)!.y).toBe(0);
  });
  it("obeys the dilemma payoffs and one-round retaliation", () => {
    expect(payoff(true, false)).toEqual([0, 5]);
    expect(payoff(false, true)).toEqual([5, 0]);
    const mutual = playStrategies("tit-for-tat", "tit-for-tat", 50, 0, 1);
    expect(mutual.scoreA).toBe(150);
    expect(mutual.cooperation).toBe(1);
    const betrayal = playStrategies("defect", "tit-for-tat", 50, 0, 1);
    expect(betrayal.scoreA).toBe(54);
    expect(betrayal.scoreB).toBe(49);
  });
  it("all numeric experiments remain finite at every control boundary and reproduce a seed", () => {
    for (const e of newExperiments.filter(
      (e) => !["confirmation-bias", "prisoners-dilemma"].includes(e.id),
    )) {
      const initial = Object.fromEntries(
        e.controls.map((c) => [c.key, c.value]),
      );
      expect(model(e.id, initial, 17)).toEqual(model(e.id, initial, 17));
      for (const c of e.controls)
        for (const value of [c.min, c.max]) {
          const result = model(e.id, { ...initial, [c.key]: value });
          for (const s of result.series)
            for (const p of s.points) {
              expect(Number.isFinite(p.x)).toBe(true);
              expect(Number.isFinite(p.y)).toBe(true);
            }
          expect(JSON.stringify(result)).not.toMatch(/NaN|Infinity/);
        }
    }
  });
});
