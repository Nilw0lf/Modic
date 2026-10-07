import { describe, expect, it } from "vitest";
import { simpleEntries, simpleThinkers } from "@/data/simple-expansion";
import {
  simpleModel,
  correlation,
  informationValues,
  minorityChance,
  minorityRound,
  pointingDifficulty,
  portfolioSpread,
  rpsPayoff,
  tank,
} from "@/lib/simulations/simple";
import { seededRandom } from "@/lib/simulations/random";
import { getArticle } from "@/lib/content";
import { effects, getEffect } from "@/lib/catalog";
describe("twenty approachable experiments", () => {
  it("publishes twenty distinct lessons with authored guides, sources and specific connections", () => {
    expect(simpleEntries).toHaveLength(20);
    expect(simpleThinkers).toHaveLength(18);
    for (const entry of simpleEntries) {
      expect(getEffect(entry.id)?.status).toBe("live");
      expect(getArticle(entry.id).readerGuide.scenario.steps).toHaveLength(3);
      expect(entry.related?.length).toBe(2);
      expect(entry.source.url).toMatch(/^https:/);
      const defaults = Object.fromEntries(
        entry.controls.map((c) => [c.key, c.value]),
      );
      for (const settings of [
        defaults,
        ...entry.controls.flatMap((c) =>
          [c.min, c.max].map((value) => ({ ...defaults, [c.key]: value })),
        ),
      ]) {
        const result = simpleModel(entry.id, settings, 41);
        if (!result) {
          expect(entry.format).toBe("game");
          continue;
        }
        expect(result).toEqual(simpleModel(entry.id, settings, 41));
        expect(JSON.stringify(result)).not.toMatch(/NaN|Infinity|undefined/);
        for (const series of result.series ?? [])
          for (const p of series.points)
            expect(Number.isFinite(p.y)).toBe(true);
      }
    }
    expect(effects.filter((e) => e.status === "live")).toHaveLength(141);
  });
  it("creates correlation through selection without changing the population", () => {
    const all = simpleModel("berksons-paradox", { selected: 0 })!,
      shortlist = simpleModel("berksons-paradox", { selected: 1 })!;
    expect(all.dots).toHaveLength(100);
    expect(shortlist.dots).toHaveLength(51);
    expect(correlation(all.dots!)).toBeCloseTo(0, 12);
    expect(correlation(shortlist.dots!)).toBeLessThan(-0.3);
    expect(
      shortlist.dots?.every((p) =>
        all.dots!.some((a) => a.x === p.x && a.y === p.y),
      ),
    ).toBe(true);
  });
  it("weights friendships by degree rather than treating every person equally", () => {
    const result = simpleModel("friendship-paradox", { leaves: 6 })!;
    expect(result.degrees).toEqual([6, 1, 1, 1, 1, 1, 1]);
    expect(result.stats[0][1]).toBe("1.71");
    expect(result.stats[1][1]).toBe("3.5");
  });
  it("reduces independent noise but retains a common crowd bias", () => {
    const one = simpleModel("wisdom-of-crowds", { people: 1, bias: 0 })!,
      many = simpleModel("wisdom-of-crowds", { people: 100, bias: 0 })!,
      biased = simpleModel("wisdom-of-crowds", { people: 100, bias: 20 })!;
    expect(one.stats[0][1]).toBe(one.stats[1][1]);
    expect(Number(many.stats[1][1])).toBeLessThan(3);
    expect(Number(biased.stats[1][1])).toBeGreaterThan(18);
  });
  it("obeys the information benchmark and correlation boundaries", () => {
    expect(informationValues(0.4, 10)).toEqual({
      launch: 8,
      baseline: 8,
      perfect: 32,
      gross: 24,
      net: 22,
    });
    for (const p of [0, 0.1, 0.5, 0.9, 1]) {
      const v = informationValues(p, 0);
      expect(v.gross).toBeGreaterThanOrEqual(0);
    }
    expect(portfolioSpread(0.5, 0)).toBeCloseTo(Math.sqrt(50));
    expect(portfolioSpread(0.5, -1)).toBe(0);
    expect(portfolioSpread(0.5, 1)).toBe(10);
    expect(portfolioSpread(1, -1)).toBe(10);
    expect(pointingDifficulty(60, 8)).toBeGreaterThan(
      pointingDifficulty(60, 28),
    );
  });
  it("counts the human in minority attendance and preserves symmetric RPS payoffs", () => {
    expect(minorityChance(0, true)).toBe(1);
    expect(minorityChance(0, false)).toBe(0);
    expect(minorityChance(1, false)).toBe(1);
    expect(minorityChance(0.5, true)).toBeCloseTo(
      minorityChance(0.5, false),
      12,
    );
    const round = minorityRound(0.6, true, seededRandom(41));
    expect(round.a + round.b).toBe(101);
    expect(round.won).toBe(round.a < round.b);
    for (let you = 0; you < 3; you++)
      for (let bot = 0; bot < 3; bot++)
        expect(rpsPayoff(you, bot)).toBe(-rpsPayoff(bot, you) || 0);
    expect([0, 1, 2].map((bot) => rpsPayoff(1, bot))).toEqual([1, 0, -1]);
  });
  it("conserves tank contents, accounts for overflow and never drains unavailable water", () => {
    expect(tank(6, 4).levels[5]).toBe(50);
    expect(tank(0, 10).levels[20]).toBe(0);
    expect(tank(10, 0).levels[20]).toBe(100);
    expect(tank(10, 0).overflow[20]).toBe(140);
    expect(tank(0, 0).levels.every((level) => level === 40)).toBe(true);
  });
  it("keeps unbiased walk steps independent and exactly one unit long", () => {
    const paths = simpleModel("random-walk", { steps: 200 }, 41)!.series!;
    for (const path of paths) {
      expect(path.points).toHaveLength(201);
      for (let t = 1; t < path.points.length; t++)
        expect(Math.abs(path.points[t].y - path.points[t - 1].y)).toBe(1);
    }
  });
});
