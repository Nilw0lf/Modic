import { describe, it, expect } from "vitest";
import {
  defaultGamblerInput as defaults,
  gamblerRuinInputSchema,
  simulateOneLife,
  simulateManyLives,
  wealthAfterRound,
  expectedLogGrowth,
  expectedRoundReturn,
  ruinObservations,
  manyLivesSteps,
} from "@/lib/simulations/gamblers-ruin";
import {
  parseRuinParams,
  serializeRuinParams,
} from "@/lib/simulations/ruin-url";
describe("proportional gambler ruin", () => {
  it("is seeded and deterministic across one and many lives", () => {
    expect(simulateOneLife(defaults, 42)).toEqual(
      simulateOneLife(defaults, 42),
    );
    expect(simulateOneLife(defaults, 43)).not.toEqual(
      simulateOneLife(defaults, 42),
    );
    const input = { ...defaults, lives: 50, rounds: 20 };
    expect(simulateManyLives(input, 42)).toEqual(simulateManyLives(input, 42));
  });
  it("implements net win profit and proportional loss", () => {
    expect(wealthAfterRound(100, 0.2, 2, true)).toBe(140);
    expect(wealthAfterRound(100, 0.2, 2, false)).toBe(80);
    expect(wealthAfterRound(100, 1, 1, false)).toBe(0);
  });
  it("absorbs at the crossing value including equality", () => {
    const result = simulateOneLife({
      ...defaults,
      wealth: 100,
      risk: 0.5,
      threshold: 25,
      win: 0,
      rounds: 5,
    });
    expect(result.path).toEqual([100, 50, 25, 25, 25, 25]);
    expect(result.ruinRound).toBe(2);
    expect(result.maximumDrawdown).toBe(0.75);
    expect(result.maximumWealth).toBe(100);
  });
  it("does not replace an overshoot with the threshold", () => {
    const result = simulateOneLife({
      ...defaults,
      wealth: 100,
      risk: 0.8,
      threshold: 30,
      win: 0,
      rounds: 2,
    });
    expect(result.finalWealth).toBeCloseTo(20);
    expect(result.path[2]).toBe(result.path[1]);
  });
  it("handles zero risk and zero/one win probabilities", () => {
    for (const win of [0, 1]) {
      const result = simulateOneLife({ ...defaults, risk: 0, win });
      expect(result.finalWealth).toBe(defaults.wealth);
      expect(result.ruinRound).toBeNull();
    }
    expect(
      simulateOneLife({ ...defaults, win: 1, rounds: 2, risk: 0.5, payoff: 1 })
        .finalWealth,
    ).toBe(22500);
    expect(simulateOneLife({ ...defaults, win: 0, risk: 1 }).ruinRound).toBe(1);
    expect(
      simulateOneLife({ ...defaults, win: 1, risk: 1, payoff: 0 }).finalWealth,
    ).toBe(10000);
  });
  it("matches aggregates to individually reproduced lives", () => {
    const input = { ...defaults, lives: 9, rounds: 12, risk: 0.4 };
    const outcomes = Array.from({ length: 9 }, (_, i) =>
      simulateOneLife(input, (42 + Math.imul(i, 0x9e3779b9)) >>> 0),
    );
    const sorted = outcomes.map((r) => r.finalWealth).sort((a, b) => a - b);
    const result = simulateManyLives(input, 42);
    expect(result.endingWealth).toEqual(sorted);
    expect(result.medianEndingWealth).toBe(sorted[4]);
    expect(result.q25).toBe(sorted[2]);
    expect(result.q75).toBe(sorted[6]);
    expect(result.meanEndingWealth).toBeCloseTo(
      sorted.reduce((a, b) => a + b, 0) / 9,
      6,
    );
    expect(result.ruinProbability).toBe(
      outcomes.filter((r) => r.ruinRound !== null).length / 9,
    );
    expect(result.fractionAboveStart).toBe(
      outcomes.filter((r) => r.finalWealth > input.wealth).length / 9,
    );
    expect(result.bands.at(-1)?.median).toBe(result.medianEndingWealth);
  });
  it("produces exact degenerate many-life outcomes", () => {
    const result = simulateManyLives({
      ...defaults,
      win: 0,
      risk: 1,
      lives: 20,
    });
    expect(result.ruinProbability).toBe(1);
    expect(result.meanEndingWealth).toBe(0);
    expect(result.medianEndingWealth).toBe(0);
    expect(result.fractionAboveStart).toBe(0);
    expect(result.meanMaximumDrawdown).toBe(1);
  });
  it("rejects invalid bounds and threshold relations", () => {
    for (const patch of [
      { wealth: 99 },
      { wealth: 1000001 },
      { risk: -0.1 },
      { risk: 1.1 },
      { win: -0.1 },
      { win: 1.1 },
      { payoff: -1 },
      { payoff: 3.1 },
      { rounds: 0 },
      { rounds: 501 },
      { rounds: 1.5 },
      { lives: 0 },
      { lives: 5001 },
      { threshold: 0 },
      { threshold: 10000 },
      { wealth: NaN },
    ])
      expect(
        gamblerRuinInputSchema.safeParse({ ...defaults, ...patch }).success,
      ).toBe(false);
  });
  it("handles the upper numerical bound without infinite results", () => {
    const result = simulateManyLives({
      ...defaults,
      wealth: 1000000,
      risk: 1,
      payoff: 3,
      win: 1,
      threshold: 1,
      rounds: 500,
      lives: 50,
    });
    expect(Number.isFinite(result.meanEndingWealth)).toBe(true);
    expect(result.meanEndingWealth).toBe(result.medianEndingWealth);
  });
  it("separates expected arithmetic and log returns", () => {
    const input = { ...defaults, risk: 0.5 };
    expect(expectedRoundReturn(input)).toBeGreaterThan(0);
    expect(expectedLogGrowth(input)).toBeLessThan(0);
    expect(expectedLogGrowth({ ...input, win: 1, risk: 1 })).toBe(Math.log(2));
    expect(expectedLogGrowth({ ...input, win: 0, risk: 1 })).toBe(-Infinity);
  });
  it("only reports observations supported by results", () => {
    const result = simulateManyLives({ ...defaults, risk: 0, lives: 10 });
    const notes = ruinObservations({ ...defaults, risk: 0 }, result).join(" ");
    expect(notes).toContain("Nothing was put at risk");
    expect(notes).toContain("No simulated life reached ruin");
    expect(notes).not.toContain("pulling the average");
  });
  it("generator batching matches synchronous outputs", () => {
    const input = { ...defaults, lives: 40, rounds: 30 };
    const steps = manyLivesSteps(input);
    let next = steps.next();
    while (!next.done) {
      expect(next.value).toBeGreaterThanOrEqual(0);
      expect(next.value).toBeLessThanOrEqual(1);
      next = steps.next();
    }
    expect(next.value).toEqual(simulateManyLives(input));
  });
});
describe("shareable parameters", () => {
  it("parses the example, fills defaults, and round-trips all inputs", () => {
    const result = parseRuinParams(
      new URLSearchParams("wealth=10000&risk=0.1&win=0.55&rounds=500"),
    );
    expect(result.input).toEqual(defaults);
    expect(result.warning).toBeNull();
    const input = { ...defaults, payoff: 2, lives: 321, threshold: 50 };
    expect(
      parseRuinParams(new URLSearchParams(serializeRuinParams(input))).input,
    ).toEqual(input);
  });
  it.each([
    "risk=1.1",
    "risk=",
    "win=hello",
    "wealth=Infinity",
    "rounds=3.5",
    "wealth=100&threshold=1000",
    "risk=0.1&risk=0.2",
  ])("rejects invalid URL %s", (query) => {
    const result = parseRuinParams(new URLSearchParams(query));
    expect(result.input).toEqual(defaults);
    expect(result.warning).not.toBeNull();
  });
  it("ignores transient seeds and unrelated parameters", () => {
    expect(
      parseRuinParams(new URLSearchParams("seed=999&mode=many")).input,
    ).toEqual(defaults);
    expect(serializeRuinParams(defaults)).not.toContain("seed");
  });
});
