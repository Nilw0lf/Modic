import { describe, it, expect } from "vitest";
import {
  snell,
  collide,
  bridge,
  island,
  metapopulation,
  cascade,
  frequency,
  huffman,
  sortTrace,
  ringOwner,
  ringServers,
  population,
  fit,
  mean,
  median,
  publication,
  poissonEvents,
  arcsineBatch,
  chord,
  persuasion,
  ttcRound,
  solow,
  taxMarket,
  monopsony,
  drawdown,
  newsvendor,
  schedule,
  socialEdges,
  reachable,
  confidenceOpinions,
  voter,
  degroot,
  homophily,
} from "@/lib/simulations/prism";
import { prismEntries } from "@/data/prism-expansion";
import { prismThinkers } from "@/data/prism-thinkers";
import { prismGuides } from "@/content/effects/guides/prism";
describe("prism concepts and model properties", () => {
  it("adds seventy guided concepts and only associated active thinker profiles", () => {
    expect(prismEntries).toHaveLength(70);
    expect(Object.keys(prismGuides).sort()).toEqual(
      prismEntries.map((e) => e.id).sort(),
    );
    for (const t of prismThinkers)
      expect(
        prismEntries.some(
          (e) => e.thinker === t.id || e.coThinkers?.includes(t.id),
        ),
        t.id,
      ).toBe(true);
  });
  it("applies refraction from the normal and reports the impossible transmitted-angle case", () => {
    expect(snell(0, 1, 1.5)).toBe(0);
    expect(snell(30, 1, 1.5)).toBeCloseTo(19.4712, 3);
    expect(snell(50, 1.5, 1)).toBeNull();
    expect(snell(30, 1, 1)).toBeCloseTo(30);
  });
  it("conserves both momentum and energy across unequal elastic masses", () => {
    for (const m1 of [0.5, 1, 4])
      for (const m2 of [0.5, 2, 4]) {
        const v = collide(m1, m2);
        expect(m1 * v.v1 + m2 * v.v2).toBeCloseTo(4 * m1, 8);
        expect(0.5 * m1 * v.v1 ** 2 + 0.5 * m2 * v.v2 ** 2).toBeCloseTo(
          8 * m1,
          8,
        );
      }
    expect(collide(1, 1)).toEqual({ v1: 0, v2: 4 });
  });
  it("balances the bridge at the resistance ratio and conserves nodal current", () => {
    for (const r of [5, 15, 30, 60]) {
      const b = bridge(r);
      expect(b.input).toBeCloseTo(b.output, 10);
      expect((12 - b.left) / 10).toBeCloseTo(b.left / 20 + b.cross, 10);
    }
    expect(bridge(30).cross).toBeCloseTo(0, 10);
    expect(bridge(15, false).cross).toBe(0);
  });
  it("allows positive island turnover at fixed richness and preserves the zero-rate case", () => {
    expect(island(6, 3, 1000).at(-1)).toBeCloseTo(200 / 3, 3);
    expect(island(0, 0, 100)).toEqual(Array(101).fill(50));
  });
  it("separates metapopulation persistence from extinction at excessive loss", () => {
    expect(metapopulation(0.5, 0.2, 1000).at(-1)).toBeCloseTo(0.6, 3);
    expect(metapopulation(0.2, 0.5, 1000).at(-1)).toBeLessThan(1e-8);
  });
  it("keeps trophic indices finite and cannot spontaneously create an absent top predator", () => {
    for (const top of [true, false]) {
      const p = cascade(top, 100);
      for (const series of Object.values(p))
        expect(series.every((v) => v >= 0 && Number.isFinite(v))).toBe(true);
      expect(Math.max(...p.plants)).toBeLessThanOrEqual(100);
      if (!top) expect(p.predators.every((v) => v === 0)).toBe(true);
    }
  });
  it("changes the stability of half-frequency when the fitness rule reverses", () => {
    expect(frequency(0.2, false, 50).at(-1)).toBeCloseTo(0.5, 5);
    expect(frequency(0.2, true, 50).at(-1)).toBeLessThan(0.001);
    expect(frequency(0.5, true, 50).every((v) => v === 0.5)).toBe(true);
  });
  it("constructs prefix-free Huffman codes with the expected weighted length", () => {
    const codes = huffman([50, 25, 15, 10]);
    for (let i = 0; i < codes.length; i++)
      for (let j = 0; j < codes.length; j++)
        if (i !== j) expect(codes[j].startsWith(codes[i])).toBe(false);
    expect(codes.reduce((s, c) => s + 2 ** -c.length, 0)).toBeCloseTo(1);
    expect(
      codes.reduce((s, c, i) => s + c.length * [0.5, 0.25, 0.15, 0.1][i], 0),
    ).toBe(1.75);
    expect(huffman([1, 1, 1, 1]).every((c) => c.length === 2)).toBe(true);
  });
  it("sorts identical records under different operation traces", () => {
    for (const kind of ["Insertion", "Selection"] as const) {
      const trace = sortTrace(kind);
      expect(trace.at(-1)!.values).toEqual([1, 2, 3, 5, 7, 9]);
      expect(
        trace.every((r, i) => !i || r.comparisons >= trace[i - 1].comparisons),
      ).toBe(true);
    }
    expect(sortTrace("Selection").at(-1)!.comparisons).toBe(15);
  });
  it("remaps only the new server’s preceding hash interval, including correct wraparound", () => {
    for (let key = 0; key < 100; key++) {
      const old = ringOwner(key, ringServers),
        next = ringOwner(key, [...ringServers, 50]);
      expect(old !== next).toBe(key > 35 && key <= 50);
    }
    expect(ringOwner(99, ringServers)).toBe(10);
  });
  it("distinguishes generated correlation from a selected narrow-range correlation", () => {
    const all = population(941, 10000),
      narrow = all.filter(([x]) => Math.abs(x) < 0.2);
    expect(fit(all).corr).toBeCloseTo(0.7, 1);
    expect(Math.abs(fit(narrow).corr!)).toBeLessThan(Math.abs(fit(all).corr!));
  });
  it("exposes sensitivity of the mean without making the median an error detector", () => {
    const a = [8, 9, 10, 10, 11, 12, 10],
      b = [8, 9, 10, 10, 11, 12, 200];
    expect(median(a)).toBe(median(b));
    expect(mean(b) - mean(a)).toBeCloseTo(190 / 7);
  });
  it("selects extreme absolute estimates through a two-sided publication rule", () => {
    const all = publication(941, 10000),
      published = all.filter((v) => v.significant);
    expect(published.length / all.length).toBeGreaterThan(0.03);
    expect(published.length / all.length).toBeLessThan(0.07);
    expect(published.every((v) => Math.abs(v.estimate) > 0.392)).toBe(true);
  });
  it("generates ordered Poisson arrivals within the horizon and appropriate ensemble counts", () => {
    const counts = Array.from({ length: 100 }, (_, i) => {
      const events = poissonEvents(2, 941 + i);
      expect(
        events.every((v, j) => v > 0 && v <= 10 && (!j || v > events[j - 1])),
      ).toBe(true);
      return events.length;
    });
    expect(mean(counts)).toBeGreaterThan(17);
    expect(mean(counts)).toBeLessThan(23);
  });
  it("produces broad occupation times despite a symmetric ensemble mean", () => {
    const a = arcsineBatch(941, 2000);
    expect(a.every((v) => v >= 0 && v <= 1)).toBe(true);
    expect(mean(a)).toBeCloseTo(0.5, 1);
    expect(
      a.filter((v) => v < 0.2 || v > 0.8).length / a.length,
    ).toBeGreaterThan(0.4);
  });
  it("distinguishes three chord measures while keeping all chords geometrically valid", () => {
    for (const [kind, p] of [
      ["Random endpoints", 1 / 3],
      ["Uniform radius", 0.5],
      ["Uniform midpoint area", 0.25],
    ] as const) {
      const cases = Array.from({ length: 10000 }, (_, i) =>
        chord(941 + i, kind),
      );
      expect(
        cases.filter((c) => c.length > Math.sqrt(3)).length / 10000,
      ).toBeCloseTo(p, 1);
      expect(
        cases.every(
          (c) => c.d >= 0 && c.d <= 1 && c.length >= 0 && c.length <= 2,
        ),
      ).toBe(true);
    }
  });
  it("obeys the persuasion receiver threshold and declared equality rule", () => {
    expect(persuasion(0).invest).toBe(0.3);
    const b = persuasion(3 / 7);
    expect(b.posterior).toBeCloseTo(0.5);
    expect(b.invest).toBeCloseTo(0.6);
    expect(persuasion(0.5).invest).toBe(0);
  });
  it("executes a complete ownership cycle without duplicate houses", () => {
    const trades = ttcRound([0, 1, 2]);
    expect(trades).toEqual([
      { person: 0, house: 1 },
      { person: 1, house: 2 },
      { person: 2, house: 0 },
    ]);
    expect(new Set(trades.map((t) => t.house)).size).toBe(3);
    expect(
      ttcRound(
        [0, 1, 2],
        [
          [0, 1, 2],
          [1, 2, 0],
          [2, 0, 1],
        ],
      ),
    ).toEqual([{ person: 0, house: 0 }]);
  });
  it("converges to the saving-specific Solow level rather than permanent growth", () => {
    expect(solow(0.2, 1000).at(-1)).toBeCloseTo(4, 6);
    expect(solow(0.4, 1000).at(-1)).toBeCloseTo(16, 6);
  });
  it("keeps the tax wedge, equilibrium curves and revenue consistent", () => {
    for (const t of [0, 10, 30, 50]) {
      const m = taxMarket(t);
      expect(m.buyer - m.seller).toBeCloseTo(t);
      expect(m.buyer).toBeCloseTo(100 - m.q);
      expect(m.seller).toBeCloseTo(2 * m.q);
      expect(m.consumerBurden + m.producerBurden).toBeCloseTo(t);
    }
    expect(taxMarket(30).revenue).toBeCloseTo(700);
  });
  it("maximises the monopsony profit at the declared employment benchmark", () => {
    const best = monopsony(30).profit;
    for (let l = 0; l <= 60; l++)
      expect(monopsony(l).profit).toBeLessThanOrEqual(best);
    expect(monopsony(30).wage).toBe(40);
  });
  it("retains historical drawdown after recovery and uses the changed return base", () => {
    const p = drawdown([-50, 50]);
    expect(p.wealth).toEqual([100, 50, 75]);
    expect(p.max).toBe(0.5);
    expect(p.declines.at(-1)).toBe(0.25);
    expect(drawdown([-50, 100]).max).toBe(0.5);
  });
  it("finds the expected-profit newsvendor quantity without guaranteeing its realised profit", () => {
    const best = newsvendor(60);
    expect(best.expected).toBeCloseTo(176);
    for (let q = 0; q <= 120; q++)
      expect(newsvendor(q).expected).toBeLessThanOrEqual(best.expected + 1e-8);
    expect(best.profit[0]).toBe(-80);
  });
  it("reduces mean wait with shortest-job-first while preserving complete makespan", () => {
    const a = schedule([0, 1, 2, 3, 4]),
      b = schedule([3, 1, 4, 2, 0]);
    expect(mean(a.map((r) => r.wait))).toBe(10.2);
    expect(mean(b.map((r) => r.wait))).toBe(4.4);
    expect(a.at(-1)!.finish).toBe(20);
    expect(b.at(-1)!.finish).toBe(20);
  });
  it("separates bridge reachability from loss of one redundant local edge", () => {
    expect(reachable(socialEdges)).toHaveLength(6);
    expect(
      reachable(socialEdges.filter(([a, b]) => !(a === 2 && b === 3))),
    ).toHaveLength(3);
    expect(
      reachable(socialEdges.filter(([a, b]) => !(a === 0 && b === 1))),
    ).toHaveLength(6);
  });
  it("produces consensus under full confidence and no change under isolated confidence", () => {
    expect(
      confidenceOpinions(1, 1)
        .at(-1)!
        .every((v) => Math.abs(v - 0.5) < 1e-9),
    ).toBe(true);
    expect(confidenceOpinions(0.05, 20).at(-1)).toEqual(
      confidenceOpinions(0.05, 0)[0],
    );
  });
  it("copies voter states without introducing another state and preserves an absorbing count", () => {
    const m = voter(941, 500);
    expect(m.state.every((v) => v === 0 || v === 1)).toBe(true);
    expect(
      m.history.every(
        (v, i) =>
          v >= 0 && v <= 8 && (!i || Math.abs(v - m.history[i - 1]) <= 1),
      ),
    ).toBe(true);
    const at = m.history.findIndex((v) => v === 0 || v === 8);
    if (at >= 0)
      expect(m.history.slice(at).every((v) => v === m.history[at])).toBe(true);
  });
  it("converges to the correct influence-weighted belief and a different stubborn limit", () => {
    const ordinary = degroot(false, 100).at(-1)!,
      stubborn = degroot(true, 100).at(-1)!;
    expect(ordinary.every((v) => Math.abs(v - 0.45) < 1e-9)).toBe(true);
    expect(stubborn.every((v) => v < 1e-8)).toBe(true);
  });
  it("keeps homophily graphs simple while altering same-group opportunities", () => {
    const a = homophily(941, 0),
      b = homophily(941, 1),
      same = (edges: [number, number][]) =>
        edges.filter(([a, b]) => a < 6 === b < 6).length;
    for (const edges of [a, b]) {
      expect(new Set(edges.map((e) => e.join("-"))).size).toBe(edges.length);
      expect(edges.every(([a, b]) => a < b)).toBe(true);
    }
    expect(same(b)).toBeGreaterThanOrEqual(same(a));
  });
});
